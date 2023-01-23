# スクロール

<<<<<<< HEAD
スクロールイベントは、ページや要素のスクローリングに反応することができます。私たちがここでできることはたくさんあります。
=======
The `scroll` event allows reacting to a page or element scrolling. There are quite a few good things we can do here.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例えば:
- ユーザーがドキュメント内のどこにあるかに応じて、追加のコントロールや情報を表示/非表示する。
- ユーザがページの下までスクロールしたときに追加のデータを読み込む。

<<<<<<< HEAD
[cut]

ここに現在のスクロールを表示する小さい関数があります:
=======
Here's a small function to show the current scroll:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js autorun
window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
});
```

```online
実行:

現在のスクロール = <b id="showScroll">scroll the window</b>
```

`scroll` イベントは `window` とスクロール可能な要素両方で動作します。


<<<<<<< HEAD
## スクロールを防止する 

どうやってスクロールをできなくするのでしょう？ `onscroll` リスナの中で、`event.preventDefault()` によってスクロールを防止することはできません。なぜなら、それはスクロールがすでに行われた *後* にトリガされるからです。

しかし、スクロールを引き起こすイベントの `event.preventDefault（）`によるスクロールを防ぐことができます。

例えば:
- `wheel` イベント -- マウスホイールの回転 ("スクロール" タッチパッドアクションもそれを生成します)
- `key:pageUp` や `key:pageDown` のための `keydown`

これは役立つ場合があります。しかし、他にもスクロールする方法があり、それらすべてを処理するのは非常に難しいです。そのため、何かをスクロールできないようにするには、 `overflow` プロパティのように CSS を使うのが、より信頼できる方法です。

ここでは、 `onscroll` 時のアプリケーションを解いたり、目を通すことができるタスクはほとんどありません。
=======
How do we make something unscrollable?

We can't prevent scrolling by using `event.preventDefault()` in `onscroll` listener, because it triggers *after* the scroll has already happened.

But we can prevent scrolling by `event.preventDefault()` on an event that causes the scroll, for instance `keydown` event for `key:pageUp` and `key:pageDown`.

If we add an event handler to these events and `event.preventDefault()` in it, then the scroll won't start.

There are many ways to initiate a scroll, so it's more reliable to use CSS, `overflow` property.

Here are few tasks that you can solve or look through to see applications of `onscroll`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
