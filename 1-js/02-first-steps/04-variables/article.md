# 変数

<<<<<<< HEAD
ほとんどの場合、JavaScript アプリケーションは情報を処理する必要があります。ここに2つの例があります。
1. オンラインショップ -- 情報は "売られている商品" や "ショッピングカート" などが考えられます。
2. チャットアプリケーション -- 情報は "ユーザ"、"メッセージ" やその他より多くのものが考えられます。
=======
Most of the time, a JavaScript application needs to work with information. Here are two examples:
1. An online shop -- the information might include goods being sold and a shopping cart.
2. A chat application -- the information might include users, messages, and much more.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

変数は情報を保持するために使われます。

<<<<<<< HEAD
## 変数 

[変数](https://en.wikipedia.org/wiki/Variable_(computer_science)) はデータのための "名前付けされた格納場所" です。私たちは商品や訪問者、その他のデータを格納するために変数が利用できます。

JavaScriptで変数を作るには、`let` キーワードを使います。

下の文は "message" という名前の変数を作ります(別の言い方: *宣言* または *定義* ):
=======
## A variable

A [variable](https://en.wikipedia.org/wiki/Variable_(computer_science)) is a "named storage" for data. We can use variables to store goodies, visitors, and other data.

To create a variable in JavaScript, use the `let` keyword.

The statement below creates (in other words: *declares*) a variable with the name "message":
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let message;
```

<<<<<<< HEAD
代入演算子 `=` を使って、データを置く事ができます。
=======
Now, we can put some data into it by using the assignment operator `=`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let message;

*!*
<<<<<<< HEAD
message = 'Hello'; // 文字列を格納します
=======
message = 'Hello'; // store the string 'Hello' in the variable named message
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
```

今、文字列は変数に関連付けられたメモリ領域に保存されています。変数名を使ってアクセスすることができます。:

```js run
let message;
message = 'Hello!';

*!*
alert(message); // 変数の中身を表示します
*/!*
```

<<<<<<< HEAD
簡潔にするために、変数宣言と代入を1行で書くことができます。
=======
To be concise, we can combine the variable declaration and assignment into a single line:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let message = 'Hello!'; // 変数宣言と値の代入

alert(message); // Hello!
```

また、1行で複数の変数を宣言することもできます。

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

<<<<<<< HEAD
より短いように見えるかもしれませんが、これは推奨しません。可読性のため、1変数1行にしてください。
=======
That might seem shorter, but we don't recommend it. For the sake of better readability, please use a single line per variable.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

複数行のケースはちょっと長くなりますが、読みやすいです。

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

<<<<<<< HEAD
多くの変数がある場合、このように書く人もいます:
=======
Some people also define multiple variables in this multiline style:

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hello';
```

...もしくは "カンマから始まる" スタイル:

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

<<<<<<< HEAD
技術的にはこれらすべてのパターンは同じです。なので、これは個人の好みと美学の問題です。

````smart header="`let` の代わりに `var`"
古いスクリプトには、別のキーワードがあるかもしれません: `let` の代わりに `var` です:
=======
Technically, all these variants do the same thing. So, it's a matter of personal taste and aesthetics.

````smart header="`var` instead of `let`"
In older scripts, you may also find another keyword: `var` instead of `let`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
*!*var*/!* message = 'Hello';
```

<<<<<<< HEAD
キーワード `var` は `let` と *ほとんど* 一緒です。それも変数を宣言します。が、わずかに違います, 伝統的スタイルのやり方です。

`let` と `var` には微妙な違いがありますが、まだ気にする必要はありません。その詳細については、<info:var> のチャプターで説明します。
=======
The `var` keyword is *almost* the same as `let`. It also declares a variable, but in a slightly different, "old-school" way.

There are subtle differences between `let` and `var`, but they do not matter for us yet. We'll cover them in detail in the chapter <info:var>.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
````

## 現実での例え 

<<<<<<< HEAD
ユニークな名前のステッカーを付けたデータの "箱" として想像すれば、"変数" という概念を簡単に把握できます。

たとえば、変数 `message` は値 `"Hello!"` を持った `"message"` とラベル付けされた箱として想像することができます。:

![](variable.svg)

箱の中にはどんな値でも入れることができます。
=======
For instance, the variable `message` can be imagined as a box labeled `"message"` with the value `"Hello!"` in it:

![](variable.svg)

We can put any value in the box.

We can also change it as many times as we want:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

また、それを変えることもできます。値は必要なだけ何度でも変更することができます。
```js run
let message;

message = 'Hello!';

message = 'World!'; // 値の変更

alert(message);
```

値が変更されたとき、古い値は変数から削除されます。

![](variable-change.svg)

私たちは2つの変数を宣言して、ある変数から別の変数にデータをコピーすることもできます。

```js run
let hello = 'Hello world!';

let message;

*!*
// hello から message に 'Hello world' をコピー
message = hello;
*/!*

// これで2つの変数は同じデータを持ちます
alert(hello); // Hello world!
alert(message); // Hello world!
```

<<<<<<< HEAD
````warn header="2回宣言すると、エラーが発生します"
変数は一度だけ宣言する必要があります。
=======
````warn header="Declaring twice triggers an error"
A variable should be declared only once.

A repeated declaration of the same variable is an error:

```js run
let message = "This";

// repeated 'let' leads to an error
let message = "That"; // SyntaxError: 'message' has already been declared
```
So, we should declare a variable once and then refer to it without `let`.
````

```smart header="Functional languages"
It's interesting to note that there exist so-called [pure functional](https://en.wikipedia.org/wiki/Purely_functional_programming) programming languages, such as [Haskell](https://en.wikipedia.org/wiki/Haskell), that forbid changing variable values.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

同じ変数の繰り替えし宣言はエラーになります:

<<<<<<< HEAD
```js run
let message = "This";

// 'let' の繰り返しはエラーになります
let message = "That"; // SyntaxError: 'message' has already been declared
=======
Though it may seem a little odd at first sight, these languages are quite capable of serious development. More than that, there are areas like parallel computations where this limitation confers certain benefits.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
そのため、変数は1度だけ宣言し、その後は `let` なしで参照する必要があります。
````

```smart header="関数型言語"
変数の値の変更を禁止する[関数型プログラミング言語](https://ja.wikipedia.org/wiki/関数型言語)と呼ばれる言語も存在することを知っておくと良いかもしれません。関数型言語の例として[Scala](http://www.scala-lang.org/) や[Erlang](http://www.erlang.org/)が挙げられます。

<<<<<<< HEAD
このような言語では、一度"箱の中"に格納された値は、永遠に変化することがありません。もし他の値を"箱の中"に格納したい場合、新たな箱を作る、すなわち新たな変数を宣言する必要があります。一度使った変数を再利用することはできません。

一見すると少し奇妙に見えるかもしれませんが、それらの言語は本格的な開発に適しています。それ以上に、並列計算のような分野ではこの制限が恩恵をもたらしさえします。このような言語を勉強することは視野を広げるために推奨されています(たとえすぐにそれを使う予定がなくても)。
```

## 変数のネーミング 

JavaScript変数名は2つの制限があります:

1. 名前は文字、数字、記号 `$` と `_` のみを含む必要があります。
2. 最初の文字は数字であってはいけません。

変数名の例:
=======
There are two limitations on variable names in JavaScript:

1. The name must contain only letters, digits, or the symbols `$` and `_`.
2. The first character must not be a digit.

Examples of valid names:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let userName;
let test123;
```

<<<<<<< HEAD
名前に複数の単語を含む場合、[camelCase](https://en.wikipedia.org/wiki/CamelCase) が一般的に使われます。 つまり、単語が続々と続き、各単語は大文字で始まります: `myVeryLongName`.
=======
When the name contains multiple words, [camelCase](https://en.wikipedia.org/wiki/CamelCase) is commonly used. That is: words go one after another, each word except first starting with a capital letter: `myVeryLongName`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

興味深いことに -- ドル `'$'` や アンダースコア `'_'` も名前に使うことができます。それらは単に文字のように特別な意味をもたない普通の記号です。

これらは有効な名前です:

```js run untrusted
let $ = 1; // 名前 "$" の変数を宣言
let _ = 2; // またここでは名前 "_" の変数です

alert($ + _); // 3
```

正しくない変数名の例です:

```js no-beautify
let 1a; // 数値から開始はできません

<<<<<<< HEAD
let my-name; // ハイフン '-' は名前で許可されていません
```

```smart header="大文字小文字の区別"
変数名 `apple` と `AppLE` -- は2つの異なる変数です。
```

````smart header="英語以外の文字も使用できますが、推奨されません。"
キリル文字や象牙文字を含め、どの言語を使うことも可能です。:
=======
let my-name; // hyphens '-' aren't allowed in the name
```

```smart header="Case matters"
Variables named `apple` and `APPLE` are two different variables.
```

````smart header="Non-Latin letters are allowed, but not recommended"
It is possible to use any language, including cyrillic letters, Chinese logograms and so on, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let имя = '...';
let 我 = '...';
```

<<<<<<< HEAD
技術的には、ここでエラーは起きず、このような名前も許可されます。しかし変数名では英語を使うのが国際的な伝統です。たとえ小さなスクリプトを書いているとしても、そのコードはこの先も残るかもしれません。他の国の人々がそれを見ることがあるかもしれません。
````

````warn header="予約された名前"
[予約語の一覧](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords)があります。これらは言語自身によって使用されるため、変数名として使用することはできません。

たとえば、単語 `let`, `class`, `return`, `function` は予約されています。
=======
Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People from other countries may need to read it some time.
````

````warn header="Reserved names"
There is a [list of reserved words](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), which cannot be used as variable names because they are used by the language itself.

For example: `let`, `class`, `return`, and `function` are reserved.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

下のコードは構文エラーです:

```js run no-beautify
let let = 5; // "let" という変数名にはできません、エラーです!
let return = 5; // 同様に "return" という名前もエラーです!
```
````

````warn header="`use strict` なしでの代入"

<<<<<<< HEAD
通常、変数を使う前に定義する必要があります。しかし、以前は `let` なしで、単に値を代入するだけで変数を作成することが技術的に可能でした。`use strict` でない場合には今でも動作します。この動作は古いスクリプトの互換性のために維持されています。
=======
Normally, we need to define a variable before using it. But in the old times, it was technically possible to create a variable by a mere assignment of the value without using `let`. This still works now if we don't put `use strict` in our scripts to maintain compatibility with old scripts.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run no-strict
// 注意: この例は "use strict" なしモードです

<<<<<<< HEAD
num = 5; // 存在しなかった場合、変数 "num" が作られます
=======
num = 5; // the variable "num" is created if it didn't exist
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

alert(num); // 5
```

<<<<<<< HEAD
これは悪い習慣です、strict モードではエラーになります:
=======
This is a bad practice and would cause an error in strict mode:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
"use strict";

*!*
num = 5; // エラー: num が未定義です
*/!*
```
````

## 定数 

<<<<<<< HEAD
定数を宣言するためには、 `let` の代わりに `const` を使います。
=======
To declare a constant (unchanging) variable, use `const` instead of `let`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
const myBirthday = '18.04.1982';
```

<<<<<<< HEAD
`const` を使って宣言された変数は "定数" と呼ばれます。それらは変更することが出来ません。変更しようとするとエラーになります:
=======
Variables declared using `const` are called "constants". They cannot be reassigned. An attempt to do so would cause an error:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // エラー, 定数の再代入はできません!
```

<<<<<<< HEAD
プログラマがその変数は決して変更されるべきでないと確信するとき、それを保証しつつみんなにその事実を明示的に示すために `const` を使います。

=======
When a programmer is sure that a variable will never change, they can declare it with `const` to guarantee and clearly communicate that fact to everyone.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

### 大文字の定数 

実行する前に分かっているが、覚えるのが難しいという値に対しては、エイリアスとして定数を使うという慣習は広く行われています。

このような定数は大文字とアンダースコアを使って名前がつけられます。

<<<<<<< HEAD
例えば、いわゆる "web"(16進数) 形式での色の定数を作りましょう:
=======
For instance, let's make constants for colors in so-called "web" (hexadecimal) format:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...色を使う必要がある場合、次のようにします
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

メリット:

<<<<<<< HEAD
- `COLOR_ORANGE` は `"#FF7F00"` よりも覚えるのが遥かに簡単です。
- `COLOR_ORANGE` よりも `"#FF7F00"` のほうがタイプミスをし易いです。
- コードを読むとき、`#FF7F00` よりも `COLOR_ORANGE` のほうがより意味があります。

いつ定数に大文字を使うべきなのか、いつ通常の名前をつけるべきなのかを明らかにしましょう。

"定数" であることは、その値は決して変わらないことを意味します。が、実行する前に知られている定数(赤の16進数のような)と、実行中にランタイムで *計算* されますが、代入後は変更されないものがあります。

たとえば:
=======
- `COLOR_ORANGE` is much easier to remember than `"#FF7F00"`.
- It is much easier to mistype `"#FF7F00"` than `COLOR_ORANGE`.
- When reading the code, `COLOR_ORANGE` is much more meaningful than `#FF7F00`.

When should we use capitals for a constant and when should we name it normally? Let's make that clear.

Being a "constant" just means that a variable's value never changes. But there are constants that are known prior to execution (like a hexadecimal value for red) and there are constants that are *calculated* in run-time, during the execution, but do not change after their initial assignment.

For instance:

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
const pageLoadTime = /* webページの読み込み時間 */;
```

<<<<<<< HEAD
`pageLoadTime` の値はページロードする前にはわからないので、通常の名前がつけられます。しかし代入後は変更されないのでこれも定数です。

つまり、大文字の名前の定数は "ハードコードされた" 値のエイリアスとしてのみ使います。
=======
The value of `pageLoadTime` is not known prior to the page load, so it's named normally. But it's still a constant because it doesn't change after assignment.

In other words, capital-named constants are only used as aliases for "hard-coded" values.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 正しい名前をつける 

変数について話すとき、もう1つ極めて重要な事があります。

<<<<<<< HEAD
変数は分かりやすい名前にしてください。必要に応じて考えましょう。

変数のネーミングは、プログラミングにおいて、もっとも重要で複雑なスキルの1つです。変数名をちょっと見れば、どのコードが初心者で書かれ、どれが経験豊富な開発者によって書かれたものかがわかります。

実際のプロジェクトでは、スクラッチで完全に分離された何かを書くよりも、既存のコードベースの修正や拡張に最も時間を費やします。そして、何か他のことをした後にコードに戻ったとき、よくラベル付けされた情報を探すのははるかに簡単です。それは言い換えると、適切な名前がついている変数、です。

変数を宣言する前に正しい名前について考えるようにしてください。それは多くのことに報いるでしょう。
=======
A variable name should have a clean, obvious meaning, describing the data that it stores.

Variable naming is one of the most important and complex skills in programming. A quick glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it's much easier to find information that is well-labeled. Or, in other words, when the variables have good names.

Please spend time thinking about the right name for a variable before declaring it. Doing so will repay you handsomely.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

いくつかの良いルールです:

<<<<<<< HEAD
- `userName` または `shoppingCart` のように人間が読みやすい名前を使ってください。
- 本当に何をしているか分かっている場合を除き、 `a`, `b`, `c` のような略語や短い名前は避けてください。
- 最大限説明的、かつ簡潔な名前を作ってください。悪い名前の例としては `data` や `value` です。このような名前からは何も分かりません。コンテキストからデータや値が意味することが例外的に明白な場合のみ使ってもOKです。
- あなたのチームの中で、またあなた自身の心の中で用語を統一してください。もしあるサイト訪問者が "ユーザ" と呼ばれる場合、関連する変数として `currentVisitor` や `newManInTown` ではなく `currentUser` や `newUser` のように命名するべきです。

簡単に聞こえますか？ 確かにそうですが、実際には良い説明的で簡潔な名前を作ることは簡単ではありません。頑張りましょう。

```smart header="再利用 or 作成?"
そして最後のメモです。新しい変数を宣言する代わりに、既存の変数を再利用する傾向のある怠けたプログラマが中にはいます。

その結果、変数はステッカーの変更なしに異なったものを投げ入れる箱になります。今何が入っているでしょうか？誰が知っているでしょうか...? より細かくチェックが必要になります。

このようなプログラマは変数定義では多少節約しますが、デバッグで10倍以上の時間を失います。
=======
- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, `c`, unless you really know what you're doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It's only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your own mind. If a site visitor is called a "user" then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.

Sounds simple? Indeed it is, but creating descriptive and concise variable names in practice is not. Go for it.

```smart header="Reuse or create?"
And the last note. There are some lazy programmers who, instead of declaring new variables, tend to reuse existing ones.

As a result, their variables are like boxes into which people throw different things without changing their stickers. What's inside the box now? Who knows? We need to come closer and check.

Such programmers save a little bit on variable declaration but lose ten times more on debugging.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

余分な変数は良く、悪ではないです。

<<<<<<< HEAD
モダンなJavaScriptは minify したり、ブラウザは十分にコードを最適化します。なので、パフォーマンスの問題になることはありません。異なる値に対して異なる変数を使うことは、エンジンの最適化を助けることもあります。
=======
Modern JavaScript minifiers and browsers optimize code well enough, so it won't create performance issues. Using different variables for different values can even help the engine optimize your code.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## サマリ 

<<<<<<< HEAD
データを格納するために変数を宣言することができます。それは `var`, `let`, または `const` を使うことでできます。

- `let` -- は現代の変数宣言です。Chrome(V8)では、`let` を使うには、そのコードは strict モードである必要があります。
- `var` -- は伝統的なスタイルの変数宣言です。一般的には使いませんが、必要なときのために、チャプター <info:var> で `let` との微妙な違いを説明します。
- `const` --　は `let` のようですが、変数の値は変更することができません。

変数は、内部のことを簡単に理解できるように命名するべきです。
=======
We can declare variables to store data by using the `var`, `let`, or `const` keywords.

- `let` -- is a modern variable declaration.
- `var` -- is an old-school variable declaration. Normally we don't use it at all, but we'll cover subtle differences from `let` in the chapter <info:var>, just in case you need them.
- `const` -- is like `let`, but the value of the variable can't be changed.

Variables should be named in a way that allows us to easily understand what's inside them.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
