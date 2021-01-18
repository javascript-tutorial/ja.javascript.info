
# if の中の関数

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md
このコードを見てください。最後の行の呼び出しの結果は何でしょうか？
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md

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
