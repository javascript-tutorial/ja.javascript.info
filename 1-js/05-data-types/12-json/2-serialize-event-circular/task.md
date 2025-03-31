importance: 5

---

<<<<<<< HEAD
# 後方参照を除外する

循環参照のシンプルなケースでは、問題のあるプロパティをその名前でシリアライズから除外することができます。

しかし、ときには多くの後方参照があります。また、名前は循環参照と通常のプロパティの両方で使用される可能性があります。

すべてを文字列化しますが、`meetup` を参照するプロパティを削除する `replacer` 関数を書いてください。:
=======
# Exclude backreferences

In simple cases of circular references, we can exclude an offending property from serialization by its name.

But sometimes we can't just use the name, as it may be used both in circular references and normal properties. So we can check the property by its value.

Write `replacer` function to stringify everything, but remove properties that reference `meetup`:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

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
<<<<<<< HEAD
// 循環参照
=======
// circular references
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* your code */
}));

<<<<<<< HEAD
/* 結果は次のようになるはずです:
=======
/* result should be:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
