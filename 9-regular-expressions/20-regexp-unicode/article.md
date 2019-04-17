
<<<<<<< HEAD
# ユニコードフラグ

ユニコードフラグ `/.../u` はサロゲートペアの正しいサポートができるようになります。

サロゲートペアについては、チャプター <info:string> で説明されています。

簡単に思い出してみましょう。手短に言えば、通常の文字は2バイトでエンコードされています。それは最大で 65536 文字になります。しかし世界にはもっと多くの文字があります。

そのため、`𝒳` (数学的な X)や `😄` (スマイル)のような特定の希少な文字は4バイトでエンコードされています。

これは比較のためのユニコード値です:
=======
# Unicode: flag "u"

The unicode flag `/.../u` enables the correct support of surrogate pairs.

Surrogate pairs are explained in the chapter <info:string>.

Let's briefly remind them here. In short, normally characters are encoded with 2 bytes. That gives us 65536 characters maximum. But there are more characters in the world.

So certain rare characters are encoded with 4 bytes, like `𝒳` (mathematical X) or `😄` (a smile).

Here are the unicode values to compare:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

| Character  | Unicode | Bytes  |
|------------|---------|--------|
| `a` | 0x0061 |  2 |
| `≈` | 0x2248 |  2 |
|`𝒳`| 0x1d4b3 | 4 |
|`𝒴`| 0x1d4b4 | 4 |
|`😄`| 0x1f604 | 4 |

<<<<<<< HEAD
したがって、`a` や `≈` と言った文字は 2バイトを占め、珍しいものは4バイトになります。

ユニコードは、4バイト文字がそれ全体でのみ意味を持つように作られています。

昔は JavaScript はそのことを知らなかったので、多くの文字列メソッドにはまだ問題があります。例えば、`length` はそれらを2つの文字であると考えます:
=======
So characters like `a` and `≈` occupy 2 bytes, and those rare ones take 4.

The unicode is made in such a way that the 4-byte characters only have a meaning as a whole.

In the past JavaScript did not know about that, and many string methods still have problems. For instance, `length` thinks that here are two characters:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js run
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

<<<<<<< HEAD
...ですが、1文字にしか見えませんよね? ポイントは `length` は4バイトを2つの2バイト文字として扱うということです。それらは併せてでしか考えられない(いわゆる "サロゲートペア")ため、正しくありません。

通常、正規表現も2つの2バイト文字として "長い文字" を扱います。

これはおかしな結果に繋がります。例えば `subject:𝒳` という文字列で `pattern:[𝒳𝒴]` を見つけようとしてみましょう。:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // おかしな結果
```

デフォルトでは正規表現のエンジンはサロゲートペアを理解しないため、結果は間違っています。`[𝒳𝒴]` は2つではなく、4つの文字(`𝒳` の左半分 `(1)`, `𝒳` の右半分 `(2)`, `𝒴` の左半分 `(3)`, `𝒴` の右半分 `(4)`) と考えます。

なので、全体ではなく文字列 `𝒳` で `𝒳` の左半分を見つけます。

つまり、検索は `'12'.match(/[1234]/)` のように動作します -- `1` が返ります(`𝒳` の左半分)。

`/.../u` フラグはそれを直します。正規表現エンジンでサロゲートペアを利用可能にするので結果は正しくなります:
=======
...But we can see that there's only one, right? The point is that `length` treats 4 bytes as two 2-byte characters. That's incorrect, because they must be considered only together (so-called "surrogate pair").

Normally, regular expressions also treat "long characters" as two 2-byte ones.

That leads to odd results, for instance let's try to find `pattern:[𝒳𝒴]` in the string `subject:𝒳`:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // odd result (wrong match actually, "half-character")
```

The result is wrong, because by default the regexp engine does not understand surrogate pairs.

So, it thinks that `[𝒳𝒴]` are not two, but four characters:
1. the left half of `𝒳` `(1)`,
2. the right half of `𝒳` `(2)`,
3. the left half of `𝒴` `(3)`,
4. the right half of `𝒴` `(4)`.

We can list them like this:

```js run
for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

So it finds only the "left half" of `𝒳`.

In other words, the search works like `'12'.match(/[1234]/)`: only `1` is returned.

## The "u" flag

The `/.../u` flag fixes that.

It enables surrogate pairs in the regexp engine, so the result is correct:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

<<<<<<< HEAD
フラグを忘れた場合、エラーが起きる場合があります:
=======
Let's see one more example.

If we forget the `u` flag and occasionally use surrogate pairs, then we can get an error:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js run
'𝒳'.match(/[𝒳-𝒴]/); // SyntaxError: invalid range in character class
```

<<<<<<< HEAD
ここでは、正規表現 `[𝒳-𝒴]` は `[12-34]` と扱われます(`2` は `𝒳` の右部分、`3` は `𝒴` の左部分)。そしてその2つの半分 `2` と `3` の間の範囲は認められません。

フラグを使うと正しく動作します:
=======
Normally, regexps understand `[a-z]` as a "range of characters with codes between codes of `a` and `z`.

But without `u` flag, surrogate pairs are assumed to be a "pair of independant characters", so `[𝒳-𝒴]` is like `[<55349><56499>-<55349><56500>]` (replaced each surrogate pair with code points). Now we can clearly see that the range `56499-55349` is unacceptable, as the left range border must be less than the right one.

Using the `u` flag makes it work right:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js run
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```
