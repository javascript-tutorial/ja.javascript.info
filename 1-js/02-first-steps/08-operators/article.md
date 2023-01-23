<<<<<<< HEAD
# 演算子

多くの演算子は既に学校で学んでおり、よく知られています。加算 `+`, 乗算 `*`, 減算 `-` などです。

このチャプターでは、単純な演算子から初めて、次に学校の数学ではカバーされないJavaScript 固有の側面に集中していきます。

## 用語： "単項演算子"、 "二項演算子"、 "オペランド" 

次に進む前に一般的な用語を理解しましょう。

- *オペランド* -- は演算子が適用されるものです。たとえば、 乗算 `5 * 2` では、2つのオペランドがあります: 左のオペランドは `5`, 右のオペランドは `2` です。"オペランド" は "引数" と呼ばれることもあります。
- 演算子が単一のオペランドをもつ場合は *単項演算* です。たとえば、負の単項演算 `"-"` は数値の符号を反転します:
=======
# Basic operators, maths

We know many operators from school. They are things like addition `+`, multiplication `*`, subtraction `-`, and so on.

In this chapter, we’ll start with simple operators, then concentrate on JavaScript-specific aspects, not covered by school arithmetic.

## Terms: "unary", "binary", "operand"

Before we move on, let's grasp some common terminology.

- *An operand* -- is what operators are applied to. For instance, in the multiplication of `5 * 2` there are two operands: the left operand is `5` and the right operand is `2`. Sometimes, people call these "arguments" instead of "operands".
- An operator is *unary* if it has a single operand. For example, the unary negation `-` reverses the sign of a number:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
<<<<<<< HEAD
    alert( x ); // -1, 負の単項演算が適用されました
    ```
- 演算子が2つのオペランドを持つ場合は *二項演算* です。同じマイナスも二項演算で同様に存在します:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, 二項演算子マイナスは値を減算します
    ```

    正式には、ここでは2つの異なる演算子について話をしています。: 負の単項演算(単一のオペランド, 符号の反転)　と二項演算による減算(2つのオペランド、減算)です。

## Maths

以下の算術演算子がサポートされています:

- 加算 `+`,
- 減算 `-`,
- 乗算 `*`,
- 除算 `/`,
- 剰余 `%`,
- べき乗 `**`.

最初の４つはそのままです。`%` と `**` は以下で補足します。

### 剰余  %

剰余演算子 `%` は % という表記にも関わらずパーセントとは関係ありません。

