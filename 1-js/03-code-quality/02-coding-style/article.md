# コーディングスタイル

コードはできるだけ綺麗で読みやすいものでなければなりません。

複雑なタスクを正しくかつ読みやすい形でコード化する、それはまさにプログラミングの芸術です。優れたコーディングスタイルは、そのための大きな助けとなるのです。

## 構文 

下記は、いくつかの推奨ルールを示したチートシートです(詳細は後述):

![](code-style.svg)
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

では、これらのルールと理由について詳細を説明します。

```warn header="\"しなければならない\" というルールはありません。"
変えられないものはありません。これらはスタイルの好みであり、宗教的な教義ではありません。
```

### 波括弧 

ほとんどのJavaScriptのプロジェクトでは、波括弧は新しい行ではなく、同じ行に書かれます。いわゆる "エジプト" スタイルです。また開始の括弧の前にはスペースがあります。

このようになります:

```js
if (condition) {
  // do this
  // ...and that
  // ...and that
}
```

`if (condition) doSomething()` のような１行の構造も重要なエッジケースです。すべて括弧を使うべきでしょうか？

次にいくつか注釈付きでパターンを示します。あなた自身でその可読性を判断してみてください:

1. 😠 初心者はこのようにすることがありますが、よくありません! 波括弧は必要ありません:
    ```js
    if (n < 0) *!*{*/!*alert(`Power ${n} is not supported`);*!*}*/!*
    ```
2. 😠 括弧なしで別の行に分割しています。行を追加するときにミスを起こしやすいので、決して行わないでください。:
    ```js
    if (n < 0)
      alert(`Power ${n} is not supported`);
    ```
3. 😏 括弧なしの1行。短い場合は許容されます:
    ```js
    if (n < 0) alert(`Power ${n} is not supported`);
    ```
4. 😃 ベストな形式:
    ```js
    if (n < 0) {
      alert(`Power ${n} is not supported`);
    }
    ```

非常に簡潔なコードであれば、`if (cond) return null` のような１行の形式は許容されます。しかしながら、コードブロック（最後のバリアント）の方が、通常はより読みやすい形式です。

### 行の長さ

横に長いコードを読むのが好きな人はいません。それらを分割するのがベストプラクティスです。

例:
```js
// バッククォート ` を使うと、文字列を複数行に分割することができます
let str = `
  ECMA International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`;
```

また、`if` 文の場合は:

```js
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```

1行の最大長は、チームレベルで合意しておくべきでしょう。通常は 80 または 120 文字です。

### インデント

２つのタイプのインデントがあります。:

- **水平なインデント： 2(4)個のスペース**

    水平なインデントは 2 または 4 つのスペース、もしくは "タブ" 記号(キー `key:Tab`)を使います。どれを選ぶかは好みの問題です。最近はスペースが一般的です。

    タブよりもスペースの方がよい点の１つは、スペースは "タブ" 記号よりもより柔軟なインデントの設定ができることです。

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

    １つの関数であっても、多くの場合、論理的なブロックに分割可能です。下の例では、変数の初期化、メインのループ、結果の返却を縦方向に分割しています。:

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

セミコロンは、たとえ省略できるとしても各文の末尾に存在するべきです。

セミコロンが本当にオプションである言語がありますが、その言語はほとんど使用されていません。また、JavaScriptでは改行がセミコロンとして解釈されないケースがあり、プログラミングエラーの可能性を残します。詳細については、チャプター<info:structure#semicolon>を参照してください。

JavaScript のプログラマとしてより成熟するにつれて、[StandardJS](https://standardjs.com/) のようにセミコロンなしのスタイルを選ぶかもしれません。それ以外の場合、起こりうる落とし穴を避けるためセミコロンを使用するのが最善です。開発者の大多数はセミコロンをつけています。

### ネストレベル

コードはネストし過ぎないようにしてください。

例えば、ループで余計なネストを避けるために ["continue"](info:while-for#continue)ディレクティブを使うことは、時には良いアイデアです。

また、このようにネストした `if` を追加する代わりに:

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- 1つネストレベルが増える
  }
}
```

このように書けます:

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

`n < 0` というエッジケースは早い段階で処理されるため、余分なネストがないメインのコードフローとなります。そのため、２つ目はより読みやすいです。

