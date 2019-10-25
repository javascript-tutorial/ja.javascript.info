バウンドさせるには、`position:relative` をもつフィールド内のボールに対して、CSS プロパティ `top` と `position:absolute` を使うことで実現できます。

フィールドの下部の座標は `field.clientHeight` です。しかし、`top` プロパティはボール上部の座標のため、下端の位置は `field.clientHeight - ball.clientHeight` になります。

したがって、`top` を `0` から `field.clientHeight - ball.clientHeight` までアニメートします。

あとは、"バウンド" 効果を行うためにタイミング関数 `bounce` を `easeOut` モードで使います。

これがアニメーションの最終的なコードです:

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
