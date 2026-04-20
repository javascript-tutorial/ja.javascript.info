importance: 4

---

<<<<<<< HEAD
# デコレートする "defer()" を関数に追加する

すべての関数のプロトタイプにメソッド `defer(ms)` を追加してください。それはラッパーを返し、`ms` ミリ秒呼び出しを遅延します。

これは、どのように動作すべきか、の例です:
=======
# Add the decorating "defer()" to functions

Add to the prototype of all functions the method `defer(ms)`, that returns a wrapper, delaying the call by `ms` milliseconds.

Here's an example of how it should work:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js
function f(a, b) {
  alert( a + b );
}

<<<<<<< HEAD
f.defer(1000)(1, 2); // 1秒後に 3 が表示される
```

引数をオリジナルの関数に渡す必要があることに注意してください。
=======
f.defer(1000)(1, 2); // shows 3 after 1 second
```

Please note that the arguments should be passed to the original function.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
