<<<<<<< HEAD
# CSS アニメーション

CSS アニメーションは JavaScript を使うことなく簡単なアニメーションを行うことができます。

JavaScript を利用することで、CSS アニメーションを制御し、少しのコードでより優れたものにすることができます。

[cut]

## CSS のトランジション 

CSS トランジションの考えはシンプルです。これから、そのプロパティとその変化がどのようにアニメーション化されるかを説明します。プロパティが変更されると、ブラウザはアニメーションを描写します。

つまり: 必要なことはプロパティを変更することだけです。そして滑らかなトランジションはブラウザによって行われます。

例えば、下の CSS は `background-color` の変化を 3秒間アニメーション化します。:
=======
# CSS-animations

CSS animations make it possible to do simple animations without JavaScript at all.

JavaScript can be used to control CSS animations and make them even better, with little code.

## CSS transitions [#css-transition]

The idea of CSS transitions is simple. We describe a property and how its changes should be animated. When the property changes, the browser paints the animation.

That is, all we need is to change the property, and the fluid transition will be done by the browser.

For instance, the CSS below animates changes of `background-color` for 3 seconds:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```css
.animated {
  transition-property: background-color;
  transition-duration: 3s;
}
```

<<<<<<< HEAD
今、ある要素が `.animated` クラスを持っている場合、`background-color` の変更は3秒間でアニメーションされます。

下のボタンをクリックして、背景をアニメーションさせてみてください。:
=======
Now if an element has `.animated` class, any change of `background-color` is animated during 3 seconds.

Click the button below to animate the background:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run autorun height=60
<button id="color">Click me</button>

<style>
  #color {
    transition-property: background-color;
    transition-duration: 3s;
  }
</style>

<script>
  color.onclick = function() {
    this.style.backgroundColor = 'red';
  };
</script>
```

<<<<<<< HEAD
CSS トランジションを記述するのに 4 つのプロパティがあります:
=======
There are 4 properties to describe CSS transitions:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`

<<<<<<< HEAD
この後説明していきますが、今の時点では、共通の `transition` プロパティは `property duration timing-function delay` の順番で一緒に宣言できること、複数のプロパティを一度にアニメーションすることができることに留意しておいてください。

例えば、このボタンは `color` と `font-size` をアニメーションします。:
=======
We'll cover them in a moment, for now let's note that the common `transition` property allows declaring them together in the order: `property duration timing-function delay`, as well as animating multiple properties at once.

For instance, this button animates both `color` and `font-size`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run height=80 autorun no-beautify
<button id="growing">Click me</button>

<style>
#growing {
*!*
  transition: font-size 3s, color 2s;
*/!*
}
</style>

<script>
growing.onclick = function() {
  this.style.fontSize = '36px';
  this.style.color = 'red';
};
</script>
```

<<<<<<< HEAD
ではアニメーションのプロパティを1つずつ見ていきましょう。

## transition-property

`transition-property` には、アニメーションするプロパティの一覧を記載します。例えば: `left`, `margin-left`, `height`, `color` です。

すべてのプロパティがアニメーションできるわけではありませんが、[それらの多くが可能です](http://www.w3.org/TR/css3-transitions/#animatable-properties-)。値 `all` は "すべてのプロパティをアニメートする" を意味します。

## transition-duration

`transition-duration` では、どのくらいの長さアニメーションをするかを指定することができます。時間は [CSS 時間形式](http://www.w3.org/TR/css3-values/#time) で表します: 秒は `s`, ミリ秒は `ms` です。

## transition-delay

`transition-delay` では、アニメーションする *前* の遅延を指定することができます。例えば、`transition-delay: 1s` を指定した場合、アニメーションはある変更の1秒後に始まります。

負の値も可能です。その場合、アニメーションは途中から始まります。例えば、`transition-duration` が `2s` で、遅延が `-1s` の場合、アニメーションは1秒を取り、半分から開始します。

これは CSS `translate` プロパティを使って、`0` から `9` までの数字をシフトするアニメーションです:

[codetabs src="digits"]

`transform` プロパティは次のようにアニメーションされます:
=======
Now, let's cover animation properties one by one.

## transition-property

In `transition-property`, we write a list of properties to animate, for instance: `left`, `margin-left`, `height`, `color`. Or we could write `all`, which means "animate all properties".

Do note that, there are properties which can not be animated. However, [most of the generally used properties are animatable](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties).

## transition-duration

In `transition-duration` we can specify how long the animation should take. The time should be in [CSS time format](https://www.w3.org/TR/css3-values/#time): in seconds `s` or milliseconds `ms`.

## transition-delay

In `transition-delay` we can specify the delay *before* the animation. For instance, if `transition-delay` is `1s` and `transition-duration` is `2s`, then the animation starts 1 second after the property change and the total duration will be 2 seconds.

Negative values are also possible. Then the animation is shown immediately, but the starting point of the animation will be after given value (time). For example, if `transition-delay` is `-1s` and `transition-duration` is `2s`, then animation starts from the halfway point and total duration will be 1 second.

Here the animation shifts numbers from `0` to `9` using CSS `translate` property:

[codetabs src="digits"]

The `transform` property is animated like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```css
#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
}
```

<<<<<<< HEAD
上の例では、JavaScript は要素にクラス `.animate` を追加し -- それによりアニメーションを開始しています。:
=======
In the example above JavaScript adds the class `.animate` to the element -- and the animation starts:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
stripe.classList.add('animate');
```

