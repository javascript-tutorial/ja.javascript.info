<<<<<<< HEAD
# RegExp と文字列のメソッド

正規表現を扱う2つの方法があります。

1. まず正規表現は組み込みの [RegExp](mdn:js/RegExp) クラスのオブジェクトであり、多くのメソッドを提供します。
2. それに加えて、文字列の中に正規表現で動作するメソッドがあります。

構造は少しゴチャゴチャしているので、最初にメソッドを個別に考察し、その後で共通のタスクに対して実際のレシピを考えて行きます。

[cut]

## str.search(reg)

我々はすでにこのメソッドを見ました。これは最初にマッチした位置を、見つからない場合は `-1` を返します。:
=======
# Methods of RegExp and String

There are two sets of methods to deal with regular expressions.

1. First, regular expressions are objects of the built-in [RegExp](mdn:js/RegExp) class, it provides many methods.
2. Besides that, there are methods in regular strings can work with regexps.


## Recipes

Which method to use depends on what we'd like to do.

Methods become much easier to understand if we separate them by their use in real-life tasks.

So, here are general recipes, the details to follow:

**To search for all matches:**

Use regexp `g` flag and:
- Get a flat array of matches -- `str.match(reg)`
- Get an array or matches with details -- `str.matchAll(reg)`.

**To search for the first match only:**
- Get the full first match -- `str.match(reg)` (without `g` flag).
- Get the string position of the first match -- `str.search(reg)`.
- Check if there's a match -- `regexp.test(str)`.
- Find the match from the given position -- `regexp.exec(str)` (set `regexp.lastIndex` to position).

**To replace all matches:**
- Replace with another string or a function result -- `str.replace(reg, str|func)`

**To split the string by a separator:**
- `str.split(str|reg)`

Now you can continue reading this chapter to get the details about every method... But if you're reading for the first time, then you probably want to know more about regexps. So you can move to the next chapter, and then return here if something about a method is unclear.

## str.search(reg)

We've seen this method already. It returns the position of the first match or `-1` if none found:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
let str = "A drop of ink may make a million think";

<<<<<<< HEAD
alert( str.search( *!*/a/i*/!* ) ); // 0 (先頭の位置)
```

**重要な制限: `search` は常に最初のマッチを探します。**

`search` を使用して次の位置を見つけることはできません(そのための構文はありません)。しかしそれができる別のメソッドがあります。

## str.match(reg), "g" フラグなし

メソッド `str.match` は `g` フラグに応じて振る舞いが異なります。
まずは `g` がない場合を見てみましょう。

`str.match(reg)` は最初のマッチのみを探します

結果は、マッチしたものと追加プロパティを持つ配列です:

- `index` -- 文字列内でのマッチした位置
- `input` -- 対象文字列

例:
=======
alert( str.search( *!*/a/i*/!* ) ); // 0 (first match at zero position)
```

**The important limitation: `search` only finds  the first match.**

We can't find next matches using `search`, there's just no syntax for that. But there are other methods that can.

## str.match(reg), no "g" flag

The behavior of `str.match` varies depending on whether `reg` has `g` flag or not.

First, if there's no `g` flag, then `str.match(reg)` looks for the first match only.

The result is an array with that match and additional properties:

- `index` -- the position of the match inside the string,
- `input` -- the subject string.

For instance:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
let str = "Fame is the thirst of youth";

let result = str.match( *!*/fame/i*/!* );

<<<<<<< HEAD
alert( result[0] );    // Fame (マッチしたもの)
alert( result.index ); // 0 (ゼロ位置)
alert( result.input ); // "Fame is the thirst of youth" (対象文字列)
```

配列は1つ以上の要素を持っている場合があります。

**パターンの一部が丸括弧 `(...)` で区切られている場合、それは配列の別の要素になります**

例:
=======
alert( result[0] );    // Fame (the match)
alert( result.index ); // 0 (at the zero position)
alert( result.input ); // "Fame is the thirst of youth" (the string)
```

A match result may have more than one element.

**If a part of the pattern is delimited by parentheses `(...)`, then it becomes a separate element in the array.**

If parentheses have a name, designated by `(?<name>...)` at their start, then `result.groups[name]` has the content. We'll see that later in the chapter [about groups](info:regexp-groups).

For instance:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
let str = "JavaScript is a programming language";

let result = str.match( *!*/JAVA(SCRIPT)/i*/!* );

