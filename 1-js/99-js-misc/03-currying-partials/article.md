libs:
  - lodash

---

<<<<<<< HEAD
# カリー化

[カリー化](https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%AA%E3%83%BC%E5%8C%96)は、関数を扱う際の上級テクニックです。これはJavaScriptだけでなく、他の言語でも使用されます。

カリー化は`f(a, b, c)`として呼び出せる関数を`f(a)(b)(c)`のように呼び出せるようにする、関数の変形のことを指します。

カリー化は関数を呼び出しません。ただ変形するだけです。

まず例を確認して、何について話しているかもっと理解して、それから実用的な応用例を見てみましょう。

2引数を取る関数`f`をカリー化する、ヘルパー関数の`curry(f)`を作成します。言い換えると、2引数の`f(a, b)`に対して`curry(f)`は、関数を`f(a)(b)`のように呼び出せるように変形します。

```js run
*!*
function curry(f) { // curry(f)によって変形が施されます
=======
# Currying

[Currying](https://en.wikipedia.org/wiki/Currying) is an advanced technique of working with functions. It's used not only in JavaScript, but in other languages as well.

Currying is a transformation of functions that translates a function from callable as `f(a, b, c)` into callable as `f(a)(b)(c)`.

Currying doesn't call a function. It just transforms it.

Let's see an example first, to better understand what we're talking about, and then practical applications.

We'll create a helper function `curry(f)` that performs currying for a two-argument `f`. In other words, `curry(f)` for two-argument `f(a, b)` translates it into a function that runs as `f(a)(b)`:

```js run
*!*
function curry(f) { // curry(f) does the currying transform
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
*/!*
<<<<<<< HEAD
// 使用法
function sum(a, b) {
  return a + b;
}
let curriedSum = curry(sum);
alert( curriedSum(1)(2) ); // 3
```

ご覧の通り、実装は単純です：これはただの2つのラッパです。

- `curry(func)`は`function(a)`のラッパです。
- これが`curriedSum(1)`のように呼ばれると、引数はレキシカル環境に保存され、新しいラッパである`function(b)`が返されます。
- そしてこのラッパが`2`を引数として呼ばれると、元の`sum`への呼び出しを返します。

例えばloadashライブラリの[_.curry](https://lodash.com/docs#curry)のような、もっと高度なカリー化の実装では、関数を通常通り呼んだり部分的に呼んだりすることが認められるようなラッパが返されます。
=======

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

As you can see, the implementation is straightforward: it's just two wrappers.

- The result of `curry(func)` is a wrapper `function(a)`.
- When it is called like `curriedSum(1)`, the argument is saved in the Lexical Environment, and a new wrapper is returned `function(b)`.
- Then this wrapper is called with `2` as an argument, and it passes the call to the original `sum`.

More advanced implementations of currying, such as [_.curry](https://lodash.com/docs#curry) from lodash library, return a wrapper that allows a function to be called both normally and partially:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
function sum(a, b) {
  return a + b;
}
<<<<<<< HEAD
let curriedSum = _.curry(sum); // loadashライブラリの _.curry を使用します
alert( curriedSum(1, 2) ); // 3, 通常通り呼び出します
alert( curriedSum(1)(2) ); // 3, 部分的に呼び出します
```

## カリー化？なんのために？

利便性を理解するためには、価値のある実例が必要です。

例えば、情報を整形して出力する`log(date, importance, message)`というロギング関数があります。実際のプロジェクトでは、そのような関数はネットワーク越しにログを送信するなどの多様で便利な機能を持っていますが、ここでは単純に`alert`を使用します。

```js run
=======

let curriedSum = _.curry(sum); // using _.curry from lodash library

alert( curriedSum(1, 2) ); // 3, still callable normally
alert( curriedSum(1)(2) ); // 3, called partially
```

## Currying? What for?

To understand the benefits we need a worthy real-life example.

For instance, we have the logging function `log(date, importance, message)` that formats and outputs the information. In real projects such functions have many useful features like sending logs over the network, here we'll just use `alert`:

```js
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

<<<<<<< HEAD
これをカリー化しましょう！
=======
Let's curry it!
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js
log = _.curry(log);
```

<<<<<<< HEAD
そうすると、`log`は通常通り機能します：
=======
After that `log` works normally:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
```

<<<<<<< HEAD
……そしてカリー化後の形式でも機能します：
=======
...But also works in the curried form:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

<<<<<<< HEAD
すると、現在のログ用の便利な関数を簡単に作成できます：

```js
// logNowはlogの部分関数で、第1引数が固定されています
let logNow = log(new Date());

// それを使用します
logNow("INFO", "message"); // [HH:mm] INFO message
```

これで、`logNow`は第1引数が固定された`log`となりました。言い換えれば「部分適用された関数」あるいは短くすると「部分適用」となります。

さらに進んで、現在のデバッグログ用の便利な関数を作成することもできます：

```js
let debugNow = logNow("DEBUG");
debugNow("message"); // [HH:mm] DEBUG message
```

つまり：
1. カリー化しても何も失いません：`log`を通常通り呼び出すこともできます。
2. 今日のログ用のような部分適用された関数を簡単に生成することができます。

## 高度なカリー化の実装

もし詳細に触れたいのならば、こちらが上記でも使用できた、複数の引数を取る関数用の「高度な」カリー化の実装です。

かなり短いです：

```js
function curry(func) {
=======
Now we can easily make a convenience function for current logs:

```js
// logNow will be the partial of log with fixed first argument
let logNow = log(new Date());

// use it
logNow("INFO", "message"); // [HH:mm] INFO message
```

Now `logNow` is `log` with fixed first argument, in other words "partially applied function" or "partial" for short.

We can go further and make a convenience function for current debug logs:

```js
let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message
```

So:
1. We didn't lose anything after currying: `log` is still callable normally.
2. We can easily generate partial functions such as for today's logs.

## Advanced curry implementation

In case you'd like to get in to the details, here's the "advanced" curry implementation for multi-argument functions that we could use above.

It's pretty short:

```js
function curry(func) {

>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
<<<<<<< HEAD
}
```

使用例：
=======

}
```

Usage examples:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js
function sum(a, b, c) {
  return a + b + c;
}
<<<<<<< HEAD
let curriedSum = curry(sum);
alert( curriedSum(1, 2, 3) ); // 6, 普通に呼び出すことも可能です
alert( curriedSum(1)(2,3) ); // 6, 最初の引数をカリー化しています
alert( curriedSum(1)(2)(3) ); // 6, 完全なカリー化です
```

新しい`curry`は複雑なように見えますが、実際は簡単に理解できます。

`curry(func)`呼び出しの結果は、ラップされた以下のような`curried`関数です。

```js
// funcは変形対象の関数です
=======

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, still callable normally
alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
alert( curriedSum(1)(2)(3) ); // 6, full currying
```

The new `curry` may look complicated, but it's actually easy to understand.

The result of `curry(func)` call is the wrapper `curried` that looks like this:

```js
// func is the function to transform
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```

<<<<<<< HEAD
これを実行すると、2つの`if`の分岐に出会います：

1. もし渡された`args`の数が、元の関数で定義されている引数の数以上であれば（`func.length`）、単に`func.apply`を使用して関数を呼び出します。
2. そうでなければ、部分適用します：`func`を単には呼び出しません。その代わりに、別のラッパが返されます。そのラッパは新しい引数とともに、以前与えられた引数を`curried`に再び適用します。

それから繰り返しになりますが、`curried`を呼び出せば、新しい部分適用（引数の数が十分ではない場合）か、最終的には結果が得られます。

```smart header="固定長の関数のみ"
カリー化では、関数の引数の数は固定されている必要があります。

`f(...args)`のような、残りのパラメータを使用するような関数は、このようにはカリー化できません。
```

```smart header="カリー化よりもさらに"
定義上、カリー化は sum(a, b, c) を sum(a)(b)(c) に変換するべきです。

しかし、JavaScriptでのカリー化のほとんどの実装は説明されているように高度であり、複数引数のバリアントでも関数が呼び出し可能となっています。
```

## サマリ



*カリー化*は`f(a,b,c)`を`f(a)(b)(c)`として呼び出し可能に変換します。JavaScriptの実装は、通常の形で呼び出し可能な関数を維持し、かつ引数が不足している場合には部分適用を返します。

簡単な部分適用がほしいときにカリー化は素晴らしいです。ロギングの例で見てきたように、カリー化後の3引数を取る汎用的な関数`log(date, importance, message)`は、（`log(date)`のような）1つの引数または（`log(date, importance)`のような）2つの引数で呼び出された時には部分適用を返します。
=======
When we run it, there are two `if` execution branches:

1. If passed `args` count is the same or more than the original function has in its definition (`func.length`) , then just pass the call to it using `func.apply`. 
2. Otherwise, get a partial: we don't call `func` just yet. Instead, another wrapper is returned, that will re-apply `curried` providing previous arguments together with the new ones. 

Then, if we call it, again, we'll get either a new partial (if not enough arguments) or, finally, the result.

```smart header="Fixed-length functions only"
The currying requires the function to have a fixed number of arguments.

A function that uses rest parameters, such as `f(...args)`, can't be curried this way.
```

```smart header="A little more than currying"
By definition, currying should convert `sum(a, b, c)` into `sum(a)(b)(c)`.

But most implementations of currying in JavaScript are advanced, as described: they also keep the function callable in the multi-argument variant.
```

## Summary

*Currying* is a transform that makes `f(a,b,c)` callable as `f(a)(b)(c)`. JavaScript implementations usually both keep the function callable normally and return the partial if the arguments count is not enough.

Currying allows us to easily get partials. As we've seen in the logging example, after currying the three argument universal function `log(date, importance, message)` gives us partials when called with one argument (like `log(date)`) or two arguments (like `log(date, importance)`).  
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
