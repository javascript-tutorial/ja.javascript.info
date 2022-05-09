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
>>>>>>> 206485fc3a5465f961608b6e7303fae2e1a0e0b5
