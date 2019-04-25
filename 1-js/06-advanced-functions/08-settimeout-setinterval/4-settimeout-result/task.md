importance: 5

---

# setTimeout は何を表示するでしょう？

下のコードで、スケジュールされた `setTimeout` 呼び出しがあります。その後、完了までに 100ms 以上かかる重い計算が実行されます。

<<<<<<< HEAD
スケジュールされた関数はいつ実行されるでしょう？
=======
When will the scheduled function run?
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

1. ループの後
2. ループの前
3. ループの最初


<<<<<<< HEAD
`alert` は何を表示するでしょう？
=======
What is `alert` going to show?
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
let i = 0;

setTimeout(() => alert(i), 100); // ?

// この関数を実行する時間は 100ms より多いと仮定する
for(let j = 0; j < 100000000; j++) {
  i++;
}
```
