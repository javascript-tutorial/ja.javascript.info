# データ型

<<<<<<< HEAD
JavaScript の値は常に特定の型です。例えば、文字列や数値です。

JavaScript には8つの基本的なデータ型があります。ここでは基本を学び、次のチャプターでそれらの詳細について話しましょう。

なお、変数はどんなデータでも入れることができます。変数はある時点では文字列で、その後数値を設定することができます:
=======
A value in JavaScript is always of a certain type. For example, a string or a number.

There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// エラーなし
let message = "hello";
message = 123456;
```

<<<<<<< HEAD
このようなことができるプログラミング言語は "動的型付け" と呼ばれ、データ型はありますが、変数はそのどれにもバインドされないことを意味します。

## 数値 
=======
Programming languages that allow such things, such as JavaScript, are called "dynamically typed", meaning that there exist data types, but variables are not bound to any of them.

## Number
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let n = 123;
n = 12.345;
```

<<<<<<< HEAD
*数値* 型は整数と浮動小数点両方に使われます。

数値に関する多くの操作があります、 e.g. 乗算 `*`, 除算 `/`, 加算 `+`, 減算 `-` など。

通常の数値に加えて、これらのタイプに属する "特別な数値型" もあります。: `Infinity`、 `-Infinity`、 `NaN`.
=======
The *number* type represents both integer and floating point numbers.

There are many operations for numbers, e.g. multiplication `*`, division `/`, addition `+`, subtraction `-`, and so on.

Besides regular numbers, there are so-called "special numeric values" which also belong to this data type: `Infinity`, `-Infinity` and `NaN`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- `Infinity` は数学的な[無限大](https://en.wikipedia.org/wiki/Infinity) ∞ を表します。どの値よりも大きい特別な値です。

    ゼロによる除算でそれを得ることができます。:

    ```js run
    alert( 1 / 0 ); // 無限大
    ```

<<<<<<< HEAD
    もしくは、単にコードに直接書くこともできます:
=======
    Or just reference it directly:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    alert( Infinity ); // 無限大
    ```
- `NaN` は計算上のエラーを表します。正しくないもしくは未定義の数学的な操作の結果です。例:

    ```js run
    alert( "not a number" / 2 ); // NaN, このような除算は誤りです
    ```

<<<<<<< HEAD
    `NaN` は粘着性です。`NaN` 以降はどのような操作をしても `NaN` になります:
=======
    `NaN` is sticky. Any further mathematical operation on `NaN` returns `NaN`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    alert( NaN + 1 ); // NaN
    alert( 3 * NaN ); // NaN
    alert( "not a number" / 2 - 1 ); // NaN
    ```

<<<<<<< HEAD
    そのため、数学的な表現の中のどこかに `NaN` がある場合、結果全体に伝搬します。

```smart header="算術演算子は安全です"
JavaScriptでは数学をするのは安全です。ゼロによる除算、数値ではない文字列を数値として扱う、など何でもできます。

スクリプトは致命的なエラー（"死"）で止まることはありません。 最悪の場合でも NaN という結果になります。
```

特別な数値は正式には "数値" 型に所属します。もちろん、常識では数値ではありませんが。

チャプター <info:number> でより数値の動作について見ていきます。

## BigInt

JavaScript では、"数値" 型は <code>(2<sup>53</sup>-1)</code> (つまり `9007199254740991`) より大きい、あるいは負値であれば  <code>-(2<sup>53</sup>-1)</code> より小さい整数を表現することができません。これらは内部表現に起因する技術的な制限です。

ほとんどの目的ではこれで十分ですが、場合によっては非常に大きな数が必要になります。例えば暗号化やマイクロ秒の精度のタイムスタンプです。

`BigInt` 型は任意の長さの整数を表現するために、最近言語に追加された型です。

`BigInt` の値は整数値の末尾に `n` を追加することで作成されます:

```js
// 末尾の "n" は BigInt を意味します
const bigInt = 1234567890123456789012345678901234567890n;
```

`BigInt` の数値はめったに必要とされないのでここでは説明しませんが、別のチャプター <info:bigint> で記載しています。このような大きな数値が必要なときは参照してください。

=======
    So, if there's a `NaN` somewhere in a mathematical expression, it propagates to the whole result (there's only one exception to that: `NaN ** 0` is `1`).

