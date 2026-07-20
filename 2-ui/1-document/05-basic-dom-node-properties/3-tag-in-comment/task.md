importance: 3

---

# コメントの中のタグ

<<<<<<< HEAD
このコードは何を表示するでしょう？
=======
What does this code show?
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // これは何?
</script>
```
