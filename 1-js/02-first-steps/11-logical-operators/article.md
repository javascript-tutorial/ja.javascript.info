# 論理演算子

<<<<<<< HEAD
JavaScriptには4つの論理演算子があります:  `||` (OR:論理和), `&&` (AND:論理積), `!` (NOT:否定), `??` (Null合体)。ここでは最初の３つを説明し、`??` 演算子は次の記事で説明します。

これらは "論理" と呼ばれますが、Boolean 型だけでなく、どの型の値にも適用することができます。結果もまた任意の型になります。
=======
There are four logical operators in JavaScript: `||` (OR), `&&` (AND), `!` (NOT), `??` (Nullish Coalescing). Here we cover the first three, the `??` operator is in the next article.

Although they are called "logical", they can be applied to values of any type, not only boolean. Their result can also be of any type.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

では、詳細を見ていきましょう。

<<<<<<< HEAD
## || (OR) 

"OR" 演算子は2つの縦の記号で表現されます:
=======
## || (OR)

The "OR" operator is represented with two vertical line symbols:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
result = a || b;
```

<<<<<<< HEAD
古典的なプログラミングでは、論理和は真偽値のみを操作することを意味していました。もしもその引数のいずれかが `true` の場合、それは `true` を返します。そうでなければ `false` を返します。

JavaScriptでは、演算子は少し難解ですが強力です。最初に真偽値で起こることを見てみましょう。
=======
In classical programming, the logical OR is meant to manipulate boolean values only. If any of its arguments are `true`, it returns `true`, otherwise it returns `false`.

In JavaScript, the operator is a little bit trickier and more powerful. But first, let's see what happens with boolean values.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

4つの取りうる論理的な組み合わせがあります:

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

ご覧の通り、両方のオペランドが `false` の場合を除き、結果は常に `true` です。

<<<<<<< HEAD
もしもオペランドが Boolean でない場合、評価のために Boolean に変換されます。

例えば、数値 `1`  は `true` として扱われ、数値 `0` は `false` となります:
=======
If an operand is not a boolean, it's converted to a boolean for the evaluation.

For instance, the number `1` is treated as `true`, the number `0` as `false`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
if (1 || 0) { // if( true || false ) のように動作します
  alert( 'truthy!' );
}
```

<<<<<<< HEAD
ほとんどの場合、OR `||` は `if` 文の中で、与えられた条件のいずれかが正しいかを確認するのに使われます。
=======
Most of the time, OR `||` is used in an `if` statement to test if *any* of the given conditions is `true`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'The office is closed.' );
}
```

より多くの条件を書くこともできます:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // 週末です
}
```

<<<<<<< HEAD
## OR は最初の真値を探します 

上で描かれたロジックはいくらか古典的です。ここで JavaScriptの特別な機能を持ってきましょう。
=======
## OR "||" finds the first truthy value [#or-finds-the-first-truthy-value]

The logic described above is somewhat classical. Now, let's bring in the "extra" features of JavaScript.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

拡張されたアルゴリズムは次の通りに動作します。

与えられた複数の OR の値:

```js
result = value1 || value2 || value3;
```

<<<<<<< HEAD
OR `"||"` 演算子は次のように動きます:

- 左から右にオペランドを評価します。
- それぞれのオペランドで、それを Boolean に変換します。もしも結果が `true` であれば、停止しオペランドの本来の値を返します。
- もしもすべての他のオペランドが評価された場合(i.e. すべて `偽` のとき), 最後のオペランドを返します。
=======
The OR `||` operator does the following:

- Evaluates operands from left to right.
- For each operand, converts it to boolean. If the result is `true`, stops and returns the original value of that operand.
- If all operands have been evaluated (i.e. all were `false`), returns the last operand.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

値は変換されていない元の形式で返却されます。

<<<<<<< HEAD
つまり、OR `"||"` のチェーンは最初に真となる値を返し、そのような値がない場合には最後のオペランドが返却されます。
=======
In other words, a chain of OR `||` returns the first truthy value or the last one if no truthy value is found.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:

