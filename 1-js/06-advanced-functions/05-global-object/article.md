
<<<<<<< HEAD

# グローバルオブジェクト

JavaScript が作られたとき、すべてのグローバル変数と関数を提供する "グローバルオブジェクト" と言う考え方がありました。複数のブラウザ内スクリプトがその単一のグローバルオブジェクトを使用し、それを介して変数を共有することが計画されていました。

それ以来、JavaScriptは大きく進化し、グローバル変数を介してコードをリンクする考えはそれほど魅力的ではありませんでした。 現代のJavaScriptでは、モジュールのコンセプトが採用されました。

しかし、グローバルオブジェクトはまだ仕様に残っています。

ブラウザでは、"window" 、Node.JS では "global"、 その他の環境では別の名前を持つ場合があります。

それは2つのことをします:

1. 仕様や環境で定義されている組み込み関数や値へのアクセスを提供します。例えば、私たちは `alert` を直接、もしくは `window` のメソッドとして呼ぶことができます。:

    ```js run
    alert("Hello");

    // 同じ
    window.alert("Hello");
    ```

    他の組み込みに対しても同様です。E.g. `Array` の代わりに、`window.Array` と書くことができます。

2. グローバルな関数宣言と `var` 変数へのアクセスを提供します。私たちはそのプロパティを使って、それらの読み書きをすることが出来ます。例えば:
=======
# Global object

The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment.

In a browser it is named `window`, for Node.js it is `global`, for other environments it may have another name.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Recently, `globalThis` was added to the language, as a standartized name for a global object, that should be supported across all environments. In some browsers, namely non-Chromium Edge, `globalThis` is not yet supported, but can be easily polyfilled.

We'll use `window` here, assuming that our environment is a browser. If your script may run in other environments, it's better to use `globalThis` instead.

<<<<<<< HEAD
    // windows から読める
    alert( window.phrase ); // Hello (グローバル var)
    alert( window.sayHi ); // function (グローバル関数宣言)

    // windows へ書き込める (新しいグローバル変数作成)
    window.test = 5;

    alert(test); // 5
    ```

...しかし、グローバルオブジェクトは `let/const` で宣言された変数は持っていません!

```js untrusted run no-strict refresh
*!*let*/!* user = "John";
alert(user); // John

alert(window.user); // undefined, don't have let
alert("user" in window); // false
```

```smart header="グローバルオブジェクトはグローバル環境レコードではありません"
ES-2015 より以前の ECMAScript のバージョンでは、 `let/const` 変数はなく `var` だけでした。また、グローバルオブジェクトはグローバル環境レコードとして使われていました(言葉は少し違っていましたが)。

しかし、ES-2015からは、これらのエンティティが分割されています。 環境レコードを持つグローバルなレキシカル環境があります。 そして、グローバル変数のいくつかを提供するグローバルオブジェクトがあります。

実際の違いとして、グローバルな `let/const` 変数は明確にグローバル環境レコードのプロパティですが、グローバルオブジェクトには存在しません。

当然ながら、それは古代からある "すべてのグローバルなもの" へアクセスする方法としてのグローバルオブジェクトがあると言う考え方のためです。現代ではそれは良いことだとは考えられていません。`let/const` のような現代の言語機能はそれと親和性はありませんが、古いものはまだ互換があります。
```

## "window" の利用 

Node.JSのようなサーバサイド環境では、`global` オブジェクトは非常に稀にしか使われません。

ブラウザでは `window` が使われることはありますが。

通常、それを使うのは良い考えではありませんが、ここで幾つかありそうな例を挙げます。

1. もし関数がローカルに同じ名前の物を持っている状態で、グローバル変数にアクセスしたい場合

    ```js untrusted run no-strict refresh
    var user = "Global";

    function sayHi() {
      var user = "Local";

    *!*
      alert(window.user); // Global
    */!*
    }

    sayHi();
    ```

    このような利用は回避策です。 変数に異なる名前を付ける方が良いでしょう。このようなコードを書くために使用する必要はありません。そして `user` の前の `"var"` に注意してください。このトリックは `let` 変数では機能しません。

2. 特定のグローバル変数または組み込みが存在するかどうかを確認する場合

    例えば、グローバル関数 `XMLHttpRequest` が存在するかどうか確認したいとします。

    もし `XMLHttpRequest` がない場合はエラーが起きる(変数未定義で)ので、 `if (XMLHttpRequest)` と書くことはできません。

    しかし、`window.XMLHttpRequest` でそれを読むことができます:

    ```js run
    if (window.XMLHttpRequest) {
      alert('XMLHttpRequest exists!')
    }
    ```

    もしそのようなグローバル関数がなければ、`window.XMLHttpRequest` は単に存在しないオブジェクトプロパティです。それは `undefined` であり、エラーにはならず動作します。

    また、`window` なしで検査することも出来ます:

    ```js
    if (typeof XMLHttpRequest == 'function') {
      /* is there a function XMLHttpRequest? */
    }
    ```

    これは `window` を使っていませんが、(理論的には)信頼性が低いです。なぜなら、 `typeof` はローカルの XMLHttpRequest を使う可能性があるためです。
=======
All properties of the global object can be accessed directly:

```js run
alert("Hello");
// is the same as
window.alert("Hello");
```

In a browser, global functions and variables declared with `var` (not `let/const`!) become the property of the global object:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (became a property of the global object)
```

Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use [JavaScript modules](info:modules) where such thing doesn't happen.

