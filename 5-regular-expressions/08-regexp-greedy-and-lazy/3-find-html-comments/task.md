# HTML のコメントを見つける

テキスト中のすべての HTML コメントを探してください:

```js
let reg = /your regexp/g;

let str = `... <!-- My -- comment
 test --> ..  <!----> .. 
`;

alert( str.match(reg) ); // '<!-- My -- comment \n test -->', '<!---->'
```
