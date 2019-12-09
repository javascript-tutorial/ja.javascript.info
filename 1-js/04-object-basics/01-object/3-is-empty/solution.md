<<<<<<< HEAD
単にオブジェクトをループし、少なくとも1つプロパティがある場合にはすぐに `return false` を返します。

```js
function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
```
=======
Just loop over the object and `return false` immediately if there's at least one property.
>>>>>>> 5b195795da511709faf79a4d35f9c5623b6dbdbd
