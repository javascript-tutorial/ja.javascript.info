<<<<<<< HEAD
# RegExp と文字列のメソッド

正規表現を扱う2つの方法があります。

1. まず正規表現は組み込みの [RegExp](mdn:js/RegExp) クラスのオブジェクトであり、多くのメソッドを提供します。
2. それに加えて、文字列の中に正規表現で動作するメソッドがあります。

構造は少しゴチャゴチャしているので、最初にメソッドを個別に考察し、その後で共通のタスクに対して実際のレシピを考えて行きます。

[cut]

## str.search(reg)

我々はすでにこのメソッドを見ました。これは最初にマッチした位置を、見つからない場合は `-1` を返します。:

```js run
let str = "A drop of ink may make a million think";

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

```js run
let str = "Fame is the thirst of youth";

let result = str.match( *!*/fame/i*/!* );

alert( result[0] );    // Fame (マッチしたもの)
alert( result.index ); // 0 (ゼロ位置)
alert( result.input ); // "Fame is the thirst of youth" (対象文字列)
```

配列は1つ以上の要素を持っている場合があります。

**パターンの一部が丸括弧 `(...)` で区切られている場合、それは配列の別の要素になります**

例:

```js run
let str = "JavaScript is a programming language";

let result = str.match( *!*/JAVA(SCRIPT)/i*/!* );

alert( result[0] ); // JavaScript (マッチ全体)
alert( result[1] ); // script (括弧に対応するマッチした部分)
alert( result.index ); // 0
alert( result.input ); // JavaScript is a programming language
```

`i` フラグにより、検索は大文字小文字区別なしです。そのため、`match:JavaScript` を見つけます。`pattern:SCRIPT` に対応するマッチの一部は別の配列アイテムになります。

後ほど、チャプター <info:regexp-groups> で括弧について戻ります。括弧は検索と置換に最適です。

## str.match(reg) "g" フラグ付き

`"g"` フラグがあると、`str.match` はすべてのマッチの配列を返します。その配列には追加のプロパティはなく、括弧は要素を作成しません。

例:

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/ho/ig*/!* );

alert( result ); // HO, Ho, ho (すべてのマッチ, 大文字小文字の区別なし)
```

括弧がある場合も変わりません。やってみましょう:

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/h(o)/ig*/!* );

alert( result ); // HO, Ho, ho
```

したがって、`g` フラグがあると、`result` はシンプルなマッチの配列になります。追加のプロパティはありません。

マッチした位置に関する情報を取得したり、括弧を使いたい場合は、下で説明する [RegExp#exec](mdn:js/RegExp/exec) メソッドを使用する必要があります。

````warn header="マッチするものがない場合、`match` の呼び出しは `null` を返します"
注意してください、重要です。マッチするものがなかった場合、結果は空の配列ではなく `null` です。

次のような落とし穴を避けるために心に留めておいてください:

```js run
let str = "Hey-hey-hey!";

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
```

## str.replace(str|reg, str|func)

文字列の検索や置換のためのスイス・アーミーナイフ(万能なもの)です。

最も簡単な使い方は -- このように部分文字列の検索と置換です:
=======
# Methods of RegExp and String

In this article we'll cover various methods that work with regexps in-depth.

## str.match(regexp)

The method `str.match(regexp)` finds matches for `regexp` in the string `str`.

It has 3 modes:

1. If the `regexp` doesn't have flag `pattern:g`, then it returns the first match as an array with capturing groups and properties `index` (position of the match), `input` (input string, equals `str`):

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/);

    alert( result[0] );     // JavaScript (full match)
    alert( result[1] );     // Script (first capturing group)
    alert( result.length ); // 2

    // Additional information:
    alert( result.index );  // 7 (match position)
    alert( result.input );  // I love JavaScript (source string)
    ```

2. If the `regexp` has flag `pattern:g`, then it returns an array of all matches as strings, without capturing groups and other details.
    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/g);

    alert( result[0] ); // JavaScript
    alert( result.length ); // 1
    ```

3. If there are no matches, no matter if there's flag `pattern:g` or not, `null` is returned.

    That's an important nuance. If there are no matches, we don't get an empty array, but `null`. It's easy to make a mistake forgetting about it, e.g.:

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/HTML/);

    alert(result); // null
    alert(result.length); // Error: Cannot read property 'length' of null
    ```

    If we want the result to be an array, we can write like this:

    ```js
    let result = str.match(regexp) || [];
    ```

## str.matchAll(regexp)

[recent browser="new"]

The method `str.matchAll(regexp)` is a "newer, improved" variant of `str.match`.

It's used mainly to search for all matches with all groups.

