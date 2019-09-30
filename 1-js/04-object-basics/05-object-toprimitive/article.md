
# オブジェクトからプリミティブへの変換

オブジェクトが加算 `obj1 + obj2`、減算 `obj1 - obj2`, または `alert(obj)` を使って出力されるとき、何が起きるでしょう？

<<<<<<< HEAD
オブジェクトには、変換を行う特別なメソッドがあります。

チャプター <info:type-conversions> では、プリミティブな数値、文字列や真偽値変換のルールを見てきました。しかしまだオブジェクトが残っています。ここまでのチュートリアルでメソッドとシンボルについて学んだので、今ならそれらを理解することができます。

[cut]

オブジェクトの場合、すべてのオブジェクトは真偽値のコンテキストでは `true` になるため、真偽値への変換はありません。そのため、文字列と数値変換だけです。

数値変換は、オブジェクトを減算したり数学的な関数を適用する時に発生します。例えば `Date` オブジェクト(チャプター <info:date> で説明されています)は減算することができ、 `date1 - date2` の結果は2つの日付間の時間差になります。

文字列変換はどうかというと -- 通常、`alert(obj)` のようにオブジェクトを出力したり、似たようなコンテキストのときに起こります。

## ToPrimitive

プリミティブが必要とされるコンテキストでオブジェクトが使われる場合、例えば `alert` や数学的な操作と言ったような場合、`ToPrimitive` アルゴリズム([スペック](https://tc39.github.io/ecma262/#sec-toprimitive))を使ってプリミティブ値に変換されます。

そのアルゴリズムは、特別なオブジェクトメソッドを使って変換をカスタマイズすることができます。

コンテキストに応じて、変換にはいわゆる "hint" があります。

3つのケースがあります:

`"string"`
: 操作が `alert` のように文字列を期待するとき -- オブジェクトから文字列への変換をします:
=======
In that case, objects are auto-converted to primitives, and then the operation is carried out.

In the chapter <info:type-conversions> we've seen the rules for numeric, string and boolean conversions of primitives. But we left a gap for objects. Now, as we know about methods and symbols it becomes possible to fill it.

1. All objects are `true` in a boolean context. There are only numeric and string conversions.
2. The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, `Date` objects (to be covered in the chapter <info:date>) can be subtracted, and the result of `date1 - date2` is the time difference between two dates.
3. As for the string conversion -- it usually happens when we output an object like `alert(obj)` and in similar contexts.

## ToPrimitive

We can fine-tune string and numeric conversion, using special object methods.

There are three variants of type conversion, so-called "hints", described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: For an object-to-string conversion, when we're doing an operation on an object that expects a string, like `alert`:
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

    ```js
    // 出力
    alert(obj);

    // プロパティキーとしてオブジェクトを使う
    anotherObj[obj] = 123;
    ```

`"number"`
<<<<<<< HEAD
: 操作が数学のように数値を期待するとき -- オブジェクトから数値への変換をします:
=======
: For an object-to-number conversion, like when we're doing maths:
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

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

<<<<<<< HEAD
    例えば、二項演算子 `+` は文字列(それらの連結)と数値(それらの加算)両方で動作するので、文字列と数値の両方の場合がありえます。または、オブジェクトが `==` を使用して、文字列、数値またはシンボルと比較されるときです。
=======
    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them), so both strings and numbers would do. Or when an object is compared using `==` with a string, number or a symbol, it's also unclear which conversion should be done.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

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

<<<<<<< HEAD
1. メソッドが存在する場合、`obj[Symbol.toPrimitive](hint)` を呼び出します
2. ない場合、hint が `"string"` であれば
    - `obj.toString()` と `obj.valueOf()` を試します。
3. そうでなく、hint が `"number"` であれば
    - `obj.valueOf()` と `obj.toString()` を試します。
=======
1. Call `obj[Symbol.toPrimitive](hint)` - the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists,
2. Otherwise if hint is `"string"`
    - try `obj.toString()` and `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try `obj.valueOf()` and `obj.toString()`, whatever exists.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

## Symbol.toPrimitive

最初のメソッドから始めてみましょう。`Symbol.toPrimitive` という名前の組み込みシンボルがあります。このシンボルは、次のように変換メソッドの名前として使用します。

```js
obj[Symbol.toPrimitive] = function(hint) {
<<<<<<< HEAD
  // プリミティブな値を返却
  // hint = "string", "number", "default" のどれか
}
=======
  // must return a primitive value
  // hint = one of "string", "number", "default"
};
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea
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