```smart header="Mathematical operations are safe"
Doing maths is "safe" in JavaScript. We can do anything: divide by zero, treat non-numeric strings as numbers, etc.

The script will never stop with a fatal error ("die"). At worst, we'll get `NaN` as the result.
```

Special numeric values formally belong to the "number" type. Of course they are not numbers in the common sense of this word.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```smart header="互換性の問題"
現時点では、`BigInt` は Firefox/Chrome/Edge/Safari でサポートされていますが、IE ではサポートされていません。
```

[*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) で、どのバージョンのブラウザがサポートしているか確認できます。

<<<<<<< HEAD
## 文字列 

JavaScriptの文字列は引用符で囲む必要があります。
=======
## BigInt [#bigint-type]

In JavaScript, the "number" type cannot safely represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives.

To be really precise, the "number" type can store larger integers (up to <code>1.7976931348623157 * 10<sup>308</sup></code>), but outside of the safe integer range <code>±(2<sup>53</sup>-1)</code> there'll be a precision error, because not all digits fit into the fixed 64-bit storage. So an "approximate" value may be stored.

For example, these two numbers (right above the safe range) are the same:

```js
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
```

So to say, all odd integers greater than <code>(2<sup>53</sup>-1)</code> can't be stored at all in the "number" type.

For most purposes <code>±(2<sup>53</sup>-1)</code> range is quite enough, but sometimes we need the entire range of really big integers, e.g. for cryptography or microsecond-precision timestamps.

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` value is created by appending `n` to the end of an integer:

```js
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

As `BigInt` numbers are rarely needed, we don't cover them here, but devoted them a separate chapter <info:bigint>. Read it when you need such big numbers.


```smart header="Compatibility issues"
Right now, `BigInt` is supported in Firefox/Chrome/Edge/Safari, but not in IE.
```

You can check [*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) to know which versions of a browser are supported.

## String

A string in JavaScript must be surrounded by quotes.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
```

JavScriptでは3種類の引用符があります。

1. ダブルクォート: `"Hello"`.
2. シングルクォート: `'Hello'`.
3. バッククォート: <code>&#96;Hello&#96;</code>.

<<<<<<< HEAD
ダブル/シングルクォートは "シンプルな" 引用符です。JavaScriptの中ではそれらに違いはありません。
=======
Double and single quotes are "simple" quotes. There's practically no difference between them in JavaScript.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

バッククォートは "拡張機能" の引用符です。変数を `${…}` の中にラップすることで、変数を埋め込み文字列の中で表現することができます。たとえば:

```js run
let name = "John";

// 変数が埋め込まれた場合
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// 式が埋め込まれた場合
alert( `the result is *!*${1 + 2}*/!*` ); // 結果は 3
```

<<<<<<< HEAD
`${…}` の中の表現は評価され、結果は文字列の一部になります。そこには何でも置くことができます: `name` のような変数、`1 + 2` のような算術表現、またはより複雑なものを書くこともできます。

これはバッククォートでのみ可能なことに留意してください。他のクォートはこのような埋め込みは許容しません!
=======
The expression inside `${…}` is evaluated and the result becomes a part of the string. We can put anything in there: a variable like `name` or an arithmetical expression like `1 + 2` or something more complex.

Please note that this can only be done in backticks. Other quotes don't have this embedding functionality!
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js run
alert( "the result is ${1 + 2}" ); // 結果は ${1 + 2} です(ダブルクォートは何もしません)
```

チャプター<info:string> で、より深く文字列の説明をします。

