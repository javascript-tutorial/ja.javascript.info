3桁の色 `#abc` を検索する正規表現は `pattern:/#[a-f0-9]{3}/i` です。

正確に3つの任意の16進数を指定できます。 私たちはそれ以上もそれ以下も必要ではありません。それを持っているか、持っていないかのどちらかです。

それらを追加する最も単純な方法は -- 正規表現に追加することです: `pattern:/#[a-f0-9]{3}([a-f0-9]{3})?/i`

よりスマートな方法で書くこともできます: `pattern:/#([a-f0-9]{3}){1,2}/i`.

<<<<<<< HEAD:5-regular-expressions/09-regexp-groups/1-find-webcolor-3-or-6/solution.md
ここで正規表現 `pattern:[a-f0-9]{3}` は括弧の中にあり、全体として量指定子 `pattern:{1,2}` を適用します。
=======
Here the regexp `pattern:[a-f0-9]{3}` is in parentheses to apply the quantifier `pattern:{1,2}` to it as a whole.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb:9-regular-expressions/09-regexp-groups/1-find-webcolor-3-or-6/solution.md

動作:

```js run
let reg = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(reg) ); // #3f3 #AA00ef #abc
```

<<<<<<< HEAD:5-regular-expressions/09-regexp-groups/1-find-webcolor-3-or-6/solution.md
ここで小さな問題があります: パターンは `subject:#abcd` の中で `match:#abc` を見つけます。これを避けるには、末尾に `pattern:\b` を追加します。:
=======
There's a minor problem here: the pattern found `match:#abc` in `subject:#abcd`. To prevent that we can add `pattern:\b` to the end:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb:9-regular-expressions/09-regexp-groups/1-find-webcolor-3-or-6/solution.md

```js run
let reg = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(reg) ); // #3f3 #AA00ef
```
