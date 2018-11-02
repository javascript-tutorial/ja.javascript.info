# HTML カラーの正規表現

`#ABCDEF` と書かれた HTML カラーを探す正規表現を作成してください。: 最初に `#`、次に 6 つの16進数文字です。

使用例:

```js
let reg = /...your regexp.../

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( str.match(reg) )  // #121212,#AA00ef
```

P.S. このタスクでは `#123` や `rgb(1,2,3)` のような別のフォーマットを考える必要はありません。
