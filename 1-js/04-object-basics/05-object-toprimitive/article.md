
# オブジェクトからプリミティブへの変換

オブジェクトが加算 `obj1 + obj2`、減算 `obj1 - obj2`, または `alert(obj)` を使って出力されるとき、何が起きるでしょう？

オブジェクトには、変換を行う特別なメソッドがあります。

チャプター <info:type-conversions> では、プリミティブな数値、文字列や真偽値変換のルールを見てきました。しかしまだオブジェクトが残っています。ここまでのチュートリアルでメソッドとシンボルについて学んだので、今ならそれらを理解することができます。

<<<<<<< HEAD
[cut]

オブジェクトの場合、すべてのオブジェクトは真偽値のコンテキストでは `true` になるため、真偽値への変換はありません。そのため、文字列と数値変換だけです。
=======
For objects, there's no to-boolean conversion, because all objects are `true` in a boolean context. So there are only string and numeric conversions.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

数値変換は、オブジェクトを減算したり数学的な関数を適用する時に発生します。例えば `Date` オブジェクト(チャプター <info:date> で説明されています)は減算することができ、 `date1 - date2` の結果は2つの日付間の時間差になります。

文字列変換はどうかというと -- 通常、`alert(obj)` のようにオブジェクトを出力したり、似たようなコンテキストのときに起こります。

## ToPrimitive

