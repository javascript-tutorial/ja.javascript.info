
<<<<<<< HEAD

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
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
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