<<<<<<< HEAD
"途中から" 始めることも可能です。負の値 `transition-delay` を使って、例えば、現在の秒数に対応する正確な数値から始めることができます。

ここでは、数字をクリックすると -- 現在の秒数からアニメーションが始まります。:

[codetabs src="digits-negative-delay"]

JavaScript は追加の行でそれをしています。:
=======
We could also start it from somewhere in the middle of the transition, from an exact number, e.g. corresponding to the current second, using a negative `transition-delay`.

Here if you click the digit -- it starts the animation from the current second:

[codetabs src="digits-negative-delay"]

JavaScript does it with an extra line:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
stripe.onclick = function() {
  let sec = new Date().getSeconds() % 10;
*!*
<<<<<<< HEAD
  // 例えば、ここで -3s は3番目からアニメーションを開始します
=======
  // for instance, -3s here starts the animation from the 3rd second
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  stripe.style.transitionDelay = '-' + sec + 's';
*/!*
  stripe.classList.add('animate');
};
```

## transition-timing-function

<<<<<<< HEAD
タイミング関数はアニメーションプロセスが時間と共にどのように広がっていくかを記述します。ゆっくりと始まりその急速に進む、またはその逆もありえます。

これは一見すると最も複雑なプロパティです。しかし少し時間をかけて見れば、非常に簡単のものになります。

このプロパティは2種類の値を受け取ります: ベジェ曲線またはステップです。より頻繁に使われる曲線から見ていきましょう。

### ベジェ曲線

タイミング関数は次の条件を満たす4つの制御点をもつ [ベジェ曲線](/bezier-curve) として設定できます。:

1. 最初の制御点: `(0,0)`.
2. 最後の制御点: `(1,1)`.
3. 中間点については、`x` の値は区間 `0..1` になければならず、`y` は何でも構いません。

CSS でのベジェ曲線の構文です: `cubic-bezier(x2, y2, x3, y3)`。
ここでは 2番目と3番目の制御点だけを指定します。なぜなら、最初の点は `(0,0)` 固定であり、4番目は `(1,1)` 固定だからです。

タイミング関数は時間の中でアニメーション処理がどのような速さで進むかを記述します。

- `x` 軸は時間です: `0` -- は開始時点、`1` -- は `transition-duration` の最後の瞬間です。
- `y` 軸は処理の完了を指定します: `0` -- はプロパティの開始値であり, `1` -- は終わりの値です。

最もシンプルなバリアントは、同じ線形の速度でアニメーションが均一に進む場合です。それは曲線 `cubic-bezier(0, 0, 1, 1)` として指定することができます。

これは、その曲線がどのように見えるかを示したものです:

![](bezier-linear.svg)

...ご覧の通り、単なる直線です。時間(`x`)が過ぎるに連れて、アニメーションの完了(`y`)は着実に `0` から `1` に進みます。

下の例にある電車は、左から右へ一定の速度で移動します(クリックしてみてください):

[codetabs src="train-linear"]

CSS `transition` はその曲線に基づいています:
=======
The timing function describes how the animation process is distributed along its timeline. Will it start slowly and then go fast, or vice versa.

It appears to be the most complicated property at first. But it becomes very simple if we devote a bit time to it.

That property accepts two kinds of values: a Bezier curve or steps. Let's start with the curve, as it's used more often.

### Bezier curve

The timing function can be set as a [Bezier curve](/bezier-curve) with 4 control points that satisfy the conditions:

1. First control point: `(0,0)`.
2. Last control point: `(1,1)`.
3. For intermediate points, the values of `x` must be in the interval `0..1`, `y` can be anything.

The syntax for a Bezier curve in CSS: `cubic-bezier(x2, y2, x3, y3)`. Here we need to specify only 2nd and 3rd control points, because the 1st one is fixed to `(0,0)` and the 4th one is `(1,1)`.

The timing function describes how fast the animation process goes.

- The `x` axis is the time: `0` -- the start, `1` -- the end of `transition-duration`.
- The `y` axis specifies the completion of the process: `0` -- the starting value of the property, `1` -- the final value.

The simplest variant is when the animation goes uniformly, with the same linear speed. That can be specified by the curve `cubic-bezier(0, 0, 1, 1)`.

Here's how that curve looks:

![](bezier-linear.svg)

...As we can see, it's just a straight line. As the time (`x`) passes, the completion (`y`) of the animation steadily goes from `0` to `1`.

The train in the example below goes from left to right with the permanent speed (click it):

[codetabs src="train-linear"]

The CSS `transition` is based on that curve:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
<<<<<<< HEAD
  /* JavaScript sets left to 450px */
}
```

