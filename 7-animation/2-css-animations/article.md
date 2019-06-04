# CSS アニメーション

CSS アニメーションは JavaScript を使うことなく簡単なアニメーションを行うことができます。

JavaScript を利用することで、CSS アニメーションを制御し、少しのコードでより優れたものにすることができます。

[cut]

## CSS のトランジション 

CSS トランジションの考えはシンプルです。これから、そのプロパティとその変化がどのようにアニメーション化されるかを説明します。プロパティが変更されると、ブラウザはアニメーションを描写します。

つまり: 必要なことはプロパティを変更することだけです。そして滑らかなトランジションはブラウザによって行われます。

例えば、下の CSS は `background-color` の変化を 3秒間アニメーション化します。:

```css
.animated {
  transition-property: background-color;
  transition-duration: 3s;
}
```

今、ある要素が `.animated` クラスを持っている場合、`background-color` の変更は3秒間でアニメーションされます。

下のボタンをクリックして、背景をアニメーションさせてみてください。:

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

CSS トランジションを記述するのに 5 つのプロパティがあります:

- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`

この後説明していきますが、今の時点では、共通の `transition` プロパティは `property duration timing-function delay` の順番で一緒に宣言できること、複数のプロパティを一度にアニメーションすることができることに留意しておいてください。

例えば、このボタンは `color` と `font-size` をアニメーションします。:

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

```css
#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
}
```

上の例では、JavaScript は要素にクラス `.animate` を追加し -- それによりアニメーションを開始しています。:

```js
stripe.classList.add('animate');
```

"途中から" 始めることも可能です。負の値 `transition-delay` を使って、例えば、現在の秒数に対応する正確な数値から始めることができます。

ここでは、数字をクリックすると -- 現在の秒数からアニメーションが始まります。:

[codetabs src="digits-negative-delay"]

JavaScript は追加の行でそれをしています。:

```js
stripe.onclick = function() {
  let sec = new Date().getSeconds() % 10;
*!*
  // 例えば、ここで -3s は3番目からアニメーションを開始します
  stripe.style.transitionDelay = '-' + sec + 's';
*/!*
  stripe.classList.add('animate');
};
```

## transition-timing-function

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

![](bezier-linear.png)

...ご覧の通り、単なる直線です。時間(`x`)が過ぎるに連れて、アニメーションの完了(`y`)は着実に `0` から `1` に進みます。

下の例にある電車は、左から右へ一定の速度で移動します(クリックしてみてください):

[codetabs src="train-linear"]

CSS `transition` はその曲線に基づいています:

```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
  /* JavaScript sets left to 450px */
}
```

...そして電車をスローダウンさせるにはどうすれば良いでしょうか？

別のベジェ曲線を使うことで実現できます: `cubic-bezier(0.0, 0.5, 0.5 ,1.0)`.

グラフは次のようになります:

![](train-curve.png)

見てわかるように、処理は速く始まります: 曲線は高くなっていき、その後遅くなっていきます。

タイミング関数は次のように動作します(電車をクリックしてください):

[codetabs src="train"]

CSS:
```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, .5, .5, 1);
  /* JavaScript sets left to 450px */
}
```

いくつかの組み込みの曲線があります: `linear`, `ease`, `ease-in`, `ease-out` そして `ease-in-out` です。

`linear` は `cubic-bezier(0, 0, 1, 1)` を簡略したものです -- それは直線であり、先程見たものです。

その他の名前は以下の `cubic-bezier` の簡略表記です:

| <code>ease</code><sup>*</sup> | <code>ease-in</code> | <code>ease-out</code> | <code>ease-in-out</code> |
|-------------------------------|----------------------|-----------------------|--------------------------|
| <code>(0.25, 0.1, 0.25, 1.0)</code> | <code>(0.42, 0, 1.0, 1.0)</code> | <code>(0, 0, 0.58, 1.0)</code> | <code>(0.42, 0, 0.58, 1.0)</code> |
| ![ease, figure](ease.png) | ![ease-in, figure](ease-in.png) | ![ease-out, figure](ease-out.png) | ![ease-in-out, figure](ease-in-out.png) |

`*` -- デフォルトでは、タイミング関数がない場合 `ease` が使用されます。

したがって、スローダウンする電車に対しては、`ease-out` を使うことができました。:

```css
.train {
  left: 0;
  transition: left 5s ease-out;
  /* transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

しかし、実際は少し異なって見えます。

**ベジェ曲線はアニメーションがその範囲から "飛び出す" ようにすることができます。**

曲線上の制御点は、負または巨大な値の `y` 座標を持つことができます。すると、ベジェ曲線も非常に低くまたは高くジャンプし、アニメーションが通常の範囲を超えます。

下の例のアニメーションコードは次の通りです:
```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
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

![](bezier-train-over.png)

2番目の `y` 座標がゼロより下に移動し、3番目の点は `1` を越えています。そのため、曲線は "通常" の象限から外れています。`y` は "標準" の範囲 `0..1` から外れています。

ご存知の通り、`y` は "アニメーション処理の完了" を表します。値 `y = 0` は開始プロパティ値に対応し、`y = 1` は -- 終わりの値に対応します。そのため、値 `y<0` はプロパティを開始時の `left` よりも小さい値に移動させ、`y>1` は -- 最後の `left` を越えます。

これは確実に "ソフトな" バリアントです。もし `y` の値を `-99` や `99` といった値にした場合、電車はその範囲から遥か遠くに飛び出します。

しかし、特定のタスクのためのベジェ曲線はどうやって作るのでしょう？そのための多くのツールがあります。例えば、<http://cubic-bezier.com/> などで行うことができます。

### Steps

タイミング関数 `steps(number of steps[, start/end])` はアニメーションをステップに分割することができます。

数字を使った例を見てみましょう。私たちは数字を滑らかではなく、離散的に変化させます。

そのために、アニメーションを 9 つのステップに分割します:

```css
#stripe.animate  {
  transform: translate(-90%);
  transition: transform 9s *!*steps(9, start)*/!*;
}
```

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
- `2s` -- `-20%`
- ...
- `9s` -- `-90%`

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

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
      // 右に進みます
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // 左に進みます
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

`transitionend` のイベントオブジェクトはいくつかのプロパティを持っています。:

`event.propertyName`
: アニメーションを終了したプロパティ。複数のプロパティを同時にアニメーションした場合に便利です。

`event.elapsedTime`
: `transition-delay` を除く、アニメーションの時間(秒単位)。

## キーフレーム(keyframes)

`@keyframes` という CSS のルールを使用して、複数の簡単なアニメーションを一緒に動作させることができます。

この方法では、アニメーションの "名前" と、何を/いつ/どこでアニメーションさせるかのルールを指定します。その後、`animation` プロパティを使ってアニメーションと要素の紐づけを行い、追加のパラメータを指定していきます。

これは説明付きの例です:

```html run height=60 autorun="no-epub" no-beautify
<div class="progress"></div>

<style>
*!*
  @keyframes go-left-right {        /* 名前を指定します: "go-left-right" */
    from { left: 0px; }             /* left: 0px からアニメーションを開始します */
    to { left: calc(100% - 50px); } /* left: 100%-50px までアニメーションします */
  }
*/!*

  .progress {
*!*
    animation: go-left-right 3s infinite alternate;
    /* アニメーション "go-left-right" を要素に適用します
       期間は 3 秒 (3s)
       回数: 無限 (infinite)
       順方向/逆方向を毎回交互に (alternate)
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
