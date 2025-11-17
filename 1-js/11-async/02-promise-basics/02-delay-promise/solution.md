```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));
```

<<<<<<< HEAD
このタスクでは、`resolve` が引数無しで呼び出されることに注意してください。`delay` からは何の値も返しません、ただ遅延を保証します。
=======
Please note that in this task `resolve` is called without arguments. We don't return any value from `delay`, just ensure the delay.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
