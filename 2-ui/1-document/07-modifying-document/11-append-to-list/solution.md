
どこかに HTML を部分を挿入する必要がある場合、`insertAdjacentHTML` がベストです。
  
解決策:

```js
one.insertAdjacentHTML('afterend', '<li>2</li><li>3</li>');
```
