<<<<<<< HEAD
`new Date` コンストラクタはデフォルトでローカルのタイムゾーンを使います。なので、覚えておくべき重要なことは 月 はゼロからスタートすることだけです。

2月は数値で 1 になります。
=======
The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.

So February has number 1.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
