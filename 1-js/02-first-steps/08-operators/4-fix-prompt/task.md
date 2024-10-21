importance: 5

---

<<<<<<< HEAD
# 足し算を修正する

ユーザに２つの数字を訪ね、その合計を表示するコードがあります。

これは正しく機能していません。以下の例の出力は `12` です（デフォルトのプロンプトの値の場合）。

なぜでしょうか？修正してください。結果は `3` になるべきです。
=======
# Fix the addition

Here's a code that asks the user for two numbers and shows their sum.

It works incorrectly. The output in the example below is `12` (for default prompt values).

Why? Fix it. The result should be `3`.
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(a + b); // 12
```
