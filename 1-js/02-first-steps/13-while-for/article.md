<<<<<<< HEAD
# ループ: while と for

繰り返し処理は頻繁に必要になります。

例えば、1つずつリストから商品を出力するような場合や、単に1から10の数値それぞれに同じコードを実行する場合などです。

*ループ* は複数回同じコードを繰り返す手段です。

```smart header="for..of と for..in ループ"
上級者向けのちょっとしたお知らせです。

この記事は基本的なループ: `while`, `do..while` と `for(..;..;..)` のみの説明をしています。

他の種類のループを検索してこの記事にたどり着いたのであれば、以下を参照してください。

- オブジェクトプロパティのループは [for..in](info:object#forin) です。
- 配列や反復可能オブジェクトに対するループは [for..of](info:array#loops) と [iterables](info:iterable) です。

それ以外の場合は、続けて呼んでみてください。
```

## "while" ループ 

`while` ループは次の構文になります:
=======
# Loops: while and for

We often need to repeat actions.

For example, outputting goods from a list one after another or just running the same code for each number from 1 to 10.

*Loops* are a way to repeat the same code multiple times.

```smart header="The for..of and for..in loops"
A small announcement for advanced readers.

This article covers only basic loops: `while`, `do..while` and `for(..;..;..)`.

If you came to this article searching for other types of loops, here are the pointers:

- See [for..in](info:object#forin) to loop over object properties.
- See [for..of](info:array#loops) and [iterables](info:iterable) for looping over arrays and iterable objects.

Otherwise, please read on.
```

## The "while" loop

The `while` loop has the following syntax:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
while (condition) {
  // code
<<<<<<< HEAD
  // いわゆる "ループ本体" です
}
```

`condition` が `true` の間、ループの本体の `code` が実行されます。

例えば、以下のループは `i < 3` の間、`i` を出力します:

```js run
let i = 0;
while (i < 3) { // 0, 次に 1, 次に 2 を表示
=======
  // so-called "loop body"
}
```

While the `condition` is truthy, the `code` from the loop body is executed.

For instance, the loop below outputs `i` while `i < 3`:

```js run
let i = 0;
while (i < 3) { // shows 0, then 1, then 2
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  alert( i );
  i++;
}
```

<<<<<<< HEAD
ループ本体の1回の実行は *イテレーション* と呼ばれます。上の例のループは3回イテレーションします。

もしも上の例に `i++` がない場合、ループは (理論上は) 永遠に繰り返されます。実際には、ブラウザはこのようなループを止める方法を提供しており、サーバサイドJavaScriptではそのプロセスを殺すことができます。

比較に限らず、どんな式や変数もループの条件にすることができます。条件は `while` によって評価され、真偽値に変換されます。

たとえば、`while (i != 0)` をより短く書く方法として`while (i)`があります:
=======
A single execution of the loop body is called *an iteration*. The loop in the example above makes three iterations.

If `i++` was missing from the example above, the loop would repeat (in theory) forever. In practice, the browser provides ways to stop such loops, and in server-side JavaScript, we can kill the process.

Any expression or variable can be a loop condition, not just comparisons: the condition is evaluated and converted to a boolean by `while`.

For instance, a shorter way to write `while (i != 0)` is `while (i)`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let i = 3;
*!*
<<<<<<< HEAD
while (i) { // i が 0 になったとき、条件が偽になり、ループが止まります
=======
while (i) { // when i becomes 0, the condition becomes falsy, and the loop stops
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
  alert( i );
  i--;
}
```

<<<<<<< HEAD
````smart header="本体が1行の場合、括弧は必須ではありません"
ループの本体が単一の文である場合、括弧`{…}`を省略することができます:
=======
````smart header="Curly braces are not required for a single-line body"
If the loop body has a single statement, we can omit the curly braces `{…}`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

<<<<<<< HEAD
## "do..while" ループ 

`do..while` 構文を使うことで、条件チェックをループ本体の *下に* 移動させることができます。:
=======
## The "do..while" loop

The condition check can be moved *below* the loop body using the `do..while` syntax:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
do {
  // loop body
} while (condition);
```

<<<<<<< HEAD
ループは最初に本体を実行した後、条件をチェックし、条件が真である間、本体の実行を繰り返します。

例:
=======
The loop will first execute the body, then check the condition, and, while it's truthy, execute it again and again.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

<<<<<<< HEAD
この構文の形式は、条件が真になるかどうかに関わらず、**少なくとも1度** はループ本体を実行したい場合にのみ使用されるべきです。通常は他の形式が好まれます: `while(…) {…}`

## "for" ループ 

`for` ループは最も使われるものの1つです。

このようになります:
=======
This form of syntax should only be used when you want the body of the loop to execute **at least once** regardless of the condition being truthy. Usually, the other form is preferred: `while(…) {…}`.

## The "for" loop

The `for` loop is more complex, but it's also the most commonly used loop.

It looks like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
for (begin; condition; step) {
  // ... loop body ...
}
```

