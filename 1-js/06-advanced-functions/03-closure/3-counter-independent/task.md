importance: 5

---

<<<<<<< HEAD
# カウンタは独立していますか？

ここで2つのカウンタを作ります: 同じ `makeCounter` 関数を使って `counter` と `counter2` を作ります。

それらは独立していますか？2つ目のカウンタは何が表示されるでしょうか？ `0,1` or `2,3` or その他？
=======
# Are counters independent?

Here we make two counters: `counter` and `counter2` using the same `makeCounter` function.

Are they independent? What is the second counter going to show? `0,1` or `2,3` or something else?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```
<<<<<<< HEAD
=======

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
