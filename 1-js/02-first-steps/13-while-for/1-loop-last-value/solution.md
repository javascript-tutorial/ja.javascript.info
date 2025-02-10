<<<<<<< HEAD
答え: `1`.
=======
The answer: `1`.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```

<<<<<<< HEAD
各ループイテレーションは `i` を `1` 減らします。チェック `while(i)` は `i = 0` のときにループを停止します。

従って、ループのステップは次のシーケンスを形成します。:
=======
Every loop iteration decreases `i` by `1`. The check `while(i)` stops the loop when `i = 0`.

Hence, the steps of the loop form the following sequence ("loop unrolled"):
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
let i = 3;

<<<<<<< HEAD
alert(i--); // 3 を表示, i を 2 に減らす

alert(i--) // 2 を表示, i を 1 に減らす

alert(i--) // 1 を表示, i を 0 に減らす

// 完了。while(i)チェックでループが停止します。
=======
alert(i--); // shows 3, decreases i to 2

alert(i--) // shows 2, decreases i to 1

alert(i--) // shows 1, decreases i to 0

// done, while(i) check stops the loop
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
```
