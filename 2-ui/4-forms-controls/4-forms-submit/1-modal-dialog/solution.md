モーダルウィンドウは、次のようにウィンドウ全体をカバーする半透明の `<div id="cover-div">` を使って実装できます。:

```css
#cover-div {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0.3;
}
```

`<div>` がすべてをカバーするので、すべてのクリックを取得します。

また、`body.style.overflowY='hidden'` の設定により、ページスクロールを防ぐこともできます。

フォームは `<div>` の中ではなく、その隣です。なぜならそれには `opacity` をもたせたくはないからです。
