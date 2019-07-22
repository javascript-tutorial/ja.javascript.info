<<<<<<< HEAD
# コーディングスタイル
=======
# Coding Style
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

私たちのコードはできるだけ綺麗で読みやすいものでなければなりません。

<<<<<<< HEAD
それはまさにプログラミングの芸術です -- 複雑な処理を正しく、人が読める形でコーディングすることです。

それを助ける一つが、良いコードスタイルです。

[cut]
=======
That is actually the art of programming -- to take a complex task and code it in a way that is both correct and human-readable. A good code style greatly assists in that.  
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

## 構文 

<<<<<<< HEAD
ルールに基づいたチートシート(より詳細は下)です:
=======
Here is a cheat sheet with some suggested rules (see below for more details):
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

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

では、これらのルールと理由について詳細を説明します。

<<<<<<< HEAD
"変えてはいけない" ものはここにはありません。すべてはオプションであり、変更することが出来ます: それらはコーディングの好みであり、宗教的な教義ではありません。

### 波括弧 

ほとんどのJavaScriptのプロジェクトでは、波括弧は新しい行ではなく、同じ行に書かれます。いわゆる "エジプト" スタイルです。また開始の括弧の前にはスペースがあります。

このようになります:
=======
```warn header="There are no \"you must\" rules"
Nothing is set in stone here. These are style preferences, not religious dogmas.
```

### Curly Braces

In most JavaScript projects curly braces are written in "Egyptian" style with the opening brace on the same line as the corresponding keyword -- not on a new line. There should also be a space before the opening bracket, like this:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

```js
if (condition) {
  // do this
  // ...and that
  // ...and that
}
```

<<<<<<< HEAD
１行の構造も重要なエッジケースです。我々は括弧を使うべきでしょうか？その場合どうなるでしょうか？

次にいくつか注釈付きでパターンを示します。あなた自身でその可読性を判断してみてください:
=======
A single-line construct, such as `if (condition) doSomething()`, is an important edge case. Should we use braces at all?

Here are the annotated variants so you can judge their readability for yourself:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

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

<<<<<<< HEAD
まとめると:
- 本当に短いコードであれば、`if (cond) return null` のように1行が許容されます:。
- しかし、複数の文がある場合には、通常は括弧内の各文ごとに行を分けるのが良いです。

### 行の長さ

行の最大長は制限されるべきです。誰も横に長い行は好きではありません。それよりも行を分ける方が良いです。

行の最大長はチームで決められますが、通常は 80 もしくは 120 文字です。
=======
### Line Length

No one likes to read a long horizontal line of code. It's best practice to split them.

For example:
```js
// backtick quotes ` allow to split the string into multiple lines
let str = `
  Ecma International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`;
