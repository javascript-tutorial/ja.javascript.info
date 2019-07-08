<<<<<<< HEAD
`new Date` コンストラクタはデフォルトでローカルのタイムゾーンを使います。なので、覚えておくべき重要なことは 月 はゼロからスタートすることだけです。
=======
The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

2月は数値で 1 になります。

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
