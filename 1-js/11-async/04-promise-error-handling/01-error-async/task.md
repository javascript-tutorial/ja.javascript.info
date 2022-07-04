# setTimeout でのエラー

<<<<<<< HEAD:1-js/11-async/04-promise-error-handling/01-error-async/task.md
`.catch` はトリガされると思いますか？またその理由を説明できますか？
=======
What do you think? Will the `.catch` trigger? Explain your answer.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f:1-js/11-async/04-promise-error-handling/01-error-async/task.md

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
