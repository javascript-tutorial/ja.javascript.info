
<<<<<<< HEAD
`mouse.onclick` を使用してクリックを処理し、ネズミを `position:fixed` で移動可能にし、その後 `mouse.onkeydown` で矢印キーを処理します。
=======
We can use `mouse.onclick` to handle the click and make the mouse "moveable" with `position:fixed`, then `mouse.onkeydown` to handle arrow keys.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

唯一の落とし穴は `keydown` はフォーカスのある要素でのみトリガするということです。そのため、要素に `tabindex` を追加する必要があります。HTML を変更することは禁止しているので、そのために `mouse.tebIndex` プロパティを使います。

P.S. `mouse.onclick` を `mouse.onfocus` に置き換えることもできます。
