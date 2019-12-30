# 演算子

<<<<<<< HEAD
多くの演算子は既に学校で学んでおり、よく知られています。加算 `+`, 乗算 `*`, 減算 `-` などです。

このチャプターでは、学校の算数でカバーされていない面に集中します。

[cut]
=======
We know many operators from school. They are things like addition `+`, multiplication `*`, subtraction `-`, and so on.

In this chapter, we'll concentrate on aspects of operators that are not covered by school arithmetic.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

## 用語： "単項演算子"、 "二項演算子"、 "オペランド" 

<<<<<<< HEAD
次に進む前に一般的な用語を理解しましょう。

- *オペランド* -- は演算子が適用されるものです。たとえば、 乗算 `5 * 2` では、2つのオペランドがあります: 左のオペランドは `5`, 右のオペランドは `2` です。"オペランド" は "引数" と呼ばれることもあります。
- 演算子が単一のオペランドをもつ場合は *単項演算* です。たとえば、負の単項演算 `"-"` は数値の符号を反転します:
=======
Before we move on, let's grasp some common terminology.

- *An operand* -- is what operators are applied to. For instance, in the multiplication of `5 * 2` there are two operands: the left operand is `5` and the right operand is `2`. Sometimes, people call these "arguments" instead of "operands".
- An operator is *unary* if it has a single operand. For example, the unary negation `-` reverses the sign of a number:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, 負の単項演算が適用されました
    ```
<<<<<<< HEAD
- 演算子が2つのオペランドを持つ場合は *二項演算* です。同じマイナスも二項演算で同様に存在します:
=======
- An operator is *binary* if it has two operands. The same minus exists in binary form as well:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, 二項演算子マイナスは値を減算します
    ```

<<<<<<< HEAD
    正式には、ここでは2つの異なる演算子について話をしています。: 負の単項演算(単一のオペランド, 符号の反転)　と二項演算による減算(2つのオペランド、減算)です。

## 文字列の連結、二項演算子 + 

では、学校の算術を越えた JavaScript 演算子の特別な機能を見ていきましょう。

通常、プラス演算子 `+` は数値の合計です。

しかし二項演算子 `+` が文字列に適用された場合は、お互いの文字を結合します。
=======
    Formally, in the examples above we have two different operators that share the same symbol: the negation operator, a unary operator that reverses the sign, and the subtraction operator, a binary operator that subtracts one number from another.

## String concatenation, binary +

Now, let's see special features of JavaScript operators that are beyond school arithmetics.

Usually, the plus operator `+` sums numbers.

But, if the binary `+` is applied to strings, it merges (concatenates) them:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js
let s = "my" + "string";
alert(s); // mystring
```

<<<<<<< HEAD
一方のオペランドが文字列の場合、他のオペランドも文字列に変換されることに注意してください。
=======
Note that if one of the operands is a string, the other one is converted to a string too.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

例:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

<<<<<<< HEAD
上のように、どちらのオペランドが文字列なのかは関係ありません。このルールはシンプルで、もしもどちらかのオペランドが文字列の場合、同様に他の一方も文字列に変換されます。

文字列連結や変換は二項演算子プラス `"+"` の特別な機能です。他の算術演算子は数値でのみ動作します。それらは常にオペランドを数値に変換します。
=======
See, it doesn't matter whether the first operand is a string or the second one. The rule is simple: if either operand is a string, the other one is converted into a string as well.

However, note that operations run from left to right. If there are two numbers followed by a string, the numbers will be added before being converted to a string:


```js run
alert(2 + 2 + '1' ); // "41" and not "221"
```

String concatenation and conversion is a special feature of the binary plus `+`. Other arithmetic operators work only with numbers and always convert their operands to numbers.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

例えば、減算と除算です:

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
```

## 数値変換 単項演算子 + 

<<<<<<< HEAD
プラス `+` は2つの形で存在します。上で使ったような二項演算の形式と単項演算の形式です。

単項演算子プラス、もしくは言い換えると単一の値に適用されるプラス演算子 `+` は、数値に対しては何もしません。しかし、オペランドが数値でない場合は数値に変換します。
=======
The plus `+` exists in two forms: the binary form that we used above and the unary form.

