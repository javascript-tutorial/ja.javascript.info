# setTimeout でのエラー

<<<<<<< HEAD
`.catch` はトリガされると思いますか？またその理由を説明できますか？
=======
What do you think? Will the `.catch` trigger? Explain your answer.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
