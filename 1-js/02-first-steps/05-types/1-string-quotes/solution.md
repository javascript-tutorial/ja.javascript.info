
バッククォートは `${...}` の中の式を文字列に埋め込みます。

```js run
let name = "Ilya";

// 式は数字の1です
alert( `hello ${1}` ); // hello 1

// 式は文字列の "name" です
alert( `hello ${"name"}` ); // hello name

// 式は変数で、そこに埋め込まれます
alert( `hello ${name}` ); // hello Ilya
```
