importance: 5

---

# "if" についても疑問

これらの `alert` で実行されるのはどれでしょう？

<<<<<<< HEAD
`if(...)` の内側の式の結果はどうなるでしょう？
=======
What will the results of the expressions be inside `if(...)`?
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

```js
if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );
```
