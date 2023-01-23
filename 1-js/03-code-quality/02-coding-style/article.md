<<<<<<< HEAD
# コーディングスタイル
=======
# Coding Style
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

コードはできるだけ綺麗で読みやすいものでなければなりません。

<<<<<<< HEAD
複雑なタスクを正しくかつ読みやすい形でコード化する、それはまさにプログラミングの極意です。優れたコーディングスタイルは、そのための大きな助けとなるのです。

## 構文 

下記は、いくつかの推奨ルールを示したチートシートです(詳細は後述):

=======
That is actually the art of programming -- to take a complex task and code it in a way that is both correct and human-readable. A good code style greatly assists in that.  

## Syntax

Here is a cheat sheet with some suggested rules (see below for more details):

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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
    please enter a non-negative integer number`);
} else {
  alert( pow(x, n) );
}
```

-->

では、これらのルールと理由について詳細を説明します。

<<<<<<< HEAD
```warn header="\"しなければならない\" というルールはありません。"
変えられないものはありません。これらはスタイルの好みであり、宗教的な教義ではありません。
```

### 波括弧 

ほとんどのJavaScriptのプロジェクトでは、波括弧は新しい行ではなく、同じ行に書かれます。いわゆる "エジプト" スタイルです。また開始の括弧の前にはスペースがあります。

このようになります:
=======
```warn header="There are no \"you must\" rules"
Nothing is set in stone here. These are style preferences, not religious dogmas.
```

### Curly Braces

In most JavaScript projects curly braces are written in "Egyptian" style with the opening brace on the same line as the corresponding keyword -- not on a new line. There should also be a space before the opening bracket, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
if (condition) {
  // do this
  // ...and that
  // ...and that
}
```

<<<<<<< HEAD
`if (condition) doSomething()` のような１行の構造も重要なエッジケースです。すべて括弧を使うべきでしょうか？

次にいくつか注釈付きでパターンを示します。あなた自身でその可読性を判断してみてください:

1. 😠 初心者はこのようにすることがありますが、よくありません! 波括弧は必要ありません:
    ```js
    if (n < 0) *!*{*/!*alert(`Power ${n} is not supported`);*!*}*/!*
    ```
2. 😠 括弧なしで別の行に分割しています。行を追加するときにミスを起こしやすいので、決して行わないでください。:
=======
A single-line construct, such as `if (condition) doSomething()`, is an important edge case. Should we use braces at all?

Here are the annotated variants so you can judge their readability for yourself:

1. 😠 Beginners sometimes do that. Bad! Curly braces are not needed:
    ```js
    if (n < 0) *!*{*/!*alert(`Power ${n} is not supported`);*!*}*/!*
    ```
2. 😠 Split to a separate line without braces. Never do that, easy to make an error when adding new lines:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    ```js
    if (n < 0)
      alert(`Power ${n} is not supported`);
    ```
<<<<<<< HEAD
3. 😏 括弧なしの1行。短い場合は許容されます:
    ```js
    if (n < 0) alert(`Power ${n} is not supported`);
    ```
4. 😃 ベストな形式:
=======
3. 😏 One line without braces - acceptable, if it's short:
    ```js
    if (n < 0) alert(`Power ${n} is not supported`);
    ```
4. 😃 The best variant:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    ```js
    if (n < 0) {
      alert(`Power ${n} is not supported`);
    }
    ```

<<<<<<< HEAD
非常に簡潔なコードであれば、`if (cond) return null` のような１行の形式は許容されます。しかしながら、コードブロック（最後のバリアント）の方が、通常はより読みやすい形式です。

### 行の長さ

横に長いコードを読むのが好きな人はいません。それらを分割するのがベストプラクティスです。

例:
```js
// バッククォート ` を使うと、文字列を複数行に分割することができます
=======
For a very brief code, one line is allowed, e.g. `if (cond) return null`. But a code block (the last variant) is usually more readable.

### Line Length

No one likes to read a long horizontal line of code. It's best practice to split them.

For example:
```js
// backtick quotes ` allow to split the string into multiple lines
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let str = `
  ECMA International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`;
```

<<<<<<< HEAD
また、`if` 文の場合は:
=======
And, for `if` statements:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```

<<<<<<< HEAD
1行の最大長は、チームレベルで合意しておくべきでしょう。通常は 80 または 120 文字です。
=======
The maximum line length should be agreed upon at the team-level. It's usually 80 or 120 characters.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

### インデント

２つのタイプのインデントがあります。:

