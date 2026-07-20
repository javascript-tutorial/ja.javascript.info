<<<<<<< HEAD
# 集合と範囲 [...]

角括弧 `[…]` 内の複数の文字または文字クラスは "指定された中の任意の文字を探す" ことを意味します。

## 集合

例えば、`pattern:[eao]` は3文字 `'a'`, `'e'`, または `'o'` のいずれかを意味します。

それは *集合* と呼ばれます。集合は通常の文字と併せて正規表現の中で使うことができます。:

```js run
// [t or m], 次に "op" となる文字列を見つける
alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"
```

集合には複数の文字がありますが、マッチした中での1文字に相当することに注意してください。

従って、下の例ではマッチするものはありません:

```js run
// "V" に続き [o or i], その後 "la" となる文字列を見つける
alert( "Voila".match(/V[oi]la/) ); // null, マッチしない
```

パターンは次のように想定します:

- `pattern:V`,
- 次に文字 `pattern:[oi]` の *1つ*,
- 次に `pattern:la`.

なので、`match:Vola` もしくは `match:Vila` がマッチします。

## 範囲

角括弧は *文字の範囲* を含むこともあります。

例えば、`pattern:[a-z]` は `a` から `z` までの範囲の文字で、 `pattern:[0-5]` は `0` から `5` までの数字です。

下の例では、`x` に続いて2桁の数字または `A` から `F` までの文字を探しています:
=======
# Sets and ranges [...]

Several characters or character classes inside square brackets `[…]` mean to "search for any character among given".

## Sets

For instance, `pattern:[eao]` means any of the 3 characters: `'a'`, `'e'`, or `'o'`.

That's called a *set*. Sets can be used in a regexp along with regular characters:

```js run
// find [t or m], and then "op"
alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"
```

Please note that although there are multiple characters in the set, they correspond to exactly one character in the match.

So the example below gives no matches:

```js run
// find "V", then [o or i], then "la"
alert( "Voila".match(/V[oi]la/) ); // null, no matches
```

The pattern searches for:

- `pattern:V`,
- then *one* of the letters `pattern:[oi]`,
- then `pattern:la`.

So there would be a match for `match:Vola` or `match:Vila`.

## Ranges

Square brackets may also contain *character ranges*.

For instance, `pattern:[a-z]` is a character in range from `a` to `z`, and `pattern:[0-5]` is a digit from `0` to `5`.

