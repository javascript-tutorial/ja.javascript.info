解答: **`BODY`**.

```html run
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // BODY
</script>
```

順番に何が起こっているのでしょう:

1. `<body>` の内容はコメントに置き換えられます。`body.tagName == "BODY"` なので、コメントは <code>&lt;!--BODY--&gt;</code> です。覚えているように、`tagName` は HTML では常に大文字です。
2. コメントは今唯一の子ノードなので、`body.firstChild` でそれを取得します。
3. コメントの `data` プロパティはその内容(`<!--...-->` の中): `"BODY"` です。
