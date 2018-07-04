

```js run demo
let a = +prompt("The first number?", "");
let b = +prompt("The second number?", "");

alert( a + b );
```

`prompt` の前の単項プラス `+` に注意してください。それはすぐに値を数値に変換します。

そうしない場合、`a` と `b` が文字列となり、合計はそれらの連結になります。つまり: `"1" + "2" = "12"`.
