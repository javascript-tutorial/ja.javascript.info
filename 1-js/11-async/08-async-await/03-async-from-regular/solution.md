
<<<<<<< HEAD

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
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
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
