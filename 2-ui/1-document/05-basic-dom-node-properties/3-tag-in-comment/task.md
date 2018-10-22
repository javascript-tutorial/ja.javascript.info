importance: 3

---

# コメントの中のタグ

このコードは何を表示するでしょう？

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // これは何?
</script>
```
