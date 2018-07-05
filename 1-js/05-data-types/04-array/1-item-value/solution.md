結果は `4` です:


```js run
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert( fruits.length ); // 4
*/!*
```

配列はオブジェクトです。なので `shoppingCart` と `fruits` は同じ配列への参照です。
