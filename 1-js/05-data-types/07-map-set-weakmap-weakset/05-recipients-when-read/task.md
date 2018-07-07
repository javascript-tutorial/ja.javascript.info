importance: 5

---

# 読んだ日付を格納する

[前のタスク](info:task/recipients-read)のメッセージ配列があります。状況は似ています。

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];
```

この問題: "いつメッセージが読まれたか" という情報を格納するのにあなたが提案するのはどのようなデータ構造ですか？

前のタスクでは、"既読/未読" の事実の保持だけが必要でした。今度は日付を保存する必要があります。なお、前と同じようにメッセージが削除されたら現れないでください。
