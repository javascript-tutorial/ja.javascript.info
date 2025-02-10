<<<<<<< HEAD
# JavaScript スペシャル（これまでのおさらい）

このチャプターでは、微妙なケースに注意を払いながら、私たちが今まで学んだJavaScriptの機能を簡単に再確認します。

## コード構造 

文はセミコロンで区切られます:
=======
# JavaScript specials

This chapter briefly recaps the features of JavaScript that we've learned by now, paying special attention to subtle moments.

## Code structure

Statements are delimited with a semicolon:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run no-beautify
alert('Hello'); alert('World');
```

<<<<<<< HEAD
通常、行の終わりは区切りとして扱われますので、これは動作します:
=======
Usually, a line-break is also treated as a delimiter, so that would also work:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run no-beautify
alert('Hello')
alert('World')
```

<<<<<<< HEAD
これは "自動セミコロン挿入" と呼ばれます。ときどき、これは動作しません。例えば:
=======
That's called "automatic semicolon insertion". Sometimes it doesn't work, for instance:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
alert("There will be an error after this message")

[1, 2].forEach(alert)
```

<<<<<<< HEAD
ほとんどのコードスタイルのガイドは、各文の後にセミコロンを置くことに賛同しています。

セミコロンはコードブロック `{...}` や、ループのような構文構造の後では必要ありません:

```js
function f() {
  // 関数宣言のあとにセミコロンは不要です
}

for(;;) {
  // ループの後にセミコロンは不要です
}
```

...しかし、"余分な" セミコロンを任意の場所に置いたとしても、それはエラーではありません。それは無視されます。

より詳細はこちら: <info:structure>.

## Strict モード 

現在のJavaScriptのすべての機能を完全に有効にするには、`"use strict"` でスクリプトを始める必要があります。
=======
Most codestyle guides agree that we should put a semicolon after each statement.

Semicolons are not required after code blocks `{...}` and syntax constructs with them like loops:

```js
function f() {
  // no semicolon needed after function declaration
}

for(;;) {
  // no semicolon needed after the loop
}
```

...But even if we can put an "extra" semicolon somewhere, that's not an error. It will be ignored.

More in: <info:structure>.

## Strict mode

To fully enable all features of modern JavaScript, we should start scripts with `"use strict"`.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
'use strict';

...
```

<<<<<<< HEAD
そのディレクティブはスクリプトの先頭、もしくは関数の最初である必要があります。

`"use strict"` がなくてもすべて動作しますが、幾つかの機能は "互換性のある" 旧来の振る舞いとなります。一般的に、現代的な動作が好まれるでしょう。

言語に最新の機能のいくつか（今後学ぶクラスなど）は暗黙的に strict モードを有効にします。

より詳細はこちら: <info:strict-mode>.

## 変数 

これらを使って定義できます:

- `let`
- `const` (定数, 変更できない)
- `var` (古いスタイル, あとで見ます)

変数の名前は次を含むことができます:
- 文字と数字、しかし1文字目に数字は指定できません。
- 記号の `$` と `_` は普通の文字と同等です。
- 非ラテンのアルファベットや象形文字も使えますが、一般的には使用されません。

変数は動的に型付けされます。 それらは任意の値を格納することができます:
=======
The directive must be at the top of a script or at the beginning of a function body.

Without `"use strict"`, everything still works, but some features behave in the old-fashioned, "compatible" way. We'd generally prefer the modern behavior.