`a % b` の結果は `a` を `b` で除算した[あまり](https://en.wikipedia.org/wiki/Remainder)です。

例:

```js run
alert( 5 % 2 ); // 1, 5 / 2 のあまり
alert( 8 % 3 ); // 2, 8 / 3 のあまり
```

### べき乗 **

べき乗演算子 `a ** b` は `a` 自身を `b` 回かけます。

例:

```js run
alert( 2 ** 2 ); // 4  (2 を 2 回)
alert( 2 ** 3 ); // 8  (2 * 2 * 2, 3 回)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2, 4 回)
```

数学的には、べき乗は非整数値も同様に定義されています。例えば、平方根は 1/2` によるべき乗です:

```js run
alert( 4 ** (1/2) ); // 2 (1/2 の累乗は平方根と同じです)
alert( 8 ** (1/3) ); // 2 (1/3 の累乗は立方根と同じです)
```


## 文字列の連結、二項演算子 + 

では、学校の算数を超えた JavaScript 演算子の特別な機能を見ていきましょう。

通常、プラス演算子 `+` は数値の合計です。

しかし二項演算子 `+` が文字列に適用された場合は、お互いの文字を結合します。
=======
    alert( x ); // -1, unary negation was applied
    ```
- An operator is *binary* if it has two operands. The same minus exists in binary form as well:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, binary minus subtracts values
    ```

    Formally, in the examples above we have two different operators that share the same symbol: the negation operator, a unary operator that reverses the sign, and the subtraction operator, a binary operator that subtracts one number from another.

## Maths

The following math operations are supported:

- Addition `+`,
- Subtraction `-`,
- Multiplication `*`,
- Division `/`,
- Remainder `%`,
- Exponentiation `**`.

The first four are straightforward, while `%` and `**` need a few words about them.

### Remainder %

The remainder operator `%`, despite its appearance, is not related to percents.

The result of `a % b` is the [remainder](https://en.wikipedia.org/wiki/Remainder) of the integer division of `a` by `b`.

For instance:

```js run
alert( 5 % 2 ); // 1, the remainder of 5 divided by 2
alert( 8 % 3 ); // 2, the remainder of 8 divided by 3
alert( 8 % 4 ); // 0, the remainder of 8 divided by 4
```

### Exponentiation **

The exponentiation operator `a ** b` raises `a` to the power of `b`.

In school maths, we write that as a<sup>b</sup>.

For instance:

```js run
alert( 2 ** 2 ); // 2² = 4
alert( 2 ** 3 ); // 2³ = 8
alert( 2 ** 4 ); // 2⁴ = 16
```

Just like in maths, the exponentiation operator is defined for non-integer numbers as well.

For example, a square root is an exponentiation by ½:

```js run
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
```


## String concatenation with binary +

Let's meet the features of JavaScript operators that are beyond school arithmetics.

Usually, the plus operator `+` sums numbers.

But, if the binary `+` is applied to strings, it merges (concatenates) them:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let s = "my" + "string";
alert(s); // mystring
```

<<<<<<< HEAD
一方のオペランドが文字列の場合、他のオペランドも文字列に変換されることに注意してください。

例:
=======
Note that if any of the operands is a string, then the other one is converted to a string too.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

<<<<<<< HEAD
ご覧の通り、どちらのオペランドが文字列なのかは関係ありません。

こちらはより複雑な例です:

```js run
alert(2 + 2 + '1' ); // "41" であり、"221" ではありません
```

ここで、演算子は順番に動作します。最初の `+` が２つの数値を合計し `4` を返します。次に、2つ目の `+` が文字列 `1` を足します。なので、`4 + '1' = '41'` のようになります。

```js run
alert('1' + 2 + 2); // "122" であり "14" ではありません
```
ここで、最初のオペランドは文字列なので、コンパイラは他の2つのオペランドも文字列として扱います。`2` は `'1'` と連結するので、`'1' + 2 = "12"` となり、 `"12" + 2 = "122"` となります。

二項演算子の `+` はこのような方法で文字列をサポートする唯一の演算子です。他の算術演算子は数値でのみ動作し、常にオペランドを数値に変換します。

例えば、減算と除算です:

```js run
alert( 6 - '2' ); // 4, '2' を数値に変換します
alert( '6' / '2' ); // 3, 両方のオペランドを数値に変換します
```

## 数値変換 単項演算子 + 

プラス `+` は2つの形で存在します。上で使ったような二項演算の形式と単項演算の形式です。

単項演算子プラス、もしくは言い換えると単一の値に適用されるプラス演算子 `+` は、数値に対しては何もしません。しかし、オペランドが数値でない場合は数値に変換します。

例:

```js run
// 数値の場合、何の影響もありません
=======
See, it doesn't matter whether the first operand is a string or the second one.

Here's a more complex example:

```js run
alert(2 + 2 + '1' ); // "41" and not "221"
```

Here, operators work one after another. The first `+` sums two numbers, so it returns `4`, then the next `+` adds the string `1` to it, so it's like `4 + '1' = '41'`.

```js run
alert('1' + 2 + 2); // "122" and not "14"
```
Here, the first operand is a string, the compiler treats the other two operands as strings too. The `2` gets concatenated to `'1'`, so it's like `'1' + 2 = "12"` and `"12" + 2 = "122"`.

The binary `+` is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.

Here's the demo for subtraction and division:

```js run
alert( 6 - '2' ); // 4, converts '2' to a number
alert( '6' / '2' ); // 3, converts both operands to numbers
```

## Numeric conversion, unary +

The plus `+` exists in two forms: the binary form that we used above and the unary form.

The unary plus or, in other words, the plus operator `+` applied to a single value, doesn't do anything to numbers. But if the operand is not a number, the unary plus converts it into a number.

For example:

```js run
// No effect on numbers
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
<<<<<<< HEAD
// 非数値を数値に変換します
=======
// Converts non-numbers
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

<<<<<<< HEAD
これは `Number(...)` と同じですが、より短い表現です。

文字列から数値への変換が必要なケースは多いです。例えば、HTMLのフォームフィールドから値を取得する場合、それらは通常文字列です。今、それらの合計が欲しい場合はどうなるでしょう？

二項演算子プラスはそれらを文字列として結合します。:
=======
It actually does the same thing as `Number(...)`, but is shorter.

The need to convert strings to numbers arises very often. For example, if we are getting values from HTML form fields, they are usually strings. What if we want to sum them?

The binary plus would add them as strings:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let apples = "2";
let oranges = "3";

<<<<<<< HEAD
alert( apples + oranges ); // "23", 二項演算子プラスは文字列を結合します
```

数値として扱いたい場合は変換して合計します:
=======
alert( apples + oranges ); // "23", the binary plus concatenates strings
```

If we want to treat them as numbers, we need to convert and then sum them:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let apples = "2";
let oranges = "3";

*!*
<<<<<<< HEAD
// 二項演算子プラスの処理の前に、両方の値が数値に変換されます
alert( +apples + +oranges ); // 5
*/!*

// 長い書き方
// alert( Number(apples) + Number(oranges) ); // 5
```

数学者の立場からは、余分なプラスは奇妙に見えるかもしれません。しかし、プログラマの立場からは特殊なことではありません: 単項演算子プラスが最初に適用され、文字列から数値に変換されます。次に二項演算子プラスはそれらを合計します。

なぜ二項演算子プラスの前に単項演算子プラスが適用されるのでしょうか？ それは、単項演算子プラスの *優先順位が高いため* です。

## 演算子の優先順位 

式が1つ以上の演算子をもつ場合、実行順はそれらの *優先順位* により決められます。言い換えると、演算子の間には暗黙の優先順があります。

学校で学んだように、式 `1 + 2 * 2` の場合、私たちは加算の前に乗算をすることを知っています。それがまさに優先順位です。乗算は加算より *より高い優先順位* です。

丸括弧はどの優先順位よりも優位に立つので、もとの優先順位が不適当であれば丸括弧を使います。たとえば `(1 + 2) * 2` のようにです。

JavaScriptでは多くの演算子があります。どの演算子も対応する優先順位を持っています。より大きな値をもつ演算子は最初に実行されます。同じ優先順の場合、実行順は左から右になります。

[優先順位テーブル](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence)の抜粋(これを覚えておく必要はありませんが、単項演算子は対応する二項演算子よりも優先順位が高いことに留意してください):

| 優先順位 | 名前 | 符号 |
|------------|------|------|
| ... | ... | ... |
| 15 | 単項プラス | `+` |
| 15 | 単項否定 | `-` |
| 14 | 冪乗 | `**` |
| 13 | 乗算 | `*` |
| 13 | 除算 | `/` |
| 12 | 加算 | `+` |
| 12 | 減算 | `-` |
| ... | ... | ... |
| 2 | 代入 | `=` |
| ... | ... | ... |

ご覧の通り、 "単項演算子プラス" は優先順位 `15` で、 "加算" の `12` よりも大きいです(二項演算子プラス)。なので、式 `"+apples + +oranges"` において、単項演算子プラスは最初に動作し、次に加算が実行されます。

## 代入 

代入 `=` もまた演算子であることに注意しましょう。 `2`というとても低い値として優先順位の一覧に並んでいます。

なので `x = 2 * 2 + 1` のように変数に代入するとき、計算が最初に行われ、その後 `=` が評価され、 `x` に結果が格納されます。
=======
// both values converted to numbers before the binary plus
alert( +apples + +oranges ); // 5
*/!*

// the longer variant
// alert( Number(apples) + Number(oranges) ); // 5
```

From a mathematician's standpoint, the abundance of pluses may seem strange. But from a programmer's standpoint, there's nothing special: unary pluses are applied first, they convert strings to numbers, and then the binary plus sums them up.

Why are unary pluses applied to values before the binary ones? As we're going to see, that's because of their *higher precedence*.

## Operator precedence

If an expression has more than one operator, the execution order is defined by their *precedence*, or, in other words, the default priority order of operators.

From school, we all know that the multiplication in the expression `1 + 2 * 2` should be calculated before the addition. That's exactly the precedence thing. The multiplication is said to have *a higher precedence* than the addition.

Parentheses override any precedence, so if we're not satisfied with the default order, we can use them to change it. For example, write `(1 + 2) * 2`.

There are many operators in JavaScript. Every operator has a corresponding precedence number. The one with the larger number executes first. If the precedence is the same, the execution order is from left to right.

Here's an extract from the [precedence table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) (you don't need to remember this, but note that unary operators are higher than corresponding binary ones):

