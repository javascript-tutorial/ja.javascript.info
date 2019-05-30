
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

The global object provides variables and functions that are available anywhere. Mostly, the ones that are built into the language or the host environment.

In a browser it is named "window", for Node.js it is "global", for other environments it may have another name.

For instance, we can call `alert` as a method of `window`:

```js run
alert("Hello");

// the same as
window.alert("Hello");
```

We can reference other built-in functions like `Array` as `window.Array` and create our own properties on it.

## Browser: the "window" object
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

For historical reasons, in-browser `window` object is a bit messed up.

1. It provides the "browser window" functionality, besides playing the role of a global object.

<<<<<<< HEAD
    // windows から読める
    alert( window.phrase ); // Hello (グローバル var)
    alert( window.sayHi ); // function (グローバル関数宣言)

    // windows へ書き込める (新しいグローバル変数作成)
    window.test = 5;
=======
    We can use `window` to access properties and methods, specific to the browser window:

    ```js run
    alert(window.innerHeight); // shows the browser window height
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

    window.open('http://google.com'); // opens a new browser window
    ```

<<<<<<< HEAD
...しかし、グローバルオブジェクトは `let/const` で宣言された変数は持っていません!
=======
2. Top-level `var` variables and function declarations automatically become properties of `window`.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

    For instance:
    ```js untrusted run no-strict refresh
    var x = 5;

    alert(window.x); // 5 (var x becomes a property of window)

<<<<<<< HEAD
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
=======
    window.x = 0;

    alert(x); // 0, variable modified
    ```

    Please note, that doesn't happen with more modern `let/const` declarations:

    ```js untrusted run no-strict refresh
    let x = 5;

    alert(window.x); // undefined ("let" doesn't create a window property)
    ```

3. Also, all scripts share the same global scope, so variables declared in one `<script>` become visible in  another ones:

    ```html run
    <script>
      var a = 1;
      let b = 2;
    </script>

    <script>
      alert(a); // 1
      alert(b); // 2
    </script>
    ```

4. And, a minor thing, but still: the value of `this` in the global scope is `window`.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

    ```js untrusted run no-strict refresh
    alert(this); // window
    ```

<<<<<<< HEAD
    このような利用は回避策です。 変数に異なる名前を付ける方が良いでしょう。このようなコードを書くために使用する必要はありません。そして `user` の前の `"var"` に注意してください。このトリックは `let` 変数では機能しません。

2. 特定のグローバル変数または組み込みが存在するかどうかを確認する場合

    例えば、グローバル関数 `XMLHttpRequest` が存在するかどうか確認したいとします。

    もし `XMLHttpRequest` がない場合はエラーが起きる(変数未定義で)ので、 `if (XMLHttpRequest)` と書くことはできません。

    しかし、`window.XMLHttpRequest` でそれを読むことができます:
=======
Why was it made like this? At the time of the language creation, the idea to merge multiple aspects into a single `window` object was to "make things simple". But since then many things changed. Tiny scripts became big applications that require proper architecture.

Is it good that different scripts (possibly from different sources) see variables of each other?

No, it's not, because it may lead to naming conflicts: the same variable name can be used in two scripts for different purposes, so they will conflict with each other.

As of now, the multi-purpose `window` is considered a design mistake in the language.

Luckily, there's a "road out of hell", called "JavaScript modules".
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

If we set `type="module"` attribute on a `<script>` tag, then such script is considered a separate "module" with its own top-level scope (lexical environment), not interfering with `window`.

<<<<<<< HEAD
    もしそのようなグローバル関数がなければ、`window.XMLHttpRequest` は単に存在しないオブジェクトプロパティです。それは `undefined` であり、エラーにはならず動作します。

    また、`window` なしで検査することも出来ます:
=======
- In a module, `var x` does not become a property of `window`:

    ```html run
    <script type="module">
      var x = 5;
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

      alert(window.x); // undefined
    </script>
    ```

<<<<<<< HEAD
    これは `window` を使っていませんが、(理論的には)信頼性が低いです。なぜなら、 `typeof` はローカルの XMLHttpRequest を使う可能性があるためです。
=======
- Two modules that do not see variables of each other:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

    ```html run
    <script type="module">
      let x = 5;
    </script>

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
=======
    <script type="module">
      alert(window.x); // undefined
      alert(x); // Error: undeclared variable
    </script>
    ```

- And, the last minor thing, the top-level value of `this` in a module is `undefined` (why should it be `window` anyway?):

    ```html run
    <script type="module">
      alert(this); // undefined
    </script>
    ```

**Using `<script type="module">` fixes the design flaw of the language by separating top-level scope from `window`.**

We'll cover more features of modules later, in the chapter [](info:modules).

## Valid uses of the global object

1. Using global variables is generally discouraged. There should be as few global variables as possible, but if we need to make something globally visible, we may want to put it into `window` (or `global` in Node.js).

    Here we put the information about the current user into a global object, to be accessible from all other scripts:

    ```js run
    // explicitly assign it to `window`
    window.currentUser = {
      name: "John",
      age: 30
    };

    // then, elsewhere, in another script
    alert(window.currentUser.name); // John
    ```

2. We can test the global object for support of modern language features.

    For instance, test if a build-in `Promise` object exists (it doesn't in really old browsers):
    ```js run
    if (!window.Promise) {
      alert("Your browser is really old!");
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f
    }
    ```

3. We can create "polyfills": add functions that are not supported by the environment (say, an old browser), but exist in the modern standard.

<<<<<<< HEAD
    f(); // オブジェクトなしでの呼び出し
    ```

    仕様によると、Node.JS のような非ブラウザも含め、このケースでの `this` はグローバルオブジェクトである必要があります。それは古いスクリプトのための互換性です。strict モードでは、`this` は `undefined` になります。
=======
    ```js run
    if (!window.Promise) {
      window.Promise = ... // custom implementation of the modern language feature
    }
    ```

...And of course, if we're in a browser, using `window` to access browser window features (not as a global object) is completely fine.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f