The unary plus or, in other words, the plus operator `+` applied to a single value, doesn't do anything to numbers. But if the operand is not a number, the unary plus converts it into a number.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

例:

```js run
// 数値の場合、何の影響もありません
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// 非数値を数値に変換します
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

<<<<<<< HEAD
これは `Number(...)` と同じですが、より短い表現です。

文字列から数値への変換が必要なケースは多いです。例えば、HTMLのフォームフィールドから値を取得する場合、それらは通常文字列です。

今、それらの合計が欲しい場合はどうなるでしょう？
=======
It actually does the same thing as `Number(...)`, but is shorter.

The need to convert strings to numbers arises very often. For example, if we are getting values from HTML form fields, they are usually strings. What if we want to sum them?
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

二項演算子プラスはそれらを文字列として結合します。:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", 二項演算子プラスは文字列を結合します
```

<<<<<<< HEAD
数値として扱いたい場合は変換して合計します:
=======
If we want to treat them as numbers, we need to convert and then sum them:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
let apples = "2";
let oranges = "3";

*!*
// 二項演算子プラスの処理の前に、両方の値が数値に変換されます
alert( +apples + +oranges ); // 5
*/!*

// 長い書き方
// alert( Number(apples) + Number(oranges) ); // 5
```

<<<<<<< HEAD
数学者の立場からは、余分なプラスは奇妙に見えるかもしれません。しかし、プログラマの立場からは特殊なことではありません: 単項演算子プラスが最初に適用され、文字列から数値に変換されます。次に二項演算子プラスはそれらを合計します。

なぜ二項演算子プラスの前に単項演算子プラスが適用されるのでしょうか？
それは、単項演算子プラスの *優先順位が高いため* です。

## 演算子の優先順位 

式が1つ以上の演算子をもつ場合、実行順はそれらの *優先順位* により決められます。言い換えると、演算子の間には暗黙の優先順があります。

学校で学んだように、式 `1 + 2 * 2` の場合、私たちは加算の前に乗算をすることを知っています。それがまさに優先順位です。乗算は加算より *より高い優先順位* です。

丸括弧はどの優先順位よりも優位に立つので、もとの優先順位が不適当であれば丸括弧を使います。たとえば `(1 + 2) * 2` のようにです。

JavaScriptでは多くの演算子があります。どの演算子も対応する優先順位を持っています。より大きな値をもつ演算子は最初に実行されます。同じ優先順の場合、実行順は左から右になります。

[優先順位テーブル](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence)の抜粋(これを覚えておく必要はありませんが、単項演算子は対応する二項演算子よりも優先順位が高いことに留意してください):
=======
From a mathematician's standpoint, the abundance of pluses may seem strange. But from a programmer's standpoint, there's nothing special: unary pluses are applied first, they convert strings to numbers, and then the binary plus sums them up.

Why are unary pluses applied to values before the binary ones? As we're going to see, that's because of their *higher precedence*.

## Operator precedence

If an expression has more than one operator, the execution order is defined by their *precedence*, or, in other words, the default priority order of operators.

From school, we all know that the multiplication in the expression `1 + 2 * 2` should be calculated before the addition. That's exactly the precedence thing. The multiplication is said to have *a higher precedence* than the addition.

Parentheses override any precedence, so if we're not satisfied with the default order, we can use them to change it. For example, write `(1 + 2) * 2`.

There are many operators in JavaScript. Every operator has a corresponding precedence number. The one with the larger number executes first. If the precedence is the same, the execution order is from left to right.

Here's an extract from the [precedence table](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (you don't need to remember this, but note that unary operators are higher than corresponding binary ones):
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117


| 優先順位 | 名前 | 符号 |
|------------|------|------|
| ... | ... | ... |
| 16 | 単項プラス | `+` |
| 16 | 単項否定 | `-` |
| 14 | 乗算 | `*` |
| 14 | 除算 | `/` |
| 13 | 加算 | `+` |
| 13 | 減算 | `-` |
| ... | ... | ... |
| 3 | 代入 | `=` |
| ... | ... | ... |

<<<<<<< HEAD
ご覧の通り、 "単項演算子プラス" は優先順位 `16` で、 "加算" の `13` よりも大きいです(二項演算子プラス)。なので、式 `"+apples + +oranges"` において、単項演算子プラスは最初に動作し、次に加算が実行されます。
=======
As we can see, the "unary plus" has a priority of `16` which is higher than the `13` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

## 代入 

代入 `=` もまた演算子であることに注意しましょう。 `3`というとても低い値として優先順位テーブルにリストされています。

<<<<<<< HEAD
なので`x = 2 * 2 + 1` のように変数を代入するとき、計算が最初に行われ、その後 `=` が評価され、 `x` に結果が格納されます。
=======
That's why, when we assign a variable, like `x = 2 * 2 + 1`, the calculations are done first and then the `=` is evaluated, storing the result in `x`.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

代入をチェーンすることもできます:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

<<<<<<< HEAD
チェーンされた代入は右から左へ評価されます。最初に最も右の式 `2 + 2` が評価され、次に左の変数に代入されます。: `c`, `b` と `a`です。
最後にすべての変数は単一の値になります。

````smart header="代入演算子 `\"=\"` は値を返します"
演算子は常に値を返します。それは加算 `+` または 乗算 `*` のように多くの場合明らかです。しかし代入演算子もそのルールに従います。
=======
Chained assignments evaluate from right to left. First, the rightmost expression `2 + 2` is evaluated and then assigned to the variables on the left: `c`, `b` and `a`. At the end, all the variables share a single value.

