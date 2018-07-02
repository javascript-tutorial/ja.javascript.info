importance: 5

---

# 定数オブジェクト?

`const` で宣言されたオブジェクトを変更することは可能でしょうか？どう思いますか？

```js
const user = {
  name: "John"
};

*!*
// 動作する?
user.name = "Pete";
*/!*
```
