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
>>>>>>> e2f9e5840737e00846bfd492192d8a3828820c60
