# ループ: while と for

<<<<<<< HEAD
私たちはしばしば連続して何度も似たような処理を実行する必要があります。

例えば、1つずつリストから商品を出力する必要がある場合、または単に1から10の数値それぞれに同じコードを実行する場合などです。

*ループ* は複数回コードの同じ部分を繰り返す方法です。

[cut]
=======
We often need to repeat actions.

For example, outputting goods from a list one after another or just running the same code for each number from 1 to 10.

*Loops* are a way to repeat the same code multiple times.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

## "while" ループ 

`while` ループは次の構文を持っています:

```js
while (condition) {
  // code
  // いわゆる "ループ本体"
}
```

<<<<<<< HEAD
`condition` が `true` の間、ループの本体の `code` が実行されます。
=======
While the `condition` is truthy, the `code` from the loop body is executed.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

例えば、下のループは `i < 3` の間、`i` を出力します:

```js run
let i = 0;
while (i < 3) { // 0, 次に 1, 次に 2 を表示
  alert( i );
  i++;
}
```

ループ本体の1回の実行は *イテレーション* と呼ばれます。上の例のループは3回イテレーションします。

<<<<<<< HEAD
もしも、上の例に `i++` がない場合、ループは (理論上は) 永遠に繰り返されます。実際には、ブラウザはこのようなループを止める方法を提供しており、サーバサイドJavaScriptではそのプロセスを殺すことができます。

任意の式または変数は、単に比較ではなくループ条件になります。それらは評価され `while` によって真偽値に変換されます。

たとえば、`while (i != 0)` をより短く書く方法として`while (i)`があります:
=======
If `i++` was missing from the example above, the loop would repeat (in theory) forever. In practice, the browser provides ways to stop such loops, and in server-side JavaScript, we can kill the process.

Any expression or variable can be a loop condition, not just comparisons: the condition is evaluated and converted to a boolean by `while`.

For instance, a shorter way to write `while (i != 0)` is `while (i)`:
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

```js run
let i = 3;
*!*
while (i) { // i が 0 になったとき、条件が偽になり、ループが止まります
*/!*
  alert( i );
  i--;
}
```

<<<<<<< HEAD
````smart header="本体が1行の場合、括弧は必須ではありません"
ループの本体が1つの文である場合、括弧`{…}`を省略することができます:
=======
````smart header="Curly braces are not required for a single-line body"
If the loop body has a single statement, we can omit the curly braces `{…}`:
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## "do..while" ループ 

条件チェックは `do..while` 構文を使うことでループ本体の *下に* 移動させることができます。:

```js
do {
  // loop body
} while (condition);
```

<<<<<<< HEAD
ループは最初に本体を実行します、次に条件をチェックし、真となる間実行を繰り返します。
=======
The loop will first execute the body, then check the condition, and, while it's truthy, execute it again and again.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

例:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

<<<<<<< HEAD
この構文の形式は、条件が真になるかどうかに関わらず、**少なくとも1度** はループ本体を実行したい場合を除き、ほとんど使われません。通常は他の形式が好まれます: `while(…) {…}`
=======
This form of syntax should only be used when you want the body of the loop to execute **at least once** regardless of the condition being truthy. Usually, the other form is preferred: `while(…) {…}`.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

## "for" ループ 

<<<<<<< HEAD
`for` ループは最も使われるものの1つです。
=======
The `for` loop is more complex, but it's also the most commonly used loop.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

このようになります:

```js
for (begin; condition; step) {
  // ... loop body ...
}
```

例でこれらのパーツの意味を学びましょう。下のループは `0` から `3` まで(`3` は含みません)、`i` に対して `alert(i)` を実行します。:

```js run
for (let i = 0; i < 3; i++) { // 0, 次に 1, 次に 2 を表示
  alert(i);
}
```

<<<<<<< HEAD
`for` 文を部分的に調べてみましょう:
=======
Let's examine the `for` statement part-by-part:
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

| パート  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
<<<<<<< HEAD
| begin | `i = 0`    | ループに入ると1度実行されます。     |
| condition | `i < 3`| すべてのループのイテレーションの前にチェックされます、もしも false の場合ループを停止します。       |
| step| `i++`      | 各イテレーションで、条件チェックの前に本体の後に実行されます。 |
| body | `alert(i)`| 条件が真の間繰り返し実行されます。         |

一般的なループアルゴリズムは次のように動作します:
=======
| begin | `i = 0`    | Executes once upon entering the loop.                                      |
| condition | `i < 3`| Checked before every loop iteration. If false, the loop stops.              |
| step| `i++`      | Executes after the body on each iteration but before the condition check. |
| body | `alert(i)`| Runs again and again while the condition is truthy.                         |

The general loop algorithm works like this:

>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
```
begin を実行
→ (if condition → body を実行し step を実行)
→ (if condition → body を実行し step を実行)
→ (if condition → body を実行し step を実行)
→ ...
```

<<<<<<< HEAD
もし初めてループを使う場合は、上の例に戻って、紙の上でステップ毎にどのように動作するかを再現してみると理解しやすいでしょう。

