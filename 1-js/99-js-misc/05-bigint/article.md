# BigInt

[recent caniuse="bigint"]

<<<<<<< HEAD
`BigInt` は任意の長さの整数をサポートする特別な数値型です。

bigint は `n` を整数リテラルの末尾に追加するか、文字列や数字などから bigint を作成する関数 `BigInt` を呼び出すことによって生成されます。
=======
`BigInt` is a special numeric type that provides support for integers of arbitrary length.

A bigint is created by appending `n` to the end of an integer literal or by calling the function `BigInt` that creates bigints from strings, numbers etc.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

<<<<<<< HEAD
const bigintFromNumber = BigInt(10); // 10n と同じ
```

## 算術演算子

`BigInt` はほぼ通常の数値のように扱うことができます。例えば:
=======
const bigintFromNumber = BigInt(10); // same as 10n
```

## Math operators

`BigInt` can mostly be used like a regular number, for example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

<<<<<<< HEAD
注意: 除算 `5/2` は小数部分なしでゼロに向かって丸められた結果を返します。すべての bigint に対する操作は bigint を返します。

bigint と通常の数値を混在させることはできません:

```js run
alert(1n + 2); // Error: BigInt と他の型を混ぜることはできません
```

必要なら明示的な変換が必要です: 次のように `BigInt()` か `Number()` を利用します:
=======
Please note: the division `5/2` returns the result rounded towards zero, without the decimal part. All operations on bigints return bigints.

We can't mix bigints and regular numbers:

```js run
alert(1n + 2); // Error: Cannot mix BigInt and other types
```

We should explicitly convert them if needed: using either `BigInt()` or `Number()`, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let bigint = 1n;
let number = 2;

<<<<<<< HEAD
// number から bigint へ
alert(bigint + BigInt(number)); // 3

// bigint から number へ
alert(Number(bigint) + number); // 3
```

変換操作は常に粛々と行われ、決してエラーになりません。が、bigint が大きすぎて数値型にフィットしない場合、余分なビットが切り捨てられるため、このような変換には注意が必要です。

````smart header="bigint では単項プラスはサポートされていません。"
単項プラス演算子 `+value` は `value` を数値に変換するためのよく知られた方法です。

混乱を避けるため、bigint ではサポートされていません:
=======
// number to bigint
alert(bigint + BigInt(number)); // 3

// bigint to number
alert(Number(bigint) + number); // 3
```

The conversion operations are always silent, never give errors, but if the bigint is too huge and won't fit the number type, then extra bits will be cut off, so we should be careful doing such conversion.

````smart header="The unary plus is not supported on bigints"
The unary plus operator `+value` is a well-known way to convert `value` to a number.

In order to avoid confusion, it's not supported on bigints:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js run
let bigint = 1n;

alert( +bigint ); // error
```
<<<<<<< HEAD
したがって、bigint を数値に変換する場合には `Number()` を使用してください。
````

## 比較

`<`, `>` のような比較は bigint と数値でうまく機能します:
=======
So we should use `Number()` to convert a bigint to a number.
````

## Comparisons

Comparisons, such as `<`, `>` work with bigints and numbers just fine:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true
```

<<<<<<< HEAD
ですが注意してください。数値と bigint は異なる型なので、等価 `==` にはなりますが、厳密等価 `===` にはなりません。
=======
Please note though, as numbers and bigints belong to different types, they can be equal `==`, but not strictly equal `===`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

<<<<<<< HEAD
## Boolean 操作

`if` や他の boolean 操作内では、bigint は数値のように振る舞います。

例えば、`if` では bigint `0n` は偽であり、他の値は真です:

```js run
if (0n) {
  // 実行されることはありません
}
```

bigint を利用した `||`, `&&` などの boolean 操作も数値と同じように動作します:

```js run
alert( 1n || 2 ); // 1 (1n は真とみなされます)

alert( 0n || 2 ); // 2 (0n は偽とみなされます)
=======
## Boolean operations

When inside `if` or other boolean operations, bigints behave like numbers.

For instance, in `if`, bigint `0n` is falsy, other values are truthy:

```js run
if (0n) {
  // never executes
}
```

Boolean operators, such as `||`, `&&` and others also work with bigints similar to numbers:

```js run
alert( 1n || 2 ); // 1 (1n is considered truthy)

alert( 0n || 2 ); // 2 (0n is considered falsy)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## Polyfills

<<<<<<< HEAD
bigint のポリフィルには注意が必要です。理由は `+`, `-` などの多くの JavaScript 演算子は通常の数値の場合と比較して、bigint での動作は異なるためです。

例えば、bigint の除算は常に bigint を返します（必要に応じて丸められます）。

このような振る舞いをエミュレートするために、ポリフィルはコードを分析し、そのようなすべての演算子をその関数に置き換える必要があります。ですが、それをするのは面倒であり、多くのパフォーマンスコストがかかります。

そのため、よく知られている、良いポリフィルはありません。

ですが、その逆は [JSBI](https://github.com/GoogleChromeLabs/jsbi) ライブラリの開発者により提案されています。

このライブラリは独自のメソッドを使用して大きな数字を実装しています。我々は、ネイティブの bigint の代わりにこれが利用できます:

| 操作 | ネイティブ `BigInt` | JSBI |
|-----------|-----------------|------|
| 数値から作成 | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| 足し算 | `c = a + b` | `c = JSBI.add(a, b)` |
| 引き算	| `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

...そしてポリフィル(Babelプラグイン)を使用して、JSBI呼び出しをブラウザがサポートしているネイティブ bigint に変換します。

つまり、このアプローチはネイティブの bigint の代わりに JSBI でコードを書くことを提案しています。しかし、JSBI は内部的には bigint と同じように数値を処理し、仕様にしがたってエミュレートするので、このコードは "bigint対応" になります。

このようなJSBIコードは、bigintをサポートしていないエンジンとサポートしているエンジンに "そのまま" 使用できます。ポリフィルは、呼び出しをネイティブbigintに変換します。

## 参照

- [MDN docs on BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
=======
Polyfilling bigints is tricky. The reason is that many JavaScript operators, such as `+`, `-` and so on behave differently with bigints compared to regular numbers.

For example, division of bigints always returns a bigint (rounded if necessary).

To emulate such behavior, a polyfill would need to analyze the code and replace all such operators with its functions. But doing so is cumbersome and would cost a lot of performance.

So, there's no well-known good polyfill.

Although, the other way around is proposed by the developers of [JSBI](https://github.com/GoogleChromeLabs/jsbi) library.

This library implements big numbers using its own methods. We can use them instead of native bigints:

| Operation | native `BigInt` | JSBI |
|-----------|-----------------|------|
| Creation from Number | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| Addition | `c = a + b` | `c = JSBI.add(a, b)` |
| Subtraction	| `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

...And then use the polyfill (Babel plugin) to convert JSBI calls to native bigints for those browsers that support them.

In other words, this approach suggests that we write code in JSBI instead of native bigints. But JSBI works with numbers as with bigints internally, emulates them closely following the specification, so the code will be "bigint-ready".

We can use such JSBI code "as is" for engines that don't support bigints and for those that do support - the polyfill will convert the calls to native bigints.

## References

- [MDN docs on BigInt](mdn:/JavaScript/Reference/Global_Objects/BigInt).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
- [Specification](https://tc39.es/ecma262/#sec-bigint-objects).
