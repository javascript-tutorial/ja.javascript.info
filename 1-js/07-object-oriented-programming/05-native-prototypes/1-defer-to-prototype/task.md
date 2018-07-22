importance: 5

---

# 関数にメソッド "f.defer(ms)" を追加する

すべての関数プロトタイプにメソッド `defer(ms)` を追加してください。それは `ms` ミリ秒後に関数を実行します。

その後、このようなコードが動くはずです。:

```js
function f() {
  alert("Hello!");
}

f.defer(1000); // 1秒後に "Hello!" が表示される
```
