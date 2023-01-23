<<<<<<< HEAD
# 後方参照: \N と \k<name>

キャプチャグループ `pattern:(...)` の中身は、結果や置換文字列の中だけでなくパターン自身の中でも利用することができます。

## 番号による後方参照: \N

グループはパターンの中で `pattern:\N` を使うことで参照することができ、`N` はグループの番号です。

より明白にするために、次のことを考えてみましょう。

私たちは引用符で囲まれた文字列を見つける必要があります: シングルクォート `subject:'...'` もしくはダブルクォート `subject:"..."` -- 両方のバリアントにマッチする必要があります。

どうやってそれらを探しますか？

パターン中に2種類の引用符をおきます: `pattern:['"](.*?)['"]`。これは `match:"..."` と `match:'...'` のような文字列を見つけますが、`subject:"She's the one!"` の文字列のように、ある引用符が別の引用符の中に登場した時、正しくないマッチになります。:

```js run
let str = "He said: \"She's the one!\".";

let reg = /['"](.*?)['"]/g;

// 結果は期待したものではありません
alert( str.match(reg) ); // "She'
```

ご覧の通り、パターンは開始の引用符 `match:"` を見つけ、その後テキストは他の引用符 `match:'` まで進み、マッチを閉じます。

パターンが開始引用符と同じ閉じ引用符を探すようにするために、それをキャプチャグループでラップし、後方参照を使用しましょう `pattern:(['"])(.*?)\1`:

これは正しいコードです:

```js run
let str = "He said: \"She's the one!\".";

let reg = /(['"])(.*?)\1/g;

alert( str.match(reg) ); // "She's the one!"
```

これでうまく動作します! 正規表現エンジンは最初の引用符 `pattern:(['"])` を見つけその中身を覚えます。それは最初のキャプチャグループです。

さらにパターン `pattern:\1` は "最初のグループと同じテキストを見つける" ことを意味します。

同様に、`pattern:\2` は2番目のグループを意味し、`pattern:\3` は3番目…となります。

```smart
グループの中で `?:` を使用している場合は参照することはできません。キャプチャを除外されたグループ `(?:...)` はエンジンに記憶されません。
```

```warn header="混乱しないでください: パターンでの `pattern:\1`, 置換での: `pattern:$1`"
置換文字列では、ドル記号 `pattern:$1` を使用する一方、パターンではバックスラッシュ `pattern:\1` です。
```

## 名前による後方参照: `\k<name>`

正規表現に多くの括弧がある場合、名前付けをすると便利です。

名前付けされたグループを参照するには、`pattern:\k<name>` を使用します。

下記の例では、引用符を持つグループが `pattern:?<quote>` を名前付けされています。なので、後方参照は `pattern:\k<quote>` になります。:
=======
# Backreferences in pattern: \N and \k<name>

We can use the contents of capturing groups `pattern:(...)` not only in the result or in the replacement string, but also in the pattern itself.

## Backreference by number: \N

A group can be referenced in the pattern using `pattern:\N`, where `N` is the group number.

To make clear why that's helpful, let's consider a task.

We need to find quoted strings: either single-quoted `subject:'...'` or a double-quoted `subject:"..."` -- both variants should match.

How to find them?

We can put both kinds of quotes in the square brackets: `pattern:['"](.*?)['"]`, but it would find strings with mixed quotes, like `match:"...'` and `match:'..."`. That would lead to incorrect matches when one quote appears inside other ones, like in the string `subject:"She's the one!"`:

```js run
let str = `He said: "She's the one!".`;

let regexp = /['"](.*?)['"]/g;

// The result is not what we'd like to have
alert( str.match(regexp) ); // "She'
```

As we can see, the pattern found an opening quote `match:"`, then the text is consumed till the other quote `match:'`, that closes the match.

To make sure that the pattern looks for the closing quote exactly the same as the opening one, we can wrap it into a capturing group and backreference it: `pattern:(['"])(.*?)\1`.

Here's the correct code:

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(['"])(.*?)\1/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```

Now it works! The regular expression engine finds the first quote `pattern:(['"])` and memorizes its content. That's the first capturing group.

Further in the pattern `pattern:\1` means "find the same text as in the first group", exactly the same quote in our case.

Similar to that, `pattern:\2` would mean the contents of the second group, `pattern:\3` - the 3rd group, and so on.

```smart
If we use `?:` in the group, then we can't reference it. Groups that are excluded from capturing `(?:...)` are not memorized by the engine.
```

```warn header="Don't mess up: in the pattern `pattern:\1`, in the replacement: `pattern:$1`"
In the replacement string we use a dollar sign: `pattern:$1`, while in the pattern - a backslash `pattern:\1`.
```

## Backreference by name: `\k<name>`

If a regexp has many parentheses, it's convenient to give them names.

To reference a named group we can use `pattern:\k<name>`.

In the example below the group with quotes is named `pattern:?<quote>`, so the backreference is `pattern:\k<quote>`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(?<quote>['"])(.*?)\k<quote>/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
<<<<<<< HEAD
```
=======
```
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
