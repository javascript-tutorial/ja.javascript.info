importance: 5

---

<<<<<<< HEAD
# 検索アルゴリズム

このタスクは2つのパートを持っています。

オブジェクトがあります:
=======
# Searching algorithm

The task has two parts.

Given the following objects:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
```

<<<<<<< HEAD
1. `__proto__` を使って、プロパティの参照が次のパスに従うようプロトタイプを割り当てます: `pockets` -> `bed` -> `table` -> `head`. 例えば、`pockets.pen` は `3` (`table` にある), で `bed.glasses` は `1` (`head` にある)です。
2. 質問に答えてください: `glasses` を取得するのに `pocket.glasses` がより速いですか？それとも `head.glasses` でしょうか？必要に応じてベンチマークしてください。
=======
1. Use `__proto__` to assign prototypes in a way that any property lookup will follow the path: `pockets` -> `bed` -> `table` -> `head`. For instance, `pockets.pen` should be `3` (found in `table`), and `bed.glasses` should be `1` (found in `head`).
2. Answer the question: is it faster to get `glasses` as `pockets.glasses` or `head.glasses`? Benchmark if needed.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
