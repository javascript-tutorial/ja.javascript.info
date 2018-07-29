多くの方法があります、例えば:


`<div>` DOM ノード:

```js
document.body.firstElementChild
// or
document.body.children[0]
// or (最初のノードはスペースなので、2つ目を取得します)
document.body.childNodes[1]
```

`<ul>` DOM ノード:

```js
document.body.lastElementChild
// or
document.body.children[1]
```

2つ目の `<li>` (Pete):

```js
// <ul> を取得し、その最後の要素の子を取得
document.body.lastElementChild.lastElementChild
```
