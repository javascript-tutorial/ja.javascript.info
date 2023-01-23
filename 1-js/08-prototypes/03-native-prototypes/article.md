<<<<<<< HEAD
# ネイティブのプロトタイプ

`"prototype"` プロパティはJavaScript自身のコア部分で広く使われています。すべての組み込みのコンストラクタ関数はこれを使用しています。

最初に単純なオブジェクトの場合を見ていき、次により複雑なオブジェクトの場合にどのようになるかを見ていきましょう。

## Object.prototype

空のオブジェクトを出力してみましょう。:
=======
# Native prototypes

The `"prototype"` property is widely used by the core of JavaScript itself. All built-in constructor functions use it.

First we'll look at the details, and then how to use it for adding new capabilities to built-in objects.

## Object.prototype

Let's say we output an empty object:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let obj = {};
alert( obj ); // "[object Object]" ?
```

<<<<<<< HEAD
文字列 `"[object Object]"` を生成するコードはどこにあるのでしょう？ それは組み込みの `toString` メソッドですが、どこにあるのでしょう？ `obj` は空です!

...しかし、短い記法 `obj = {}` は `obj = new Object()` と同じで、その `Object` は組み込みのオブジェクトコンストラクタ関数です。その関数は `toString` や他の関数を持つ巨大なオブジェクトを参照する `Object.prototype` を持っています。

このようになります:

![](object-prototype.svg)

`new Object()` が呼ばれた(もしくはリテラルオブジェクト `{...}` が作られた)とき、その `[[Prototype]]` は前のチャプターで私たちが話してきたルールによって、 `Object.prototype` にセットされます。:

![](object-prototype-1.svg)

その後、`obj.toString()` が呼ばれると、`Object.prototype` からメソッドが取り出されます。

このようにして確認できます:
=======
Where's the code that generates the string `"[object Object]"`? That's a built-in `toString` method, but where is it? The `obj` is empty!

...But the short notation `obj = {}` is the same as `obj = new Object()`, where `Object` is a built-in object constructor function, with its own `prototype` referencing a huge object with `toString` and other methods.

Here's what's going on:

![](object-prototype.svg)

When `new Object()` is called (or a literal object `{...}` is created), the `[[Prototype]]` of it is set to `Object.prototype` according to the rule that we discussed in the previous chapter:

![](object-prototype-1.svg)

So then when `obj.toString()` is called the method is taken from `Object.prototype`.

We can check it like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let obj = {};

alert(obj.__proto__ === Object.prototype); // true

alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true
```

<<<<<<< HEAD
上の `Object.prototype` のチェーンで、追加の `[[Prototype]]` がないことに注意してください。:
=======
Please note that there is no more `[[Prototype]]` in the chain above `Object.prototype`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert(Object.prototype.__proto__); // null
```

<<<<<<< HEAD
## 他の組み込みのプロトタイプ 

`Array`, `Date`, `Function` のような、他の組み込みのオブジェクトもまたプロトタイプにメソッドを保持しています。

例えば、配列 `[1, 2, 3]` を作るとき、デフォルトの `new Array()` コンストラクタが内部で使われます。なので、配列データは新しいオブジェクトに書き込まれ、`Array.prototype` はそのプロトタイプとなり、メソッドを提供します。これは非常にメモリ効率が良いです。

スペックでは、すべての組み込みのプロトタイプは先頭に `Object.prototype` を持っています。なので、"すべてはオブジェクトを継承している" という人もいます。

全体図は次のとおりです（3つの組み込みについて書いています）:

![](native-prototypes-classes.svg)

プロトタイプを手動でチェックしてみましょう。:
=======
## Other built-in prototypes

Other built-in objects such as `Array`, `Date`, `Function` and others also keep methods in prototypes.

For instance, when we create an array `[1, 2, 3]`, the default `new Array()` constructor is used internally. So `Array.prototype` becomes its prototype and provides methods. That's very memory-efficient.

By specification, all of the built-in prototypes have `Object.prototype` on the top. That's why some people say that "everything inherits from objects".

Here's the overall picture (for 3 built-ins to fit):

![](native-prototypes-classes.svg)

Let's check the prototypes manually:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let arr = [1, 2, 3];

<<<<<<< HEAD
// Array.prototype から継承している?
alert( arr.__proto__ === Array.prototype ); // true

// 次に Object.prototype からは継承している?
alert( arr.__proto__.__proto__ === Object.prototype ); // true

// そしてトップの null
alert( arr.__proto__.__proto__.__proto__ ); // null
```

プロトタイプのメソッドのいくつかは重複する可能性があります。例えば、`Array.prototype` はカンマ区切りで要素を表示する自身の `toString` を持っています。:

```js run
let arr = [1, 2, 3]
alert(arr); // 1,2,3 <-- Array.prototype.toString の結果
```

