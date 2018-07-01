importance: 5

---

# "if" についても疑問

これらの `alert` で実行されるのはどれでしょう？

`if(...)` の内側の式の結果はどうなるでしょう？

```js
if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );
```
