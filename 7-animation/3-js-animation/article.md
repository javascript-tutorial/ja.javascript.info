# JavaScript アニメーション

JavaScript アニメーションは CSS ではできないことを扱うことができます。

例えば、ベジェ曲線とは異なるタイミング関数を用いて複雑な経路に沿って移動したり、canvas 上でのアニメーションです。

## Using setInterval

An animation can be implemented as a sequence of frames -- usually small changes to HTML/CSS properties.

<<<<<<< HEAD:7-animation/3-js-animation/article.md
HTML/CSS の観点からは、アニメーションはスタイルプロパティの段階的な変更です。例えば、`style.left` を `0px` から `100px` に変更すると、要素が移動します。

そして、もしそれを `setInterval` の中で増加させるとき、毎秒 50 回の小さな変更を加えることによって、その変化はなめらかに見えます。これは映画館と同じ原理です。: 毎秒 24 以上のフレームがあれば十分に滑らかに見えます。
=======
For instance, changing `style.left` from `0px` to `100px` moves the element. And if we increase it in `setInterval`, changing by `2px` with a tiny delay, like 50 times per second, then it looks smooth. That's the same principle as in the cinema: 24 frames per second is enough to make it look smooth.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09:7-animation/3-js-animation/article.md

疑似コードは次のようになります:

```js
<<<<<<< HEAD:7-animation/3-js-animation/article.md
let delay = 1000 / 50; // 1 秒で 50 フレーム
=======
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09:7-animation/3-js-animation/article.md
let timer = setInterval(function() {
  if (animation complete) clearInterval(timer);
  else increase style.left by 2px
}, 20); // change by 2px every 20ms, about 50 frames per second
```

より複雑なアニメーションの例:

```js
let start = Date.now(); // 開始時間を覚える

let timer = setInterval(function() {
  // 開始からの経過時間は？
  let timePassed = Date.now() - start;

  if (timePassed >= 2000) {
    clearInterval(timer); // 2秒後にアニメーションが終了
    return;
  }

  // timePassed 時点のアニメーションを描画
  draw(timePassed);

}, 20);

// timePassed は 0 から 2000 まで進む
// なので、left は 0px から 400px になります
function draw(timePassed) {
  train.style.left = timePassed / 5 + 'px';
}
```

デモです。電車をクリックしてみてください:

[codetabs height=200 src="move"]

## Using requestAnimationFrame

複数のアニメーションが同時に実行されているとしましょう。

<<<<<<< HEAD:7-animation/3-js-animation/article.md
もしそれらを別々に実行し、それぞれが個別に `setInterval(..., 20)` を持っていると、ブラウザは `20ms` 間隔よりもっと頻繁に再描画をする必要があります。

各 `setInterval` は `20ms` 毎に一回トリガしますが、独立しているので `20ms` の中に複数の独立した実行があることになります。

これらの複数の独立した再描画は、ブラウザを簡単にするためにグループ化すべきです。
=======
If we run them separately, then even though each one has `setInterval(..., 20)`, then the browser would have to repaint much more often than every `20ms`.

That's because they have different starting time, so "every 20ms" differs between different animations. The intervals are not aligned. So we'll have several independent runs within `20ms`.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09:7-animation/3-js-animation/article.md

言い換えると、これ:

```js
setInterval(function() {
  animate1();
  animate2();
  animate3();
}, 20)
```

<<<<<<< HEAD:7-animation/3-js-animation/article.md
...は以下よりも軽量です:
=======
...Is lighter than three independent calls:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09:7-animation/3-js-animation/article.md

```js
setInterval(animate1, 20); // independent animations
setInterval(animate2, 20); // in different places of the script
setInterval(animate3, 20);
```

<<<<<<< HEAD:7-animation/3-js-animation/article.md
考慮すべきことがもう1つあります。CPUが過負荷であったり、その他あまり頻繁に再描画しなくてよい場合があります。例えば、ブラウザのタブが非表示の場合、描画には全く意味がありません。

