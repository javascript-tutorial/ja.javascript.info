# カスタムエラー, Error の拡張

何かを開発するとき、我々のタスクで間違っているかもしれない特定の事柄を反映するために、独自のエラークラスが必要になることがよくあります。
ネットワーク操作のエラーについては、 `HttpError`、データベース操作 `DbError`、検索操作 `NotFoundError` などが必要な場合があります。

我々のエラーは `message`, `name` 、望ましくは `stack` のような基本のエラープロパティをサポートするべきです。しかし、それら独自の他のプロパティを持つかもしれません。例えば `HttpError` オブジェクトが `404`, `403` もしくは `500` といった値をとる `statusCode` プロパティを持つかもしれません。

JavaScript は任意の引数で `throw` できるので、技術的にはカスタムのエラークラスは `Error` から継承する必要はありません。しかし、継承していると、エラーオブジェクトを識別する `obj instanceof Error` を使えるようになります。そのため、継承しておくほうがよいです。

アプリケーションを開発するにつれ、独自のエラーが自然に階層を形成します。たとえば、 `HttpTimeoutError` は `HttpError` を継承する、といったように。

## Error を拡張する

例として、ユーザデータをもつ JSON を読む関数 `readUser(json)` を考えてみましょう。

ここでは、有効な `json` がどのように見えるかの例を示します。:
```js
let json = `{ "name": "John", "age": 30 }`;
```

内部的には、`JSON.parse` を使います。もし不正な `json` を受け取った場合、それは `SyntaxError` をスローします。

しかし、たとえ `json` が構文的に正しくても、それが正しいユーザとは限りません。 それには必要なデータが不足しているかもしれません。例えば、我々のケースでのユーザには必要不可欠な `name` や `age` プロパティを持っていない場合です。

私たちの関数 `readUser(json)` JSONを読むだけでなく、データのチェック(バリデート)をします。もし必須のフィールドがなかったり、フォーマットが間違っている場合、それはエラーです。そしてそれは `SyntaxError` ではありません。なぜならデータは構文的には正しく、別の種類のエラーだからです。私たちはそれを `ValidationError` と呼び、そのためのクラスを作りましょう。そのようなエラーは、問題のあるフィールドに関する情報も保持する必要があります。

我々の `ValidationError` クラスは組み込みの `Error` クラスから継承します。

そのクラスは組み込みですが、そのクラスのおおよそのコードを書いて、私たちが何を拡張しているのかを理解する必要があります。

これです:

```js
// JavaScript自体で定義された組み込みのErrorクラスの「擬似コード」
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (組み込みのエラークラスごとに異なる名前)
    this.stack = <nested calls>; // non-standard, but most environments support it
  }
}
```

では、話を戻して `ValidationError` をそれから継承させましょう。:

```js run untrusted
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Whoops!
  alert(err.name); // ValidationError
  alert(err.stack); // それぞれの行番号を持つネストされたコールのリスト
}
```

コンストラクタを見てください:

1. 行 `(1)` で、親のコンストラクタを読んでいます。JavaScriptは子のコンストラクタ内での `super` の呼び出しは必須なので、それは義務です。親のコンストラクタは `message` プロパティをセットします。
2. 親のコンストラクタは `name` プロパティも　`"Error"` へセットしますので、行 `(2)` で正しい値にリセットしています。

`readUser(json)` で使ってみましょう:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}

