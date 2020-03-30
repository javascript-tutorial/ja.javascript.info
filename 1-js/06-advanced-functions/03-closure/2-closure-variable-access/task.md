importance: 5

---

<<<<<<< HEAD
# どちらの変数が利用可能でしょう？

以下の関数 `makeWorker` は別の関数を作りそれを返します。その新しい関数はどこからでも呼ぶことが可能です。

これは作成された場所から外部の変数へアクセスするでしょうか？それとも実行された場所から？あるいはその両方？
=======
# Which variables are available?

The function `makeWorker` below makes another function and returns it. That new function can be called from somewhere else.

Will it have access to the outer variables from its creation place, or the invocation place, or both?
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

<<<<<<< HEAD
// 関数を作成
let work = makeWorker();

// 呼び出し
work(); // 何が表示されるでしょう?
```

"Pete" or "John" どちらの値が表示されるでしょう?
=======
// create a function
let work = makeWorker();

// call it
work(); // what will it show?
```

Which value it will show? "Pete" or "John"?
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
