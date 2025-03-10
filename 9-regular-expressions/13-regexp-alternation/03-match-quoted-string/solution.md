<<<<<<< HEAD
解答: `pattern:/"(\\.|[^"\\])*"/g`.

1つずつ見ていきましょう:

- まず、開始の引用符 `pattern:"` を探します。
- 次にバックスラッシュ `pattern:\\` がある場合(技術的に、パターンの中ではスラッシュは特別な文字であるため2重にしなければなりません。そのため、実際にはこれは1つのスラッシュを意味します)、その後は任意の文字で問題ありません(ドット)。
- そうでない場合、引用符(これは文字列の終わりを意味します)とバックスラッシュ(単独のバックスラッシュを防ぐため。バックスラッシュはその後の別のシンボルとともにのみ使用されます)を除く任意の文字を取ります: `pattern:[^"\\]`。
- ...終了の引用符まで続きます。

動作:

```js run
let reg = /"(\\.|[^"\\])*"/g;
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

alert( str.match(reg) ); // "test me","Say \"Hello\"!","\\ \""
=======
The solution: `pattern:/"(\\.|[^"\\])*"/g`.

Step by step:

- First we look for an opening quote `pattern:"`
- Then if we have a backslash `pattern:\\` (we have to double it in the pattern because it is a special character), then any character is fine after it (a dot).
- Otherwise we take any character except a quote (that would mean the end of the string) and a backslash (to prevent lonely backslashes, the backslash is only used with some other symbol after it): `pattern:[^"\\]`
- ...And so on till the closing quote.

In action:

```js run
let regexp = /"(\\.|[^"\\])*"/g;
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

alert( str.match(regexp) ); // "test me","Say \"Hello\"!","\\ \""
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```
