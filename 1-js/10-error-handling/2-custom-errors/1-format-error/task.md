importance: 5

---

<<<<<<< HEAD
# SyntaxError を継承する

組み込みの `SyntaxError` クラスを継承した `FormatError` クラスを作りなさい。

`message`, `name` と `stack` プロパティをサポートする必要があります。

使用例:
=======
# Inherit from SyntaxError

Create a class `FormatError` that inherits from the built-in `SyntaxError` class.

It should support `message`, `name` and `stack` properties.

Usage example:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
let err = new FormatError("formatting error");

alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
<<<<<<< HEAD
alert( err instanceof SyntaxError ); // true (SyntaxError を継承しているので)
=======
alert( err instanceof SyntaxError ); // true (because inherits from SyntaxError)
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```
