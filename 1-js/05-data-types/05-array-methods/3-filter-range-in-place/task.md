importance: 4

---

# "その場" でフィルター範囲

配列 `arr` を取得し、`a` と `b` の間を除くすべての値をそこから削除する関数 `filterRangeInPlace(arr, a, b)` を書いてください。テストは `a ≤ arr[i] ≤ b` です。

この関数は配列のみを修正するべきです。なにも返却するべきではありません。

例:
```js
let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // 1 から 4 までの値以外を削除

alert( arr ); // [3, 1]
```
