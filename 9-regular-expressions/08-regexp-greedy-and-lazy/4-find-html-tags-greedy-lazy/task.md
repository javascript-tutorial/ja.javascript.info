# HTML タグを見つける

属性を持つすべての (開始/終了の)HTML タグを見つける正規表現を作成してください。

利用例:

```js run
let reg = /your regexp/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(reg) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

内側に `<` と `>` が含まれていないとしましょう（引用符でも）。それは物事を少し単純化します。
