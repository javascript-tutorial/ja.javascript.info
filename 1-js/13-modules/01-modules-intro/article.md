
<<<<<<< HEAD
# モジュール, 導入

アプリケーションが大きくなるにつれ、それを複数のファイルに分割したくなります。いわゆる 'モジュール' です。
通常、モジュールはクラスや便利な関数のライブラリを含みます。

長い間、JavaScript には言語レベルのモジュール構文は存在しませんでした。当初はスクリプトが小さくて単純だったため、それは問題ではありませんでした。そのため、モジュールの仕組みは必要ありませんでした。

しかし、スクリプト徐々に複雑になってきました。そのため、コミュニティはコードをモジュールにまとめるための様々な方法を発明しました。

例えば:

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- 最も古いモジュールシステムの1つで、最初はライブラリ[require.js](http://requirejs.org/)で実装されました。
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- Node.JS サーバ用に作られたモジュールシステムです。
- [UMD](https://github.com/umdjs/umd) -- もう1つのモジュールシステムで、ユニバーサルなものとして提案されています。AMD と CommonJS と互換性があります。

今や、これらはゆっくりと歴史の一部になっていますが、依然として古いスクリプトの中で利用されています。言語レベルのモジュールシステムの標準は 2015 年に登場し、それ以来徐々に進化し、今ではすべての主要なブラウザとNode.JS でサポートされています。

## モジュールとは?

モジュールは単なる1つのファイルです。

ディレクティブ `export` と `import` を利用することで、モジュール間で機能を相互にやりとりすることができます。:

- `export` キーワードは、ファイルの外部からアクセス可能であるべき変数や関数にラベル付けをします。
- `import` は他のモジュールから機能をインポートできるようにします。

例えば、関数をエクスポートしているファイル `sayHi.js` があります:
=======
# Modules, introduction

As our application grows bigger, we want to split it into multiple files, so called 'modules'.
A module usually contains a class or a library of useful functions.

For a long time, JavaScript existed without a language-level module syntax. That wasn't a problem, because initially scripts were small and simple, so there was no need.

But eventually scripts became more and more complex, so the community invented a variety of ways to organize code into modules, special libraries to load modules on demand.

For instance:

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- one of the most ancient module systems, initially implemented by the library [require.js](http://requirejs.org/).
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- the module system created for Node.js server.
- [UMD](https://github.com/umdjs/umd) -- one more module system, suggested as a universal one, compatible with AMD and CommonJS.

Now all these slowly become a part of history, but we still can find them in old scripts. The language-level module system appeared in the standard in 2015, gradually evolved since then, and is now supported by all major browsers and in Node.js.

## What is a module?

A module is just a file, a single script, as simple as that.

There are directives `export` and `import` to interchange functionality between modules, call functions of one module from another one:

- `export` keyword labels variables and functions that should be accessible from outside the current module.
- `import` allows to import functionality from other modules.

For instance, if we have a file `sayHi.js` exporting a function:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

<<<<<<< HEAD
...そして、別のファイルでそれをインポートして使います。:
=======
...Then another file may import and use it:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
```

<<<<<<< HEAD
このチュートリアルでは言語自身に焦点を当てていますが、デモ環境としてブラウザを利用します。なので、ブラウザでモジュールを動作させる方法を見ておきましょう。

モジュールを使うには、次のように `<script type="module">` 属性を設定します。:

[codetabs src="say" height="140" current="index.html"]

ブラウザは自動的にインポート対象を取得/評価し、スクリプトを実行します。

## コアなモジュールの特徴

"通常の" スクリプトと比較してときのモジュールの違いは何でしょう？

ブラウザとサーバサイト JavaScript の両方に有効なコアな特徴があります。

### 常に "use strict"

モジュールは常に `use strict` です。E.g. 未宣言変数への代入はエラーになります。
=======
In this tutorial we concentrate on the language itself, but we use browser as the demo environment, so let's see how to use modules in the browser.

As modules support special keywords and features, we must tell the browser that a script should be treated as module, by using the attribute `<script type="module">`.

Like this:

[codetabs src="say" height="140" current="index.html"]

The browser automatically fetches and evaluates imported modules, and then runs the script.

## Core module features

What's different in modules, compared to "regular" scripts?

There are core features, valid both for browser and server-side JavaScript.

### Always "use strict"

Modules always `use strict`, by default. E.g. assigning to an undeclared variable will give an error.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```html run
<script type="module">
  a = 5; // error
</script>
```

<<<<<<< HEAD
ここではブラウザで確認していますが、同じことはどのモジュールにも当てはまります。

### モジュールレベルのスコープ

各モジュールには独自の最上位のスコープがあります。つまり、モジュール内の最上位の変数や関数は他のスクリプトからは見えません。

下の例では、2つのスクリプトがインポートされており、`hello.js` は `user.js` で宣言されている変数 `user` を使おうとして、失敗します:

[codetabs src="scopes" height="140" current="index.html"]

モジュールは、外部からアクセス可能にしたいものは `export` をし、必要なものは `import` することを期待しています。

したがって、`index.html` の代わりに、直接 `hello.js` で `user.js` をインポートする必要があります。

これは正しい例です:

[codetabs src="scopes-working" height="140" current="hello.js"]

ブラウザでは、各 `<script type="module">` に対しても独立した最上位スコープが存在します。:

```html run
<script type="module">
  // 変数はこのモジュールスクリプトの中でのみ見えます
=======
Here we can see it in the browser, but the same is true for any module.

### Module-level scope

Each module has its own top-level scope. In other words, top-level variables and functions from a module are not seen in other scripts.

In the example below, two scripts are imported, and `hello.js` tries to use `user` variable declared in `user.js`, and fails:

[codetabs src="scopes" height="140" current="index.html"]

Modules are expected to `export` what they want to be accessible from outside and `import` what they need.

So we should import `user.js` directly into `hello.js` instead of `index.html`.

That's the correct variant:

[codetabs src="scopes-working" height="140" current="hello.js"]

In the browser, independent top-level scope also exists for each `<script type="module">`:

```html run
<script type="module">
  // The variable is only visible in this module script
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Error: user is not defined
  */!*
</script>
```

<<<<<<< HEAD
もしも、本当に "グローバルな" ブラウザ内変数を作る必要がある場合は、それを明示的に `window` に割り当て、`window.user` としてアクセスします。しかし、これは例外であり正当な理由がある場合のみです。

### モジュールコードはインポート時の初回にのみ評価されます

もし同じモジュールが複数の他の場所でインポートされる場合、そのコードは初回のみ実行されます。その後エクスポートしたものはすべてのインポートしているモジュールで利用されます。

これは重要な結果をもたらします。例を見てみましょう。

まず、メッセージを表示すると言ったような、副作用をもたらすモジュールコードを実行する場合、複数回インポートしてもトリガされるのは1度だけです(初回)。:
=======
If we really need to make a window-level global variable, we can explicitly assign it to `window` and access as `window.user`. But that's an exception requiring a good reason.

### A module code is evaluated only the first time when imported

If the same module is imported into multiple other places, its code is executed only the first time, then exports are given to all importers.

That has important consequences. Let's see that on examples.

First, if executing a module code brings side-effects, like showing a message, then importing it multiple times will trigger it only once -- the first time:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js
// 📁 alert.js
alert("Module is evaluated!");
```

```js
<<<<<<< HEAD
// 別のファイルから同じモジュールをインポート
=======
// Import the same module from different files
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

// 📁 1.js
import `./alert.js`; // Module is evaluated!

// 📁 2.js
import `./alert.js`; // (nothing)
```

<<<<<<< HEAD
実際、最上位のモジュールコードは主に初期化に使われます。データ構造を作成し、それらを事前に設定します。そして、何かを再利用可能にしたいとき、それらをエクスポートします。

これはより高度な例です。

モジュールがオブジェクトをエクスポートするとしましょう:
=======
In practice, top-level module code is mostly used for initialization. We create data structures, pre-fill them, and if we want something to be reusable -- export it.

Now, a more advanced example.

Let's say, a module exports an object:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

<<<<<<< HEAD
このモジュールが複数のファイルからインポートされた場合、モジュールは初回にだけ評価され、`admin` オブジェクトが生成され、その後このモジュールをインポートするすべてのモジュールに渡されます。

すべてのインポータは正確に1つの `admin` オブジェクトを取得することになります。:
=======
If this module is imported from multiple files, the module is only evaluated the first time, `admin` object is created, and then passed to all further importers.

All importers get exactly the one and only `admin` object:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
<<<<<<< HEAD
// 1.js と 2.js 同じオブジェクトをインポートしました
// 1.js で行われた変更は 2.js でも見えます
*/!*
```

繰り返しましょう -- モジュールは一度だけ実行されます。エクスポートが生成され、それがインポータ間で共有されます。そのため、なにかが `admin` オブジェクトを変更した場合、他のモジュールにもその変更が見えます。

このような振る舞いは、コンフィグレーションが必要なモジュールにとっては便利です。最初のインポートで必要なプロパティを設定することができ、以降のインポートではすでに準備ができている状態です。

例えば、`admin.js` モジュールは特定の機能を提供するかもしれませんが、外部から `admin` オブジェクトにクレデンシャル情報が来ることを期待します。:
=======
// Both 1.js and 2.js imported the same object
// Changes made in 1.js are visible in 2.js
*/!*
```

So, let's reiterate -- the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the `admin` object, other modules will see that .

Such behavior is great for modules that require configuration. We can set required properties on the first import, and then in further imports it's ready.

For instance, `admin.js` module may provide certain functionality, but expect the credentials to come into the `admin` object from outside:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js
// 📁 admin.js
export let admin = { };

export function sayHi() {
  alert(`Ready to serve, ${admin.name}!`);
}
```

<<<<<<< HEAD
ここで、`init.js` は我々のアプリケーションの最初のスクリプトで、`admin.name` をセットします。その後、`admin.js` 自身の内側から行われる呼び出しを含め、誰もがそれを見ることができます。:
=======
Now, in `init.js`, the first script of our app, we set `admin.name`. Then everyone will see it, including calls made from inside `admin.js` itself:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js
// 📁 init.js
import {admin} from './admin.js';
admin.name = "Pete";
```

```js
// 📁 other.js
import {admin, sayHi} from './admin.js';

alert(admin.name); // *!*Pete*/!*

sayHi(); // Ready to serve, *!*Pete*/!*!
```

### import.meta

<<<<<<< HEAD
オブジェクト `import.meta` は現在のモジュールに関する情報を含んでいます。

この内容は環境に依存します。ブラウザでは、スクリプトの url、HTML 内であれば現在のウェブページの url を含んでいます。:

```html run height=0
<script type="module">
  alert(import.meta.url); // script url (インラインスクリプトに対する HTML ページの url)
</script>
```

### 最上位の "this" は undefined

これは小さな特徴ですが、完全性のために言及しておきます。

モジュールでは、最上位の `this` は非モジュールスクリプトにおけるグローバルオブジェクトとは対照的に、undefined です。
=======
The object `import.meta` contains the information about the current module.

Its content depends on the environment. In the browser, it contains the url of the script, or a current webpage url if inside HTML:

```html run height=0
<script type="module">
  alert(import.meta.url); // script url (url of the html page for an inline script)
</script>
```

### Top-level "this" is undefined

That's kind of a minor feature, but for completeness we should mention it.

In a module, top-level `this` is undefined, as opposed to a global object in non-module scripts:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

<<<<<<< HEAD
## ブラウザ固有の特徴

通常のスクリプトと比べて、`type="module"` を持つスクリプトには、ブラウザ固有の違いもいくつかあります。

もし初めて読んでいる場合、またはブラウザで JavaScript を使用していない場合はスキップしても構いません。

### モジュールスクリプトは遅延されます

モジュールスクリプトは外部スクリプトとインラインスクリプト両方で、*常に* 遅延され、`defer` 属性(チャプター [](info:onload-ondomcontentloaded) で説明しています)と同じ効果を持ちます。

つまり:
- 外部モジュールスクリプト `<script type="module" src="...">` は HTML 処理をブロックしません。
- モジュールスクリプトは HTML ドキュメントが完全に準備できるまで待ちます。
- 相対的な順序は維持されます: ドキュメントの最初にあるスクリプトが最初に実行されます。

副作用として、モジュールスクリプトは常にその下の HTML 要素が見えます。

例:
=======
## Browser-specific features

There are also several browser-specific differences of scripts with `type="module"` compared to regular ones.

You may want skip those for now if you're reading for the first time, or if you don't use JavaScript in a browser.

### Module scripts are deferred

Module scripts are *always* deferred, same effect as `defer` attribute (described in the chapter [](info:script-async-defer)), for both external and inline scripts.

In other words:
- external module scripts `<script type="module" src="...">` don't block HTML processing, they load in parallel with other resources.
- module scripts wait until the HTML document is fully ready (even if they are tiny and load faster than HTML), and then run.
- relative order of scripts is maintained: scripts that go first in the document, execute first.

As a side-effect, module scripts always "see" the fully loaded HTML-page, including HTML elements below them.

For instance:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```html run
<script type="module">
*!*
<<<<<<< HEAD
  alert(typeof button); // object: スクリプトは下のボタンが `見え` ます
*/!*
  // モジュールは遅延されるので、スクリプトはページ全体がロードされた後に実行します
</script>

<script>
*!*
  alert(typeof button); // Error: button is undefined, スクリプトは下の要素は見えません
*/!*
  // 通常のスクリプトは、ページの残りが処理される前に即時実行します。
=======
  alert(typeof button); // object: the script can 'see' the button below
*/!*
  // as modules are deferred, the script runs after the whole page is loaded
</script>

Compare to regular script below:

<script>
*!*
  alert(typeof button); // Error: button is undefined, the script can't see elements below
*/!*
  // regular scripts run immediately, before the rest of the page is processed
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
</script>

<button id="button">Button</button>
```

<<<<<<< HEAD
注意: 実際には1つ目のスクリプトの前に2つ目のスクリプトが動作します! なので、最初に `undefined` が表示され、その後 `object` が表示されます。

これは、モジュールが遅延されているためです。通常のスクリプトはすぐに実行するので、最初に出力されます。

モジュールを使うときは、JavaScript アプリケーションが準備できる前に HTML ドキュメントが表示できることに注意してください。一部の機能はまだ機能しない可能性があります。透明なオーバーレイ、または "ローディング"を配置する、もしくはそれ以外の方法で訪問者が混乱しないようにする必要があります。

### Async はインラインスクリプトで動作します

非同期(Async)属性 `<script async type="module">` はインライン、外部スクリプトの両方で使用できます。非同期スクリプトは、インポートされたモジュールが処理されるとすぐに実行されます。他のスクリプトや HTML ドキュメントとは独立しています。

例えば、下のスクリプトは `async` があるので、誰かを待つことはありません。

それは、たとえ HTMl ドキュメントがまだ完了していない場合や、他のスクリプトがまだ保留の場合でも、インポート（ `./analytics.js` の取得）を行い、準備ができたときに実行します。

これはカウンタや広告、ドキュメントレベルのイベントリスナなど、何にも依存しない機能に適しています。

```html
<!-- すべての依存対象が取得(analytics.js)され、スクリプトが実行されます -->
<!-- ドキュメントや他の <script> タグは待ちません -->
=======
Please note: the second script actually works before the first! So we'll see `undefined` first, and then `object`.

That's because modules are deferred, so way wait for the document to be processed. The regular scripts runs immediately, so we saw its output first.

When using modules, we should be aware that HTML-page shows up as it loads, and JavaScript modules run after that, so the user may see the page before the JavaScript application is ready. Some functionality may not work yet. We should put transparent overlays or "loading indicators", or otherwise ensure that the visitor won't be confused by that.

### Async works on inline scripts

Async attribute `<script async type="module">` is allowed on both inline and external scripts. Async scripts run immediately when imported modules are processed, independently of other scripts or the HTML document.

For example, the script below has `async`, so it doesn't wait for anyone.

It performs the import (fetches `./analytics.js`) and runs when ready, even if HTML document is not finished yet, or if other scripts are still pending.

That's good for functionality that doesn't depend on anything, like counters, ads, document-level event listeners.

```html
<!-- all dependencies are fetched (analytics.js), and the script runs -->
<!-- doesn't wait for the document or other <script> tags -->
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

<<<<<<< HEAD
### 外部スクリプト

外部モジュールスクリプトには、2つの大きな違いがあります。:

1. 同じ `src` の外部スクリプトは一度だけ実行されます:
    ```html
    <!-- スクリプト my.js は一度だけ取得され実行されます -->
=======
### External scripts

There are two notable differences of external module scripts:

1. External scripts with same `src` run only once:
    ```html
    <!-- the script my.js is fetched and executed only once -->
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

<<<<<<< HEAD
2. 別のドメインから取得された外部スクリプトは[CORS](mdn:Web/HTTP/CORS) ヘッダを必要とします。言い換えると、モジュールスクリプトが別のドメインから取得された場合、リモートサーバはその取得が許可されていることを示すために、ヘッダ  `Access-Control-Allow-Origin: *` (`*` の代わりに取得するドメインを指定する場合もあります)を提供しなければなりません。
    ```html
    <!-- another-site.com は Access-Control-Allow-Origin を提供しなければなりません -->
    <!-- そうでない場合、スクリプトは実行されません -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    これにより、デフォルトでセキュリティが向上します。

### ベア(剥き出しの) モジュールは許可されていません

ブラウザでは、スクリプトの中(HTML ではない)で、`import` は相対URLか絶対URL、どちらかの取得が必須です。
パスのない、いわゆる "剥き出しの" モジュールは許可されていません。

例えば、この `import` は無効です:

```js
import {sayHi} from 'sayHi'; // Error, "bare" module
// './sayHi.js' またはモジュールの場所でなければなりません
```

Node.js やバンドルツールのような特定の環境では、モジュールを見つけるための独自の方法や、それらを調整するためのフックがあるため、剥き出しのモジュールを使用することができます。しかしブラウザではまだベアモジュールはサポートされていません。

### 互換性, "nomodule"

古いブラウザは `type="module"` を理解しません。未知のタイプのスクリプトは単に無視されます。それらには、`nomodule` 属性を使って、フォールバックを提供することが可能です。:
=======
2. External scripts that are fetched from another domain require [CORS](mdn:Web/HTTP/CORS) headers. In other words, if a module script is fetched from another domain, the remote server must supply a header `Access-Control-Allow-Origin: *` (may use fetching domain instead of `*`) to indicate that the fetch is allowed.
    ```html
    <!-- another-site.com must supply Access-Control-Allow-Origin -->
    <!-- otherwise, the script won't execute -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    That ensures better security by default.

### No "bare" modules allowed

In the browser, `import` must get either a relative or absolute URL. Modules without any path are called "bare" modules. Such modules are not allowed in `import`.

For instance, this `import` is invalid:
```js
import {sayHi} from 'sayHi'; // Error, "bare" module
// the module must have a path, e.g. './sayHi.js' or wherever the module is
```

Certain environments, like Node.js or bundle tools allow bare modules, without any path, as they have own ways for finding modules and hooks to fine-tune them. But browsers do not support bare modules yet.

### Compatibility, "nomodule"

Old browsers do not understand `type="module"`. Scripts of the unknown type are just ignored. For them, it's possible to provide a fallback using `nomodule` attribute:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```html run
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
<<<<<<< HEAD
  alert("現在のブラウザは type=module と nomodule どちらも知っているので、これはスキップされます")
  alert("古いブラウザは未知の type=module を持つスクリプトは無視しますが、これは実行します");
</script>
```

バンドルツールを使用する場合、モジュールも一緒にバンドルされると、それらの `import/export` 文は特別なバンドル呼び出しに置き換えられます。したがって、結果として生じるビルドは `type=module` を必要としません。なので、それを通常のスクリプトに置くことができます。:

```html
<!-- Webpack のようなツールから bundle.js を得た想定 -->
<script src="bundle.js"></script>
```

## ビルドツール

現実には、ブラウザモジュールが "生" の形式で使用されることはほとんどありません。通常、それらを [Webpack](https://webpack.js.org/) などの特別なツールを使って一緒にまとめて、プロダクションサーバにデプロイします。

バンドラーを使用する利点の1つは、それらはモジュールをどのように解決するかについてより多くの制御を与えることができ、CSS/HTML モジュールのようにベアモジュールやその他のことを可能にします。

ビルドツールは次のことを行います。:

1. HTML の `<script type="module">` 置くことを意図した "メイン" モジュールを取ります。
2. 依存関係を分析します: インポート、インポートのインポート...など
3. ネイティブの `import` 呼び出しをバンドラ関数で置き換え、すべてのモジュールを1つのファイルにビルドします(もしくは複数のファイルにします。調整可能)。
4. その過程で、他の変換や最適化を適用することができます。
    - 到達不能のコードの削除
    - 未使用のエクスポートの削除("tree-shaking")
    - `console` や `debugger` のような開発固有の文の削除
    - 最先端の JavaScript 構文は、[Babel](https://babeljs.io/)] を使用して同様の機能を持つ古い構文に変換されます
    - 結果のファイルの minify (スペースの削除、変数を短い名前に置換するなど)

とはいえ、ネイティブモジュールも使用可能です。なので、ここでは Webpack は使用しません。もちろん後で設定することは可能です。

## サマリ

まとめると、コアの概念は次の通りです:

1. モジュールはファイルです。`import/export` を機能させるには、ブラウザは `<script type="module">` を必要とし、それはいくつかの違いを意味します。:
    - デフォルトでは遅延
    - 非同期はインラインスクリプトで動作する
    - 外部スクリプトは CORS ヘッダを必要とする
    - 重複した外部スクリプトは無視される
2. モジュールは独自のローカルの最上位スコープを持ち、`import/export` 経由で、モジュール間で機能をやり取りします。
3. モジュールは常に `use strict` です。
4. モジュールコードは一度だけ実行されます。エクスポートは一度生成され、インポータ間で共有されます。

したがって、通常、モジュールを使用するとき、各モジュールは機能を実装し、それらをエクスポートします。そして、`import` を使って、必要な場所に直接インポートします。ブラウザは自動的にスクリプトを読み込み、評価します。

プロダクション環境では多くの場合、パフォーマンスや他の理由で、モジュールを1つにまとめるために [Webpack](https://webpack.js.org) などのバンドラを使用します。

次のチャプターでは、より多くのモジュールの例と、どのようにエクスポート/インポートされるかを見ていきます。
=======
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
```

If we use bundle tools, then as scripts are bundled together into a single file (or few files), `import/export` statements inside those scripts are replaced by special bundler functions. So the resulting "bundled" script does not contain any `import/export`, it doesn't require `type="module"`, and we can put it into a regular script:

```html
<!-- Assuming we got bundle.js from a tool like Webpack -->
<script src="bundle.js"></script>
```

## Build tools

In real-life, browser modules are rarely used in their "raw" form. Usually, we bundle them together with a special tool such as [Webpack](https://webpack.js.org/) and deploy to the production server.

One of the benefits of using bundlers -- they give more control over how modules are resolved, allowing bare modules and much more, like CSS/HTML modules.

Build tools do the following:

1. Take a "main" module, the one intended to be put in `<script type="module">` in HTML.
2. Analyze its dependencies: imports and then imports of imports etc.
3. Build a single file with all modules (or multiple files, that's tunable), replacing native `import` calls with bundler functions, so that it works. "Special" module types like HTML/CSS modules are also supported.
4. In the process, other transforms and optimizations may be applied:
    - Unreachable code removed.
    - Unused exports removed ("tree-shaking").
    - Development-specific statements like `console` and `debugger` removed.
    - Modern, bleeding-edge JavaScript syntax may be transformed to older one with similar functionality using [Babel](https://babeljs.io/).
    - The resulting file is minified (spaces removed, variables replaced with shorter named etc).

That said, native modules are also usable. So we won't be using Webpack here: you can configure it later.

## Summary

To summarize, the core concepts are:

1. A module is a file. To make `import/export` work, browsers need `<script type="module">`, that implies several differences:
    - Deferred by default.
    - Async works on inline scripts.
    - To load external scripts from another origin (domain/protocol/port), CORS headers are needed.
    - Duplicate external scripts are ignored.
2. Modules have their own, local top-level scope and interchange functionality via `import/export`.
3. Modules always `use strict`.
4. Module code is executed only once. Exports are created once and shared between importers.

So, generally, when we use modules, each module implements the functionality and exports it. Then we use `import` to directly import it where it's needed. Browser loads and evaluates the scripts automatically.

In production, people often use bundlers such as [Webpack](https://webpack.js.org) to bundle modules together for performance and other reasons.

In the next chapter we'll see more examples of modules, and how things can be exported/imported.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
