<<<<<<< HEAD
ここでの良い選択肢は `WeakSet` です:

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
=======
Let's store read messages in `WeakSet`:

```js run
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
];

let readMessages = new WeakSet();

<<<<<<< HEAD
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
=======
// two messages have been read
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages has 2 elements

// ...let's read the first message again!
readMessages.add(messages[0]);
// readMessages still has 2 unique elements

// answer: was the message[0] read?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// now readMessages has 1 element (technically memory may be cleaned later)
```

The `WeakSet` allows to store a set of messages and easily check for the existence of a message in it.

It cleans up itself automatically. The tradeoff is that we can't iterate over it,  can't get "all read messages" from it directly. But we can do it by iterating over all messages and filtering those that are in the set.

Another, different solution could be to add a property like `message.isRead=true` to a message after it's read. As messages objects are managed by another code, that's generally discouraged, but we can use a symbolic property to avoid conflicts.

Like this:
```js
// the symbolic property is only known to our code
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

<<<<<<< HEAD
これで、たとえ他のコードがメッセージプロパティのために `for..in` ループを使っても、隠しフラグは表示されません。
=======
Now third-party code probably won't see our extra property.

Although symbols allow to lower the probability of problems, using `WeakSet` is better from the architectural point of view.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
