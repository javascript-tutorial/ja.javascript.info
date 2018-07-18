importance: 5

---

# 単一連結リストを出力する

単一の連結リスト(チャプター <info:recursion> での説明の通り)を持っています。:

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```
リストのアイテムを1つずつ出力する関数 `printList(list)` を書いてください。

解法を2つのバリアントで作成してください: ループを使った方法と再帰を利用した方法。

ベターなのは？: 再帰 or 再帰なし？