<<<<<<< HEAD
```smart header="*character* 型はありません"
言語によっては、1文字のための特別な "文字" 型があります。たとえば、C言語やJavaでは、それは `char` です。

JavaScriptではこのような型はありません。`string` 型の1つなだけです。文字列は単一の文字または複数の文字から構成されます。
```

## boolean (論理型) 
=======
```smart header="There is no *character* type."
In some languages, there is a special "character" type for a single character. For example, in the C language and in Java it is called "char".

In JavaScript, there is no such type. There's only one type: `string`. A string may consist of zero characters (be empty), one character or many of them.
```

## Boolean (logical type)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

boolean 型は2つの値だけを持ちます: `true` と `false`

この型は通常 yes/no の値を格納するために使われます: `true` は "yes" を意味し、 `false` は "no, 正しくない" を意味します。

例:

```js
let nameFieldChecked = true; // yes, 名前フィールドはチェックされている
let ageFieldChecked = false; // no, 年齢フィールドは未チェック
```

Boolean 値は比較の結果としても使われます:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (比較結果は "yes" です)
```

<<<<<<< HEAD
後ほどチャプター<info:logical-operators>でbooleanのより詳細を説明します。
=======
We'll cover booleans more deeply in the chapter <info:logical-operators>.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## "null" 値 

<<<<<<< HEAD
特殊な `null` 値は上で述べたどの型にも属しません。

それは自身の別の型を形成し、`null` 値だけを含みます。
=======
The special `null` value does not belong to any of the types described above.

It forms a separate type of its own which contains only the `null` value:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let age = null;
```

<<<<<<< HEAD
JavaScriptでは、 `null` は他の言語のような "存在しないオブジェクトへの参照" または "null へのポインタ" ではありません。

それは、 "無し"、"空" または "不明な値" と言った意味を持つ特別な値です。

上のコードは、 `age` は何らかの理由で不明な値もしくは空であることを述べています。
=======
In JavaScript, `null` is not a "reference to a non-existing object" or a "null pointer" like in some other languages.

It's just a special value which represents "nothing", "empty" or "value unknown".

The code above states that `age` is unknown.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## "undefined" 値 

<<<<<<< HEAD
特殊な値 `undefined` も別に扱われます。`null` のように、それ自身の型を持ちます。
=======
The special value `undefined` also stands apart. It makes a type of its own, just like `null`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

`undefined` の意味は "値は代入されていません" です。

<<<<<<< HEAD
もしも変数は宣言されているが代入されていない場合、その値は正確には `undefined` です:
=======
If a variable is declared, but not assigned, then its value is `undefined`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let age;

<<<<<<< HEAD
alert(x); // "undefined" を表示
```

技術的にはどの変数にも `undefined` を代入することができます。
=======
alert(age); // shows "undefined"
```

Technically, it is possible to explicitly assign `undefined` to a variable:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let age = 100;

<<<<<<< HEAD
// 値を undefined に変更
=======
// change the value to undefined
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
age = undefined;

