
# if の中の関数

このコードを見てください。最後の行の呼び出しの結果は何でしょうか？

```js run
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
