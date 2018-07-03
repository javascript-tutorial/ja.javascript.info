# エラーハンドリング, "try..catch"

どんなに我々のプログラミングが素晴らしくても、スクリプトがエラーになることはあります。それは私たちにミス、予期しないユーザ入力、間違ったサーバレスポンスやその他多くの理由により発生する可能性があります。

通常、エラーケースではスクリプトは "死" (即時に停止) に、それをコンソールに出力します。

しかし、エラーを "キャッチ" し、死ぬ代わりにより意味のあることをする構文構造 `try..catch` があります。

[cut]

## "try..catch" 構文

`try..catch` 構造は2つのメインブロックを持っています: `try` と `catch` です。:

```js
try {

  // code...

} catch (err) {

  // error handling

}
```

それは次のように動作します:

1. まず、`try {...}` のコードが実行されます。
2. エラーがなければ、`catch(err)` は無視されます: 実行が `try` の最後に到達した後、`catch` を飛び越えます。
3. エラーが発生した場合、`try`  の実行が停止し、コントロールフローは `catch(err)` の先頭になります。`err` 変数(任意の名前が使えます)は発生した事象に関する詳細をもつエラーオブジェクトを含んでいます。

![](try-catch-flow.png)

従って、`try {…}` ブロックの内側のエラーはスクリプトを殺しません: `catch` の中でそれを扱う機会が持てます。

より多くの例を見てみましょう。

- エラーなしの例: `alert` `(1)` と `(2)` を表示します:

    ```js run
    try {

      alert('Start of try runs');  // *!*(1) <--*/!*

      // ...no errors here

      alert('End of try runs');   // *!*(2) <--*/!*

    } catch(err) {

      alert('Catch is ignored, because there are no errors'); // (3)

    }

    alert("...Then the execution continues");
    ```
- エラーの例: `(1)` と `(3)` を表示します:

    ```js run
    try {

      alert('Start of try runs');  // *!*(1) <--*/!*

    *!*
      lalala; // error, variable is not defined!
    */!*

      alert('End of try (never reached)');  // (2)

    } catch(err) {

      alert(`Error has occured!`); // *!*(3) <--*/!*

    }

    alert("...Then the execution continues");
    ```


````warn header="`try..catch` は実行時エラーにのみ作用します"
`try..catch` を動作させるために、コードは実行可能でなければなりません。つまり、有効なJavaScriptである必要があります。

もしコードが構文的に誤っている場合には動作しません。例えば次は角括弧の不一致です:

```js run
try {
  {{{{{{{{{{{{
} catch(e) {
  alert("The engine can't understand this code, it's invalid");
}
```

JavaScriptエンジンは最初にコードを読み、次にそれを実行します。読み込みのフェーズで発生したエラーは "解析時間(parse-time)" エラーと呼ばれ、回復不能です(コードの内部からは)。なぜなら、エンジンはそのコードを理解することができないからです。

そのため、`try..catch` は有効なコードの中で起きたエラーのみを扱うことができます。このようなエラーは "ランタイムエラー" または "例外" と呼ばれます。
````


````warn header="`try..catch` は同期的に動作します"
もし `setTimeout` の中のような "スケジュールされた" コードで例外が発生した場合、`try..catch` はそれをキャッチしません。:

```js run
try {
  setTimeout(function() {
    noSuchVariable; // script will die here
  }, 1000);
} catch (e) {
  alert( "won't work" );
}
```

`try..catch` は実際には関数をスケジュールする `setTimeout` 呼び出しをラップするためです。しかし関数自身は後で実行され、その時エンジンはすでに `try..catch` 構造を抜けています。

スケジュールされた関数の内側の例外をキャッチするためには、その関数の中に `try..catch` が必要です。:
```js run
setTimeout(function() {
  try {    
    noSuchVariable; // try..catch handles the error!
  } catch (e) {
    alert( "error is caught here!" );
  }
}, 1000);
```
````

## エラーオブジェクト

エラーが発生したとき、JavaScript はその詳細を含めたオブジェクトを生成します。そして `catch` の引数として渡されます。:

