importance: 5

---

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

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/task.md
P.P.S. 私たちはメッセージオブジェクトを直接変更すべきではありません。ほかの誰かのコードによって管理されている場合、余分なプロパティの追加は悪い結果になる可能性があります。
=======
P.P.S. We shouldn't modify message objects, add our properties to them. As they are managed by someone else's code, that may lead to bad consequences.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/task.md
