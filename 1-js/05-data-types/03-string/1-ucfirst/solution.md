JavaScript では文字列はイミュータブル(不変)なので、最初の文字を "置換" することはできません。

しかし、既存のものをベースに、再訴yの文字が大文字化された新しい文字列を作ることはできます。:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

<<<<<<< HEAD
が、そこには少し問題があります。`str` が空の場合、`str[0]` は未定義です。なのでエラーになります。
=======
There's a small problem though. If `str` is empty, then `str[0]` is `undefined`, and as `undefined` doesn't have the `toUpperCase()` method, we'll get an error.
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

ここでは2つのバリアントがあります:

1. `str.charAt(0)` を利用する。それは常に文字列を返します(恐らく空です)。
2. 空文字用のテストを追加する。

これは2つ目のバリアントです:

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
