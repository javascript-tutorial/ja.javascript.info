<<<<<<< HEAD
バウンドさせるには、`position:relative` をもつフィールド内のボールに対して、CSS プロパティ `top` と `position:absolute` を使うことで実現できます。

フィールドの下部の座標は `field.clientHeight` です。しかし、`top` プロパティはボール上部の座標のため、下端の位置は `field.clientHeight - ball.clientHeight` になります。

したがって、`top` を `0` から `field.clientHeight - ball.clientHeight` までアニメートします。

あとは、"バウンド" 効果を行うためにタイミング関数 `bounce` を `easeOut` モードで使います。

これがアニメーションの最終的なコードです:
=======
To bounce we can use CSS property `top` and `position:absolute` for the ball inside the field with `position:relative`.

The bottom coordinate of the field is `field.clientHeight`. The CSS `top` property refers to the upper edge of the ball. So it should go from `0` till `field.clientHeight - ball.clientHeight`, that's the final lowest position of the upper edge of the ball.

To get the "bouncing" effect we can use the timing function `bounce` in `easeOut` mode.

Here's the final code for the animation:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js
let to = field.clientHeight - ball.clientHeight;

animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw(progress) {
    ball.style.top = to * progress + 'px'
  }
});
```