// try..catch での動作例

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No field: name
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // 知らないエラーなので、再スロー
  }
}
```

上のコードの `try.catch` ブロックは `ValidationError` と `JSON.parse` からの組み込みの `SyntaxError` 両方を処理します。

行 `(*)` で特定のエラータイプのチェックをするために、どのように `instanceof` を使っているか見てください。

このようにして `err.name` を見ることもできます。:

```js
// ...
// (err instanceof SyntaxError) の代わり
} else if (err.name == "SyntaxError") { // (*)
// ...
```  

`instanceof` の方がよりベターです。なぜなら、将来 `ValidationError` を拡張し、`PropertyRequiredError` のようなそのサブタイプを作るからです。そして `instanceof` チェックは新しい継承したクラスでもうまく機能し続けます。それは将来を保証します。

また、`catch` が未知のエラーに遭遇したとき、行 `(**)` でそれを再度スローすることも重要です。 `catch` はバリデーションと構文エラーの処理の仕方だけを知っています。他の種類(コード中のタイポやその他)の場合は失敗します。

## さらなる継承

`ValidationError` クラスはとても汎用的です。多くのことが間違っているかもしれません -- プロパティが存在しなかったり、誤ったフォーマット(`age` が文字列値のような)であるかもしれません。厳密に存在しないプロパティに対して、より具体的なクラス `PropertyRequiredError` を作りましょう。欠落しているプロパティについての追加の情報を保持します。


```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// 使用法
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// try..catch での動作例

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No property: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // 知らないエラーなので、それを再スロー
  }
}
```

新しいクラス `PropertyRequiredError` は簡単に使うことができます: プロパティ名を渡すだけです。: `new PropertyRequiredError(property)`。人が読める `message` はコンストラクタで作られます。

`PropertyRequiredError` コンストラクタでの `this.name` は再度手動で割り当てられることに注意してください。それは少しうんざりするかもしれません -- カスタムのエラーを作る度に `this.name = <class name>` と代入することに。しかし方法があります。コンストラクタの中で `this.name` に対して `this.constructor.name` を使うことで、我々の肩の荷をとってくれる独自の "基本エラー" クラスを作ることができます。そしてそれを継承します。

それは `MyError` と呼びましょう。

ここでは、単純化した `MyError` のコードと他のカスタムエラークラスを示します。:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// name is correct
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

これで、カスタムエラーははるかに短くなりました。特に `ValidationError` はコンストラクタの `"this.name = ..."` の行を除いたので。

## 例外のラッピング

上のコードの関数 `readUser` の目的は "ユーザデータを読むこと" ですよね？ この処理では異なる種類のエラーが起こる可能性があります。今は `SyntaxError` と `ValidationError` を持っていますが、将来 `readUser` 関数が成長するかもしれません: 新たなコードが別の種類のエラーを生み出すかもしれません。

`readUser` を呼び出すコードは、これらのエラーを処理する必要があります。今は `catch` ブロックの中で、異なるエラータイプのチェックと未知のエラーを再スローするために、複数の `if` を使っています。しかし、もし `readUser` 関数が複数の種類のエラーを生成する場合 -- `readUser` 呼び出しをするすべてのコードで、本当にすべてのエラータイプを1つずつチェックしたいですか？

しばしば答えは、"いいえ" です。:　外側のコードは "それらすべての1つ上のレベル" でありたいです。つまり "データ読み込みエラー" でいくつかの種類を持ちたいです。正確になぜそれが起きたのか -- はしばしば重要ではありません(エラーメッセージがそれを説明します)。もしくは、必要な場合にのみ、エラーの詳細を取得方法があると更にベターです。

従って、このようなエラーを表現するための新しいクラス `ReadError` を作りましょう。`readUser` の中でエラーが起きると、それをキャッチし、`ReadError` を生成します。その `cause` プロパティで、元のエラーへの参照を持っておきます。そして外部のコードは `ReadError` に対してのみチェックを行います。

これは、`ReadError` を定義し、`readUser` と `try..catch` でそれを利用するデモです。:

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

上のコードで、`readUser` は説明されている通りに正確に動作します -- 構文とバリデーションエラーをキャッチし、`ReadError` エラーを代わりにスローします(未知のエラーは通常通り再スローします)。

なので、外部のコードは `instanceof ReadError` をチェックするだけです。可能性のあるすべてのエラータイプをリストする必要はありません。

このアプローチは、"低レベルの例外" を取り除き、呼び出しコードで使用するより抽象的で便利な "ReadError" に "ラップ" するため、"例外のラッピング" と呼ばれます。 オブジェクト指向プログラミングで広く使用されています。

## サマリ [#summary]

- 私たちは、`Error` や他の組み込みのエラークラスから継承することができます。そのときは、`name` プロパティに手を入れることと、`super`
の呼び出しを忘れないでください。
- ほとんどの場合、特定のエラーをチエックするために `instanceof` を使うべきです。それは継承している場合にも有効です。しかし、ときには3rdパーティのライブラリから来たエラーオブジェクトを持っていて、簡単にそのクラスを取得する方法がないことがあります。このようなチェックの場合には `name` プロパティを使うことができます。
- 例外のラッピングは、関数が低レベルの例外を処理し、そのエラーを報告するために高レベルのオブジェクトを作る時のテクニックとして広く知られています。低レベルの例外は、上の例の `err.cause` のようにオブジェクトのプロパティになることがありますが、厳密には必須ではありません。
