<<<<<<< HEAD
2つ目の括弧が動作するために、1つ目は関数を返さなければなりません。

このようになります:
=======
For the second parentheses to work, the first ones must return a function.

Like this:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
function sum(a) {

  return function(b) {
<<<<<<< HEAD
    return a + b; // 外部のレキシカル環境から "a" を取る
=======
    return a + b; // takes "a" from the outer lexical environment
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```
<<<<<<< HEAD
=======

>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
