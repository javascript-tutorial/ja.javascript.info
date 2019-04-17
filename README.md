<<<<<<< HEAD
# 日本語版 Modern JavaScript Tutorial

このリポジトリは <https://javascript.info> の日本語翻訳版で、<https://ja.javascript.info> で公開されています。
=======
# The JavaScript Tutorial
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

翻訳をより良いものにするために、ご協力お願いします!

- "Translate Progress" の [issue](https://github.com/javascript-tutorial/ja.javascript.info/issues) を見てください。
- 未チェック(未翻訳を表します)のコンテンツの中で、翻訳したいコンテンツを選んでください。
- 翻訳していることが分かるよう、issueを作成してください。
- リポジトリを Fork し、翻訳を行い、できたら PR をしてください。

<<<<<<< HEAD
🎉 Thank you!

コントリビューターの名前と翻訳した量は <https://ja.javascript.info/about#contributors> で見ることができます(PRがマージされると更新されます)。

P.S. 翻訳されている他の言語の一覧は <https://github.com/javascript-tutorial/translate> にあります。
=======
We'd like to make the tutorial available in many languages. Please help us to translate.

Here's the list of existing ongoing translations (in alphabetical order):

| Language | Github | Translation leads | Translated (%) | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last&nbsp;Commit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Published |
|----------|--------|-------------------|----------------|-------------|-----------|
| Azerbaijani | [orkhan-huseyn/javascript-tutorial-az](https://github.com/orkhan-huseyn/javascript-tutorial-az) | @orkhan-huseyn | ![](http://stats.javascript.info/translate/az.svg) | ![](https://img.shields.io/github/last-commit/orkhan-huseyn/javascript-tutorial-az.svg?maxAge=900&label=) |  |
| Chinese | [xitu/javascript-tutorial-zh](https://github.com/xitu/javascript-tutorial-zh) | @leviding | ![](http://stats.javascript.info/translate/zh.svg) | ![](https://img.shields.io/github/last-commit/xitu/javascript-tutorial-zh.svg?maxAge=900&label=) | [zh.javascript.info](https://zh.javascript.info) |
| French | [HachemiH/javascript-tutorial-fr](https://github.com/HachemiH/javascript-tutorial-fr) | @HachemiH | ![](http://stats.javascript.info/translate/fr.svg) | ![](https://img.shields.io/github/last-commit/HachemiH/javascript-tutorial-fr.svg?maxAge=900&label=) | |
| Japanese | [KenjiI/javascript-tutorial-ja](https://github.com/KenjiI/javascript-tutorial-ja) | @KenjiI | ![](http://stats.javascript.info/translate/ja.svg) | ![](https://img.shields.io/github/last-commit/KenjiI/javascript-tutorial-ja.svg?maxAge=900&label=) | [ja.javascript.info](https://ja.javascript.info) |
| Korean | [Violet-Bora-Lee/javascript-tutorial-ko](https://github.com/Violet-Bora-Lee/javascript-tutorial-ko) | @Violet-Bora-Lee | ![](http://stats.javascript.info/translate/ko.svg) | ![](https://img.shields.io/github/last-commit/Violet-Bora-Lee/javascript-tutorial-ko.svg?maxAge=900&label=) |  |
| Persian (Farsi) | [mehradsadeghi/javascript-tutorial-fa](https://github.com/mehradsadeghi/javascript-tutorial-fa) | @mehradsadeghi | started | ![](https://img.shields.io/github/last-commit/krzmaciek/javascript-tutorial-pl.svg?maxAge=900&label=) | |
| Polish | [krzmaciek/javascript-tutorial-pl](https://github.com/krzmaciek/javascript-tutorial-pl) | @krzmaciek | ![](http://stats.javascript.info/translate/pl.svg) | ![](https://img.shields.io/github/last-commit/krzmaciek/javascript-tutorial-pl.svg?maxAge=900&label=) |  |
| Romanian | [lighthousand/javascript-tutorial-ro](https://github.com/lighthousand/javascript-tutorial-ro) | @lighthousand | ![](http://stats.javascript.info/translate/ro.svg) | ![](https://img.shields.io/github/last-commit/lighthousand/javascript-tutorial-ro.svg?maxAge=900&label=) |  |
| Russian | [iliakan/javascript-tutorial-ru](https://github.com/iliakan/javascript-tutorial-ru) | @iliakan | * . | ![](https://img.shields.io/github/last-commit/iliakan/javascript-tutorial-ru.svg?maxAge=900&label=) | [learn.javascript.ru](https://learn.javascript.ru) |
| Turkish | [sahinyanlik/javascript-tutorial-tr](https://github.com/sahinyanlik/javascript-tutorial-tr) | @sahinyanlik | ![](http://stats.javascript.info/translate/tr.svg) | ![](https://img.shields.io/github/last-commit/sahinyanlik/javascript-tutorial-tr.svg?maxAge=900&label=) | |

`*` – the previous version is published in Russian, need to backport/translate the new one from English.

**If you'd like to translate it into your language:**

1. First, check if the translation has already started in the list above or in issues. If it exists, contact the original lead, ask him  to join efforts. If the translation is stalled, ask him to transfer the repo to you or just create a new one and continue from where they stopped.
2. If there's no such translation, create a new one. Clone the repository, change its name to `javascript-tutorial-<lang>` (by your language) and [create an issue](https://github.com/iliakan/javascript-tutorial-en/issues/new) for me to add you to the list.

**You can edit the text in any editor.** The tutorial uses enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/iliakan/javascript-tutorial-server>.  
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

## 構造

チャプター毎にフォルダが分かれており、その中に記事とタスクがあります。

フォルダは `N-url` という名前になっており、`N` はソートのための番号です(記事はこの順番に並びます)。 `url` はサイト上の URL スラッグです。

フォルダは次の1つ以上のファイルから成ります:

- `index.md` セクション用
- `article.md` 記事用
- `task.md` タスク用(+ 他にあるとしたら解答用の `solution.md`)

<<<<<<< HEAD
ファイルは `# Title Header` から始まり、Markdown のようなフォーマットでテキストが続きます。シンプルなテキストエディタで編集可能です。

記事やタスクで利用する追加のリソース(画像など)や例も同じフォルダにあります。

## 翻訳時の Tips

翻訳は単語レベルで正確である必要はありません。技術的に正しく、分かりやすく説明されるべきです。

もし英語版の記事が改善できそうであれば、ぜひPRを送ってください。

### コードブロック内のテキスト

- コメントだけを翻訳してください。
- 文字列や変数など、コメント以外のものは翻訳しないでください。


例:

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ DO (コメントを翻訳):

```js
// 例
const text = 'Hello, world';
document.querySelector('.hello').innerHTML = text;
```

❌ DON'T (文字列やクラスの翻訳):

```js
// 例
const text = 'ハローワールド';
// ".hello" は css クラスなので翻訳しません
document.querySelector('.ハロー').innerHTML = text;
```

### 外部リンク

外部リンクが Wikipedia (e.g. `https://en.wikipedia.org/wiki/JavaScript`)で、その記事の日本語版が存在し、かつそれなりの品質であれば、代わりにそのバージョンをリンクさせてください。

例:

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> es):

```md
[JavaScript](https://es.wikipedia.org/wiki/JavaScript) es un lenguaje de programación.
```

MDN へのリンクについては、部分的にしか翻訳されていない場合でも言語固有のバージョンを使用してください。

リンクされた記事に翻訳版がない場合は、「そのまま」リンクを残してください。

## ローカルで動かす

このチュートリアルはローカルでも動かすことができ、その場ですぐに変更を確認することができます。

サーバは <https://github.com/javascript-tutorial/server> にあります。

=======
Each of these files starts from the `# Main header`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
