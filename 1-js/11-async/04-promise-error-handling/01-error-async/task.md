# setTimeout でのエラー

<<<<<<< HEAD:1-js/11-async/04-promise-error-handling/01-error-async/task.md
`.catch` はトリガされると思いますか？またその理由を説明できますか？
=======
What do you think? Will the `.catch` trigger? Explain your answer.
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d:1-js/11-async/04-promise-error-handling/01-error-async/task.md

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
