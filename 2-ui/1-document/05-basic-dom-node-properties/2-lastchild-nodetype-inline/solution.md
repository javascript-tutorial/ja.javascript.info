落とし穴があります。

`<script>` 実行時、最後の DOM ノードはまさに `<script>` です。なぜなら、ブラウザはページの残り部分をまだ処理していないからです。

したがって、結果は `1` です(要素ノード)。

```html run height=60
<html>

<body>
  <script>
    alert(document.body.lastChild.nodeType);
  </script>
</body>

</html>
```
