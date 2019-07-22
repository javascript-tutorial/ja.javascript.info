importance: 5

---

# プロパティを合計する

任意の数の給与を持つ `salaries` オブジェクトがあります。

`Object.values` と `for..of` ループを使ってすべての給与の合計を返す関数 `sumSalaries(salaries)` を書いてください。

もし `salaries` が空の場合、結果は `0` になります。

例:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```