...そして電車をスローダウンさせるにはどうすれば良いでしょうか？

別のベジェ曲線を使うことで実現できます: `cubic-bezier(0.0, 0.5, 0.5 ,1.0)`.

グラフは次のようになります:

![](train-curve.svg)

見てわかるように、処理は速く始まります: 曲線は高くなっていき、その後遅くなっていきます。

タイミング関数は次のように動作します(電車をクリックしてください):
=======
  /* click on a train sets left to 450px, thus triggering the animation */
}
```

...And how can we show a train slowing down?

We can use another Bezier curve: `cubic-bezier(0.0, 0.5, 0.5 ,1.0)`.

The graph:

![](train-curve.svg)

As we can see, the process starts fast: the curve soars up high, and then slower and slower.

Here's the timing function in action (click the train):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

[codetabs src="train"]

CSS:
```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, .5, .5, 1);
<<<<<<< HEAD
  /* JavaScript sets left to 450px */
}
```

いくつかの組み込みの曲線があります: `linear`, `ease`, `ease-in`, `ease-out` そして `ease-in-out` です。

`linear` は `cubic-bezier(0, 0, 1, 1)` を簡略したものです -- それは直線であり、先程見たものです。

その他の名前は以下の `cubic-bezier` の簡略表記です:
=======
  /* click on a train sets left to 450px, thus triggering the animation */
}
```

There are several built-in curves: `linear`, `ease`, `ease-in`, `ease-out` and `ease-in-out`.

The `linear` is a shorthand for `cubic-bezier(0, 0, 1, 1)` -- a straight line, which we described above.

Other names are shorthands for the following `cubic-bezier`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

| <code>ease</code><sup>*</sup> | <code>ease-in</code> | <code>ease-out</code> | <code>ease-in-out</code> |
|-------------------------------|----------------------|-----------------------|--------------------------|
| <code>(0.25, 0.1, 0.25, 1.0)</code> | <code>(0.42, 0, 1.0, 1.0)</code> | <code>(0, 0, 0.58, 1.0)</code> | <code>(0.42, 0, 0.58, 1.0)</code> |
| ![ease, figure](ease.svg) | ![ease-in, figure](ease-in.svg) | ![ease-out, figure](ease-out.svg) | ![ease-in-out, figure](ease-in-out.svg) |

<<<<<<< HEAD
`*` -- デフォルトでは、タイミング関数がない場合 `ease` が使用されます。

したがって、スローダウンする電車に対しては、`ease-out` を使うことができました。:
=======
`*` -- by default, if there's no timing function, `ease` is used.

