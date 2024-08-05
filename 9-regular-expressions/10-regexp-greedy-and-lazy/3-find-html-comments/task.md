# HTML のコメントを見つける

テキスト中のすべての HTML コメントを探してください:

```js
let regexp = /your regexp/g;

let str = `... <!-- My -- comment
 test --> ..  <!----> .. 
`;

alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'
```
