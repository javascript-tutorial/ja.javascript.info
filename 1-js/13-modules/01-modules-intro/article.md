
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

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

...そして、別のファイルでそれをインポートして使います。:

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
```

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

"通常の" スクリプトと比較したときのモジュールの違いは何でしょう？

ブラウザとサーバサイト JavaScript の両方に有効なコアな特徴があります。

### 常に "use strict"

モジュールは常に `use strict` です。E.g. 未宣言変数への代入はエラーになります。

```html run
<script type="module">
  a = 5; // error
</script>
```

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
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Error: user is not defined
  */!*
</script>
```

```smart
ブラウザでは、e.g. `window.user = "John"` のように、変数を明示的に `window` プロパティに割り当てることで、ウィンドウレベルのグローバルな変数を作ることができます。

以降、`type="module"` の有無に関わらず、すべてのスクリプトはそれが参照できます。

とはいえ、このようなグローバル変数の作成は、よく思われない行為です。このようなことは避けるようにしてください。
```

### モジュールコードはインポート時の初回にのみ評価されます

もし同じモジュールが複数の他の場所でインポートされる場合、そのコードは初回のみ実行されます。その後エクスポートしたものはすべてのインポートしているモジュールで利用されます。

1度限りの評価は重要な結果をもたらすため、注意が必要です。

いくつか例を見てみましょう。

まず、メッセージを表示すると言ったような、副作用をもたらすモジュールコードを実行する場合、複数回インポートしてもトリガされるのは1度だけです(初回)。:

```js
// 📁 alert.js
alert("Module is evaluated!");
```

```js
// 別のファイルから同じモジュールをインポート

// 📁 1.js
import `./alert.js`; // Module is evaluated!

// 📁 2.js
import `./alert.js`; // (nothing)
```

モジュールはすでに評価済みなので、2つ目のインポートは何も表示しません。

ルールがあります: 初期化やモジュール固有の内部データ構造の作成には、トップレベルのモジュールのコードを使用する必要があります。複数回呼び出し可能にする必要がある場合は、上記の `sayHi` で行ったように、関数としてエクスポートする必要があります。

より高度な例を考えてみましょう。

モジュールがオブジェクトをエクスポートするとしましょう:

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

このモジュールが複数のファイルからインポートされた場合、モジュールは初回にだけ評価され、`admin` オブジェクトが生成され、その後このモジュールをインポートするすべてのモジュールに渡されます。

すべてのインポータは正確に1つの `admin` オブジェクトを取得することになります。:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
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

```js
// 📁 admin.js
export let config = { };

export function sayHi() {
  alert(`Ready to serve, ${config.user}!`);
}
```

ここで、`admin.js` は  `config` オブジェクトをエクスポートします（初期は空ですが、デフォルトプロパティもある場合もあります）。

次に `init.js` 、我々のアプリの最初のスクリプトで、`config` をインポートし、`config.user` を設定します:

```js
// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
```

...これでモジュール `admin.js` は構成されました。 

以降のインポートはこれを呼び出すことができ、現在のユーザが正しく表示されます:

```js
// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // Ready to serve, *!*Pete*/!*!
```


### import.meta

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

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

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

```html run
<script type="module">
*!*
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
</script>

<button id="button">Button</button>
```

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
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### 外部スクリプト

外部モジュールスクリプトには、2つの大きな違いがあります。:

1. 同じ `src` の外部スクリプトは一度だけ実行されます:
    ```html
    <!-- スクリプト my.js は一度だけ取得され実行されます -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

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

```html run
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
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
