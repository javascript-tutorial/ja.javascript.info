importance: 5

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md
# if の中の関数

このコードを見てください。最後の行の呼び出しの結果は何でしょうか？
=======
---
# Function in if

Look at the code. What will be the result of the call at the last line?
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md

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
