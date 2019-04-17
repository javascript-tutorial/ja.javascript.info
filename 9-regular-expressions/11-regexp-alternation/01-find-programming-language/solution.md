
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
```
