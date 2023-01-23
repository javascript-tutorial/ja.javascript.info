<<<<<<< HEAD
# 比較

私たちは数学にある多くの比較演算子を知っています。:

JavaScript では、次のような記述します:

- より大きい/より小さい: <code>a &gt; b</code>, <code>a &lt; b</code>
- 大きい/小さいまたは等しい: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- 等位チェックは `a == b` として書かれます(2重の等式記号 `'='` に注意してください。1つの記号 `a = b` は代入を意味します。)
- 等しくない。数学において、この記法は <code>&ne;</code> です。JavaScriptにおいては、感嘆符がその前についた代入として書かれます: <code>a != b</code>.

この記事では、異なる比較のタイプに関して、JavaScript ではどうやるか、またその重要な特性について詳しく学んでいきます。

記事の末尾には "JavaScriptの癖" に関連する問題を回避するための良いレシピがあります。

## Boolean は結果です

すべての比較演算子はブール値を返します:

- `true` -- "はい", "正しい" もしくは "真" を意味します.
- `false` --　"いいえ", "誤り" もしくは "偽" を意味します.

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

どちらの文字列がより大きいかを見る場合、いわゆる "辞書" もしくは "数学における辞書式順序" の順序が使われます。

言い換えると、文字列は文字単位で比較されます。

例:
=======
# Comparisons

We know many comparison operators from maths.

In JavaScript they are written like this:

- Greater/less than: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Greater/less than or equals: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Equals: `a == b`, please note the double equality sign `==` means the equality test, while a single one `a = b` means an assignment.
- Not equals: In maths the notation is <code>&ne;</code>, but in JavaScript it's written as <code>a != b</code>.

In this article we'll learn more about different types of comparisons, how JavaScript makes them, including important peculiarities.

At the end you'll find a good recipe to avoid "JavaScript quirks"-related issues.

## Boolean is the result

All comparison operators return a boolean value:

- `true` -- means "yes", "correct" or "the truth".
- `false` -- means "no", "wrong" or "not the truth".

For example:

```js run
alert( 2 > 1 );  // true (correct)
alert( 2 == 1 ); // false (wrong)
alert( 2 != 1 ); // true (correct)
```

A comparison result can be assigned to a variable, just like any value:

```js run
let result = 5 > 4; // assign the result of the comparison
alert( result ); // true
```

## String comparison

To see whether a string is greater than another, JavaScript uses the so-called "dictionary" or "lexicographical" order.

In other words, strings are compared letter-by-letter.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

<<<<<<< HEAD
2つの文字列を比較するアルゴリズムはシンプルです:

1. 両方の文字列の最初の文字を比較します。
2. 1つ目のほうが大きい(もしくは小さい)場合、1つ目の文字列は2つ目の文字列よりも大きい(もしくは小さい)です。それで完了です。
3. そうではなく、もしも最初の文字が等しい場合は、同じ方法で2つ目の文字を比較します。
4. 文字列の最後までそれを繰り返します。
5. 両方の文字列が同時に終わった場合、それらは等しいです。そうでなければ長い文字列がより大きいです。

上の例において、比較 `'Z' > 'A'` は最初のステップで結果を得ます。

文字列 `"Glow"` と `"Glee"` は文字単位の比較がされます。

1. `G` は `G` と同じ.
2. `l` は `l` と同じ.
3. `o` は `e` より大きい. ここでストップ. 1つ目の文字列のほうが大きいです.

```smart header="実際の辞書ではなく、Unicode順です"
上で与えられている比較アルゴリズムは、本の辞書や電話帳で使われているのとおおよそ同じです。しかし全く同じではありません。

例えば、大文字小文字の問題。大文字 `"A"` は小文字の `"a"` とは同じではありません。どちらがより大きいでしょう？実際は、小文字 `"a"` です。なぜでしょう？なぜなら、小文字は内部のエンコーディングテーブル(Unicode)でより大きな値を持っているからです。チャプター <info:string> で具体的な詳細と結果を取り上げます。
```

## 異なる型の比較 

異なる型に所属している値を比較するとき、それらは数値に変換されます。

例:

```js run
alert( '2' > 1 ); // true, 文字列 '2' は数値 2 になります
alert( '01' == 1 ); // true, 文字列 '01' は数値 1 になります
```

真偽値の場合、`true` は `1` になり、 `false` は `0` になります。:

例:
=======
The algorithm to compare two strings is simple:

1. Compare the first character of both strings.
2. If the first character from the first string is greater (or less) than the other string's, then the first string is greater (or less) than the second. We're done.
3. Otherwise, if both strings' first characters are the same, compare the second characters the same way.
4. Repeat until the end of either string.
5. If both strings end at the same length, then they are equal. Otherwise, the longer string is greater.

In the first example above, the comparison `'Z' > 'A'` gets to a result at the first step.

The second comparison `'Glow'` and `'Glee'` needs more steps as strings are compared character-by-character:

1. `G` is the same as `G`.
2. `l` is the same as `l`.
3. `o` is greater than `e`. Stop here. The first string is greater.

```smart header="Not a real dictionary, but Unicode order"
The comparison algorithm given above is roughly equivalent to the one used in dictionaries or phone books, but it's not exactly the same.

For instance, case matters. A capital letter `"A"` is not equal to the lowercase `"a"`. Which one is greater? The lowercase `"a"`. Why? Because the lowercase character has a greater index in the internal encoding table JavaScript uses (Unicode). We'll get back to specific details and consequences of this in the chapter <info:string>.
```

## Comparison of different types

When comparing values of different types, JavaScript converts the values to numbers.

For example:

```js run
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1
```

For boolean values, `true` becomes `1` and `false` becomes `0`.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

<<<<<<< HEAD
````smart header="興味深い結果"
次の2つが同時に発生する場合があります:

- 2つの値が等しい
- それらの一方は真偽値の `true` で、もう一方は真偽値の `false`

例:
=======
````smart header="A funny consequence"
It is possible that at the same time:

- Two values are equal.
- One of them is `true` as a boolean and the other one is `false` as a boolean.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

<<<<<<< HEAD
JavaScriptの立場からすると、それは普通です。等価チェックは数値変換を使って変換をします(したがって、`"0"` は `0` になります)。一方、 明示的な `Boolean` 変換は別のルールセットを利用します。
````

## 厳密な等価 

通常の等価チェック `"=="` は問題を持っています。`0` と `false` を異なるものと判断させることはできません:
=======
From JavaScript's standpoint, this result is quite normal. An equality check converts values using the numeric conversion (hence `"0"` becomes `0`), while the explicit `Boolean` conversion uses another set of rules.
````

## Strict equality

A regular equality check `==` has a problem. It cannot differentiate `0` from `false`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( 0 == false ); // true
```

<<<<<<< HEAD
空文字列でも同じです:
=======
The same thing happens with an empty string:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( '' == false ); // true
```

<<<<<<< HEAD
これは、異なる型のオペランドは等価演算子 `==` によって数値に変換されるためです。空文字は、ちょうど `false` のように 0 になります。

もしも `0` と `false` を分けたい場合、どうすべきでしょうか？

**厳密等価演算子 `===` は型変換なしで等価をチェックします。**

言い換えると、もしも `a` と `b` が異なる型の場合、`a === b` はそれらの変換の試みをすることなく、すぐに `false` を返します。

試してみましょう:

```js run
alert( 0 === false ); // false, 型が異なるためです
```

`!=` の類似として、"厳密な非等価" 演算子 `!==` も存在します。

厳密等価チェック演算子は書くのが少し長いですが、起こっていることを明らかにし、エラーの余地を少なくします。

## null と undefined の比較 

`null` もしくは `undefined` が他の値と比較される場合、非直感的な振る舞いになります。

厳密な等価チェック `===` の場合
: それぞれが自身の別々の型に所属しているため、これらの値は異なります。
=======
This happens because operands of different types are converted to numbers by the equality operator `==`. An empty string, just like `false`, becomes a zero.

What to do if we'd like to differentiate `0` from `false`?

**A strict equality operator `===` checks the equality without type conversion.**

In other words, if `a` and `b` are of different types, then `a === b` immediately returns `false` without an attempt to convert them.

Let's try it:

```js run
alert( 0 === false ); // false, because the types are different
```

There is also a "strict non-equality" operator `!==` analogous to `!=`.

The strict equality operator is a bit longer to write, but makes it obvious what's going on and leaves less room for errors.

## Comparison with null and undefined

There's a non-intuitive behavior when `null` or `undefined` are compared to other values.

For a strict equality check `===`
: These values are different, because each of them is a different type.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    alert( null === undefined ); // false
    ```

<<<<<<< HEAD
非厳密なチェック `==` の場合
: 特別なルールがあります。この2つは "スイートカップル" と呼ばれ、(`==` の意味で)等しくなりますが、これら以外の値とは等しいと扱われることはありません。
=======
For a non-strict check `==`
: There's a special rule. These two are a "sweet couple": they equal each other (in the sense of `==`), but not any other value.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    alert( null == undefined ); // true
    ```

