importance: 5

---

# setTimeout は何を表示するでしょう？

下のコードで、スケジュールされた `setTimeout` 呼び出しがあります。その後、完了までに 100ms 以上かかる重い計算が実行されます。

<<<<<<< HEAD
スケジュールされた関数はいつ実行されるでしょう？
=======
When will the scheduled function run?
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

1. ループの後
2. ループの前
3. ループの最初


<<<<<<< HEAD
`alert` は何を表示するでしょう？
=======
What is `alert` going to show?
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```js
let i = 0;

setTimeout(() => alert(i), 100); // ?

// この関数を実行する時間は 100ms より多いと仮定する
for(let j = 0; j < 100000000; j++) {
  i++;
}
```
