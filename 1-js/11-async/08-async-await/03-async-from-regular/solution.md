
<<<<<<< HEAD

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e
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
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