## 関数の配置 

もしいくつかの "ヘルパー関数" を作り、それを使うコードを書く場合、それらを配置する方法が3つあります。

1. ヘルパー関数を使うコードの上に関数を記述する:

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

たいていの場合、2つ目がより好まれます。

なぜなら、コードを読むとき、私たちは最初に "何をするか" を知りたいからです。コードが最初にくるとその情報を得ることができます。そしてそれらの関数名が行うべきことに相応しいものであれば、関数の中身を読む必要は全くないかもしれません。

## スタイルガイド 

スタイルガイドは "書き方" についての一般的なルールを含みます: どの引用符を使うか、インデントするスペースの数、改行を置く場所など、多くの細かいことがあります。

全体でチーム全員が同じスタイルガイドを使うとき、コードは画一的になります。チームの誰がそれを書いても、同じスタイルになります。

もちろん、チームは自分たちのスタイルガイドを作ることができます。 ただしほとんどの場合、必要ありません。既に多くの実証済みの選択肢があるので、これらのうちの1つを採用するのが通常は最善の策です。

例えば:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (他にもあります)

あなたが新米の開発者であれば、この章の始めにあるチートシートから始めるとよいでしょう。その後、他のスタイルガイドを参照し、一般的な原則を知った上で最も好きなものを選択するのが良いでしょう。

## 自動 linter 

Linter はコードのスタイルを自動でチェックし改善が提案できるツールです。

それらの素晴らしい点は、スタイルチェックは変数や関数名の中のタイポなど、いくつかのバグも見つけることです。なので、たとえ "コードスタイル" に固執したくない場合でも、それを導入することを推奨します。

もっとも知られているツールはこれらです:

- [JSLint](http://www.jslint.com/) -- 最初の linter の1つ
- [JSHint](http://www.jshint.com/) -- JSLint よりも多くの設定が可能
- [ESLint](http://eslint.org/) -- 恐らく最も新しい linter

これらどれでも利用できます。著者は [ESLint](http://eslint.org/) を使ってます。

ほとんどの linter はエディタに統合されます: エディタのプラグインを有効にし、スタイルの設定をするだけです。

例えば、ESLint では次のようなことをします。:

1. [Node.js](https://nodejs.org/) をインストールします。
2. `npm install -g eslint` コマンドで ESLint をインストールします(npm は Node.js パッケージインストーラです)
3. JavaScriptプロジェクト(すべてのファイルを含むフォルダ)のルートに `.ellintrc` という名前の設定ファイルを作ります
4. ESlint と統合するエディタのプラグインをインストール/有効化します。エディタの大多数はそれを持っています。

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
    "indent": 2
  }
}
```

ここで、ディレクティブ `"extends"` は "eslint:recommended" の設定に基づいていることを示し、次に我々自身の設定を指定します。

次に、ESLint と統合されたエディタで、プラグインのインストール/有効化をします。多くのエディタはそれを持っています。

代わりに、Webからスタイルのルールセットをダウンロードし、それを拡張することもできます。インストールについての詳細は、<http://eslint.org/docs/user-guide/getting-started> を見てください。

上でも言いましたが、linter を使うと素晴らしい副次効果があります: linter はタイポを見つけます。例えば、未宣言変数へのアクセスがあった場合、linter はそれを検出し、(もしもエディタと統合してれば)それをハイライトします。ほとんどのケースでそれはタイプミスです。よってすぐに直すことができます。

そのような理由から、たとえスタイルについて関心がなくても、linter を利用することを強く勧めます。

また、特定のIDEは組み込みの linter をサポートしています。それも良いですが、ESLintの方がより柔軟なチューニングが可能です。

## サマリ 

このチャプターとスタイルガイドのすべての構文ルールは、可読性を高めるのが狙いなので、すべて議論の余地があります。

私たちが "より良く書くための方法" について考えるとき、唯一の基準は "コードをより読みやすく理解しやすくすること、エラーを回避するのに役立つこと" です。それがスタイルを選んだり、どちらがより良いかを議論する時に心に留めておく重要なことです。

それに関して最新の考えを知るためにスタイルガイドを読み、あなたが見つけた最高のアイデアに従いましょう。
