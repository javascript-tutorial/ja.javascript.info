
<<<<<<< HEAD
# グローバルオブジェクト

グローバルオブジェクトはどこでも利用可能な変数と関数を提供します。デフォルトで言語や環境に組み込まれています。

ブラウザでは `window`、Node.js では `global`、他の環境では別の名前になっているかもしれません。

最近では、すべての環境でサポートされるべきグローバルオブジェクトの標準的な名前として `globalThis` が言語に追加されました。すべての主要なブラウザでサポートされています。

ここでは、環境がブラウザと仮定して `window` を使用します。もし他の環境で実行させる可能性がある場合には、代わりに `globalThis` を使用するのが良いでしょう。

グローバルオブジェクトのすべてのプロパティへは直接アクセスできます:

```js run
alert("Hello");
// 同じ
window.alert("Hello");
```

ブラウザでは、`var`（`let/const`ではありません！）で宣言されたグローバル関数や変数は、グローバルオブジェクトのプロパティになります:
=======
# Global object

The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment.

In a browser it is named `window`, for Node.js it is `global`, for other environments it may have another name.

Recently, `globalThis` was added to the language, as a standardized name for a global object, that should be supported across all environments. It's supported in all major browsers.

We'll use `window` here, assuming that our environment is a browser. If your script may run in other environments, it's better to use `globalThis` instead.

All properties of the global object can be accessed directly:

```js run
alert("Hello");
// is the same as
window.alert("Hello");
```

In a browser, global functions and variables declared with `var` (not `let/const`!) become the property of the global object:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (became a property of the global object)
```

<<<<<<< HEAD
関数宣言（関数式ではなく、メインコードフローの中で `function` キーワードをもつ文）も同じ効果があります。

これに頼らないでください！この動作は互換性のために存在しています。最近のスクリプトは [JavaScript モジュール](info:modules) を利用します。するとこのようなことは起こりません。

代わりに `let` を使うと、そのようなことは起きません:
=======
Function declarations have the same effect (statements with `function` keyword in the main code flow, not function expressions).

Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use [JavaScript modules](info:modules) where such a thing doesn't happen.

If we used `let` instead, such thing wouldn't happen:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run untrusted refresh
let gLet = 5;

<<<<<<< HEAD
alert(window.gLet); // undefined (グローバルオブジェクトのプロパティにはなりません)
```

その値が重要で、グローバルで見えるようにしたい場合にはプロパティとして直接記述します:

```js run
*!*
// すべてのスクリプトがアクセスできるよう、現在のユーザ情報をグローバルに作成
=======
alert(window.gLet); // undefined (doesn't become a property of the global object)
```

If a value is so important that you'd like to make it available globally, write it directly as a property:

```js run
*!*
// make current user information global, to let all scripts access it
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
window.currentUser = {
  name: "John"
};
*/!*

<<<<<<< HEAD
// コードのどこかで
alert(currentUser.name);  // John

// あるいは、ローカル変数に currentUser がある場合には、
// 明示的に window から取得することも可能です
alert(window.currentUser.name); // John
```

とはいえ、グローバル変数は一般的には推奨されません。できるだけ少なくするべきです。関数が "入力" 変数を得て、明確な "結果" を出力するというコードデザインは、外部やグローバル変数を使用する場合よりも明確でエラーも少なく、テストもしやすいです。

## polyfill のための使用

グローバルオブジェクトを使って、最近の言語機能のサポートをテストします。

例えば、組み込みの `Promise` オブジェクトが存在するかテストします（本当に古いブラウザでは存在しません）:
=======
// somewhere else in code
alert(currentUser.name);  // John

// or, if we have a local variable with the name "currentUser"
// get it from window explicitly (safe!)
alert(window.currentUser.name); // John
```

That said, using global variables is generally discouraged. There should be as few global variables as possible. The code design where a function gets "input" variables and produces certain "outcome" is clearer, less prone to errors and easier to test than if it uses outer or global variables.

## Using for polyfills

We use the global object to test for support of modern language features.

For instance, test if a built-in `Promise` object exists (it doesn't in really old browsers):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

<<<<<<< HEAD
存在しない場合、"polyfill" を作成できます（その環境でサポートされていないが、最近の標準としては存在する機能を追加）。

```js run
if (!window.Promise) {
  window.Promise = ... // 新しい言語機能のカスタム実装
}
```

## サマリ

- グローバルオブジェクトはどこでも参照可能な変数を保持しています。

    `Array` などJavaScript組み込みのものや、`window.innerHeight`（ブラウザのウィンドウの高さ）のような環境固有のものも含みます。
- グローバルオブジェクトは普遍な名前 `globalThis` を持っています。

    ...ですが、多くの場合、`window`(ブラウザ)や`global`(Node.js)のような、昔ながらの環境固有の名前で呼ばれます。
- グローバルオブジェクトに値を保存するのは、プロジェクトで本当にグローバルであるものだけにすべきです。そして、その数はできるだけ少なくすべきです。
- ブラウザでは、[モジュール](info:modules)を使用していない限り、`var` で宣言されたグローバル関数や変数はグローバルオブジェクトのプロパティになります。
- コードを将来性があり理解しやすくするために、グローバルオブジェクトのプロパティへは `window.x` のような直接アクセスしたほうがよいです。
=======
If there's none (say, we're in an old browser), we can create "polyfills": add functions that are not supported by the environment, but exist in the modern standard.

```js run
if (!window.Promise) {
  window.Promise = ... // custom implementation of the modern language feature
}
```

## Summary

- The global object holds variables that should be available everywhere.

    That includes JavaScript built-ins, such as `Array` and environment-specific values, such as `window.innerHeight` -- the window height in the browser.
- The global object has a universal name `globalThis`.

    ...But more often is referred by "old-school" environment-specific names, such as `window` (browser) and `global` (Node.js).
- We should store values in the global object only if they're truly global for our project. And keep their number at minimum.
- In-browser, unless we're using [modules](info:modules), global functions and variables declared with `var` become a property of the global object.
- To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