```js run
<<<<<<< HEAD
alert( 1 || 0 ); // 1 (1 は真)

alert( null || 1 ); // 1 (1 は最初の真値)
alert( null || 0 || 1 ); // 1 (最初の真値)

alert( undefined || null || 0 ); // 0 (すべて偽、なので最後の値が返却される)
```

この結果は、"純粋で昔ながらの真偽値のみの OR" と比較して、いくつかの興味深い使用方法につながります。

1. **変数または式のリストから最初の真値を取得する**

    例えば、`firstName`, `lastName` と `nickName` 変数があり、すべて任意( undefined あるいは偽となる値になりうる)とします。

    データを持っているものを選び、表示する(あるいは何も設定されていな場合は `"Anonymous"`)のに、OR `||` が利用できます:
=======
alert( 1 || 0 ); // 1 (1 is truthy)

alert( null || 1 ); // 1 (1 is the first truthy value)
alert( null || 0 || 1 ); // 1 (the first truthy value)

alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)
```

This leads to some interesting usage compared to a "pure, classical, boolean-only OR".

1. **Getting the first truthy value from a list of variables or expressions.**

    For instance, we have `firstName`, `lastName` and `nickName` variables, all optional (i.e. can be undefined or have falsy values).

    Let's use OR `||` to choose the one that has the data and show it (or `"Anonymous"` if nothing set):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
    */!*
    ```

<<<<<<< HEAD
    すべての変数が偽であれば、`"Anonymous"` が表示されます。

2. **短絡評価(最小評価)**

    OR `||` のもう１つの特徴はいわゆる "短絡" 評価と呼ばれます。

    つまり、`||` は最初の真値に到達するまで引数を処理し、その後は他の引数には触れることなく、値はすぐに返却されることを意味します。

    この機能の重要性は、オペランドが単なる値ではなく、変数の割当や関数呼び出しなどの副作用のある式である場合に明らかになります。

    以下の例を実行した場合、２つ目のメッセージだけが表示されます:
=======
    If all variables were falsy, `"Anonymous"` would show up.

2. **Short-circuit evaluation.**

    Another feature of OR `||` operator is the so-called "short-circuit" evaluation.

    It means that `||` processes its arguments until the first truthy value is reached, and then the value is returned immediately, without even touching the other argument.

    The importance of this feature becomes obvious if an operand isn't just a value, but an expression with a side effect, such as a variable assignment or a function call.

    In the example below, only the second message is printed:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run no-beautify
    *!*true*/!* || alert("not printed");
    *!*false*/!* || alert("printed");
    ```

<<<<<<< HEAD
    １行目では、OR `||` 演算子が `true` を見るとすぐに評価を停止するため、`alert` は実行されません。

    条件の左側が false のときにだけコマンドを実行するためにこの特徴を利用する人もいます。
=======
    In the first line, the OR `||` operator stops the evaluation immediately upon seeing `true`, so the `alert` isn't run.

    Sometimes, people use this feature to execute commands only if the condition on the left part is falsy.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## && (AND) 

AND 演算子は2つのアンパサンド `&&` で表されます:

```js
result = a && b;
```

<<<<<<< HEAD
古典的なプログラミングでは、AND は両方のオペランドが真のときに `true` を返します。それ以外の場合は `false` です:
=======
In classical programming, AND returns `true` if both operands are truthy and `false` otherwise:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

`if` の例:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}
```

<<<<<<< HEAD
OR のように、AND のオペランドとして任意の値が許可されています:
=======
Just as with OR, any value is allowed as an operand of AND:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
if (1 && 0) { // true && false として評価される
  alert( "won't work, because the result is falsy" );
}
```


<<<<<<< HEAD
## AND は最初の偽値を探します 
=======
## AND "&&" finds the first falsy value
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

複数のANDされた値が与えられました:

```js
result = value1 && value2 && value3;
```

<<<<<<< HEAD
AND `"&&"` 演算子は次のように動きます:

- 左から右にオペランドを評価します。
- それぞれのオペランドで、それを Boolean に変換します。もしも結果が `false` の場合、ストップしそのオペランドの本来の値を返します。
- もしもすべての他のオペランドが評価された場合(i.e. すべて `真` のとき), 最後のオペランドを返します。
=======
The AND `&&` operator does the following:

- Evaluates operands from left to right.
- For each operand, converts it to a boolean. If the result is `false`, stops and returns the original value of that operand.
- If all operands have been evaluated (i.e. all were truthy), returns the last operand.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

つまり、ANDは最初の偽値、またはない場合には最後の値を返します。

上のルールはORと似ています。違いはANDは最初の *偽値* でORは最初の *真値* です。

例:

```js run
// 最初のオペランドが真の場合、
// AND は2つ目のオペランドを返す:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// 最初のオペランドが偽の場合、
// AND はそれを返します。2つ目のオペランドは無視されます。
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

