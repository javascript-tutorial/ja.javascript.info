importance: 5

---

# 検索アルゴリズム

このタスクは2つのパートを持っています。

オブジェクトがあります:

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

1. `__proto__` を使って、プロパティの参照が次のパスに従うようプロトタイプを割り当てます: `pockets` -> `bed` -> `table` -> `head`. 例えば、`pockets.pen` は `3` (`table` にある), で `bed.glasses` は `1` (`head` にある)です。
2. 質問に答えてください: `glasses` を取得するのに `pocket.glasses` がより速いですか？それとも `head.glasses` でしょうか？必要に応じてベンチマークしてください。
