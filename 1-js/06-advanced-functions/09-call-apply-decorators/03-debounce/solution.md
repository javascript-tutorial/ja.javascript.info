```js demo
function debounce(f, ms) {

  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };

}
```

<<<<<<< HEAD
`debounce` 呼び出しはラッパーを返します。そこには2つの状態があります:
=======
A call to `debounce` returns a wrapper. There may be two states:
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

- `isCooldown = false` -- 実行する準備ができている
- `isCooldown = true` -- タイムアウトを待っている

最初の呼び出しで、 `isCooldown` は偽なので、呼び出しは処理され、状態は `true` になります。

`isCooldown` が true の間、すべての他の呼び出しは無視されます。

その後、与えられた遅延後に `setTimeout` がそれを `false` に戻します。