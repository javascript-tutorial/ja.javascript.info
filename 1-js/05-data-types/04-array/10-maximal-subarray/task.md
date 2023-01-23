importance: 2

---

# 最大のサブ配列

入力は数値の配列です。e.g.  `arr = [1, -2, 3, 4, -9, 6]`.

タスクは次の通りです: アイテムの最大合計で `arr` の連続した部分配列を探します。

<<<<<<< HEAD
そのような返却をする関数 `getMaxSubSum(arr)` を書いてください。

例えば:

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) = 5 (ハイライトされたアイテムの合計)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) = 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) = 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) = 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) = 100
getMaxSubSum([*!*1, 2, 3*/!*]) = 6 (すべて)
=======
Write the function `getMaxSubSum(arr)` that will return that sum.

For instance:

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) == 5 (the sum of highlighted items)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) == 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) == 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) == 100
getMaxSubSum([*!*1, 2, 3*/!*]) == 6 (take all)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

もしすべてのアイテムが負値の場合、何も取らないことを意味します(サブ配列は空)、なので合計はゼロです:

```js
getMaxSubSum([-1, -2, -3]) = 0
```

<<<<<<< HEAD
早い解法を考えてみてください。: 可能なら [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) もしくは O(n) です。
=======
Please try to think of a fast solution: [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) or even O(n) if you can.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
