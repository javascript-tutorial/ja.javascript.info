<<<<<<< HEAD
最初の2つのチェックは2つの `case` になります。3つ目のチェックは2つのケースに分割されます。:
=======
The first two checks turn into two `case`. The third check is split into two cases:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
*!*
    break;
*/!*
}
```

<<<<<<< HEAD
注意してください: 末尾の `break` は必須ではありませんが、将来のためにそれを置く方がよいです。

将来、たとえば `case 4` のような `case` を追加したい機会があります。そして、以前に break を置くのを忘れていた場合、 `case 3` の終わりでエラーが発生します。なので、これは一種の自己保険です。
=======
Please note: the `break` at the bottom is not required. But we put it to make the code future-proof.

In the future, there is a chance that we'd want to add one more `case`, for example `case 4`. And if we forget to add a break before it, at the end of `case 3`, there will be an error. So that's a kind of self-insurance.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
