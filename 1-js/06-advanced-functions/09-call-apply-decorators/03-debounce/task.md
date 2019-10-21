importance: 5

---

# Debounce decorator

`debounce(f, ms)` デコレータの結果は、`ms` ミリ秒毎に最大一度 `f` への呼び出しを渡すラッパーです。

<<<<<<< HEAD
言い換えると、"デバウンス" 関数を呼び出すと、最も近い `ms` ミリ秒までの他の未来はすべて無視されることが保証されます。
=======
In other words, when we call a "debounced" function, it guarantees that all future calls to the function made less than `ms` milliseconds after the previous call will be ignored.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

例:

```js no-beautify
let f = debounce(alert, 1000);

f(1); // すぐに実行される
f(2); // 無視される

setTimeout( () => f(3), 100); // 無視される (100 ms だけ経過した)
setTimeout( () => f(4), 1100); // 実行される
setTimeout( () => f(5), 1500); // 無視される (最後の実行から 1000ms 経過していない)
```

<<<<<<< HEAD
実践において、`debounce` はこのような短い期間の中で新しいことができないことを知ったときに、何かを取得/更新する関数に対して役立ちます,リソースを無駄にしないように。
=======
In practice `debounce` is useful for functions that retrieve/update something when we know that nothing new can be done in such a short period of time, so it's better not to waste resources.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
