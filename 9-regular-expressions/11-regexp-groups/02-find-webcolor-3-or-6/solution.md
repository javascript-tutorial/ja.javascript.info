<<<<<<< HEAD
3桁の色 `#abc` を検索する正規表現は `pattern:/#[a-f0-9]{3}/i` です。

正確に3つの任意の16進数を指定できます。 私たちはそれ以上もそれ以下も必要ではありません。それを持っているか、持っていないかのどちらかです。

それらを追加する最も単純な方法は -- 正規表現に追加することです: `pattern:/#[a-f0-9]{3}([a-f0-9]{3})?/i`

よりスマートな方法で書くこともできます: `pattern:/#([a-f0-9]{3}){1,2}/i`.

ここで正規表現 `pattern:[a-f0-9]{3}` は括弧の中にあり、全体として量指定子 `pattern:{1,2}` を適用します。

動作:

```js run
let reg = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(reg) ); // #3f3 #AA0ef #abc
```

ここで小さな問題があります: パターンは `subject:#abcd` の中で `match:#abc` を見つけます。これを避けるには、末尾に `pattern:\b` を追加します。:

```js run
let reg = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(reg) ); // #3f3 #AA0ef
=======
A regexp to search 3-digit color `#abc`: `pattern:/#[a-f0-9]{3}/i`.

We can add exactly 3 more optional hex digits. We don't need more or less. The color has either 3 or 6 digits.

Let's use the quantifier `pattern:{1,2}` for that: we'll have `pattern:/#([a-f0-9]{3}){1,2}/i`.

Here the pattern `pattern:[a-f0-9]{3}` is enclosed in parentheses to apply the quantifier `pattern:{1,2}`.

In action:

```js run
let regexp = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef #abc
```

There's a minor problem here: the pattern found `match:#abc` in `subject:#abcd`. To prevent that we can add `pattern:\b` to the end:

```js run
let regexp = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