There are 3 differences from `match`:

1. It returns an iterable object with matches instead of an array. We can make a regular array from it using `Array.from`.
2. Every match is returned as an array with capturing groups (the same format as `str.match` without flag `pattern:g`).
3. If there are no results, it returns an empty iterable object instead of `null`.

Usage example:

```js run
let str = '<h1>Hello, world!</h1>';
let regexp = /<(.*?)>/g;

let matchAll = str.matchAll(regexp);

alert(matchAll); // [object RegExp String Iterator], not array, but an iterable

matchAll = Array.from(matchAll); // array now

let firstMatch = matchAll[0];
alert( firstMatch[0] );  // <h1>
alert( firstMatch[1] );  // h1
alert( firstMatch.index );  // 0
alert( firstMatch.input );  // <h1>Hello, world!</h1>
```

If we use `for..of` to loop over `matchAll` matches, then we don't need `Array.from` any more.

## str.split(regexp|substr, limit)

Splits the string using the regexp (or a substring) as a delimiter.

We can use `split` with strings, like this:

```js run
alert('12-34-56'.split('-')) // array of ['12', '34', '56']
```

But we can split by a regular expression, the same way:

```js run
alert('12, 34, 56'.split(/,\s*/)) // array of ['12', '34', '56']
```

## str.search(regexp)

The method `str.search(regexp)` returns the position of the first match or `-1` if none found:

```js run
let str = "A drop of ink may make a million think";

alert( str.search( /ink/i ) ); // 10 (first match position)
```

**The important limitation: `search` only finds the first match.**

If we need positions of further matches, we should use other means, such as finding them all with `str.matchAll(regexp)`.

## str.replace(str|regexp, str|func)

This is a generic method for searching and replacing, one of most useful ones. The swiss army knife for searching and replacing.  

We can use it without regexps, to search and replace a substring:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

```js run
let str = "John Smith";

alert(str.replace(/(John) (Smith)/, '$2, $1')) // Smith, John
```

**"賢い"な置換が必要な状況では、2つ目の引数は関数にすることができます**

それぞれのマッチに対して呼び出され、その結果が置換として挿入されます。

例:

```js run
let i = 0;

// 各 "ho" を関数の結果に置換します
alert("HO-Ho-ho".replace(/ho/gi, function() {
  return ++i;
})); // 1-2-3
```

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
  return str.toLowerCase();
}

let result = "HO-Ho-ho".replace(/ho/gi, replacer);
alert( 'Result: ' + result ); // Result: ho-ho-ho

// それぞれのマッチを表示:
// Found HO at position 0 in string HO-Ho-ho
// Found Ho at position 3 in string HO-Ho-ho
// Found ho at position 6 in string HO-Ho-ho
```

下の例では2つの括弧があります。なので、`replacer` は5つの引数で呼ばれます: `str` は完全なマッチ, 次に括弧, そして `offset` と `s` です:

```js run
function replacer(str, name, surname, offset, s) {
  // name は最初の括弧で、surname は2つ目です
  return surname + ", " + name;
}

let str = "John Smith";

alert(str.replace(/(John) (Smith)/, replacer)) // Smith, John
```

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

```js run
let str = 'A lot about JavaScript at https://javascript.info';

=======
There's a pitfall though.

**When the first argument of `replace` is a string, it only replaces the first match.**

You can see that in the example above: only the first `"-"` is replaced by `":"`.

To find all hyphens, we need to use not the string `"-"`, but a regexp `pattern:/-/g`, with the obligatory `pattern:g` flag:

```js run
// replace all dashes by a colon
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

The second argument is a replacement string. We can use special characters in it:

| Symbols | Action in the replacement string |
|--------|--------|
|`$&`|inserts the whole match|
|<code>$&#096;</code>|inserts a part of the string before the match|
|`$'`|inserts a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, inserts the contents of n-th capturing group, for details see [](info:regexp-groups)|
|`$<name>`|inserts the contents of the parentheses with the given `name`, for details see [](info:regexp-groups)|
|`$$`|inserts character `$` |

For instance:

```js run
let str = "John Smith";

// swap first and last name
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**For situations that require "smart" replacements, the second argument can be a function.**

It will be called for each match, and the returned value will be inserted as a replacement.

The function is called with arguments `func(match, p1, p2, ..., pn, offset, input, groups)`:

1. `match` -- the match,
2. `p1, p2, ..., pn` -- contents of capturing groups (if there are any),
3. `offset` -- position of the match,
4. `input` -- the source string,
5. `groups` -- an object with named groups.

If there are no parentheses in the regexp, then there are only 3 arguments: `func(str, offset, input)`.

For example, let's uppercase all matches:

```js run
let str = "html and css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML and CSS
```

Replace each match by its position in the string:

```js run
alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
```

In the example below there are two parentheses, so the replacement function is called with 5 arguments: the first is the full match, then 2 parentheses, and after it (not used in the example) the match position and the source string:

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

alert(result); // Smith, John
```

