# 論理演算子

JavaScriptには3つの論理演算子があります:  `||` (OR:論理和), `&&` (AND:論理積), `!` (NOT:否定)

<<<<<<< HEAD
それらは "論理" と呼ばれますが、Boolean 型だけでなく、どの型の値にも適用することができます。結果もまた任意の型になります。
=======
Although they are called "logical", they can be applied to values of any type, not only boolean. Their result can also be of any type.
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

詳細を見てみましょう:

<<<<<<< HEAD
[cut]

## || (OR) 
=======
## || (OR)
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

"OR" 演算子は2つの縦の記号で表現されます:

```js
result = a || b;
```

<<<<<<< HEAD
古典的なプログラミングでは、論理和は真偽値のみを操作することを意味していました。もしもその引数のいずれかが `true` の場合、それは `true` を返します。そうでなければ `false` を返します。

JavaScriptでは、演算子は少し難解ですが強力です。最初に真偽値で起こることを見てみましょう。
=======
In classical programming, the logical OR is meant to manipulate boolean values only. If any of its arguments are `true`, it returns `true`, otherwise it returns `false`.

In JavaScript, the operator is a little bit trickier and more powerful. But first, let's see what happens with boolean values.
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

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
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

```js run
if (1 || 0) { // if( true || false ) のように動作します
  alert( 'truthy!' );
}
```

<<<<<<< HEAD
ほとんどの場合、OR `||` は `if` 文の中で、与えられた条件のいずれかが正しいかを確認するのに使われます。
=======
Most of the time, OR `||` is used in an `if` statement to test if *any* of the given conditions is `true`.
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

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
## OR "||" finds the first truthy value

The logic described above is somewhat classical. Now, let's bring in the "extra" features of JavaScript.
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

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
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

値は変換されていない元の形式で返却されます。

<<<<<<< HEAD
つまり、OR `"||"` のチェーンは最初に真となる値を返し、そのような値がない場合には最後のオペランドが返却されます。
=======
In other words, a chain of OR `"||"` returns the first truthy value or the last one if no truthy value is found.
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

例:

```js run
alert( 1 || 0 ); // 1 (1 は真)
alert( true || 'no matter what' ); // (true は真)

alert( null || 1 ); // 1 (1 は最初の真値)
alert( null || 0 || 1 ); // 1 (最初の真値)
alert( undefined || null || 0 ); // 0 (すべて偽、なので最後の値が返却される)
```

<<<<<<< HEAD
それは "純粋で昔ながらの真偽値のみの OR" と比較して、いくつかの興味深い使用方法につながります。

1. **変数または式のリストから最初の真値を取得する**

    変数がいくつかある状態を想像してください。そして、それらの変数は値を持つか `null/undefined` とします。そして、今、私たちは最初のデータ(`null/undefined` ではない値)を選ぶ必要があります。

    このために OR `||` が利用できます:
=======
This leads to some interesting usage compared to a "pure, classical, boolean-only OR".

1. **Getting the first truthy value from a list of variables or expressions.**

    Imagine we have a list of variables which can either contain data or be `null/undefined`. How can we find the first one with data?

    We can use OR `||`:
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

    ```js run
    let currentUser = null;
    let defaultUser = "John";

    *!*
    let name = currentUser || defaultUser || "unnamed";
    */!*

    alert( name ); // "John" – 最初の真値です
    ```

<<<<<<< HEAD
    `currentUser` と `defaultUser` が共に偽の場合、`"unnamed"` が結果になります。
2. **短絡評価(最小評価)**

    オペランドには値だけでなく、任意の式を使用できます。 ORは左から右へ評価、テストをします。
    真値に到達したとき、評価はストップし、その値が返却されます。この処理は左から右にできるだけ短くなるように行われるため、"短絡評価" と呼ばれます。

    これは、2番目の引数として与えられた式が変数への代入のような、副作用を持つ場合によく分かります。:

    下の例を実行した場合、`x` は割り当てられません。:
=======
    If both `currentUser` and `defaultUser` were falsy, `"unnamed"` would be the result.
