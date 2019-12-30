# 関数

スクリプトの色々な場所で同じアクションを実行する必要がある場合がよくあります。

例えば、訪問者がログイン/ログアウトしたり、また複数の箇所で見栄の良いメッセージを表示する必要があったりします。

関数はプログラムのメインの "構成要素" です。これによりコードを繰り返すことなく何度も呼び出すことができます。

<<<<<<< HEAD
[cut]

私たちは既に組み込み関数の例を見ています。 `alert(message)`, `prompt(message, default)` や `confirm(question)`です。
同じように私たち自身も関数を作ることができます。
=======
We've already seen examples of built-in functions, like `alert(message)`, `prompt(message, default)` and `confirm(question)`. But we can create functions of our own as well.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

## 関数定義 

関数を作るために、*関数定義* を使います。

次のようになります:

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

<<<<<<< HEAD
`function` キーワードが最初にきて、次に *関数名* がきます、そして括弧の中に *パラメータ* のリストがきて(上の例では空白です)、最後に関数のコード、"関数本体" です。
=======
The `function` keyword goes first, then goes the *name of the function*, then a list of *parameters* between the parentheses (comma-separated, empty in the example above) and finally the code of the function, also named "the function body", between curly braces.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js
function name(parameters) {
  ...body...
}
```

作成した関数はその関数名で呼ぶことができます: `showMessage()`

例:

```js run
function showMessage() {
  alert( 'Hello everyone!' );
}

*!*
showMessage();
showMessage();
*/!*
```

`showMessage()` の呼び出しは、関数のコードを実行します。この例では、2度メッセージが表示されます。

<<<<<<< HEAD
この例は関数のメインの目的の1つを明確に示しています: コードの複製を回避する、と言うことです。
=======
This example clearly demonstrates one of the main purposes of functions: to avoid code duplication.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

もしメッセージ内容、または表示方法を変更する必要がある場合、1箇所のコード(関数)を修正するだけで十分です。

## ローカル変数 

関数内の変数定義は関数内でのみ見えます。

例:

```js run
function showMessage() {
*!*
  let message = "Hello, I'm JavaScript!"; // ローカル変数
*/!*

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- エラー! 変数は関数のローカルです
```

## 外部変数 

同様に、関数は外部変数にアクセスすることができます, 次の例を見てください:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, John
```

関数は外部変数に対してフルアクセス権を持ちます。それを変更することもできます。

例:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) 外部変数の変更

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // 関数呼び出しの前は *!*John*/!* 

showMessage();

alert( userName ); // *!*Bob*/!*, 関数によって値が変更されました
```

<<<<<<< HEAD
外部の変数は、ローカル変数が存在しない場合にのみ使われます。そのため、`let` を忘れた場合、意図せず外部の変数を変更してしまう可能性があります。
=======
The outer variable is only used if there's no local one.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

同じ名前の変数が関数内に宣言されている場合は、外部変数を *隠します*。例えば、以下のコードでは関数はローカルの `userName` を使います。外部の `userName` は無視されます。

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // ローカル変数の宣言
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

<<<<<<< HEAD
// 関数は作られ独自の userName を使います
=======
// the function will create and use its own userName
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
showMessage();

alert( userName ); // *!*John*/!*, 変更されていません。関数は外部変数へアクセスしませんでした
```

```smart header="グローバル変数"
上のコードにおいて、外部の `userName` のような、関数の外で宣言されている変数は *グローバル* と呼ばれます。

グローバル変数はどの関数からも見えます(ローカル変数により隠れていなければ)。

<<<<<<< HEAD
通常、関数は自身のタスクに必要なすべての変数を宣言します。また、グローバル変数にはプロジェクトレベルのデータのみを保持するため、どこからでも見える事が重要です。現代のコードはほとんどもしくは全くグローバル変数を持ちません。ほぼすべての変数はその関数の中にあります。
=======
It's a good practice to minimize the use of global variables. Modern code has few or no globals. Most variables reside in their functions. Sometimes though, they can be useful to store project-level data.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
```

## パラメータ 

パラメータを使うことで、任意のデータを関数に渡すことができます(*関数の引数* と呼ばれます)。

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

ここにもう1つ例があります: 私たちは変数 `from` を持っており、それを関数に渡します。注意してください：関数は常に値のコピーを取得するため、関数の中の処理は `from` を変更していますが、その変更は外には見えません。