<<<<<<< HEAD
数学や他の比較 `< > <= >=`
: 値 `null/undefined` は数値に変換されます: `null` は `0` になり、`undefined` は `NaN` (Not a Number)になります。

今、それらのルールを適用した時に起こる面白いことを見てみましょう。そして、より重要なことはこれらの機能でトラップに陥らない方法です。

### 奇妙な結果: null vs 0

`null` とゼロを比較してみましょう:
=======
For maths and other comparisons `< > <= >=`
: `null/undefined` are converted to numbers: `null` becomes `0`, while `undefined` becomes `NaN`.

Now let's see some funny things that happen when we apply these rules. And, what's more important, how to not fall into a trap with them.

### Strange result: null vs 0

Let's compare `null` with a zero:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

<<<<<<< HEAD
上の3つの例は数学的には奇妙です。最後の結果は "`null` はゼロより大きいまたは等しい" ことを述べています。そうであれば上2つの比較のどちらかは正しくなければいけませんが、両方とも false です。

その理由は等価チェック `==` と比較 `> < >= <=` は異なった処理するためです。比較は `null` を数値に変換します、したがって `0` として扱います。そういう訳で (3) `null >= 0` は true で、 (1) は false になります。

一方、`undefined` と `null` の等価チェック `==` はいずれの変換もなしにルールによって処理します。それらはお互い等価で他のいずれとも等価ではありません。なので (2) `null == 0` は false です。

### 比べるものがない undefined

値 `undefined` は比較に関与しません。:
=======
Mathematically, that's strange. The last result states that "`null` is greater than or equal to zero", so in one of the comparisons above it must be `true`, but they are both false.

The reason is that an equality check `==` and comparisons `> < >= <=` work differently. Comparisons convert `null` to a number, treating it as `0`. That's why (3) `null >= 0` is true and (1) `null > 0` is false.

On the other hand, the equality check `==` for `undefined` and `null` is defined such that, without any conversions, they equal each other and don't equal anything else. That's why (2) `null == 0` is false.

### An incomparable undefined

The value `undefined` shouldn't be compared to other values:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

### 問題を回避する

なぜこれらの例を見てきたのでしょう？常にこれらの特殊性を覚えておく必要があるでしょうか？そうではありません。実際には、これらのトリッキーなことは徐々に馴染みの深いものになっていくでしょう。ですが、問題を回避するための確実な方法があります。

- 厳密な等価 `===` 以外の比較演算子については、例外的な注意を払って `undefined/null` の比較を行ってください。
- 本当に正しい場合でない限り、`null/undefined` かもしれない変数に対して比較 `>= > < <=` は使ってはいけません。変数がこのような値を持つ可能性がある場合は、それらを別々にチェックしてください。

## サマリ 

- 比較演算子は論理値を返します。
- 文字列は "辞書” 順で、1文字ずつ比較されます。
- 異なった型の値が比較される場合、それらは数値に変換されます(厳密な等価チェックを除く)
- 値 `null` と `undefined` はそれぞれ等価 `==` であり、それ以外の値とは等価ではありません。
- `>` または `<` のような比較を、`null/undefined` になる可能性のある変数に対して使う場合は注意してください。`null/undefined` を別々にチェックするのが良いアイデアです。
=======
Why does it dislike zero so much? Always false!

We get these results because:

- Comparisons `(1)` and `(2)` return `false` because `undefined` gets converted to `NaN` and `NaN` is a special numeric value which returns `false` for all comparisons.
- The equality check `(3)` returns `false` because `undefined` only equals `null`, `undefined`, and no other value.

### Avoid problems

Why did we go over these examples? Should we remember these peculiarities all the time? Well, not really. Actually, these tricky things will gradually become familiar over time, but there's a solid way to avoid problems with them:

- Treat any comparison with `undefined/null` except the strict equality `===` with exceptional care.
- Don't use comparisons `>= > < <=` with a variable which may be `null/undefined`, unless you're really sure of what you're doing. If a variable can have these values, check for them separately.

## Summary

- Comparison operators return a boolean value.
- Strings are compared letter-by-letter in the "dictionary" order.
- When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
- The values `null` and `undefined` equal `==` each other and do not equal any other value.
- Be careful when using comparisons like `>` or `<` with variables that can occasionally be `null/undefined`. Checking for `null/undefined` separately is a good idea.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
