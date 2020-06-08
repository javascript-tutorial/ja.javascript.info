`switch` の機能に正確にマッチさせるためには、`if` は厳密な比較 `'==='` を使わなければなりません。

が、与えられた文字列に対しては、単純な `'=='` も使えます。

```js no-beautify
if(browser == 'Edge') {
  alert("You've got the Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Okay we support these browsers too' );
} else {
  alert( 'We hope that this page looks ok!' );
}
```

注意してください: 構造 `browser == 'Chrome' || browser == 'Firefox' …` はより良い可読性のために複数行に分割されています。

しかし、`switch` 構造は以前としてより洗練されており、説明的です。
