importance: 5

---

# "if" についても疑問

これらの `alert` で実行されるのはどれでしょう？

<<<<<<< HEAD
`if(...)` の内側の式の結果はどうなるでしょう？
=======
What will the results of the expressions be inside `if(...)`?
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );
```
