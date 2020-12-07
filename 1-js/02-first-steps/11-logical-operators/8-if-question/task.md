importance: 5

---

# "if" についても疑問

これらの `alert` で実行されるのはどれでしょう？

<<<<<<< HEAD
`if(...)` の内側の式の結果はどうなるでしょう？
=======
What will the results of the expressions be inside `if(...)`?
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

```js
if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );
```