````smart header="The assignment operator `\"=\"` returns a value"
An operator always returns a value. That's obvious for most of them like addition `+` or multiplication `*`. But the assignment operator follows this rule too.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

`x = value` の呼び出しは `value` を `x` に書き込み、 *それを返却します*

<<<<<<< HEAD
これは、式の一部に代入を利用した複雑な式のデモです:
=======
Here's a demo that uses an assignment as part of a more complex expression:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

<<<<<<< HEAD
上の例は、`(a = b + 1)` の結果は `a` に代入された値です(`3` です)。その後、それ結果は `3` から減算するのに使われます。

サードパーティーのライブラリで見かけることがあるので、どのように動作するかは理解しておくとよいでしょう。しかし、このようなものは書くべきではありません。このようなトリックは明らかにコードの可読性を損ないます。
=======
In the example above, the result of expression `(a = b + 1)` is the value which was assigned to `a` (that is `3`). It is then used for further evaluations.

Funny code, isn't it? We should understand how it works, because sometimes we see it in JavaScript libraries, but shouldn't write anything like that ourselves. Such tricks definitely don't make code clearer or readable.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
````

## 剰余 % 

<<<<<<< HEAD
剰余演算子 `%` は、記号は % ですが、パーセントと関係はありません。
=======
The remainder operator `%`, despite its appearance, is not related to percents.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

`a % b` の結果は、`a` を `b` で割った余りです。

例:

```js run
alert( 5 % 2 ); // 1は5を2で割った余りです
alert( 8 % 3 ); // 2は8を3で割った余りです
alert( 6 % 3 ); // 0は6を3で割った余りです
```

## べき乗 ** 

べき乗演算子 `**` は最近言語に追加されました。

自然数 `b` において、`a ** b` の結果は、`b` の回数だけ自身 `a` を乗算した結果です。  

例:

```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```

<<<<<<< HEAD
演算子は非整数値の `a` や　`b` でも同様に動作します。例えば:
=======
The operator works for non-integer numbers as well.

For instance:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
alert( 4 ** (1/2) ); // 2 (1/2のべき乗は平方根と同じです)
alert( 8 ** (1/3) ); // 2 (1/3のべき乗は立方根と同じです)
```

## インクリメント/デクリメント 

<!-- Can't use -- in title, because built-in parse turns it into – -->

数値を1ずつ増減する操作は、最も一般的な数値演算の1つです。

<<<<<<< HEAD
なので、そのための特別な演算子があります:
=======
So, there are special operators for it:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

- **インクリメント** `++` 変数を1増加させる:

    ```js run no-beautify
    let counter = 2;
<<<<<<< HEAD
    counter++;      // counter = counter + 1 と同じですがより短いです
=======
    counter++;        // works the same as counter = counter + 1, but is shorter
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
    alert( counter ); // 3
    ```
- **デクリメント** `--` 変数を1減少させる:

    ```js run no-beautify
    let counter = 2;
