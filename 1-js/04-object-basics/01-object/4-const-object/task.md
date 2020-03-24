importance: 5

---

# 定数オブジェクト?

<<<<<<< HEAD
`const` で宣言されたオブジェクトを変更することは可能でしょうか？どう思いますか？
=======
Is it possible to change an object declared with `const`? What do you think?
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

```js
const user = {
  name: "John"
};

*!*
// 動作する?
user.name = "Pete";
*/!*
```
