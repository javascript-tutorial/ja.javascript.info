`onscroll` ハンドラでどの画像が見えているのかを確認し、それらを表示する必要があります。

<<<<<<< HEAD
また、スクロールをする前にすぐに見える画像を検知してそれらを読み込むために、ページが読み込まれた時にもそれを実行したいです。
=======
We also want to run it when the page loads, to detect immediately visible images and load them.

The code should execute when the document is loaded, so that it has access to its content.

Or put it at the `<body>` bottom:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// ...the page content is above...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  // top elem edge is visible?
  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // bottom elem edge is visible?
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}
```

The `showVisible()` function uses the visibility check, implemented by `isVisible()`, to load visible images:

```js
function showVisible() {
  for (let img of document.querySelectorAll('img')) {
    let realSrc = img.dataset.src;
    if (!realSrc) continue;

    if (isVisible(img)) {
      img.src = realSrc;
      img.dataset.src = '';
    }
  }
}

*!*
showVisible();
window.onscroll = showVisible;
*/!*
```

<<<<<<< HEAD
見えている画像に対して、`img.dataset.src` を取り、`img.src` に割り当てます(まだしていない場合)。

P.S. この解決策は１ページ上下にある画像を "プリロード" する `isVisibe` のバリアントも持っています(ページの高さは `document.documentElement.clientHeight` です)。
=======
P.S. The solution also has a variant of `isVisible` that "preloads" images that are within 1 page above/below the current document scroll.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
