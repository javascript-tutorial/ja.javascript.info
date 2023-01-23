libs:
  - lodash

---

<<<<<<< HEAD
# カリー化と部分適用

今まで、`this` をバインドすることについて話していました。 さあ、もう一歩を進めましょう。

私たちは、`this` だけでなく、引数もバインドすることができます。それはめったにされませんが、便利なときがあります。

[cut]

`bind` の完全な構文です:

```js
let bound = func.bind(context, arg1, arg2, ...);
```

これは、コンテキスト( `this` として)と、関数の開始引数をバインドすることができます。

例えば、乗算関数 `mul(a, b)` を考えます:

```js
function mul(a, b) {
  return a * b;
}
```

これをベースとした関数 `double` を作るために、`bind` を使ってみましょう。:

```js run
*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

`mul.bind(null, 2)` を呼び出すと、`mul` を呼び出す新しい関数 `double` が作成されます。それは、`null` がコンテキストとして、`2` が最初の引数として固定されます。さらに、その他の引数は "そのまま" 渡されます。

これは [関数への部分的な適用(partial function application)](https://en.wikipedia.org/wiki/Partial_application)と呼ばれます -- 既存の関数の一部のパラメータを変更することで新しい関数を作ります。

ここで、例では実際には `this` を使っていないことに注意してください。しかし `bind` はそれを必要とするため、`null` のような何かを指定する必要があります。

下のコードの関数 `triple` は値を3倍にします:

```js run
*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

なぜ、通常部分的な関数を作るのでしょうか？

ここでの我々のメリットは、分かりやすい名前(`double`, `triple`)で独立した関数を作れたことです。私たちはそれを使うことができ、毎回最初の引数を書く必要がありません。なぜなら、`bind` で固定されているからです。

別のケースでは、非常に汎用的な関数を持っており、利便性のために汎用性を減らしたい時に部分適用は役立ちます。

例えば、関数 `send(from, to, text)` を考えます。次に、`user` オブジェクトの内側で、その部分的なバリアントを使いたいかもしれません。: 現在のユーザから送信を行う `sendTo(to, text)` 関数など。


## コンテキストなしの部分適用 

仮に、いくつかの引数を修正したいが、`this` をバインドしない場合はどうなるでしょう？

ネイティブの `bind` ではそれは許可されていません。単にコンテキストを省略し引数にジャンプすることは出来ません。

ただ、幸いにも引数だけをバインドする `partial` 関数は簡単に実装することが出来ます。

