
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
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
