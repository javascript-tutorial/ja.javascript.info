importance: 5

---

# 定数オブジェクト?

<<<<<<< HEAD
`const` で宣言されたオブジェクトを変更することは可能でしょうか？どう思いますか？
=======
Is it possible to change an object declared with `const`? What do you think?
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js
const user = {
  name: "John"
};

*!*
// 動作する?
user.name = "Pete";
*/!*
```
