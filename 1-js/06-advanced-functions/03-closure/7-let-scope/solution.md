<<<<<<< HEAD
結果は: **エラー** です。

実行してみましょう:
=======
The result is: **error**.

Try running it:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let x = 1;

function func() {
*!*
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
*/!*
  let x = 2;
}

func();
```

<<<<<<< HEAD
この例では、"存在しない" 変数と "初期化されていない" 変数の変わった違いを見ることができます。

記事 [](info:closure) でご覧になったかもしれませんが、変数は実行がコードブロック(または関数)に入った時点から、"初期化されていない" 状態 で始まります。そして対応する `let` 文まで初期化されません。

つまり、変数は技術的には存在しますが、`let` 以前では利用できません。

上のコードを説明します。
=======
In this example we can observe the peculiar difference between a "non-existing" and "uninitialized" variable.

As you may have read in the article [](info:closure), a variable starts in the "uninitialized" state from the moment when the execution enters a code block (or a function). And it stays uninitalized until the corresponding `let` statement.

In other words, a variable technically exists, but can't be used before `let`.

The code above demonstrates it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
function func() {
*!*
<<<<<<< HEAD
  // エンジンは関数の最初の時点でローカル変数 x を知っています。
  // が、let までは "初期化されていません" (利用できません)
  // なのでエラーです
*/!*

  console.log(x); // ReferenceError: Cannot access 'vx before initialization
=======
  // the local variable x is known to the engine from the beginning of the function,
  // but "uninitialized" (unusable) until let ("dead zone")
  // hence the error
*/!*

  console.log(x); // ReferenceError: Cannot access 'x' before initialization
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

  let x = 2;
}
```

<<<<<<< HEAD
変数が一時的に利用できないゾーン(コードブロックの先頭から `let` まで)は "デッドゾーン" と呼ばれることがあります。
=======
This zone of temporary unusability of a variable (from the beginning of the code block till `let`) is sometimes called the "dead zone".
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
