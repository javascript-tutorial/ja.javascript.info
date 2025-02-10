<<<<<<< HEAD
タスク <info:task/animate-ball> では、アニメーションするプロパティは1つだけでした。ここではもう1つ必要です。:`elem.style.left`.

水平座標は別の法則("バウンド" ではなく、徐々にボールを右にシフトする)で変化します。

そのため、もう一つの `animate` を記述します。

時間関数として `linear` も使えますが、`makeEaseOut(quad)` などの方がはるかによく見えます。

コード:
=======
In the task <info:task/animate-ball> we had only one property to animate. Now we need one more: `elem.style.left`.

The horizontal coordinate changes by another law: it does not "bounce", but gradually increases shifting the ball to the right.

We can write one more `animate` for it.

As the time function we could use `linear`, but something like `makeEaseOut(quad)` looks much better.

The code:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
let height = field.clientHeight - ball.clientHeight;
let width = 100;

// animate top (bouncing)
animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw: function(progress) {
    ball.style.top = height * progress + 'px'
  }
});

// animate left (moving to the right)
animate({
  duration: 2000,
  timing: makeEaseOut(quad),
  draw: function(progress) {
    ball.style.left = width * progress + "px"
  }
});
```
