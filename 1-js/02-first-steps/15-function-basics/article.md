<<<<<<< HEAD
# 関数

スクリプトの色々な場所で同じアクションを実行する必要がある場合がよくあります。

例えば、訪問者がログイン/ログアウトしたり、また複数の箇所で見栄の良いメッセージを表示する必要があったりします。

関数はプログラムのメインの "構成要素" です。これによりコードを繰り返すことなく何度も呼び出すことができます。

私たちは既に組み込み関数の例を見ています。 `alert(message)`, `prompt(message, default)` や `confirm(question)`です。これと同じように私たち自身も関数を作ることができます。

## 関数定義 

関数を作るために、*関数定義* を使います。

次のようになります:
=======
# Functions

Quite often we need to perform a similar action in many places of the script.

For example, we need to show a nice-looking message when a visitor logs in, logs out and maybe somewhere else.

Functions are the main "building blocks" of the program. They allow the code to be called many times without repetition.

We've already seen examples of built-in functions, like `alert(message)`, `prompt(message, default)` and `confirm(question)`. But we can create functions of our own as well.

## Function Declaration

To create a function we can use a *function declaration*.

It looks like this:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

<<<<<<< HEAD
`function` キーワードが最初にきて、次に *関数名* がきます、そして括弧の中に *パラメータ* のリスト(カンマ区切り、上の例では空)がきて、最後に中括弧の間に関数のコード、 "関数本体" です。

```js
function name(parameters) {
  ...body...
}
```

作成した関数はその関数名で呼び出すことができます: `showMessage()`

