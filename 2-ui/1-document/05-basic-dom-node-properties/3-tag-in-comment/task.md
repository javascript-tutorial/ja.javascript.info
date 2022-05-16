importance: 3

---

# コメントの中のタグ

<<<<<<< HEAD
このコードは何を表示するでしょう？
=======
What does this code show?
>>>>>>> 2901e0c64590a67d8a2bde1ea76a514d96f80469

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // これは何?
</script>
```
