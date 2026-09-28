importance: 3

---

# なぜ "return false" が動作しないのでしょう?

なぜ下のコードで `return false` がまったく動かないのでしょうか？

```html autorun run
<script>
  function handler() {
    alert( "..." );
    return false;
  }
</script>

<a href="https://w3.org" onclick="handler()">the browser will go to w3.org</a>
```

ブラウザはクリックでそのURLを辿りますが、それをしたくありません。

どのように修正しますか？
