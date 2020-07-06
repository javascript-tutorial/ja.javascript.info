importance: 4

---

# "if" を "switch" に書き換える

下のコードを1つの `switch` 文を使って書き換えてください。:

```js run
let a = +prompt('a?', '');

if (a == 0) {
  alert( 0 );
}
if (a == 1) {
  alert( 1 );
}

if (a == 2 || a == 3) {
  alert( '2,3' );
}
```
