importance: 5

---

# ユニークな配列メンバのフィルタをする

`arr` は配列としてます。

`arr` のユニークなアイテムを持つ配列を返す関数 `unique(arr)` を作成してください。

例:

```js
function unique(arr) {
  /* your code */
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O
```

P.S ここでは文字列が使われていますが、任意の型の値にすることができます。

P.P.S. ユニークな値を格納するために `Set` を使ってください。