より多くの値を渡すこともできます。どのように最初の偽値が返却されるか見てください。:

```js run
alert( 1 && 2 && null && 3 ); // null
```

すべての値が真のとき、最後の値が返却されます。:

```js run
alert( 1 && 2 && 3 ); // 3, 最後のオペランド
```

<<<<<<< HEAD
````smart header="AND `&&` は OR `||` の前に実行します"
AND `&&` 演算子の優先順位は OR `||` よりも高いです。

そのため、コード `a && b || c && d` は `&&` 式が括弧の中にある場合 `(a && b) || (c && d)` と本質的に同じです。
````

````warn header="`if` を `||` や `&&` に置き換えないでください"
時々、AND `&&` 演算子を "`if`を短く書く方法" として利用する人がいます。
=======
````smart header="Precedence of AND `&&` is higher than OR `||`"
The precedence of AND `&&` operator is higher than OR `||`.

So the code `a && b || c && d` is essentially the same as if the `&&` expressions were in parentheses: `(a && b) || (c && d)`.
````

````warn header="Don't replace `if` with `||` or `&&`"
Sometimes, people use the AND `&&` operator as a "shorter way to write `if`".
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

<<<<<<< HEAD
`&&` の右側のアクションは、その評価に到達した場合にのみ実行されます。つまり: `(x > 0)` が true の場合のみです。
=======
The action in the right part of `&&` would execute only if the evaluation reaches it. That is, only if `(x > 0)` is true.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

なので、基本的に同じことをする別の方法があります:

```js run
let x = 1;

if (x > 0) alert( 'Greater than zero!' );
```

<<<<<<< HEAD
`&&` を含むやり方は、より短いように見えますが、`if` はより明白で、読みやすい傾向にあります。そのため、すべての構文をその目的に合わせて使うことを推奨します。条件判定が必要なら `if` を、論理積が必要なら `&&` を使います。
=======
Although, the variant with `&&` appears shorter, `if` is more obvious and tends to be a little bit more readable. So we recommend using every construct for its purpose: use `if` if we want `if` and use `&&` if we want AND.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
````


## ! (NOT) 

<<<<<<< HEAD
真偽値否定演算子は感嘆符 `"!"` で表現されます。
=======
The boolean NOT operator is represented with an exclamation sign `!`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

構文はとてもシンプルです:

```js
result = !value;
```

演算子は1つの引数を取り、次のようにします:

<<<<<<< HEAD
1. オペランドを真偽値型に変換します: `true/false`。
2. 逆の値を返します。
=======
1. Converts the operand to boolean type: `true/false`.
2. Returns the inverse value.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:

```js run
alert( !true ); // false
alert( !0 ); // true
```

2つの否定 `!!` は値を真偽値型に変換するために使われることがあります:

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

<<<<<<< HEAD
つまり、最初の NOT は値を真偽値に変換しその逆を返します。そして、2つ目の NOT は再びその逆をします。最終的に、明示的な値からブール値への変換を行います。
=======
That is, the first NOT converts the value to boolean and returns the inverse, and the second NOT inverses it again. In the end, we have a plain value-to-boolean conversion.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

少し冗長ですが同じことをする方法があります -- 組み込みの `Boolean` 関数です。:

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

<<<<<<< HEAD
NOT `!` の優先順はすべての論理演算子でもっとも高いので、`&&` や `||` よりも常に最初に実行されます。
=======
The precedence of NOT `!` is the highest of all logical operators, so it always executes first, before `&&` or `||`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
