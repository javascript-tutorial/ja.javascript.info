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
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
