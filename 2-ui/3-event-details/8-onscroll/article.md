# スクロール

スクロールイベントは、ページや要素のスクローリングに反応することができます。私たちがここでできることはたくさんあります。

例えば:
- ユーザーがドキュメント内のどこにあるかに応じて、追加のコントロールや情報を表示/非表示する。
- ユーザがページの下までスクロールしたときに追加のデータを読み込む。

<<<<<<< HEAD
[cut]

ここに現在のスクロールを表示する小さい関数がります:
=======
Here's a small function to show the current scroll:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js autorun
window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
});
```

```online
実行:

現在のスクロール = <b id="showScroll">scroll the window</b>
```

`scroll` イベントは `window` とスクロール可能な要素両方で動作します。


## スクロールを防止する 

どうやってスクロールをできなくするのでしょう？ `onscroll` リスナの中で、`event.preventDefault()` によってスクロールを防止することはできません。なぜなら、それはスクロールがすでに行われた *後* にトリガされるからです。

しかし、スクロールを引き起こすイベントの `event.preventDefault（）`によるスクロールを防ぐことができます。

<<<<<<< HEAD
例えば:
- `wheel` イベント -- マウスホイールの回転 ("スクロール" タッチパッドアクションもそれを生成します)
- `key:pageUp` や `key:pageDown` のための `keydown`
=======
If we add an event handler to these events and `event.preventDefault()` in it, then the scroll won't start.

Sometimes that may help, but it's more reliable to use CSS to make something unscrollable, such as the `overflow` property.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

これは役立つ場合があります。しかし、他にもスクロールする方法があり、それらすべてを処理するのは非常に難しいです。そのため、何かをスクロールできないようにするには、 `overflow` プロパティのように CSS を使うのが、より信頼できる方法です。

ここでは、 `onscroll` 時のアプリケーションを解いたり、目を通すことができるタスクはほとんどありません。
