# setTimeout でのエラー

`.catch` はトリガされると思いますか？またその理由を説明できますか？

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
