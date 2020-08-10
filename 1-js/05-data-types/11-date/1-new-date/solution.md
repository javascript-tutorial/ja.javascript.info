<<<<<<< HEAD
`new Date` コンストラクタはデフォルトでローカルのタイムゾーンを使います。なので、覚えておくべき重要なことは 月 はゼロからスタートすることだけです。

2月は数値で 1 になります。
=======
The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.

So February has number 1.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
