importance: 5

<<<<<<< HEAD
# if の中の関数

このコードを見てください。最後の行の呼び出しの結果は何でしょうか？
=======
---
# Function in if

Look at the code. What will be the result of the call at the last line?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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
