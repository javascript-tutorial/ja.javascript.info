
<<<<<<< HEAD

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
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
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
