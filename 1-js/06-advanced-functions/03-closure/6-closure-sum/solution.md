<<<<<<< HEAD
2つ目の括弧が動作するために、1つ目は関数を返さなければなりません。

このようになります:
=======
For the second parentheses to work, the first ones must return a function.

Like this:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
function sum(a) {

  return function(b) {
<<<<<<< HEAD
    return a + b; // 外部のレキシカル環境から "a" を取る
=======
    return a + b; // takes "a" from the outer lexical environment
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```
<<<<<<< HEAD
=======

>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