```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // "from" をより良く見せる
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// "from" の値は同じで、関数はローカルコピーを変更しています。
alert( from ); // Ann
```

## デフォルト値 

パラメータが与えられていない場合、その値は `undefined` になります。

例えば、前述の関数 `showMessage(from, text)` は1つの引数で呼ぶことも出来ます:

```js
showMessage("Ann");
```

それはエラーではありません。このような呼び出しは `"Ann: undefined"` を出力します。`text` がないので、`text === undefined` とみなされます。

"デフォルト" の `text` を使いたい場合、`=` の後に指定することができます:

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

これで `text` パラメータが渡されていない場合、 値は `"no text given"` になります。

ここで、 `"no text given"` は文字列ですが、より複雑な式にすることもできます。そしてそれはパラメータが無い場合にのみ評価され、代入されます。なので、このようなことも可能です:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() はテキストが与えられなかった場合にのみ実行されます
  // その結果がtextの値になります
}
```

<<<<<<< HEAD
````smart header="デフォルト値の評価"

JavaScriptでは、デフォルト値はそれぞれのパラメータが与えられずに関数が呼び出されるたびに評価されます。上の例だと `anotherFunction()` は、 `text` のパラメータが与えられずに `showMessage()` が呼び出されるたびに実行されます。これはPythonのような他の言語と対照的で、Pythonはどんなデフォルト値も初期解釈のときに一度だけ評価されます。

````
=======
```smart header="Evaluation of default parameters"
In JavaScript, a default parameter is evaluated every time the function is called without the respective parameter.