```js
try {
  // ...
} catch(err) { // <-- the "error object", could use another word instead of err
  // ...
}
```

すべての組み込みのエラーに対して、`catch` ブロック内のエラーオブジェクトは2つの主なプロパティを持っています。:

`name`
: エラー名です。未定義変数の場合、それは `"ReferenceError"` です。

`message`
: エラー詳細に関するテキストメッセージです。

ほとんどの環境では、その他非標準のプロパティが利用可能です。最も広く使われ、サポートされているのは以下です:

`stack`
: 現在のコールスタックです: エラーに繋がったネスト呼び出しのシーケンスに関する情報を持つ文字列です。デバッグ目的で使われます。

例:

```js run untrusted
try {
*!*
  lalala; // error, variable is not defined!
*/!*
} catch(err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at ...

  // Can also show an error as a whole
  // The error is converted to string as "name: message"
  alert(err); // ReferenceError: lalala is not defined
}
```


## "try..catch" の利用

`try..catch` の実際のユースケースについて探索してみましょう。

すでにご存知の通り、JavaScriptは JSONエンコードされた値を読むためのメソッド [JSON.parse(str)](mdn:js/JSON/parse) がサポートされています。

通常、それはネットワーク経由でサーバまたは別のソースから受信したデータをデコードするために使われます。

今、次のようにデータを受信し、`JSON.parse` を呼び出します。:

```js run
let json = '{"name":"John", "age": 30}'; // data from the server

*!*
let user = JSON.parse(json); // convert the text representation to JS object
*/!*

// now user is an object with properties from the string
alert( user.name ); // John
alert( user.age );  // 30
```

JSON に関する詳細な情報は、チャプター <info:json> を参照してください。

**`json` が不正な形式の場合、`JSON.parse` はエラーになるのでスクリプトは "死にます"。**

それで満足しますか？もちろん満足しません!

この方法だと、もしデータが何か間違っている場合、訪問者はそれを知ることができません(開発者コンソールを開かない限り)。また、人々は、エラーメッセージなしで何かが "単に死んでいる" ことを本当に本当に嫌います。

エラーを扱うために `try..catch` を使いましょう。:

```js run
let json = "{ bad json }";

try {

*!*
  let user = JSON.parse(json); // <-- when an error occurs...
*/!*
  alert( user.name ); // doesn't work

} catch (e) {
*!*
  // ...the execution jumps here
  alert( "Our apologies, the data has errors, we'll try to request it one more time." );
  alert( e.name );
  alert( e.message );
*/!*
}
```

ここでは、メッセージを表示するためのだけに `catch` ブロックを使っていますが、より多くのことをすることができます。: 新たなネットワーク要求、訪問者への代替手段の提案、ロギング機構へエラーに関する情報の送信... すべて、単に死ぬよりははるかに良いです。

## 我々独自のエラーをスローする

仮に `json` が構文的に正しいが、必須の `"name"` プロパティを持っていない場合どうなるでしょう？

このように:

```js run
let json = '{ "age": 30 }'; // incomplete data

try {

  let user = JSON.parse(json); // <-- no errors
*!*
  alert( user.name ); // no name!
*/!*

} catch (e) {
  alert( "doesn't execute" );
}
```

ここで、`JSON.parse` は通常どおり実行しますが、`"name"` の欠落は実際には我々にとってはエラーです。

エラー処理を統一するために、`throw` 演算子を使います。

### "Throw" 演算子

`throw` 演算子はエラーを生成します。

構文は次の通りです:

```js
throw <error object>
```

技術的には、エラーオブジェクトとしてなんでも使うことができます。たとえ、数値や文字列のようなプリミティブでもOKです。しかし、`name` と `message` プロパティを持つオブジェクトを使うのがベターです(組み込みのエラーと互換性をいくらか保つために)。

JavaScriptは標準エラーのための多くの組み込みのコンストラクタを持っています: `Error`, `SyntaxError`, `ReferenceError`, `TypeError` などです。私たちは同じようにエラーオブジェクトを作るためにそれらを使うことができます。