このようになります:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// 使い方:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// 最初の引数を固定して何かを表示する部分的なメソッドを追加する
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// このようになります:
// [10:00] Hello, John!
```

`partial(func[, arg1, arg2...])` の呼び出しの結果は次のように `func` を呼び出すラッパー `(*)` です。:
- `this` はそれが取得したものと同じです（`user.sayNow` の場合 `user` です）。
- 次に、`...argsBound` を与えます -- `partial` 呼び出しからの引数(`"10:00"`)です。
- 次に、`...args` です -- ラッパーへ与えられた引数(`"Hello"`) です。

なのでスプレッド演算子を使えば簡単ですね。

また、lodashライブラリの [_.partial](https://lodash.com/docs#partial) 実装も用意されています。

## カリー化(Currying) 

"カリー化" と呼ばれる別のものと、上で言及された関数の部分適用を混同する人もいます。それらはここで言及しておくべき関数を扱う別の興味深いテクニックです。

[Currying](https://en.wikipedia.org/wiki/Currying) は `f(a, b, c)` と呼び出し可能なものを `f(a)(b)(c)` として呼び出しできるように変換します。

２変数関数に対するカリー化を行う関数 `curry` を作ってみましょう。つまり、`f(a, b)` を `f(a)(b)` に変換します。:

```js run
*!*
function curry(func) {
  return function(a) {
    return function(b) {
      return func(a, b);
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
  return function(a) {
    return function(b) {
      return f(a, b);
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    };
  };
}
*/!*

<<<<<<< HEAD
// 使い方
=======
// usage
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
function sum(a, b) {
  return a + b;
}

<<<<<<< HEAD
let carriedSum = curry(sum);

alert( carriedSum(1)(2) ); // 3
```

上でわかるように、実装はラッパーの連続です。

- `curry(func)` の結果はラッパー `function(a)` です。
- `sum(1)` のように呼ばれるとき、引数はレキシカル環境に保存され、新しいラッパー `function(b)` が返却されます。
- そして、最終的に `sum(1)(2)` は `2` で `function(b)` を呼び、それは元の複数引数を取る `sum` を呼びます。

lodash の [_.curry](https://lodash.com/docs#curry) のようなカリー化のより高度な実装は、より洗練された処理を行います。それらの関数は全ての引数が提供された場合には関数が正常に呼び出されるようなラッパーを返し、*そうでない場合* には、部分適用を返します。

```js
function curry(f) {
  return function(..args) {
    // もし args.length == f.length の場合(f と同じ引数がある場合),
    //   呼び出しを f へ渡す
    // それ以外は argsを最初の引数として固定する部分関数を返す
  };
}
```

## カリー化? 何のために? 

高度なカリー化を使用すると、簡単に関数を通常呼び出し可能にしつつ、部分適用をすることができます。このメリットを理解するために、価値のある実例を見る必要があります。

例えば、情報を整形して出力するロギング関数 `log(date, importance, message)` を持っているとします。実際のプロジェクトでは、このような関数には、ネットワーク経由での送信やフィルタリングなど、他にも多くの便利な機能があります。
=======
let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

As you can see, the implementation is straightforward: it's just two wrappers.

- The result of `curry(func)` is a wrapper `function(a)`.
- When it is called like `curriedSum(1)`, the argument is saved in the Lexical Environment, and a new wrapper is returned `function(b)`.
- Then this wrapper is called with `2` as an argument, and it passes the call to the original `sum`.

More advanced implementations of currying, such as [_.curry](https://lodash.com/docs#curry) from lodash library, return a wrapper that allows a function to be called both normally and partially:

```js run
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // using _.curry from lodash library

alert( curriedSum(1, 2) ); // 3, still callable normally
alert( curriedSum(1)(2) ); // 3, called partially
```

## Currying? What for?

To understand the benefits we need a worthy real-life example.

For instance, we have the logging function `log(date, importance, message)` that formats and outputs the information. In real projects such functions have many useful features like sending logs over the network, here we'll just use `alert`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

<<<<<<< HEAD
では、カリー化してみましょう!
=======
Let's curry it!
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
log = _.curry(log);
```

<<<<<<< HEAD
この処理の後でも `log` は通常の方法で動きます:

```js
log(new Date(), "DEBUG", "some debug");
```

...しかしカリー化された形式でも呼び出すことができます:
=======
After that `log` works normally:

```js
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
```

...But also works in the curried form:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

<<<<<<< HEAD
今日のログのための便利な関数を取得してみましょう:

```js
// todayLog は最初の引数が固定された log の一部になります
let todayLog = log(new Date());

// 使ってみます
todayLog("INFO", "message"); // [HH:mm] INFO message
```

また、これで今日のデバッグメッセージのための便利関数ができます:

```js
let todayDebug = todayLog("DEBUG");

todayDebug("message"); // [HH:mm] DEBUG message
```

なので:
1. カリー化をしても何も失いませんでした。: `log` は以前のように呼び出し可能です。
2. 色んなケースに応じて便利な部分適用した関数を生成する事ができました。


## 高度なカリー実装 

ここでは、上記で使用できる "高度な" カリー実装を示します。

```js run
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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
<<<<<<< HEAD

=======
```

Usage examples:

```js
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

<<<<<<< HEAD
// 通常通り呼ぶことも出来ます
alert( curriedSum(1, 2, 3) ); // 6

// curried(1)で部分を取得し、他の2つの引数で呼び出す
alert( curriedSum(1)(2,3) ); // 6

// 完全にカリー化された呼び出し
alert( curriedSum(1)(2)(3) ); // 6
```

新しい `curry` は複雑に見えますが、実際には理解するのはとても簡単です。

`curry(func)` の結果は、このように `curried` のラッパーです。:
=======
alert( curriedSum(1, 2, 3) ); // 6, still callable normally
alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
alert( curriedSum(1)(2)(3) ); // 6, full currying
```

The new `curry` may look complicated, but it's actually easy to understand.

The result of `curry(func)` call is the wrapper `curried` that looks like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// func is the function to transform
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
<<<<<<< HEAD
    return function pass(...args2) { // (2)
=======
    return function(...args2) { // (2)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
      return curried.apply(this, args.concat(args2));
    }
  }
};
```

<<<<<<< HEAD
これを実行すると、2つの分岐があります。:

1. 渡された `args` の数と、元の関数で定義されている引数の数が同じ (`func.length`) かより多い場合、単にそれを呼び出し `func` に渡します。
2. 部分適用を得る: そうでない場合は、`func` はまだ呼ばれません。代わりに別のラッパー `pass` が返却されます。これは `curried` を再度適用して新しい引数と一緒に前の引数を提供します。その後、新しい呼び出しでは、新しい部分適用（引数が不十分な場合）か、最終的に結果が得られます。

例えば、`sum(a, b, c)` のケースで何が起きるのかを見てみましょう。3つの引数があるので、`sum.length = 3` です。

`curried(1)(2)(3)` に対しては次のようになります:

1. 最初の呼び出し `curried(1)` はそのレキシカル環境に `1` を覚え、ラッパー `pass` を返します。
2. ラッパー `pass` は `(2)` で呼び出されます: それは前の引数（`1`)を取り、渡された `(2)` と連結し `curried(1, 2)` を呼び出します。引数の数としては、以前 3 より少ないので、`curry` は `pass` を返します。
3. ラッパー `pass` は再び `(3)` で呼ばれ、次は `pass(3)` が以前の引数 (`1`, `2`) を取り、`3` を追加して `curried(1, 2, 3)` を呼び出します。 -- ついに引数が `3` となったので、それらは元の関数に渡されます。

もしまだ不明瞭であれば、心の中、あるいは紙に呼び出しシーケンスをトレースしてみると良いです。

```smart header="固定長の関数のみ"
カリー化では、関数が固定数の引数を持つ必要があります。
```

```smart header="カリー化よりもさらに"
定義上、カリー化は `sum(a, b, c)` を `sum(a)(b)(c)` に変換するべきです。

しかし、JavaScriptでのカリー化のほとんどの実装は説明されているように高度であり、複数引数のバリアントでも関数が呼び出し可能となっています。
```

## サマリ 

- 私たちが既存の関数のいくつかの引数を修正するとき、結果となる(汎用さは減る)関数は、*部分適用* と呼ばれます。部分適用を得るために `bind` を使うことができますが、他の方法でも可能です。

    同じ引数を何度も繰り返し指定したくないとき、部分適用は便利です。それは、私たちが `send(from, to)` 関数を持っていて,
    `from` が常に同じになるような場合です。部分適用を得て処理を続けることができます。

- *カリー化* は `f(a,b,c)` を `f(a)(b)(c)` として呼び出し可能に変換します。JavaScriptの実装は、通常の形で呼び出し可能な関数を維持し、かつ引数が不足している場合には部分適用を返します。

    簡単な部分適用がほしいときにカリー化は素晴らしいです。ロギングの例で見てきたように、カリー化後の汎用的な関数 `log(date, importance, message)` は、1つの引数 `log(date)` または2つの引数 `log(date, importance)` で呼び出された時には部分適用を返します。
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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
