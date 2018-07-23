# 関数

多くの場合、スクリプトの様々な場所で同様のアクションを実行する必要があります。

例えば、訪問者がログイン、ログアウトしたり、また他の場所にいる時に見栄の良いメッセージを表示する必要があります。

関数はプログラムのメインの "構成要素" です。これにより、コードを繰り返すことなく何度も呼び出すことが出来ます。

[cut]

私たちは既に組み込み関数の例を見ています。 `alert(message)`, `prompt(message, default)` や `confirm(question)`です。
しかし、同じように私達自身も関数を作ることができます。

## 関数定義 [#function-declaration]

関数を作るために、*関数定義* を使います。

これは次のようになります:

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

`function` キーワードが最初にきて、次に *関数名* がきます、そして括弧の中に *パラメータ* のリストがきて(上の例では空白です)、最後に関数のコード、"関数本体" です。

![](function_basics.png)

私たちの新しい関数はその名前で呼ぶことが出来ます: `showMessage()`

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

`showMessage()` の呼び出しは関数のコードを実行します。ここで私たちは2度メッセージを見ます。

この例は関数のメインの目的の1つを明確に説明しています: コードの複製を回避します。

もしも、メッセージもしくは表示する方法を変更する必要がある場合、1つの場所のコードを修正するだけで十分です。: それを出力する関数です。

## ローカル変数 [#local-variables]

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

## 外部変数 [#outer-variables]

同様に、関数は外部変数にアクセスすることができます, 次の例にように:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, John
```

関数は外部変数に対してフルアクセス権を持ちます。同様にそれを変更することができます。

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

外部変数は、ローカル変数が存在しない場合にのみ使われます。そのため、私たちが `let` を忘れていたら偶発的な修正が必要になるかもしれません。

もしも同じ名前の変数が関数内に宣言されていると、それは外部変数を *隠します*。例えば、下のコードでは関数はローカルの `userName` を使います。外部の `userName` は無視されます。

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // ローカル変数の宣言
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

// 関数は作られ独自の userName を使います
showMessage();

alert( userName ); // *!*John*/!*, 変更されていません。関数は外部変数へアクセスしませんでした
```

```smart header="グローバル変数"
上のコードにおいて、外部の `userName` のような、任意の関数の外で宣言されている変数は *グローバル* と呼ばれます。

グローバル変数はどの関数からも見えます(ローカル変数により隠れていなければ)。

通常、関数はそれ自身のタスクのためのすべての変数を宣言します。また、グローバル変数にはプロジェクトレベルのデータのみを保持するため、どこからでも見える事が重要です。現代のコードはほとんどもしくは全くグローバル変数を持ちません。ほとんどの変数はその関数の中にあります。
```

## パラメータ [#parameters]

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

ここにもう1つ例があります: 私たちは変数 `from` を持っており、それを関数に渡します。注意してください：関数は常に値のコピーを取得するため、関数は `from` を変更しますが、その変更は外には見えません。

```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // "from" をより良く見せる
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// "from" の値は同じで、関数はローカルコピーを変更しました。
alert( from ); // Ann
```

## Default 値 [#default-values]

もしもパラメータが与えられていない場合、その値は `undefined` になります。

例えば、前述の関数 `showMessage(from, text)` は1つの引数で呼ぶことも出来ます:

```js
showMessage("Ann");
```

それはエラーではありません。このような呼び出しは `"Ann: undefined"` を出力します。`text` がないので、`text === undefined` と仮定されます。

もしも "デフォルト" の `text` を使いたい場合は、このケースでは、`=` の後に指定することができます:

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

今や、`text` パラメータが渡されていない場合、 それは値 `"no text given"` を得ます。

ここで、 `"no text given"` は文字列ですが、より複雑な式にすることもできます。そしてそれはパラメータが無い場合にのみ評価され代入されます。なので、これも可能です:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() はテキストが与えられなかった場合にのみ実行されます
  // その結果がtextの値になります
}
```


````smart header="デフォルトパラメータの古い形式"
javascriptの古いエディションはデフォルトパラメータをサポートしていませんでした。そのため、それらをサポートするための別の方法があります。これは殆どの古いスクリプトの中で見つけることができます。

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
  // text が偽の場合、tetxt は "デフォルト" 値を取得します
  text = text || 'no text given';
  ...
}
```


````


## 値の返却 [#returning-a-value]

関数は、実行結果として呼び出しコードに値を戻すことが出来ます。

最もシンプルな例は2つの値の合計を行う関数です:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

ディレクティブ `return` は関数の任意の場所に置くことが出来ます。もしも実行がそこに到達したとき、関数は停止し、値を呼び出しコードに返します(上の `result` へ代入します)。

1つの関数に多くの `return` が出現することもあります。例えば:

