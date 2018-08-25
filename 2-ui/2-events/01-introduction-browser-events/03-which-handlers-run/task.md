importance: 5

---

# どのハンドラが実行されますか?

変数の中にボタンがあります。そこにはハンドラはありません。

次のコードの後クリックするとどのハンドラが実行されるでしょう？どのアラートが表示されますか？

```js no-beautify
button.addEventListener("click", () => alert("1"));

button.removeEventListener("click", () => alert("1"));

button.onclick = () => alert(2);
```
