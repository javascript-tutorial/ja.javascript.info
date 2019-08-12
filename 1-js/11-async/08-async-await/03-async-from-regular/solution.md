
<<<<<<< HEAD

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
<<<<<<< HEAD
  // 1秒後に 10を表示
=======
  // shows 10 after 1 second
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
