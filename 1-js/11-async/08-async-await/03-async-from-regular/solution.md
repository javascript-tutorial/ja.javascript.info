
<<<<<<< HEAD

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> 1ce5644a15ee141fbe78c0fb79c8f40d870d7043
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
>>>>>>> 1ce5644a15ee141fbe78c0fb79c8f40d870d7043
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