So we could use `ease-out` for our slowing down train:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```css
.train {
  left: 0;
  transition: left 5s ease-out;
<<<<<<< HEAD
  /* transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

しかし、実際は少し異なって見えます。

**ベジェ曲線はアニメーションがその範囲から "飛び出す" ようにすることができます。**

曲線上の制御点は、負または巨大な値の `y` 座標を持つことができます。すると、ベジェ曲線も非常に低くまたは高くジャンプし、アニメーションが通常の範囲を超えます。

下の例のアニメーションコードは次の通りです:
=======
  /* same as transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

But it looks a bit differently.

**A Bezier curve can make the animation exceed its range.**

The control points on the curve can have any `y` coordinates: even negative or huge ones. Then the Bezier curve would also extend very low or high, making the animation go beyond its normal range.

In the example below the animation code is:

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
<<<<<<< HEAD
  /* JavaScript sets left to 400px */
}
```

プロパティ `left` は `100px` から `400px` までアニメーションするはずです。

しかし、電車をクリックすると、次のようになります:

- まず、電車は *バック* します: `left` は `100px` よりも小さくなります。
- 次に前に進み、`400px` よりも少し先に進みます。
- その後再びバックし -- `400px` になります。

[codetabs src="train-over"]

なぜこのようなことが起きるのでしょう？ -- 与えられたベジェ曲線を見れば明らかです:

![](bezier-train-over.svg)

2番目の `y` 座標がゼロより下に移動し、3番目の点は `1` を越えています。そのため、曲線は "通常" の象限から外れています。`y` は "標準" の範囲 `0..1` から外れています。

ご存知の通り、`y` は "アニメーション処理の完了" を表します。値 `y = 0` は開始プロパティ値に対応し、`y = 1` は -- 終わりの値に対応します。そのため、値 `y<0` はプロパティを開始時の `left` よりも小さい値に移動させ、`y>1` は -- 最後の `left` を越えます。

これは確実に "ソフトな" バリアントです。もし `y` の値を `-99` や `99` といった値にした場合、電車はその範囲から遥か遠くに飛び出します。

しかし、特定のタスクのためのベジェ曲線はどうやって作るのでしょう？そのための多くのツールがあります。例えば、<http://cubic-bezier.com/> などで行うことができます。

### Steps

タイミング関数 `steps(number of steps[, start/end])` はアニメーションをステップに分割することができます。

数字を使った例を見てみましょう。私たちは数字を滑らかではなく、離散的に変化させます。

そのために、アニメーションを 9 つのステップに分割します:
=======
  /* click on a train sets left to 450px */
}
```

The property `left` should animate from `100px` to `400px`.

But if you click the train, you'll see that:

- First, the train goes *back*: `left` becomes less than `100px`.
- Then it goes forward, a little bit farther than `400px`.
- And then back again -- to `400px`.

[codetabs src="train-over"]

Why it happens is pretty obvious if we look at the graph of the given Bezier curve:

![](bezier-train-over.svg)

We moved the `y` coordinate of the 2nd point below zero, and for the 3rd point we made it over `1`, so the curve goes out of the "regular" quadrant. The `y` is out of the "standard" range `0..1`.

As we know, `y` measures "the completion of the animation process". The value `y = 0` corresponds to the starting property value and `y = 1` -- the ending value. So values `y<0` move the property beyond the starting `left` and `y>1` -- past the final `left`.

That's a "soft" variant for sure. If we put `y` values like `-99` and `99` then the train would jump out of the range much more.

But how do we make a Bezier curve for a specific task? There are many tools.

- For instance, we can do it on the site <https://cubic-bezier.com>.
- Browser developer tools also have special support for Bezier curves in CSS:
    1. Open the developer tools with `key:F12` (Mac: `key:Cmd+Opt+I`).
    2. Select the `Elements` tab, then pay attention to the `Styles` sub-panel at the right side.
    3. CSS properties with a word `cubic-bezier` will have an icon before this word.
    4. Click this icon to edit the curve.


### Steps

The timing function `steps(number of steps[, start/end])` allows splitting an transition into multiple steps.

Let's see that in an example with digits.

Here's a list of digits, without any animations, just as a source:

[codetabs src="step-list"]

In the HTML, a stripe of digits is enclosed into a fixed-length `<div id="digits">`:

```html
<div id="digit">
  <div id="stripe">0123456789</div>
</div>
```

The `#digit` div has a fixed width and a border, so it looks like a red window.

We'll make a timer: the digits will appear one by one, in a discrete way.

To achieve that, we'll hide the `#stripe` outside of `#digit` using `overflow: hidden`, and then shift the `#stripe` to the left step-by-step.