<<<<<<< HEAD
    counter--;      // counter = counter - 1 と同じですがより短いです
=======
    counter--;        // works the same as counter = counter - 1, but is shorter
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
    alert( counter ); // 1
    ```

```warn
<<<<<<< HEAD
インクリメント/デクリメントは変数に対してのみ適用可能です。 それを `5++` のように値に対して使おうとするとエラーになります。
```

演算子 `++` と `--` は変数の前後両方に配置することができます。

- 演算子が変数の後にある場合、それは "後置式" と呼ばれます: `counter++`。
- "前置式" は演算子が変数の前に来るときです: `++counter`。

結果はどちらも同じです: `counter` を `1` 増加します。
=======
Increment/decrement can only be applied to variables. Trying to use it on a value like `5++` will give an error.
```

The operators `++` and `--` can be placed either before or after a variable.

- When the operator goes after the variable, it is in "postfix form": `counter++`.
- The "prefix form" is when the operator goes before the variable: `++counter`.

Both of these statements do the same thing: increase `counter` by `1`.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

それらに違いはあるでしょうか？はい、その違いは `++/--` の戻り値を使う場合にだけ現れます。

<<<<<<< HEAD
違いを明確にしましょう。ご存知の通り、すべての演算子は値を返します。インクリメント/デクリメントも例外ではありません。前置式は新しい値を返す一方、後置式は古い値を返します(インクリメント/デクリメントの前)。

違いを例で見てみましょう。
=======
Let's clarify. As we know, all operators return a value. Increment/decrement is no exception. The prefix form returns the new value while the postfix form returns the old value (prior to increment/decrement).

To see the difference, here's an example:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

<<<<<<< HEAD
ここで `(*)` の行の前置呼び出し `++counter` は `counter` を増加させ、`2` という新しい値を返します。そのため、 `alert` は `2` を表示します。

後置式を使いましょう:
=======
In the line `(*)`, the *prefix* form `++counter` increments `counter` and returns the new value, `2`. So, the `alert` shows `2`.

Now, let's use the postfix form:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
let counter = 1;
let a = counter++; // (*) ++counter を counter++ に変更

alert(a); // *!*1*/!*
```

<<<<<<< HEAD
`(*)` の行で、 *後置* 式 `counter++` は `counter` を増加させますが、 *古い* 値を返します(増加する前)。そのため、 `alert` は `1` を表示します。
=======
In the line `(*)`, the *postfix* form `counter++` also increments `counter` but returns the *old* value (prior to increment). So, the `alert` shows `1`.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

要約すると:

<<<<<<< HEAD
- インクリメント/デクリメントの結果を使わない場合、どちらの形式を使っても違いはありません。:
=======
- If the result of increment/decrement is not used, there is no difference in which form to use:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, 上の行は同じことをします
    ```
<<<<<<< HEAD
- 値の増加に *加えて*、すぐに演算子の結果を使いたい場合は前置式が必要になります:
=======
- If we'd like to increase a value *and* immediately use the result of the operator, we need the prefix form:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
<<<<<<< HEAD
- 増加させるが、以前の値を使いたい場合は後置式が必要です:
=======
- If we'd like to increment a value but use its previous value, we need the postfix form:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

<<<<<<< HEAD
````smart header="他の演算子の中でのインクリメント/デクリメント"
演算子 `++/--` は同様に式の中でも使うことができます。それらの優先順位は他の算術演算子よりも高いです。
=======
````smart header="Increment/decrement among other operators"
The operators `++/--` can be used inside expressions as well. Their precedence is higher than most other arithmetical operations.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

例:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