プリミティブが必要とされるコンテキストでオブジェクトが使われる場合、例えば `alert` や数学的な操作と言ったような場合、`ToPrimitive` アルゴリズム([スペック](https://tc39.github.io/ecma262/#sec-toprimitive))を使ってプリミティブ値に変換されます。

そのアルゴリズムは、特別なオブジェクトメソッドを使って変換をカスタマイズすることができます。

コンテキストに応じて、変換にはいわゆる "hint" があります。

3つのケースがあります:

`"string"`
: 操作が `alert` のように文字列を期待するとき -- オブジェクトから文字列への変換をします:

    ```js
    // 出力
    alert(obj);

    // プロパティキーとしてオブジェクトを使う
    anotherObj[obj] = 123;
    ```

`"number"`
: 操作が数学のように数値を期待するとき -- オブジェクトから数値への変換をします:

    ```js
    // 明示的な変換
    let num = Number(obj);

    // 算術 (バイナリプラスを除く)
    let n = +obj; // unary plus
    let delta = date1 - date2;

    // 大なり小なり比較
    let greater = user1 > user2;
    ```

`"default"`
: 操作がどんな型を期待しているか "よくわからない" ようなレアケースで起こります

    例えば、二項演算子 `+` は文字列(それらの連結)と数値(それらの加算)両方で動作するので、文字列と数値の両方の場合がありえます。または、オブジェクトが `==` を使用して、文字列、数値またはシンボルと比較されるときです。

    ```js
    // 二項演算子 +
    let total = car1 + car2;

    // obj == string/number/symbol
    if (user == 1) { ... };
    ```

    より大なり/小なり演算子 `<>` もまた文字列と数字両方を扱うことができますが、これは "default" ではなく "number" を使います。これは歴史的な理由によるものです。

    実際には、1つのケース(`Date` オブジェクトの場合です。後ほど学びます)を除くすべての組み込みオブジェクトは `"number"` と `"default"` 変換は同じ方法で実装されています。そして、恐らく私たちも同じようにするべきです。

留意してください -- 3つだけ hint があり、それはシンプルです。 "真偽値" はありません(真偽値のコンテキストにおいては、すべてのオブジェクトは `true` です)。そして、ほとんどの組み込みのように、`"default"` と `"number"` を同じように扱うと、変換は2つしかありません。

**変換をするために、JavaScriptは3つのオブジェクトのメソッドを見つけ呼び出そうとします。**

1. メソッドが存在する場合、`obj[Symbol.toPrimitive](hint)` を呼び出します
2. ない場合、hint が `"string"` であれば
    - `obj.toString()` と `obj.valueOf()` を試します。
3. そうでなく、hint が `"number"` であれば
    - `obj.valueOf()` と `obj.toString()` を試します。

## Symbol.toPrimitive

最初のメソッドから始めてみましょう。`Symbol.toPrimitive` という名前の組み込みシンボルがあります。このシンボルは、次のように変換メソッドの名前として使用します。

```js
obj[Symbol.toPrimitive] = function(hint) {
  // プリミティブな値を返却
  // hint = "string", "number", "default" のどれか
}
```

例えば、これは `Symbol.toPrimitive` を実装した `user` オブジェクトです:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// 変換動作の確認:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

コードから分かるように、`user` は変換に応じて、文字列または金額になります。1つのメソッド `user[Symbol.toPrimitive]` がすべての変換ケースを扱っています。


## toString/valueOf

メソッド `toString` と `valueOf` は古代からあります。それらはシンボルではなく(シンボルはずっと前には存在しませんでした)が、"通常の" 文字列で名前付けされたメソッドです。それらは変換を行うための代替の "古いスタイル" の方法を提供します。

`Symbol.toPrimitive` がない場合、JavaScriptはそれらを見つけ、次の順でトライします:

- `toString -> valueOf` "string" hint の場合
- `valueOf -> toString` そうでない場合

例えば、ここで `user` は `toString` と `valueOf` を使って上と同じことをしています:

```js run
let user = {
  name: "John",
  money: 1000,

  // hint="string" の場合
  toString() {
    return `{name: "${this.name}"}`;
  },

  // hint="number" or "default" の場合
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

多くの場合、すべてのプリミティブ変換が処理できる "あらゆる状況に対応できる場所" が必要です。 この場合、次のように `toString` を実装するだけで実現できます:

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

`Symbol.toPrimitive`と` valueOf` がなければ、 `toString` はすべてのプリミティブ変換を扱います。


## ToPrimitive と ToString/ToNumber

すべてのプリミティブ変換メソッドについて知っておくべき重要なことは、それらが必ずしも "hint" のプリミティブを返すわけではないということです。

`toString()` が正しく文字列を返すか、もしくは `Symbol.toPrimitive` メソッドが "number" の hint で数値を返すかはコントロールできません。

**唯一の必須事項は、これらのメソッドはプリミティブを返す必要がある、ということです。**

変換が行われるとプリミティブが返却され、その後引き続き処理が行われます。必要に応じてさらに変換が行われます。

例えば:

- 数学的な操作(二項演算子プラスを除く)は、 `ToNumber` 変換を行います:

    ```js run
    let obj = {
      toString() { // toString は他のメソッドがない場合にすべての変換を処理します。
        return "2";
      }
    };

    alert(obj * 2); // 4, ToPrimitive は "2" を与えるので, 2 になります
    ```

- 二項演算子プラスはプリミティブをチェックします。もし文字列なら連結し、そうでなければ `ToNumber` を行い、数値で処理をします。

    文字列の例:
    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

    alert(obj + 2); // 22 (ToPrimitive は文字列を返します => 連結)
    ```

    数値の例:
    ```js run
    let obj = {
      toString() {
        return true;
      }
    };

    alert(obj + 2); // 3 (ToPrimitive は boolean を返します, 文字列ではありません => ToNumber)
    ```

```smart header="歴史的な備考"
歴史的な理由で、メソッド `toString` と `valueOf` はプリミティブを *返すべきです*: もしそれらがオブジェクトを返した場合、エラーにはなりませんがそのオブジェクトは無視されます(メソッドが存在しなかったかのように)。

対象的に、`Symbol.toPrimitive` はプリミティブを *返さなければいけません*、そうでなければエラーになります。
```

## サマリ 

オブジェクトからプリミティブへの変換は、値としてプリミティブを期待している多くの組み込みの関数や、操作によって自動的に呼び出されます。

3つのタイプ (hint)があります:
- `"string"` (`alert` や、他の文字列変換のため)
- `"number"` (算術演算のため)
- `"default"` (ほとんどありません)


仕様は、どの操作がどの hint を使用するかを明示的に説明しています。 "期待するものがわからない" 演算子はほとんどなく、その場合は "default" のヒントを使用します。 通常、組み込みオブジェクトの場合、 `"default"` ヒントは `"number"` と同じように扱われるので、最後の2つはよく一緒にされます。

変換のアルゴリズムは:

1. メソッドが存在する場合、`obj[Symbol.toPrimitive](hint)` を呼び出します
2. ない場合は、hint が `"string"` であれば
    - `obj.toString()` と `obj.valueOf()` を試します。
3. そうでない場合、hint が `"number"` であれば
    - `obj.valueOf()` と `obj.toString()` を試します。

実際に、ロギングやデバッグ目的で "人間が読める" オブジェクトの表現を返すような、 "あらゆる状況に対応できる" メソッドとしては、 `obj.toString()` のみの実装で十分なことが多いです。