In the example below we're searching for `"x"` followed by two digits or letters from `A` to `F`:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
alert( "Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
```

<<<<<<< HEAD
ここでは `pattern:[0-9A-F]` には2つの範囲があります: `0` から `9` の数値か、`A` から `F` の文字を探します。

小文字も見つけたければ、範囲 `a-f` を追加することもできます: `pattern:[0-9A-Fa-f]`。あるいはフラグ `pattern:i` を追加します。

また、`[…]` の中で文字クラスを使用することも可能です。

例えば、単語文字 `pattern:\w` やハイフン `pattern:-` を見つけたい場合は、`pattern:[\w-]` となります。

複数のクラスを連結することも可能です。例えば `pattern:[\s\d]` は "空白文字 or 数値" を意味します。

```smart header="文字クラスは特定の文字集合の短縮形です"
例:

- **\d** -- `pattern:[0-9]` と同じです,
- **\w** -- `pattern:[a-zA-Z0-9_]` と同じです,
- **\s** -- `pattern:[\t\n\v\f\r ]` に他のユニコードの空白文字を加えたものと同じです。
```

### 例: 多言語 \w

文字クラス `pattern:\w` は `pattern:[a-zA-Z0-9_]` の短縮形なので、中国語やキリル文字などを見つけることはできません。

任意の言語の文字を探す、よりユニバーサルなパターンを記述することができます。Unicode プロパティを使用すると簡単です: `pattern:[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`.

これを読み解いていきましょう。`pattern:\w` と同様、次の Unicode プロパティに沿った文字を含む、独自のセットを作成しています。:

- `Alphabetic` (`Alpha`) - 文字,
- `Mark` (`M`) - アクセント e.g `'`, `~`,
- `Decimal_Number` (`Nd`) - 数字,
- `Connector_Punctuation` (`Pc`) - アンダースコア `'_'` 及び同様の文字,
- `Join_Control` (`Join_C`) - 2つの特別なコード `200c` と `200d`。アラビア語などで、合字で使われます。

使用例:
=======
Here `pattern:[0-9A-F]` has two ranges: it searches for a character that is either a digit from `0` to `9` or a letter from `A` to `F`.

If we'd like to look for lowercase letters as well, we can add the range `a-f`: `pattern:[0-9A-Fa-f]`. Or add the flag `pattern:i`.

We can also use character classes inside `[…]`.

For instance, if we'd like to look for a wordly character `pattern:\w` or a hyphen `pattern:-`, then the set is `pattern:[\w-]`.

Combining multiple classes is also possible, e.g. `pattern:[\s\d]` means "a space character or a digit".

```smart header="Character classes are shorthands for certain character sets"
For instance:

- **\d** -- is the same as `pattern:[0-9]`,
- **\w** -- is the same as `pattern:[a-zA-Z0-9_]`,
- **\s** -- is the same as `pattern:[\t\n\v\f\r ]`, plus few other rare Unicode space characters.
```

### Example: multi-language \w

As the character class `pattern:\w` is a shorthand for `pattern:[a-zA-Z0-9_]`, it can't find Chinese hieroglyphs, Cyrillic letters, etc.

We can write a more universal pattern, that looks for wordly characters in any language. That's easy with Unicode properties: `pattern:[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`.

Let's decipher it. Similar to `pattern:\w`, we're making a set of our own that includes characters with following Unicode properties:

- `Alphabetic` (`Alpha`) - for letters,
- `Mark` (`M`) - for accents,
- `Decimal_Number` (`Nd`) - for digits,
- `Connector_Punctuation` (`Pc`) - for the underscore `'_'` and similar characters,
- `Join_Control` (`Join_C`) - two special codes `200c` and `200d`, used in ligatures, e.g. in Arabic.

An example of use:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let regexp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

let str = `Hi 你好 12`;

<<<<<<< HEAD
// すべての文字と数字を探します
alert( str.match(regexp) ); // H,i,你,好,1,2
```

もちろんこのパターンは編集できます: Unicode プロパティを追加したり、削除するなど。Unicode プロパティに関する詳細は <info:regexp-unicode> で説明しています。

```warn header="Unicode プロパティは Edge と Firefox ではサポートされていません"
Unicode プロパティ `pattern:p{…}` はまだ Edge and Firefox では実装されていません。どうしても必要な場合は、ライブラリ [XRegExp](http://xregexp.com/) を利用してください。

あるいは、関心のある言語の文字範囲を利用します。例えば、キリル文字は `pattern:[а-я]` です。
```

## 範囲を除外する

通常の範囲に加えて、 `pattern:[^…]` のような、範囲を "除外" するものもあります。

それらは開始時にキャレット文字 `^` で指定され、*指定されたもの以外の文字* と一致します。

例:

- `pattern:[^aeyo]` -- `'a'`, `'e'`, `'y'` または `'o'` を除く任意の文字.
- `pattern:[^0-9]` -- 数字以外の任意の文字, `\D` と同じです.
- `pattern:[^\s]` -- 任意の非空白文字, `\S` と同じです.

下の例では、文字、数字または空白以外の文字を探します:
=======
// finds all letters and digits:
alert( str.match(regexp) ); // H,i,你,好,1,2
```

Of course, we can edit this pattern: add Unicode properties or remove them. Unicode properties are covered in more details in the article <info:regexp-unicode>.

```warn header="Unicode properties aren't supported in IE"
Unicode properties `pattern:p{…}` are not implemented in IE. If we really need them, we can use library [XRegExp](https://xregexp.com/).

Or just use ranges of characters in a language that interests us, e.g.  `pattern:[а-я]` for Cyrillic letters.
```

## Excluding ranges

Besides normal ranges, there are "excluding" ranges that look like `pattern:[^…]`.

They are denoted by a caret character `^` at the start and match any character *except the given ones*.

For instance:

- `pattern:[^aeyo]` -- any character except  `'a'`, `'e'`, `'y'` or `'o'`.
- `pattern:[^0-9]` -- any character except a digit, the same as `pattern:\D`.
- `pattern:[^\s]` -- any non-space character, same as `\S`.

The example below looks for any characters except letters, digits and spaces:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ and .
```

<<<<<<< HEAD
## […] でのエスケープ

通常、特別な文字そのままを見つけたい場合は、 `pattern:\.` のようにエスケープする必要があります。また、バックスラッシュが必要であれば `pattern:\\` とします。

角括弧の中では、エスケープせずに大部分の特殊文字を使用することができます。:

- 記号 `pattern:. + ( )` はエスケープする必要はありません。
- ハイフン `pattern:-` は先頭または末尾(範囲を定義しない場合)ではエスケープされません。
- キャレット `pattern:^` は先頭(除外を意味します)でのみエスケープされます。
- 閉じ角括弧 `pattern:]` は常にエスケープされます(その記号を見つける必要がある場合)。

つまり、角括弧で何か意味するものを除き、すべての特別な文字はエスケープなしで利用できます。

角括弧内のドット `.` は単なるドットを意味します。パターン `pattern:[.,]` は、ドットあるいはカンマのいずれかの文字を探します。

以下の例では、正規表現 `pattern:[-().^+]` は `-().^+` のいずれかの文字を探します。:
=======
## Escaping in […]

Usually when we want to find exactly a special character, we need to escape it like `pattern:\.`. And if we need a backslash, then we use `pattern:\\`, and so on.

In square brackets we can use the vast majority of special characters without escaping:

- Symbols `pattern:. + ( )` never need escaping.
- A hyphen `pattern:-` is not escaped in the beginning or the end (where it does not define a range).
- A caret `pattern:^` is only escaped in the beginning (where it means exclusion).
- The closing square bracket `pattern:]` is always escaped (if we need to look for that symbol).

In other words, all special characters are allowed without escaping, except when they mean something for square brackets.

A dot `.` inside square brackets means just a dot. The pattern `pattern:[.,]` would look for one of characters: either a dot or a comma.

In the example below the regexp `pattern:[-().^+]` looks for one of the characters `-().^+`:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
// No need to escape
let regexp = /[-().^+]/g;

<<<<<<< HEAD
alert( "1 + 2 - 3".match(regexp) ); // +, - にマッチします
```

...ただし、"念のため" にエスケープしたとしても害はありません。:

```js run
// 全部エスケープ
let regexp = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(regexp) ); // 問題なく動作します: +, -
```

## 範囲とフラグ "u"

集合の中にサロゲートペアがある場合、正しく動作させるためにフラグ `pattern:u` が必要になります。

例えば、文字列 `subject:𝒳` で `pattern:[𝒳𝒴]` を探してみましょう。:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // [?] のような変な文字が表示されます
// (検索は正しく実行されず、文字の片方が返却されます)
```

結果は正しくありません。なぜなら、正規表現はデフォルトではサロゲートペアのことは "知らない" からです。

正規表現のエンジンは `[𝒳𝒴]` は2文字ではなく、4文字だと考えます:
1. `𝒳` の左半分 `(1)`,
2. `𝒳` の右半分 `(2)`,
3. `𝒴` の左半分 `(3)`,
4. `𝒴` の右半分 `(4)`.

次のようにしてそれぞれのコードを確認することができます:
=======
alert( "1 + 2 - 3".match(regexp) ); // Matches +, -
```

...But if you decide to escape them "just in case", then there would be no harm:

```js run
// Escaped everything
let regexp = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(regexp) ); // also works: +, -
```

## Ranges and flag "u"

If there are surrogate pairs in the set, flag `pattern:u` is required for them to work correctly.

For instance, let's look for `pattern:[𝒳𝒴]` in the string `subject:𝒳`:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // shows a strange character, like [?]
// (the search was performed incorrectly, half-character returned)
```

The result is incorrect, because by default regular expressions "don't know" about surrogate pairs.

The regular expression engine thinks that `[𝒳𝒴]` -- are not two, but four characters:
1. left half of `𝒳` `(1)`,
2. right half of `𝒳` `(2)`,
3. left half of `𝒴` `(3)`,
4. right half of `𝒴` `(4)`.

We can see their codes like this:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

<<<<<<< HEAD
したがって、上の例では `𝒳` の左半分を探して表示します。

フラグ `pattern:u` を追加すると、正しい振る舞いとなります。:
=======
So, the example above finds and shows the left half of `𝒳`.

If we add flag `pattern:u`, then the behavior will be correct:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

<<<<<<< HEAD
`[𝒳-𝒴]` といった範囲を探す際にも同様の状況が起こります。

フラグ `pattern:u` を追加し忘れた場合、エラーになります。:
=======
The similar situation occurs when looking for a range, such as `[𝒳-𝒴]`.

If we forget to add flag `pattern:u`, there will be an error:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
'𝒳'.match(/[𝒳-𝒴]/); // Error: Invalid regular expression
```

<<<<<<< HEAD
理由は、フラグ `pattern:u` がない場合、サロゲートペアは２文字として認識されるため、`[𝒳-𝒴]` は `[<55349><56499>-<55349><56500>]` (すべてのサロゲートペアがコードに置換される)と解釈されます。これで、範囲 `56499-55349` が正しくないことが簡単にわかります: その開始コード `56499` は終わり `55349` よりも大きいです。これがエラーの正式な理由です。

フラグ `pattern:u` があると、パターンは正しく動作します。:

```js run
// 𝒳 から 𝒵 を探します
=======
The reason is that without flag `pattern:u` surrogate pairs are perceived as two characters, so `[𝒳-𝒴]` is interpreted as `[<55349><56499>-<55349><56500>]` (every surrogate pair is replaced with its codes). Now it's easy to see that the range `56499-55349` is invalid: its starting code `56499` is greater than the end `55349`. That's the formal reason for the error.

With the flag `pattern:u` the pattern works correctly:

```js run
// look for characters from 𝒳 to 𝒵
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```