```

And, for `if` statements:

```js
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```

The maximum line length should be agreed upon at the team-level. It's usually 80 or 120 characters.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

### インデント

２つのタイプのインデントがあります。:

<<<<<<< HEAD
- **水平なインデント： 2(4)個のスペース**
=======
- **Horizontal indents: 2 or 4 spaces.**
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

    水平なインデントは 2 または 4 つのスペース、もしくは "タブ" 記号を使います。どれを選ぶかは好みの問題です。最近はスペースが一般的です。
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

<<<<<<< HEAD
- **垂直のインデント: コードを論理ブロックに分割するための空行**

    １つの関数の中でさえ、しばしば論理的な塊に分割されます。下の例では、変数の初期化、メインのループと結果返却は垂直に分かれています。:
=======
- **Vertical indents: empty lines for splitting code into logical blocks.**

    Even a single function can often be divided into logical blocks. In the example below, the initialization of variables, the main loop and returning the result are split vertically:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

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

<<<<<<< HEAD
### セミコロン

セミコロンは、たとえ省略できるとしても各文の末尾に存在するべきです。

セミコロンが本当にオプションである言語がありますが、その言語はほとんど使用されていません。また、JavaScriptでは改行がセミコロンとして解釈されないケースがあり、プログラミングエラーの可能性を残します。

プログラマとしてより成熟するにつれて、セミコロンなしのスタイルを選ぶかもしれません、[StandardJS](https://standardjs.com/), しかし、それはあなたがJavaScriptをよく知っており、かつ落とし穴があることを理解している場合にのみです。

### ネストレベル

ネストのレベルが多くなり過ぎてはいけません。

`if(..) { ... }` で余分なネストを避けるために、ループで["continue"](info:while-for#continue)ディレクティブを使うことは、時には良いアイデアです。:

次の代わりに:
=======
### Semicolons

A semicolon should be present after each statement, even if it could possibly be skipped.

There are languages where a semicolon is truly optional and it is rarely used. In JavaScript, though, there are cases where a line break is not interpreted as a semicolon, leaving the code vulnerable to errors. See more about that in the chapter <info:structure#semicolon>.

If you're an experienced JavaScript programmer, you may choose a no-semicolon code style like [StandardJS](https://standardjs.com/). Otherwise, it's best to use semicolons to avoid possible pitfalls. The majority of developers put semicolons.

### Nesting Levels

Try to avoid nesting code too many levels deep.

For example, in the loop, it's sometimes a good idea to use the ["continue"](info:while-for#continue) directive to avoid extra nesting.

For example, instead of adding a nested `if` conditional like this:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

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

<<<<<<< HEAD
１つ目:
=======
Option 1:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

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

<<<<<<< HEAD
2つ目:
=======
Option 2:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

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

<<<<<<< HEAD
...`n < 0` というエッジケースは早い段階で処理されるため、余分なネストがないメインのコードフローとなります。そのため、２つ目はより読みやすいです。

## コードの下の関数 

もしいくつかの "ヘルパー関数"と、それを使うコードを書く場合、それらを配置する方法が3つあります。

1. ヘルパー関数を使うコードの上に関数を記述する:
=======
The second one is more readable because the "special case" of `n < 0` is handled early on. Once the check is done we can move on to the "main" code flow without the need for additional nesting.

## Function Placement

If you are writing several "helper" functions and the code that uses them, there are three ways to organize the functions.

1. Declare the functions *above* the code that uses them:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

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

<<<<<<< HEAD
    // --- *!*ヘルパー関数*/!* ---

=======
    // --- *!*helper functions*/!* ---
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3
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
<<<<<<< HEAD
3. ミックス: 初めて使われる場所で関数を記述する
=======
3. Mixed: a function is declared where it's first used.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

たいていの場合、2つ目がより好まれます。

<<<<<<< HEAD
なぜなら、コードを読むとき、私たちは最初に "何をするか" を知りたいからです。コードが最初にくるとその情報を得ることができます。そしてそれらの関数名が行うべきことに相応しいものであれば、関数の中身を読む必要は全くないかもしれません。

## スタイルガイド 

スタイルガイドは "書き方" についての一般的なルールを含みます: どの引用符を使うか、インデントするスペースの数、改行を置く場所など、多くの細かいことがあります。

全体でチーム全員が同じスタイルガイドを使うとき、コードは画一的になります。チームの誰がそれを書いても、同じスタイルになります。

もちろん、チームは自分たちのスタイルガイドを作ることができます。 ただしほとんどの場合、必要ありません。既に多くの実証済みの選択肢があるので、これらのうちの1つを採用するのが通常は最善の策です。

例えば:
=======
That's because when reading code, we first want to know *what it does*. If the code goes first, then it becomes clear from the start. Then, maybe we won't need to read the functions at all, especially if their names are descriptive of what they actually do.

## Style Guides

A style guide contains general rules about "how to write" code, e.g. which quotes to use, how many spaces to indent, where to put line breaks, etc. A lot of minor things.

When all members of a team use the same style guide, the code looks uniform, regardless of which team member wrote it.

Of course, a team can always write their own style guide, but usually there's no need to. There are many existing guides to choose from.

Some popular choices:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
<<<<<<< HEAD
- (他にもあります)

あなたが新米の開発者であれば、この章の始めにあるチートシートから始めるとよいでしょう。その後、他のスタイルガイドを参照し、一般的な原則を知った上で最も好きなものを選択するのが良いでしょう。

## 自動 linter 

コードのスタイルを自動でチェックできるツールがあります。それらを "linter" と呼びます。

それらの素晴らしい点は、スタイルチェックは変数や関数名の中のタイポなど、いくつかのバグも見つけることです。

なので、たとえ "コードスタイル" に固執したくない場合でも、それを導入することを推奨します。それらはタイポを見つけるのに役立ち -- それだけで既に十分です。

もっとも知られているツールは:
=======
- (plus many more)

If you're a novice developer, start with the cheat sheet at the beginning of this chapter. Then you can browse other style guides to pick up more ideas and decide which one you like best.

## Automated Linters

Linters are tools that can automatically check the style of your code and make improving suggestions.

The great thing about them is that style-checking can also find some bugs, like typos in variable or function names. Because of this feature, using a linter is recommended even if you don't want to stick to one particular "code style".

Here are some well-known linting tools:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

- [JSLint](http://www.jslint.com/) -- 最初の linter の1つ
- [JSHint](http://www.jshint.com/) -- JSLint よりも多くの設定が可能
- [ESLint](http://eslint.org/) -- 恐らく最も新しい linter

これらどれでも利用できます。著者は [ESLint](http://eslint.org/) を使ってます。

<<<<<<< HEAD
ほとんどの linter はエディタに統合されます: エディタのプラグインを有効にし、スタイルの設定をするだけです。
=======
Most linters are integrated with many popular editors: just enable the plugin in the editor and configure the style.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

例えば、ESLint では次のようなことをします。:

<<<<<<< HEAD
1. [Node.JS](https://nodejs.org/) をインストールします。
2. `npm install -g eslint` コマンドで ESLint をインストールします(npm は Node.JS パッケージインストーラです)
3. あなたのJavaScriptプロジェクト(すべてのファイルを含むフォルダ)のルートに `.ellintrc` という名前の設定ファイルを作ります

`.eslintrc` の例です:
=======
1. Install [Node.js](https://nodejs.org/).
2. Install ESLint with the command `npm install -g eslint` (npm is a JavaScript package installer).
3. Create a config file named `.eslintrc` in the root of your JavaScript project (in the folder that contains all your files).
4. Install/enable the plugin for your editor that integrates with ESLint. The majority of editors have one.

Here's an example of an `.eslintrc` file:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

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
    "indent": ["warning", 2]
  }
}
```

