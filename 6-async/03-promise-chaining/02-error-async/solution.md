解答: **いいえ、実行されません**:

```js run
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

チャプターの中で言った通り、関数コードの周りには "暗黙の `try..catch`" があります。そのため、すべての同期エラーは処理されます。

しかし、ここではエラーは executor が実行中でなく、その後に生成されます。したがって、promise はそれを処理できません。
