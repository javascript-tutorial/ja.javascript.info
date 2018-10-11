# コーディングスタイル

私たちのコードは綺麗でできるだけ読みやすくなければなりません。

それは実質プログラミングの芸術です -- 複雑なタスクを行い、正しく、人が読むことができる方法でコード化することです。

それを助ける一つが良いコードスタイルです。

[cut]

## 構文 [#syntax]

ルールに基づいたチートシート(より詳細は下):

![](code-style.png)
<!--
```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number, greater than 0`);
} else {
  alert( pow(x, n) );
}
```

-->

では、それらのルールと理由について詳細を説明します。

"もはや変えられない" ものはここにはありません。すべてはオプションであり、変更することが出来ます: それらはコーディングルールであり、宗教的な教義ではありません。

### 波括弧 

ほとんどのJavaScriptのプロジェクトでは、波括弧は新しい行ではなく、同じ行に書かれます。いわゆる "エジプト" スタイルです。またそれは開始の括弧の前にスペースがあります。

このようになります:

```js
if (condition) {
  // do this
  // ...and that
  // ...and that
}
```

１行の構造も重要なエッジケースです。我々は括弧を使うべきですか？もしそうならどこででしょうか？

注釈付きのバリアントは次の通りです。あなた自身でその可読性を判断してみてください:

<!--
```js no-beautify
if (n < 0) {alert(`Power ${n} is not supported`);}

if (n < 0) alert(`Power ${n} is not supported`);

if (n < 0)
  alert(`Power ${n} is not supported`);

if (n < 0) {
  alert(`Power ${n} is not supported`);
}
```
-->
![](figure-bracket-style.png)

まとめると:
- 本当に短いコードは、`if (cond) return null` のように1行が許容されます:。
- しかし、複数の文がある場合には、括弧内の各文ごとに行を分けるのが通常は良いです。

### 行の長さ

行の最大長は制限されるべきです。誰も長い水平な行は好きではありません。行を分ける方が良いです。

行の最大長はチームで決められます。通常は 80 もしくは 120 文字です。

### インデント

２つのタイプのインデントがあります。:

- **水平なインデント： 2(4)個のスペース**

    水平なインデントは 2 または 4 つのスペース、もしくは "タブ" 記号を使います。どれを選ぶかは古い聖戦です。最近はスペースが一般的です。
    タブよりもスペースがよい利点の１つは、スペースは "タブ" 記号よりもより柔軟なインデントの設定ができることです。

    例えば、このように、開始の括弧に対して引数を並べることができます:

    ```js no-beautify
    show(parameters,
         aligned, // 左から 5 つのスペース
         one,
         after,
         another
      ) {
      // ...
    }
    ```

- **垂直のインデント: コードを論理ブロックに分割するための空行**

    １つの関数でさえ、頻繁に論理ブロックに分割されます。下の例では、変数の初期化、メインのループと結果返却は垂直に分かれています。:

    ```js
    function pow(x, n) {
      let result = 1;
      //              <--
      for (let i = 0; i < n; i++) {
        result *= x;
      }
      //              <--
      return result;
    }
    ```

    コードがより読みやすくするために新しい行を挿入しましょう。垂直インデントなしで、コードの行が9行を超えるべきではありません。

### セミコロン

セミコロンは各文の後に存在するべきです。たとえ省略できるとしても。

セミコロンが本当にオプションである言語がありますが、それはほとんど使用されていません。また、JavaScriptでは改行がセミコロンとして解釈されないケースがあり、プログラミングエラーの可能性を残します。

プログラマとしてより成熟するにつれて、セミコロンなしのスタイルを選ぶかもしれません、[StandardJS](https://standardjs.com/), しかし、それはあなたがJavaScriptをよく知っており、かつ落とし穴の可能性を理解している場合にのみです。

### ネストレベル

ネストのレベルが多くなり過ぎてはいけません。

`if(..) { ... }` で余分なネストを避けるために、ループで["continue"](info:while-for#continue)ディレクティブを使うことは、時には良いアイデアです。:

以下の代わりに:

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- 1つネストレベルが増える
  }
}
```

こう書けます:

```js
for (let i = 0; i < 10; i++) {
  if (!cond) *!*continue*/!*;
  ...  // <- 余分なネストレベルなし
}
```

同様のことが、`if/else` や `return` でもできます。

例えば、下の2つの構造は同一です。