関数 `requestAnimationFrame` を提供する標準の [アニメーションタイミング](http://www.w3.org/TR/animation-timing/) があります。

この関数は、これらすべての問題及び、その他多くのことに対応しています。
=======
These several independent redraws should be grouped together, to make the redraw easier for the browser and hence load less CPU load and look smoother.

There's one more thing to keep in mind. Sometimes when CPU is overloaded, or there are other reasons to redraw less often (like when the browser tab is hidden), so we really shouldn't run it every `20ms`.

But how do we know about that in JavaScript? There's a specification [Animation timing](http://www.w3.org/TR/animation-timing/) that provides the function `requestAnimationFrame`. It addresses all these issues and even more.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09:7-animation/3-js-animation/article.md

構文:
```js
let requestId = requestAnimationFrame(callback)
```

これは、ブラウザがアニメーションをしたい最も近い時間に `callback` 関数を実行するようスケジューリングします。

もし `callback` の中で要素を変更すると、他の `requestAnimationFrame` コールバックや CSS アニメーションと一緒にグループ化されます。これにより、配置の再計算と再描画がそれぞれではなく1回でまとめて行われます。

返却値 `requestId` は呼び出しをキャンセルするのに使うことができます:
```js
// スケジューリングされたコールバックの実行をキャンセルする
cancelAnimationFrame(requestId);
```

`callback` は1つの引数を取ります -- ページロードの開始からの経過時間のマイクロ秒です。
この時間は [performance.now()](mdn:api/Performance/now) を呼び出すことでも得ることができます。

通常 `callback` は CPU が過負荷状態になったり、ノートパソコンのバッテリーがほとんどなかったり、その他別の理由がある場合を除きすぐに実行されます。

<<<<<<< HEAD:7-animation/3-js-animation/article.md
下のコードは `requestAnimationFrame` での最初の10回の実行時間を表示します。通常は 10-20ms です。
=======
The code below shows the time between first 10 runs for `requestAnimationFrame`. Usually it's 10-20ms:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09:7-animation/3-js-animation/article.md

```html run height=40 refresh
<script>
  let prev = performance.now();
  let times = 0;

  requestAnimationFrame(function measure(time) {
    document.body.insertAdjacentHTML("beforeEnd", Math.floor(time - prev) + " ");
    prev = time;

    if (times++ < 10) requestAnimationFrame(measure);
  })
</script>
```

## Structured animation

Now we can make a more universal animation function based on `requestAnimationFrame`:

```js
function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction)

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
```

Function `animate` accepts 3 parameters that essentially describes the animation:

`duration`
: Total time of animation. Like, `1000`.

`timing(timeFraction)`
: Timing function, like CSS-property `transition-timing-function` that gets the fraction of time that passed (`0` at start, `1` at the end) and returns the animation completion (like `y` on the Bezier curve).

    For instance, a linear function means that the animation goes on uniformly with the same speed:

    ```js
    function linear(timeFraction) {
      return timeFraction;
    }
    ```

    It's graph:
    ![](linear.png)

    That's just like `transition-timing-function: linear`. There are more interesting variants shown below.

`draw(progress)`
: The function that takes the animation completion state and draws it. The value `progress=0` denotes the beginning animation state, and `progress=1` -- the end state.

    This is that function that actually draws out the animation.

    It can move the element:
    ```js
    function draw(progress) {
      train.style.left = progress + 'px';
    }
    ```

    ...Or do anything else, we can animate anything, in any way.


Let's animate the element `width` from `0` to `100%` using our function.

Click on the element for the demo:

[codetabs height=60 src="width"]

The code for it:

```js
animate({
  duration: 1000,
  timing(timeFraction) {
    return timeFraction;
  },
  draw(progress) {
    elem.style.width = progress * 100 + '%';
  }
});
```

Unlike CSS animation, we can make any timing function and any drawing function here. The timing function is not limited by Bezier curves. And `draw` can go beyond properties, create new elements for like fireworks animation or something.

## Timing functions

We saw the simplest, linear timing function above.

Let's see more of them. We'll try movement animations with different timing functions to see how they work.

### Power of n

If we want to speed up the animation, we can use `progress` in the power `n`.

For instance, a parabolic curve:

```js
function quad(timeFraction) {
  return Math.pow(timeFraction, 2)
}
```

The graph:

![](quad.png)

See in action (click to activate):

[iframe height=40 src="quad" link]

...Or the cubic curve or event greater `n`. Increasing the power makes it speed up faster.

Here's the graph for `progress` in the power `5`:

![](quint.png)

In action:

[iframe height=40 src="quint" link]

### The arc

Function:

```js
function circ(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}
```

The graph:

![](circ.png)

[iframe height=40 src="circ" link]

### Back: bow shooting

This function does the "bow shooting". First we "pull the bowstring", and then "shoot".

Unlike previous functions, it depends on an additional parameter `x`, the "elasticity coefficient". The distance of "bowstring pulling" is defined by it.

The code:

```js
function back(x, timeFraction) {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}
```

**The graph for `x = 1.5`:**

![](back.png)

For animation we use it with a specific value of `x`. Example for `x = 1.5`:

[iframe height=40 src="back" link]

### Bounce

Imagine we are dropping a ball. It falls down, then bounces back a few times and stops.

The `bounce` function does the same, but in the reverse order: "bouncing" starts immediately. It uses few special coefficients for that:

```js
function bounce(timeFraction) {
  for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}
```

In action:

[iframe height=40 src="bounce" link]

### Elastic animation

One more "elastic" function that accepts an additional parameter `x` for the "initial range".

```js
function elastic(x, timeFraction) {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}
```

**The graph for `x=1.5`:**
![](elastic.png)

In action for `x=1.5`:

[iframe height=40 src="elastic" link]

## Reversal: ease*

So we have a collection of timing functions. Their direct application is called "easeIn".

Sometimes we need to show the animation in the reverse order. That's done with the "easeOut" transform.

### easeOut

In the "easeOut" mode the `timing` function is put into a wrapper `timingEaseOut`:

```js
timingEaseOut(timeFraction) = 1 - timing(1 - timeFraction)
```

In other words, we have a "transform" function `makeEaseOut` that takes a "regular" timing function and returns the wrapper around it:

```js
// accepts a timing function, returns the transformed variant
function makeEaseOut(timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}
```

For instance, we can take the `bounce` function described above and apply it:

```js
let bounceEaseOut = makeEaseOut(bounce);
```

Then the bounce will be not in the beginning, but at the end of the animation. Looks even better:

[codetabs src="bounce-easeout"]

Here we can see how the transform changes the behavior of the function:

![](bounce-inout.png)

If there's an animation effect in the beginning, like bouncing -- it will be shown at the end.

In the graph above the <span style="color:#EE6B47">regular bounce</span> has the red color, and the <span style="color:#62C0DC">easeOut bounce</span> is blue.

- Regular bounce -- the object bounces at the bottom, then at the end sharply jumps to the top.
- After `easeOut` -- it first jumps to the top, then bounces there.

### easeInOut

We also can show the effect both in the beginning and the end of the animation. The transform is called "easeInOut".

Given the timing function, we calculate the animation state like this:

```js
if (timeFraction <= 0.5) { // first half of the animation
  return timing(2 * timeFraction) / 2;
} else { // second half of the animation
  return (2 - timing(2 * (1 - timeFraction))) / 2;
}
```

The wrapper code:

```js
function makeEaseInOut(timing) {
  return function(timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}

bounceEaseInOut = makeEaseInOut(bounce);
```

In action, `bounceEaseInOut`:

[codetabs src="bounce-easeinout"]

The "easeInOut" transform joins two graphs into one: `easeIn` (regular) for the first half of the animation and `easeOut` (reversed) -- for the second part.

The effect is clearly seen if we compare the graphs of `easeIn`, `easeOut` and `easeInOut` of the `circ` timing function:

![](circ-ease.png)

- <span style="color:#EE6B47">Red</span> is the regular variantof `circ` (`easeIn`).
- <span style="color:#8DB173">Green</span> -- `easeOut`.
- <span style="color:#62C0DC">Blue</span> -- `easeInOut`.

As we can see, the graph of the first half of the animation is the scaled down `easeIn`, and the second half is the scaled down `easeOut`. As a result, the animation starts and finishes with the same effect.

## More interesting "draw"

Instead of moving the element we can do something else. All we need is to write the write the proper `draw`.

Here's the animated "bouncing" text typing:

[codetabs src="text"]

## Summary

For animations that CSS can't handle well, or those that need tight control, JavaScript can help. JavaScript animations should be implemented via `requestAnimationFrame`. That built-in method allows to setup a callback function to run when the browser will be preparing a repaint. Usually that's very soon, but the exact time depends on the browser.

When a page is in the background, there are no repaints at all, so the callback won't run: the animation will be suspended and won't consume resources. That's great.

Here's the helper `animate` function to setup most animations:

```js
function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
```

Options:

- `duration` -- the total animation time in ms.
- `timing` -- the function to calculate animation progress. Gets a time fraction from 0 to 1, returns the animation progress, usually from 0 to 1.
- `draw` -- the function to draw the animation.

Surely we could improve it, add more bells and whistles, but JavaScript animations are not applied on a daily basis. They are used to do something interesting and non-standard. So you'd want to add the features that you need when you need them.

JavaScript animations can use any timing function. We covered a lot of examples and transformations to make them even more versatile. Unlike CSS, we are not limited to Bezier curves here.

The same is about `draw`: we can animate anything, not just CSS properties.
