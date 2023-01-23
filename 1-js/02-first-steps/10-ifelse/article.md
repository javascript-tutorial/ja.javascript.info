<<<<<<< HEAD
#  条件分岐: if, '?'

時には、条件に基づき異なるアクションを実行する必要があります。

そのための `if` 文と、 "疑問符" 演算子とも呼ばれる条件付き演算子(3項演算子) `"?"` があります。

## "if" 文 
=======
# Conditional branching: if, '?'

Sometimes, we need to perform different actions based on different conditions.

To do that, we can use the `if` statement and the conditional operator `?`, that's also called a "question mark" operator.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

"if" 文は与えられた条件を評価します。結果が `true` であればコードを実行します。

<<<<<<< HEAD
例:
=======
The `if(...)` statement evaluates a condition in parentheses and, if the result is `true`, executes a block of code.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

*!*
if (year == 2015) alert( 'You are right!' );
*/!*
```

<<<<<<< HEAD
上の例は、シンプルな等価チェック(`year == 2015`)ですが、より複雑にすることもできます。

実行する文が複数ある場合、コードブロックを波括弧で囲む必要があります。:
=======
In the example above, the condition is a simple equality check (`year == 2015`), but it can be much more complex.

If we want to execute more than one statement, we have to wrap our code block inside curly braces:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
if (year == 2015) {
  alert( "That's correct!" );
  alert( "You're so smart!" );
}
```

<<<<<<< HEAD
たとえ1つの文しかない場合でも `if` を使用するときは波括弧 `{}` でコードブロックを囲むことを推奨します。これは可読性を向上させます。
=======
We recommend wrapping your code block with curly braces `{}` every time you use an `if` statement, even if there is only one statement to execute. Doing so improves readability.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## Boolean 変換 

<<<<<<< HEAD
`if (…)` 文は括弧の中の式を評価し、Boolean型に変換します。
=======
The `if (…)` statement evaluates the expression in its parentheses and converts the result to a boolean.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

チャプター <info:type-conversions> の変換ルールを思い出してみましょう:

<<<<<<< HEAD
- 数値 `0`, 空文字 `""`, `null`, `undefined` そして `NaN` は `false` になります。そのため、これらは "偽とみなされる" 値とよばれています。
- 他の値は `true` になるため、"真とみなされる" 値と呼ばれます。
=======
- A number `0`, an empty string `""`, `null`, `undefined`, and `NaN` all become `false`. Because of that they are called "falsy" values.
- Other values become `true`, so they are called "truthy".
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

さて、下のコードですがこの条件は決して実行されません:

```js
if (0) { // 0 は偽
  ...
}
```

<<<<<<< HEAD
また、この条件は -- 常に処理されます:
=======
...and inside this condition -- it always will:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
if (1) { // 1 は真
  ...
}
```

<<<<<<< HEAD
次のように事前評価されたBool値を `if` に通すこともできます:
=======
We can also pass a pre-evaluated boolean value to `if`, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let cond = (year == 2015); // == は true または false を評価する

if (cond) {
  ...
}
```

## "else" 句 

<<<<<<< HEAD
`if` 文は任意の "else" ブロックを持つ場合があり、それは条件が偽の場合に実行されます。
=======
The `if` statement may contain an optional `else` block. It executes when the condition is falsy.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:
```js run
let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year == 2015) {
  alert( 'You guessed it right!' );
} else {
  alert( 'How can you be so wrong?' ); // 2015 以外のケース
}
```

## いくつかの条件: "else if" 

<<<<<<< HEAD
いくつかの条件のパターンをテストしたい時があります。そのために `else if` 句があります。
=======
Sometimes, we'd like to test several variants of a condition. The `else if` clause lets us do that.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:

```js run
let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year < 2015) {
  alert( 'Too early...' );
} else if (year > 2015) {
  alert( 'Too late' );
} else {
  alert( 'Exactly!' );
}
```

<<<<<<< HEAD
上のコードで、JavaScriptは最初に `year < 2015` をチェックします。それが偽の場合、次の条件 `year > 2015` の判定を行います。それもまた偽の場合、最後の `alert` を表示します。

複数の `else if` ブロックを持つことができます。最後の `else` は任意です。

## 3項演算子 '?' 

条件に依存して変数へ代入を行う必要がある場合があります。
=======
In the code above, JavaScript first checks `year < 2015`. If that is falsy, it goes to the next condition `year > 2015`. If that is also falsy, it shows the last `alert`.

There can be more `else if` blocks. The final `else` is optional.

## Conditional operator '?'

Sometimes, we need to assign a variable depending on a condition.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:

