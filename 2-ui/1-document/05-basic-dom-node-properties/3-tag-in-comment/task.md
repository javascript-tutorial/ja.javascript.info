importance: 3

---

# コメントの中のタグ

<<<<<<< HEAD
このコードは何を表示するでしょう？
=======
What does this code show?
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // これは何?
</script>
```
