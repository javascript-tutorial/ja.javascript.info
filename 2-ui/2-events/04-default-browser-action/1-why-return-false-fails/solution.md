ブラウザが `onclick` のような `on*` 属性を読み込むとき、そのコンテンツからハンドラを生成します。

`onclick="handler()"` の場合、関数はこうなります:

```js
function(event) {
  handler() // onclick のコンテンツ
}
```

今、`handler()` により返却された値は使われておらず、結果には影響しないことが分かります。

修正例です:

```html run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="*!*return handler()*/!*">w3.org</a>
```

もしくは、このように `event.preventDefault()` を使うこともできます:

```html run
<script>
*!*
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
*/!*
</script>

<a href="https://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```
