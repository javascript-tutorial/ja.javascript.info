
# コールバック付きのアニメーション化された円

タスク <info:task/animate-circle> には、アニメーションで大きくなる円があります。

今、ただの円ではなくその中にメッセージを表示する必要があるとしましょう。メッセージはアニメーションが完了した(円が完全に大きくなった) *後* に出現させたほうが良いです。そうでないと醜いためです。

このタスクの解答では、関数 `showCircle(cx, cy, radius)` が円を描きます。が、いつ準備ができたかを追跡する方法は提供していません。

アニメーションが完了したときに呼ばれるコールバック引数を追加してください: `showCircle(cx, cy, radius, callback)`。 `callback` は引数として円の `<div>` を受け取ります。

例:

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

デモ:

[iframe src="solution" height=260]

タスク <info:task/animate-circle>　の解答を、このタスクのベースに使ってください。
