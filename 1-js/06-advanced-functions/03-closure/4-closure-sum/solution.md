<<<<<<< HEAD
2つ目の括弧が動作するために、1つ目は関数を返さなければなりません。
=======
For the second parentheses to work, the first ones must return a function.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

このように:

```js run
function sum(a) {

  return function(b) {
    return a + b; // 外部のレキシカル環境から "a" を取る
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```