| Precedence | Name | Sign |
|------------|------|------|
| ... | ... | ... |
| 14 | unary plus | `+` |
| 14 | unary negation | `-` |
| 13 | exponentiation | `**` |
| 12 | multiplication | `*` |
| 12 | division | `/` |
| 11 | addition | `+` |
| 11 | subtraction | `-` |
| ... | ... | ... |
| 2 | assignment | `=` |
| ... | ... | ... |

As we can see, the "unary plus" has a priority of `14` which is higher than the `11` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.

## Assignment

Let's note that an assignment `=` is also an operator. It is listed in the precedence table with the very low priority of `2`.

That's why, when we assign a variable, like `x = 2 * 2 + 1`, the calculations are done first and then the `=` is evaluated, storing the result in `x`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

<<<<<<< HEAD
### 代入 = は値を返します

`=` が演算子であり、"魔法の" 言語構造でないという事実は、興味深い意味合いを持っています。

JavaScript のすべての演算子は値を返却します。これは `+` や `-` では明らかですが、`=` の場合にも当てはまります。

`x = value` の呼び出しでは、`value` を `x` に書き込み、*その値を返却します。*

これは、複雑な式の一部に代入を使用した例です:
=======
### Assignment = returns a value

The fact of `=` being an operator, not a "magical" language construct has an interesting implication.

