importance: 3

---

# コメントの中のタグ

<<<<<<< HEAD
このコードは何を表示するでしょう？
=======
What does this code show?
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // これは何?
</script>
```
