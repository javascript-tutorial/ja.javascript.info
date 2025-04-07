
<<<<<<< HEAD
# promise でのアニメーション付きサークル

タスク <info:task/animate-circle-callback> の解答にある `showCircle` 関数を、コールバックを受ける代わりに promise を返すように書き直してください。

新しい使い方:
=======
# Animated circle with promise

Rewrite the `showCircle` function in the solution of the task <info:task/animate-circle-callback> so that it returns a promise instead of accepting a callback.

The new usage:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

<<<<<<< HEAD
このタスクのベースとして、タスク <info:task/animate-circle-callback> の解答を利用してください。
=======
Take the solution of the task <info:task/animate-circle-callback> as the base.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
