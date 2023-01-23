
<<<<<<< HEAD
# モジュール, 導入

アプリケーションが大きくなるにつれ、それを複数のファイルに分割したくなります。いわゆる 'モジュール' です。通常、モジュールはクラスや便利な関数のライブラリを含みます。

長い間、JavaScript には言語レベルのモジュール構文は存在しませんでした。当初はスクリプトが小さくて単純だったため問題ではありませんでした。そのため、モジュールの仕組みも必要ありませんでした。

しかし、スクリプトが徐々に複雑になってきたため、コミュニティはコードをモジュールにまとめるための様々な方法を発明しました。

いくつか挙げます:

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- 最も古いモジュールシステムの1つで、最初はライブラリ[require.js](http://requirejs.org/)で実装されました。
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- Node.js サーバ用に作られたモジュールシステムです。
- [UMD](https://github.com/umdjs/umd) -- もう1つのモジュールシステムで、ユニバーサルなものとして提案されています。AMD と CommonJS と互換性があります。

今や、これらはゆっくりと歴史の一部になっていますが、依然として古いスクリプトの中で利用されています。

言語レベルのモジュールシステムの標準は 2015 年に登場し、それ以来徐々に進化し、今ではすべての主要なブラウザとNode.js でサポートされています。なので、ここからはモダンな JavaScript モジュールについて学んでいきます。

## モジュールとは?

モジュールは単なる1つのファイルです。

ディレクティブ `export` と `import` を利用することで、モジュール間で機能を相互にやりとりすることができます。:

- `export` キーワードは、ファイルの外部からアクセス可能であるべき変数や関数にラベル付けをします。
- `import` は他のモジュールから機能をインポートできるようにします。

例えば、関数をエクスポートしているファイル `sayHi.js` があります:
=======
# Modules, introduction

As our application grows bigger, we want to split it into multiple files, so called "modules". A module may contain a class or a library of functions for a specific purpose.

For a long time, JavaScript existed without a language-level module syntax. That wasn't a problem, because initially scripts were small and simple, so there was no need.

But eventually scripts became more and more complex, so the community invented a variety of ways to organize code into modules, special libraries to load modules on demand.

To name some (for historical reasons):

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- one of the most ancient module systems, initially implemented by the library [require.js](https://requirejs.org/).
- [CommonJS](https://wiki.commonjs.org/wiki/Modules/1.1) -- the module system created for Node.js server.
- [UMD](https://github.com/umdjs/umd) -- one more module system, suggested as a universal one, compatible with AMD and CommonJS.

Now these all slowly became a part of history, but we still can find them in old scripts.

The language-level module system appeared in the standard in 2015, gradually evolved since then, and is now supported by all major browsers and in Node.js. So we'll study the modern JavaScript modules from now on.

## What is a module?

A module is just a file. One script is one module. As simple as that.

Modules can load each other and use special directives `export` and `import` to interchange functionality, call functions of one module from another one:

- `export` keyword labels variables and functions that should be accessible from outside the current module.
- `import` allows the import of functionality from other modules.

For instance, if we have a file `sayHi.js` exporting a function:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
```

<<<<<<< HEAD
`import` ディレクティブは現在のファイルからの相対パス `./sayHi.js` のモジュールを読み込み、エクスポートされた関数 `sayHi` を対応する変数に割り当てます。

ブラウザで例を実行してみましょう。

モジュールは特別なキーワードと機能を提供するので、`<script type="module">` 属性をを使用して、ブラウザにモジュールを扱うことを伝える必要があります。

このようになります:

[codetabs src="say" height="140" current="index.html"]

ブラウザは自動的にインポートされたモジュールを取得/評価し、スクリプトを実行します。

```warn header="モジュールは HTTP(s) 経由でのみ動作します。ローカルでは機能しません。"
`file://` プロトコル経由で Web ページをローカルで開いた場合、`import/export` ディレクティブが動作しないことに気づくと思います。モジュールをテストするには、[静的サーバ](https://www.npmjs.com/package/static-server#getting-started) のようなローカル Webサーバ、あるいは、VS Code の[Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) のようなエディタのもつ "ライブサーバ" 機能を使用します。
```

## コアなモジュールの特徴

"通常の" スクリプトと比較してときのモジュールの違いは何でしょう？

ブラウザとサーバサイト JavaScript の両方に有効なコアな特徴があります。

### 常に "use strict"

モジュールは常に `use strict` です。E.g. 未宣言変数への代入はエラーになります。
=======
The `import` directive loads the module by path `./sayHi.js` relative to the current file, and assigns exported function `sayHi` to the corresponding variable.

Let's run the example in-browser.

As modules support special keywords and features, we must tell the browser that a script should be treated as a module, by using the attribute `<script type="module">`.

Like this:

[codetabs src="say" height="140" current="index.html"]

The browser automatically fetches and evaluates the imported module (and its imports if needed), and then runs the script.

```warn header="Modules work only via HTTP(s), not locally"
If you try to open a web-page locally, via `file://` protocol, you'll find that `import/export` directives don't work. Use a local web-server, such as [static-server](https://www.npmjs.com/package/static-server#getting-started) or use the "live server" capability of your editor, such as VS Code [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to test modules.
```

## Core module features

What's different in modules, compared to "regular" scripts?

There are core features, valid both for browser and server-side JavaScript.

### Always "use strict"

Modules always work in strict mode. E.g. assigning to an undeclared variable will give an error.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run
<script type="module">
  a = 5; // error
</script>
```

<<<<<<< HEAD
### モジュールレベルのスコープ

各モジュールには独自の最上位のスコープがあります。つまり、モジュール内の最上位の変数や関数は他のスクリプトからは見えません。

下の例では、2つのスクリプトがインポートされており、`hello.js` は `user.js` で宣言されている変数 `user` を使おうとします。が、別々のモジュールなので失敗します（コンソールでエラーが確認できます）:

[codetabs src="scopes" height="140" current="index.html"]

モジュールは、外部からアクセス可能にしたいものは `export` を行い、必要なものは `import` が必要です。

- `user.js` は `user` 変数のエクスポートが必要です。
- `hello.js` は `user.js` モジュールからのインポートが必要です。

つまり、モジュールでは、グローバル変数に依存するのではなく、インポート/エクスポートを使用します。

これは正しい例です:

[codetabs src="scopes-working" height="140" current="hello.js"]

ブラウザでは、各 `<script type="module">` に対しても独立した最上位スコープが存在します。

以下は同じページに2つのスクリプトがあり、両方 `type="module"` です。これらはお互いの最上位のスコープの変数は見えません。:

```html run
<script type="module">
  // 変数はこのモジュールスクリプトの中でのみ見えます
=======
### Module-level scope

Each module has its own top-level scope. In other words, top-level variables and functions from a module are not seen in other scripts.

In the example below, two scripts are imported, and `hello.js` tries to use `user` variable declared in `user.js`. It fails, because it's a separate module (you'll see the error in the console):

[codetabs src="scopes" height="140" current="index.html"]

Modules should `export` what they want to be accessible from outside and `import` what they need.

- `user.js` should export the `user` variable.
- `hello.js` should import it from `user.js` module.

In other words, with modules we use import/export instead of relying on global variables.

This is the correct variant:

[codetabs src="scopes-working" height="140" current="hello.js"]

In the browser, if we talk about HTML pages, independent top-level scope also exists for each `<script type="module">`.

Here are two scripts on the same page, both `type="module"`. They don't see each other's top-level variables:

```html run
<script type="module">
  // The variable is only visible in this module script
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Error: user is not defined
  */!*
</script>
```

```smart
<<<<<<< HEAD
ブラウザでは、e.g. `window.user = "John"` のように、変数を明示的に `window` プロパティに割り当てることで、ウィンドウレベルのグローバルな変数を作ることができます。

以降、`type="module"` の有無に関わらず、すべてのスクリプトはそれが参照できます。

とはいえ、このようなグローバル変数の作成は、よく思われない行為です。このようなことは避けるようにしてください。
```

### モジュールコードはインポート時の初回にのみ評価されます

もし同じモジュールが複数の他の場所でインポートされる場合、そのコードは初回のみ実行されます。その後エクスポートしたものはすべてのインポートしているモジュールで利用されます。

1度限りの評価は重要な結果をもたらすため、注意が必要です。

いくつか例を見てみましょう。

まず、メッセージを表示すると言ったような、副作用をもたらすモジュールコードを実行する場合、複数回インポートしてもトリガされるのは1度だけです(初回)。:
=======
In the browser, we can make a variable window-level global by explicitly assigning it to a `window` property, e.g. `window.user = "John"`. 

Then all scripts will see it, both with `type="module"` and without it. 

That said, making such global variables is frowned upon. Please try to avoid them.
```

### A module code is evaluated only the first time when imported

If the same module is imported into multiple other modules, its code is executed only once, upon the first import. Then its exports are given to all further importers.

The one-time evaluation has important consequences, that we should be aware of. 

Let's see a couple of examples.

First, if executing a module code brings side-effects, like showing a message, then importing it multiple times will trigger it only once -- the first time:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// 📁 alert.js
alert("Module is evaluated!");
```

```js
<<<<<<< HEAD
// 別のファイルから同じモジュールをインポート
=======
// Import the same module from different files
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

// 📁 1.js
import `./alert.js`; // Module is evaluated!

// 📁 2.js
<<<<<<< HEAD
import `./alert.js`; // (nothing)
```

モジュールはすでに評価済みなので、2つ目のインポートは何も表示しません。

ルールがあります: 初期化やモジュール固有の内部データ構造の作成には、トップレベルのモジュールのコードを使用する必要があります。複数回呼び出し可能にする必要がある場合は、上記の `sayHi` で行ったように、関数としてエクスポートする必要があります。

より高度な例を考えてみましょう。

モジュールがオブジェクトをエクスポートするとしましょう:
=======
import `./alert.js`; // (shows nothing)
```

The second import shows nothing, because the module has already been evaluated.

There's a rule: top-level module code should be used for initialization, creation of module-specific internal data structures. If we need to make something callable multiple times - we should export it as a function, like we did with `sayHi` above.

Now, let's consider a deeper example.

Let's say, a module exports an object:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

ご覧の通り、`1.js` がインポートした `admin` の `name` プロパティを変更すると、`2.js` は新しい `admin.name` が参照できます。 

これがまさにモジュールが1度のみ実行されるためです。エクスポートが生成され、インポートする側でそれらを共有するため、何かが `admin` オブジェクトを変更すると、他のインポートしたスクリプトはその変更が見えます。

**このような振る舞いは、モジュールを *構成(configure)* できるため実際に非常に便利です。**

言い換えると、モジュールはセットアップが必要な汎用機能が提供できます。例.認証には資格(credential)が必要です。そして、外部のコードが割り当てることを期待した構成用のオブジェクトをエクスポートします。

これは古典的なパターンです:
1. モジュールはいくつかの構成手段をエクスポートします。例.構成オブジェクト
2. 初回インポート時にそれらを初期化し、そのプロパティへ書き込みます。トップレベルのアプリケーションスクリプトがそれを行うかもしれません。
3. 以降のインポートでは、そのモジュールを使用します。

例えば、`admin.js` モジュールは特定の機能（例. 認証など）を提供するかもしれませんが、外部から `admin` オブジェクトにクレデンシャル情報が来ることを期待します。:
=======
// Both 1.js and 2.js reference the same admin object
// Changes made in 1.js are visible in 2.js
*/!*
```

As you can see, when `1.js` changes the `name` property in the imported `admin`, then `2.js` can see the new `admin.name`.

That's exactly because the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the `admin` object, other importers will see that.

**Such behavior is actually very convenient, because it allows us to *configure* modules.**

In other words, a module can provide a generic functionality that needs a setup. E.g. authentication needs credentials. Then it can export a configuration object expecting the outer code to assign to it.

Here's the classical pattern:
1. A module exports some means of configuration, e.g. a configuration object.
2. On the first import we initialize it, write to its properties. The top-level application script may do that.
3. Further imports use the module.

For instance, the `admin.js` module may provide certain functionality (e.g. authentication), but expect the credentials to come into the `config` object from outside:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// 📁 admin.js
export let config = { };

export function sayHi() {
  alert(`Ready to serve, ${config.user}!`);
}
```

<<<<<<< HEAD
ここで、`admin.js` は  `config` オブジェクトをエクスポートします（初期は空ですが、デフォルトプロパティもある場合もあります）。

次に `init.js` 、我々のアプリの最初のスクリプトで、`config` をインポートし、`config.user` を設定します:
=======
Here, `admin.js` exports the `config` object (initially empty, but may have default properties too).

Then in `init.js`, the first script of our app, we import `config` from it and set `config.user`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
```

<<<<<<< HEAD
...これでモジュール `admin.js` は構成されました。 

以降のインポートはこれを呼び出すことができ、現在のユーザが正しく表示されます:
=======
...Now the module `admin.js` is configured. 

Further importers can call it, and it correctly shows the current user:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // Ready to serve, *!*Pete*/!*!
```


### import.meta

<<<<<<< HEAD
オブジェクト `import.meta` は現在のモジュールに関する情報を含んでいます。

この内容は環境に依存します。ブラウザでは、スクリプトの url、HTML 内であれば現在のウェブページの url を含んでいます。:

```html run height=0
<script type="module">
  alert(import.meta.url); 
  // script url (インラインスクリプトに対する HTML ページの url)
</script>
```

### モジュールでは、最上位の "this" は undefined です

これはささいな特徴ですが、完全性のために言及しておきます。

モジュールでは、最上位の `this` は undefined です。

`this` がグローバルオブジェクトである非モジュールスクリプトとの比較です:。
=======
The object `import.meta` contains the information about the current module.

Its content depends on the environment. In the browser, it contains the URL of the script, or a current webpage URL if inside HTML:

```html run height=0
<script type="module">
  alert(import.meta.url); // script URL
  // for an inline script - the URL of the current HTML-page
</script>
```

### In a module, "this" is undefined

That's kind of a minor feature, but for completeness we should mention it.

In a module, top-level `this` is undefined.

Compare it to non-module scripts, where `this` is a global object:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

You may want to skip this section for now if you're reading for the first time, or if you don't use JavaScript in a browser.

### Module scripts are deferred

Module scripts are *always* deferred, same effect as `defer` attribute (described in the chapter [](info:script-async-defer)), for both external and inline scripts.

In other words:
- downloading external module scripts `<script type="module" src="...">` doesn't block HTML processing, they load in parallel with other resources.
- module scripts wait until the HTML document is fully ready (even if they are tiny and load faster than HTML), and then run.
- relative order of scripts is maintained: scripts that go first in the document, execute first.

As a side effect, module scripts always "see" the fully loaded HTML-page, including HTML elements below them.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run
<script type="module">
*!*
<<<<<<< HEAD
  alert(typeof button); // object: スクリプトは下のボタンが `見え` ます
*/!*
  // モジュールは遅延されるので、スクリプトはページ全体がロードされた後に実行します
</script>

以下の通常のスクリプトと比較してください:

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
  alert(typeof button); // button is undefined, the script can't see elements below
*/!*
  // regular scripts run immediately, before the rest of the page is processed
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
</script>

<button id="button">Button</button>
```

<<<<<<< HEAD
注意: 実際には1つ目のスクリプトの前に2つ目のスクリプトが動作します! なので、最初に `undefined` が表示され、その後 `object` が表示されます。

これは、モジュールが遅延されているためです。通常のスクリプトはすぐに実行するので、最初に出力されます。

モジュールを使うときは、JavaScript アプリケーションが準備できる前に HTML ドキュメントが表示できることに注意してください。一部の機能はまだ機能しない可能性があります。透明なオーバーレイ、または "ローディング"を配置する、もしくはそれ以外の方法で訪問者が混乱しないようにする必要があります。

### Async はインラインスクリプトで動作します

非モジュールスクリプトの場合、`async` 属性は外部スクリプトでのみ動作します。Async スクリプトは、他のスクリプトやHTMLドキュメントとは関係なく、準備ができ次第すぐに実行されます。

モジュールスクリプトの場合、インラインスクリプトでも動作します。

例えば、下のスクリプトは `async` があるので、何かを待つことはありません。

それは、たとえ HTMl ドキュメントがまだ完了していない場合や、他のスクリプトがまだ保留の場合でも、インポート（ `./analytics.js` の取得）を行い、準備ができたときに実行します。

これはカウンタや広告、ドキュメントレベルのイベントリスナなど、何にも依存しない機能に適しています。

```html
<!-- すべての依存対象が取得(analytics.js)され、スクリプトが実行されます -->
<!-- ドキュメントや他の <script> タグは待ちません -->
=======
Please note: the second script actually runs before the first! So we'll see `undefined` first, and then `object`.

That's because modules are deferred, so we wait for the document to be processed. The regular script runs immediately, so we see its output first.

When using modules, we should be aware that the HTML page shows up as it loads, and JavaScript modules run after that, so the user may see the page before the JavaScript application is ready. Some functionality may not work yet. We should put "loading indicators", or otherwise ensure that the visitor won't be confused by that.

### Async works on inline scripts

For non-module scripts, the `async` attribute only works on external scripts. Async scripts run immediately when ready, independently of other scripts or the HTML document.

For module scripts, it works on inline scripts as well.

For example, the inline script below has `async`, so it doesn't wait for anything.

It performs the import (fetches `./analytics.js`) and runs when ready, even if the HTML document is not finished yet, or if other scripts are still pending.

That's good for functionality that doesn't depend on anything, like counters, ads, document-level event listeners.

```html
<!-- all dependencies are fetched (analytics.js), and the script runs -->
<!-- doesn't wait for the document or other <script> tags -->
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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

External scripts that have `type="module"` are different in two aspects:

1. External scripts with the same `src` run only once:
    ```html
    <!-- the script my.js is fetched and executed only once -->
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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

ブラウザでは、`import` は相対URLか絶対URLどちらかの取得が必須です。パスがないモジュールは "bare" モジュールと呼ばれます。このようなモジュールは `import` では許可されていません。

例えば、この `import` は無効です:
```js
import {sayHi} from 'sayHi'; // Error, "bare" module
// モジュールは、例えば './sayHi.js' またはモジュールの場所でなければなりません
```

Node.js やバンドルツールのような特定の環境では、モジュールを見つけるための独自の方法や、それらを調整するためのフックがあるため、剥き出しのモジュールを使用することができます。しかしブラウザではまだベアモジュールはサポートされていません。

### 互換性, "nomodule"

古いブラウザは `type="module"` を理解しません。未知のタイプのスクリプトは単に無視されます。それらには、`nomodule` 属性を使って、フォールバックを提供することが可能です。:
=======
2. External scripts that are fetched from another origin (e.g. another site) require [CORS](mdn:Web/HTTP/CORS) headers, as described in the chapter <info:fetch-crossorigin>. In other words, if a module script is fetched from another origin, the remote server must supply a header `Access-Control-Allow-Origin` allowing the fetch.
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

Certain environments, like Node.js or bundle tools allow bare modules, without any path, as they have their own ways for finding modules and hooks to fine-tune them. But browsers do not support bare modules yet.

### Compatibility, "nomodule"

Old browsers do not understand `type="module"`. Scripts of an unknown type are just ignored. For them, it's possible to provide a fallback using the `nomodule` attribute:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

バンドルツールを使用し、次にスクリプトが1つのファイル（またはいくつかのファイル）にバンドルされると、それらの `import/export` 文は特別なバンドル呼び出しに置き換えられます。したがって、結果として生じるビルドは `type=module` を必要としません。なので、それを通常のスクリプトに置くことができます。:

```html
<!-- Webpack のようなツールから bundle.js を得た想定 -->
<script src="bundle.js"></script>
```

とはいえ、ネイティブモジュールも使用可能です。したがって、ここでは Webpack を使用しません: 後で構成できます。

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

次の章ではより多くのモジュールの例と、どのようにエクスポート/インポートされるかを見ていきます。
=======
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
```

## Build tools

In real-life, browser modules are rarely used in their "raw" form. Usually, we bundle them together with a special tool such as [Webpack](https://webpack.js.org/) and deploy to the production server.

One of the benefits of using bundlers -- they give more control over how modules are resolved, allowing bare modules and much more, like CSS/HTML modules.

Build tools do the following:

1. Take a "main" module, the one intended to be put in `<script type="module">` in HTML.
2. Analyze its dependencies: imports and then imports of imports etc.
3. Build a single file with all modules (or multiple files, that's tunable), replacing native `import` calls with bundler functions, so that it works. "Special" module types like HTML/CSS modules are also supported.
4. In the process, other transformations and optimizations may be applied:
    - Unreachable code removed.
    - Unused exports removed ("tree-shaking").
    - Development-specific statements like `console` and `debugger` removed.
    - Modern, bleeding-edge JavaScript syntax may be transformed to older one with similar functionality using [Babel](https://babeljs.io/).
    - The resulting file is minified (spaces removed, variables replaced with shorter names, etc).

If we use bundle tools, then as scripts are bundled together into a single file (or few files), `import/export` statements inside those scripts are replaced by special bundler functions. So the resulting "bundled" script does not contain any `import/export`, it doesn't require `type="module"`, and we can put it into a regular script:

```html
<!-- Assuming we got bundle.js from a tool like Webpack -->
<script src="bundle.js"></script>
```

That said, native modules are also usable. So we won't be using Webpack here: you can configure it later.

## Summary

To summarize, the core concepts are:

1. A module is a file. To make `import/export` work, browsers need `<script type="module">`. Modules have several differences:
    - Deferred by default.
    - Async works on inline scripts.
    - To load external scripts from another origin (domain/protocol/port), CORS headers are needed.
    - Duplicate external scripts are ignored.
2. Modules have their own, local top-level scope and interchange functionality via `import/export`.
3. Modules always `use strict`.
4. Module code is executed only once. Exports are created once and shared between importers.

When we use modules, each module implements the functionality and exports it. Then we use `import` to directly import it where it's needed. The browser loads and evaluates the scripts automatically.

In production, people often use bundlers such as [Webpack](https://webpack.js.org) to bundle modules together for performance and other reasons.

In the next chapter we'll see more examples of modules, and how things can be exported/imported.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
