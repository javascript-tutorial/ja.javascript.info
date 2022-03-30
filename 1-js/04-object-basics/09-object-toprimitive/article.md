
# オブジェクトからプリミティブへの変換

オブジェクトが加算 `obj1 + obj2`、減算 `obj1 - obj2`, または `alert(obj)` を使って出力されるとき、何が起きるでしょう？

この場合、オブジェクトはプリミティブへ自動変換され、その後演算が行われます。

チャプター <info:type-conversions> では、プリミティブな数値、文字列や真偽値変換のルールを見てきました。しかしまだオブジェクトが残っています。ここまでのチュートリアルでメソッドとシンボルについて学んだので、今ならそれらを理解することができます。

1. すべてのオブジェクトは真偽値のコンテキストでは `true` です。文字列と数値変換だけです。
2. 数値変換は、オブジェクトを減算したり数学的な関数を適用する時に発生します。例えば `Date` オブジェクト(チャプター <info:date> で説明されています)は減算することができ、 `date1 - date2` の結果は2つの日付間の時間差になります。
3. 文字列変換は、通常 `alert(obj)` のようにオブジェクトを出力したり、似たようなコンテキストのときに起こります。

## ToPrimitive

特別なオブジェクトメソッドを使って文字列や数値を調整することができます。

[仕様](https://tc39.github.io/ecma262/#sec-toprimitive)に記載されている型変換には、"hint(ヒント)" と呼ばれる、３つのバリエーションがあります。

`"string"`
: 操作が `alert` のように文字列を期待するとき、オブジェクトから文字列への変換をします:

    ```js
    // 出力
    alert(obj);

    // プロパティキーとしてオブジェクトを使う
    anotherObj[obj] = 123;
    ```

`"number"`
: 操作が数学のように数値を期待するとき、オブジェクトから数値への変換をします:

    ```js
    // 明示的な変換
    let num = Number(obj);

    // 算術 (二項演算子プラスを除く)
    let n = +obj; // 単項演算子プラス
    let delta = date1 - date2;

    // 大なり小なり比較
    let greater = user1 > user2;
    ```

`"default"`
: 操作がどんな型を期待しているか "よくわからない" ようなレアケースで起こります

    例えば、二項演算子 `+` は文字列(それらの連結)と数値(それらの加算)両方で動作するので、文字列と数値の両方の場合がありえます。なので、二項演算子が引数にオブジェクトが渡された場合、変換には `"default"` ヒントを使用します。
    
    また、オブジェクトが `==` を使用して、文字列、数値またはシンボルと比較されるときです。これもどの変換をすべきか不明瞭なので、`"default"` ヒントが利用されます。

    ```js
    // 二項演算子 "default" ヒントを使用
    let total = obj1 + obj2;

    // obj == 数値は "default" ヒントを使用
    if (user == 1) { ... };
    ```

    `<`, `>` のような、大なり/小なり演算子もまた文字列と数字両方を扱うことができますが、これは "default" ではなく "number" を使います。これは歴史的な理由によるものです。

    ただ、実際にはこれらの詳細を覚えておく必要はありません。1つのケース(`Date` オブジェクトの場合です。後ほど学びます)を除くすべての組み込みオブジェクトは `"number"` と `"default"` 変換は同じ方法で実装されています。そして、恐らく私たちも同じようにするべきです。

```smart header="No `\"boolean\"` ヒント"
留意してください -- ヒント３つだけであり、それはシンプルです。 

"真偽値" ヒントはありません(真偽値のコンテキストにおいては、すべてのオブジェクトは `true` です)。そして、ほとんどの組み込みのように、`"default"` と `"number"` を同じように扱うと、変換は2つしかありません。
```

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

メソッド `toString` と `valueOf` はずっと昔からあります。それらはシンボルではなく(シンボルは以前には存在しませんでした)が、"通常の" 文字列で名前付けされたメソッドです。それらは変換を行うための代替の "古いやり方" を提供します。

`Symbol.toPrimitive` がない場合、JavaScriptはそれらを見つけ、次の順でトライします:

- `toString -> valueOf` "string" hint の場合
- `valueOf -> toString` そうでない場合

これらのメソッドはプリミティブを返却する必要があります。`toString` あるいは `valueOf` がオブジェクトを返す場合、無視されます（メソッドがない場合と同じ）。

デフォルトでは、通常のオブジェクトは次の `toString` と `valueOf` メソッドを持っています。:

- 文字列 `"[object Object]"` を返却する `toString` メソッド
- オブジェクト自身を返却する `valueOf` メソッド

これはそのデモです。:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

そのため、`alert` などでオブジェクトを文字列として使用を試みた場合、デフォルトでは `[object Object]` が表示されます。

そして、デフォルトの `valueOf` は、混乱を避けるために、完全を期するためにここで言及しています。ご覧の通り、オブジェクト自体を返すため無視されます。これは歴史的な理由によるものです。したがって、存在しないものと想定できます。

これらのメソッドを実装してみましょう。

例えば、ここで `user` は `Symbol.toPrimitive` の代わりに、`toString` と `valueOf` を使って上と同じことをしています:

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

ご覧の通り、振る舞いは `Symbol.toPrimitive` の例と同じです。

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

## 返却される型

すべてのプリミティブ変換のメソッドについて知っておくべき重要なことは、それらが必ずしも "ヒント" プリミティブを返すとは限らないことです。

`toString` が正確に文字列を返すかどうか、あるいは、`Symbol.toPrimitive` メソッドが `"number"` ヒントの数値を返すかどうかを制御することはできません。

唯一の必須事項は、これらのメソッドはオブジェクトではなくプリミティブを返す必要があるということです。

```smart header="歴史的な備考"
歴史的な理由で、もし `toString` あるいは `valueOf` がオブジェクトを返した場合、エラーにはなりませんがそのオブジェクトは無視されます(メソッドが存在しなかったかのように)。これは JavaScript において、昔のよくない "エラー" に対する考え方です。

対照的に、`Symbol.toPrimitive` はプリミティブを *返さなければいけません*、そうでなければエラーになります。
```

## さらなる変換

既にご存じの通り、多くの演算子と関数は型変換を行います。例えば乗算 `*` はオペランドを数値に変換します。

引数にオブジェクトを渡す場合、２つのステージがあります:
1. オブジェクトはプリミティブに変換されます（上で記載したルールにより）
2. 結果のプリミティブが正しい型ではない場合、変換されます。

例:

```js run
let obj = {
  // toString は他のメソッドがない場合にすべての変換を処理します。
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, ToPrimitive は "2" を与えるので, 2 になります
```

1. 乗算 `obj * 2` は最初にオブジェクトをプリミティブに変換します（文字列の `"2"`）
2. `"2" * 2` は `2 * 2` になります（文字列が数値に変換されます）

二項演算子プラスは同じ状況で文字列を連携します。:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 (ToPrimitive は文字列を返します => 連結)
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