これが今のケースで正確に起こっていることです:
=======
That is, `begin` executes once, and then it iterates: after each `condition` test, `body` and `step` are executed.

If you are new to loops, it could help to go back to the example and reproduce how it runs step-by-step on a piece of paper.

Here's exactly what happens in our case:
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

```js
// for (let i = 0; i < 3; i++) alert(i)

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

<<<<<<< HEAD
````smart header="インライン変数宣言"
ここで "カウンタ" 変数 `i` はループの中で正しく宣言されます。それは "インライン" 変数宣言と呼ばれます。
このような変数はループの中でだけ見えます。
=======
````smart header="Inline variable declaration"
Here, the "counter" variable `i` is declared right in the loop. This is called an "inline" variable declaration. Such variables are visible only inside the loop.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // エラー, そのような変数はありません
```

<<<<<<< HEAD
変数を宣言する代わりに、存在するもの使うことも出来ます:
=======
Instead of defining a variable, we could use an existing one:
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

```js run
let i = 0;

for (i = 0; i < 3; i++) { // 既存の変数を使用
  alert(i); // 0, 1, 2
}

alert(i); // 3, ループの外で宣言されているので見える
```

````


### 一部分の省略

`for` の任意の一部分を省略することができます。
例えば、ループの最初で何もする必要がなければ、`begin` を省略することができます。

このように:

```js run
let i = 0; // すでに i を宣言し代入済み

for (; i < 3; i++) { // "begin" 不要
  alert( i ); // 0, 1, 2
}
```

同じように `step` パートも除去することができます。:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

<<<<<<< HEAD
ループは `while (i < 3)` と同じになりました。

実際にはすべてを除くこともできます。それは無限ループになります:
=======
This makes the loop identical to `while (i < 3)`.

We can actually remove everything, creating an infinite loop:
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

```js
for (;;) {
  // 制限なしで繰り返し
}
```

<<<<<<< HEAD
`for` の2つのセミコロン `;` は必須であることに注意してください。ない場合は構文エラーになります。
=======
Please note that the two `for` semicolons `;` must be present. Otherwise, there would be a syntax error.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

## ループの終わり 

<<<<<<< HEAD
通常、ループは条件が偽になると終了します。

しかし、いつでもループから出ることを強制することができます。そのための特別な `break` ディレクティブがあります。

例えば、以下のループはユーザに一連の数字を入力するよう求めますが、文字以外が入力されたとき "中断" します。:
=======
Normally, a loop exits when its condition becomes falsy.

But we can force the exit at any time using the special `break` directive.

For example, the loop below asks the user for a series of numbers, "breaking" when no number is entered:
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

```js
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
もしもユーザが空を入力、もしくは入力をキャンセルした場合、`break` ディレクティブは行 `(*)` で有効になります。
それはループをすぐに停止し、ループ後の最初の行へ制御を渡します。つまり、`alert` です。

"必要に応じた無限ループ + `break`" の組み合わせは、ループの最初/最後ではなく、その間や本体の様々な場所で条件をチェックする必要がある状況で最適です。
=======
The `break` directive is activated at the line `(*)` if the user enters an empty line or cancels the input. It stops the loop immediately, passing control to the first line after the loop. Namely, `alert`.

The combination "infinite loop + `break` as needed" is great for situations when a loop's condition must be checked not in the beginning or end of the loop, but in the middle or even in several places of its body.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

## 次のイテレーションに進む 

<<<<<<< HEAD
`continue` ディレクティブは `break` の "軽量版" です。ループ全体はストップしません。その代わりに、現在のイテレーションを停止し、新しいイテレーションのスタートを強制します(もしも条件が真であれば)。

現在のイテレーションが完了し、次へ移動したいときに使います。
=======
The `continue` directive is a "lighter version" of `break`. It doesn't stop the whole loop. Instead, it stops the current iteration and forces the loop to start a new one (if the condition allows).

We can use it if we're done with the current iteration and would like to move on to the next one.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

以下のループは奇数値だけを出力するために `continue` を使用しています:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // true の場合、本体の残りのパートをスキップ
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, 次に 3, 5, 7, 9
}
```

<<<<<<< HEAD
`i` の値が偶数の場合、`continue` ディレクティブは本体の実行を停止し、`for` の次のイテレーションへ制御を渡します(次の番号で)。
したがって、`alert` は奇数値に対してのみ実行されます。

````smart header="ディレクティブ `continue` を使うと入れ子のレベルを減らせます"
奇数値を表示するループはこのように書くこともできます:
=======
For even values of `i`, the `continue` directive stops executing the body and passes control to the next iteration of `for` (with the next number). So the `alert` is only called for odd values.

````smart header="The `continue` directive helps decrease nesting"
A loop that shows odd values could look like this:
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

