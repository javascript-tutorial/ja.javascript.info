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

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/7-list-primes/solution.md
ここには最適化の余地が沢山あります。例えば、`2` から  `i` の平方根までの約数を探すことができます。しかし、とにかく、私たちが大きな間隔に対して効率的になりたいなら、アプローチを変更し、高度な数学と[Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve)などの複雑なアルゴリズムに頼る必要があります。
=======
There's a lot of space to optimize it. For instance, we could look for the divisors from `2` to square root of `i`. But anyway, if we want to be really efficient for large intervals, we need to change the approach and rely on advanced maths and complex algorithms like [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) etc.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05:1-js/02-first-steps/13-while-for/7-list-primes/solution.md
