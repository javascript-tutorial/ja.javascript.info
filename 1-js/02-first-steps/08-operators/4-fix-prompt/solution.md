理由はプロンプトがユーザ入力を文字列として返すからです。

なので、変数はそれぞれ値 `"1"` と `"2"` になります。

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12
```

すべきことは、`+` の前に、文字列から数値へ変換することです。例えば、`Number()` を使用したり、それらの前に `+` をつけます。

例えば、。`prompt` の直前:

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3
```

あるいは `alert`:

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3
```

最新のコードでは、単項と二項の `+` 両方を使用しています。面白いですね。
