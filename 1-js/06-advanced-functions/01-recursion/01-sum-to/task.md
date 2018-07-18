importance: 5

---

# 与えられた数値までのすべての数値を合計する

数値の合計 `1 + 2 + ... + n` を計算する関数 `sumTo(n)` を書いてください。

例:

```js no-beautify
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
```

解答のバリアントを3つ作ってください:

1. for ループを使ってください。
2. 再帰を使ってください。`n > 1` に対して `sumTo(n) = n + sumTo(n-1)` となるような。
3. [等差数列](https://en.wikipedia.org/wiki/Arithmetic_progression) の式を使ってください。

結果の例です:

```js
function sumTo(n) { /*... your code ... */ }

alert( sumTo(100) ); // 5050
```

P.S. どの解決策が最も速いでしょう？そして遅いものはどれ？なぜでしょう？

P.P.S. 再帰を使って `sumTo(100000)` を数えることはできますか？
