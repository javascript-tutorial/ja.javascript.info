
# if の中の関数

<<<<<<< HEAD
このコードを見てください。最後の行の呼び出しの結果は何でしょうか？
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

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
