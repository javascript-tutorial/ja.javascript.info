# 型変換

<<<<<<< HEAD
多くの場合、演算子と関数は自動的に値を正しい型に変換します。それを "型変換" と呼びます。
=======
Most of the time, operators and functions automatically convert the values given to them to the right type. 
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

たとえば、 `alert` は表示するために、自動的にある値を文字列へ変換します。数学的な処理は値を数値に変換します。

<<<<<<< HEAD
また、物事を正しくするために、ある値を明示的に変換する必要がある場合もあります。

[cut]

```smart header="まだオブジェクトについては話していません"
このチャプターでは、まだ オブジェクト は説明しません。ここでは最初にプリミティブを学びます。その後、オブジェクトについて学んだ後、チャプター <info:object-toprimitive> で、どのようにオブジェクト変換が動作するのかを見ていきます。
```

## 文字列変換 
=======
There are also cases when we need to explicitly convert a value to the expected type.

```smart header="Not talking about objects yet"
In this chapter, we won't cover objects. Instead, we'll study primitives first. Later, after we learn about objects, we'll see how object conversion works in the chapter <info:object-toprimitive>.
```

## String Conversion
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

文字列変換は、文字列形式の値が必要なときに発生します。

たとえば、`alert(value)` は値を表示するためにそれを行います。

<<<<<<< HEAD
また、そのために、`String(value)` 関数を使うこともできます:
=======
We can also call the `String(value)` function to convert a value to a string:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // 今、値は文字列の "true"
alert(typeof value); // string
*/!*
```

<<<<<<< HEAD
文字列変換はほとんどが明白です。`false` は `"false"` に、 `null` は `"null"` になります。

## 数値変換 
=======
String conversion is mostly obvious. A `false` becomes `"false"`, `null` becomes `"null"`, etc.

## Numeric Conversion
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

数値変換は数学的関数や表現の中で自動的に起こります。

たとえば、非数値に除算 `/` が適用された場合:

```js run
alert( "6" / "2" ); // 3, 文字列は数値に変換されます
```

<<<<<<< HEAD
また、明示的に `value` を変換するために `Number(value)` を使うことができます。
=======
We can use the `Number(value)` function to explicitly convert a `value` to a number:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // 数値の 123 になります

alert(typeof num); // number
```

<<<<<<< HEAD
テキストフォームのような文字列ベースのソースから値を読むが、数値が入力されることを想定するときには通常明示的な変換が必要になります。

文字列が有効な数値でない場合、このような変換の結果は `NaN` です。たとえば:
=======
Explicit conversion is usually required when we read a value from a string-based source like a text form but expect a number to be entered.

If the string is not a valid number, the result of such a conversion is `NaN`. For instance:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js run
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN, 変換失敗
```

数値変換ルール:

| 値 |  変換後... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
<<<<<<< HEAD
|<code>true&nbsp;と&nbsp;false</code> | `1` and `0` |
| `string` | 最初と最後のスペースは取り除かれます。そして、残った文字列が空の場合は結果は 0 になります。そうでなければ、文字列から "読んだ" 数値です。 エラーでは `NaN` が与えられます。|
=======
|<code>true&nbsp;and&nbsp;false</code> | `1` and `0` |
| `string` | Whitespaces from the start and end are removed. If the remaining string is empty, the result is `0`. Otherwise, the number is "read" from the string. An error gives `NaN`. |
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

例:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN ("z" の読み込みでエラー)
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

<<<<<<< HEAD
`null` と `undefined` はここでは異なる振る舞いをすることに留意してください。: `undefined` が `NaN` になる一方、`null` は 0 になります。

````smart header="'+'は文字列を連結します"
ほぼすべての算術演算は値を数値に変換します。 注目すべき例外は加算 `+` です。もしも加算された値の1つが文字列である場合、他の値は文字列に変換されます。

そして、それらを連結（結合）します。:
=======
Please note that `null` and `undefined` behave differently here: `null` becomes zero while `undefined` becomes `NaN`.

````smart header="Addition '+' concatenates strings"
Almost all mathematical operations convert values to numbers. A notable exception is addition `+`. If one of the added values is a string, the other one is also converted to a string.

Then, it concatenates (joins) them:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js run
alert( 1 + '2' ); // '12' (右側が文字列)
alert( '1' + 2 ); // '12' (左側が文字列)
```

