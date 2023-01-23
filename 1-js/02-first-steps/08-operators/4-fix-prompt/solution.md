<<<<<<< HEAD
理由はプロンプトがユーザ入力を文字列として返すからです。

なので、変数はそれぞれ値 `"1"` と `"2"` になります。
=======
The reason is that prompt returns user input as a string.

So variables have values `"1"` and `"2"` respectively.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12
```

<<<<<<< HEAD
すべきことは、`+` の前に、文字列から数値へ変換することです。例えば、`Number()` を使用したり、それらの前に `+` をつけます。

例えば、。`prompt` の直前:
=======
What we should do is to convert strings to numbers before `+`. For example, using `Number()` or prepending them with `+`.

For example, right before `prompt`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3
```

<<<<<<< HEAD
あるいは `alert`:
=======
Or in the `alert`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3
```

<<<<<<< HEAD
最新のコードでは、単項と二項の `+` 両方を使用しています。面白いですね。
=======
Using both unary and binary `+` in the latest code. Looks funny, doesn't it?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
