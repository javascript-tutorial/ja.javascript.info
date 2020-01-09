importance: 5

---

# どちらの変数が利用可能でしょう？

以下の関数 `makeWorker` は別の関数を作りそれを返します。その新しい関数はどこからでも呼ぶことが可能です。

これは作成された場所から外部の変数へアクセスするでしょうか？それとも実行された場所から？あるいはその両方？

```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

// 関数を作成
let work = makeWorker();

// 呼び出し
work(); // 何が表示されるでしょう?
```

"Pete" or "John" どちらの値が表示されるでしょう?
