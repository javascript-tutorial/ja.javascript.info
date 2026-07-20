<<<<<<< HEAD
# カスタムエラー, Error の拡張

開発する際、タスクで上手くいかない可能性のある特定の物事を反映するために、独自のエラークラスが必要になることがよくあります。ネットワーク操作のエラーであれば、`HttpError`、データベース操作は `DbError`、検索操作の場合は`NotFoundError` などが必要な場合があります。

エラーは `message`, `name` 、望ましくは `stack` のような基本のエラープロパティをサポートすべきです。ですが、他にも独自のプロパティを持つかもしれません。例えば `HttpError` オブジェクトであれば、 `404`, `403` もしくは `500` といった値をとる `statusCode` プロパティです。

JavaScript は任意の引数で `throw` できるので、技術的にはカスタムのエラークラスは `Error` から継承する必要はありません。しかし、継承しているとエラーオブジェクトを識別する `obj instanceof Error` を使えるようになります。そのため、継承しておくほうのがベターです。

アプリケーションを開発するにつれ、独自のエラーが自然に階層を形成します。たとえば、 `HttpTimeoutError` は `HttpError` を継承する、といったように。

## Error を拡張する

例として、ユーザデータをもつ JSON を読む関数 `readUser(json)` を考えてみましょう。

ここでは、有効な `json` がどのように見えるかの例を示します。:
=======
# Custom errors, extending Error

When we develop something, we often need our own error classes to reflect specific things that may go wrong in our tasks. For errors in network operations we may need `HttpError`, for database operations `DbError`, for searching operations `NotFoundError` and so on.

Our errors should support basic error properties like `message`, `name` and, preferably, `stack`. But they also may have other properties of their own, e.g. `HttpError` objects may have a `statusCode` property with a value like `404` or `403` or `500`.

JavaScript allows to use `throw` with any argument, so technically our custom error classes don't need to inherit from `Error`. But if we inherit, then it becomes possible to use `obj instanceof Error` to identify error objects. So it's better to inherit from it.

As the application grows, our own errors naturally form a hierarchy. For instance, `HttpTimeoutError` may inherit from `HttpError`, and so on.

## Extending Error

As an example, let's consider a function `readUser(json)` that should read JSON with user data.

Here's an example of how a valid `json` may look:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
```js
let json = `{ "name": "John", "age": 30 }`;
```

<<<<<<< HEAD
内部的には、`JSON.parse` を使います。不正な `json` を受け取った場合は `SyntaxError` をスローします。しかし、たとえ `json` が構文的に正しくても、それが正しいユーザとは限りません。その `json` には必要なデータが不足しているかもしれません。例えば、上のケースだと、ユーザに必要不可欠な `name` や `age` プロパティを持っていない場合です。

私たちの関数 `readUser(json)` はJSONを読むだけでなく、データのチェック(バリデート)をします。必須のフィールドがなかったり、フォーマットが誤っている場合はエラーになります。そしてそれは `SyntaxError` ではありません。なぜならデータは構文的には正しく、別の種類のエラーだからです。したがって、このエラーは `ValidationError` と呼び、そのためのクラスを作りましょう。このようなエラーは、問題のあるフィールドに関する情報も保持する必要があります。

`ValidationError` クラスは `Error` クラスから継承します。

`Error` クラスは組み込みですが、ここでは何を拡張しようとしているのか理解できるよう、そのクラスのおおよそのコードを示します:

```js
// JavaScript自体で定義された組み込みのErrorクラスの「擬似コード」
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (組み込みのエラークラスごとに異なる名前)
    this.stack = <nested calls>; // 非標準ですが、ほとんどの環境はサポートしています
=======
Internally, we'll use `JSON.parse`. If it receives malformed `json`, then it throws `SyntaxError`. But even if `json` is syntactically correct, that doesn't mean that it's a valid user, right? It may miss the necessary data. For instance, it may not have `name` and `age` properties that are essential for our users.

Our function `readUser(json)` will not only read JSON, but check ("validate") the data. If there are no required fields, or the format is wrong, then that's an error. And that's not a `SyntaxError`, because the data is syntactically correct, but another kind of error. We'll call it `ValidationError` and create a class for it. An error of that kind should also carry the information about the offending field.

Our `ValidationError` class should inherit from the `Error` class.

The `Error` class is built-in, but here's its approximate code so we can understand what we're extending:

```js
// The "pseudocode" for the built-in Error class defined by JavaScript itself
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (different names for different built-in error classes)
    this.stack = <call stack>; // non-standard, but most environments support it
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
  }
}
```

<<<<<<< HEAD
では、`ValidationError` をそれから継承させ、動かしましょう:

```js run untrusted
=======
Now let's inherit `ValidationError` from it and try it in action:

