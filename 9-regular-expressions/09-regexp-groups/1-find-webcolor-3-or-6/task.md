<<<<<<< HEAD
# #abc または #abcdef の形式で色を検索する

形式 `#abc` または `#abcdef` で色をマッチする正規表現を書いてください。つまり、`#` の後に3桁または6桁の16進数が続きます。

使用例:
=======
# Find color in the format #abc or #abcdef

Write a RegExp that matches colors in the format `#abc` or `#abcdef`. That is: `#` followed by 3 or 6 hexadecimal digits.

Usage example:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
```js
let reg = /your regexp/g;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

<<<<<<< HEAD
alert( str.match(reg) ); // #3f3 #AA0ef
```

P.S. 正確に 3 または 6 桁の16進数であるべきです。`#abcd` のような値はマッチしません。
=======
alert( str.match(reg) ); // #3f3 #AA00ef
```

P.S. This should be exactly 3 or 6 hex digits: values like `#abcd` should not match.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
