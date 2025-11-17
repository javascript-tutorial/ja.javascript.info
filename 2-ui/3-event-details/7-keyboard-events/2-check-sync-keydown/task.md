importance: 5

---

<<<<<<< HEAD
# 拡張ホットキー

コード `code1`, `code2`, ..., `code_n` のキーを同時に押したときに `func` を実行する関数 `runOnKeys(func, code1, code2, ... code_n)` を作成してください。

例えば、下のコードは、 `"Q"` と `"W"` が同時に押されたときに `alert` を表示します(任意の言語で、CapsLockの有無にかかわらず)。
=======
# Extended hotkeys

Create a function `runOnKeys(func, code1, code2, ... code_n)` that runs `func` on simultaneous pressing of keys with codes `code1`, `code2`, ..., `code_n`.

For instance, the code below shows `alert` when `"Q"` and `"W"` are pressed together (in any language, with or without CapsLock)
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js no-beautify
runOnKeys(
  () => alert("Hello!"),
  "KeyQ",
  "KeyW"
);
```

[demo src="solution"]
