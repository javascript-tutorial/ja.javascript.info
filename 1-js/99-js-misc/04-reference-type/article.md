
<<<<<<< HEAD
# 参照型 

```warn header="詳細な言語機能"
このセクションでは、特殊なケースをより理解するための高度なトピックについて説明します。

あなたが速く読み進めたいのであれば、スキップまたは別の機会に見てください。
```

複雑なメソッド呼び出しは、 `this` を失う可能性があります。例えば:
=======
# Reference Type

```warn header="In-depth language feature"
This article covers an advanced topic, to understand certain edge-cases better.

It's not important. Many experienced developers live fine without knowing it. Read on if you want to know how things work under the hood.
```

A dynamically evaluated method call can lose `this`.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

<<<<<<< HEAD
user.hi(); // John (シンプルな呼び出しは動作します)

*!*
// 今、name に応じて user.hi または user.bye を読んでみましょう
=======
user.hi(); // works

// now let's call user.hi or user.bye depending on the name
*!*
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
(user.name == "John" ? user.hi : user.bye)(); // Error!
*/!*
```

<<<<<<< HEAD
最後の行では、`user.hi` か `user.bye` を選択する三項演算子があります。このケースでは、結果は `user.hi` です。

メソッドは丸括弧 `()` ですぐに呼び出されます。しかし、それは正しく動きません!

呼び出しはエラーになります、なぜなら、呼び出しの内側の `"this"` の値は `undefined` になるからです。

これは動きます (オブジェクトドットメソッド):
=======
On the last line there is a conditional operator that chooses either `user.hi` or `user.bye`. In this case the result is `user.hi`.

Then the method is immediately called with parentheses `()`. But it doesn't work correctly!

As you can see, the call results in an error, because the value of `"this"` inside the call becomes `undefined`.

This works (object dot method):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
user.hi();
```

<<<<<<< HEAD
これはダメです (評価されたメソッド):
=======
This doesn't (evaluated method):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
(user.name == "John" ? user.hi : user.bye)(); // Error!
```

<<<<<<< HEAD
なぜでしょう？なぜそのようなことが起こるのか理解したい場合、`obj.method()` の呼び出しがどのように機能するのかを理解してみましょう。

## 参照型の説明

よく見ると、 `obj.method()` 文に2つの操作があります:

1. まず、ドット `'.'` がプロパティ `obj.method` を抽出します。
2. 次に、丸括弧 `()` でそれを実行します。

そして、`this` についての情報は最初の処理から２つ目の処理へどのように渡されるでしょう？

それらの操作を別々の行に書いた場合、`this` が失われるのは明らかでしょう:
=======
Why? If we want to understand why it happens, let's get under the hood of how `obj.method()` call works.

## Reference type explained

Looking closely, we may notice two operations in `obj.method()` statement:

1. First, the dot `'.'` retrieves the property `obj.method`.
2. Then parentheses `()` execute it.

So, how does the information about `this` get passed from the first part to the second one?

If we put these operations on separate lines, then `this` will be lost for sure:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
<<<<<<< HEAD
}

*!*
// メソッドの取得呼び出しを2行に分けます
let hi = user.hi;
hi(); // Error, this は undefined なので
*/!*
```

ここで `hi = user.hi` は関数を変数の中においています。そして最後の行は完全に独立しています。なので、`this` がありません。

**`user.hi()` 呼び出しを動作させるために、JavaScriptはトリックを使います -- ドット `'.'` は関数ではなく、特別な[参照型](https://tc39.github.io/ecma262/#sec-reference-specification-type)を返します。**

参照型は "仕様上の型" です。私たちは明示的にそれを使うことはできませんが、言語の中で内部的に使われています。

参照型の値は、３つの値の組み合わせ `(base, name, strict)` です。ここで:

- `base` はオブジェクトです。
- `name` はプロパティです。
- `strict` は `use strict` が効いている場合は true です。

`user.hi` へのプロパティアクセスの結果は、関数ではなく参照型です。strict mode での `user.hi` はこうなります:

```js
// 参照型の値
(user, "hi", true)
```

参照型に対して丸括弧 `()` 呼び出しがされると、それらはオブジェクトとそのメソッドについての完全な情報を受け取り、正しい `this` (このケースでは `user`)をセットできます。

参照型はドット `.` から呼び出し括弧 `()` へ情報を渡す目的の特別な "中間" の内部型です。

代入 `hi = user.hi` のような他の操作は、参照型を破棄し、`user.hi`(関数)の値を渡します。従って、それ以降の操作は全て `this` を "失います"。

なので、結果として、`this` の値は、関数がドット `obj.method()`、もしくは角括弧 `obj[method]()`構文を使って直接呼び出された場合のみ正しく渡されます。このチュートリアルの後半では、[func.bind()](/bind#solution-2-bind) など、この問題を解決するためのさまざまな方法を学びます。

## サマリ

参照型は言語の内部の型です。

`obj.method()` 内の `.` のようなプロパティの読み取りでは、正確なプロパティ値ではなくプロパティ値とそれが取得されたオブジェクトの両方を保持する特別な "参照型" の値を返します。

これはその後に続くメソッド呼び出し `()` がオブジェクトを取得しそこに `this` を設定するためです。

その他すべての操作では、参照型は自動的にプロパティ値になります（上のケースでは関数）。

このメカニズム全体は我々の目からは見えません。式を使用して、メソッドがオブジェクトから動的に取得される場合など、微妙なケースでのみ問題になります。
=======
};

*!*
// split getting and calling the method in two lines
let hi = user.hi;
hi(); // Error, because this is undefined
*/!*
```

Here `hi = user.hi` puts the function into the variable, and then on the last line it is completely standalone, and so there's no `this`.

**To make `user.hi()` calls work, JavaScript uses a trick -- the dot `'.'` returns not a function, but a value of the special [Reference Type](https://tc39.github.io/ecma262/#sec-reference-specification-type).**

The Reference Type is a "specification type". We can't explicitly use it, but it is used internally by the language.

The value of Reference Type is a three-value combination `(base, name, strict)`, where:

- `base` is the object.
- `name` is the property name.
- `strict` is true if `use strict` is in effect.

The result of a property access `user.hi` is not a function, but a value of Reference Type. For `user.hi` in strict mode it is:

```js
// Reference Type value
(user, "hi", true)
```

When parentheses `()` are called on the Reference Type, they receive the full information about the object and its method, and can set the right `this` (`user` in this case).

Reference type is a special "intermediary" internal type, with the purpose to pass information from dot `.` to calling parentheses `()`.

Any other operation like assignment `hi = user.hi` discards the reference type as a whole, takes the value of `user.hi` (a function) and passes it on. So any further operation "loses" `this`.

So, as the result, the value of `this` is only passed the right way if the function is called directly using a dot `obj.method()` or square brackets `obj['method']()` syntax (they do the same here). There are various ways to solve this problem such as [func.bind()](/bind#solution-2-bind).

## Summary

Reference Type is an internal type of the language.

Reading a property, such as with dot `.` in `obj.method()` returns not exactly the property value, but a special "reference type" value that stores both the property value and the object it was taken from.

That's for the subsequent method call `()` to get the object and set `this` to it.

For all other operations, the reference type automatically becomes the property value (a function in our case).

The whole mechanics is hidden from our eyes. It only matters in subtle cases, such as when a method is obtained dynamically from the object, using an expression.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
