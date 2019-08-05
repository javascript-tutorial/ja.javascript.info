# setTimeout でのエラー

<<<<<<< HEAD:1-js/11-async/04-promise-error-handling/01-error-async/task.md
`.catch` はトリガされると思いますか？またその理由を説明できますか？
=======
What do you think? Will the `.catch` trigger? Explain your answer.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a:1-js/11-async/04-promise-error-handling/01-error-async/task.md

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
