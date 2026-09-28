importance: 5

---

# オブジェクトからツリーを作成する

入れ子オブジェクトから、入れ子の `ul/li` のリストを作成する関数 `createTree` を書いてください。

例:

```js
let data = {
  "Fish": {
    "trout": {},
    "salmon": {}
  },

  "Tree": {
    "Huge": {
      "sequoia": {},
      "oak": {}
    },
    "Flowering": {
      "apple tree": {},
      "magnolia": {}
    }
  }
};
```

構文:

```js
let container = document.getElementById('container');
*!*
createTree(container, data); // container の中にリストを作ります
*/!*
```

結果(ツリー)は次のようになる必要があります。:

[iframe border=1 src="build-tree-dom"]

このタスクを解決する2つの方法のうち1つを選んでください:

1. ツリーのためのHTMLを生成し、`container.innerHTML` で割り当てます。
2. ツリーノードを生成し、DOMメソッドで追加します。

両方をすることができれば素晴らしいです。

P.S. ツリーは空の `<ul></ul>` のような余分な要素を葉に持つべきではありません。
