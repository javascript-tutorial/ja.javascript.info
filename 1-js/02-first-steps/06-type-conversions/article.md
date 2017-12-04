# 型変換

ほとんどの時間、演算子と関数は自動的に値を正しい型に変換します。それを "型変換" と呼びます。

たとえば、 `alert` はそれを表示するために、自動的にある値を文字列へ変換します。数学的な処理は値を数値に変換します。

また、物事を正しくするために、ある値を明示的に変換する必要があるケースもあります。

[cut]

```smart header="Not talking about objects yet"
このチャプターでは、まだ オブジェクト は説明しません。ここでは、最初にプリミティブを学びます。その後、オブジェクトについて学んだ後に、チャプター <info:object-toprimitive> で、どのようにオブジェクト変換が動作するのかを見ていきます。
```

## 文字列変換

文字列変換は値の文字列形式が必要なときに発生します。

たとえば、`alert(value)` は値を表示するためにそれを行います。

また、そのために、`String(value)` 関数を使うこともできます:

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // now value is a string "true"
alert(typeof value); // string
*/!*
```

文字列変換はほとんどが明らかです。`false` は `"false"` に、 `null` は `"null"` などになります。

## 数値変換

数値変換は数学的関数や表現の中で自動的に起こります。

たとえば、非数値に除算 `/` が適用された場合:

```js run
alert( "6" / "2" ); // 3, strings are converted to numbers
```

また、明示的に `value` を変換するために `Number(value)` を使うことができます。

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // becomes a number 123

alert(typeof num); // number
```

通常、私たちがテキストフォームのような文字列ベースのソースから値を読むときに明示的な変換が必要になりますが、私たちは数値が入力されることを期待します。

もしも文字列が有効な数値出ない場合、このような変換の結果は `NaN` です。たとえば:

```js run
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN, conversion failed
```

数値変換ルール:

| 値 |  変換後... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;and&nbsp;false</code> | `1` and `0` |
| `string` | 最初と最後のスペースは取り除かれます。そして、残った文字列が空の場合は結果は 0 になります。そうでなければ、文字レウtから "読んだ" 数値です。 エラーでは `NaN` が与えられます。|

たとえば:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error reading a number at "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

`null` と `undefined` はここでは異なる振る舞いをすることとに留意してください。: `undefined` が `NaN` になる一方、`null` は 0 になります。

````smart header="Addition '+' concatenates strings"
ほとんどすべての算術演算は値を数値に変換します。
Almost all mathematical operations convert values to numbers. 注目すべき例外は加算 `+` です。もしも加算された値の1つが文字列である場合、他の値は文字列に変換されます。

そして、それらを連結（結合）します。:

```js run
alert( 1 + '2' ); // '12' (string to the right)
alert( '1' + 2 ); // '12' (string to the left)
```

引数の1つが文字列の場合にのみそれは起こります。それ以外では値は数値に変換されます。
````

## Boolean変換

真偽値(Boolean)変換はシンプルです。

論理演算(後ほど条件テストやそれらの他の種類を見ます)で起こりますが、`Boolean(value)` を呼ぶことで手動で実行させる事もできます。

The conversion rule:

- `0`, 空文字, `null`, `undefined` や `NaN` のように直感的に "空" の値は `false` になります。
- 他の値は `true` になります。

たとえば:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

````warn header="Please note: the string with zero `\"0\"` is `true`"
幾つかの言語(すなわち PHP)は `”0”` を `false` として扱います。しかし、JavaScriptでは、非空の文字列はいつも `true` です。

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // spaces, also true (any non-empty string is true)
```
````


## サマリ

3つの最も広く使われている型変換があります: 文字列変換, 数値変換,
真偽値変換です。

**`文字列変換`** -- 私たちが何かを出力するときに発生し、`String(value)` 実行することができます。文字列への変換は通常はプリミティブな値にとって明白です。

**`数値変換`** -- 算術演算で発生し、`Number(value)` で実行できます。

変換は次のツールに従います:

| 値 |  変換後... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;and&nbsp;false</code> | `1` and `0` |
| `string` | 最初と最後のスペースは取り除かれます。そして、残った文字列が空の場合は結果は 0 になります。そうでなければ、文字レウtから "読んだ" 数値です。 エラーでは `NaN` が与えられます。|

**`真偽値変換`** -- 論理演算で発生するか、`Boolean(value)` で実行できます。

次のルールに従います:

| 値 |  変換後... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|それ以外の値| `true` |


それらのルールのほとんどは、理解し覚えるのが簡単です。人々が通常間違える注目すべき例外は:

- `undefined` は文字列としては `NaN` です, `0` ではりません。
- `"0"` と `"   "` のようなスペースだけの文字列は真偽値としては true です。

オブジェクトについてはここでは説明しませんが、JavaScriptについての基本的なことを学んだら、オブジェクトに専念する <info:object-toprimitive> の章の後半に戻ります。
