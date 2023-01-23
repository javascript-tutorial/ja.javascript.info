# 数値

<<<<<<< HEAD
最新の JavaScript では、２つの数値型があります:

1. JavaScript での通常の数値は "倍精度" として知られる64ビットフォーマット[IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985) で格納されます。ほとんどの場合で使用する数値はこちらであり、本チャプターでもこちらについて説明します。
=======
In modern JavaScript, there are two types of numbers:

1. Regular numbers in JavaScript are stored in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), also known as "double precision floating point numbers". These are numbers that we're using most of the time, and we'll talk about them in this chapter.

2. BigInt numbers represent integers of arbitrary length. They are sometimes needed because a regular integer number can't safely exceed <code>(2<sup>53</sup>-1)</code> or be less than <code>-(2<sup>53</sup>-1)</code>, as we mentioned earlier in the chapter <info:types>. As bigints are used in few special areas, we devote them a special chapter <info:bigint>.

So here we'll talk about regular numbers. Let's expand our knowledge of them.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

2. BigInt は任意の長さの整数を表現するためのものです。通常の数値では <code>2<sup>53</sup></code> を超えることや、 <code>-2<sup>53</sup></code> よりも小さい値を扱うことができないため、場合によって必要になります。BigInt は限られた特別な領域で使用されます。BigInt は <info:bigint> で取り上げます。

したがって、このチャプターでは、通常の数値について説明します。では、知識を広げていきましょう。

## 数値を書く多くの方法 

10億を書くことを想像してください。明白な方法は次の通りです:

```js
let billion = 1000000000;
```

<<<<<<< HEAD
区切りとしてアンダースコア `_` を使用することも可能です:
=======
We also can use underscore `_` as the separator:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let billion = 1_000_000_000;
```

<<<<<<< HEAD
ここで、アンダースコア `_` は "糖衣構文" の役割をはたし、数値をより読みやすくします。JavaScriptエンジンは単に数字の間にある `_` を無視するので、上の 10億とまったく同じです。

ただし、実際には間違えやすさから、通常は何度もゼロを書くのを避けます。また我々は怠け者です。10億を `"1bn"` としたり、73億を `"7.3bn"` と書いたりします。大きな数値を表現する場合には大抵これが当てはまります。

JavaScriptでは、数値に文字 `"e"` を追加し、ゼロの数を指定することで数値を短くします。:
=======
Here the underscore `_` plays the role of the "[syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)", it makes the number more readable. The JavaScript engine simply ignores `_` between digits, so it's exactly the same one billion as above.

In real life though, we try to avoid writing long sequences of zeroes. We're too lazy for that. We'll try to write something like `"1bn"` for a billion or `"7.3bn"` for 7 billion 300 million. The same is true for most large numbers.

In JavaScript, we can shorten a number by appending the letter `"e"` to it and specifying the zeroes count:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let billion = 1e9;  // 10 億, 文字通り: 1 と 9 個のゼロ

<<<<<<< HEAD
alert( 7.3e9 );  // 73 億 (7,300,000,000)
```

つまり、`"e"` は `1` と与えられたゼロの数をかけ合わせます。

```js
1e3 = 1 * 1000
1.23e6 = 1.23 * 1000000
```

今度は非常に小さい数値を書いてみましょう。1マイクロ秒(100万分の1秒):
=======
alert( 7.3e9 );  // 7.3 billions (same as 7300000000 or 7_300_000_000)
```

In other words, `e` multiplies the number by `1` with the given zeroes count.

```js
1e3 === 1 * 1000; // e3 means *1000
1.23e6 === 1.23 * 1000000; // e6 means *1000000
```

Now let's write something very small. Say, 1 microsecond (one millionth of a second):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let mсs = 0.000001;
```

<<<<<<< HEAD
先程書いたように、`"e"` が役立ちます。明示的にゼロを書くのを避けたい場合、このように書くことができます:

```js
let ms = 1e-6; // 1 から左にゼロを6つ
```

`0.000001` の中のゼロの数は6つです。なので `1e-6` になります。
=======
Just like before, using `"e"` can help. If we'd like to avoid writing the zeroes explicitly, we could write the same as:

```js
let mcs = 1e-6; // five zeroes to the left from 1
```

If we count the zeroes in `0.000001`, there are 6 of them. So naturally it's `1e-6`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

