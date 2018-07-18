importance: 5

---

# フィボナッチ数

[フィボナッチ数(Fibonacci numbers)](https://en.wikipedia.org/wiki/Fibonacci_number)の配列には <code>F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub></code> という式があります。つまり、次の数字は前の2つの数字の合計です。

最初の2角数値は `1` で、次に `2(1+1)`、次は `3(1+2)`, `5(2+3)`, と続きます: `1, 1, 2, 3, 5, 8, 13, 21...`.

フィボナッチ数は [黄金比](https://en.wikipedia.org/wiki/Golden_ratio)や私たちの周りの多くの自然現象に関連しています。

`n-th` のフィボナッチ数を返す関数 `fib(n)` を書いてください。

動作例:

```js
function fib(n) { /* your code */ }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
```

P.S. 関数は速くあるべきです。`fib(77)` の呼び出しは1秒より小さくある必要があります。