<<<<<<< HEAD
例でこれらのパーツの意味を学びましょう。下のループは `i` が `0` から `3` になるまで(`3` は含みません)、 `alert(i)` を実行します。:

```js run
for (let i = 0; i < 3; i++) { // 0, 次に 1, 次に 2 を表示
=======
Let's learn the meaning of these parts by example. The loop below runs `alert(i)` for `i` from `0` up to (but not including) `3`:

```js run
for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  alert(i);
}
```

<<<<<<< HEAD
`for` 文を部分的に調べてみましょう:

| パート  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| begin | `i = 0`    | ループに入ると1度実行されます。     |
| condition | `i < 3`| すべてのループのイテレーションの前にチェックされます。条件が偽の場合、ループを停止します。       |
| step| `i++`      | 各イテレーションで、条件チェックの前に本体の後に実行されます。 |
| body | `alert(i)`| 条件が真の間繰り返し実行されます。         |

一般的なループアルゴリズムは次のように動作します:

```
begin を実行
→ (if condition → body を実行し step を実行)
→ (if condition → body を実行し step を実行)
→ (if condition → body を実行し step を実行)
→ ...
```

つまり、`begin` を1度実行し、その後、各 `condition` の評価の後、`body` と `step` が実行されるという繰り返しになります。

もしループに慣れていない場合は、上の例に戻って、紙の上でステップ毎にどのように動作するかを再現してみると理解しやすいでしょう。

これが今のケースで正確に起こっていることです:
=======
Let's examine the `for` statement part-by-part:

| part  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| begin | `let i = 0`    | Executes once upon entering the loop.                                      |
| condition | `i < 3`| Checked before every loop iteration. If false, the loop stops.              |
| body | `alert(i)`| Runs again and again while the condition is truthy.                         |
| step| `i++`      | Executes after the body on each iteration. |

The general loop algorithm works like this:

```
Run begin
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ ...
```

That is, `begin` executes once, and then it iterates: after each `condition` test, `body` and `step` are executed.

If you are new to loops, it could help to go back to the example and reproduce how it runs step-by-step on a piece of paper.

Here's exactly what happens in our case:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// for (let i = 0; i < 3; i++) alert(i)

<<<<<<< HEAD
// begin を実行
let i = 0
// if condition → body を実行し step を実行
if (i < 3) { alert(i); i++ }
// if condition → body を実行し step を実行
if (i < 3) { alert(i); i++ }
// if condition → body を実行し step を実行
if (i < 3) { alert(i); i++ }
// ...終わり, 今 i == 3 なので
```

````smart header="インライン変数宣言"
ここで "カウンタ" 変数 `i` はループの中で正しく宣言されます。それは "インライン" 変数宣言と呼ばれます。このような変数はループの中でだけ見えます。
=======
// run begin
let i = 0
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// ...finish, because now i == 3
```

````smart header="Inline variable declaration"
Here, the "counter" variable `i` is declared right in the loop. This is called an "inline" variable declaration. Such variables are visible only inside the loop.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
<<<<<<< HEAD
alert(i); // エラー, そのような変数はありません
```

変数を宣言する代わりに、既存のものを使うこともできます:
=======
alert(i); // error, no such variable
```

Instead of defining a variable, we could use an existing one:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let i = 0;

<<<<<<< HEAD
for (i = 0; i < 3; i++) { // 既存の変数を使用
  alert(i); // 0, 1, 2
}

alert(i); // 3, ループの外で宣言されているので見える
```
````

### 一部分の省略

`for` の一部分は省略することができます。

例えば、ループの最初で何もする必要がなければ、`begin` を省略できます。

このようになります:

```js run
let i = 0; // すでに i を宣言し代入済み

for (; i < 3; i++) { // "begin" 不要
=======
for (i = 0; i < 3; i++) { // use an existing variable
  alert(i); // 0, 1, 2
}

alert(i); // 3, visible, because declared outside of the loop
```
````

### Skipping parts

Any part of `for` can be skipped.

For example, we can omit `begin` if we don't need to do anything at the loop start.

Like here:

```js run
let i = 0; // we have i already declared and assigned

for (; i < 3; i++) { // no need for "begin"
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  alert( i ); // 0, 1, 2
}
```

<<<<<<< HEAD
同じように `step` パートも除去することができます。:
=======
We can also remove the `step` part:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

<<<<<<< HEAD
ループは `while (i < 3)` と同じになりました。

実際にはすべてを除くこともできます。それは無限ループになります:

```js
for (;;) {
  // 制限なしで繰り返し
}
```

`for` の2つのセミコロン `;` は必須であることに注意してください。ない場合は構文エラーになります。

