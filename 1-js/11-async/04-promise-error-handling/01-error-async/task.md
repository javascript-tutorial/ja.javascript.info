# setTimeout でのエラー

<<<<<<< HEAD
`.catch` はトリガされると思いますか？またその理由を説明できますか？
=======
What do you think? Will the `.catch` trigger? Explain your answer.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