There will be 9 steps, a step-move for each digit:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```css
#stripe.animate  {
  transform: translate(-90%);
  transition: transform 9s *!*steps(9, start)*/!*;
}
```

<<<<<<< HEAD
`steps(9, start)` の動作です:

[codetabs src="step"]

最初の `steps` の引数はステップの数です。変換は 9 つのパートに分割されます(それぞれ 10%)。時間間隔も同様に分割されます: 9秒は1秒間隔になります。

2つ目の引数は `start` または `end` いずれかの単語です。

`start` はアニメーション開始時にすぐに最初のステップを行うことを意味します。

アニメーションでそれが確認できます。数字をクリックすると、すぐに `1` (最初のステップ) に変わり、以降は次の秒のはじめに変化していきます。

プロセスはこのように処理されます:

- `0s` -- `-10%` (1秒目の頭で最初の変更がされます, 開始直後)
- `1s` -- `-20%`
- ...
- `8s` -- `-80%`
- (最後の秒は最後の値を表示します)。

もう1つの値 `end` は、変化は各秒の最初ではなく最後に適用されるようにすることを意味します。

したがって、処理は次のように進みます:

- `0s` -- `0`
- `1s` -- `-10%` (最初の変更は1秒目の最後です)
=======
The first argument of `steps(9, start)` is the number of steps. The transform will be split into 9 parts (10% each). The time interval is automatically divided into 9 parts as well, so `transition: 9s` gives us 9 seconds for the whole animation – 1 second per digit.

The second argument is one of two words: `start` or `end`.

The `start` means that in the beginning of animation we need to make the first step immediately.

In action:

[codetabs src="step"]

A click on the digit changes it to `1` (the first step) immediately, and then changes in the beginning of the next second.

The process is progressing like this:

- `0s` -- `-10%` (first change in the beginning of the 1st second, immediately)
- `1s` -- `-20%`
- ...
- `8s` -- `-90%`
- (the last second shows the final value).

Here, the first change was immediate because of `start` in the `steps`.

The alternative value `end` would mean that the change should be applied not in the beginning, but at the end of each second.

So the process for `steps(9, end)` would go like this:

- `0s` -- `0` (during the first second nothing changes)
- `1s` -- `-10%` (first change at the end of the 1st second)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
- `2s` -- `-20%`
- ...
- `9s` -- `-90%`

<<<<<<< HEAD
`steps(9, end)` の動作です:

[codetabs src="step-end"]

簡略表記もあります:

- `step-start` -- は `steps(1, start)` と同じです。つまり、アニメーションはすぐに始まり、ステップは1つです。なので、これは開始後すぐに終わり、まるでアニメーションがないかのように見えます。
- `step-end` -- は `steps(1, end)` と同じです。: `transition-duration` の終わりに単一ステップのアニメーションを行います。

これらの値はほとんど使われません。なぜなら、実際にはアニメーションではなく、単なる単一ステップの変更だからです。

## transitionend イベント

CSS アニメーションが終了すると、`transitionend` イベントがトリガされます。

これはアニメーション完了後になにかをするのに広く使われています。また、アニメーションを付け加える事もできます。

例えば、下の例にある船は、クリックで往復し始めます。時間が経つごとにどんどん右に行きます。

[iframe src="boat" height=300 edit link]

アニメーションは関数 `go` によって開始され、遷移が終了して方向を反転する度に `go` が再実行されます:
=======
Here's `steps(9, end)` in action (note the pause before the first digit change):

[codetabs src="step-end"]

There are also some pre-defined shorthands for `steps(...)`:

- `step-start` -- is the same as `steps(1, start)`. That is, the animation starts immediately and takes 1 step. So it starts and finishes immediately, as if there were no animation.
- `step-end` -- the same as `steps(1, end)`: make the animation in a single step at the end of `transition-duration`.

These values are rarely used, as they represent not a real animation, but rather a single-step change. We mention them here for completeness.

## Event: "transitionend"

When the CSS animation finishes, the `transitionend` event triggers.

It is widely used to do an action after the animation is done. Also we can join animations.

For instance, the ship in the example below starts to sail there and back when clicked, each time farther and farther to the right:

[iframe src="boat" height=300 edit link]

