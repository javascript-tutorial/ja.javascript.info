importance: 5

---

# SyntaxError を継承する

組み込みの `SyntaxError` クラスを継承した `FormatError` クラスを作りなさい。

`message`, `name` と `stack` プロパティをサポートする必要があります。

使用例:

```js
let err = new FormatError("formatting error");

alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (SyntaxError を継承しているので)
```
