
<<<<<<< HEAD
# オブジェクトからプリミティブへの変換

オブジェクトが加算 `obj1 + obj2`、減算 `obj1 - obj2`, または `alert(obj)` を使って出力されるとき、何が起きるでしょう？

この場合、オブジェクトはプリミティブへ自動変換され、その後演算が行われます。

チャプター <info:type-conversions> では、プリミティブな数値、文字列や真偽値変換のルールを見てきました。しかしまだオブジェクトが残っています。ここまでのチュートリアルでメソッドとシンボルについて学んだので、今ならそれらを理解することができます。

1. すべてのオブジェクトは真偽値のコンテキストでは `true` です。文字列と数値変換だけです。
2. 数値変換は、オブジェクトを減算したり数学的な関数を適用する時に発生します。例えば `Date` オブジェクト(チャプター <info:date> で説明されています)は減算することができ、 `date1 - date2` の結果は2つの日付間の時間差になります。
3. 文字列変換は、通常 `alert(obj)` のようにオブジェクトを出力したり、似たようなコンテキストのときに起こります。

## ToPrimitive

特別なオブジェクトメソッドを使って文字列や数値をを調整することができます。

[仕様](https://tc39.github.io/ecma262/#sec-toprimitive)に記載されている型変換には、"hint(ヒント)" と呼ばれる、３つのバリエーションがあります。

`"string"`
: 操作が `alert` のように文字列を期待するとき、オブジェクトから文字列への変換をします:

    ```js
    // 出力
    alert(obj);

    // プロパティキーとしてオブジェクトを使う
=======
# Object to primitive conversion

What happens when objects are added `obj1 + obj2`, subtracted `obj1 - obj2` or printed using `alert(obj)`?

JavaScript doesn't allow you to customize how operators work on objects. Unlike some other programming languages, such as Ruby or C++, we can't implement a special object method to handle addition (or other operators).

In case of such operations, objects are auto-converted to primitives, and then the operation is carried out over these primitives and results in a primitive value.

That's an important limitation: the result of `obj1 + obj2` (or another math operation) can't be another object!

E.g. we can't make objects representing vectors or matrices (or achievements or whatever), add them and expect a "summed" object as the result. Such architectural feats are automatically "off the board".

So, because we can't technically do much here, there's no maths with objects in real projects. When it happens, with rare exceptions, it's because of a coding mistake.

In this chapter we'll cover how an object converts to primitive and how to customize it.

We have two purposes:

1. It will allow us to understand what's going on in case of coding mistakes, when such an operation happened accidentally.
2. There are exceptions, where such operations are possible and look good. E.g. subtracting or comparing dates (`Date` objects). We'll come across them later.

## Conversion rules

In the chapter <info:type-conversions> we've seen the rules for numeric, string and boolean conversions of primitives. But we left a gap for objects. Now, as we know about methods and symbols it becomes possible to fill it.

1. There's no conversion to boolean. All objects are `true` in a boolean context, as simple as that. There exist only numeric and string conversions.
2. The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, `Date` objects (to be covered in the chapter <info:date>) can be subtracted, and the result of `date1 - date2` is the time difference between two dates.
3. As for the string conversion -- it usually happens when we output an object with `alert(obj)` and in similar contexts.

We can implement string and numeric conversion by ourselves, using special object methods.

Now let's get into technical details, because it's the only way to cover the topic in-depth.

## Hints

How does JavaScript decide which conversion to apply?

There are three variants of type conversion, that happen in various situations. They're called "hints", as described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: For an object-to-string conversion, when we're doing an operation on an object that expects a string, like `alert`:

    ```js
    // output
    alert(obj);

    // using object as a property key
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    anotherObj[obj] = 123;
    ```

`"number"`
<<<<<<< HEAD
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
=======
: For an object-to-number conversion, like when we're doing maths:

    ```js
    // explicit conversion
    let num = Number(obj);

    // maths (except binary plus)
    let n = +obj; // unary plus
    let delta = date1 - date2;

    // less/greater comparison
    let greater = user1 > user2;
    ```

    Most built-in mathematical functions also include such conversion.

`"default"`
: Occurs in rare cases when the operator is "not sure" what type to expect.

    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them). So if a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.

    Also, if an object is compared using `==` with a string, number or a symbol, it's also unclear which conversion should be done, so the `"default"` hint is used.

    ```js
    // binary plus uses the "default" hint
    let total = obj1 + obj2;

    // obj == number uses the "default" hint
    if (user == 1) { ... };
    ```

    The greater and less comparison operators, such as `<` `>`, can work with both strings and numbers too. Still, they use the `"number"` hint, not `"default"`. That's for historical reasons.

In practice though, things are a bit simpler.

All built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And we probably should do the same.

Still, it's important to know about all 3 hints, soon we'll see why.

**To do the conversion, JavaScript tries to find and call three object methods:**

1. Call `obj[Symbol.toPrimitive](hint)` - the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.

## Symbol.toPrimitive

Let's start from the first method. There's a built-in symbol named `Symbol.toPrimitive` that should be used to name the conversion method, like this:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // here goes the code to convert this object to a primitive
  // it must return a primitive value
  // hint = one of "string", "number", "default"
};
```

If the method `Symbol.toPrimitive` exists, it's used for all hints, and no more methods are needed.

For instance, here `user` object implements it:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

<<<<<<< HEAD
// 変換動作の確認:
=======
// conversions demo:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

<<<<<<< HEAD
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
=======
As we can see from the code, `user` becomes a self-descriptive string or a money amount, depending on the conversion. The single method `user[Symbol.toPrimitive]` handles all conversion cases.

## toString/valueOf

If there's no `Symbol.toPrimitive` then JavaScript tries to find methods `toString` and `valueOf`:

- For the `"string"` hint: call `toString` method, and if it doesn't exist or if it returns an object instead of a primitive value, then call `valueOf` (so `toString` has the priority for string conversions).
- For other hints: call `valueOf`, and if it doesn't exist or if it returns an object instead of a primitive value, then call `toString` (so `valueOf` has the priority for maths).

Methods `toString` and `valueOf` come from ancient times. They are not symbols (symbols did not exist that long ago), but rather "regular" string-named methods. They provide an alternative "old-style" way to implement the conversion.

These methods must return a primitive value. If `toString` or `valueOf` returns an object, then it's ignored (same as if there were no method).

By default, a plain object has following `toString` and `valueOf` methods:

- The `toString` method returns a string `"[object Object]"`.
- The `valueOf` method returns the object itself.

Here's the demo:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

<<<<<<< HEAD
そのため、`alert` などでオブジェクトを文字列として使用を試みた場合、デフォルトでは `[object Object]` が表示されます。

そして、デフォルトの `valueOf` は、混乱を避けるために、完全を期するためにここで言及しています。ご覧の通り、オブジェクト自体を返すため無視されます。これは歴史的な理由によるものです。したがって、存在しないものと想定できます。

これらのメソッドを実装してみましょう。

例えば、ここで `user` は `Symbol.toPrimitive` の代わりに、`toString` と `valueOf` を使って上と同じことをしています:
=======
So if we try to use an object as a string, like in an `alert` or so, then by default we see `[object Object]`.

The default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don't ask me why, that's for historical reasons. So we can assume it doesn't exist.

Let's implement these methods to customize the conversion.

For instance, here `user` does the same as above using a combination of `toString` and `valueOf` instead of `Symbol.toPrimitive`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = {
  name: "John",
  money: 1000,

<<<<<<< HEAD
  // hint="string" の場合
=======
  // for hint="string"
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  toString() {
    return `{name: "${this.name}"}`;
  },

<<<<<<< HEAD
  // hint="number" or "default" の場合
=======
  // for hint="number" or "default"
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

<<<<<<< HEAD
ご覧の通り、振る舞いは `Symbol.toPrimitive` の例と同じです。

多くの場合、すべてのプリミティブ変換が処理できる "あらゆる状況に対応できる場所" が必要です。 この場合、次のように `toString` を実装するだけで実現できます:
=======
As we can see, the behavior is the same as the previous example with `Symbol.toPrimitive`.

Often we want a single "catch-all" place to handle all primitive conversions. In this case, we can implement `toString` only, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
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
=======
In the absence of `Symbol.toPrimitive` and `valueOf`, `toString` will handle all primitive conversions.

### A conversion can return any primitive type

The important thing to know about all primitive-conversion methods is that they do not necessarily return the "hinted" primitive.

There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for the hint `"number"`.

The only mandatory thing: these methods must return a primitive, not an object.

```smart header="Historical notes"
For historical reasons, if `toString` or `valueOf` returns an object, there's no error, but such value is ignored (like if the method didn't exist). That's because in ancient times there was no good "error" concept in JavaScript.

In contrast, `Symbol.toPrimitive` is stricter, it *must* return a primitive, otherwise there will be an error.
```

## Further conversions

As we know already, many operators and functions perform type conversions, e.g. multiplication `*` converts operands to numbers.

If we pass an object as an argument, then there are two stages of calculations:
1. The object is converted to a primitive (using the rules described above).
2. If necessary for further calculations, the resulting primitive is also converted.

For instance:

```js run
let obj = {
  // toString handles all conversions in the absence of other methods
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  toString() {
    return "2";
  }
};

<<<<<<< HEAD
alert(obj * 2); // 4, ToPrimitive は "2" を与えるので, 2 になります
```

1. 乗算 `obj * 2` は最初にオブジェクトをプリミティブに変換します（文字列の `"2"`）
2. `"2" * 2` は `2 * 2` になります（文字列が数値に変換されます）

二項演算子プラスは同じ状況で文字列を連携します。:
=======
alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
```

1. The multiplication `obj * 2` first converts the object to primitive (that's a string `"2"`).
2. Then `"2" * 2` becomes `2 * 2` (the string is converted to number).

Binary plus will concatenate strings in the same situation, as it gladly accepts a string:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let obj = {
  toString() {
    return "2";
  }
};

<<<<<<< HEAD
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
=======
alert(obj + 2); // 22 ("2" + 2), conversion to primitive returned a string => concatenation
```

## Summary

The object-to-primitive conversion is called automatically by many built-in functions and operators that expect a primitive as a value.

There are 3 types (hints) of it:
- `"string"` (for `alert` and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators, usually objects implement it the same way as `"number"`)

The specification describes explicitly which operator uses which hint.

The conversion algorithm is:

1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.

All these methods must return a primitive to work (if defined).

In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for string conversions that should return a "human-readable" representation of an object, for logging or debugging purposes.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