<<<<<<< HEAD
多くの場合、すべてのプリミティブ変換が処理できる "あらゆる状況に対応できる場所" が必要です。 この場合、次のように `toString` を実装するだけで実現できます:
=======
As we can see, the behavior is the same as the previous example with `Symbol.toPrimitive`.

Often we want a single "catch-all" place to handle all primitive conversions. In this case, we can implement `toString` only, like this:
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

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

<<<<<<< HEAD

## ToPrimitive と ToString/ToNumber
=======
## Return types
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

すべてのプリミティブ変換メソッドについて知っておくべき重要なことは、それらが必ずしも "hint" のプリミティブを返すわけではないということです。

`toString()` が正しく文字列を返すか、もしくは `Symbol.toPrimitive` メソッドが "number" の hint で数値を返すかはコントロールできません。

<<<<<<< HEAD
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
=======
The only mandatory thing: these methods must return a primitive, not an object.

```smart header="Historical notes"
For historical reasons, if `toString` or `valueOf` returns an object, there's no error, but such value is ignored (like if the method didn't exist). That's because in ancient times there was no good "error" concept in JavaScript.

In contrast, `Symbol.toPrimitive` *must* return a primitive, otherwise there will be an error.
```

## Further operations

An operation that initiated the conversion gets the primitive, and then continues to work with it, applying further conversions if necessary.

For instance:

- Mathematical operations, except binary plus, convert the primitive to a number:

>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea
    ```js run
    let obj = {
      // toString handles all conversions in the absence of other methods
      toString() {
        return "2";
      }
    };

<<<<<<< HEAD
    alert(obj + 2); // 22 (ToPrimitive は文字列を返します => 連結)
    ```

    数値の例:
=======
    alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
    ```

- Binary plus will concatenate strings in the same situation:
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea
    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

<<<<<<< HEAD
    alert(obj + 2); // 3 (ToPrimitive は boolean を返します, 文字列ではありません => ToNumber)
    ```

```smart header="歴史的な備考"
歴史的な理由で、メソッド `toString` と `valueOf` はプリミティブを *返すべきです*: もしそれらがオブジェクトを返した場合、エラーにはなりませんがそのオブジェクトは無視されます(メソッドが存在しなかったかのように)。

対照的に、`Symbol.toPrimitive` はプリミティブを *返さなければいけません*、そうでなければエラーになります。
```

## サマリ 
=======
    alert(obj + 2); // 22 (conversion to primitive returned a string => concatenation)
    ```

## Summary
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

オブジェクトからプリミティブへの変換は、値としてプリミティブを期待している多くの組み込みの関数や、操作によって自動的に呼び出されます。

<<<<<<< HEAD
3つのタイプ (hint)があります:
- `"string"` (`alert` や、他の文字列変換のため)
- `"number"` (算術演算のため)
- `"default"` (ほとんどありません)
=======
There are 3 types (hints) of it:
- `"string"` (for `alert` and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators)
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea


仕様は、どの操作がどの hint を使用するかを明示的に説明しています。 "期待するものがわからない" 演算子はほとんどなく、その場合は "default" のヒントを使用します。 通常、組み込みオブジェクトの場合、 `"default"` ヒントは `"number"` と同じように扱われるので、最後の2つはよく一緒にされます。

変換のアルゴリズムは:

1. メソッドが存在する場合、`obj[Symbol.toPrimitive](hint)` を呼び出します
2. ない場合は、hint が `"string"` であれば
    - `obj.toString()` と `obj.valueOf()` を試します。
3. そうでない場合、hint が `"number"` であれば
    - `obj.valueOf()` と `obj.toString()` を試します。

実際に、ロギングやデバッグ目的で "人間が読める" オブジェクトの表現を返すような、 "あらゆる状況に対応できる" メソッドとしては、 `obj.toString()` のみの実装で十分なことが多いです。
