

`async` 呼び出しを Promise として扱い、それに `.then` をつけるだけです。

```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // 1秒後に 10を表示
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
