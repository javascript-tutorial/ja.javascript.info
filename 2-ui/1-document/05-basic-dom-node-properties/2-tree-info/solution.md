<<<<<<< HEAD
`<li>` のループを作りましょう:

```js
for (let li of document.querySelector('li')) {
=======
Let's make a loop over `<li>`:

```js
for (let li of document.querySelectorAll('li')) {
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5
  ...
}
```

<<<<<<< HEAD
このループでは、各 `li` の中のテキストを取得する必要があります。最初の子ノードから直接それを読むことができ、それはテキストノードです。

```js
for (let li of document.querySelector('li')) {
  let title = li.firstChild.data;

  // titleは他のノードの前の <li> のテキストです
}
```

そして、子孫の数は `li.getElementsByTagName('li')` で取得できます。
=======
In the loop we need to get the text inside every `li`.

We can read the text from the first child node of `li`, that is the text node:

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // title is the text in <li> before any other nodes
}
```

Then we can get the number of descendants as `li.getElementsByTagName('li').length`.
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5
