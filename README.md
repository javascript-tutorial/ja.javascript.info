<<<<<<< HEAD
# 日本語版 Modern JavaScript Tutorial

このリポジトリは <https://javascript.info> の日本語翻訳版で、<https://ja.javascript.info> で公開されています。

翻訳をより良いものにするために、ご協力お願いします!
=======
# The Modern JavaScript Tutorial

This repository hosts the English content of the Modern JavaScript Tutorial, published at [https://javascript.info](https://javascript.info).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

See <https://javascript.info/translate> for the details.

## Contributions

We'd also like to collaborate on the tutorial with other people.

Something's wrong? A topic is missing? Explain it to people, add it as PR 👏

**You can edit the text in any editor.** The tutorial uses an enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/javascript-tutorial/server>.

The list of contributors is available at <https://javascript.info/about#contributors>.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 構造

<<<<<<< HEAD
チャプター毎にフォルダが分かれており、その中に記事とタスクがあります。

フォルダは `N-url` という名前になっており、`N` はソートのための番号です(記事はこの順番に並びます)。 `url` はサイト上の URL スラッグです。
=======
Every chapter, article, or task has its folder.

The folder is named like `N-url`, where `N` is a number for the sorting purposes and `URL` is the URL part with the title of the material.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

フォルダは次の1つ以上のファイルから成ります:

<<<<<<< HEAD
- `index.md` セクション用
- `article.md` 記事用
- `task.md` タスク用(+ 他にあるとしたら解答用の `solution.md`)
=======
  - `index.md` stands for a chapter
  - `article.md` stands for an article
  - `task.md` stands for a task (solution must be provided in `solution.md` file as well)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
=======
It's very easy to add something new.

---  
♥  
Ilya Kantor @iliakan
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