## ループの終わり 

通常、ループは条件が偽になると終了します。

ですが、`break` ディレクティブを利用して、いつでも強制的にループを終わらせることができます。

例えば、以下のループはユーザに一連の数字を入力するよう求めますが、数字が入力されなかった場合は "中断" します。:

```js
=======
This makes the loop identical to `while (i < 3)`.

We can actually remove everything, creating an infinite loop:

```js
for (;;) {
  // repeats without limits
}
```

Please note that the two `for` semicolons `;` must be present. Otherwise, there would be a syntax error.

## Breaking the loop

Normally, a loop exits when its condition becomes falsy.

But we can force the exit at any time using the special `break` directive.

For example, the loop below asks the user for a series of numbers, "breaking" when no number is entered:

```js run
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let sum = 0;

while (true) {

  let value = +prompt("Enter a number", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sum: ' + sum );
```

<<<<<<< HEAD
もしもユーザが空を入力、もしくは入力をキャンセルした場合、`break` ディレクティブは行 `(*)` で有効になります。それはループをすぐに停止し、ループ後の最初の行へ制御を渡します。つまり、`alert` です。

"無限ループ + 必要に応じた `break`" の組み合わせは、ループの最初や最後ではなく、途中や本体の様々な場所で条件をチェックする必要がある状況で最適です。

## 次のイテレーションに進む 

`continue` ディレクティブは `break` の "軽量版" です。ループ全体はストップしません。その代わりに、現在のイテレーションを停止し、新しいイテレーションのスタートを強制します(条件が真であれば)。

現在のイテレーションが完了し、次へ移動したいときに使います。

以下のループは、奇数値のみを出力するよう `continue` を使用しています:
=======
The `break` directive is activated at the line `(*)` if the user enters an empty line or cancels the input. It stops the loop immediately, passing control to the first line after the loop. Namely, `alert`.

The combination "infinite loop + `break` as needed" is great for situations when a loop's condition must be checked not in the beginning or end of the loop, but in the middle or even in several places of its body.

## Continue to the next iteration [#continue]

The `continue` directive is a "lighter version" of `break`. It doesn't stop the whole loop. Instead, it stops the current iteration and forces the loop to start a new one (if the condition allows).

We can use it if we're done with the current iteration and would like to move on to the next one.

The loop below uses `continue` to output only odd values:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run no-beautify
for (let i = 0; i < 10; i++) {

<<<<<<< HEAD
  // true の場合、本体の残りのパートをスキップ
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, 次に 3, 5, 7, 9
}
```

`i` の値が偶数の場合、`continue` ディレクティブは本体の実行を停止し、`for` の次のイテレーションへ制御を渡します(次の番号で)。したがって、`alert` は奇数値に対してのみ実行されます。

````smart header="ディレクティブ `continue` を使うと入れ子のレベルを減らせます"
奇数値を表示するループはこのように書くこともできます:

```js
=======
  // if true, skip the remaining part of the body
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, then 3, 5, 7, 9
}
```

For even values of `i`, the `continue` directive stops executing the body and passes control to the next iteration of `for` (with the next number). So the `alert` is only called for odd values.

````smart header="The `continue` directive helps decrease nesting"
A loop that shows odd values could look like this:

```js run
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

<<<<<<< HEAD
技術的な観点からは、これは上の例と同じです。確かに、`continue` の代わりに `if` ブロックでコードをラップするだけです。

しかし、副作用として括弧のネストが1段深くなります。`if` の中のコードが長い場合、全体の可読性が下がる可能性があります。
````

````warn header="`?` の右側には `break/continue` を入れないでください"
式ではない構文構造は、 三項演算子 `?` の中では使えないことに注意してください。特に、ディレクティブ `break/continue` はそこでは許可されません。

例えば、次のようなコードがあるとします:
=======
From a technical point of view, this is identical to the example above. Surely, we can just wrap the code in an `if` block instead of using `continue`.

But as a side effect, this created one more level of nesting (the `alert` call inside the curly braces). If the code inside of `if` is longer than a few lines, that may decrease the overall readability.
````

````warn header="No `break/continue` to the right side of '?'"
Please note that syntax constructs that are not expressions cannot be used with the ternary operator `?`. In particular, directives such as `break/continue` aren't allowed there.

For example, if we take this code:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

<<<<<<< HEAD
...これを、疑問符を使って書き直します:

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue はここでは使えません
```

...この場合は動作を停止します。コードは構文エラーになります:

これは `if` の代わりに疑問符演算子 `?` を使用しない別の理由です。
````

## break/continue のためのラベル 

一度に複数のネストしたループから抜け出すことが必要となる場合があります。

例えば、下のコードでは 座標 `(i, j)` を `(0,0)` から `(2,2)` へプロンプトするよう、`i` と `j` をループします:
=======
...and rewrite it using a question mark:

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue isn't allowed here
```

...it stops working: there's a syntax error.

This is just another reason not to use the question mark operator `?` instead of `if`.
````

## Labels for break/continue

Sometimes we need to break out from multiple nested loops at once.

For example, in the code below we loop over `i` and `j`, prompting for the coordinates `(i, j)` from `(0,0)` to `(2,2)`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

<<<<<<< HEAD
    // もしここで終了して下にある Done をしたい場合にはどうすればよいでしょう？
=======
    // what if we want to exit from here to Done (below)?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
}

alert('Done!');
```

<<<<<<< HEAD
ユーザが入力をキャンセルした場合、処理をストップする方法が必要です。

`input` の後の通常の `break` は内部ループのみの終了です。それだけでは十分ではありません。ここでラベルが救いの手を差し伸べてくれます。

*ラベル* は、ループの前のコロンがついた識別子です:
=======
We need a way to stop the process if the user cancels the input.

The ordinary `break` after `input` would only break the inner loop. That's not sufficient -- labels, come to the rescue!

A *label* is an identifier with a colon before a loop:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
labelName: for (...) {
  ...
}
```

<<<<<<< HEAD
ループの中の `break <labelName>` 文はラベルまで抜け出します:
=======
The `break <labelName>` statement in the loop below breaks out to the label:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

<<<<<<< HEAD
    // 文字から文字またはキャンセルされた場合、両方のループから抜ける
    if (!input) *!*break outer*/!*; // (*)

    // 値に何かをする処理...
=======
    // if an empty string or canceled, then break out of both loops
    if (!input) *!*break outer*/!*; // (*)

    // do something with the value...
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
}

alert('Done!');
```

<<<<<<< HEAD
上のコードで、`break outer` は `outer` と名付けされたラベルを上に探し、そのループを抜けます。

そのため、制御は `(*)` から `alert('Done!')` にまっすぐに進みます。

ラベルを別の行に移動させることもできます:
=======
In the code above, `break outer` looks upwards for the label named `outer` and breaks out of that loop.

So the control goes straight from `(*)` to `alert('Done!')`.

We can also move the label onto a separate line:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

<<<<<<< HEAD
`continue` ディレクティブもラベルと一緒に使うことができます。このケースでは、実行はラベル付けされたループの次のイテレーションにジャンプします。

````warn header="ラベルはどこにでも \"ジャンプ\" を許可するものではありません"
ラベルはコードの任意の場所にジャンプすることはできません。

例えば、このようにすることは出来ません:

```js
break label;  // 以下のラベルにジャンプはしません
=======
The `continue` directive can also be used with a label. In this case, code execution jumps to the next iteration of the labeled loop.

````warn header="Labels do not allow to \"jump\" anywhere"
Labels do not allow us to jump into an arbitrary place in the code.

For example, it is impossible to do this:

```js
break label; // jump to the label below (doesn't work)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

label: for (...)
```

<<<<<<< HEAD
`break` ディレクティブはコードブロックの中にある必要があります。技術的には任意のラベル付けされたコードブロックであれば機能します。
=======
A `break` directive must be inside a code block. Technically, any labelled code block will do, e.g.:

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
label: {
  // ...
  break label; // works
  // ...
}
```

<<<<<<< HEAD
...ですが、`break` が利用される 99.9% は上の例で見てきたように、ループの内側です。

`continue` はループの内側でのみ利用可能です。
````

## サマリ 

3種類のループについて説明しました:

- `while` -- 条件は各イテレーションの前にチェックされます。
- `do..while` -- 条件は各イテレーションの後にチェックされます。
- `for (;;)` -- 条件は各イテレーションの前にチェックされ、追加の設定ができます。

"無限" ループを作るには、通常は `while(true)` 構造が使われます。このようなループは他の他のループと同様に `break` ディレクティブで停止することができます。

もしも現在のイテレーションで何もしたくなく、次のイテレーションに進みたい場合は、`continue` ディレクティブを使います。

`break/continue` はループの前のラベルをサポートします。ラベルは、 `break/continue` でネストされたループを抜けて外側のループに行くための唯一の方法です。
=======
...Although, 99.9% of the time `break` is used inside loops, as we've seen in the examples above.

A `continue` is only possible from inside a loop.
````

## Summary

We covered 3 types of loops:

- `while` -- The condition is checked before each iteration.
- `do..while` -- The condition is checked after each iteration.
- `for (;;)` -- The condition is checked before each iteration, additional settings available.

To make an "infinite" loop, usually the `while(true)` construct is used. Such a loop, just like any other, can be stopped with the `break` directive.

If we don't want to do anything in the current iteration and would like to forward to the next one, we can use the `continue` directive.

`break/continue` support labels before the loop. A label is the only way for `break/continue` to escape a nested loop to go to an outer one.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