比較:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, counter++ は "古い" 値を返すからです
```

<<<<<<< HEAD
技術的には問題ありませんが、このような記法は一般的にコードの可読性を下げます。1行で複数のことを行う -- よいことではありません。

コードを読むとき、上から読んでいく "縦の" 目視はこのような `counter++` を見逃しやすく、また変数の増加が明白ではありません。

"1行は1アクション" のスタイルが推奨されます:
=======
Though technically okay, such notation usually makes code less readable. One line does multiple things -- not good.

While reading code, a fast "vertical" eye-scan can easily miss something like `counter++` and it won't be obvious that the variable increased.

We advise a style of "one line -- one action":
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## ビット演算子 

ビット演算子は引数を 32ビットの整数値として扱い、それらのバイナリ表現のレベルで処理します。

これらの演算子はJavaScript固有のものではありません。多くのプログラミング言語でサポートされています。

演算子のリスト:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

<<<<<<< HEAD
これらの演算子はめったに使われません。それらを理解するためには、低レベルの数値表現について掘り下げるべきであり、それは現時点では最適ではないでしょう。すぐには必要ないからです。もし興味がある場合は、MDNの[ビット演算子 ](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)の記事を参照してください。実際に必要になったときにそれをするのが現実的でしょう。

=======
These operators are used very rarely. To understand them, we need to delve into low-level number representation and it would not be optimal to do that right now, especially since we won't need them any time soon. If you're curious, you can read the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article on MDN. It would be more practical to do that when a real need arises.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

## その場で変更する 

<<<<<<< HEAD
しばしば変数に演算子を適用し、その中に新しい値を格納する必要があります。
=======
We often need to apply an operator to a variable and store the new result in that same variable.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

例:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

<<<<<<< HEAD
この表記法は演算子 `+=` と `*=` を使うことで短縮することができます:
=======
This notation can be shortened using the operators `+=` and `*=`:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
let n = 2;
n += 5; // 今 n = 7 (n = n + 5 と同じ)
n *= 2; // 今 n = 14 (n = n * 2 と同じ)

alert( n ); // 14
```

<<<<<<< HEAD
短い "変更と代入" 演算子はすべての算術演算子とビット演算子に存在します。: `/=`, `-=` など。
=======
Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

このような演算子は通常の代入と同じ優先順位を持っています。そのため、ほとんどの他の計算の後に実行されます:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (右のパートが最初に評価されるので、 n *= 8 と同じです)
```

## カンマ 

<<<<<<< HEAD
カンマ演算子 `','` は最もレアで普通ではない演算子の1つです。より短いコード書くために使われることがあるので、何が起こっているのか理解するために知っておく必要があります。

カンマ演算子を使うと複数の式を評価できます。それらの式はカンマ `','` で区切られています。それぞれが評価されますが、最後の結果のみが返却されます。
=======
The comma operator `,` is one of the rarest and most unusual operators. Sometimes, it's used to write shorter code, so we need to know it in order to understand what's going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma `,`. Each of them is evaluated but only the result of the last one is returned.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

例:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (3 + 4 の結果)
```

<<<<<<< HEAD
ここで、最初の式 `1 + 2` は評価され、その結果はどこかへ捨てられます。次に `3 + 4` が評価され、結果として返却されます。
=======
Here, the first expression `1 + 2` is evaluated and its result is thrown away. Then, `3 + 4` is evaluated and returned as the result.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```smart header="カンマはとても優先順が低いです"
カンマ演算子はとても優先順位が低いことに注意してください。 `=` よりも低いため、上の例では丸括弧が重要です。

<<<<<<< HEAD
それらがない場合: `a = 1 + 2, 3 + 4` は `+` を最初に評価し、数値を `a = 3, 7` に加算します。次に代入演算子 `=` が `a = 3` を割り当てます。そして、カンマのあとの `7` は処理されず、無視されます。
```

なぜこのような、最後の部分を除いてすべてを捨てる演算子が必要なのでしょうか？

より複雑な構造において、1行で複数のアクションを書くときに使用される場合があります。
=======
Without them: `a = 1 + 2, 3 + 4` evaluates `+` first, summing the numbers into `a = 3, 7`, then the assignment operator `=` assigns `a = 3`, and the rest is ignored. It's like `(a = 1 + 2), 3 + 4`.
```

Why do we need an operator that throws away everything except the last expression?

Sometimes, people use it in more complex constructs to put several actions in one line.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

例:

```js
// 1行に3つの演算子
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

<<<<<<< HEAD
このようなトリックは多くのJavaScriptフレームワークで利用されているため、ここで言及しています。しかし通常それらはコードの可読性を下げます。なので、そのように書く前によく考えるべきです。
=======
Such tricks are used in many JavaScript frameworks. That's why we're mentioning them. But usually they don't improve code readability so we should think well before using them.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
