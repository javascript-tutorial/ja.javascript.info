
# オブジェクトからプリミティブへの変換

オブジェクトが加算 `obj1 + obj2`、減算 `obj1 - obj2`, または `alert(obj)` を使って出力されたとき何が起きるでしょう？

オブジェクトには、変換を行う特別なメソッドがあります。

チャプター <info:type-conversions> で、私たちは、プリミティブな数値、文字列や真偽値変換のルールを見てきました。しかしオブジェクトへのギャップが残っています。ここまでで、我々はメソッドとシンボルについて学んだので、それを閉じることができます。

[cut]

オブジェクトの場合、全てのオブジェクトは真偽値コンテキストでは `true` なので、真偽値への変換はありません。従って、文字列と数値変換だけです。

数値変換は、オブジェクトを減算する、もしくは数学的な関数を適用する時に起こります。例えば `Date` オブジェクト(チャプター <info:date> で説明されます)は減算することができ、 `date1 - date2` の結果は2つの日付間の時間差になります。

文字列変換はどうかというと -- 通常、`alert(obj)` のようにオブジェクトを出力したり、似たようなコンテキストのときに起こります。

## ToPrimitive

プリミティブが必要とされるコンテキストでオブジェクトが使われる場合、例えば `alert` や数学的な操作、`ToPrimitive` アルゴリズム([スペック](https://tc39.github.io/ecma262/#sec-toprimitive))を使ってプリミティブ値に変換されます。

そのアルゴリズムによって、特別なオブジェクトメソッドを使って変換をカスタマイズすることができます。

コンテキストに応じて、変換にはいわゆる "hint" があります。

3つのバリアントがあります:

`"string"`
: 操作が `alert` のように文字列を期待するとき -- オブジェクトから文字列への変換:

    ```js
    // output
    alert(obj);

    // using object as a property key
    anotherObj[obj] = 123;
    ```

`"number"`
: 操作が数学のように数値を期待するとき -- オブジェクトから数値への変換:

    ```js
    // explicit conversion
    let num = Number(obj);

    // maths (except binary plus)
    let n = +obj; // unary plus
    let delta = date1 - date2;

    // less/greater comparison
    let greater = user1 > user2;
    ```

`"default"`
: 操作がどんな型を期待しているか "よくわからない" ようなレアケースで起こります

    例えば、バイナリプラス `+` は文字列(それらを連結します)と数値(それらを足します)両方で動作するので、文字列と数値の両方が有りえます。または、オブジェクトが `==` を使用して、文字列、数値またはシンボルと比較されるときです。

    ```js
    // binary plus
    let total = car1 + car2;

    // obj == string/number/symbol
    if (user == 1) { ... };
    ```

    より大きい/小さい演算子 `<>` もまた文字列と数字両方を扱うことができますが、これは "default" ではなく "number" を使います。これは歴史的な理由によるものです。

    実際には、１つのケース(`Date` オブジェクトです。後ほど学びます)を除く全ての組み込みオブジェクトは `"number"` と同じ方法で `"default"` 変換を実装しています。そして、恐らく私たちは同じようにするべきです。

留意してください -- 3つだけ hint があります。それはシンプルです。 "真偽値" の hint はありません(真偽値のコンテキストにおいては、全てのオブジェクトは `true` です)。そして、ほとんどの組み込みのように、もし `"default"` と `"number"` を同じように扱うと、２つの変換しかありません。

**変換をするために、JavaScriptは3つのオブジェクトのメソッドを見つけ呼び出そうとします。**

1. メソッドが存在する場合、`obj[Symbol.toPrimitive](hint)` を呼び出します
2. そうでない場合、hint が `"string"` であれば
    - `obj.toString()` と `obj.valueOf()` を試します。
3. そうでない場合、hint が `"number"` であれば
    - `obj.valueOf()` と `obj.toString()` を試します。

## Symbol.toPrimitive

最初のメソッドから始めてみましょう。`Symbol.toPrimitive` という名前の組み込みシンボルがあります。このシンボルは、次のように変換メソッドに名前を付けるために使用します。

```js
obj[Symbol.toPrimitive] = function(hint) {
  // return a primitive value
  // hint = one of "string", "number", "default"
}
```

例えば、ここで `user` オブジェクトはそれを実装しています:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// conversions demo:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

コードから分かるように、`user` は変換に応じて、自己記述的な文字列、または金額になります。１つのメソッド `user[Symbol.toPrimitive]` が全ての変換ケースを扱います。


## toString/valueOf

メソッド `toString` と `valueOf` は古代から来ています。それらはシンボルではなく(シンボルはずっと前には存在しませんでした)が、"通常の" 文字列で名前付けされたメソッドです。それらは変換を実装するための代替の "古いスタイル" の方法を提供します。

もしも、`Symbol.toPrimitive` がない場合、JavaScriptはそれらを見つけ、次の順でトライします:

- `toString -> valueOf` "string" hint のために.
- `valueOf -> toString` そうでない場合.

例えば、ここで `user` は `toString` と `valueOf` をあわせて使って上と同じことをしています:

```js run
let user = {
  name: "John",
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" or "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

多くの場合、すべてのプリミティブ変換を処理する単一の "キャッチオール" が必要です。 この場合、次のように `toString`だけを実装することで実現できます:

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

`Symbol.toPrimitive`と` valueOf` がなければ、 `toString` は全てのプリミティブ変換を扱います。


## ToPrimitive と ToString/ToNumber

全てのプリミティブ変換メソッドを知るのに重要なことは、それらは必ずしも "ほのめかされた" プリミティブを返さないことです。

`toString()` が正しく文字列を返すか、もしくは `Symbol.toPrimitive` メソッドが "number" のヒントで数値を返すかはコントロール出来ません。

**唯一の必須なこと: それらのメソッドはプリミティブを返す必要があります。**

変換が開始された操作では、そのプリミティブが取得され、引き続き処理が行われます。必要に応じてさらに変換が適用されます。

例えば:

- 数学的な操作(バイナリプラスを除く)は、 `ToNumber` 変換を行います:

    ```js run
    let obj = {
      toString() { // toString handles all conversions in the absence of other methods
        return "2";
      }
    };

    alert(obj * 2); // 4, ToPrimitive gives "2", then it becomes 2
    ```

- バイナリプラスはプリミティブをチェックします -- もし文字列なら連結し、そうでなければ `ToNumber` を行い、数値で処理をします。

    文字列の例:
    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

    alert(obj + 2); // 22 (ToPrimitive returned string => concatenation)
    ```

    数値の例:
    ```js run
    let obj = {
      toString() {
        return true;
      }
    };

    alert(obj + 2); // 3 (ToPrimitive returned boolean, not string => ToNumber)
    ```

```smart header="歴史的な注釈"
歴史的な理由で、メソッド `toString` または `valueOf` はプリミティブを *返すべきです*: もしそれらがオブジェクトを返した場合、エラーにはなりませんが、そのオブジェクトは無視されます(メソッドが存在しなかったかのように)。

対象的に、`Symbol.toPrimitive` はプリミティブを *返さなければいけません*、そうでなければエラーになります。
```

## サマリ [#summary]

オブジェクトからプリミティブへの変換は、値としてプリミティブを期待している多くの組み込みの関数や、操作によって自動的に呼び出されます。

3つのタイプ (ヒント)があります:
- `"string"` (`alert` や、他の文字列変換のため)
- `"number"` (数学のため)
- `"default"` (ほとんどありません)


仕様は、どの操作がどのヒントを使用するかを明示的に説明しています。 "期待するものがわからない" 演算子はほとんどなく、その場合は "デフォルト" のヒントを使用します。 通常、組み込みオブジェクトの場合、 `"default"` ヒントは `"number"` と同じように扱われるので、最後の2つはしばしば一緒にマージされます。

変換のアルゴリズムは:

1. メソッドが存在する場合、`obj[Symbol.toPrimitive](hint)` を呼び出します
2. そうでない場合、hint が `"string"` であれば
    - `obj.toString()` と `obj.valueOf()` を試します。
3. そうでない場合、hint が `"number"` であれば
    - `obj.valueOf()` と `obj.toString()` を試します。

実際に、ロギングやデバッグ目的で、"人間が読める" オブジェクトの表現を返す全ての変換のための "キャッチオール" メソッドとしては、 `obj.toString()` だけの実装で十分なことがしばしばです。
