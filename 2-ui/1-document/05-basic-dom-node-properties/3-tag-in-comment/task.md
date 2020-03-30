importance: 3

---

# コメントの中のタグ

<<<<<<< HEAD
このコードは何を表示するでしょう？
=======
What does this code show?
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // これは何?
</script>
```
