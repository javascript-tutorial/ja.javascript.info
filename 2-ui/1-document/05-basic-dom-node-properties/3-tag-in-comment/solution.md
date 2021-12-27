解答: **`BODY`**.

```html run
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // BODY
</script>
```

順番に何が起こっているのでしょう:

<<<<<<< HEAD
1. `<body>` の内容はコメントに置き換えられます。`body.tagName == "BODY"` なので、コメントは <code>&lt;!--BODY--&gt;</code> です。覚えているように、`tagName` は HTML では常に大文字です。
2. コメントは今唯一の子ノードなので、`body.firstChild` でそれを取得します。
3. コメントの `data` プロパティはその内容(`<!--...-->` の中): `"BODY"` です。
=======
1. The content of `<body>` is replaced with the comment. The comment is `<!--BODY-->`, because `body.tagName == "BODY"`. As we remember, `tagName` is always uppercase in HTML.
2. The comment is now the only child node, so we get it in `body.firstChild`.
3. The `data` property of the comment is its contents (inside `<!--...-->`): `"BODY"`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
