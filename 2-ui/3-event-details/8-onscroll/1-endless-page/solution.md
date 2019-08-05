この解決策のコア部分は、ページの末尾にいるときに、日付情報をページに追加(もしくは、実践ではより多くのものを読み込む)する関数です。

私たちは、それをすぐに呼びだしたり、`window.onscroll` ハンドラとして追加することができます。

最も重要な問題は、"ページが末尾までスクロールされたかをどのようにして検出するか？" です。

ウィンドウ相対座標を使いましょう。

ドキュメントは `<html>` タグ、つまり  `document.documentElement` の中に表現されます。

`document.documentElement.getBoundingClientRect()` でドキュメント全体のウィンドウ相対座標を得ることができます。そして、`bottom` プロパティはドキュメントの終わりのウィンドウ相対座標です。

例えば、HTML ドキュメント全体の高さが 2000px の場合は:

```js
// ページのトップにいるとき
// ウィンドウ相対のトップは 0 です
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
=======
// document top is above the window 1400px
document.documentElement.getBoundingClientRect().top = -1400
// document bottom is below the window 600px
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
document.documentElement.getBoundingClientRect().bottom = 600
```

bottom は 0 にはなれないことに注意してください。なぜなら、決してウィンドウのトップには到達しないからです。底の座標の最も小さい制限はウィンドウの高さで、それ以上スクロールすることはできません。

また、ウィンドウの高さは `document.documentElement.clientHeight` です。

私たちは、ドキュメントの底部がそれからd `100px` 以上は離れていてほしくないです。

したがって、関数は次のようになります:

```js
function populate() {
  while(true) {
    // document bottom
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    // もしウィンドウの高さ + 100px よりも大きい場合、ページの終わりではありません
    // (上の例の通り、大きい bottom はもっとスクロールが必要であることを意味します
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;

    // それ以外はデータを追加する
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}
```