Some modern features of the language (like classes that we'll study in the future) enable strict mode implicitly.

More in: <info:strict-mode>.

## Variables

Can be declared using:

- `let`
- `const` (constant, can't be changed)
- `var` (old-style, will see later)

A variable name can include:
- Letters and digits, but the first character may not be a digit.
- Characters `$` and `_` are normal, on par with letters.
- Non-Latin alphabets and hieroglyphs are also allowed, but commonly not used.

Variables are dynamically typed. They can store any value:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
let x = 5;
x = "John";
```

<<<<<<< HEAD
7つのデータ型があります:

- `number` 浮動少数点と整数値両方
- `bigint` 任意の長さの整数値
- `string` 文字列
- `boolean` 論理値: `true/false`
- `null` -- 単一の値 `null` を持つ型。"空", "存在しない" を意味する
- `undefined` -- 単一の値 `undefined` を持つ型。"未割り当て" を意味する
- `object` と `symbol` -- 複雑なデータ構造やユニークな識別子です。私たちはまだそれらは学んでいません。

`typeof` 演算子は値の型を返します。2つ例外があります:
```js
typeof null == "object" // 言語の間違い
typeof function(){} == "function" // 関数は特別に扱われます
```

より詳細はこちらです: <info:variables> and <info:types>.

## インタラクション 

私たちは動作環境としてブラウザを使っているので、基本のUI関数は次の通りです:

[`prompt(question[, default])`](mdn:api/Window/prompt)
: `question` を尋ね、訪問者が入力した内容を返すか、"cancel" がクリックされたときは `null` を返します。

[`confirm(question)`](mdn:api/Window/confirm)
: `question` を尋ね、OKとキャンセルのどちらかを選択するように提案します。選択された結果は `true/false` として返されます。

[`alert(message)`](mdn:api/Window/alert)
: `message` を出力します。

それらの関数はすべて *モーダル* であり、コードの実行を止め、訪問者が回答するまでそのページとのやり取りを防ぎます。

例えば:
=======
There are 8 data types:

- `number` for both floating-point and integer numbers,
- `bigint` for integer numbers of arbitrary length,
- `string` for strings,
- `boolean` for logical values: `true/false`,
- `null` -- a type with a single value `null`, meaning "empty" or "does not exist",
- `undefined` -- a type with a single value `undefined`, meaning "not assigned",
- `object` and `symbol` -- for complex data structures and unique identifiers, we haven't learnt them yet.

The `typeof` operator returns the type for a value, with two exceptions:
```js
typeof null == "object" // error in the language
typeof function(){} == "function" // functions are treated specially
```

More in: <info:variables> and <info:types>.

## Interaction

We're using a browser as a working environment, so basic UI functions will be:

[`prompt(question, [default])`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)
: Ask a `question`, and return either what the visitor entered or `null` if they clicked "cancel".

[`confirm(question)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)
: Ask a `question` and suggest to choose between Ok and Cancel. The choice is returned as `true/false`.

[`alert(message)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)
: Output a `message`.

All these functions are *modal*, they pause the code execution and prevent the visitor from interacting with the page until they answer.

For instance:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName ); // Alice
alert( "Tea wanted: " + isTeaWanted ); // true
```

<<<<<<< HEAD
より詳細はこちらです: <info:alert-prompt-confirm>.

## 演算子 

JavaScriptは次のような演算子をサポートします:

算術
: 通常の四則演算の `* + - /`、また剰余として `%`、冪乗として `**`。

    二項演算子プラス `+` は文字列を連結します。また、オペランドのいずれかが文字列であれば、もう一方も文字列に変換されます:
=======
More in: <info:alert-prompt-confirm>.

## Operators

JavaScript supports the following operators:

Arithmetical
: Regular: `* + - /`, also `%` for the remainder and `**` for power of a number.

    The binary plus `+` concatenates strings. And if any of the operands is a string, the other one is converted to string too:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

<<<<<<< HEAD
代入
: 単純な代入の `a = b` と `a *= 2` のような他の演算子と組み合わせたものがあります。

ビット単位
: ビット演算子はビットレベルで整数を扱います。必要なときに、[docs](mdn:/JavaScript/Reference/Operators/Bitwise_Operators)を見てください。

3項
: 3つのパラメータを持つ唯一の演算子です: `cond ? resultA : result B`. `cond` が真の場合、`resultA` を返し、そうでなければ `resultB` を返します。

論理演算子
: 論理積 `&&` と 論理和 `||` は短絡評価を行い、それが停止したところの値(`true`/`false` である必要はありません)を返します。論理否定 `!` はオペランドをブール型に変換し、その逆の値を返します。

NULL合体演算子
: `??` 演算子は変数のリストから定義済みの値を選択する方法として提供されています。`a ?? b` の結果は `a` が `null/undefined` の場合は `b`、そうでなければ `a` です。

比較
: 異なる型の値のための等価チェック `==` は、それらを数値に変換します(`null` と `undefined`を除きます。それらは、お互いに等しく、他とは等しくなりません)。従って以下は等価です。:
=======
Assignments
: There is a simple assignment: `a = b` and combined ones like `a *= 2`.

Bitwise
: Bitwise operators work with 32-bit integers at the lowest, bit-level: see the [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) when they are needed.

Conditional
: The only operator with three parameters: `cond ? resultA : resultB`. If `cond` is truthy, returns `resultA`, otherwise `resultB`.

Logical operators
: Logical AND `&&` and OR `||` perform short-circuit evaluation and then return the value where it stopped (not necessary `true`/`false`). Logical NOT `!` converts the operand to boolean type and returns the inverse value.

Nullish coalescing operator
: The `??` operator provides a way to choose a defined value from a list of variables. The result of `a ?? b` is `a` unless it's `null/undefined`, then `b`.

Comparisons
: Equality check `==` for values of different types converts them to a number (except `null` and `undefined` that equal each other and nothing else), so these are equal:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

<<<<<<< HEAD
    他の比較も同様に数値に変換します。

    厳密等価演算子 `===` は変換を行いません: 異なる型は常に異なる値を意味します。

    値 `null` と `undefined` は特別です: それらはお互いに等価 `==` であり、それ以外と等しくありません。

    より大きい/少ない演算子は文字列を1文字ずつ比較し、他の型は数値に変換します。

その他
: 他にもカンマ演算子などがあります。

より詳細はこちらです: <info:operators>, <info:comparison>, <info:logical-operators>.

## ループ 

- 私たちは3つのタイプのループを説明しました:
=======
    Other comparisons convert to a number as well.

    The strict equality operator `===` doesn't do the conversion: different types always mean different values for it.

    Values `null` and `undefined` are special: they equal `==` each other and don't equal anything else.

    Greater/less comparisons compare strings character-by-character, other types are converted to a number.

Other operators
: There are few others, like a comma operator.

More in: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-coalescing-operator>.

## Loops

- We covered 3 types of loops:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

    ```js
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

<<<<<<< HEAD
- `for(let...)` ループの中で宣言された変数はループの内側でのみ見えます。しかし、`let` を省略することができ、既存の変数を再利用することも出来ます。
- ディレクティブ `break/continue` はループ全体/現在のイテレーションを終了させることができます。ネストされたループを停止する場合にはラベルを使ってください。

詳細はこちらです: <info:while-for>.

今後、オブジェクトを扱うためのより多くの種類のループを学びます。

## "switch" 構造 

"switch" 構造は複数の `if` チェックに置換できます。それは比較に `===` を使います。

例えば:
=======
- The variable declared in `for(let...)` loop is visible only inside the loop. But we can also omit `let` and reuse an existing variable.
- Directives `break/continue` allow to exit the whole loop/current iteration. Use labels to break nested loops.

Details in: <info:while-for>.

Later we'll study more types of loops to deal with objects.

## The "switch" construct

The "switch" construct can replace multiple `if` checks. It uses `===` (strict equality) for comparisons.

For instance:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
<<<<<<< HEAD
    alert("Won't work"); // プロンプトの結果は文字列であり、数値ではありません
=======
    alert("Won't work"); // the result of prompt is a string, not a number
    break;
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

<<<<<<< HEAD
詳細はこちらです: <info:switch>.

## 関数 

私たちは、JavaScriptで関数を作る3つの方法をカバーしました。:

1. 関数宣言: メインコードフローの中の関数
=======
Details in: <info:switch>.

## Functions

We covered three ways to create a function in JavaScript:

1. Function Declaration: the function in the main code flow
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

<<<<<<< HEAD
2. 関数式: 式のコンテキストにある関数
=======
2. Function Expression: the function in the context of an expression
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
<<<<<<< HEAD
    }
    ```

3. アロー関数:

    ```js
    // 右側の式です
    let sum = (a, b) => a + b;

    // もしくは { ... } を使った複数行の構文で、return が必要です:
=======
    };
    ```

3. Arrow functions:

    ```js
    // expression on the right side
    let sum = (a, b) => a + b;

    // or multi-line syntax with { ... }, need return here:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
    let sum = (a, b) => {
      // ...
      return a + b;
    }

<<<<<<< HEAD
    // 引数なし
    let sayHi = () => alert("Hello");

    // 1つの引数
=======
    // without arguments
    let sayHi = () => alert("Hello");

    // with a single argument
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
    let double = n => n * 2;
    ```


<<<<<<< HEAD
- 関数はローカル変数を持ちます: それらはその関数本体の中で宣言されます。このような変数は関数の中でだけ見えます。
- パラメータはデフォルト値を持つことが出来ます。: `function sum(a = 1, b = 2) {...}`.
- 関数は常に何かを返します。もしも `return` 文がない場合は　`undefined` を返します。

詳細はこちら: <info:function-basics>, <info:function-expressions-arrows>.

## これからが本番です 

ここまではJavaScriptの機能の簡単な一覧でした。今のところ、私たちは基本だけを学びました。このチュートリアルではさらに、JavaScriptのより特別で高度な機能について説明していきます。
=======
- Functions may have local variables: those declared inside its body or its parameter list. Such variables are only visible inside the function.
- Parameters can have default values: `function sum(a = 1, b = 2) {...}`.
- Functions always return something. If there's no `return` statement, then the result is `undefined`.

Details: see <info:function-basics>, <info:arrow-functions-basics>.

## More to come

That was a brief list of JavaScript features. As of now we've studied only basics. Further in the tutorial you'll find more specials and advanced features of JavaScript.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