If we used `let` instead, such thing wouldn't happen:

```js run untrusted refresh
let gLet = 5;
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

alert(window.gLet); // undefined (doesn't become a property of the global object)
```

<<<<<<< HEAD
3. 正当な window から変数を取得する場合です。恐らくこれが最も有効なユースケースです。

    ブラウザは複数のウィンドウやタブを開いている場合があります。また `<iframe>` に別のものが埋め込まれている場合もあります。すべてのブラウザウィンドウは自身の `window` オブジェクトとグローバル変数を持っています。JavaScriptを使用すると、同じサイト（同じプロトコル、ホスト、ポート）からのウィンドウが相互に変数にアクセスできるようになります。

    その使用法は現在のところ私たちの範囲を少し超えていますが、次のようになります。:
    ```html run
    <iframe src="/" id="iframe"></iframe>

    <script>
      alert( innerWidth ); // 現在のウィンドウの innerWidth プロパティを取得します(ブラウザのみ)
      alert( Array ); // 現在のウィンドウの配列を取得します(JavaScriptコアの組み込み)

      // iframe が読み込まれたとき...
      iframe.onload = function() {
        // iframe ウィンドウの幅を取得
      *!*
        alert( iframe.contentWindow.innerWidth );
      */!*
        // iframe ウィンドウから組み込みの配列を取得
      *!*
        alert( iframe.contentWindow.Array );
      */!*
      };
    </script>
    ```

    ここで、最初の2つの alert は現在のウィンドウを使い、後の2つは、`iframe` ウィンドウからの変数を取ります。`iframe` が同じプロトコル/ホスト/ポートから発信されている場合、任意の変数にすることができます。

## "this" とグローバルオブジェクト 

時々、`this` の値はまさにグローバルオブジェクトです。それはめったに使われませんが、いくつかのスクリプトはそれに依存しています。

1. ブラウザにおいて、グローバル領域の `this` の値は `window` です:

    ```js run
    // 関数の外側
    alert( this === window ); // true
    ```

    他の非ブラウザ環境では、このようなケースでは `this` として別の値を使う可能性があります。

2. 非 strict モードで `this` を使った関数が呼ばれた場合、`this` としてグローバルオブジェクトを取ります:

    ```js run no-strict
    // not in strict mode (!)
    function f() {
      alert(this); // [object Window]
    }

    f(); // オブジェクトなしでの呼び出し
    ```

    仕様によると、Node.JS のような非ブラウザも含め、このケースでの `this` はグローバルオブジェクトである必要があります。それは古いスクリプトのための互換性です。strict モードでは、`this` は `undefined` になります。
=======
If a value is so important that you'd like to make it available globally, write it directly as a property:

```js run
*!*
// make current user information global, to let all scripts access it
window.currentUser = {
  name: "John"
};
*/!*

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
```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

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

    ...But more often is referred by "old-school" environment-specific names, such as `window` (browser) and `global` (Node.js). As `globalThis` is a recent proposal, it's not supported in non-Chromium Edge (but can be polyfilled).
- We should store values in the global object only if they're truly global for our project. And keep their number at minimum.
- In-browser, unless we're using [modules](info:modules), global functions and variables declared with `var` become a property of the global object.
- To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