<<<<<<< HEAD
- **水平なインデント： 2(4)個のスペース**

    水平なインデントは 2 または 4 つのスペース、もしくは "タブ" 記号(キー `key:Tab`)を使います。どれを選ぶかは好みの問題です。最近はスペースが一般的です。

    タブよりもスペースの方がよい点の１つは、スペースは "タブ" 記号よりもより柔軟なインデントの設定ができることです。

    例えば、このように、開始の括弧に対して引数を並べることができます:
=======
- **Horizontal indents: 2 or 4 spaces.**

    A horizontal indentation is made using either 2 or 4 spaces or the horizontal tab symbol (key `key:Tab`). Which one to choose is an old holy war. Spaces are more common nowadays.

    One advantage of spaces over tabs is that spaces allow more flexible configurations of indents than the tab symbol.

    For instance, we can align the parameters with the opening bracket, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

    １つの関数であっても、多くの場合、論理的なブロックに分割可能です。下の例では、変数の初期化、メインのループ、結果の返却を縦方向に分割しています。:
=======
- **Vertical indents: empty lines for splitting code into logical blocks.**

    Even a single function can often be divided into logical blocks. In the example below, the initialization of variables, the main loop and returning the result are split vertically:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

セミコロンが本当にオプションで、ほとんど使われない言語もあります。また、JavaScriptでは改行がセミコロンとして解釈されないケースがあり、プログラミングエラーの可能性を残します。詳細については、チャプター<info:structure#semicolon>を参照してください。

