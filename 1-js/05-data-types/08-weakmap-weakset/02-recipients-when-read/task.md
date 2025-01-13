importance: 5

---

<<<<<<< HEAD
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
=======
# Store read dates

There's an array of messages as in the [previous task](info:task/recipients-read). The situation is similar.

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

The question now is: which data structure you'd suggest to store the information: "when the message was read?".

In the previous task we only needed to store the "yes/no" fact. Now we need to store the date, and it should only remain in memory until the message is garbage collected.

P.S. Dates can be stored as objects of built-in `Date` class, that we'll cover later.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
