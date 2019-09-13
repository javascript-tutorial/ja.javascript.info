ここでの良い選択肢は `WeakSet` です:

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// 2つのメッセージは読まれました
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages は2つの要素を持っています

// ...再び最初のメッセージを読みましょう!
readMessages.add(messages[0]);
// readMessages は依然として2つのユニークな要素をもっています

// 答え: message[0] は読んだ?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// これで readMessages の要素は1つです(技術的にはメモリは後ほどクリーンされるかもしれません)
```

`WeakSet` でメッセージのセットを格納し、その中でメッセージの存在を簡単に確認することができます。

それは自動的に自身をクリーンアップします。トレードオフはそれをイテレートすることができないことです。私たちは直接 "すべての既読メッセージ" を取得することができません。しかし、すべての messages をイテレートし、set 中のものをフィルタリングすることでそれを実現できます。

P.S メッセージが誰か他の人のコードで管理されている場合、各メッセージに同時のプロパティを追加することは危険です。が、衝突を回避するためにシンボルでそれをすることができます。

このようになります:
```js
// シンボリックプロパティは我々のコードだけが知っています
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

これで、たとえ他のコードがメッセージプロパティのために `for..in` ループを使っても、隠しフラグは表示されません。
