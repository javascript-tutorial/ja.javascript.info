
<<<<<<< HEAD

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f
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
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