JavaScript のプログラマとしてより成熟するにつれて、[StandardJS](https://standardjs.com/) のようにセミコロンなしのスタイルを選ぶかもしれません。それ以外の場合、起こりうる落とし穴を避けるためセミコロンを使用するのが最善です。開発者の大多数はセミコロンをつけています。

### ネストレベル

コードはネストし過ぎないようにしてください。

例えば、ループで余計なネストを避けるために ["continue"](info:while-for#continue)ディレクティブを使うことは、時には良いアイデアです。

また、このようにネストした `if` を追加する代わりに:
=======
### Semicolons

A semicolon should be present after each statement, even if it could possibly be skipped.

There are languages where a semicolon is truly optional and it is rarely used. In JavaScript, though, there are cases where a line break is not interpreted as a semicolon, leaving the code vulnerable to errors. See more about that in the chapter <info:structure#semicolon>.

If you're an experienced JavaScript programmer, you may choose a no-semicolon code style like [StandardJS](https://standardjs.com/). Otherwise, it's best to use semicolons to avoid possible pitfalls. The majority of developers put semicolons.

### Nesting Levels

Try to avoid nesting code too many levels deep.

For example, in the loop, it's sometimes a good idea to use the [`continue`](info:while-for#continue) directive to avoid extra nesting.

For example, instead of adding a nested `if` conditional like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
2つ目のコードは、`n < 0` という特殊なケースが早い段階で処理されるため、より読みやすくなっています。このチェックが終わると、追加のネストを必要とせずにメインのコードフローに移ることができているからです。

## 関数の配置 

もしいくつかの "ヘルパー関数" を作り、それを使うコードを書く場合、それらを配置する方法が3つあります。

1. 関数を使用するコードより前に関数を記述する:
=======
The second one is more readable because the "special case" of `n < 0` is handled early on. Once the check is done we can move on to the "main" code flow without the need for additional nesting.

## Function Placement

If you are writing several "helper" functions and the code that uses them, there are three ways to organize the functions.

1. Declare the functions *above* the code that uses them:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
2. 関数を使用するコードが最初で、その後に関数を記述

    ```js
    // *!*関数を使用するコード*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();

<<<<<<< HEAD
    // --- *!*ヘルパー関数*/!* ---

=======
    // --- *!*helper functions*/!* ---
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

たいていの場合、2つ目がより好まれます。

<<<<<<< HEAD
なぜなら、コードを読むとき、私たちは最初に "何をするか" を知りたいからです。関数を使用するコードが先に書かれていれば、何をするかが最初から明確になります。そして、実際に何を行うかを関数名が表していれば、関数の中身を読む必要はまったくないかもしれません。

## スタイルガイド 

スタイルガイドは "書き方" についての一般的なルールを含みます: どの引用符を使うか、インデントするスペースの数、改行を置く場所など、多くの細かいことがあります。

チームのメンバー全員が同じスタイルガイドを使用すると、どのメンバーが書いたかに関わらず、コードの見た目が統一されます。

もちろん、チームは自分たちのスタイルガイドを作ることができます。 ただしほとんどの場合、必要ありません。既に多くの実証済みの選択肢があるので、これらのうちの1つを採用するのが通常は最善の策です。

例えば:
=======
That's because when reading code, we first want to know *what it does*. If the code goes first, then it becomes clear from the start. Then, maybe we won't need to read the functions at all, especially if their names are descriptive of what they actually do.

## Style Guides

A style guide contains general rules about "how to write" code, e.g. which quotes to use, how many spaces to indent, the maximal line length, etc. A lot of minor things.

When all members of a team use the same style guide, the code looks uniform, regardless of which team member wrote it.

Of course, a team can always write their own style guide, but usually there's no need to. There are many existing guides to choose from.

Some popular choices:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
<<<<<<< HEAD
- (他にもたくさんあります)

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
=======
- (plus many more)

If you're a novice developer, start with the cheat sheet at the beginning of this chapter. Then you can browse other style guides to pick up more ideas and decide which one you like best.

## Automated Linters

Linters are tools that can automatically check the style of your code and make improving suggestions.

The great thing about them is that style-checking can also find some bugs, like typos in variable or function names. Because of this feature, using a linter is recommended even if you don't want to stick to one particular "code style".

Here are some well-known linting tools:

- [JSLint](https://www.jslint.com/) -- one of the first linters.
- [JSHint](https://jshint.com/) -- more settings than JSLint.
- [ESLint](https://eslint.org/) -- probably the newest one.

All of them can do the job. The author uses [ESLint](https://eslint.org/).

Most linters are integrated with many popular editors: just enable the plugin in the editor and configure the style.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

1. [Node.js](https://nodejs.org/) をインストールします。
2. `npm install -g eslint` コマンドで ESLint をインストールします(npm は Node.js パッケージインストーラです)
3. JavaScriptプロジェクト(すべてのファイルを含むフォルダ)のルートに `.ellintrc` という名前の設定ファイルを作ります
4. ESlint と統合するエディタのプラグインをインストール/有効化します。エディタの大多数はそれを持っています。

<<<<<<< HEAD
`.eslintrc` の例です:
=======
1. Install [Node.js](https://nodejs.org/).
2. Install ESLint with the command `npm install -g eslint` (npm is a JavaScript package installer).
3. Create a config file named `.eslintrc` in the root of your JavaScript project (in the folder that contains all your files).
4. Install/enable the plugin for your editor that integrates with ESLint. The majority of editors have one.

Here's an example of an `.eslintrc` file:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
ここで、ディレクティブ `"extends"` は "eslint:recommended" の設定に基づいていることを示し、次に我々自身の設定を指定します。

次に、ESLint と統合されたエディタで、プラグインのインストール/有効化をします。多くのエディタはそれを持っています。

代わりに、Webからスタイルのルールセットをダウンロードし、それを拡張することもできます。インストールについての詳細は、<http://eslint.org/docs/user-guide/getting-started> を見てください。

上でも言いましたが、linter を使うと素晴らしい副次効果があります: linter はタイポを見つけます。例えば、未宣言変数へのアクセスがあった場合、linter はそれを検出し、(もしもエディタと統合してれば)それをハイライトします。ほとんどのケースでそれはタイプミスです。よってすぐに直すことができます。

そのような理由から、たとえスタイルについて関心がなくても、linter を利用することを強く勧めます。

また、特定のIDEは組み込みの linter をサポートしています。それも良いですが、ESLintの方がより柔軟なチューニングが可能です。
=======
Here the directive `"extends"` denotes that the configuration is based on the "eslint:recommended" set of settings. After that, we specify our own.

It is also possible to download style rule sets from the web and extend them instead. See <https://eslint.org/docs/user-guide/getting-started> for more details about installation.

Also certain IDEs have built-in linting, which is convenient but not as customizable as ESLint.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## サマリ 

<<<<<<< HEAD
このチャプターとスタイルガイドのすべての構文ルールは、可読性を高めるのが狙いなので、すべて議論の余地があります。

私たちが "より良く書くための方法" について考えるとき、唯一の基準は "コードをより読みやすく理解しやすくすること、エラーを回避するのに役立つこと" です。それがスタイルを選んだり、どちらがより良いかを議論する時に心に留めておく重要なことです。

それに関して最新の考えを知るためにスタイルガイドを読み、あなたが見つけた最高のアイデアに従いましょう。
=======
All syntax rules described in this chapter (and in the style guides referenced) aim to increase the readability of your code. All of them are debatable.

When we think about writing "better" code, the questions we should ask ourselves are: "What makes the code more readable and easier to understand?" and "What can help us avoid errors?" These are the main things to keep in mind when choosing and debating code styles.

Reading popular style guides will allow you to keep up to date with the latest ideas about code style trends and best practices.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
