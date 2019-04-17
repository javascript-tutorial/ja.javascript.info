`<li>` のループを作りましょう:

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

このループでは、各 `li` の中のテキストを取得する必要があります。最初の子ノードから直接それを読むことができ、それはテキストノードです。

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // titleは他のノードの前の <li> のテキストです
}
```

そして、子孫の数は `li.getElementsByTagName('li')` で取得できます。
