# 比較

<<<<<<< HEAD
私たちが数学で知っている多くの比較演算子があります。:

- より大きい/より小さい: <code>a &gt; b</code>, <code>a &lt; b</code>
- 大きい/小さいまたは等しい: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- 等位チェックは `a == b` として書かれます(2重の等式記号 `'='` に注意してください。1つの記号 `a = b` は代入を意味します。)
- 等しくない。数学において、この記法は <code>&ne;</code> です。JavaScriptにおいては、感嘆符がその前についた代入として書かれます: <code>a != b</code>.

[cut]
=======
We know many comparison operators from maths:

- Greater/less than: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Greater/less than or equals: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Equals: `a == b` (please note the double equals sign `=`. A single symbol `a = b` would mean an assignment).
- Not equals. In maths the notation is <code>&ne;</code>, but in JavaScript it's written as an assignment with an exclamation sign before it: <code>a != b</code>.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

## 結果はBoolean 

<<<<<<< HEAD
他のすべての演算子と同様、比較も値を返却します。値はBoolean型です。

- `true` -- "はい", "正しい" もしくは "真" を意味します.
- `false` --　"いいえ", "誤り" もしくは "偽" を意味します.
=======
Like all other operators, a comparison returns a value. In this case, the value is a boolean.

- `true` -- means "yes", "correct" or "the truth".
- `false` -- means "no", "wrong" or "not the truth".
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

例:

```js run
alert( 2 > 1 );  // true (正しい)
alert( 2 == 1 ); // false (誤り)
alert( 2 != 1 ); // true (正しい)
```

任意の値のように、比較結果は変数に代入することができます:

```js run
let result = 5 > 4; // 比較の結果を代入
alert( result ); // true
```

## 文字列比較 

<<<<<<< HEAD
どちらの文字列がより大きいかを見る場合、いわゆる "辞書" もしくは "数学における辞書式順序" の順序が使われます。
=======
To see whether a string is greater than another, JavaScript uses the so-called "dictionary" or "lexicographical" order.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

言い換えると、文字列は文字単位で比較されます。

例:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

2つの文字列を比較するアルゴリズムはシンプルです:

<<<<<<< HEAD
1. 両方の文字列の最初の文字を比較します。
2. 1つ目のほうが大きい(もしくは小さい)場合、1つ目の文字列は2つ目の文字列よりも大きい(もしくは小さい)です。それで完了です。
3. そうではなく、もしも最初の文字が等しい場合は、同じ方法で2つ目の文字を比較します。
4. 文字列の最後までそれを繰り返します。
5. 両方の文字列が同時に終わった場合、それらは等しいです。そうでなければ長い文字列がより大きいです。

上の例において、比較 `'Z' > 'A'` は最初のステップで結果を得ます。

文字列 `"Glow"` と `"Glee"` は文字単位の比較がされます。
=======
1. Compare the first character of both strings.
2. If the first character from the first string is greater (or less) than the other string's, then the first string is greater (or less) than the second. We're done.
3. Otherwise, if both strings' first characters are the same, compare the second characters the same way.
4. Repeat until the end of either string.
5. If both strings end at the same length, then they are equal. Otherwise, the longer string is greater.

In the examples above, the comparison `'Z' > 'A'` gets to a result at the first step while the strings `"Glow"` and `"Glee"` are compared character-by-character:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

1. `G` は `G` と同じ.
2. `l` は `l` と同じ.
3. `o` は `e` より大きい. ここでストップ. 1つ目の文字列のほうが大きいです.

<<<<<<< HEAD
```smart header="実際の辞書ではなく、Unicode順です"
上で与えられている比較アルゴリズムは、本の辞書や電話帳で使われているのとおおよそ同じです。しかし全く同じではありません。

例えば、大文字小文字の問題。大文字 `"A"` は小文字の `"a"` とは同じではありません。どちらがより大きいでしょう？実際は、小文字 `"a"` です。なぜでしょう？なぜなら、小文字は内部のエンコーディングテーブル(Unicode)でより大きな値を持っているからです。チャプター <info:string> で具体的な詳細と結果を取り上げます。
=======
```smart header="Not a real dictionary, but Unicode order"
The comparison algorithm given above is roughly equivalent to the one used in dictionaries or phone books, but it's not exactly the same.

