
<<<<<<< HEAD

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
