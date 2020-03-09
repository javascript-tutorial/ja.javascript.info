importance: 5

---

# 定数オブジェクト?

<<<<<<< HEAD
`const` で宣言されたオブジェクトを変更することは可能でしょうか？どう思いますか？
=======
Is it possible to change an object declared with `const`? What do you think?
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js
const user = {
  name: "John"
};

*!*
// 動作する?
user.name = "Pete";
*/!*
```
