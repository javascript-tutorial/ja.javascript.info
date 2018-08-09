
最初に、すべての外部参照を見つける必要があります。

2つの方法があります。

1つ目は `document.querySelectorAll('a')` を使ってすべてのリンクを見つけ、必要なものをフィルタする方法です:

```js
let links = document.querySelectorAll('a');

for (let link of links) {
*!*
  let href = link.getAttribute('href');
*/!*
  if (!href) continue; // 属性なし

  if (!href.includes('://')) continue; // プロトコルなし

  if (href.startsWith('http://internal.com')) continue; // 内部

  link.style.color = 'orange';
}
```

注意してください: `link.getAttribute('href')` を使っています。 `link.href` ではありません。なぜなら、 HTML からの値が必要なためです。

...もう1つ、よりシンプルな方法は CSS セレクタにチェックを追加する方法です。:

```js
// href の中に :// を持つリンクを探しますが、href は http://internal.com から始まらないもの
let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach(link => link.style.color = 'orange');
```