If there are many groups, it's convenient to use rest parameters to access them:

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

alert(result); // Smith, John
```

Or, if we're using named groups, then `groups` object with them is always the last, so we can obtain it like this:

```js run
let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
  let groups = match.pop();

  return `${groups.surname}, ${groups.name}`;
});

alert(result); // Smith, John
```

Using a function gives us the ultimate replacement power, because it gets all the information about the match, has access to outer variables and can do everything.

## str.replaceAll(str|regexp, str|func)

This method is essentially the same as `str.replace`, with two major differences:

1. If the first argument is a string, it replaces *all occurrences* of the string, while `replace` replaces only the *first occurrence*.
2. If the first argument is a regular expression without the `g` flag, there'll be an error. With `g` flag, it works the same as `replace`.

The main use case for `replaceAll` is replacing all occurrences of a string.

Like this:

```js run
// replace all dashes by a colon
alert('12-34-56'.replaceAll("-", ":")) // 12:34:56
```


## regexp.exec(str)

The `regexp.exec(str)` method returns a match for `regexp` in the string `str`.  Unlike previous methods, it's called on a regexp, not on a string.

It behaves differently depending on whether the regexp has flag `pattern:g`.

If there's no `pattern:g`, then `regexp.exec(str)` returns the first match exactly as  `str.match(regexp)`. This behavior doesn't bring anything new.

But if there's flag `pattern:g`, then:
- A call to `regexp.exec(str)` returns the first match and saves the position immediately after it in the property `regexp.lastIndex`.
- The next such call starts the search from position `regexp.lastIndex`, returns the next match and saves the position after it in `regexp.lastIndex`.
- ...And so on.
- If there are no matches, `regexp.exec` returns `null` and resets `regexp.lastIndex` to `0`.

So, repeated calls return all matches one after another, using property `regexp.lastIndex` to keep track of the current search position.

In the past, before the method `str.matchAll` was added to JavaScript, calls of `regexp.exec` were used in the loop to get all matches with groups:

```js run
let str = 'More about JavaScript at https://javascript.info';
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
<<<<<<< HEAD
  alert( `Found ${result[0]} at ${result.index}` );
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
  alert( `Found ${result[0]} at position ${result.index}` );
  // Found JavaScript at position 11, then
  // Found javascript at position 33
}
```

This works now as well, although for newer browsers `str.matchAll` is usually more convenient.

**We can use `regexp.exec` to search from a given position by manually setting `lastIndex`.**

For instance:

```js run
let str = 'Hello, world!';

let regexp = /\w+/g; // without flag "g", lastIndex property is ignored
regexp.lastIndex = 5; // search from 5th position (from the comma)

alert( regexp.exec(str) ); // world
```

If the regexp has flag `pattern:y`, then the search will be performed exactly at the  position `regexp.lastIndex`, not any further.

Let's replace flag `pattern:g` with `pattern:y` in the example above. There will be no matches, as there's no word at position `5`:

```js run
let str = 'Hello, world!';

let regexp = /\w+/y;
regexp.lastIndex = 5; // search exactly at position 5

alert( regexp.exec(str) ); // null
```

That's convenient for situations when we need to "read" something from the string by a regexp at the exact position, not somewhere further.

## regexp.test(str)

The method `regexp.test(str)` looks for a match and returns `true/false` whether it exists.

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

If the regexp has flag `pattern:g`, then `regexp.test` looks from `regexp.lastIndex` property and updates this property, just like `regexp.exec`.

So we can use it to search from a given position:

```js run
let regexp = /love/gi;

let str = "I love JavaScript";

// start the search from position 10:
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false (no match)
```

````warn header="Same global regexp tested repeatedly on different sources may fail"
If we apply the same global regexp to different inputs, it may lead to wrong result, because `regexp.test` call advances `regexp.lastIndex` property, so the search in another string may start from non-zero position.

For instance, here we call `regexp.test` twice on the same text, and the second time fails:

```js run
let regexp = /javascript/g;  // (regexp just created: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 now)
alert( regexp.test("javascript") ); // false
```

That's exactly because `regexp.lastIndex` is non-zero in the second test.

To work around that, we can set `regexp.lastIndex = 0` before each search. Or instead of calling methods on regexp, use string methods `str.match/search/...`, they don't use `lastIndex`.
````
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