For instance, case matters. A capital letter `"A"` is not equal to the lowercase `"a"`. Which one is greater? The lowercase `"a"`. Why? Because the lowercase character has a greater index in the internal encoding table JavaScript uses (Unicode). We'll get back to specific details and consequences of this in the chapter <info:string>.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f
```

## 異なる型の比較 

<<<<<<< HEAD
異なる型に所属している値を比較するとき、それらは数値に変換されます。
=======
When comparing values of different types, JavaScript converts the values to numbers.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

例:

```js run
alert( '2' > 1 ); // true, 文字列 '2' は数値 2 になります
alert( '01' == 1 ); // true, 文字列 '01' は数値 1 になります
```

<<<<<<< HEAD
真偽値の場合、`true` は `1` になり、 `false` は `0` になります。:
=======
For boolean values, `true` becomes `1` and `false` becomes `0`. 

For example:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="興味深い結果"
次の2つが同時に発生する場合があります:

- 2つの値が等しい
- それらの一方は真偽値の `true` で、もう一方は真偽値の `false`

例:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

<<<<<<< HEAD
JavaScriptの立場からすると、それは普通です。等価チェックは数値変換を使って変換をします(したがって、`"0"` は `0` になります)。
一方、 `真偽値` 変換は別のルールセットを利用します。
=======
From JavaScript's standpoint, this result is quite normal. An equality check converts values using the numeric conversion (hence `"0"` becomes `0`), while the explicit `Boolean` conversion uses another set of rules.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f
````

## 厳密な等価 

<<<<<<< HEAD
通常の等価チェック `"=="` は問題を持っています。`0` と `false` を異なるものと判断させることはできません:
=======
A regular equality check `==` has a problem. It cannot differentiate `0` from `false`:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

```js run
alert( 0 == false ); // true
```

<<<<<<< HEAD
空文字列でも同じです:
=======
The same thing happens with an empty string:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

```js run
alert( '' == false ); // true
```

<<<<<<< HEAD
これは、異なる型のオペランドは等価演算子 `==` によって数値に変換されるためです。空文字は、ちょうど `false` のように 0 になります。
=======
This happens because operands of different types are converted to numbers by the equality operator `==`. An empty string, just like `false`, becomes a zero.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

もしも `0` と `false` を分けたい場合、どうすべきでしょうか？

**厳密等価演算子 `===` は型変換なしで等価をチェックします。**

言い換えると、もしも `a` と `b` が異なる型の場合、`a === b` はそれらの変換の試みをすることなく、すぐに `false` を返します。

試してみましょう:

```js run
alert( 0 === false ); // false, 型が異なるためです
```

<<<<<<< HEAD
`!=` の類似として、"厳密な非等価" 演算子 `!==` も存在します。

厳密等価チェック演算子は書くのが少し長いですが、起こっていることを明らかにし、エラーの余地を少なくします。
=======
There is also a "strict non-equality" operator `!==` analogous to `!=`.

The strict equality operator is a bit longer to write, but makes it obvious what's going on and leaves less room for errors.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

## null と undefined の比較 

他の特殊な場合を見てみましょう。

<<<<<<< HEAD
`null` もしくは `undefined` が他の値と比較される場合、非直感的な振る舞いになります。
=======
There's a non-intuitive behavior when `null` or `undefined` are compared to other values.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

厳密な等価チェック `===` の場合
: それぞれが自身の別々の型に所属しているため、これらの値は異なります。

<<<<<<< HEAD
```js run
alert( null === undefined ); // false
```
=======
For a strict equality check `===`
: These values are different, because each of them is a different type.

    ```js run
    alert( null === undefined ); // false
    ```
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

非厳密なチェック `==` の場合
: 特別なルールがあります。それら2つは "甘いカップル" です: それらは等しくなります(`==` の意味で)が、価値はありません。

```js run
alert( null == undefined ); // true
```

<<<<<<< HEAD
数学や他の比較 `< > <= >=`
: 値 `null/undefined` は数値に変換されます: `null` は `0` になり、`undefined` は `NaN` (Not a Number)になります。

今、それらのルールを適用した時に起こる面白いことを見てみましょう。そして、より重要なことはこれらの機能でトラップに陥らない方法です。
=======
For maths and other comparisons `< > <= >=`
: `null/undefined` are converted to numbers: `null` becomes `0`, while `undefined` becomes `NaN`.

Now let's see some funny things that happen when we apply these rules. And, what's more important, how to not fall into a trap with them.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

### 奇妙な結果: null vs 0

`null` とゼロを比較してみましょう:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

<<<<<<< HEAD
上の3つの例は数学的には奇妙です。最後の結果は "`null` はゼロより大きいまたは等しい" ことを述べています。そうであれば上2つの比較のどちらかは正しくなければいけませんが、両方とも false です。

その理由は等価チェック `==` と比較 `> < >= <=` は異なった処理するためです。比較 `null` を数値に変換します、したがって `0` として扱います。そういう訳で (3) `null >= 0` は true で、 (1) は false になります。

一方、`undefined` と `null` の等価チェック `==` はいずれの変換もなしにルールによって処理します。それらはお互い等価で他のいずれとも等価ではありません。なので (2) `null == 0` は false です。
=======
Mathematically, that's strange. The last result states that "`null` is greater than or equal to zero", so in one of the comparisons above it must be `true`, but they are both false.

The reason is that an equality check `==` and comparisons `> < >= <=` work differently. Comparisons convert `null` to a number, treating it as `0`. That's why (3) `null >= 0` is true and (1) `null > 0` is false.

On the other hand, the equality check `==` for `undefined` and `null` is defined such that, without any conversions, they equal each other and don't equal anything else. That's why (2) `null == 0` is false.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

### 比べるものがない undefined

<<<<<<< HEAD
値 `undefined` は比較に関与しません。:
=======
The value `undefined` shouldn't be compared to other values:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

<<<<<<< HEAD
なぜそこまでゼロが嫌いなのでしょう？常に false です!

このような結果になった理由は次の通りです:

- 比較 `(1)` と `(2)` は、 `undefined` は `NaN` に変換されるため `false` を返します。また、`NaN` はすべての比較で `false` を返す特別な数値です。
- `undefined` は `null` とのみ等価で、それ以外とは等価ではないため、等価チェック `(3)` は `false` を返します。
=======
Why does it dislike zero so much? Always false!

We get these results because:

- Comparisons `(1)` and `(2)` return `false` because `undefined` gets converted to `NaN` and `NaN` is a special numeric value which returns `false` for all comparisons.
- The equality check `(3)` returns `false` because `undefined` only equals `null`, `undefined`, and no other value.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

### 問題を回避する

<<<<<<< HEAD
なぜこれらの例を観察したのでしょう？常にこれらの特殊性を覚えておく必要があるでしょうか？そうではありません。
実際には、これらのトリッキーなことは徐々に馴染みの深いものになっていくでしょう。しかし問題を回避するための確実な方法があります。
=======
Why did we go over these examples? Should we remember these peculiarities all the time? Well, not really. Actually, these tricky things will gradually become familiar over time, but there's a solid way to evade problems with them:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

厳密な等価 `===` 以外の比較演算子については、例外的な注意を払って `undefined/null` の比較を行ってください。

<<<<<<< HEAD
本当に正しい場合でない限り、`null/undefined` かもしれない変数に対して比較 `>= > < <=` は使ってはいけません。
変数がこのような値を持つ可能性がある場合は、それらを別々にチェックしてください。
=======
Don't use comparisons `>= > < <=` with a variable which may be `null/undefined`, unless you're really sure of what you're doing. If a variable can have these values, check for them separately.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

## サマリ 

<<<<<<< HEAD
- 比較演算子は論理値を返します。
- 文字列は "辞書” 順で、1文字ずつ比較されます。
- 異なった型の値が比較される場合、それらは数値に変換されます(厳密な等価チェックを除く)
- 値 `null` と `undefined` はそれぞれ等価 `==` であり、それ以外の値とは等価ではありません。
- `>` または `<` のような比較を、`null/undefined` になる可能性のある変数に対して使う場合は注意してください。`null/undefined` を別々にチェックするのが良いアイデアです。
=======
- Comparison operators return a boolean value.
- Strings are compared letter-by-letter in the "dictionary" order.
- When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
- The values `null` and `undefined` equal `==` each other and do not equal any other value.
- Be careful when using comparisons like `>` or `<` with variables that can occasionally be `null/undefined`. Checking for `null/undefined` separately is a good idea.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f
