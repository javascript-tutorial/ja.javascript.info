importance: 5

---

# 後方参照を除外する

循環参照のシンプルなケースでは、問題のあるプロパティをその名前でシリアライズから除外することができます。

しかし、ときには多くの後方参照があります。また、名前は循環参照と通常のプロパティの両方で使用される可能性があります。

すべてを文字列化しますが、`meetup` を参照するプロパティを削除する `replacer` 関数を書いてください。:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// 循環参照
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* your code */
}));

/* 結果は次のようになるはずです:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
