<<<<<<< HEAD
# 後方参照: \n と $n

キャプチャグループは結果だけでなく、置換文字列やパターンの中でもアクセスすることができます。

[cut]

## 置換でのグループ: $n

`replace` メソッドを使用しているとき、`$n` を使って置換文字列中の n 番目のグループにアクセスすることができます。

例:

```js run
let name = "John Smith";

name = name.replace(/(\w+) (\w+)/i, *!*"$2, $1"*/!*);
alert( name ); // Smith, John
```

ここで置換文字列中の `pattern:$1` は "ここに最初のグループの内容を置き換える" を意味し、`pattern:$2` は "ここは2番目のグループに置き換える" を意味します。

置換文字列内のグループを参照することで、置換の中で既存のテキストを再利用することが可能です。

## パターンでのグループ: \n

グループは `\n` を使うことでｍパターンの中で参照することができます。

より明白にするために、次のことを考えてみましょう。私たちは引用符で囲まれた文字列を見つける必要があります: シングルクォート `subject:'...'` またはダブルクォート `subject:"..."` -- 両方のバリアントがマッチする必要があります。

どうやってそれらを探しますか？

パターン中に2種類の引用符をおきます: `pattern:['"](.*?)['"]`。これは `match:"..."` and `match:'...'` のような文字列を見つけますが、`subject:"She's the one!"` の文字列のように、ある引用符が別の引用符の中に登場した時、正しくないマッチになります。:

```js run
let str = "He said: \"She's the one!\".";

let reg = /['"](.*?)['"]/g;

// 結果は期待したものではありません
alert( str.match(reg) ); // "She'
```

ご覧の通り、パターンは開始の引用符 `match:"` を見つけ、その後テキストは他の引用符 `match: '` まで怠惰で消費され、マッチを閉じます。

パターンが開始引用符と同じ閉じ引用符を探すようにするために、それをグループ化して後方参照を使用しましょう:

```js run
let str = "He said: \"She's the one!\".";

let reg = /(['"])(.*?)\1/g;
=======
# Backreferences in pattern: \n and \k

We can use the contents of capturing groups `(...)` not only in the result or in the replacement string, but also in the pattern itself.

## Backreference by number: \n

A group can be referenced in the pattern using `\n`, where `n` is the group number.

To make things clear let's consider a task.

We need to find a quoted string: either a single-quoted `subject:'...'` or a double-quoted `subject:"..."` -- both variants need to match.

How to look for them?

We can put both kinds of quotes in the square brackets: `pattern:['"](.*?)['"]`, but it would find strings with mixed quotes, like `match:"...'` and `match:'..."`. That would lead to incorrect matches when one quote appears inside other ones, like the string `subject:"She's the one!"`:

```js run
let str = `He said: "She's the one!".`;

let reg = /['"](.*?)['"]/g;

// The result is not what we expect
alert( str.match(reg) ); // "She'
```

As we can see, the pattern found an opening quote `match:"`, then the text is consumed lazily till the other quote `match:'`, that closes the match.

To make sure that the pattern looks for the closing quote exactly the same as the opening one, we can wrap it into a capturing group and use the backreference.

Here's the correct code:

```js run
let str = `He said: "She's the one!".`;

*!*
let reg = /(['"])(.*?)\1/g;
*/!*
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

alert( str.match(reg) ); // "She's the one!"
```

<<<<<<< HEAD
これですべて正しいです! 正規表現エンジンは最初の引用符 `pattern:(['"])` を見つけ、`pattern:(...)` の中身を覚えます。それは最初のキャプチャグループです。

さらにパターン `pattern:\1` は "最初のグループと同じテキストを見つける" ことを意味します。

注意してください:

- 置換文字列の中でグループを参照するには -- `$1` を使います。一方、パターンは -- バックスラッシュ `\1` です。
- グループの中で `?:` を使用すると、それを参照することはできません。キャプチャ `(?:...)` により除外されたグループはエンジンによって記憶されません。
=======
Now it works! The regular expression engine finds the first quote `pattern:(['"])` and remembers the content of `pattern:(...)`, that's the first capturing group.

Further in the pattern `pattern:\1` means "find the same text as in the first group", exactly the same quote in our case.

Please note:

- To reference a group inside a replacement string -- we use `$1`, while in the pattern -- a backslash `\1`.
- If we use `?:` in the group, then we can't reference it. Groups that are excluded from capturing `(?:...)` are not remembered by the engine.

## Backreference by name: `\k<name>`

For named groups, we can backreference by `\k<name>`.

The same example with the named group:

```js run
let str = `He said: "She's the one!".`;

*!*
let reg = /(?<quote>['"])(.*?)\k<quote>/g;
*/!*

alert( str.match(reg) ); // "She's the one!"
```
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
