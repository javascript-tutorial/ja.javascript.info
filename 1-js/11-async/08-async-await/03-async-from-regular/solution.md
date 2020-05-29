
<<<<<<< HEAD

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
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
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
