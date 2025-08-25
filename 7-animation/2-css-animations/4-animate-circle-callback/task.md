
<<<<<<< HEAD
# コールバック付きのアニメーション化された円

タスク <info:task/animate-circle> には、アニメーションで大きくなる円があります。

今、ただの円ではなくその中にメッセージを表示する必要があるとしましょう。メッセージはアニメーションが完了した(円が完全に大きくなった) *後* に出現させたほうが良いです。そうでないと醜いためです。

このタスクの解答では、関数 `showCircle(cx, cy, radius)` が円を描きます。が、いつ準備ができたかを追跡する方法は提供していません。

アニメーションが完了したときに呼ばれるコールバック引数を追加してください: `showCircle(cx, cy, radius, callback)`。 `callback` は引数として円の `<div>` を受け取ります。

例:
=======
# Animated circle with callback

In the task <info:task/animate-circle> an animated growing circle is shown.

Now let's say we need not just a circle, but to show a message inside it. The message should appear *after* the animation is complete (the circle is fully grown), otherwise it would look ugly.

In the solution of the task, the function `showCircle(cx, cy, radius)` draws the circle, but gives no way to track when it's ready.

Add a callback argument: `showCircle(cx, cy, radius, callback)` to be called when the animation is complete. The `callback` should receive the circle `<div>` as an argument.

Here's the example:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

<<<<<<< HEAD
デモ:

[iframe src="solution" height=260]

タスク <info:task/animate-circle>　の解答を、このタスクのベースに使ってください。
=======
Demo:

[iframe src="solution" height=260]

Take the solution of the task <info:task/animate-circle> as the base.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