The animation is initiated by the function `go` that re-runs each time the transition finishes, and flips the direction:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
<<<<<<< HEAD
      // 右に進みます
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // 左に進みます
=======
      // sail to the right
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // sail to the left
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
      boat.classList.add('back');
      boat.style.marginLeft = 100 * times - 200 + 'px';
    }

  }

  go();

  boat.addEventListener('transitionend', function() {
    times++;
    go();
  });
};
```

<<<<<<< HEAD
`transitionend` のイベントオブジェクトはいくつかのプロパティを持っています。:

`event.propertyName`
: アニメーションを終了したプロパティ。複数のプロパティを同時にアニメーションした場合に便利です。

`event.elapsedTime`
: `transition-delay` を除く、アニメーションの時間(秒単位)。

## キーフレーム(keyframes)

`@keyframes` という CSS のルールを使用して、複数の簡単なアニメーションを一緒に動作させることができます。

この方法では、アニメーションの "名前" と、何を/いつ/どこでアニメーションさせるかのルールを指定します。その後、`animation` プロパティを使ってアニメーションと要素の紐づけを行い、追加のパラメータを指定していきます。

これは説明付きの例です:
=======
The event object for `transitionend` has a few specific properties:

`event.propertyName`
: The property that has finished animating. Can be good if we animate multiple properties simultaneously.

`event.elapsedTime`
: The time (in seconds) that the animation took, without `transition-delay`.

## Keyframes

We can join multiple simple animations together using the `@keyframes` CSS rule.

It specifies the "name" of the animation and rules - what, when and where to animate. Then using the `animation` property, we can attach the animation to the element and specify additional parameters for it.

Here's an example with explanations:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run height=60 autorun="no-epub" no-beautify
<div class="progress"></div>

<style>
*!*
<<<<<<< HEAD
  @keyframes go-left-right {        /* 名前を指定します: "go-left-right" */
    from { left: 0px; }             /* left: 0px からアニメーションを開始します */
    to { left: calc(100% - 50px); } /* left: 100%-50px までアニメーションします */
=======
  @keyframes go-left-right {        /* give it a name: "go-left-right" */
    from { left: 0px; }             /* animate from left: 0px */
    to { left: calc(100% - 50px); } /* animate to left: 100%-50px */
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
*/!*

  .progress {
*!*
    animation: go-left-right 3s infinite alternate;
<<<<<<< HEAD
    /* アニメーション "go-left-right" を要素に適用します
       期間は 3 秒 (3s)
       回数: 無限 (infinite)
       順方向/逆方向を毎回交互に (alternate)
=======
    /* apply the animation "go-left-right" to the element
       duration 3 seconds
       number of times: infinite
       alternate direction every time
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    */
*/!*

    position: relative;
    border: 2px solid green;
    width: 50px;
    height: 20px;
    background: lime;
  }
</style>
```

