
# if の中の関数

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md
このコードを見てください。最後の行の呼び出しの結果は何でしょうか？
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md

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
