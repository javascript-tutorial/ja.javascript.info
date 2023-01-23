<<<<<<< HEAD
# HTML タグを見つける

属性を持つすべての (開始/終了の)HTML タグを見つける正規表現を作成してください。

利用例:

```js run
let reg = /your regexp/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(reg) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

内側に `<` と `>` が含まれていないとしましょう（引用符でも）。それは物事を少し単純化します。
=======
# Find HTML tags

Create a regular expression to find all (opening and closing) HTML tags with their attributes.

An example of use:

```js run
let regexp = /your regexp/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

Here we assume that tag attributes may not contain `<` and `>` (inside quotes too), that simplifies things a bit.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
