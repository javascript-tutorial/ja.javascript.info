
もちろん正常に動作します。

両方の入れ子関数は同じ外部レキシカル環境内で作られているので、同じ `count` 変数へのアクセスを共有します。:

```js run
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

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