```js run no-beautify
let accessAllowed;
let age = prompt('How old are you?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

<<<<<<< HEAD
いわゆる、"条件付き" もしくは "疑問符" 演算子では、より短く簡単に行うことができます。

演算子は疑問符 `"?"` で表されます。演算子が3つのオペランドを持つことから、 "三項演算子" と呼ばれることもあります。これは、JavaScriptの中で3つのオペランドを持つ唯一の演算子です。
=======
The so-called "conditional" or "question mark" operator lets us do that in a shorter and simpler way.

The operator is represented by a question mark `?`. Sometimes it's called "ternary", because the operator has three operands. It is actually the one and only operator in JavaScript which has that many.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

構文は次の通りです:
```js
let result = condition ? value1 : value2;
```

<<<<<<< HEAD
`condition` は評価され、もしも真であれば、`value1` が返却され、そうでなければ -- `value2` になります。
=======
The `condition` is evaluated: if it's truthy then `value1` is returned, otherwise -- `value2`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:

```js
let accessAllowed = (age > 18) ? true : false;
```

<<<<<<< HEAD
技術的には、`age > 18` の周りの括弧を省くことができます。疑問符演算子は低い優先順位を持っているので、比較 `>` の後に実行されます。

以下の例は上の例と同じように動作します:
=======
Technically, we can omit the parentheses around `age > 18`. The question mark operator has a low precedence, so it executes after the comparison `>`.

This example will do the same thing as the previous one:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// 比較演算子 "age > 18" が最初に実行されます
// (丸括弧で囲む必要はありません)
let accessAllowed = age > 18 ? true : false;
```

<<<<<<< HEAD
しかし、括弧はコードの可読性をより良くします。そのため、括弧を使うことが推奨されます。

````smart
上の例では、比較自体が `true/false` を返すため、疑問符演算子を回避することが可能です。
=======
But parentheses make the code more readable, so we recommend using them.

````smart
In the example above, you can avoid using the question mark operator because the comparison itself returns `true/false`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// the same
let accessAllowed = age > 18;
```
````

## 複数の '?' 

<<<<<<< HEAD
連続する疑問符 `"?"` 演算子は1つ以上の条件に依存した値を返すことができます。
=======
A sequence of question mark operators `?` can return a value that depends on more than one condition.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:
```js run
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```

<<<<<<< HEAD
最初、それが何をしているのか掴むのが難しいかもしれません。しかしよく見るとそれがただの通常の一連のテストであることがわかります。

1. 最初の疑問符は `age < 3` かどうかチェックします。
2. 真の場合 -- `'Hi, baby!'` を返します。そうでなければ -- コロン `":"` の後に行き、`age < 18` をチェックします。
3. それが真であれば -- `'Hello!'` を返します。そうでなければ -- コロン `":"` の後に行き、`age < 100` をチェックします。
4. それが真であれば -- `'Greetings!'` を返します。そうでなければ -- コロン `":"` の後に行き、`What an unusual age` を返します。

`if..else` を使った同じロジックです:
=======
It may be difficult at first to grasp what's going on. But after a closer look, we can see that it's just an ordinary sequence of tests:

1. The first question mark checks whether `age < 3`.
2. If true -- it returns `'Hi, baby!'`. Otherwise, it continues to the expression after the colon ":", checking `age < 18`.
3. If that's true -- it returns `'Hello!'`. Otherwise, it continues to the expression after the next colon ":", checking `age < 100`.
4. If that's true -- it returns `'Greetings!'`. Otherwise, it continues to the expression after the last colon ":", returning `'What an unusual age!'`.

Here's how this looks using `if..else`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
if (age < 3) {
  message = 'Hi, baby!';
} else if (age < 18) {
  message = 'Hello!';
} else if (age < 100) {
  message = 'Greetings!';
} else {
  message = 'What an unusual age!';
}
```

## 非伝統的な '?' の使用 

<<<<<<< HEAD
時々、疑問符 `'?'` は `if` の置換として使われます:
=======
Sometimes the question mark `?` is used as a replacement for `if`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Right!') : alert('Wrong.');
*/!*
```

<<<<<<< HEAD
条件 `company == 'Netscape'` に応じて、`"?"` の後の1つ目もしくは2つ目の部分が実行されアラートが表示されます。

ここでは変数に結果を代入していません。このアイデアは条件に応じて異なるコードを実行させるものです。

**このような方法で疑問符演算子を使うことは推奨されていません。**

表記は `if` よりも短いように見え、一部のプログラマには魅力的です。しかしそれは読みにくいです。

比較として `if` を使った同じコードです:
=======
Depending on the condition `company == 'Netscape'`, either the first or the second expression after the `?` gets executed and shows an alert.

We don't assign a result to a variable here. Instead, we execute different code depending on the condition.

**It's not recommended to use the question mark operator in this way.**

The notation is shorter than the equivalent `if` statement, which appeals to some programmers. But it is less readable.

Here is the same code using `if` for comparison:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Right!');
} else {
  alert('Wrong.');
}
*/!*
```

<<<<<<< HEAD
私たちの目はコードを縦に見ていきます。複数行にまたがる構造は、長い水平な命令セットよりも理解しやすいです。

疑問符 `'?'` の目的は、条件によって別の値を返すことです。まさにそのために使ってください。異なるコードの枝葉を実行するために `if` があります。
=======
Our eyes scan the code vertically. Code blocks which span several lines are easier to understand than a long, horizontal instruction set.

The purpose of the question mark operator `?` is to return one value or another depending on its condition. Please use it for exactly that. Use `if` when you need to execute different branches of code.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
