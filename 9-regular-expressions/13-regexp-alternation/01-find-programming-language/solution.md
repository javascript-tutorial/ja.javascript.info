
<<<<<<< HEAD
最初のアイデアは `|` の間に言語をリストすることです。

しかし、それは正しく動作しません:

```js run
let reg = /Java|JavaScript|PHP|C|C\+\+/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(reg) ); // Java,Java,PHP,C,C
```

正規表現演算子は論理和指定子を1つずつ探します。つまり、まず `match:Java` があるかをチェックし、なければ `match:JavaScript` を探します。

結果として、`match:JavaScript` は見つかりません。`match:Java` が最初にチェックされるからです。

`match:C` と `match:C++` も同じです。

この問題には2つの解法があります:

1. より長いマッチを最初にチェックするよう順番を変更する: `pattern:JavaScript|Java|C\+\+|C|PHP`.
2. 同じスタートのバリアントをマージする: `pattern:Java(Script)?|C(\+\+)?|PHP`.

動作:

```js run
let reg = /Java(Script)?|C(\+\+)?|PHP/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(reg) ); // Java,JavaScript,PHP,C,C++
=======
The first idea can be to list the languages with `|` in-between.

But that doesn't work right:

```js run
let regexp = /Java|JavaScript|PHP|C|C\+\+/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,Java,PHP,C,C
```

The regular expression engine looks for alternations one-by-one. That is: first it checks if we have  `match:Java`, otherwise -- looks for `match:JavaScript` and so on.

As a result, `match:JavaScript` can never be found, just because `match:Java` is checked first.

The same with `match:C` and `match:C++`.

There are two solutions for that problem:

1. Change the order to check the longer match first: `pattern:JavaScript|Java|C\+\+|C|PHP`.
2. Merge variants with the same start: `pattern:Java(Script)?|C(\+\+)?|PHP`.

In action:

```js run
let regexp = /Java(Script)?|C(\+\+)?|PHP/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,JavaScript,PHP,C,C++
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
```
