
まず、それを *しない* 方法を見てみましょう:

```js
function clear(elem) {
  for (let i=0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
  }
}
```

これは動作しません。なぜなら、`remove()` の呼び出しは集合 `elem.childNodes` をシフトするからです。なので、要素は毎回インデックス `0` から開始します。しかし、 `i` は増加するので、いくつかの要素はスキップされるでしょう。


`for..of` ループも同じです。

正しいバリアントは次のようになります:

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

また、よりシンプルな方法として次のように書くこともできます:

```js
function clear(elem) {
  elem.innerHTML = '';
}
```