以前見たように、`Object.prototype` も同様に `toString` を持っていますが、`Array.prototype` はチェーンでより近い位置にあるので、配列がもつものが使用されます。
=======
// it inherits from Array.prototype?
alert( arr.__proto__ === Array.prototype ); // true

// then from Object.prototype?
alert( arr.__proto__.__proto__ === Object.prototype ); // true

// and null on the top.
alert( arr.__proto__.__proto__.__proto__ ); // null
```

Some methods in prototypes may overlap, for instance, `Array.prototype` has its own `toString` that lists comma-delimited elements:

```js run
let arr = [1, 2, 3]
alert(arr); // 1,2,3 <-- the result of Array.prototype.toString
```

As we've seen before, `Object.prototype` has `toString` as well, but `Array.prototype` is closer in the chain, so the array variant is used.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff


![](native-prototypes-array-tostring.svg)


<<<<<<< HEAD
Chrome developer console のようなブラウザ内のツールでも継承を表示できます(組み込みオブジェクトのために `console.dir` を使う必要があるかもしれません)。

![](console_dir_array.png)

他の組み込みオブジェクトも同じように動作します。関数でさえも、それらは組み込みの `Function` コンストラクタのオブジェクトであり、メソッドです: `call/apply` など、`Function.prototype` から取り出されたものです。関数には独自の `toString`もあります。
=======
In-browser tools like Chrome developer console also show inheritance (`console.dir` may need to be used for built-in objects):

![](console_dir_array.png)

Other built-in objects also work the same way. Even functions -- they are objects of a built-in `Function` constructor, and their methods (`call`/`apply` and others) are taken from `Function.prototype`. Functions have their own `toString` too.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function f() {}

alert(f.__proto__ == Function.prototype); // true
<<<<<<< HEAD
alert(f.__proto__.__proto__ == Object.prototype); // true, object からの継承
```

## プリミティブ(Primitives)

最も複雑なことは、文字列、数値、ブール値で起こります。

覚えている通り、それらはオブジェクトではありません。しかし、それらのプロパティへアクセスをしようとした場合、組み込みのコンストラクタ `String`, `Number`, `Boolean` を使った一時的なラッパーオブジェクトが作られます。それらはメソッドを提供し、消えます。

それらのオブジェクトは我々には見えない形で作られ、ほとんどのエンジンはそれらを最適化しますが、スペックではこのように正確に説明されています。それらのオブジェクトのメソッドもまた `String.prototype`, `Number.prototype` や `Boolean.prototype` として利用可能なものとしてプロトタイプに存在します。

```warn header="値 `null` と `undefined` はオブジェクトラッパーを持っていません"
特別な値 `null` や `undefined` は別です。それらはオブジェクトラッパーを持ちません。そのため、利用可能なメソッドやプロパティはありません。また、それらに対応するプロトタイプもありません。
```

## ネイティブプロトタイプの変更 

ネイティブプロトタイプは変更することができます。例えば、もしあるメソッドを `String.prototype` に追加した場合、それはすべての文字列で利用可能になります。:
=======
alert(f.__proto__.__proto__ == Object.prototype); // true, inherit from objects
```

## Primitives

The most intricate thing happens with strings, numbers and booleans.

As we remember, they are not objects. But if we try to access their properties, temporary wrapper objects are created using built-in constructors `String`, `Number` and `Boolean`. They provide the methods and disappear.

These objects are created invisibly to us and most engines optimize them out, but the specification describes it exactly this way. Methods of these objects also reside in prototypes, available as `String.prototype`, `Number.prototype` and `Boolean.prototype`.

```warn header="Values `null` and `undefined` have no object wrappers"
Special values `null` and `undefined` stand apart. They have no object wrappers, so methods and properties are not available for them. And there are no corresponding prototypes either.
```

## Changing native prototypes [#native-prototype-change]

Native prototypes can be modified. For instance, if we add a method to `String.prototype`,  it becomes available to all strings:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
String.prototype.show = function() {
  alert(this);
};

"BOOM!".show(); // BOOM!
```

<<<<<<< HEAD
開発の過程で、新しい組み込みメソッドを追加したいと考えてるかもしれません。そして、それをネイティブプロトタイプに加えたいという、若干の誘惑があるかもしれません。ですが、それは一般的には悪い考えです。

```
プロトタイプはグローバルなので、コンフリクトが発生しやすいです。もし２つのライブラリがメソッド `String.prototype.show` を追加している場合、片方はもう一方に上書きされます。

そのため、一般的には、ネイティブのプロトタイプの変更は悪いアイデアとされています。
```

**現代のプログラミングでは、ネイティブプロトタイプの変更が認められたケースが１つだけあります。それはポリフィルです。**

ポリフィルは JavaScript のスペックには存在するが、特定のJavaScript エンジンではまだサポートされていないメソッドの代わりを用意することを指す用語です。

手動で実装し、組み込みのプロトタイプにそれを取り込むことができます。

例:

