
<<<<<<< HEAD

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c
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
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
