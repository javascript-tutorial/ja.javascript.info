<<<<<<< HEAD
2つ目の括弧が動作するために、1つ目は関数を返さなければなりません。

このようになります:
=======
For the second parentheses to work, the first ones must return a function.

Like this:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
function sum(a) {

  return function(b) {
<<<<<<< HEAD
    return a + b; // 外部のレキシカル環境から "a" を取る
=======
    return a + b; // takes "a" from the outer lexical environment
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```
<<<<<<< HEAD
=======

>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
