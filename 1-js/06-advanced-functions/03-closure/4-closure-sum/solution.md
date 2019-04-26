<<<<<<< HEAD
2つ目の括弧が動作するために、1つ目は関数を返さなければなりません。
=======
For the second parentheses to work, the first ones must return a function.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

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
