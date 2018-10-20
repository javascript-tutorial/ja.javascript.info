#  条件演算子: if, '?'

時には、条件に基づき異なるアクションを実行する必要があります。

そのための `if` 文と、簡単にするための "疑問符" 演算子 `"?"` と呼ばれる条件付き評価のための条件付き(3項)演算子があります。

[cut]

## "if" 文 

"if" 文は与えられた条件を評価します。結果が `true` であればコードを実行します。

例:

```js run
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

*!*
if (year == 2015) alert( 'You are right!' );
*/!*
```

上の例では、条件はシンプルな等価チェックです: `year == 2015`。より複雑にすることもできます。

実行する文が複数ある場合、コードブロックを波括弧で囲む必要があります。:

```js
if (year == 2015) {
  alert( "That's correct!" );
  alert( "You're so smart!" );
}
```

たとえ1つの文しかない場合でも `if` を使用するときは波括弧でコードブロックを囲むことを推奨します。これは可読性を向上させます。

## Boolean 変換 

`if (…)` 文は括弧の中の式を評価し、Boolean型に変換します。

チャプター <info:type-conversions> の変換ルールを思い出してみましょう:

- 数値 `0`, 空文字 `""`, `null`, `undefined` そして `NaN` は `false` になります。そのため、これらは "偽とみなされる" 値とよばれています。
- 他の値は `true` になるため、"真とみなされる" 値と呼ばれます。

さて、下のコードですがこの条件は決して実行されません:

```js
if (0) { // 0 は偽
  ...
}
```

...また、この条件は -- 常に処理されます:

```js
if (1) { // 1 は真
  ...
}
```

次のように事前評価されたBool値を `if` に通すこともできます:

```js
let cond = (year == 2015); // == は true または false を評価する

if (cond) {
  ...
}
```

## "else" 句 

`if` 文は任意の "else" ブロックを持っているかもしれません。それは条件が間違っている場合に実行します。

例:
```js run
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

if (year == 2015) {
  alert( 'You guessed it right!' );
} else {
  alert( 'How can you be so wrong?' ); // 2015 以外のケース
}
```

## いくつかの条件: "else if" 

私たちはいくつかの条件のパターンをテストしたい時があります。そのために `else if` 句があります。

例:

```js run
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

if (year < 2015) {
  alert( 'Too early...' );
} else if (year > 2015) {
  alert( 'Too late' );
} else {
  alert( 'Exactly!' );
}
```

上のコードで、JavaScriptは最初に `year < 2015` をチェックします。もしもそれが偽の場合、次の条件 `year > 2015` に行きます。それでもない場合は、最後の `alert` を表示します。

多くの `else if` ブロックを持つことができます。最後の `else` は任意です。

## 3項演算子 '?' 

条件に依存して変数に代入する必要がある場合があります。

例:

```js run no-beautify
let accessAllowed;
let age = prompt('How old are you?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

いわゆる、"3項" もしくは "疑問符" 演算子は、より短く簡単に行うことができます。

演算子は疑問符 `"?"` で表されます。公式な用語 "3項" は演算子は3つのオペランドを持つことを意味します。

構文は次の通りです:
```js
let result = condition ? value1 : value2
```

`condition` は評価され、もしも真であれば、`value1` が返却され、そうでなければ -- `value2` になります。

例:

```js
let accessAllowed = (age > 18) ? true : false;
```

技術的には、私たちは `age > 18` の周りの括弧を省くことができます。疑問符演算子は低い優先順位を持っているので、比較 `>` の後に実行されます。そのためそれらは同じように動作します:

```js
// 比較演算子 "age > 18" が最初に実行されます
// (丸括弧で囲む必要はありません)
let accessAllowed = age > 18 ? true : false;
```

...しかし、括弧はコードの可読性をより良くします。そのため、括弧を使うことが推奨されます。

````smart
上の例では、比較自体が `true/false` を返すため、疑問符演算子を回避することが可能です。

```js
// the same
let accessAllowed = age > 18;
```
````

## 複数の '?' 

連続する疑問符 `"?"` 演算子は1つ以上の条件に依存した値を返すことができます。

例:
```js run
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```

最初、それが何をしているのか掴むのが難しいかもしれません。しかしよく見るとそれがただの通常の一連のテストであることがわかります。

1. 最初の疑問符は `age < 3` かどうかチェックします。
2. もしも真の場合 -- `'Hi, baby!'` を返します。そうでなければ -- コロン `":"` の後に行き、`age < 18` をチェックします。
3. もしもそれが真であれば -- `'Hello!'` を返します。そうでなければ -- コロン `":"` の後に行き、`age < 100` をチェックします。
4. もしもそれが真であれば -- `'Greetings!'` を返します。そうでなければ -- コロン `":"` の後に行き、`What an unusual age` を返します。

`if..else` を使った同じロジックです:

```js
if (age < 3) {
  message = 'Hi, baby!';
} else if (a < 18) {
  message = 'Hello!';
} else if (age < 100) {
  message = 'Greetings!';
} else {
  message = 'What an unusual age!';
}
```

## 非伝統的な '?' の使用 

時々、疑問符 `'?'` は `if` の置換として使われます:

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Right!') : alert('Wrong.');
*/!*
```

条件 `company == 'Netscape'` に応じて、`"?"` の後の1つ目もしくは2つ目の部分が実行されアラートが表示されます。

ここでは変数に結果を代入していません。この考えは、条件に応じて異なるコードを実行させるものです。

**このような方法で疑問符演算子を使うことは推奨されていません。**

表記は `if` よりも短いように見え、一部のプログラマには魅力的です。しかしそれは読みにくいです。

比較として `if` を使った同じコードです:

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Right!');
} else {
  alert('Wrong.');
}
*/!*
```

私たちの目はコードを縦にスキャンします。複数行にまたがる構造は、長い水平な命令セットよりも理解しやすいです。

疑問符 `'?'` の考え方は、条件によって別の値を返すことです。まさにそのために使ってください。
異なるコードの枝葉を実行するために `if` があります。