それらの構文は次の通りです:

```js
let error = new Error(message);
// or
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...
```

組み込みのエラー(任意のオブジェクトではなく、エラーのみ)では、`name` プロパティはコンストラクタの名前と全く同じになります。そして `message` は引数から取られます。

例:

```js run
let error = new Error("Things happen o_O");

alert(error.name); // Error
alert(error.message); // Things happen o_O
```

`JSON.parse` が生成するエラーの種類を見てみましょう:

```js run
try {
  JSON.parse("{ bad json o_O }");
} catch(e) {
*!*
  alert(e.name); // SyntaxError
*/!*
  alert(e.message); // Unexpected token o in JSON at position 0
}
```

ご覧の通り、それは `SyntaxError` です。

...そして、我々のケースでは、ユーザは必ず `"name"` を持っていると仮定するので、`name` の欠落もまた構文エラーとして扱います。

なので、それをスローするようにしましょう:

```js run
let json = '{ "age": 30 }'; // incomplete data

try {

  let user = JSON.parse(json); // <-- no errors

  if (!user.name) {
*!*
    throw new SyntaxError("Incomplete data: no name"); // (*)
*/!*
  }

  alert( user.name );

} catch(e) {
  alert( "JSON Error: " + e.message ); // JSON Error: Incomplete data: no name
}
```

行 `(*)` で、`throw` 演算子が与えられた `message` で `SyntaxError` を生成します。それは JavaScript が生成するのと同じ方法です。`try` の実行はすぐに停止し、制御フローは `catch` に移ります。

今や、`catch` はすべてのエラーハンドリングのための1つの場所になりました。: `JSON.parse` と他のケース。

## Rethrowing

上の例で、私たちは不正なデータを処理するために `try..catch` を使っています。しかし、`try {...}` ブロックの中で *別の予期しないエラー* が発生する可能性はあるでしょうか？ 変数が未定義、またはその他、単に "不正なデータ" ではない何か。

このように:

```js run
let json = '{ "age": 30 }'; // incomplete data

try {
  user = JSON.parse(json); // <-- forgot to put "let" before user

  // ...
} catch(err) {
  alert("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined
  // (not JSON Error actually)
}
```

もちろん、すべての可能性があります! プログラマはミスをするものです。何十年も何百万人もの人が使っているオープンソースのユーティリティであっても、突然酷いバグが発見され、ひどいハッキングにつながることがあります（ `ssh` ツールで起こったようなものです）。

私たちのケースでは、`try..catch` は "不正なデータ" エラーをキャッチすることを意図しています。しかし、その性質上、`catch` は `try` からの *すべての* エラーを取得します。ここでは予期しないエラーが発生しますが、同じ `"JSON Error"` メッセージが表示されます。それは誤りでコードのでバッグをより難しくします。

幸いにも、どのエラーを取得したかを知ることができます。例えば、`name` から:

```js run
try {
  user = { /*...*/ };
} catch(e) {
*!*
  alert(e.name); // "ReferenceError" for accessing an undefined variable
*/!*
}
```

ルールはシンプルです。:

**キャッチはそれが知っているエラーだけを処理し、すべてのオブジェクトを "再スロー" するべきです**
**Catch should only process errors that it knows and "rethrow" all others.**

"再スロー" テクニックの詳細は次のように説明できます:

1. すべてのエラーをキャッチします。
2. `catch(err) {...}` ブロックで、エラーオブジェクト `err` を解析します。
3. どう処理するばいいか分からなければ、`throw err` をします。

下のコードでは、`catch` が `SyntaxError` だけを処理するよう再スローを使っています。:

```js run
let json = '{ "age": 30 }'; // incomplete data
try {

  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name");
  }

*!*
  blabla(); // unexpected error
*/!*

  alert( user.name );

} catch(e) {

*!*
  if (e.name == "SyntaxError") {
    alert( "JSON Error: " + e.message );
  } else {
    throw e; // rethrow (*)
  }
*/!*

}
```

