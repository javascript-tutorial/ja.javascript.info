
<<<<<<< HEAD

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
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
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
