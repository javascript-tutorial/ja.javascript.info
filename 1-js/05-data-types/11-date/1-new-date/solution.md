<<<<<<< HEAD
`new Date` コンストラクタはデフォルトでローカルのタイムゾーンを使います。なので、覚えておくべき重要なことは 月 はゼロからスタートすることだけです。

2月は数値で 1 になります。

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
=======
The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.

So February has number 1.

Here's an example with numbers as date components:

```js run
//new Date(year, month, date, hour, minute, second, millisecond)
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```
We could also create a date from a string, like this:

```js run
//new Date(datastring)
let d2 = new Date("2012-02-20T03:12");
alert( d2 );
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```