```js
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

<<<<<<< HEAD
技術的な観点からは、これは上の例と同じです。確かに、`continue` の代わりに `if` ブロックでコードをラップするだけです。

しかし、副作用として括弧のネストが1段深くなります。もしも `if` の中のコードが長い場合、全体の可読性が下がる可能性があります。
````

````warn header="`?` の右側には `break/continue` を入れないでください"
式ではない構文構造は、 `'?'` の中では使うことはできないことに注意してください。特に、ディレクティブ `break/continue` はそこでは許可されません。
=======
From a technical point of view, this is identical to the example above. Surely, we can just wrap the code in an `if` block instead of using `continue`.

But as a side-effect, this created one more level of nesting (the `alert` call inside the curly braces). If the code inside of`if` is longer than a few lines, that may decrease the overall readability.
````

````warn header="No `break/continue` to the right side of '?'"
Please note that syntax constructs that are not expressions cannot be used with the ternary operator `?`. In particular, directives such as `break/continue` aren't allowed there.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

例えば、このコードを考えます

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

...それは動作を停止します。このようなコードは構文エラーになります:


これは `if` の代わりに疑問符演算子 `'?'` を使用しない別の理由です。
=======
...and rewrite it using a question mark:


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue isn't allowed here
```

...it stops working: there's a syntax error.

This is just another reason not to use the question mark operator `?` instead of `if`.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
````

## break/continue のためのラベル 

時々、複数のネストしたループから一度で抜け出す必要があることがあります。

<<<<<<< HEAD
例えば、下のコードでは 座標 `(i, j)` を `(0,0)` から `(3,3)` へプロンプトするよう `i` と `j` をループします:
=======
For example, in the code below we loop over `i` and `j`, prompting for the coordinates `(i, j)` from `(0,0)` to `(3,3)`:
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

<<<<<<< HEAD
    // 仮にここで終了して下にある Done をしたい場合にはどうすればよいでしょう？

=======
    // what if we want to exit from here to Done (below)?
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
  }
}

alert('Done!');
```

ユーザが入力をキャンセルした場合、処理をストップする方法が必要です。

<<<<<<< HEAD
`input` の後の通常の `break` は内部ループのみの終了です。それだけでは十分ではありません。
ここでラベルが助けにきます。
=======
The ordinary `break` after `input` would only break the inner loop. That's not sufficient--labels, come to the rescue!
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

*ラベル* は、ループの前のコロンがついた識別子です:
```js
labelName: for (...) {
  ...
}
```

<<<<<<< HEAD
ループの中の `break <labelName>` 文はラベルまで終了にします。

次のようになります:
=======
The `break <labelName>` statement in the loop below breaks out to the label:
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // 文字から文字またはキャンセルされた場合、両方のループから抜ける
    if (!input) *!*break outer*/!*; // (*)

    // 値に何かをする処理...
  }
}
alert('Done!');
```

<<<<<<< HEAD
上のコードで、`break outer` は `outer` と名付けされたラベルを上に探し、そのループを抜けます。
=======
In the code above, `break outer` looks upwards for the label named `outer` and breaks out of that loop.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

そのため、制御は `(*)` から `alert('Done!')` にまっすぐに進みます。

ラベルを別の行に移動させることもできます:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

<<<<<<< HEAD
`continue` ディレクティブもラベルと一緒に使うことができます。このケースでは、実行はラベル付けされたループの次のイテレーションにジャンプします。

````warn header="ラベルは \"goto\" ではありません"
ラベルはコードの任意の場所にジャンプすることはできません。
=======
The `continue` directive can also be used with a label. In this case, code execution jumps to the next iteration of the labeled loop.

````warn header="Labels do not allow to \"jump\" anywhere"
Labels do not allow us to jump into an arbitrary place in the code.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

例えば、このようにすることは出来ません:
```js
<<<<<<< HEAD
break label;  // label にジャンプ? いいえ。
=======
break label; // doesn't jumps to the label below
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

label: for (...)
```

<<<<<<< HEAD
`break/continue` の呼び出しはループの中からだけ可能です。またラベルはそのディレクティブから上のどこかにある必要があります。
=======
A call to `break/continue` is only possible from inside a loop and the label must be somewhere above the directive.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
````

## サマリ 

3つのループの種類について説明しました:

- `while` -- 条件は各イテレーションの前にチェックされます。
- `do..while` -- 条件は各イテレーションの後にチェックされます。
- `for (;;)` -- 条件は各イテレーションの前にチェックされ、追加の設定ができます。

"無限" ループを作るために、通常は `while(true)` 構造が使われます。このようなループは他の他のループと同様に `break` ディレクティブで停止することができます。

<<<<<<< HEAD
もしも現在のイテレーションで何もしたくなく、次のイテレーションに進みたい場合は、`continue` ディレクティブを使います。

`break/continue` はループの前のラベルをサポートします。ラベルは、ネストを抜けて外のループに行くための、 `break/continue` のための方法です。
=======
If we don't want to do anything in the current iteration and would like to forward to the next one, we can use the `continue` directive.

`break/continue` support labels before the loop. A label is the only way for `break/continue` to escape a nested loop to go to an outer one.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
