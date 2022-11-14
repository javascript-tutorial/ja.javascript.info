importance: 5

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md
# if の中の関数

このコードを見てください。最後の行の呼び出しの結果は何でしょうか？
=======
---
# Function in if

Look at the code. What will be the result of the call at the last line?
>>>>>>> 8d9ecb724c7df59774d1e5ffb5e5167740b7d321:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md

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