<<<<<<< HEAD
引数の1つが文字列の場合にのみ起こります。それ以外では値は数値に変換されます。
````

## Boolean変換 
=======
This only happens when at least one of the arguments is a string. Otherwise, values are converted to numbers.
````

## Boolean Conversion
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

真偽値(Boolean)変換はシンプルです。

<<<<<<< HEAD
論理演算(後ほど条件テストや他の種類を見ます)で起こりますが、`Boolean(value)` を呼ぶことで手動で実行することもできます。
=======
It happens in logical operations (later we'll meet condition tests and other similar things) but can also be performed explicitly with a call to `Boolean(value)`.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

変換ルール:

<<<<<<< HEAD
- `0`, 空文字, `null`, `undefined` や `NaN` のように直感的に "空" の値は `false` になります。
- 他の値は `true` になります。
=======
- Values that are intuitively "empty", like `0`, an empty string, `null`, `undefined`, and `NaN`, become `false`.
- Other values become `true`.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

例:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

<<<<<<< HEAD
````warn header="注意してください: ゼロの文字列 `\"0\"` は `true` です"
幾つかの言語(すなわち PHP)は `”0”` を `false` として扱います。しかし、JavaScriptでは、非空文字は常に `true` です。
=======
````warn header="Please note: the string with zero `\"0\"` is `true`"
Some languages (namely PHP) treat `"0"` as `false`. But in JavaScript, a non-empty string is always `true`.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // スペースもまた true です (任意の非空文字は true)
```
````

<<<<<<< HEAD

## サマリ 

3つの最も広く使われている型変換があります: 文字列変換, 数値変換, 真偽値変換です。

**`文字列変換`** -- 何かを出力するときに起こり、`String(value)` で行うことができます。文字列への変換は、通常はプリミティブな値にとって明白です。

**`数値変換`** -- 算術演算で起こり、`Number(value)` で実行できます。
=======
## Summary

The three most widely used type conversions are to string, to number, and to boolean.

**`String Conversion`** -- Occurs when we output something. Can be performed with `String(value)`. The conversion to string is usually obvious for primitive values.

**`Numeric Conversion`** -- Occurs in math operations. Can be performed with `Number(value)`.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

変換は次のルールに従います:

| 値 |  変換後... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;と&nbsp;false</code> | `1` and `0` |
| `string` | 最初と最後のスペースは取り除かれます。そして、残った文字列が空の場合は結果は 0 になります。そうでなければ、文字列から "読んだ" 数値です。 エラーでは `NaN` が与えられます。|

<<<<<<< HEAD
**`真偽値変換`** -- 論理演算で発生するか、`Boolean(value)` で実行できます。
=======
**`Boolean Conversion`** -- Occurs in logical operations. Can be performed with `Boolean(value)`.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

次のルールに従います:

| 値 |  変換後... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|それ以外の値| `true` |


ルールのほとんどは理解し覚えるのが簡単です。通常間違える注目すべき例外は:

- `undefined` は文字列としては `NaN` です, `0` ではりません。
- `"0"` と `"   "` のようなスペースだけの文字列は真偽値としては true です。

<<<<<<< HEAD
オブジェクトについてはここでは説明しませんが、JavaScriptについての基本的なことを学んだら、オブジェクトに専念する <info:object-toprimitive> の章の後半に戻ります。
=======
Objects aren't covered here. We'll return to them later in the chapter <info:object-toprimitive> that is devoted exclusively to objects after we learn more basic things about JavaScript.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