つまり、`"e"` の後の負値は `1` と与えられたゼロの数で数値を割ったものになります。

```js
// -3 divides by 1 with 3 zeroes
1e-3 === 1 / 1000; // 0.001

// -6 divides by 1 with 6 zeroes
1.23e-6 === 1.23 / 1000000; // 0.00000123

// an example with a bigger number
1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times
```

### 16進数、2進数、8進数(Hex, binary and octal numbers)

[16進数](https://en.wikipedia.org/wiki/Hexadecimal) の数値は色、エンコード文字やその他多くのものを表現する文字としてJavaScriptで広く使われています。もちろん、それらを短く書く方法があります: `0x` とそれに続いて数値を書きます。

例えば:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (同じです。文字の大小は関係ありません)
```

2進数と8進数はあまり使われませんが、`0b`, `0o` のプレフィックスでサポートされています:


```js run
let a = 0b11111111; // 255 の2進数表記
let b = 0o377; // 255 の8進数表記

alert( a == b ); // true, 両方とも同じ数値(255)
```

このようなサポートを持つ数字体系は3つしかありません。他の数値体系では、`parseInt` 関数を使う必要があります(このチャプターで後ほど学びます)。

## toString(base) 

メソッド `num.toString(base)` は与えられた `base` の記数法で `num` の文字列表現を返します。

例:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

`base` は `2` から `36` までの値を取ります。デフォルトは `10` です。

一般的なユースケースは次の通りです:

- **base=16** は 16進数の色や文字エンコードなどに利用され、数字は `0..9` または `A..F` になります。
- **base=2** は主にビット単位の操作をデバッグするためのものです。数字は `0` か `1` です。
- **base=36** は最大値です。数字は `0..9` または `A..Z` です。全てのアルファベットが数値を表現するために使われます。`36` が役立つケースは、例えばURLを短くするために、長い数値の識別子を何か短いものに変える必要がある場合です。基数 `36` を使うことでシンプルに表現できます。

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="メソッドを呼ぶための2つのドット"
`123456..toString(36)` の2つのドットはタイプミスではないことに注意してください。上の例の `toString` のように、数値に対して直接メソッド呼び出しをしたいとき、その後に2つのドット `..` を置く必要があります。

もし1つのドットを置いた場合 `123456.toString(36)`、エラーになるでしょう。なぜならJavaScript構文は最初のドットの後を小数部分と考えるためです。そして、もう1つドットを置くと、JavaScriptは小数部分が空であることを知り、メソッドと判断します。

<<<<<<< HEAD
また、このように書くこともできます `(123456).toString(36)`.
=======
Also could write `(123456).toString(36)`.

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## 丸め 

数値処理で最も使う操作の1つが丸めです。

丸めにはいくつかの組み込みの関数があります:

`Math.floor`
: 切り捨て: `3.1` は `3` になり, `-1.1` は `-2` になります。

`Math.ceil`
: 切り上げ: `3.1` は `4` になり, `-1.1` は `-1` になります。

`Math.round`
<<<<<<< HEAD
: 四捨五入して最も近い整数にする: `3.1` は `3` になり, `3.6` は `4` になります。 `-1.1` は `-1` です。
=======
: Rounds to the nearest integer: `3.1` becomes `3`, `3.6` becomes `4`, the middle case: `3.5` rounds up to `4` too.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

`Math.trunc` (Internet Explorer では未サポート)
: 丸めを使わずに、小数点以下を削除: `3.1` は `3` になり, `-1.1` は `-1` です。

これらの違いのサマリをテーブルにします:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


これらの関数は、数値の小数点の扱い方の全ての可能性をカバーしています。しかし、小数の後の数値を `n-th`(n桁) に丸めたいときはどうすればよいでしょうか。

例えば、`1.2345` という数値があり、`1.23` のみを取り出すような、2桁に丸めたい場合です。

それをするために2つの方法があります:

1. 乗除算

    例えば、小数第2位で数値を丸めるために、 数値を `100` で乗算し、丸め関数を呼び出した後、それを除算します。
    ```js run
    let num = 1.23456;

    alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

<<<<<<< HEAD
2. メソッド [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) は点の後の数字を "n" 桁に丸め、結果の文字列表現を返します。
=======
2. The method [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) rounds the number to `n` digits after the point and returns a string representation of the result.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    これは、`Math.round` と似たように、最も近い値に丸めます:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

<<<<<<< HEAD
    `toFixed` の結果は文字列であることに注意してください。もし小数部分が指定桁より短い場合、末尾にゼロが挿入されます。:

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", 正確に5桁になるよう 0 が追加されます
    ```

    単項プラス、または `Number()` 呼び出しを使うことで、数値に変換することができます: `+num.toFixed(5)`
=======
    Please note that the result of `toFixed` is a string. If the decimal part is shorter than required, zeroes are appended to the end:

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", added zeroes to make exactly 5 digits
    ```

    We can convert it to a number using the unary plus or a `Number()` call, e.g write `+num.toFixed(5)`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 精密でない計算 

<<<<<<< HEAD
内部的には、数値は 64bit フォーマット[IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985)で表現されるため、正確に 64bit で数値を格納できます。: そのうち 52bit が数字の格納のために使われ、11bit が 小数点の位置で(整数値のときゼロです。)、 1bit は符号です。

もし、数値が長すぎる場合、64bitの記憶域をオーバーフローし、無限大になる可能性があります:
=======
Internally, a number is represented in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 11 of them store the position of the decimal point, and 1 bit is for the sign.

If a number is really huge, it may overflow the 64-bit storage and become a special numeric value `Infinity`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( 1e500 ); // Infinity
```

少しはっきりしないかもしれませんが、よく起こるのは精度の低下です。

<<<<<<< HEAD
この(偽となる)テストを考えてみましょう:
=======
Consider this (falsy!) equality test:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

<<<<<<< HEAD
上記の通り、もし `0.1` と `0.2` の合計が `0.3` かどうかをチェックした場合、`false` になります。
=======
That's right, if we check whether the sum of `0.1` and `0.2` is `0.3`, we get `false`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

奇妙です! `0.3` でないのなら、何なのでしょう？

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

<<<<<<< HEAD
なんと! ここには誤った比較よりも多くの驚きがあります。もしもe-ショッピングのサイトを作っており、訪問者が `$0.10` と `$0.20` の商品をカートに入れたと想像してください。注文の総額は `$0.30000000000000004` になります。誰もがそれに驚くでしょう。
=======
Ouch! Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

しかし、なぜこのようなことが起こるのでしょうか？

<<<<<<< HEAD
数値はバイナリ形式で、1と0の並びでメモリ上に格納されます。しかし10進数でシンプルに見える `0.1`、` 0.2` のような小数は、バイナリ形式では終わることのない小数です。

言い換えると、`0.1` とは何でしょう？それは 1 を 10 で割った `1/10` です。10進数では、このような数値は簡単に表現できます。 それと `1/3` を比較してみてください。これは無限の小数 `0.33333(3)` になります。
=======
A number is stored in memory in its binary form, a sequence of bits - ones and zeroes. But fractions like `0.1`, `0.2` that look simple in the decimal numeric system are actually unending fractions in their binary form.

What is `0.1`? It is one divided by ten `1/10`, one-tenth. In decimal numeral system such numbers are easily representable. Compare it to one-third: `1/3`. It becomes an endless fraction `0.33333(3)`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

従って、`10` の累乗による除算は 10進数では上手く動作することが保証されますが、`3` による除算は保証されていません。同じ理由で、2進数では、`2` の累乗による除算は動作することが保証されていますが、 `1/10` は無限の2進数の小数になります。

2進数を使って、 *正確な 0.1* または *正確な 0.2* を格納する方法はありません。ちょうど、10進数で 1/3 を小数で正確に表現できないように。

<<<<<<< HEAD
数値形式 IEEE-754 は、可能な限り近い数値に丸めてこれを解決します。 これらの丸めルールでは、通常 "小さな精度損失" は見ることができないので、数値は `0.3` と表示されます。 しかし、損失は依然として存在することに注意してください。
=======
The numeric format IEEE-754 solves this by rounding to the nearest possible number. These rounding rules normally don't allow us to see that "tiny precision loss", but it exists.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

これは次のようにして見ることができます:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

そして、2つの数値の合計をしたとき、それらの "精度損失" は加算されます。

そういうわけで、 `0.1 + 0.2` は正確な `0.3` ではありません。

```smart header="JavaScript だけではありません"
同じ問題は多くの他のプログラミング言語で存在します。

<<<<<<< HEAD
PHP, Java, C, Perl, Ruby は全く同じ結果を返します。なぜならそれらは同じ数値形式に基づいているためです。
```

この問題を回避できるのでしょうか？もちろん、幾つかの方法があります。最も信頼できる方法は、[toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) メソッドにより結果を丸めることです:

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // 0.30
```

`toFixed` は常に文字列を返すことに注意してください。それは小数点の後2桁となることを保証します。実際、e-ショッピングを持っていて `$0.30` を表示するときに便利です。それ以外のケースでは、数値に変換するために単項プラスを使うことができます。
=======
PHP, Java, C, Perl, Ruby give exactly the same result, because they are based on the same numeric format.
```

Can we work around the problem? Sure, the most reliable method is to round the result with the help of a method [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"
```

Please note that `toFixed` always returns a string. It ensures that it has 2 digits after the decimal point. That's actually convenient if we have an e-shopping and need to show `$0.30`. For other cases, we can use the unary plus to coerce it into a number:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

<<<<<<< HEAD
一時的に数値を 100 (またはより大きな数値)で乗算し、整数に変換し、計算を行ってから除算することもできます。その後、整数で計算しようとすると、エラーはいくらか減少しますが、依然として除算ではまだ異常です。:
=======
We also can temporarily multiply the numbers by 100 (or a bigger number) to turn them into integers, do the maths, and then divide back. Then, as we're doing maths with integers, the error somewhat decreases, but we still get it on division:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

<<<<<<< HEAD
そのため、乗算/除算によるアプローチはエラーは減らせますが、完全に除去することはできません。

もしもショップを扱っている場合、最も抜本的な解決策はセントで全ての価格を格納し、全く小数を使わないことです。しかし、30% のディスカウントを適用するとどうなるでしょうか？実際には、完全に回避することはほぼ不可能なので、上記の解決法はこの落とし穴を回避するのに役立ちます。
=======
So, multiply/divide approach reduces the error, but doesn't remove it totally.

Sometimes we could try to evade fractions at all. Like if we're dealing with a shop, then we can store prices in cents instead of dollars. But what if we apply a discount of 30%? In practice, totally evading fractions is rarely possible. Just round them to cut "tails" when needed.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

````smart header="興味深いこと"
これを試してみてください:

```js run
<<<<<<< HEAD
// Hello! 自己増加する数値です!
=======
// Hello! I'm a self-increasing number!
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
alert( 9999999999999999 ); // shows 10000000000000000
```

これも同じ問題によるものです: 精度の損失です。数値は64bitであり、そのうちの52bitが数値を格納するのに使えますが、十分ではありません。従って、最下位の数字は消えます。

JavaScriptはこのようなイベントではエラーをトリガーしません。数値を目的のフォーマットに合わせるよう最善を尽くしますが、このフォーマットは残念ながら十分大きいものではありません。
````

```smart header="2つのゼロ"
数値の内部表現のもう一つの面白い結果は、2つのゼロ、すなわち `0` と `-0` の存在です。

<<<<<<< HEAD
記号は1ビットで表現されるため、すべての数字は、0を含めて正または負になります。
=======
That's because a sign is represented by a single bit, so it can be set or not set for any number including a zero.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

ほとんどの場合、区別は気になりません。なぜなら演算子はそれらを同じものとして扱うためです。
```

<<<<<<< HEAD
## テスト: isFinite と isNaN 

2つの特別な数値を覚えていますか？

- `Infinite` (と `-Infinite`) は何よりも大きい(小さい)特別な数値です。
- `NaN` はエラーを表現します。

これらは `number` 型に属しますが、 "通常の" 数値ではないため、それらをチェックするための特別な関数があります:
=======
## Tests: isFinite and isNaN

Remember these two special numeric values?

- `Infinity` (and `-Infinity`) is a special numeric value that is greater (less) than anything.
- `NaN` represents an error.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff


- `isNaN(value)` はその引数を数値に変換し、`NaN` であるかをテストします:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

<<<<<<< HEAD
    しかし、この関数は必要なのでしょうか？単に比較 `=== NaN` は使えないのでしょうか？答えは No です。`NaN` はそれ自身を含めて何とも等しくなく、ユニークです:
=======
    But do we need this function? Can't we just use the comparison `=== NaN`? Unfortunately not. The value `NaN` is unique in that it does not equal anything, including itself:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` は引数を数値に変換し、それが `NaN/Infinity/-Infinity` ではなく通常の数値であれば、`true` を返します。:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, 特別な値: NaN なので
    alert( isFinite(Infinity) ); // false, 特別な値: Infinity なので
    ```

時々、`isFinite` は文字列値が通常の数値かどうかをチェックするのに使われます:


```js run
let num = +prompt("Enter a number", '');

// Infinity を入力しなければ true です -- Infinity は数値ではありません
alert( isFinite(num) );
```

<<<<<<< HEAD
空、またはスペースのみの文字列は、`isFinite` を含めた全ての数値関数で `0` として扱われる点に注意してください。

```smart header="`Object.is` を使った比較"

値を `===` のように比較する特別な組み込みメソッド [Object.is](mdn:js/Object/is) があります。これは2つの特殊なケースではより信頼できます:

1. `NaN` でうまく動作します: `Object.is(NaN, NaN) === true`、これは良いことです。
2. 値 `0` と `-0` は異なります: `Object.is(0, -0) === false`、重要ではありませんが、技術的にはそれらは異なる値です。

上記以外の全てのケースでは、`Object.is(a, b)` は `a === b` と同じです。

この比較の方法は JavaScriptの仕様でしばしば使われます。内部のアルゴリズムが2つの値が正確に同じかを比較する必要があるとき、`Object.is` (内部的には[SameValue](https://tc39.github.io/ecma262/#sec-samevalue)と呼ばれます)を使います。
=======
Please note that an empty or a space-only string is treated as `0` in all numeric functions including `isFinite`.

````smart header="`Number.isNaN` and `Number.isFinite`"
[Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) and [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) methods are the more "strict" versions of `isNaN` and `isFinite` functions. They do not autoconvert their argument into a number, but check if it belongs to the `number` type instead.

- `Number.isNaN(value)` returns `true` if the argument belongs to the `number` type and it is `NaN`. In any other case it returns `false`.

    ```js run
    alert( Number.isNaN(NaN) ); // true
    alert( Number.isNaN("str" / 2) ); // true

    // Note the difference:
    alert( Number.isNaN("str") ); // false, because "str" belongs to the string type, not the number type
    alert( isNaN("str") ); // true, because isNaN converts string "str" into a number and gets NaN as a result of this conversion
    ```

- `Number.isFinite(value)` returns `true` if the argument belongs to the `number` type and it is not `NaN/Infinity/-Infinity`. In any other case it returns `false`.

    ```js run
    alert( Number.isFinite(123) ); // true
    alert( Number.isFinite(Infinity) ); // false
    alert( Number.isFinite(2 / 0) ); // false

    // Note the difference:
    alert( Number.isFinite("123") ); // false, because "123" belongs to the string type, not the number type
    alert( isFinite("123") ); // true, because isFinite converts string "123" into a number 123
    ```

In a way, `Number.isNaN` and `Number.isFinite` are simpler and more straightforward than `isNaN` and `isFinite` functions. In practice though, `isNaN` and `isFinite` are mostly used, as they're shorter to write.
````

```smart header="Comparison with `Object.is`"
There is a special built-in method `Object.is` that compares values like `===`, but is more reliable for two edge cases:

1. It works with `NaN`: `Object.is(NaN, NaN) === true`, that's a good thing.
2. Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that's correct, because internally the number has a sign bit that may be different even if all other bits are zeroes.

In all other cases, `Object.is(a, b)` is the same as `a === b`.

We mention `Object.is` here, because it's often used in JavaScript specification. When an internal algorithm needs to compare two values for being exactly the same, it uses `Object.is` (internally called [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```


## parseInt と parseFloat 

プラス `+` または `Number()` を使った数値変換は厳密です。もし値が厳密な数値でない場合は失敗します:

```js run
alert( +"100px" ); // NaN
```

唯一の例外は文字列の最初、または最後のスペースです。それらは無視されます。

しかし、実際にはCSS で `"100px"` や `"12pt"` のような単位を持つ値を持つことが頻繁にあります。また、多くの国では、通貨記号が金額の後にあるので、`"19€"` と言った値があり、その中から数値を抽出したいと考えています。

そのために `parseInt` と `parseFloat` があります。

<<<<<<< HEAD
それらはできるだけ文字列から数値を "読み込み" ます。エラーが起きると、収集された数値が返されます。関数 `parseInt` は整数を返し、一方で、`parseFloat` は浮動小数を返します:
=======
They "read" a number from a string until they can't. In case of an error, the gathered number is returned. The function `parseInt` returns an integer, whilst `parseFloat` will return a floating-point number:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, 整数部のみ返却されます
alert( parseFloat('12.3.4') ); // 12.3, 2つ目の点で読むのをやめます
```

`parseInt/parseFloat` が `NaN` を返す状況があります。それは数値が読み込めなかったときに発生します:

```js run
alert( parseInt('a123') ); // NaN, 最初の文字で処理が止まります
```

````smart header="`parseInt(str, radix)` の2つ目の引数"
`parseInt()` 関数は任意の2つ目のパラメータを持ちます。それは数値システムの基数を指定するので、`parseInt` もまた16進数、2進数などの文字列をパースすることが出来ます:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, 0x がなくても動作します

alert( parseInt('2n9c', 36) ); // 123456
```
````

## 他の数学的関数 

JavaScript は数学関数と定数の小さなライブラリを含む組み込みの[Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) オブジェクトを持っています。

いくつか例です:

`Math.random()`
<<<<<<< HEAD
: 0 から 1まで (1は含みません)のランダムな数値を返します
=======
: Returns a random number from 0 to 1 (not including 1).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (any random numbers)
    ```

<<<<<<< HEAD
`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: 任意の数の引数から最大/最小を返します
=======
`Math.max(a, b, c...)` and `Math.min(a, b, c...)`
: Returns the greatest and smallest from the arbitrary number of arguments.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
<<<<<<< HEAD
: `n` を与えられた数だけ累乗します
=======
: Returns `n` raised to the given power.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    alert( Math.pow(2, 10) ); // 2 in power 10 = 1024
    ```

<<<<<<< HEAD
[docs for the Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) にある三角法など、`Math` オブジェクトにはより多くの関数や定数があります。

## サマリ 
=======
There are more functions and constants in `Math` object, including trigonometry, which you can find in the [docs for the Math object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).

## Summary

To write numbers with many zeroes:

- Append `"e"` with the zeroes count to the number. Like: `123e6` is the same as `123` with 6 zeroes `123000000`.
- A negative number after `"e"` causes the number to be divided by 1 with given zeroes. E.g. `123e-6` means `0.000123` (`123` millionths).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

大きな数値を書く場合:

<<<<<<< HEAD
- 数値へ加えるゼロの数と一緒に `"e"` を付け加えます。このように: `123e6` は `123` と 6つのゼロです。
- `"e"` の後の負の値は、1と与えられたゼロの数で数値を除算します。

異なる数値体系の場合:

- 16進数(`0x`)、8進数(`0o`)や2進数(`0b`) で直接数値を書くことが出来ます。
- `parseInt(str, base)` は `2 ≤ base ≤ 36` の間の任意の数値システムの整数を解析します。
- `num.toString(base)` は数値を、与えられた `base` を基数とした数値システムの文字列に変換します。
=======
- Can write numbers directly in hex (`0x`), octal (`0o`) and binary (`0b`) systems.
- `parseInt(str, base)` parses the string `str` into an integer in numeral system with given `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` converts a number to a string in the numeral system with the given `base`.

For regular number tests:

- `isNaN(value)` converts its argument to a number and then tests it for being `NaN`
- `Number.isNaN(value)` checks whether its argument belongs to the `number` type, and if so, tests it for being `NaN`
- `isFinite(value)` converts its argument to a number and then tests it for not being `NaN/Infinity/-Infinity`
- `Number.isFinite(value)` checks whether its argument belongs to the `number` type, and if so, tests it for not being `NaN/Infinity/-Infinity`

For converting values like `12pt` and `100px` to a number:

- Use `parseInt/parseFloat` for the "soft" conversion, which reads a number from a string and then returns the value they could read before the error.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

`12pt` や `100px` のような値を数値に変換する場合:

- "ソフト" 変換として `parseInt/parseFloat` を使います。それは文字列から数値を読み込み、エラーが起きる前までに読めた値を返します。

分数の場合:

<<<<<<< HEAD
- `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` または `num.toFixed(precision)` を使って丸めます。
- 分数を扱う際に精度の低下があることを覚えておいてください。

より多くの算術関数:

- 必要なとき、[Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) を見てください。このライブラリはとても小さいですが、基本で必要なものはカバーしています。
=======
- See the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object when you need them. The library is very small, but can cover basic needs.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