All operators in JavaScript return a value. That's obvious for `+` and `-`, but also true for `=`.

The call `x = value` writes the `value` into `x` *and then returns it*.

Here's a demo that uses an assignment as part of a more complex expression:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
上記の例では、式 `(a = b + 1)` の結果は `a` に代入された値（つまり `3`）です。その後、以降の評価で利用されています。

面白いですよね？ JavaScript ライブラリで時々目にするので、これがどのように動くのかは理解しておく必要があります。

ですが、このようなコードは書かないでください。このようなトリッキーな書き方がコードの動きを明確にしたり、可読性をあげることはありません。

# 代入のチェーン

もう１つの興味深い特徴は、代入をチェーンする機能です:
=======
In the example above, the result of expression `(a = b + 1)` is the value which was assigned to `a` (that is `3`). It is then used for further evaluations.

Funny code, isn't it? We should understand how it works, because sometimes we see it in JavaScript libraries.

Although, please don't write the code like that. Such tricks definitely don't make code clearer or readable.

### Chaining assignments

Another interesting feature is the ability to chain assignments:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
チェーンされた代入は右から左へ評価されます。最初に最も右の式 `2 + 2` が評価され、次に左の変数に代入されます。: `c`, `b` と `a`です。最後にすべての変数は単一の値になります。

改めて言いますが、可読性を上げるためには、このようなコードを複数行に分割する方がよいです:
=======
Chained assignments evaluate from right to left. First, the rightmost expression `2 + 2` is evaluated and then assigned to the variables on the left: `c`, `b` and `a`. At the end, all the variables share a single value.

Once again, for the purposes of readability it's better to split such code into few lines:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
c = 2 + 2;
b = c;
a = c;
```
<<<<<<< HEAD
これは読みやすいですね。コードを素早く眺めているときには特に。

## インプレース(in-place)修正

変数に演算子を適用したあと、新しい結果を同じ変数に格納したいことは頻繁にあります。

例:
=======
That's easier to read, especially when eye-scanning the code fast.

## Modify-in-place

We often need to apply an operator to a variable and store the new result in that same variable.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let n = 2;
n = n + 5;
n = n * 2;
```

<<<<<<< HEAD
この表記は演算子 `+=` や `*=` を使用して短縮することができます:

```js run
let n = 2;
n += 5; // n = 7 (n = n + 5 と同じ)
n *= 2; // n = 14 (n = n * 2 と同じ)
=======
This notation can be shortened using the operators `+=` and `*=`:

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

alert( n ); // 14
```

<<<<<<< HEAD
短縮の "変更と代入" 演算子はすべての算術演算とビット演算子に存在します: `/=`, `-=` 等

このような演算子は通常の代入と同じ優先順位になります。なので、他のほとんどの計算の後に実行されます:
=======
Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.

Such operators have the same precedence as a normal assignment, so they run after most other calculations:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let n = 2;

