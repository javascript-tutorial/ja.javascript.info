結果は: **エラー** です。

実行してみましょう:

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

この例では、"存在しない" 変数と "初期化されていない" 変数の変わった違いを見ることができます。

記事 [](info:closure) でご覧になったかもしれませんが、変数は実行がコードブロック(または関数)に入った時点から、"初期化されていない" 状態 で始まります。そして対応する `let` 文まで初期化されません。

つまり、変数は技術的には存在しますが、`let` 以前では利用できません。

上のコードを説明します。

```js
function func() {
*!*
  // エンジンは関数の最初の時点でローカル変数 x を知っています。
  // が、let までは "初期化されていません" (利用できません)
  // なのでエラーです
*/!*

  console.log(x); // ReferenceError: Cannot access 'vx before initialization

  let x = 2;
}
```

変数が一時的に利用できないゾーン(コードブロックの先頭から `let` まで)は "デッドゾーン" と呼ばれることがあります。
