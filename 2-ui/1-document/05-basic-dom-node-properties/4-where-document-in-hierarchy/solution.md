
このように出力することによって、どのクラスに属しているかを知ることができます。:

```js run
alert(document); // [object HTMLDocument]
```

もしくは:

```js run
alert(document.constructor.name); // HTMLDocument
```

したがって、`document` は `HTMLDocument` クラスのインスタンスです。

それは階層でどんなところでしょう？

仕様を見ることもできますが、手動で把握する方が早いでしょう。

`__proto__` を使ってプロトタイプチェーンをたどりましょう。

ご存知の通り、クラスのメソッドはコンストラクタの `prototype` にあります。例えば、`HTMLDocument.prototype` は document のためのメソッドを持っています。

また、`prototype` の内部にコンストラクタ関数への参照があります:

```js run
alert(HTMLDocument.prototype.constructor === HTMLDocument); // true
```

<<<<<<< HEAD
すべてのプロトタイプの組み込みクラスは `constructor` 参照があり、`constructor.name` でクラスの名前を得ることができます。 `document`プロトタイプチェーン内のすべてのオブジェクトに対してそれをやってみましょう:
=======
To get a name of the class as a string, we can use `constructor.name`. Let's do it for the whole `document` prototype chain, till class `Node`:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js run
alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
```

`console.dir(document)` を使ってオブジェクトを調べ、 `__proto__` を開くことでこれらの名前を見ることもできます。コンソールは内部的に `constructor` からそれらを取り出します。