行 `(*)` での、`catch` ブロック内部からのエラーのスローは `try..catch` を "抜けて" 外部の `try..catch` 構造(存在する場合)でキャッチされる、またはスクリプトをキルします。

従って、`catch` ブロックは実際に扱い方を知っているエラーだけを処理しその他すべてを "スキップ" します。

下の例は、このようなエラーが1つ上のレベルの `try..catch` で捕捉されるデモです:

```js run
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
*!*
    blabla(); // error!
*/!*
  } catch (e) {
    // ...
    if (e.name != 'SyntaxError') {
*!*
      throw e; // rethrow (don't know how to deal with it)
*/!*
    }
  }
}

try {
  readData();
} catch (e) {
*!*
  alert( "External catch got: " + e ); // caught it!
*/!*
}
```

ここでは、`readData` は `SyntaxError` の処理の仕方だけ知っており、外部の `try..catch` はすべての処理の方法を知っています。

## try..catch..finally

待ってください、それですべてではありません。

`try..catch` 構造はもう1つのコード句: `finally` を持つ場合があります。

もし存在する場合、それはすべてのケースで実行します。:

- エラーが無かった場合は、`try` の後で。
- エラーがあった場合には `catch` の後で。

拡張された構文はこのように見えます。:

```js
*!*try*/!* {
   ... try to execute the code ...
} *!*catch*/!*(e) {
   ... handle errors ...
} *!*finally*/!* {
   ... execute always ...
}
```

このコードを実行してみましょう。:

```js run
try {
  alert( 'try' );
  if (confirm('Make an error?')) BAD_CODE();
} catch (e) {
  alert( 'catch' );
} finally {
  alert( 'finally' );
}
```

このコードは2つの実行方法があります。:

1. もし "Make an error" に "Yes" と答えると、`try -> catch -> finally` となります。
2. もし "No" と言えば、`try -> finally` となります。

`finally` 句は `try..catch` の前に何かを開始して、どのような結果であれファイナライズをしたいときにしばしば使われます。

例えば、フィボナッチ数関数 `fib(n)` にかかる時間を計測したいとします。当然ながら、それを実行する前に計測を開始して、実行後に終了させることができます。しかし、仮に関数呼び出しの間でエラーが起きたらどうなるでしょう？特に下のコードの `fib(n)` の実装では、負の値または非整数値だとエラーを返します。

`finally` 句は何があっても計測を完了させるのに良い場所です。

ここで、`finally` は両方のシチュエーション -- `fib` の実行が成功するケースと失敗するケース -- で時間が正しく計測されることを保証します。:

```js run
let num = +prompt("Enter a positive integer number?", 35)

let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Must not be negative, and also an integer.");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (e) {
  result = 0;
*!*
} finally {
  diff = Date.now() - start;
}
*/!*

alert(result || "error occured");

alert( `execution took ${diff}ms` );
```

コードを実行して `prompt` に `35` を入力することで確認できます -- 通常 `try` の後に `finally` を実行します。そして `-1` を入れると -- すぐにエラーになり、その実行は `0ms` となります。両方の計測は正しく行われています。

言い換えると、関数を終了するには方法が2つあります: `return` または `throw` です。 `finally` 句はそれら両方とも処理します。

```smart header="変数は `try..catch..finally` の内部でローカルです"
上のコードで `result` と `diff` 変数は `try..catch` の *前* で宣言されていることに注意してください。

そうでなく、`let` が `{...}` ブロックの中で作られている場合、その中でしか見えません。
```

````smart header="`finally` と `return`"
Finally 句は　`try..catch` からの *任意の* 終了に対して機能します。それは明白な `return` も含みます。

下の例では、`try` の中で `return` があります。この場合、`finally` は制御が外部コードに戻る前に実行されます。

```js run
function func() {

  try {
*!*
    return 1;
*/!*

  } catch (e) {
    /* ... */
  } finally {
*!*
    alert( 'finally' );
*/!*
  }
}

alert( func() ); // first works alert from finally, and then this one
```
````

````smart header="`try..finally`"