```js run
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
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
<<<<<<< HEAD
  alert(err.stack); // それぞれの行番号を持つネストされたコールのリスト
}
```

補足: `(1)` で親のコンストラクタを呼び出しています。JavaScriptは子のコンストラクタ内で `super` 呼び出しが必要で、これは義務です。親のコンストラクタは `message` プロパティをセットします。

親のコンストラクタは `name` プロパティも　`"Error"` へセットしますので、行 `(2)` で正しい値にリセットしています。

`readUser(json)` で使ってみましょう:
=======
  alert(err.stack); // a list of nested calls with line numbers for each
}
```

Please note: in the line `(1)` we call the parent constructor. JavaScript requires us to call `super` in the child constructor, so that's obligatory. The parent constructor sets the `message` property.

The parent constructor also sets the `name` property to `"Error"`, so in the line `(2)` we reset it to the right value.

Let's try to use it in `readUser(json)`:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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

<<<<<<< HEAD
// try..catch での動作例
=======
// Working example with try..catch
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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
<<<<<<< HEAD
    throw err; // 知らないエラーなので、再スロー (**)
=======
    throw err; // unknown error, rethrow it (**)
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
  }
}
```

<<<<<<< HEAD
上のコードの `try..catch` ブロックは `ValidationError` と `JSON.parse` からの組み込みの `SyntaxError` 両方を処理します。

行 `(*)` で特定のエラーの種類をチェックするために、どのように `instanceof` を使っているか見てください。

このようにして `err.name` を見ることもできます。:

```js
// ...
// (err instanceof SyntaxError) の代わり
} else if (err.name == "SyntaxError") { // (*)
// ...
```  

`instanceof` の方がよりベターです。なぜなら、将来 `ValidationError` を拡張し、`PropertyRequiredError` のようなサブタイプを作るからです。そして `instanceof` チェックは新しい継承したクラスでもうまく機能し続けます。それは将来を保証します。

また、`catch` が未知のエラーに遭遇したとき、行 `(**)` でそれを再度スローすることも重要です。 `catch` はバリデーションと構文エラーの処理の仕方だけを知っています。他の種類(コード中のタイポやその他)の場合は失敗します。

## さらなる継承 

`ValidationError` クラスはとても汎用的です。色んな種類の誤りがあります。例えば、プロパティが存在しなかったり、誤ったフォーマット(`age` が文字列値のような)など。ここで、存在しないプロパティに対するより具体的なクラス `PropertyRequiredError` を作りましょう。欠落しているプロパティについての追加の情報を保持します。
=======
The `try..catch` block in the code above handles both our `ValidationError` and the built-in `SyntaxError` from `JSON.parse`.

Please take a look at how we use `instanceof` to check for the specific error type in the line `(*)`.

We could also look at `err.name`, like this:

```js
// ...
// instead of (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```

The `instanceof` version is much better, because in the future we are going to extend `ValidationError`, make subtypes of it, like `PropertyRequiredError`. And `instanceof` check will continue to work for new inheriting classes. So that's future-proof.

Also it's important that if `catch` meets an unknown error, then it rethrows it in the line `(**)`. The `catch` block only knows how to handle validation and syntax errors, other kinds (caused by a typo in the code or other unknown reasons) should fall through.

## Further inheritance

The `ValidationError` class is very generic. Many things may go wrong. The property may be absent or it may be in a wrong format (like a string value for `age` instead of a number). Let's make a more concrete class `PropertyRequiredError`, exactly for absent properties. It will carry additional information about the property that's missing.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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

