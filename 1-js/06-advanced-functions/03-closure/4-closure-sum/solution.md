<<<<<<< HEAD
2つ目の括弧が動作するために、1つ目は関数を返さなければなりません。
=======
For the second parentheses to work, the first ones must return a function.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

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