例:
=======
The `function` keyword goes first, then goes the *name of the function*, then a list of *parameters* between the parentheses (comma-separated, empty in the example above, we'll see examples later) and finally the code of the function, also named "the function body", between curly braces.

```js
function name(parameter1, parameter2, ... parameterN) {
 // body
}
```

Our new function can be called by its name: `showMessage()`.

For instance:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
function showMessage() {
  alert( 'Hello everyone!' );
}

*!*
showMessage();
showMessage();
*/!*
```

<<<<<<< HEAD
`showMessage()` の呼び出しは、関数のコードを実行します。この例では、2度メッセージが表示されます。

この例は関数のメインの目的の1つを明確に示しています: コードの複製を回避する、と言うことです。

もしメッセージ内容、または表示方法を変更する必要がある場合、1箇所のコード(関数)を修正するだけで十分です。

## ローカル変数 

関数内で定義された変数は、関数内でのみ参照可能です。

例:
=======
The call `showMessage()` executes the code of the function. Here we will see the message two times.

This example clearly demonstrates one of the main purposes of functions: to avoid code duplication.

If we ever need to change the message or the way it is shown, it's enough to modify the code in one place: the function which outputs it.

## Local variables

A variable declared inside a function is only visible inside that function.

For example:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
function showMessage() {
*!*
<<<<<<< HEAD
  let message = "Hello, I'm JavaScript!"; // ローカル変数
=======
  let message = "Hello, I'm JavaScript!"; // local variable
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
*/!*

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

<<<<<<< HEAD
alert( message ); // <-- エラー! 変数は関数のローカルです
```

## 外部変数 

関数は外部変数にアクセスすることもできます。次の例を見てください:
=======
alert( message ); // <-- Error! The variable is local to the function
```

## Outer variables

A function can access an outer variable as well, for example:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, John
```

<<<<<<< HEAD
関数は外部変数に対してフルアクセス権を持ち、変更することもできます。

例:
=======
The function has full access to the outer variable. It can modify it as well.

For instance:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let *!*userName*/!* = 'John';

function showMessage() {
<<<<<<< HEAD
  *!*userName*/!* = "Bob"; // (1) 外部変数の変更
=======
  *!*userName*/!* = "Bob"; // (1) changed the outer variable
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

<<<<<<< HEAD
alert( userName ); // 関数呼び出しの前は *!*John*/!* 

showMessage();

alert( userName ); // *!*Bob*/!*, 関数によって値が変更されました
```

外部の変数は、同じ名前のローカル変数が存在しない場合にのみ使われます。そのため、`let` を忘れた場合、意図せず外部の変数を変更してしまう可能性があります。

同じ名前の変数が関数内に宣言されている場合は、外部変数を *隠します*。例えば、以下のコードでは関数はローカルの `userName` を使います。外部の `userName` は無視されます。
=======
alert( userName ); // *!*John*/!* before the function call

showMessage();

alert( userName ); // *!*Bob*/!*, the value was modified by the function
```

The outer variable is only used if there's no local one.

If a same-named variable is declared inside the function then it *shadows* the outer one. For instance, in the code below the function uses the local `userName`. The outer one is ignored:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let userName = 'John';

function showMessage() {
*!*
<<<<<<< HEAD
  let userName = "Bob"; // ローカル変数の宣言
=======
  let userName = "Bob"; // declare a local variable
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

<<<<<<< HEAD
// 関数は作られ独自の userName を使います
showMessage();

alert( userName ); // *!*John*/!*, 変更されていません。関数は外部変数へアクセスしませんでした
```

```smart header="グローバル変数"
上のコードにおいて、外部の `userName` のような、関数の外で宣言されている変数は *グローバル* と呼ばれます。

グローバル変数はどの関数からも見えます(ローカル変数により隠れていなければ)。

通常、関数は自身のタスクに必要なすべての変数を宣言します。また、グローバル変数にはプロジェクトレベルのデータのみを保持するため、どこからでも見える事が重要です。現代のコードはほとんどもしくは全くグローバル変数を持ちません。ほぼすべての変数は関数に属します。
```

## パラメータ 

パラメータを使うことで、任意のデータを関数に渡すことができます。

下の例では、関数は2つのパラメータを持っています:  `from` と `text` です。

```js run
function showMessage(*!*from, text*/!*) { // 引数: from, text
  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)
*/!*
```

行 `(*)` と `(**)` で関数が呼ばれたとき、与えられた値はローカル変数 `from` と `text` にコピーされます。そして関数はそれらを使います。

ここにもう1つ例があります: 私たちは変数 `from` を持っており、それを関数に渡します。注意してください：関数は常に値のコピーを取得するため、関数の中の処理は `from` を変更していますが、その変更は外には見えません:

=======
// the function will create and use its own userName
showMessage();

alert( userName ); // *!*John*/!*, unchanged, the function did not access the outer variable
```

```smart header="Global variables"
Variables declared outside of any function, such as the outer `userName` in the code above, are called *global*.

Global variables are visible from any function (unless shadowed by locals).

It's a good practice to minimize the use of global variables. Modern code has few or no globals. Most variables reside in their functions. Sometimes though, they can be useful to store project-level data.
```

## Parameters

We can pass arbitrary data to functions using parameters.

In the example below, the function has two parameters: `from` and `text`.

```js run
function showMessage(*!*from, text*/!*) { // parameters: from, text
  alert(from + ': ' + text);
}

*!*showMessage('Ann', 'Hello!');*/!* // Ann: Hello! (*)
*!*showMessage('Ann', "What's up?");*/!* // Ann: What's up? (**)
```

When the function is called in lines `(*)` and `(**)`, the given values are copied to local variables `from` and `text`. Then the function uses them.

Here's one more example: we have a variable `from` and pass it to the function. Please note: the function changes `from`, but the change is not seen outside, because a function always gets a copy of the value:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
function showMessage(from, text) {

*!*
<<<<<<< HEAD
  from = '*' + from + '*'; // "from" をより良く見せる
=======
  from = '*' + from + '*'; // make "from" look nicer
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

<<<<<<< HEAD
// "from" の値は同じで、関数はローカルコピーを変更しています。
alert( from ); // Ann
```

関数のパラメータとして渡された値は "引数（ひきすう）" とも呼ばれます。
これらの用語を整理すると:

- パラメータとは、関数の宣言時に括弧内に記述される変数のこと(宣言時の用語)
- 引数とは、関数が呼び出されたときに渡される値のこと(呼び出し時の用語)

パラメータを列挙して関数を宣言し、引数を渡して関数を呼び出すことになります。

上の例ではこのように言えるでしょう。「関数showMessageは2つのパラメータを持つと宣言されており、from と "Hello" という2つの引数を与えて呼び出されている」 

## デフォルト値 

関数の呼び出し時に引数が与えられていない場合、対応する値は `undefined` になります。

例えば、前述の関数 `showMessage(from, text)` は1つの引数で呼ぶことも出来ます:
=======
// the value of "from" is the same, the function modified a local copy
alert( from ); // Ann
```

When a value is passed as a function parameter, it's also called an *argument*.

In other words, to put these terms straight:

- A parameter is the variable listed inside the parentheses in the function declaration (it's a declaration time term).
- An argument is the value that is passed to the function when it is called (it's a call time term).

We declare functions listing their parameters, then call them passing arguments.

In the example above, one might say: "the function `showMessage` is declared with two parameters, then called with two arguments: `from` and `"Hello"`".


## Default values

If a function is called, but an argument is not provided, then the corresponding value becomes `undefined`.

For instance, the aforementioned function `showMessage(from, text)` can be called with a single argument:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
showMessage("Ann");
```

<<<<<<< HEAD
それはエラーではありません。このような呼び出しは `"*Ann*: undefined"` を出力します。`text` が渡されていないため、`text` は `undefined` となります。

パラメータのいわゆる "デフォルト" (呼び出し時に省略された場合に使用される)値を、関数宣言の中で `=` を使用して指定することが可能です:
=======
That's not an error. Such a call would output `"*Ann*: undefined"`. As the value for `text` isn't passed, it becomes `undefined`.

We can specify the so-called "default" (to use if omitted) value for a parameter in the function declaration, using `=`:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

<<<<<<< HEAD
これで `text` パラメータが渡されていない場合、 値は `"no text given"` になります。

ここで、 `"no text given"` は文字列ですが、より複雑な式にすることもできます。そしてそれはパラメータが無い場合にのみ評価され、代入されます。なので、このようなことも可能です:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() はテキストが与えられなかった場合にのみ実行されます
  // その結果がtextの値になります
}
```

```smart header="デフォルト値の評価"
JavaScriptでは、デフォルト値はそれぞれのパラメータが与えられずに関数が呼び出されるたびに評価されます。

上の例だと `anotherFunction()` は、 `text` のパラメータが与えられずに `showMessage()` が呼び出されるたびに実行されます。
```

### 代替のデフォルトパラメータ

パラメータのデフォルト値を関数宣言ではなく、後の段階で実行中に設定することが理にかなっている場合があります。

省略されたパラメータをチェックするために、`undefined` と比較できます:

```js run
function showMessage(text) {
*!*
  if (text === undefined) {
=======
Now if the `text` parameter is not passed, it will get the value `"no text given"`.

The default value also jumps in if the parameter exists, but strictly equals `undefined`, like this:

```js
showMessage("Ann", undefined); // Ann: no text given
```

Here `"no text given"` is a string, but it can be a more complex expression, which is only evaluated and assigned if the parameter is missing. So, this is also possible:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() only executed if no text given
  // its result becomes the value of text
}
```

```smart header="Evaluation of default parameters"
In JavaScript, a default parameter is evaluated every time the function is called without the respective parameter.

In the example above, `anotherFunction()` isn't called at all, if the `text` parameter is provided.

On the other hand, it's independently called every time when `text` is missing.
```

````smart header="Default parameters in old JavaScript code"
Several years ago, JavaScript didn't support the syntax for default parameters. So people used other ways to specify them.

Nowadays, we can come across them in old scripts.

For example, an explicit check for `undefined`:

```js
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'no text given';
  }
*/!*

  alert( from + ": " + text );
}
```

...Or using the `||` operator:

```js
function showMessage(from, text) {
  // If the value of text is falsy, assign the default value
  // this assumes that text == "" is the same as no text at all
  text = text || 'no text given';
  ...
}
```
````


### Alternative default parameters

Sometimes it makes sense to assign default values for parameters at a later stage after the function declaration.

We can check if the parameter is passed during the function execution, by comparing it with `undefined`:

```js run
function showMessage(text) {
  // ...

*!*
  if (text === undefined) { // if the parameter is missing
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
    text = 'empty message';
  }
*/!*

  alert(text);
}

showMessage(); // empty message
```

<<<<<<< HEAD
...もしくは `||` 演算子:

```js
// パラメータが省略 or  "" の場合, 'empty' を設定
function showMessage(text) {
=======
...Or we could use the `||` operator:

```js
function showMessage(text) {
  // if text is undefined or otherwise falsy, set it to 'empty'
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
  text = text || 'empty';
  ...
}
```

<<<<<<< HEAD
モダンな JavaScript エンジンは [NULL合体演算子](info:nullish-coalescing-operator) `??` をサポートしており、`0` などの偽値を通常とみなす場合に適しています:

```js run
// count パラメータがない場合は "unknown"
function showCount(count) {
=======
Modern JavaScript engines support the [nullish coalescing operator](info:nullish-coalescing-operator) `??`, it's better when most falsy values, such as `0`, should be considered "normal":

```js run
function showCount(count) {
  // if count is undefined or null, show "unknown"
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

<<<<<<< HEAD
## 値の返却 

関数は、実行結果として呼び出しコードに値を戻すことが出来ます。

最もシンプルな例は2つの値の合計を行う関数です:
=======
## Returning a value

A function can return a value back into the calling code as the result.

The simplest example would be a function that sums two values:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

<<<<<<< HEAD
ディレクティブ `return` は関数の任意の場所に置くことが出来ます。もしも実行がそこに到達したとき、関数は停止し、値を呼び出し元のコードに返します(上の `result` へ代入します)。

1つの関数に多くの `return` が出現することもあります。例えば:

```js run
function checkAge(age) {
  if (age > 18) {
=======
The directive `return` can be in any place of the function. When the execution reaches it, the function stops, and the value is returned to the calling code (assigned to `result` above).

There may be many occurrences of `return` in a single function. For instance:

```js run
function checkAge(age) {
  if (age >= 18) {
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
*!*
    return true;
*/!*
  } else {
*!*
<<<<<<< HEAD
    return confirm('Got a permission from the parents?');
=======
    return confirm('Do you have permission from your parents?');
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
*/!*
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

<<<<<<< HEAD
値なしで `return` を使うことも出来ます。これは関数を直ぐに終了させます。

例:
=======
It is possible to use `return` without a value. That causes the function to exit immediately.

For example:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}
```

<<<<<<< HEAD
上のコードでは、`checkAge(age)` が `false` を返すと、`showMovie` は `alert` の処理をしません。

````smart header="空の `return`、 または返却がないものは `undefined` を返します"
関数が値を返却しない場合、それは `undefined` を返却した場合と同じになります。:
=======
In the code above, if `checkAge(age)` returns `false`, then `showMovie` won't proceed to the `alert`.

````smart header="A function with an empty `return` or without it returns `undefined`"
If a function does not return a value, it is the same as if it returns `undefined`:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
function doNothing() { /* empty */ }

alert( doNothing() === undefined ); // true
```

<<<<<<< HEAD
空の `return` もまた `return undefined` と同じです:
=======
An empty `return` is also the same as `return undefined`:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

<<<<<<< HEAD
````warn header="`return`と値の間に改行を入れないでください"
`return` が長い式の場合、このように別の行に書くのが魅力的に見えるかもしれません:
=======
````warn header="Never add a newline between `return` and the value"
For a long expression in `return`, it might be tempting to put it on a separate line, like this:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
<<<<<<< HEAD
JavaScriptは `return` の後にセミコロンを想定するため、これは動作しません。これは次と同じように動作します:
=======
That doesn't work, because JavaScript assumes a semicolon after `return`. That'll work the same as:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

<<<<<<< HEAD
従って、これは事実上空の返却になります。なので、値は同じ行に置く必要があります。

もし複数行にまたがった式を返却したい場合は、`return` と同じ行から開始する必要があります。あるいは、少なくとも次のように開始括弧を置きます:
=======
So, it effectively becomes an empty return.

If we want the returned expression to wrap across multiple lines, we should start it at the same line as `return`. Or at least put the opening parentheses there as follows:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
<<<<<<< HEAD
これは期待する通りに動作するでしょう。
````

## 関数の命名 

関数はアクションです。そのため、それらの名前は通常は動詞です。それは簡潔にすべきですが、関数がすることをできるだけ正確に表現してください。そして、コードを読む人が正しい手がかりを得られるようにします。

曖昧なアクションを示す動詞のプレフィックスから関数名を始めることは広く行われています。プレフィックスの意味についてはチーム内での合意が必要です。

例えば、`"show"` で始まる関数は、通常何かを表示します。

以下で始まる関数...

- `"get…"` -- 値を返します,
- `"calc…"` -- 何かを計算します,
- `"create…"` -- 何かを生成します,
- `"check…"` -- 何かをチェックし、真偽値を返します, etc

このような名前の例です:

```js no-beautify
showMessage(..)     // メッセージを表示します
getAge(..)          // 年齢を返します(なんとかしてその値を得る)
calcSum(..)         // 合計を計算し、それを返します
createForm(..)      // フォームを生成します(通常それを返却します)
checkPermission(..) // 権限をチェックし、true/false を返します
```

決まった位置にプレフィックスを使用すると、関数名を見ただけでそれがどのような種類の処理を行い、どのような値を返すのかを理解することが出来ます。

```smart header="1つの関数 -- 1つのアクション"
関数はその名前により提案されたことを正確にするべきです。

通常、2つの独立したアクションは、たとえそれらが一緒に呼ばれるとしても、2つの関数にするのが良いです(その場合は、通常その2つを呼ぶ3つ目の関数を作ります)。

このルールを破るいくつかの例です:

- `getAge` -- 年齢を取得するとともに `警告` を表示します(取得のみをするべきです)
- `createForm` -- フォームを作成して、ドキュメントに追加します(作成とその返却だけにするべきです)
- `checkPermission` -- `アクセス許可/拒否` のメッセージを表示するのは良くありません(チェックを実行し、その結果を返すのみにすべきです)

これらの例はプレフィックスの共通の意味を前提としています。これらが意味することは、あなたとあなたのチームで前提を決めるということです。恐らく、コードが異なる振る舞いをするのは普通なことです。しかし、プレフィックスが意味すること、プレフィックスの付いた関数ができること、できないことについてはしっかりとした理解をもっておくべきです。同じプレフィックスの関数はルールに従うべきです。そして、チームはそれを共有するべきです。
```

```smart header="究極的に短い関数名"
*非常に頻繁に* 使われる関数は、究極的に短い名前を持っていることがあります。

例えば、[jQuery](http://jquery.com) フレームワークは関数 `$` を定義しています。[LoDash](http://lodash.com/) ライブラリは、そのコアな関数として `_` を持っています。

それらは例外です。一般的に関数名は簡潔で説明的でなければなりません。
```

## 関数 == コメント 

関数は短く明確に1つのことを行うべきです。もし関数が大きい場合、恐らくそれを幾つかの小さい関数に分けることは価値があるでしょう。このルールに従うことは簡単ではないこともありますが、間違いなく良いことです。

分割した関数はテストやデバッグが簡単になるだけでなく、 -- その存在自体が素晴らしいコメントになります!

例えば、下にある2つの関数 `showPrimes(n)`を比べてみましょう。どちらも[素数](https://en.wikipedia.org/wiki/Prime_number)を `n` に達するまで出力します。

1つ目のパターンはラベルを使います:
=======
And it will work just as we expect it to.
````

## Naming a function [#function-naming]

Functions are actions. So their name is usually a verb. It should be brief, as accurate as possible and describe what the function does, so that someone reading the code gets an indication of what the function does.

It is a widespread practice to start a function with a verbal prefix which vaguely describes the action. There must be an agreement within the team on the meaning of the prefixes.

For instance, functions that start with `"show"` usually show something.

Function starting with...

- `"get…"` -- return a value,
- `"calc…"` -- calculate something,
- `"create…"` -- create something,
- `"check…"` -- check something and return a boolean, etc.

Examples of such names:

```js no-beautify
showMessage(..)     // shows a message
getAge(..)          // returns the age (gets it somehow)
calcSum(..)         // calculates a sum and returns the result
createForm(..)      // creates a form (and usually returns it)
checkPermission(..) // checks a permission, returns true/false
```

With prefixes in place, a glance at a function name gives an understanding what kind of work it does and what kind of value it returns.

```smart header="One function -- one action"
A function should do exactly what is suggested by its name, no more.

Two independent actions usually deserve two functions, even if they are usually called together (in that case we can make a 3rd function that calls those two).

A few examples of breaking this rule:

- `getAge` -- would be bad if it shows an `alert` with the age (should only get).
- `createForm` -- would be bad if it modifies the document, adding a form to it (should only create it and return).
- `checkPermission` -- would be bad if it displays the `access granted/denied` message (should only perform the check and return the result).

These examples assume common meanings of prefixes. You and your team are free to agree on other meanings, but usually they're not much different. In any case, you should have a firm understanding of what a prefix means, what a prefixed function can and cannot do. All same-prefixed functions should obey the rules. And the team should share the knowledge.
```

```smart header="Ultrashort function names"
Functions that are used *very often* sometimes have ultrashort names.

For example, the [jQuery](https://jquery.com/) framework defines a function with `$`. The [Lodash](https://lodash.com/) library has its core function named `_`.

These are exceptions. Generally function names should be concise and descriptive.
```

## Functions == Comments

Functions should be short and do exactly one thing. If that thing is big, maybe it's worth it to split the function into a few smaller functions. Sometimes following this rule may not be that easy, but it's definitely a good thing.

A separate function is not only easier to test and debug -- its very existence is a great comment!

For instance, compare the two functions `showPrimes(n)` below. Each one outputs [prime numbers](https://en.wikipedia.org/wiki/Prime_number) up to `n`.

The first variant uses a label:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // a prime
  }
}
```

<<<<<<< HEAD
2つ目のパターンは、素数の確認をするための追加の関数 `isPrime(n)` を使います。
=======
The second variant uses an additional function `isPrime(n)` to test for primality:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

<<<<<<< HEAD
2つ目のパターンのほうが理解しやすいですね。コードの塊の代わりに、アクション(`isPrime`) の名前を見ます。このようなコードは *自己記述的* と呼ばれる場合があります。

従って、関数はその再利用を意図していない場合でも作ることがあります。それらはコードを構造化し、読みやすくします。

## サマリ 

関数はこのように定義します:
=======
The second variant is easier to understand, isn't it? Instead of the code piece we see a name of the action (`isPrime`). Sometimes people refer to such code as *self-describing*.

So, functions can be created even if we don't intend to reuse them. They structure the code and make it readable.

## Summary

A function declaration looks like this:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

<<<<<<< HEAD
- パラメータとして関数に渡される値は、ローカル変数にコピーされます。
- 関数は外部の変数にアクセスすることができます。しかし、それは内側からのみ機能します。関数の外側のコードは、関数のローカル変数を見ることはできません。
- 関数は値を返すことができます。もしもそれをしなかった場合、戻り値は `undefined` です。

コードを綺麗で理解しやすいようにするために、その関数内では外部変数ではなく、ローカル変数やパラメータを利用することを推奨します。

パラメータを取得せずに外部変数を変更する関数よりも、パラメータを取得してそれを処理して結果を返す関数の方が、常に理解しやすいものです。

関数名:

- 名前は、関数がすることを明確に記述するべきです。コードの中で関数呼び出しを見るとき、良い名前であればそれが何をして何を返すのかを簡単に理解することができます。
- 関数はアクションなので、関数名は通常動詞的です。
- `create…`, `show…`, `get…`, `check…` など、数多くのよく知られた関数のプレフィックスが存在します。関数がすることのヒントとしてそれらを使いましょう。

関数はスクリプトの主な構成要素です。今や私たちは基礎をカバーしたので、実際にそれらを作り使い始めることができます。しかし、それはまだほんの始まりに過ぎません。私たちは何度もそれらに戻り、より高度な機能について深めていきます。
=======
- Values passed to a function as parameters are copied to its local variables.
- A function may access outer variables. But it works only from inside out. The code outside of the function doesn't see its local variables.
- A function can return a value. If it doesn't, then its result is `undefined`.

To make the code clean and easy to understand, it's recommended to use mainly local variables and parameters in the function, not outer variables.

It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side effect.

Function naming:

- A name should clearly describe what the function does. When we see a function call in the code, a good name instantly gives us an understanding what it does and returns.
- A function is an action, so function names are usually verbal.
- There exist many well-known function prefixes like `create…`, `show…`, `get…`, `check…` and so on. Use them to hint what a function does.

Functions are the main building blocks of scripts. Now we've covered the basics, so we actually can start creating and using them. But that's only the beginning of the path. We are going to return to them many times, going more deeply into their advanced features.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
