

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

    <!-- no-strict to move variables out of eval -->
    ```js untrusted run no-strict refresh
    var phrase = "Hello";

    function sayHi() {
      alert(phrase);
    }

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

## "window" の利用 [#Uses of “window”]

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

## "this" とグローバルオブジェクト [#“this” and global object]

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
