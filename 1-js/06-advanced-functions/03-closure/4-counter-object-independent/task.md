importance: 5

---

# カウンタオブジェクト

これはコンストラクタ関数の助けを借りて作られたカウンタオブジェクトです。

これは動作するでしょうか？何が表示されるでしょう？

```js
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```
