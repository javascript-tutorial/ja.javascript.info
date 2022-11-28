```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

<<<<<<< HEAD
`debounce` 呼び出しはラッパーを返します。そこには2つの状態があります:

- `isCooldown = false` -- 実行する準備ができている
- `isCooldown = true` -- タイムアウトを待っている

最初の呼び出しで、 `isCooldown` は偽なので、呼び出しは処理され、状態は `true` になります。

`isCooldown` が true の間、すべての他の呼び出しは無視されます。

その後、与えられた遅延後に `setTimeout` がそれを `false` に戻します。
=======
```

A call to `debounce` returns a wrapper. When called, it schedules the original function call after given `ms` and cancels the previous such timeout.

>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0
