<<<<<<< HEAD
解答: **いいえ、実行されません**:
=======
The answer is: **no, it won't**:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

<<<<<<< HEAD
チャプターの中で言った通り、関数コードの周りには "暗黙の `try..catch`" があります。そのため、すべての同期エラーは処理されます。

しかし、ここではエラーは executor が実行中でなく、その後に生成されます。したがって、promise はそれを処理できません。
=======
As said in the chapter, there's an "implicit `try..catch`" around the function code. So all synchronous errors are handled.

But here the error is generated not while the executor is running, but later. So the promise can't handle it. 
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