<<<<<<< HEAD
`@keyframes` や [詳細な仕様](https://drafts.csswg.org/css-animations/) について多くの記事があります。

ただし、あなたのサイト上で常に動いているものがない限り、恐らく `@keyframes` を頻繁に必要とはしないでしょう。

## サマリ

CSS アニメーションは、1つ以上の CSS プロパティの変更をなめらかにアニメーション化できます。

これはほとんどのアニメーションのタスクに適しています。なお、アニメーションに JavaScript を使うこともできます。次のチャプターではそれを見ていきます。

JavaScript アニメーションと比較した場合の CSS アニメーションの制限は次の通りです:

```compare plus="CSS animations" minus="JavaScript animations"
+ 簡単なことは簡単にできます。
+ CPU に対し高速であり軽量です。
- JavaScript アニメーションは柔軟です。 要素の "爆発" のような任意のアニメーションロジックを実装することができます。
- 単なるプロパティの変更ではありません。JavaScript ではアニメーション目的で新しい要素を作成すると言ったことが可能です。
```

大部分のアニメーションはこのチャプターで説明した CSS を使用して実装することができます。そして `transitionend` イベントはアニメーションの後に JavaScript を実行することができるので、コードともうまく統合できます。

しかし、次のチャプターではより複雑なケースを取り扱うため、 JavaScript アニメーションをいくつか見ていきます。
=======
There are many articles about `@keyframes` and a [detailed specification](https://drafts.csswg.org/css-animations/).

You probably won't need `@keyframes` often, unless everything is in constant motion on your sites.

## Performance

Most CSS properties can be animated, because most of them are numeric values. For instance, `width`, `color`, `font-size` are all numbers. When you animate them, the browser gradually changes these numbers frame by frame, creating a smooth effect.

However, not all animations will look as smooth as you'd like, because different CSS properties cost differently to change.

In more technical details, when there's a style change, the browser goes through 3 steps to render the new look:

1. **Layout**: re-compute the geometry and position of each element, then
2. **Paint**: re-compute how everything should look like at their places, including background, colors,
3. **Composite**: render the final results into pixels on screen, apply CSS transforms if they exist.

During a CSS animation, this process repeats every frame. However, CSS properties that never affect geometry or position, such as `color`, may skip the Layout step. If a `color` changes, the browser  doesn't calculate any new geometry, it goes to Paint -> Composite. And there are few properties that directly go to Composite. You can find a longer list of CSS properties and which stages they trigger at <https://csstriggers.com>.

The calculations may take time, especially on pages with many elements and a complex layout. And the delays are actually visible on most devices, leading to "jittery", less fluid animations.

Animations of properties that skip the Layout step are faster. It's even better if Paint is skipped too.

The `transform` property is a great choice, because:
- CSS transforms affect the target element box as a whole (rotate, flip, stretch, shift it).
- CSS transforms never affect neighbour elements.

...So browsers apply `transform` "on top" of existing Layout and Paint calculations, in the Composite stage.

In other words, the browser calculates the Layout (sizes, positions), paints it with colors, backgrounds, etc at the Paint stage, and then applies `transform` to element boxes that need it.

Changes (animations) of the `transform` property never trigger Layout and Paint steps. More than that, the browser  leverages the graphics accelerator (a special chip on the CPU or graphics card) for CSS transforms, thus making them very efficient.

Luckily, the `transform` property is very powerful. By using `transform` on an element, you could rotate and flip it, stretch and shrink it, move it around, and [much more](https://developer.mozilla.org/docs/Web/CSS/transform#syntax). So instead of `left/margin-left` properties we can use `transform: translateX(…)`, use `transform: scale` for increasing element size, etc.

The `opacity` property also never triggers Layout (also skips Paint in Mozilla Gecko). We can use it for show/hide or fade-in/fade-out effects.

Paring `transform` with `opacity` can usually solve most of our needs, providing fluid, good-looking animations.

For example, here clicking on the `#boat` element adds the class with `transform: translateX(300)` and `opacity: 0`, thus making it move `300px` to the right and disappear:

```html run height=260 autorun no-beautify
<img src="https://js.cx/clipart/boat.png" id="boat">

<style>
#boat {
  cursor: pointer;
  transition: transform 2s ease-in-out, opacity 2s ease-in-out;
}

.move {
  transform: translateX(300px);
  opacity: 0;
}
</style>
<script>
  boat.onclick = () => boat.classList.add('move');
</script>
```

Here's a more complex example, with `@keyframes`:

```html run height=80 autorun no-beautify
<h2 onclick="this.classList.toggle('animated')">click me to start / stop</h2>
<style>
  .animated {
    animation: hello-goodbye 1.8s infinite;
    width: fit-content;
  }
  @keyframes hello-goodbye {
    0% {
      transform: translateY(-60px) rotateX(0.7turn);
      opacity: 0;
    }
    50% {
      transform: none;
      opacity: 1;
    }
    100% {
      transform: translateX(230px) rotateZ(90deg) scale(0.5);
      opacity: 0;
    }
  }
</style>
```

## Summary

CSS animations allow smoothly (or step-by-step) animated changes of one or multiple CSS properties.

They are good for most animation tasks. We're also able to use JavaScript for animations, the next chapter is devoted to that.

Limitations of CSS animations compared to JavaScript animations:

```compare plus="CSS animations" minus="JavaScript animations"
+ Simple things done simply.
+ Fast and lightweight for CPU.
- JavaScript animations are flexible. They can implement any animation logic, like an "explosion" of an element.
- Not just property changes. We can create new elements in JavaScript as part of the animation.
```

In early examples in this chapter, we animate `font-size`, `left`, `width`, `height`, etc. In real life projects, we should use `transform: scale()` and `transform: translate()` for better performance.

The majority of animations can be implemented using CSS as described in this chapter. And the `transitionend` event allows JavaScript to be run after the animation, so it integrates fine with the code.

But in the next chapter we'll do some JavaScript animations to cover more complex cases.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
