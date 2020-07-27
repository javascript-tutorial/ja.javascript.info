importance: 5

---

# 拡張ホットキー

コード `code1`, `code2`, ..., `code_n` のキーを同時に押したときに `func` を実行する関数 `runOnKeys(func, code1, code2, ... code_n)` を作成してください。

例えば、下のコードは、 `"Q"` と `"W"` が同時に押されたときに `alert` を表示します(任意の言語で、CapsLockの有無にかかわらず)。

```js no-beautify
runOnKeys(
  () => alert("Hello!"),
  "KeyQ",
  "KeyW"
);
```

[demo src="solution"]
