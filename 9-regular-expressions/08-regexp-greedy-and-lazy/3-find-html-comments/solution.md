コメントの先頭 `match:<!--` を見つけ、その後、 `match:-->` で終わるまでのすべてを見つける必要があります。

最初のアイデアは `pattern:<!--.*?-->` です -- 怠惰な量指定子は `match:-->` の直前でドットを停止させます。

<<<<<<< HEAD:5-regular-expressions/08-regexp-greedy-and-lazy/3-find-html-comments/solution.md
しかし、JavaScriptのドットは "改行以外の任意の文字" を意味するので、複数行のコメントは見つかりません。
=======
But a dot in JavaScript means "any symbol except the newline". So multiline comments won't be found.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/08-regexp-greedy-and-lazy/3-find-html-comments/solution.md

"なんでも" マッチさせるために、ドットの代わりに `pattern:[\s\S]` を使います。:

```js run
let reg = /<!--[\s\S]*?-->/g;

let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

alert( str.match(reg) ); // '<!-- My -- comment \n test -->', '<!---->'
```
