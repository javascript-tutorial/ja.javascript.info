# HTML タグを見つける

属性を持つすべての (開始/終了の)HTML タグを見つける正規表現を作成してください。

利用例:

```js run
let reg = /your regexp/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(reg) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

<<<<<<< HEAD:5-regular-expressions/08-regexp-greedy-and-lazy/4-find-html-tags-greedy-lazy/task.md
内側に `<` と `>` が含まれていないとしましょう（引用符でも）。それは物事を少し単純化します。
=======
Here we assume that tag attributes may not contain `<` and `>` (inside squotes too), that simplifies things a bit. 
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f:9-regular-expressions/08-regexp-greedy-and-lazy/4-find-html-tags-greedy-lazy/task.md
