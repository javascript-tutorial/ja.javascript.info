答え: **1 and 3**.

両方のコマンドは `elem` へ "テキストとして" `text` を追加します。

例:

```html run height=80
<div id="elem1"></div>
<div id="elem2"></div>
<div id="elem3"></div>
<script>
  let text = '<b>text</b>';

  elem1.append(document.createTextNode(text));
  elem2.textContent = text;
  elem3.innerHTML = text;
</script>
```
