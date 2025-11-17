
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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
