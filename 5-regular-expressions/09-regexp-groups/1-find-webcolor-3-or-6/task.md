# #abc または #abcdef の形式で色を検索する

形式 `#abc` または `#abcdef` で色をマッチする正規表現を書いてください。つまり、`#` の後に3桁または6桁の16進数が続きます。

使用例:
```js
let reg = /your regexp/g;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(reg) ); // #3f3 #AA0ef
```

P.S. 正確に 3 または 6 桁の16進数であるべきです。`#abcd` のような値はマッチしません。
