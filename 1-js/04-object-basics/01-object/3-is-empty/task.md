importance: 5

---

# 空のチェック

オブジェクトがプロパティを持っていない場合に `true` を、それ以外の場合には `false` を返す関数 `isEmpty(obj)` を書きなさい。

このように動く必要があります:

```js
let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false
```
