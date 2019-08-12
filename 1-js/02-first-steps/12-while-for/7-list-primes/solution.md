このタスクを解決するのに、多くのアルゴリズムがあります。

入れ子ループを使ってみましょう:

```js
For each i in the interval {
  check if i has a divisor from 1..i
  if yes => the value is not a prime
  if no => the value is a prime, show it
}
```

ラベルを使ったコードです。:

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // for each i...

  for (let j = 2; j < i; j++) { // look for a divisor..
    if (i % j == 0) continue nextPrime; // not a prime, go next i
  }

  alert( i ); // a prime
}
```

<<<<<<< HEAD
ここには最適化の余地が沢山あります。例えば、`2` から  `i` の平方根までの約数を探すことができます。しかし、とにかく、私たちが大きな間隔に対して効率的になりたいなら、アプローチを変更し、高度な数学と[Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve)などの複雑なアルゴリズムに頼る必要があります。
=======
There's a lot of space to opimize it. For instance, we could look for the divisors from `2` to square root of `i`. But anyway, if we want to be really efficient for large intervals, we need to change the approach and rely on advanced maths and complex algorithms like [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) etc.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
