
<<<<<<< HEAD

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834
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
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