<<<<<<< HEAD
n *= 3 + 5;

alert( n ); // 16  (最初に右辺が評価されるので n *= 8　と同じです)
```

## インクリメント/デクリメント 

<!-- Can't use -- in title, because built-in parse turns it into – -->

数値を1ずつ増減する操作は、最も一般的な数値演算の1つです。

なので、そのための特別な演算子があります:

- **インクリメント** `++` 変数を1増加させる:

    ```js run no-beautify
    let counter = 2;
    counter++;      // counter = counter + 1 と同じですがより短いです
    alert( counter ); // 3
    ```
- **デクリメント** `--` 変数を1減少させる:

    ```js run no-beautify
    let counter = 2;
    counter--;      // counter = counter - 1 と同じですがより短いです
=======
n *= 3 + 5; // right part evaluated first, same as n *= 8

alert( n ); // 16
```

## Increment/decrement

<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->

Increasing or decreasing a number by one is among the most common numerical operations.

So, there are special operators for it:

- **Increment** `++` increases a variable by 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // works the same as counter = counter + 1, but is shorter
    alert( counter ); // 3
    ```
- **Decrement** `--` decreases a variable by 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // works the same as counter = counter - 1, but is shorter
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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

それらに違いはあるでしょうか？はい、その違いは `++/--` の戻り値を使う場合にだけ現れます。

違いを明確にしましょう。ご存知の通り、すべての演算子は値を返します。インクリメント/デクリメントも例外ではありません。前置式は新しい値を返す一方、後置式は古い値を返します(インクリメント/デクリメントの前)。

違いを例で見てみましょう。
=======
Increment/decrement can only be applied to variables. Trying to use it on a value like `5++` will give an error.
```

The operators `++` and `--` can be placed either before or after a variable.

- When the operator goes after the variable, it is in "postfix form": `counter++`.
- The "prefix form" is when the operator goes before the variable: `++counter`.

Both of these statements do the same thing: increase `counter` by `1`.

Is there any difference? Yes, but we can only see it if we use the returned value of `++/--`.

Let's clarify. As we know, all operators return a value. Increment/decrement is no exception. The prefix form returns the new value while the postfix form returns the old value (prior to increment/decrement).

To see the difference, here's an example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

<<<<<<< HEAD
ここで `(*)` の行の前置呼び出し `++counter` は `counter` を増加させ、`2` という新しい値を返します。そのため、 `alert` は `2` を表示します。

後置式を使いましょう:

```js run
let counter = 1;
let a = counter++; // (*) ++counter を counter++ に変更
=======
In the line `(*)`, the *prefix* form `++counter` increments `counter` and returns the new value, `2`. So, the `alert` shows `2`.

Now, let's use the postfix form:

```js run
let counter = 1;
let a = counter++; // (*) changed ++counter to counter++
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

alert(a); // *!*1*/!*
```

<<<<<<< HEAD
`(*)` の行で、 *後置* 式 `counter++` は `counter` を増加させますが、 *古い* 値を返します(増加する前)。そのため、 `alert` は `1` を表示します。

要約すると:

- インクリメント/デクリメントの結果を使わない場合、どちらの形式を使っても違いはありません。:
=======
In the line `(*)`, the *postfix* form `counter++` also increments `counter` but returns the *old* value (prior to increment). So, the `alert` shows `1`.

To summarize:

- If the result of increment/decrement is not used, there is no difference in which form to use:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    let counter = 0;
    counter++;
    ++counter;
<<<<<<< HEAD
    alert( counter ); // 2, 上の行は同じことをします
    ```
- 値の増加に *加えて*、すぐに演算子の結果を使いたい場合は前置式が必要になります:
=======
    alert( counter ); // 2, the lines above did the same
    ```
- If we'd like to increase a value *and* immediately use the result of the operator, we need the prefix form:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
<<<<<<< HEAD
- 増加させるが、以前の値を使いたい場合は後置式が必要です:
=======
- If we'd like to increment a value but use its previous value, we need the postfix form:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

<<<<<<< HEAD
````smart header="他の演算子の中でのインクリメント/デクリメント"
演算子 `++/--` は同様に式の中でも使うことができます。それらの優先順位は他の算術演算子よりも高いです。

