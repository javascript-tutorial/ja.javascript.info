importance: 5

---

# 配列のコピーとソート

文字列の配列 `arr` を持っています。私たちはソートされたそのコピーを持ちたいですが、`arr` を修正はせずにキープしたいです。

このようなコピーを返す関数 `copySorted(arr)` を作成してください。

```js
let arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

alert( sorted ); // CSS, HTML, JavaScript
alert( arr ); // HTML, JavaScript, CSS (no changes)
```
