# setTimeout でのエラー

<<<<<<< HEAD
`.catch` はトリガされると思いますか？またその理由を説明できますか？
=======
What do you think? Will the `.catch` trigger? Explain your answer.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
