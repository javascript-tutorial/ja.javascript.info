区間 0..1 のすべての値を `min` から `max` までの値に "マッピング" する必要があります。

2つのステージでそれができます:

<<<<<<< HEAD
1. `max - min` と 0..1 からのランダム値を掛けると、取りうる値の範囲は 0..1 から 0..max - min まで増加します。
2. ここで、`min` を足すと、取りうる範囲は `min` から `max` になります。
=======
1. If we multiply a random number from 0..1 by `max-min`, then the interval of possible values increases `0..1` to `0..max-min`.
2. Now if we add `min`, the possible interval becomes from `min` to `max`.
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d

関数:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) );
alert( random(1, 5) );
alert( random(1, 5) );
```
