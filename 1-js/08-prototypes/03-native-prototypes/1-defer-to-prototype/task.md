importance: 5

---

<<<<<<< HEAD
# 関数にメソッド "f.defer(ms)" を追加する

すべての関数プロトタイプにメソッド `defer(ms)` を追加してください。それは `ms` ミリ秒後に関数を実行します。

その後、このようなコードが動くはずです。:
=======
# Add method "f.defer(ms)" to functions

Add to the prototype of all functions the method `defer(ms)`, that runs the function after `ms` milliseconds.

After you do it, such code should work:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
function f() {
  alert("Hello!");
}

<<<<<<< HEAD
f.defer(1000); // 1秒後に "Hello!" が表示される
=======
f.defer(1000); // shows "Hello!" after 1 second
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```