```js run
if (!String.prototype.repeat) { // もしこのようなメソッドがない場合
  // prototype に追加します

  String.prototype.repeat = function(n) {
    // 文字列を n 回繰り返す

    // 実際、このコードはこれより複雑になります
    // "n" の負の値に対するエラーのスロー
    // 完全なアルゴリズムは仕様にあります
=======
During the process of development, we may have ideas for new built-in methods we'd like to have, and we may be tempted to add them to native prototypes. But that is generally a bad idea.

```warn
Prototypes are global, so it's easy to get a conflict. If two libraries add a method `String.prototype.show`, then one of them will be overwriting the method of the other.

So, generally, modifying a native prototype is considered a bad idea.
```

**In modern programming, there is only one case where modifying native prototypes is approved. That's polyfilling.**

Polyfilling is a term for making a substitute for a method that exists in the JavaScript specification, but is not yet supported by a particular JavaScript engine.

We may then implement it manually and populate the built-in prototype with it.

For instance:

```js run
if (!String.prototype.repeat) { // if there's no such method
  // add it to the prototype

  String.prototype.repeat = function(n) {
    // repeat the string n times

    // actually, the code should be a little bit more complex than that
    // (the full algorithm is in the specification)
    // but even an imperfect polyfill is often considered good enough
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    return new Array(n + 1).join(this);
  };
}

alert( "La".repeat(3) ); // LaLaLa
```


<<<<<<< HEAD
## プロトタイプからの借用 

チャプター <info:call-apply-decorators#method-borrowing> で私たちはメソッドの借用について話しました。:

これはあるオブジェクトからメソッドをとり、それを別のオブジェクトにコピーするときです。

ネイティブプロトタイプのメソッドのいくつかはしばしば借用されます。

例えば、配列ライクなオブジェクトを作成している場合、そこにいくつかの `Array` メソッドをそこにコピーしたい場合があります。

例
=======
## Borrowing from prototypes

In the chapter <info:call-apply-decorators#method-borrowing> we talked about method borrowing.

That's when we take a method from one object and copy it into another.

Some methods of native prototypes are often borrowed.

For instance, if we're making an array-like object, we may want to copy some `Array` methods to it.

E.g.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let obj = {
  0: "Hello",
  1: "world!",
  length: 2,
};

*!*
obj.join = Array.prototype.join;
*/!*

alert( obj.join(',') ); // Hello,world!
```

<<<<<<< HEAD
組み込みの `join` メソッドの内部アルゴリズムは、正しいインデックスと `length` プロパティのみを考慮するため、これは機能します。オブジェクトがたしかに配列かどうかはチェックしません。多くの組み込みメソッドはこのようになっています。

別の可能性は、`obj.__proto__` を `Array.prototype` に設定することで継承することで、これによりすべての　`Array` メソッドは自動的に `obj` で利用可能になります。

ですが、`obj` が既に別のオブジェクトを継承していた場合にはこれは不可能です。一度に1つのオブジェクトしか継承できません。

借用メソッドは柔軟であり、必要であれば異なるオブジェクトから機能を混ぜることも可能です。

## サマリ 

- すべての組み込みオブジェクトは同じパターンに従います。:
    - メソッドはプロトタイプに保持されています(`Array.prototype`, `Object.prototype`, `Date.prototype` など)。
    - オブジェクト自身はデータのみを保持します(配列アイテム、オブジェクトプロパティ、日付)。
- プリミティブもまたラッパーオブジェクトのプロトタイプにメソッドを保持します。: `Number.prototype`, `String.prototype`, `Boolean.prototype` 。`undefined` と `null` にだけはラッパーオブジェクトはありません。
- 組み込みのプロトタイプを変更したり、新しいメソッドを実装することができます。 しかし、それを変更することはお勧めしません。 おそらく唯一許可されるケースは、新しい標準が追加されたものの、まだエンジンのJavaScriptメソッドではサポートされていないときだけです。
=======
It works because the internal algorithm of the built-in `join` method only cares about the correct indexes and the `length` property. It doesn't check if the object is indeed an array. Many built-in methods are like that.

Another possibility is to inherit by setting `obj.__proto__` to `Array.prototype`, so all `Array` methods are automatically available in `obj`.

But that's impossible if `obj` already inherits from another object. Remember, we only can inherit from one object at a time.

Borrowing methods is flexible, it allows to mix functionalities from different objects if needed.

## Summary

- All built-in objects follow the same pattern:
    - The methods are stored in the prototype (`Array.prototype`, `Object.prototype`, `Date.prototype`, etc.)
    - The object itself stores only the data (array items, object properties, the date)
- Primitives also store methods in prototypes of wrapper objects: `Number.prototype`, `String.prototype` and `Boolean.prototype`. Only `undefined` and `null` do not have wrapper objects
- Built-in prototypes can be modified or populated with new methods. But it's not recommended to change them. The only allowable case is probably when we add-in a new standard, but it's not yet supported by the JavaScript engine
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