```js run
function checkAge(age) {
  if (age > 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Got a permission from the parents?');
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

値なしで `return` を使うことも出来ます。それは関数を直ぐに終了させます。

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

上のコードでは、もしも `checkAge(age)`  が `false` を返すと、`showMovie` `alert` の処理をしません。

````smart header="空の `return` または返却がないものは `undefined` を返します"
もしも関数が値を返却しない場合、`undefined` を返却した場合と同じです。:

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
`return` での長い式では、このように別の行に書くのが魅力的に見えるかもしれません:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
JavaScriptは `return` の後のセミコロンを想定するため、これは動作しません。それは次と同じように動作します:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```
従って、それは事実上空の返却になります。私たちは、代わりに同じ行に値を置く必要があります。
````

## 関数の命名 [#function-naming]

関数はアクションです。そのため、それらの名前は、通常は動詞です。それは簡潔にすべきすが、その関数がすることをできるだけ正確に表現してください。そして、コードを読む人は正しい手がかりを得られるようにします。

曖昧にアクションを記述する動詞のプレフィックスから関数を始めることは広く行われています。
プレフィックスの意味についてチーム内での合意が必要です。

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

決まった位置にプレフィックスを使用すると、関数名を見ると、それがどのような種類の処理を行い、どのような値を返すのかを理解することが出来ます。

```smart header="1つの関数 -- 1つのアクション"
関数はその名前により提案されたことを正確にするべきです。

通常、2つの独立したアクションは、たとえそれらが一緒に呼ばれるとしても(その場合、私たちはそれらの2つを呼ぶ3つ目の関数を作ります)、2つの関数にするのが良いです。

このルールを破るいくつかの例です:

- `getAge` -- 年齢とともに `警告` 表示すると悪くなります(取得のみをするべきです)
- `createForm` -- ドキュメントを変更してフォームを追加すると悪くなります(作成とその返却だけにするべきです)
- `checkPermission` -- `アクセス許可/拒否` のメッセージを表示すると悪くなります(チェックのみを実行し、その結果を返すべきです)

これらの例はプレフィックスの共通の意味を前提としています。それらがあなたのために意味することは、あなたとあなたのチームで決めるということです。恐らく、あなたのコードが異なった振る舞いをすることは普通なことです。しかしあなたは、プレフィックスが意味すること、プレフィックスの付いた関数ができること、できないことについて、しっかりとした理解をもっておくべきです。同じプレフィックスの関数はルールに従うべきです。あおして、チームはその知識を共有するべきです。
```

```smart header="究極短い関数名"
*非常にしばしば* 使われる関数は、時々究極的に短い名前を持っています。

例えば、[jQuery](http://jquery.com) フレームワークは関数 `$` を定義しています。[LoDash](http://lodash.com/) ライブラリは、そのコアな関数として `_` を持っています。

それらは例外です。一般的に関数名は簡潔ではあるが、記述的でなければなりません。
```

## 関数 == コメント [#functions-comments]

関数は短く明確に1つのことを行うべきです。もしも関数が大きい場合、恐らく、それを幾つかの小さい関数に分ける価値があるでしょう。時々、このルールに従うことは簡単ではないかもしれませんが、間違いなく良いことです。

分割した関数はテストやデバッグが簡単になるだけでなく、 -- その存在が素晴らしいコメントです!

例えば、下にある2つの関数 `showPrimes(n)`を比べてみましょう。どちらも[prime numbers](https://en.wikipedia.org/wiki/Prime_number)を `n` に達するまで出力します。

1つ目のバリアントはラベルを使います:

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

2つ目のバリアントは、素数の確認をするための追加の関数 `isPrime(n)` を使います。

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

2つ目のバリアントのほうが理解しやすいですね。コードの塊の代わりに、アクション(`isPrime`) の名前を見ます。時々人々はこのようなコードを *自己記述* と呼びます。

従って、関数はその再利用を意図していない場合でも作る事ができます。それらはコードを構造化し、読みやすくします。

## サマリ [#summary]

関数はこのように定義します:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- パラメータとして関数に渡される値は、ローカル変数にコピーされます。
- 関数は外部変数にアクセスすることができます。しかし、それは内側からのみ動作します。関数の外側のコードは、関数のローカル変数を見ることは出来ません。
- 関数は値を返すことが出来ます。もしもそれをしなかった場合、その戻りは `undefined` です。

コードを綺麗で理解しやすいようにするために、その関数内では外部変数ではなく、主にローカル変数やパラメータを利用することを推奨します。

パラメータを取得するが副作用として外部変数を変更する関数よりも、パラメータを取得してそれらを処理し、結果を返す関数のほうが常に理解しやすいです。

関数名:

- 名前は、関数がすることを明確に記述するべきです。私たちがコードの中で関数呼び出しを見るとき、良い名前であれば、私たちはそれが何をして何を返すのかを、簡単に理解することができます。
- 関数はアクションなので、関数名は通常動詞的です。
- `create…`, `show…`, `get…`, `check…` など、数多くのよく知られた関数のプレフィックスが存在します。関数がすることのヒントとしてそれらを使いましょう。

関数はスクリプトの主な構成要素です。今や私たちは基礎をカバーしましたので、実際にそれらを作り、使い始めることが出来ます。しかし、それはまだ道のりの始まりに過ぎません。私たちは何度もそれらに戻り、それらより高度な機能について深めていきます。
