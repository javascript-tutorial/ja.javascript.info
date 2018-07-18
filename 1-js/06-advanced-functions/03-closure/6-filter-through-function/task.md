importance: 5

---

# 関数を通してフィルタする

私たちは、配列に対する組み込みのメソッド `arr.filter(f)` を持っています。それはすべての要素を関数 `f` を通してフィルタします。もし `true` を帰す場合、その要素は結果の配列に入れられます。

"すぐに使える" フィルタを作りましょう:

- `inBetween(a, b)` -- `a` と `b` の間、またはそれらと等しい(包括的)
- `inArray([...])` -- 与えられた配列に存在する

使用方法はこのようになります:

- `arr.filter(inBetween(3,6))` -- 3 から 6 までの値だけを選び出します
- `arr.filter(inArray([1,2,3]))` -- `[1,2,3]` のメンバの1つにマッチする要素だけを選び出します

例:

```js
/* .. your code for inBetween and inArray */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```