<<<<<<< HEAD
alert( result[0] ); // JavaScript (マッチ全体)
alert( result[1] ); // script (括弧に対応するマッチした部分)
=======
alert( result[0] ); // JavaScript (the whole match)
alert( result[1] ); // script (the part of the match that corresponds to the parentheses)
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
alert( result.index ); // 0
alert( result.input ); // JavaScript is a programming language
```

<<<<<<< HEAD
`i` フラグにより、検索は大文字小文字区別なしです。そのため、`match:JavaScript` を見つけます。`pattern:SCRIPT` に対応するマッチの一部は別の配列アイテムになります。

後ほど、チャプター <info:regexp-groups> で括弧について戻ります。括弧は検索と置換に最適です。

## str.match(reg) "g" フラグ付き

`"g"` フラグがあると、`str.match` はすべてのマッチの配列を返します。その配列には追加のプロパティはなく、括弧は要素を作成しません。

例:
=======
Due to the `i` flag the search is case-insensitive, so it finds `match:JavaScript`. The part of the match that corresponds to `pattern:SCRIPT` becomes a separate array item.

So, this method is used to find one full match with all details.


## str.match(reg) with "g" flag

When there's a `"g"` flag, then `str.match` returns an array of all matches. There are no additional properties in that array, and parentheses do not create any elements.

For instance:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/ho/ig*/!* );

<<<<<<< HEAD
alert( result ); // HO, Ho, ho (すべてのマッチ, 大文字小文字の区別なし)
```

括弧がある場合も変わりません。やってみましょう:
=======
alert( result ); // HO, Ho, ho (array of 3 matches, case-insensitive)
```

Parentheses do not change anything, here we go:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/h(o)/ig*/!* );

alert( result ); // HO, Ho, ho
```

<<<<<<< HEAD
したがって、`g` フラグがあると、`result` はシンプルなマッチの配列になります。追加のプロパティはありません。

