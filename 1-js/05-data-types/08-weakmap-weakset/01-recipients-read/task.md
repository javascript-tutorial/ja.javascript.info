importance: 5

---

<<<<<<< HEAD
# "未既読" フラグを格納する

メッセージの配列があります:

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];
```

あなたのコードでそれにアクセスできますが、メッセージは他の誰かのコードで管理されています。そのコードによって新しいメッセージが追加され、古いものが定期的に削除されます。そして、あなたはそれが発生する正確なタイミングを知りません。

今、メッセージを "読んだ" かの情報を格納するために使えるのはどのデータ構造でしょうか？その構造は与えられたメッセージオブジェクトに対して、"読んだか？" という解答を与えるのに適したものでなければなりません。

P.S メッセージが `messages` から削除されたとき、あなたの構造からも同様に消える必要があります。

P.P.S. 私たちはメッセージオブジェクトを直接変更すべきではありません。ほかの誰かのコードによって管理されている場合、余分なプロパティの追加は悪い結果になる可能性があります。
=======
# Store "unread" flags

There's an array of messages:

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

Your code can access it, but the messages are managed by someone else's code. New messages are added, old ones are removed regularly by that code, and you don't know the exact moments when it happens.

Now, which data structure could you use to store information about whether the message "has been read"? The structure must be well-suited to give the answer "was it read?" for the given message object.

P.S. When a message is removed from `messages`, it should disappear from your structure as well.

P.P.S. We shouldn't modify message objects, add our properties to them. As they are managed by someone else's code, that may lead to bad consequences.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