2. **Short-circuit evaluation.**

    Operands can be not only values, but arbitrary expressions. OR evaluates and tests them from left to right. The evaluation stops when a truthy value is reached, and the value is returned. This process is called "a short-circuit evaluation" because it goes as short as possible from left to right.

    This is clearly seen when the expression given as the second argument has a side effect like a variable assignment.

    In the example below, `x` does not get assigned:
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

    ```js run no-beautify
    let x;

    *!*true*/!* || (x = 1);

    alert(x); // undefined, なぜなら (x = 1) は評価されないからです
   ```

<<<<<<< HEAD
    ...また、1つ目の引数が `false` の場合、 `OR` は次へ行き2つ目の評価を行い、代入をします:
=======
    If, instead, the first argument is `false`, `||` evaluates the second one, thus running the assignment:
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

    ```js run no-beautify
    let x;

    *!*false*/!* || (x = 1);

    alert(x); // 1
    ```

<<<<<<< HEAD
    代入は単純なケースであり、他の副作用が発生する可能性があります。

    ご覧のように、このようなユースケースは "`if` をするより短い方法" です。最初のオペランドは真偽値に変換され、もしもそれが偽の場合は2つ目が評価されます。

    便利なときもありますが、たいていの場合は理解しやすいコードにするために、 `if` を使う方がよいでしょう。
=======
    An assignment is a simple case. There may be side effects, that won't show up if the evaluation doesn't reach them.

    As we can see, such a use case is a "shorter way of doing `if`". The first operand is converted to boolean. If it's false, the second one is evaluated.

    Most of time, it's better to use a "regular" `if` to keep the code easy to understand, but sometimes this can be handy.
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

## && (AND) 

AND 演算子は2つのアンパサンド `&&` で表されます:

```js
result = a && b;
```

<<<<<<< HEAD
古典的なプログラミングでは、AND は両方のオペランドが真のときに `true` を返します。それ以外の場合は `false` です:
=======
In classical programming, AND returns `true` if both operands are truthy and `false` otherwise:
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

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
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

```js run
if (1 && 0) { // true && false として評価される
  alert( "won't work, because the result is falsy" );
}
```


<<<<<<< HEAD
## AND は最初の偽値を探します 
=======
## AND "&&" finds the first falsy value
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

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
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

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

より多くの値を渡すこともできます。
どのように最初の偽値が返却されるか見てください。:

```js run
alert( 1 && 2 && null && 3 ); // null
```

すべての値が真のとき、最後の値が返却されます。:

```js run
alert( 1 && 2 && 3 ); // 3, 最後のオペランド
```

<<<<<<< HEAD
````smart header="AND `&&` は OR `||` の前に実行します"
AND `&&` 演算子の優先順位は OR `||` よりも高いです。そのため、ORの前に実行されます。

下のコードでは、`1 && 0` が最初に計算されます:
=======
````smart header="Precedence of AND `&&` is higher than OR `||`"
The precedence of AND `&&` operator is higher than OR `||`.
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

So the code `a && b || c && d` is essentially the same as if the `&&` expressions were in parentheses: `(a && b) || (c && d)`.
````

ORのように、AND `&&` 演算子は `if` に置き換えることができるときもあります。

例:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

<<<<<<< HEAD
`&&` の右側のアクションは、その評価に到達した場合にのみ実行されます。つまり: `(x > 0)` が true の場合のみです。
=======
The action in the right part of `&&` would execute only if the evaluation reaches it. That is, only if `(x > 0)` is true.
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

なので、基本的に同じことをする別の方法があります:

```js run
let x = 1;

if (x > 0) {
  alert( 'Greater than zero!' );
}
```

<<<<<<< HEAD
`&&` を含むやり方は、より短いように見えます。しかし `if` はより明白で、読みやすい傾向にあります。

なので、すべての構成要素を目的に応じて使うことを推奨します。if が必要なら `if` を使います。AND が必要なら `&&` を使います。
=======
The variant with `&&` appears shorter. But `if` is more obvious and tends to be a little bit more readable.

So we recommend using every construct for its purpose: use `if` if we want if and use `&&` if we want AND.
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

## ! (NOT) 

<<<<<<< HEAD
真偽値否定演算子は感嘆符 `"!"` で表現されます。
=======
The boolean NOT operator is represented with an exclamation sign `!`.
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

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
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

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
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

少し冗長ですが同じことをする方法があります -- 組み込みの `Boolean` 関数です。:

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

The precedence of NOT `!` is the highest of all logical operators, so it always executes first, before `&&` or `||`.