マッチした位置に関する情報を取得したり、括弧を使いたい場合は、下で説明する [RegExp#exec](mdn:js/RegExp/exec) メソッドを使用する必要があります。

````warn header="マッチするものがない場合、`match` の呼び出しは `null` を返します"
注意してください、重要です。マッチするものがなかった場合、結果は空の配列ではなく `null` です。

次のような落とし穴を避けるために心に留めておいてください:
=======
**So, with `g` flag `str.match` returns a simple array of all matches, without details.**

If we want to get information about match positions and contents of parentheses then we should use `matchAll`  method that we'll cover below.

````warn header="If there are no matches, `str.match` returns `null`"
Please note, that's important. If there are no matches, the result is not an empty array, but `null`.

Keep that in mind to evade pitfalls like this:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
let str = "Hey-hey-hey!";

<<<<<<< HEAD
alert( str.match(/ho/gi).length ); // error! there's no length of null
```
````

## str.split(regexp|substr, limit)

正規表現または部分文字列を区切り文字として使用して文字列を分割します。

私たちはすでに文字列で `split` を使いました。このようになります:

```js run
alert('12-34-56'.split('-')) // [12, 34, 56]
```

しかし、正規表現を渡すことも可能です。:

```js run
alert('12-34-56'.split(/-/)) // [12, 34, 56]
=======
alert( str.match(/Z/g).length ); // Error: Cannot read property 'length' of null
```

Here `str.match(/Z/g)` is `null`, it has no `length` property.
````

## str.matchAll(regexp)

The method `str.matchAll(regexp)` is used to find all matches with all details.

For instance:

```js run
let str = "Javascript or JavaScript? Should we uppercase 'S'?";

let result = str.matchAll( *!*/java(script)/ig*/!* );

let [match1, match2] = result;

alert( match1[0] ); // Javascript (the whole match)
alert( match1[1] ); // script (the part of the match that corresponds to the parentheses)
alert( match1.index ); // 0
alert( match1.input ); // = str (the whole original string)

alert( match2[0] ); // JavaScript (the whole match)
alert( match2[1] ); // Script (the part of the match that corresponds to the parentheses)
alert( match2.index ); // 14
alert( match2.input ); // = str (the whole original string)
```

````warn header="`matchAll` returns an iterable, not array"
For instance, if we try to get the first match by index, it won't work:

```js run
let str = "Javascript or JavaScript??";

let result = str.matchAll( /javascript/ig );

*!*
alert(result[0]); // undefined (?! there must be a match)
*/!*
```

The reason is that the iterator is not an array. We need to run `Array.from(result)` on it, or use `for..of` loop to get matches.

In practice, if we need all matches, then `for..of` works, so it's not a problem.

And, to get only few matches, we can use destructuring:

```js run
let str = "Javascript or JavaScript??";

*!*
let [firstMatch] = str.matchAll( /javascript/ig );
*/!*

alert(firstMatch); // Javascript
```
````

```warn header="`matchAll` is supernew, may need a polyfill"
The method may not work in old browsers. A polyfill might be needed (this site uses core-js).

Or you could make a loop with `regexp.exec`, explained below.
```

## str.split(regexp|substr, limit)

Splits the string using the regexp (or a substring) as a delimiter.

We already used `split` with strings, like this:

```js run
alert('12-34-56'.split('-')) // array of [12, 34, 56]
```

But we can split by a regular expression, the same way:

```js run
alert('12-34-56'.split(/-/)) // array of [12, 34, 56]
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
```

## str.replace(str|reg, str|func)

<<<<<<< HEAD
文字列の検索や置換のためのスイス・アーミーナイフ(万能なもの)です。

最も簡単な使い方は -- このように部分文字列の検索と置換です:
=======
This is a generic method for searching and replacing, one of most useful ones. The swiss army knife for searching and replacing.  

We can use it without regexps, to search and replace a substring:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
// replace a dash by a colon
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

<<<<<<< HEAD
`replace` の第一引数が文字列の場合、最初のマッチのみを探します。

すべてのダッシュ `"-"` を見つけるためには、文字列 `"-"` ではなく、`g` フラグを持つ正規表現 `pattern:/-/g` を使用する必要があります。:

```js run
// すべてのダッシュをコロンに置換
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

2つ目の引数は置換文字列です。

そこでは特別な文字が利用できます:

| 記号 | 挿入 |
|--------|--------|
|`$$`|`"$"` |
|`$&`|マッチ全体|
|<code>$&#096;</code>|マッチの前の文字列の一部|
|`$'`|a part of the string after the match|
|`$n`| `n` が1-2桁の数字ならば、左から右に数えてn番目のカッコの内容を意味します|

例えば、`$&` を使ってすべての `"John"` のエントリを `"Mr.John"` に置き換えましょう。:

```js run
let str = "John Doe, John Smith and John Bull.";

// 各 John に対して - Mr. と John に置換
alert(str.replace(/John/g, 'Mr.$&'));
// "Mr.John Doe, Mr.John Smith and Mr.John Bull.";
```

括弧は次のように `$1`, `$2` などと一緒によく使用されます。:
=======
There's a pitfall though.

**When the first argument of `replace` is a string, it only looks for the first match.**

You can see that in the example above: only the first `"-"` is replaced by `":"`.

To find all dashes, we need to use not the string `"-"`, but a regexp `pattern:/-/g`, with an obligatory `g` flag:

```js run
// replace all dashes by a colon
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

The second argument is a replacement string. We can use special characters in it:

| Symbol | Inserts |
|--------|--------|
|`$$`|`"$"` |
|`$&`|the whole match|
|<code>$&#096;</code>|a part of the string before the match|
|`$'`|a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, then it means the contents of n-th parentheses counting from left to right, otherwise it means a parentheses with the given name |


For instance if we use `$&` in the replacement string, that means "put the whole match here".

Let's use it to prepend all entries of `"John"` with `"Mr."`:

```js run
let str = "John Doe, John Smith and John Bull";

// for each John - replace it with Mr. and then John
alert(str.replace(/John/g, 'Mr.$&'));  // Mr.John Doe, Mr.John Smith and Mr.John Bull
```

Quite often we'd like to reuse parts of the source string, recombine them in the replacement or wrap into something.

To do so, we should:
1. First, mark the parts by parentheses in regexp.
2. Use `$1`, `$2` (and so on) in the replacement string to get the content matched by 1st, 2nd and so on parentheses.

For instance:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
let str = "John Smith";

<<<<<<< HEAD
alert(str.replace(/(John) (Smith)/, '$2, $1')) // Smith, John
```

**"賢い"な置換が必要な状況では、2つ目の引数は関数にすることができます**

それぞれのマッチに対して呼び出され、その結果が置換として挿入されます。

例:
=======
// swap first and last name
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**For situations that require "smart" replacements, the second argument can be a function.**

It will be called for each match, and its result will be inserted as a replacement.

For instance:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
let i = 0;

<<<<<<< HEAD
// 各 "ho" を関数の結果に置換します
=======
// replace each "ho" by the result of the function
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
alert("HO-Ho-ho".replace(/ho/gi, function() {
  return ++i;
})); // 1-2-3
```

<<<<<<< HEAD
上の例では、関数は単に毎回次の数値を返していますが、通常は結果はマッチしたものに基づいたものになります。

関数は引数 `func(str, p1, p2, ..., pn, offset, s)` で呼ばれます:

1. `str` -- マッチしたもの,
2. `p1, p2, ..., pn` -- 括弧の内容(ある場合),
3. `offset` -- マッチした位置,
4. `s` -- 元の文字列.

正規表現に括弧がない場合、関数は常に3つの引数です: `func(str, offset, s)`。

これらを使って、マッチしたものについての完全な情報を表示してみましょう。:

```js run
// すべてのマッチを表示し置き換える
function replacer(str, offset, s) {
  alert(`Found ${str} at position ${offset} in string ${s}`);
=======
In the example above the function just returns the next number every time, but usually the result is based on the match.

The function is called with arguments `func(str, p1, p2, ..., pn, offset, input, groups)`:

1. `str` -- the match,
2. `p1, p2, ..., pn` -- contents of parentheses (if there are any),
3. `offset` -- position of the match,
4. `input` -- the source string,
5. `groups` -- an object with named groups (see chapter [](info:regexp-groups)).

If there are no parentheses in the regexp, then there are only 3 arguments: `func(str, offset, input)`.

Let's use it to show full information about matches:

```js run
// show and replace all matches
function replacer(str, offset, input) {
  alert(`Found ${str} at position ${offset} in string ${input}`);
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
  return str.toLowerCase();
}

let result = "HO-Ho-ho".replace(/ho/gi, replacer);
alert( 'Result: ' + result ); // Result: ho-ho-ho

<<<<<<< HEAD
// それぞれのマッチを表示:
=======
// shows each match:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
// Found HO at position 0 in string HO-Ho-ho
// Found Ho at position 3 in string HO-Ho-ho
// Found ho at position 6 in string HO-Ho-ho
```

<<<<<<< HEAD
下の例では2つの括弧があります。なので、`replacer` は5つの引数で呼ばれます: `str` は完全なマッチ, 次に括弧, そして `offset` と `s` です:

```js run
function replacer(str, name, surname, offset, s) {
  // name は最初の括弧で、surname は2つ目です
=======
In the example below there are two parentheses, so `replacer` is called with 5 arguments: `str` is the full match, then parentheses, and then `offset` and `input`:

```js run
function replacer(str, name, surname, offset, input) {
  // name is the first parentheses, surname is the second one
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
  return surname + ", " + name;
}

let str = "John Smith";

alert(str.replace(/(John) (Smith)/, replacer)) // Smith, John
```

<<<<<<< HEAD
関数を使用すると、マッチしたものに関するすべての情報を取得し、外部変数にアクセスし、すべてを行うことができるため、究極的な置換機能が得られます。

## regexp.test(str)

regexp 自身が呼び出しできる `RegExp` クラスのメソッドを見てみましょう。

`test` メソッドはマッチするか探し、見つかったかどうかで `true/false` を返します。

なので、基本的には `str.search(reg) != -1` と同じです。例えば:

```js run
let str = "I love JavaScript";

// これらの2つのテストは同じことをします
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

見つからない場合の例です:

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

## regexp.exec(str)

すでにこれらの検索メソッドは見ました:

- `search` -- マッチする位置を探す
- `match` -- `g` フラグがなければ括弧のものと一緒に最初にマッチしたものを返します
- `match` -- `g` フラグがあれば -- すべてのマッチしたものを返します。括弧のものは含まれません。

`regexp.exec` メソッドは少し使いにくいですが、括弧のものや位置と一緒にすべてのマッチを検索することができます。

これは正規表現に `g` フラグがあるかどうかで動作が異なります。

- `g` フラグがない場合、`regexp.exec(str)` は最初のマッチを返します。これはまさに `str.match(reg)` と同じです。
- `g` がある場合、`regexp.exec(str)` は最初のマッチを返し、その後 `regexp.lastIndex` プロパティにその後ろの位置を *記憶します* 。次の呼び出しは `regexp.lastIndex` から検索が始まり、次のマッチを返します。もしこれ以上マッチするものがない場合、`regexp.exec` は `null` を返し、`regexp.lastIndex` は `0` にセットされます。

見て分かるように、`g` フラグがない場合は `str.match` とまったく同じであるため、このメソッドは新しいことは何もありません。

しかし、`g` フラグはそれらの位置と括弧のグループを含めたすべてのマッチを得る事ができます。

これは、次の `regexp.exec` 呼び出しがどのように1つずつマッチを返すかの例です:

```js run
let str = "A lot about JavaScript at https://javascript.info";

let regexp = /JAVA(SCRIPT)/ig;

*!*
// 最初のマッチを探す
*/!*
let matchOne = regexp.exec(str);
alert( matchOne[0] ); // JavaScript
alert( matchOne[1] ); // script
alert( matchOne.index ); // 12 (マッチした位置)
alert( matchOne.input ); // str と同じ

alert( regexp.lastIndex ); // 22 (マッチ後の位置)

*!*
// 2つ目のマッチを探す
*/!*
let matchTwo = regexp.exec(str); // regexp.lastIndex から検索を続ける
alert( matchTwo[0] ); // javascript
alert( matchTwo[1] ); // script
alert( matchTwo.index ); // 34 (マッチした位置)
alert( matchTwo.input ); // str と同じ

alert( regexp.lastIndex ); // 44 (マッチ後の位置)

*!*
// 3つ目のマッチを探す
*/!*
let matchThree = regexp.exec(str); // regexp.lastIndex から検索を続ける
alert( matchThree ); // null (マッチしない)

alert( regexp.lastIndex ); // 0 (リセット)
```

ご覧の通り、各 `regexp.exec` 呼び出しは "完全なフォーマット(括弧の配列、`index` として `input` プロパティ )" でマッチを返します。

`regexp.exec` の主なユースケースはループ内ですべてのマッチを見つけることです。:
=======
Using a function gives us the ultimate replacement power, because it gets all the information about the match, has access to outer variables and can do everything.

## regexp.exec(str)

We've already seen these searching methods:

- `search` -- looks for the position of the match,
- `match` -- if there's no `g` flag, returns the first match with parentheses and all details,
- `match` -- if there's a `g` flag -- returns all matches, without details parentheses,
- `matchAll` -- returns all matches with details.

The `regexp.exec` method is the most flexible searching method of all. Unlike previous methods, `exec` should be called on a regexp, rather than on a string.

It behaves differently depending on whether the regexp has the `g` flag.

If there's no `g`, then `regexp.exec(str)` returns the first match, exactly as `str.match(reg)`. Such behavior does not give us anything new.

But if there's `g`, then:
- `regexp.exec(str)` returns the first match and *remembers* the position after it in `regexp.lastIndex` property.
- The next call starts to search from `regexp.lastIndex` and returns the next match.
- If there are no more matches then `regexp.exec` returns `null` and `regexp.lastIndex` is set to `0`.

We could use it to get all matches with their positions and parentheses groups in a loop, instead of `matchAll`:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
let str = 'A lot about JavaScript at https://javascript.info';

let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at ${result.index}` );
<<<<<<< HEAD
}
```

ループは `regexp.exec` が "これ以上マッチするものはない" を意味する `null` を返すまで続きます。

````smart header="指定された位置から検索する"
`lastIndex` を手動で設定することで、`regexp.exec` が指定位置から検索を開始するよう強制することができます。 :

```js run
let str = 'A lot about JavaScript at https://javascript.info';

