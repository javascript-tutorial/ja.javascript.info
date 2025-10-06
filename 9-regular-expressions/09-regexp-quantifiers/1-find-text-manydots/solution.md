
<<<<<<< HEAD
解答:

```js run
let reg = /\.{3,}/g;
alert( "Hello!... How goes?.....".match(reg) ); // ..., .....
```

ドットは特殊文字なのでエスケープが必要で、`\.` とする必要があることに注意してください。
=======
Solution:

```js run
let regexp = /\.{3,}/g;
alert( "Hello!... How goes?.....".match(regexp) ); // ..., .....
```

Please note that the dot is a special character, so we have to escape it and insert as `\.`.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