<<<<<<< HEAD
ここで、ディレクティブ `"extends"` は "eslint:recommended" の設定に基づいていることを示し、次に我々自身の設定を指定します。

次に、ESLint と統合されたエディタで、プラグインのインストール/有効化をします。多くのエディタはそれを持っています。

代わりに、Webからスタイルのルールセットをダウンロードし、それを拡張することもできます。インストールについての詳細は、<http://eslint.org/docs/user-guide/getting-started> を見てください。

上でも言いましたが、linter を使うと素晴らしい副次効果があります: linter はタイポを見つけます。例えば、未宣言変数へのアクセスがあった場合、linter はそれを検出し、(もしもエディタと統合してれば)それをハイライトします。ほとんどのケースでそれはタイプミスです。よってすぐに直すことができます。

そのような理由から、たとえスタイルについて関心がなくても、linter を利用することを強く勧めます。

また、特定のIDEは組み込みの linter をサポートしています。それも良いですが、ESLintの方がより柔軟なチューニングが可能です。
=======
Here the directive `"extends"` denotes that the configuration is based on the "eslint:recommended" set of settings. After that, we specify our own.

It is also possible to download style rule sets from the web and extend them instead. See <http://eslint.org/docs/user-guide/getting-started> for more details about installation.

Also certain IDEs have built-in linting, which is convenient but not as customizable as ESLint.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

## サマリ 

<<<<<<< HEAD
このチャプターとスタイルガイドのすべての構文ルールは、可読性を高めるのが狙いなので、すべて議論の余地があります。

私たちが "より良く書くための方法" について考えるとき、唯一の基準は "コードをより読みやすく理解しやすくすること、エラーを回避するのに役立つこと" です。それがスタイルを選んだり、どちらがより良いかを議論する時に心に留めておく重要なことです。

それに関して最新の考えを知るためにスタイルガイドを読み、あなたが見つけた最高のアイデアに従いましょう。
=======
All syntax rules described in this chapter (and in the style guides referenced) aim to increase the readability of your code. All of them are debatable.

When we think about writing "better" code, the questions we should ask ourselves are: "What makes the code more readable and easier to understand?" and "What can help us avoid errors?" These are the main things to keep in mind when choosing and debating code styles.

Reading popular style guides will allow you to keep up to date with the latest ideas about code style trends and best practices.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3
