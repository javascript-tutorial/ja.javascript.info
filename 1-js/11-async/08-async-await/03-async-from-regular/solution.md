
<<<<<<< HEAD

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
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
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
