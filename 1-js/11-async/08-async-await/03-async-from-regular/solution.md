
<<<<<<< HEAD

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
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
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
