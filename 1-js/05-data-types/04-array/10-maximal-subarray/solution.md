<<<<<<< HEAD
# 遅い解法
=======
# Slow solution
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

すべての可能性のあるサブ合計を計算することができます。

最もシンプルな方法はすべての要素を取り、それから始まるすべてのサブ配列の合計を計算することです。

例えば、 `[-1, 2, 3, -9, 11]` に対しては:

```js no-beautify
// -1 から開始:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// 2 から開始:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// 3 から開始:
3
3 + (-9)
3 + (-9) + 11

// -9 から開始
-9
-9 + 11

<<<<<<< HEAD
// -11 から開始
-11
=======
// Starting from 11
11
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

コードは実際には入れ子のループです: 配列要素に対する外部ループ、および現在の要素で始まる内部カウントのサブ合計です。

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // もし要素を取らない場合、ゼロが返却されます

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```

<<<<<<< HEAD
この解法は [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) の時間の複雑さを持っています。言い換えると、もし配列のサイズが2倍に増加すると、アルゴリズムは4倍長くなります。

大きな配列(1000, 10000 またはより多くのアイテム)に対しては、このようなアルゴリズムは深刻なレベルで低速になる可能性があります。
=======
The solution has a time complexity of [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation). In other words, if we increase the array size 2 times, the algorithm will work 4 times longer.

For big arrays (1000, 10000 or more items) such algorithms can lead to serious sluggishness.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

# 早い解法

配列を歩いて変数 `s` に現在の要素の部分合計を持ちましょう。`s` がある点で負になる場合は `s=0` を代入します。このような `s` の最大値が答えになります。

説明にあまりピンとこない場合は、コードを参照してください、それは十分短いです:

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // for each item of arr
    partialSum += item; // add it to partialSum
    maxSum = Math.max(maxSum, partialSum); // remember the maximum
    if (partialSum < 0) partialSum = 0; // zero if negative
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```

このアルゴリズムは1回の配列ループを必要とするので、時間複雑度は O(n) です。

<<<<<<< HEAD
あなたはここで、このアルゴリズムについてのより詳細な情報を見つけることができます: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). もしも、なぜそれが動作するのかがまだはっきりしていない場合は、上の例のアルゴリズムをトレースして、どのように動作するかを見てください。それはどんな言葉よりも優れています。
=======
You can find more detailed information about the algorithm here: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). If it's still not obvious why that works, then please trace the algorithm on the examples above, see how it works, that's better than any words.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