let regexp = /javascript/ig;
regexp.lastIndex = 30;

alert( regexp.exec(str).index ); // 34, 検索は 30 の位置から開始
```
````

## "y" フラグ

`y` フラグは、`regexp.lastIndex` プロパティで指定された位置で正確に一致するものが見つかるようにします。

つまり、通常は文字列全体で検索が行われます: `pattern:/javascript/` は文字列のすべての場所で "javascript" を探します。

しかし、正規表現が `y` フラグを持っていると、`regexp.lastIndex` で指定された位置(デフォルトでは `0` )でのみマッチするものを探します。

例:

```js run
let str = "I love JavaScript!";

let reg = /javascript/iy;

alert( reg.lastIndex ); // 0 (default)
alert( str.match(reg) ); // null, 位置 0 では見つかりません

reg.lastIndex = 7;
alert( str.match(reg) ); // JavaScript (正しいです, この文字は位置 7 です)

// それ以外の reg.lastIndex の場合は null です
```

正規表現 `pattern:/javascript/iy` は `reg.lastIndex=7` を設定した場合にのみ見つかります。なぜなら、`y` フラグにより、エンジンは `reg.lastIndex` の位置からの文字列内の単一の場所でのみ見つけようとするためです。

で、何の意味があるのでしょう？どこで適用すればよいでしょうか？

理由はパフォーマンスです。

`y` フラグはテキストを "読み込んで" メモリ内の構文構造を構築したり、そこからアクションを実行したりする必要のあるプログラムにおいて、パーサーとして最適です。そのために、テキストに沿って進み、正規表現を適用して次に何があるかを確認します。: 文字列なのか、数値なのかそれとも別のなにかか？

`y`フラグは与えられた位置に正確に正規表現（もしくはそれらのいくつかを1つずつ）を適用することを可能にし、そこに何があるかを理解すると、テキストを調べる段階に進むことができます。

フラグがないと、正規表現のエンジンは常にテキストの終わりまで検索を行います。それはテキストが巨大な場合は特に時間がかかります。結果、パーサーが非常に遅くなります。`y` フラグはこのようなときに良いものです。

## サマリ、レシピ

実際のタスクで使うことを考えて分けるとメソッドが理解しやすくなります。

最初のマッチのみを検索する:
: - 最初のマッチの位置を見つける -- `str.search(reg)`
- 完全なマッチ(マッチしたもの、位置、元の文字列)を見つける -- `str.match(reg)`
- マッチするものがあるかチェック -- `regexp.test(str)`
- 指定位置からマッチを見つける -- `regexp.exec(str)`, `regexp.lastIndex` に位置を設定します

すべてのマッチを検索する:
: - マッチした配列 -- `str.match(reg)`, `reg` は `g` フラグを持つ正規表現。
- それぞれについて完全な情報を持つすべてのマッチを取得 -- ループ中で `g` フラグを持つ `regexp.exec(str)`

検索して置換する:
: - 別の文字列または関数の結果で置き換える -- `str.replace(reg, str|func)`

文字列を分割する:
: - `str.split(str|reg)`

また、次の2つのフラグも説明しました:

- すべてのマッチを見つける `g` フラグ(グローバル検索),
- テキスト内で正確に指定された位置を検索をする `y` フラグ

これでメソッドを知り、正規表現を使えるようになりました。しかし私たちは正規表現の構文も学ぶ必要があります。次に進みましょう。
=======
  // shows: Found JavaScript at 12, then:
  // shows: Found javascript at 34
}
```