１つ目:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }  
}
```

2つ目:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

...`n < 0` というエッジケースは早い段階で処理されるため、余分なネストなしのメインのコードフローとなります。そのため、２つ目はより読みやすいです。

## コードの下の関数 [#functions-below-the-code]

もしいくつかの "ヘルパー関数"と、それを使うコードを書く場合、それらを配置する３つの方法があります。

1. それを使うコードの上に関数を記述する:

    ```js
    // *!*関数宣言*/!*
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }

    // *!*関数を使用するコード*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();
    ```
2. コードが最初で、その後に関数を記述

    ```js
    // *!*関数を使用するコード*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();

    // --- *!*ヘルパー関数*/!* ---

    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }
    ```
3. ミックス: 初めて使われる場所で関数を記述する

ほとんどの場合、2つ目がより好まれます。

なぜならコードを読むとき、私たちは最初に "何をするか" を知りたいからです。コードが最初にくるとその情報が与えられます。そしてそれらの関数名が行うべきことに相応しいものであれば、関数の中身を読む必要は全くないかもしれません。

## スタイルガイド [#style-guides]

スタイルガイドは "書き方" についての一般的なルールを含みます: どの引用符を使うか、インデントするスペースの数、改行を置く場所など、多くの細かいことがあります。

全体でチーム全員が同じスタイルガイドを使うとき、コードは画一的になります。チームの誰がそれを書いても、同じスタイルになります。

チームは自身のスタイルガイドを考えるかもしれません。しかし今のところそれをする必要はありません。多くの試行、鍛え上げられたスタイルガイドがすでにあり、それを適用するのは簡単です。

例えば:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (他にもあります)

あなたが新米の開発者であれば、上のチートシートから始める事ができます。そしてその後、共通の原則を拾うためにスタイルガイドを参照し1つを選ぶかもしれません。

## 自動 linter [#automated-linters]

コードのスタイルを自動でチェックできるツールがあります。それらを "linter" と呼びます。

それらの素晴らしい点は、スタイルチェックは変数や関数名の中のタイポなど、いくつかのバグも見つけることです。

なので、たとえ "コードスタイル" に固執したくない場合でも、それを導入することを推奨します。それらはタイポを見つけるのに役立ち -- それだけで既に十分です。

もっとも知られているツールは:

- [JSLint](http://www.jslint.com/) -- one of the first linters.
- [JSHint](http://www.jshint.com/) -- more settings than JSLint.
- [ESLint](http://eslint.org/) -- probably the newest one.

これらどれでも利用できます。著者は [ESLint](http://eslint.org/) を使ってます。

ほとんどの linter はエディタに統合されます: エディタのプラグインを有効にし、スタイルの設定をするだけです。

例えば、ESLint では次のようなことをします。:

1. [Node.JS](https://nodejs.org/) をインストールします。
2. `npm install -g eslint` コマンドで ESLint をインストールします(npm は Node.JS パッケージインストーラです)
3. あなたのJavaScriptプロジェクト(あなたのすべてのファイルを含むフォルダ)のルートに `.ellintrc` という名前の設定ファイルを作ります

`.eslintrc` の例です:

```js
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
  },
  "indent": 2
}
```

ここで、ディレクティブ `"extends"` は "eslint:recommended" の設定に基づいていることを示し、次に我々自身の設定を指定します。

次に、ESLint と統合されたエディタで、プラグインのインストール/有効化をします。多くのエディタはそれを持っています。

代わりに、Webからスタイルのルールセットをダウンロードし、それを拡張することもできます。インストールについての詳細は、<http://eslint.org/docs/user-guide/getting-started> を見てください。

linter を使うと素晴らしい副作用があります: linter はタイポを見つけます。例えば、未宣言変数へのアクセスがあった場合、linter はそれを検出し、(もしもエディタと統合してれば)それをハイライトします。ほとんどのケースでそれはミスタイプです。よってすぐに直すことができます。

そのような理由から、たとえスタイルについて関心がなくても、linter を利用することを強く勧めます。

また、特定のIDEは組み込みの linter をサポートしています。それも良いですが、ESLintの方がより柔軟なチューニングが可能です。

## サマリ [#summary]

このチャプターとスタイルガイドのすべての構文ルールは、可読性を高めるのが狙いなので、すべて議論の余地があります。

私たちが "より良く書くための方法" について考えるとき、唯一の基準は "コードをより読みやすく理解しやすくすること、エラーを回避するのに役立つこと" です。それがスタイルを選んだり、どちらがより良いかを議論する時に心に留めておく重要なことです。

それに関して最新の考えを知るためにスタイルガイドを読み、あなたが見つけた最高のアイデアに従いましょう。
