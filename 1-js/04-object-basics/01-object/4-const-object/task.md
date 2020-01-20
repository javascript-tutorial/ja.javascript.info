importance: 5

---

# 定数オブジェクト?

<<<<<<< HEAD
`const` で宣言されたオブジェクトを変更することは可能でしょうか？どう思いますか？
=======
Is it possible to change an object declared with `const`? What do you think?
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js
const user = {
  name: "John"
};

*!*
// 動作する?
user.name = "Pete";
*/!*
```
