importance: 5

---

#  省略記号 "..." の見つけ方は？

省略記号(連続した3つ(以上?)のドット)を見つける正規表現を作成してください。

これでチェックします:

```js
let reg = /your regexp/g;
alert( "Hello!... How goes?.....".match(reg) ); // ..., .....
```