alert(age); // "undefined"
```

<<<<<<< HEAD
...しかし、そのようにするのは推奨されません。一般的には、 "空" や "不明な値" と言った用途では `null` を使い、`undefined` は変数が割り当てられているか、もしくは似たような確認のために使います。

## オブジェクトとシンボル 
=======
...But we don't recommend doing that. Normally, one uses `null` to assign an "empty" or "unknown" value to a variable, while `undefined` is reserved as a default initial value for unassigned things.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

`object` 型は特殊です。

他のすべての型は、値は1つのもの(文字列, 数値, または何でも)だけを含むので、"プリミティブ" と呼ばれます。対照的に、オブジェクトはデータのコレクションやより複雑なエンティティを格納するために使われます。

<<<<<<< HEAD
その重要性から、オブジェクトに関してはプリミティブについて詳しく学んだ後に、チャプター<info:object>で扱います。

`symbol` 型はオブジェクトの一意な識別子を作るのに使われます。完全性のためにここで言及していますが、オブジェクトの後で勉強するのがよいでしょう。

## typeof 演算子 

`typeof` 操作は、引数の型を返します。異なる型の値を別々に処理したい、または素早くチェックしたいときに役立ちます。

これは2つの形式の構文をサポートします:

1. 演算子として: `typeof x`.
2. 関数スタイル: `typeof(x)`.

言い換えると、それは括弧があってもなくても動作します。結果は同じです。

`typeof x` の呼び出しは型名の文字列を返します。:
=======
All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

Being that important, objects deserve a special treatment. We'll deal with them later in the chapter <info:object>, after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.

## The typeof operator [#type-typeof]

The `typeof` operator returns the type of the operand. It's useful when we want to process values of different types differently or just want to do a quick check.

A call to `typeof x` returns a string with the type name:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

<<<<<<< HEAD
最後の3行については追加の説明が必要かもしれません:

1. `Math` は数学的な操作を提供する組み込みオブジェクトです。チャプター<info:number>で学ぶでしょう。ここでは、単にオブジェクトとしての例です。
2. `typeof null` の結果は `"object"` です。これは間違っています。これは `typeof` において、公式に認められているエラーで、互換性のために維持されています。もちろん、`null` はオブジェクトではありません。それは自身の別の型をもつ特殊な値です。なので、繰り返しますがそれは言語のエラーです。
3. `alert` は言語の機能なので、`typeof alert` の結果は `"function"` です。我々は次のチャプターで function を勉強します。そして、言語の中には特別な "function" 型がないことがわかるでしょう。function はオブジェクト型に属します。しかし `typeof` はそれらを別々に扱います。正式にはそれは正しくありませんが、実際にはとても便利です。
=======
The last three lines may need additional explanation:

1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof`, coming from very early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own. The behavior of `typeof` is wrong here.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.

```smart header="The `typeof(x)` syntax"
You may also come across another syntax: `typeof(x)`. It's the same as `typeof x`.

To put it clear: `typeof` is an operator, not a function. The parentheses here aren't a part of `typeof`. It's the kind of parentheses used for mathematical grouping.

Usually, such parentheses contain a mathematical expression, such as `(2 + 2)`, but here they contain only one argument `(x)`. Syntactically, they allow to avoid a space between the `typeof` operator and its argument, and some people like it.

Some people prefer `typeof(x)`, although the `typeof x` syntax is much more common.
```
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## サマリ 

<<<<<<< HEAD
JavaScriptには7つの基本型があります。

- `number` あらゆる種類の数値: 整数または浮動小数点
- `bigint` は任意の長さの整数値のための型
- `string` 文字列。文字列は1つかより多くの文字を持ち、別の1文字型はありません。
- `boolean` `true`/`false`
- `null` 不明な値 -- 単一の値 `null` を持つスタンドアロン型
- `undefined` 未割り当て値 -- 単一の値 `undefined` を持つスタンドアロン型
- `object` より複雑なデータ構造
- `symbol` 一意な識別子

`typeof` 操作は変数にどの型が格納されているかを知ることができます。

- 2つの形式: `typeof x` or `typeof(x)`.
- `"string"` のように型の名前の文字列を返します。
- `null` は `"object"` を返します -- それは言語のエラーで、実際はオブジェクトではありません。

次のチャプターではプリミティブ値について集中し、それらに精通した後オブジェクトに進みます。
=======
There are 8 basic data types in JavaScript.

- Seven primitive data types:
    - `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
    - `bigint` for integer numbers of arbitrary length.
    - `string` for strings. A string may have zero or more characters, there's no separate single-character type.
    - `boolean` for `true`/`false`.
    - `null` for unknown values -- a standalone type that has a single value `null`.
    - `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
    - `symbol` for unique identifiers.
- And one non-primitive data type:
    - `object` for more complex data structures.

The `typeof` operator allows us to see which type is stored in a variable.

- Usually used as `typeof x`, but `typeof(x)` is also possible.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.

In the next chapters, we'll concentrate on primitive values and once we're familiar with them, we'll move on to objects.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
