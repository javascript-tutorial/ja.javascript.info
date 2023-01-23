# setTimeout でのエラー

<<<<<<< HEAD:1-js/11-async/04-promise-error-handling/01-error-async/task.md
`.catch` はトリガされると思いますか？またその理由を説明できますか？
=======
What do you think? Will the `.catch` trigger? Explain your answer.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff:1-js/11-async/04-promise-error-handling/01-error-async/task.md

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