`catch` 句がない `try..catch` 構造も役立ちます。私たちはここでエラーを正しく処理したくないが、開始した処理が完了したことを確認したいときに使います。

```js
function func() {
  // start doing something that needs completion (like measurements)
  try {
    // ...
  } finally {
    // complete that thing even if all dies
  }
}
```
上のコードでは、`try` の内側のエラーは常に抜けます。なぜなら `catch` がないからです。しかし `finally` は実行フローが外部に移る前に機能します。
````

## グローバルな catch

```warn header="環境特有"
このセクションの情報はコアなJavaScriptの一部ではありません。
```

`try..catch` の外側で致命的なエラーが起きてスクリプトが死んだことをイメージしてください。プログラミングエラーやその他何か酷いものによって。

そのような出来事に反応する方法はありますか？ エラーをログに記録したり、ユーザーに何かを見せたり（通常はエラーメッセージが表示されません）。

仕様ではそのようなものはありませんが、通常、環境がそれを提供しています。なぜなら本当に有用だからです。例えば、Node.JS はそのために [process.on('uncaughtException')](https://nodejs.org/api/process.html#process_event_uncaughtexception)を持っています。
また、ブラウザでは関数を特別な [window.onerror](mdn:api/GlobalEventHandlers/onerror) プロパティに代入することができます。それはキャッチしていないエラーの場合に実行されます。

構文:

```js
window.onerror = function(message, url, line, col, error) {
  // ...
};
```

`message`
: エラーメッセージ

`url`
: エラーが起きたスクリプトのURL

`line`, `col`
: エラーが起きた行と列番号

`error`
: エラーオブジェクト

例:

```html run untrusted refresh height=1
<script>
*!*
  window.onerror = function(message, url, line, col, error) {
    alert(`${message}\n At ${line}:${col} of ${url}`);
  };
*/!*

  function readData() {
    badFunc(); // Whoops, something went wrong!
  }

  readData();
</script>
```

グローバルハンドラー `window.onerror` の役割は、通常スクリプトの実行の回復ではありません -- プログラミングエラーの場合、恐らくそれは不可能なので、開発者にエラーメッセージを送ります。

このようなケースでエラーログを提供する web サービスもあります。https://errorception.com> や <http://www.muscula.com>。

それらは次のように動きます:

1. 私たちはサービスに登録し、ページにそうにゅうするためのJSのピース(またはスクリプトのURL)をそれらから得ます。
2. そのJSスクリプトはカスタムの `window.onerror` 関数を持っています。
3. エラーが起きた時、そのサービスへネットワークリクエストを送ります。
4. 私たちはサービスのWebインタフェースにログインしてエラーを見ることができます。

## サマリ

`try..catch` 構造はランタイムエラーを処理することができます。文字通りコードを実行しようと試みて、その中で起こるエラーをキャッチします。

構文は次の通りです:

```js
try {
  // run this code
} catch(err) {
  // if an error happened, then jump here
  // err is the error object
} finally {
  // do in any case after try/catch
}
```

`catch` セクションがない、または `finally` がない場合があります。なので `try..catch` と `try..finally` もまた有効です。

エラーオブジェクトは次のプロパティを持っています。:

- `message` -- 人が読めるエラーメッセージです。
- `name` -- エラー名を指す文字列です(エラーコンストラクタ名)
- `stack` (非標準) -- エラー生成時のスタックです。

また、`throw` 演算子を使って独自のエラーを生成することもできます。技術的には、`throw` の引数は何でもよいですが、通常は組み込みの `Error` クラスを継承しているエラーオブジェクトです。次のチャプターでエラーを拡張する方法について詳しく説明します。

再スローはエラーハンドリングの基本パターンです。: `catch` ブロックは通常、特定のエラータイプを処理する方法を予期し、知っています。したがって、知らないエラーは再スローすべきです。

たとえ `try..catch` を持っていない場合でも、ほとんどの環境では "抜け出た" エラーをキャッチするために "グローバル" なエラーハンドラを設定することができます。ブラウザでは、それは `window.onerror` です。
