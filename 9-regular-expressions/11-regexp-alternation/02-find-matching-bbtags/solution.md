
開始タグは `pattern:\[(b|url|quote)\]` です.

次に、閉じタグまでの内容を見つけるため -- 改行を含む任意の文字にマッチするパターン `pattern:[\s\S]*?` を追加し、その後閉じタグへの後方参照を追加しましょう。

完全なパターンは: `pattern:\[(b|url|quote)\][\s\S]*?\[/\1\]`.

動作:

```js run
let reg = /\[(b|url|quote)\][\s\S]*?\[\/\1\]/g;

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert( str.match(reg) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

閉じタグ `pattern:[/\1]` ではスラッシュをエスケープしなければならないことに注意してください。通常、スラッシュはパターンの終了を意味するためです。
