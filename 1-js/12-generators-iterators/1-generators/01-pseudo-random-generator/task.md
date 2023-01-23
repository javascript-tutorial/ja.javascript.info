
<<<<<<< HEAD
# 疑似乱数ジェネレータ

ランダムデータが必要となる多くの場面があります。

その1つはテストです。テキスト、数値など、上手くテストを行うためにはランダムなデータが必要になります。

JavaScript では `Math.random()` を使うことができます。しかし、何か問題が起きた場合、まったく同じデータを使用して繰り返しテストができればよいです。

そのために、"シード疑似乱数ジェネレータ" と呼ばれるものが使われます。それらは最初の値である "シード(種)" を取り、以降公式を使って次の値を生成します。同じシードは同じ一覧の数列を生成するので、フロー全体を簡単に再現することができます。繰り返すのに覚えておく必要があるのはシードだけです。

これは、このような公式の例で、幾分か一様に分布した値を生成します。:
=======
# Pseudo-random generator

There are many areas where we need random data.

One of them is testing. We may need random data: text, numbers, etc. to test things out well.

In JavaScript, we could use `Math.random()`. But if something goes wrong, we'd like to be able to repeat the test, using exactly the same data.

For that, so called "seeded pseudo-random generators" are used. They take a "seed", the first value, and then generate the next ones using a formula so that the same seed yields the same sequence, and hence the whole flow is easily reproducible. We only need to remember the seed to repeat it.

An example of such formula, that generates somewhat uniformly distributed values:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```
next = previous * 16807 % 2147483647
```

<<<<<<< HEAD
シードに `1` を使うと、値は次のようになります:
1. `16807`
2. `282475249`
3. `1622650073`
4. ...など...

このタスクは、`seed` を取り、この式でジェネレータを生成するジェネレータ関数 `pseudoRandom(seed)` を作成することです。

使用例:
=======
If we use `1` as the seed, the values will be:
1. `16807`
2. `282475249`
3. `1622650073`
4. ...and so on...

The task is to create a generator function `pseudoRandom(seed)` that takes `seed` and creates the generator with this formula.

Usage example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```
