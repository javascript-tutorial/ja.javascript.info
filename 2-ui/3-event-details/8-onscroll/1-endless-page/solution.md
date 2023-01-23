この解決策のコア部分は、ページの末尾にいるときに、日付情報をページに追加(もしくは、実践ではより多くのものを読み込む)する関数です。

私たちは、それをすぐに呼びだしたり、`window.onscroll` ハンドラとして追加することができます。

最も重要な問題は、"ページが末尾までスクロールされたかをどのようにして検出するか？" です。

ウィンドウ相対座標を使いましょう。

ドキュメントは `<html>` タグ、つまり  `document.documentElement` の中に表現されます。

<<<<<<< HEAD
`document.documentElement.getBoundingClientRect()` でドキュメント全体のウィンドウ相対座標を得ることができます。そして、`bottom` プロパティはドキュメントの終わりのウィンドウ相対座標です。

例えば、HTML ドキュメント全体の高さが 2000px の場合は:

```js
// ページのトップにいるとき
// ウィンドウ相対のトップは 0 です
=======
We can get window-relative coordinates of the whole document as `document.documentElement.getBoundingClientRect()`, the `bottom` property will be window-relative coordinate of the document bottom.

For instance, if the height of the whole HTML document is `2000px`, then:

```js
// when we're on the top of the page
// window-relative top = 0
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
document.documentElement.getBoundingClientRect().top = 0

// ウィンドウ相対の底 = 2000
// ドキュメントが長いので、おそらくウィンドウの底をはるかに超えています
document.documentElement.getBoundingClientRect().bottom = 2000
```

もし `500px` 下にスクロールすると:

```js
// ドキュメントトップはウィンドウより 500px 上にあります
document.documentElement.getBoundingClientRect().top = -500
// ドキュメントの底は 500px 近い
document.documentElement.getBoundingClientRect().bottom = 1500
```

最後までスクロールするとき、ウィンドウの高さを `600px` と仮定すると:


```js
<<<<<<< HEAD
document.documentElement.getBoundingClientRect().top = -1400
document.documentElement.getBoundingClientRect().bottom = 600
```

bottom は 0 にはなれないことに注意してください。なぜなら、決してウィンドウのトップには到達しないからです。底の座標の最も小さい制限はウィンドウの高さで、それ以上スクロールすることはできません。

また、ウィンドウの高さは `document.documentElement.clientHeight` です。

私たちは、ドキュメントの底部がそれからd `100px` 以上は離れていてほしくないです。
=======
// document top is above the window 1400px
document.documentElement.getBoundingClientRect().top = -1400
// document bottom is below the window 600px
document.documentElement.getBoundingClientRect().bottom = 600
```

Please note that the `bottom` can't be `0`, because it never reaches the window top. The lowest limit of the `bottom` coordinate is the window height (we assumed it to be `600`), we can't scroll it any more up.

We can obtain the window height as `document.documentElement.clientHeight`.

For our task, we need to know when the document bottom is not no more than `100px` away from it (that is: `600-700px`, if the height is `600`).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

したがって、関数は次のようになります:

```js
function populate() {
  while(true) {
    // document bottom
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

<<<<<<< HEAD
    // もしウィンドウの高さ + 100px よりも大きい場合、ページの終わりではありません
    // (上の例の通り、大きい bottom はもっとスクロールが必要であることを意味します
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;

    // それ以外はデータを追加する
=======
    // if the user hasn't scrolled far enough (>100px to the end)
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
    
    // let's add more data
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}
```