例:
=======
````smart header="Increment/decrement among other operators"
The operators `++/--` can be used inside expressions as well. Their precedence is higher than most other arithmetical operations.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

<<<<<<< HEAD
比較:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, counter++ は "古い" 値を返すからです
```

技術的には問題ありませんが、このような記法は一般的にコードの可読性を下げます。1行で複数のことを行う -- よいことではありません。

コードを読むとき、上から読んでいく "縦の" 目視はこのような `counter++` を見逃しやすく、また変数の増加が明白ではありません。

"1行は1アクション" のスタイルが推奨されます:
=======
Compare with:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, because counter++ returns the "old" value
```

Though technically okay, such notation usually makes code less readable. One line does multiple things -- not good.

While reading code, a fast "vertical" eye-scan can easily miss something like `counter++` and it won't be obvious that the variable increased.

We advise a style of "one line -- one action":
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

<<<<<<< HEAD
## ビット演算子 

ビット演算子は引数を 32ビットの整数値として扱い、それらのバイナリ表現のレベルで処理します。

これらの演算子はJavaScript固有のものではありません。多くのプログラミング言語でサポートされています。

演算子のリスト:
=======
## Bitwise operators

Bitwise operators treat arguments as 32-bit integer numbers and work on the level of their binary representation.

These operators are not JavaScript-specific. They are supported in most programming languages.

The list of operators:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

<<<<<<< HEAD
これらの演算子はめったに使われません。それらを理解するためには、低レベルの数値表現について掘り下げるべきであり、それは現時点では最適ではないでしょう。すぐには必要ないからです。もし興味がある場合は、MDNの[ビット演算子 ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators#binary_bitwise_operators)の記事を参照してください。実際に必要になったときにそれをするのが現実的でしょう。

## カンマ 

カンマ演算子 `','` は最もレアで普通ではない演算子の1つです。より短いコード書くために使われることがあるので、何が起こっているのか理解するために知っておく必要があります。

カンマ演算子を使うと複数の式を評価できます。それらの式はカンマ `','` で区切られています。それぞれが評価されますが、最後の結果のみが返却されます。

例:
=======
These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) chapter on MDN when a need arises.

## Comma

The comma operator `,` is one of the rarest and most unusual operators. Sometimes, it's used to write shorter code, so we need to know it in order to understand what's going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma `,`. Each of them is evaluated but only the result of the last one is returned.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

<<<<<<< HEAD
alert( a ); // 7 (3 + 4 の結果)
```

ここで、最初の式 `1 + 2` は評価され、その結果はどこかへ捨てられます。次に `3 + 4` が評価され、結果として返却されます。

```smart header="カンマはとても優先順が低いです"
カンマ演算子はとても優先順位が低いことに注意してください。 `=` よりも低いため、上の例では丸括弧が重要です。

それらがない場合: `a = 1 + 2, 3 + 4` は `+` を最初に評価し、数値を `a = 3, 7` に加算します。次に代入演算子 `=` が `a = 3` を割り当てます。そして、カンマのあとの `7` は処理されず、無視されます。
```

なぜこのような、最後の部分を除いてすべてを捨てる演算子が必要なのでしょうか？

より複雑な構造において、1行で複数のアクションを書くときに使用される場合があります。

例:

```js
// 1行に3つの演算子
=======
alert( a ); // 7 (the result of 3 + 4)
```

Here, the first expression `1 + 2` is evaluated and its result is thrown away. Then, `3 + 4` is evaluated and returned as the result.

```smart header="Comma has a very low precedence"
Please note that the comma operator has very low precedence, lower than `=`, so parentheses are important in the example above.

Without them: `a = 1 + 2, 3 + 4` evaluates `+` first, summing the numbers into `a = 3, 7`, then the assignment operator `=` assigns `a = 3`, and the rest is ignored. It's like `(a = 1 + 2), 3 + 4`.
```

Why do we need an operator that throws away everything except the last expression?

Sometimes, people use it in more complex constructs to put several actions in one line.

For example:

```js
// three operations in one line
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

<<<<<<< HEAD
このようなトリックは多くのJavaScriptフレームワークで利用されているため、ここで言及しています。しかし通常それらはコードの可読性を下げます。なので、そのように書く前によく考えるべきです。
=======
Such tricks are used in many JavaScript frameworks. That's why we're mentioning them. But usually they don't improve code readability so we should think well before using them.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