Surely, `matchAll` does the same, at least for modern browsers. But what `matchAll` can't do -- is to search from a given position.

Let's search from position `13`. What we need is to assign `regexp.lastIndex=13` and call `regexp.exec`:

```js run
let str = "A lot about JavaScript at https://javascript.info";

let regexp = /javascript/ig;
*!*
regexp.lastIndex = 13;
*/!*

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at ${result.index}` );
  // shows: Found javascript at 34
}
```

Now, starting from the given position `13`, there's only one match.


## regexp.test(str)

The method `regexp.test(str)` looks for a match and returns `true/false` whether it finds it.

For instance:

```js run
let str = "I love JavaScript";

// these two tests do the same
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

An example with the negative answer:

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

If the regexp has `'g'` flag, then `regexp.test` advances `regexp.lastIndex` property, just like `regexp.exec`.

So we can use it to search from a given position:

```js run
let regexp = /love/gi;

let str = "I love JavaScript";

// start the search from position 10:
regexp.lastIndex = 10
alert( regexp.test(str) ); // false (no match)
```



````warn header="Same global regexp tested repeatedly may fail to match"
If we apply the same global regexp to different inputs, it may lead to wrong result, because `regexp.test` call advances `regexp.lastIndex` property, so the search in another string may start from non-zero position.

For instance, here we call `regexp.test` twice on the same text, and the second time fails:

```js run
let regexp = /javascript/g;  // (regexp just created: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 now)
alert( regexp.test("javascript") ); // false
```

That's exactly because `regexp.lastIndex` is non-zero on the second test.

To work around that, one could use non-global regexps or re-adjust `regexp.lastIndex=0` before a new search.
````

## Summary

There's a variety of many methods on both regexps and strings.

Their abilities and methods overlap quite a bit, we can do the same by different calls. Sometimes that may cause confusion when starting to learn the language.

Then please refer to the recipes at the beginning of this chapter, as they provide solutions for the majority of regexp-related tasks.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
