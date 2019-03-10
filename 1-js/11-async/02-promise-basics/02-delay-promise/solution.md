```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));
```

このタスクでは、`resolve` が引数無しで呼び出されることに注意してください。`delay` からは何の値も返しません、ただ遅延を保証します。
