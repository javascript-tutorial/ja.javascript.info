<<<<<<< HEAD
`new Date` コンストラクタはデフォルトでローカルのタイムゾーンを使います。なので、覚えておくべき重要なことは 月 はゼロからスタートすることだけです。

2月は数値で 1 になります。
=======
The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.

So February has number 1.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
