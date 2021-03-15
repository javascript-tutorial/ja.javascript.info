<<<<<<< HEAD
定義によると、階乗 `n!` は `n * (n-1)!` と書くことができます。
=======
By definition, a factorial `n!` can be written as `n * (n-1)!`.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

つまり、`factorial(n)` の結果は `n` を `factorial(n-1)` の結果で掛けたものとして計算することができます。

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

再帰のベース値は `1` です。ここではベースを `0` にすることもできます。それほど問題ではありませんが、再帰的なステップが1回増えます:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