<<<<<<< HEAD
// 使用法
=======
// Usage
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
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

<<<<<<< HEAD
// try..catch での動作例
=======
// Working example with try..catch
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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
<<<<<<< HEAD
    throw err; // 知らないエラーなので、それを再スロー
=======
    throw err; // unknown error, rethrow it
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
  }
}
```

<<<<<<< HEAD
新しいクラス `PropertyRequiredError` は簡単に使えます。プロパティ名を渡すだけです。: `new PropertyRequiredError(property)`。人が読める `message` はコンストラクタで作られます。

`PropertyRequiredError` コンストラクタでの `this.name` は再度手動で割り当てられることに注目してください。カスタムのエラーを作る度に `this.name = <class name>` と代入することには、少しうんざりするかもしれません。が、`this.name = this.constructor.name` を行う "基本エラー" クラスを作り、カスタムエラーはそれを継承することで避けることができます。

これを `MyError` と呼びましょう。

ここでは、単純化した `MyError` のコードと他のカスタムエラークラスを示します。:
=======
The new class `PropertyRequiredError` is easy to use: we only need to pass the property name: `new PropertyRequiredError(property)`. The human-readable `message` is generated by the constructor.

Please note that `this.name` in `PropertyRequiredError` constructor is again assigned manually. That may become a bit tedious -- to assign `this.name = <class name>` in every custom error class. We can avoid it by making our own "basic error" class that assigns `this.name = this.constructor.name`. And then inherit all our custom errors from it.

Let's call it `MyError`.

Here's the code with `MyError` and other custom error classes, simplified:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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

<<<<<<< HEAD
これで、カスタムエラーははるかに短くなりました。特に `ValidationError` はコンストラクタの `"this.name = ..."` の行を除いたので。

## 例外のラッピング 

上のコードの関数 `readUser` の目的は "ユーザデータを読むこと" ですよね？この処理では異なる種類のエラーが起こる可能性があります。今は `SyntaxError` と `ValidationError` を持っていますが、将来 `readUser` 関数が成長し、新たなコードが別の種類のエラーを生み出すかもしれません。

`readUser` を呼び出すコードは、これらのエラーを処理する必要があります。今は `catch` ブロックの中で、異なるエラータイプのチェックと未知のエラーを再スローするために、複数の `if` を使っています。

スキーマはこのようになります:
=======
Now custom errors are much shorter, especially `ValidationError`, as we got rid of the `"this.name = ..."` line in the constructor.

## Wrapping exceptions

The purpose of the function `readUser` in the code above is "to read the user data". There may occur different kinds of errors in the process. Right now we have `SyntaxError` and `ValidationError`, but in the future `readUser` function may grow and probably generate other kinds of errors.

The code which calls `readUser` should handle these errors. Right now it uses multiple `if`s in the `catch` block, that check the class and handle known errors and rethrow the unknown ones.

The scheme is like this:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
try {
  ...
<<<<<<< HEAD
  readUser()  // 潜在的なエラーの原因
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // バリデーションエラーの処理
  } else if (err instanceof SyntaxError) {
    // シンタックスエラーの処理
  } else {
    throw err; // 未知のエラー、再スロー
=======
  readUser()  // the potential error source
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // handle validation errors
  } else if (err instanceof SyntaxError) {
    // handle syntax errors
  } else {
    throw err; // unknown error, rethrow it
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
  }
}
```

<<<<<<< HEAD
上のコードでは2種類のエラーがありますが、他にもありえます。

もし `readUser` 関数が複数の種類のエラーを生成する場合、`readUser` 呼び出しをするすべてのコードで、毎回本当にすべてのエラータイプを1つずつチェックしたいですか？

多くの場合、答えは、"いいえ" です。:　外側のコードは "それらすべての1つ上のレベル" でありたいです。つまり、"データ読み込みエラー" が発生したかどうかが知りたいだけです。発生した正確な理由については、多くの場合は無関心です（エラーメッセージで説明されています）。また、さらに良いのは、必要な場合にのみエラーの詳細を取得する方法があることです。

