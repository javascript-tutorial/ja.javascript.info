
# promise でのアニメーション付きサークル

タスク <info:task/animate-circle-callback> の解答にある `showCircle` 関数を、コールバックを受ける代わりに promise を返すように書き直してください。

新しい使い方:

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

このタスクのベースとして、タスク <info:task/animate-circle-callback> の解答を利用してください。