In the example above, `anotherFunction()` is called every time `showMessage()` is called without the `text` parameter.
```
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

````smart header="デフォルトパラメータの古い形式"
javascriptの古いエディションは、デフォルトパラメータをサポートしていませんでした。そのため、別の方法で実現していました。これは古いスクリプトの中で見つけることができます。

例えば、`undefined` の明示的なチェック:

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

...もしくは `||` 演算子:

```js
function showMessage(from, text) {
  // text が偽の場合、text は "デフォルト" 値を取得します
  text = text || 'no text given';
  ...
}
```


````


## 値の返却 

関数は、実行結果として呼び出しコードに値を戻すことが出来ます。

最もシンプルな例は2つの値の合計を行う関数です:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

ディレクティブ `return` は関数の任意の場所に置くことが出来ます。もしも実行がそこに到達したとき、関数は停止し、値を呼び出し元のコードに返します(上の `result` へ代入します)。

1つの関数に多くの `return` が出現することもあります。例えば:

```js run
function checkAge(age) {
  if (age > 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Do you have permission from your parents?');
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

値なしで `return` を使うことも出来ます。これは関数を直ぐに終了させます。

例:

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

上のコードでは、`checkAge(age)` が `false` を返すと、`showMovie` は `alert` の処理をしません。

````smart header="空の `return`、 または返却がないものは `undefined` を返します"
関数が値を返却しない場合、それは `undefined` を返却した場合と同じになります。:

```js run
function doNothing() { /* empty */ }

alert( doNothing() === undefined ); // true
```

空の `return` もまた `return undefined` と同じです:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="`return`と値の間に改行を入れないでください"
`return` が長い式の場合、このように別の行に書くのが魅力的に見えるかもしれません:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
JavaScriptは `return` の後にセミコロンを想定するため、これは動作しません。これは次と同じように動作します:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```
<<<<<<< HEAD
従って、これは事実上空の返却になります。なので、値は同じ行に置く必要があります。
=======

So, it effectively becomes an empty return.

If we want the returned expression to wrap across multiple lines, we should start it at the same line as `return`. Or at least put the opening parentheses there as follows:

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
And it will work just as we expect it to.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
````

## 関数の命名 

<<<<<<< HEAD
関数はアクションです。そのため、それらの名前は通常は動詞です。それは簡潔にすべきですが、関数がすることをできるだけ正確に表現してください。そして、コードを読む人が正しい手がかりを得られるようにします。
=======
Functions are actions. So their name is usually a verb. It should be brief, as accurate as possible and describe what the function does, so that someone reading the code gets an indication of what the function does.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

曖昧なアクションを示す動詞のプレフィックスから関数名を始めることは広く行われています。
プレフィックスの意味についてはチーム内での合意が必要です。

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

<<<<<<< HEAD
- `getAge` -- 年齢を取得するとともに `警告` を表示します(取得のみをするべきです)
- `createForm` -- フォームを作成して、ドキュメントに追加します(作成とその返却だけにするべきです)
- `checkPermission` -- `アクセス許可/拒否` のメッセージを表示するのは良くありません(チェックを実行し、その結果を返すのみにすべきです)

これらの例はプレフィックスの共通の意味を前提としています。これらが意味することは、あなたとあなたのチームで前提を決めるということです。恐らく、コードが異なる振る舞いをするのは普通なことです。しかし、プレフィックスが意味すること、プレフィックスの付いた関数ができること、できないことについてはしっかりとした理解をもっておくべきです。同じプレフィックスの関数はルールに従うべきです。そして、チームはそれを共有するべきです。
=======
- `getAge` -- would be bad if it shows an `alert` with the age (should only get).
- `createForm` -- would be bad if it modifies the document, adding a form to it (should only create it and return).
- `checkPermission` -- would be bad if it displays the `access granted/denied` message (should only perform the check and return the result).

These examples assume common meanings of prefixes. You and your team are free to agree on other meanings, but usually they're not much different. In any case, you should have a firm understanding of what a prefix means, what a prefixed function can and cannot do. All same-prefixed functions should obey the rules. And the team should share the knowledge.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
```

```smart header="究極的に短い関数名"
*非常に頻繁に* 使われる関数は、究極的に短い名前を持っていることがあります。

<<<<<<< HEAD
例えば、[jQuery](http://jquery.com) フレームワークは関数 `$` を定義しています。[LoDash](http://lodash.com/) ライブラリは、そのコアな関数として `_` を持っています。

それらは例外です。一般的に関数名は簡潔ではあるが、説明的でなければなりません。
=======
For example, the [jQuery](http://jquery.com) framework defines a function with `$`. The [Lodash](http://lodash.com/) library has its core function named `_`.

These are exceptions. Generally functions names should be concise and descriptive.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
```

## 関数 == コメント 

関数は短く明確に1つのことを行うべきです。もし関数が大きい場合、恐らくそれを幾つかの小さい関数に分けることは価値があるでしょう。このルールに従うことは簡単ではないこともありますが、間違いなく良いことです。

分割した関数はテストやデバッグが簡単になるだけでなく、 -- その存在自体が素晴らしいコメントになります!

例えば、下にある2つの関数 `showPrimes(n)`を比べてみましょう。どちらも[素数](https://en.wikipedia.org/wiki/Prime_number)を `n` に達するまで出力します。

1つ目のパターンはラベルを使います:

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

2つ目のパターンは、素数の確認をするための追加の関数 `isPrime(n)` を使います。

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
=======
The second variant is easier to understand, isn't it? Instead of the code piece we see a name of the action (`isPrime`). Sometimes people refer to such code as *self-describing*.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

従って、関数はその再利用を意図していない場合でも作ることがあります。それらはコードを構造化し、読みやすくします。

## サマリ 

関数はこのように定義します:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

<<<<<<< HEAD
- パラメータとして関数に渡される値は、ローカル変数にコピーされます。
- 関数は外部の変数にアクセスすることができます。しかし、それは内側からのみ機能します。関数の外側のコードは、関数のローカル変数を見ることはできません。
- 関数は値を返すことができます。もしもそれをしなかった場合、戻りは `undefined` です。
=======
- Values passed to a function as parameters are copied to its local variables.
- A function may access outer variables. But it works only from inside out. The code outside of the function doesn't see its local variables.
- A function can return a value. If it doesn't, then its result is `undefined`.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

コードを綺麗で理解しやすいようにするために、その関数内では外部変数ではなく、ローカル変数やパラメータを利用することを推奨します。

パラメータを取得するが、副作用として外部変数を変更する関数よりも、パラメータを取得してそれらを処理し、結果を返す関数(外部変数を変更しない関数)のほうが常に理解しやすいです。

関数名:

- 名前は、関数がすることを明確に記述するべきです。コードの中で関数呼び出しを見るとき、良い名前であればそれが何をして何を返すのかを簡単に理解することができます。
- 関数はアクションなので、関数名は通常動詞的です。
- `create…`, `show…`, `get…`, `check…` など、数多くのよく知られた関数のプレフィックスが存在します。関数がすることのヒントとしてそれらを使いましょう。

関数はスクリプトの主な構成要素です。今や私たちは基礎をカバーしたので、実際にそれらを作り使い始めることができます。しかし、それはまだほんの始まりに過ぎません。私たちは何度もそれらに戻り、より高度な機能について深めていきます。
