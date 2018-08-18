importance: 5

---

# ノートを内部に配置する (absolute)

前のタスク <info:task/position-at-absolute> を拡張してください: 関数 `positionAt(anchor, position, elem)` に、 `anchor` の内側に `elem` を挿入するよう教えてください。

`position` のための新しい値:

- `top-out`, `right-out`, `bottom-out` -- 前と同じように動作し、`elem` を `anchor` の上/右/下に挿入します。
- `top-in`, `right-in`, `bottom-in` -- `anchor` の内側に `elem` を挿入します。: 上/右/下端に取り付けます。

例:

```js
// blockquote の上にノートを表示します
positionAt(blockquote, "top-out", note);

// blockquote の内側の先頭にノートを表示します
positionAt(blockquote, "top-in", note);
```

結果:

[iframe src="solution" height="310" border="1" link]

ソースコードとして、タスク <info:task/position-at-absolute> の解決策を使ってください。
