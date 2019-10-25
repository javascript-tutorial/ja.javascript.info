タスク <info:task/animate-ball> では、アニメーションするプロパティは1つだけでした。ここではもう1つ必要です。:`elem.style.left`.

水平座標は別の法則("バウンド" ではなく、徐々にボールを右にシフトする)で変化します。

そのため、もう一つの `animate` を記述します。

時間関数として `linear` も使えますが、`makeEaseOut(quad)` などの方がはるかによく見えます。

コード:

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
