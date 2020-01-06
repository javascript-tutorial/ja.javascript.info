importance: 5

---

# カウンタは独立していますか？

ここで2つのカウンタを作ります: 同じ `makeCounter` 関数を使って `counter` と `counter2` を作ります。

それらは独立していますか？2つ目のカウンタは何が表示されるでしょうか？ `0,1` or `2,3` or その他？

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
