<<<<<<< HEAD
`<li>` のループを作りましょう:

```js
for (let li of document.querySelector('li')) {
=======
Let's make a loop over `<li>`:

```js
for (let li of document.querySelectorAll('li')) {
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
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
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
