解決策は:

```js
let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;
```

つまり: (全高さ) - (スクロールアウトしたトップ部分) - (可視部分) -- これは正確にスクロールアウトしたボトム部分です。
