importance: 5

---

# 定数オブジェクト?

<<<<<<< HEAD
`const` で宣言されたオブジェクトを変更することは可能でしょうか？どう思いますか？
=======
Is it possible to change an object declared with `const`? What do you think?
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

```js
const user = {
  name: "John"
};

*!*
// 動作する?
user.name = "Pete";
*/!*
```