このテクニックは "例外のラッピング(wrapping exceptions)" と呼ばれます。

1. 汎用的な "データ読み込み" エラーを表現する新しいクラス `ReadError` を作ります。
2. 関数 `readUser` は `ValidationError` や `SyntaxError` のような、内部で発生するデータ読み込みエラーをキャッチし、代わりに `ReadError` を生成します。
3. `ReadError` オブジェクトは自身の `cause` プロパティに元のエラーへの参照を保持します。

`readUser` を呼び出すコードは、`ReadError` だけをチェックする必要があり、他の種類のデータ読み込みエラーのチェックは不要です。そして、エラーの詳細が必要な場合は、その `cause` プロパティで確認できます。

これは、`ReadError` を定義し、`readUser` と `try..catch` でそれを利用するデモです。:
=======
In the code above we can see two types of errors, but there can be more.

If the `readUser` function generates several kinds of errors, then we should ask ourselves: do we really want to check for all error types one-by-one every time?

Often the answer is "No": we'd like to be "one level above all that". We just want to know if there was a "data reading error" -- why exactly it happened is often irrelevant (the error message describes it). Or, even better, we'd like to have a way to get the error details, but only if we need to.

The technique that we describe here is called "wrapping exceptions".

1. We'll make a new class `ReadError` to represent a generic "data reading" error.
2. The function `readUser` will catch data reading errors that occur inside it, such as `ValidationError` and `SyntaxError`, and generate a `ReadError` instead.
3. The `ReadError` object will keep the reference to the original error in its `cause` property.

Then the code that calls `readUser` will only have to check for `ReadError`, not for every kind of data reading errors. And if it needs more details of an error, it can check its `cause` property.

Here's the code that defines `ReadError` and demonstrates its use in `readUser` and `try..catch`:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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

<<<<<<< HEAD
上のコードで、`readUser` は説明されている通りに正確に動作します -- 構文とバリデーションエラーをキャッチし、`ReadError` エラーを代わりにスローします(未知のエラーは通常通り再スローします)。

なので、外部のコードは `instanceof ReadError` をチェックするだけです。可能性のあるすべてのエラータイプをリストする必要はありません。

このアプローチは、"低レベルの例外" を取り除き、呼び出しコードで使用するより抽象的で便利な "ReadError" に "ラップ" するため、"例外のラッピング" と呼ばれます。 オブジェクト指向プログラミングで広く使用されています。

## サマリ 

- `Error` や他の組み込みのエラークラスから継承することができます。そのときは、`name` プロパティに手を入れることと、`super` の呼び出しを忘れないでください。
- 特定のエラーのチェックには `instanceof` が使えます。これは継承している場合にも有効です。しかし、ときにはサードパーティのライブラリから来たエラーオブジェクトを持っていて、簡単にそのクラスを取得する方法がないことがあります。このような場合には `name` プロパティが使えます。
- 例外のラッピングは広く利用されているテクニックです: 関数が低レベルの例外を処理し、それぞれの低レベルの例外の代わりに高レベルのエラーを生成します。低レベルの例外は、上の例の `err.cause` のようにオブジェクトのプロパティになることがありますが、厳密には必須ではありません。
=======
In the code above, `readUser` works exactly as described -- catches syntax and validation errors and throws `ReadError` errors instead (unknown errors are rethrown as usual).

So the outer code checks `instanceof ReadError` and that's it. No need to list all possible error types.

The approach is called "wrapping exceptions", because we take "low level" exceptions and "wrap" them into `ReadError` that is more abstract. It is widely used in object-oriented programming.

## Summary

- We can inherit from `Error` and other built-in error classes normally. We just need to take care of the `name` property and don't forget to call `super`.
- We can use `instanceof` to check for particular errors. It also works with inheritance. But sometimes we have an error object coming from a 3rd-party library and there's no easy way to get its class. Then `name` property can be used for such checks.
- Wrapping exceptions is a widespread technique: a function handles low-level exceptions and creates higher-level errors instead of various low-level ones. Low-level exceptions sometimes become properties of that object like `err.cause` in the examples above, but that's not strictly required.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
