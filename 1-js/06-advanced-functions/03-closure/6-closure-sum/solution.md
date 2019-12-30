<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/4-closure-sum/solution.md
2つ目の括弧が動作するために、1つ目は関数を返さなければなりません。
=======
For the second parentheses to work, the first ones must return a function.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:1-js/06-advanced-functions/03-closure/6-closure-sum/solution.md

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
