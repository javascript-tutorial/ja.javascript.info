スクロールバーの幅を取得するために、私たちはスクロールを持つがボーダーとパディングは含まない要素を作成することができます。

そして、その全幅 `offsetWidth` と内部コンテンツ領域幅 `clientWidth` の間の違いは、スクロールバーになります:

```js run
// スクロールを持つ div を作成します
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// ドキュメントに置く必要があります、さもないとサイズは 0 です
document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;

div.remove();

alert(scrollWidth);
```
