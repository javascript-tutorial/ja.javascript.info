<<<<<<< HEAD
`new Date` コンストラクタはデフォルトでローカルのタイムゾーンを使います。なので、覚えておくべき重要なことは 月 はゼロからスタートすることだけです。
=======
The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

2月は数値で 1 になります。

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
