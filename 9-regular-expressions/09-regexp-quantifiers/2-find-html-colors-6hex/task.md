<<<<<<< HEAD
# HTML カラーの正規表現

`#ABCDEF` と書かれた HTML カラーを探す正規表現を作成してください。: 最初に `#`、次に 6 つの16進数文字です。

使用例:

```js
let reg = /...your regexp.../

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( str.match(reg) )  // #121212,#AA00ef
```

P.S. このタスクでは `#123` や `rgb(1,2,3)` のような別のフォーマットを考える必要はありません。
=======
# Regexp for HTML colors

Create a regexp to search HTML-colors written as `#ABCDEF`: first `#` and then 6 hexadecimal characters.

An example of use:

```js
let regexp = /...your regexp.../

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( str.match(regexp) )  // #121212,#AA00ef
```

P.S. In this task we do not need other color formats like `#123` or `rgb(1,2,3)` etc.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
