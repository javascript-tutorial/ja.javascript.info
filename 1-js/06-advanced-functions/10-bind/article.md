libs:
  - lodash

---

# 関数バインディング

<<<<<<< HEAD
オブジェクトメソッドで `setTimeout` 使ったり、オブジェクトメソッドを渡すような場合、"`this` を失う" という既知の問題があります。

突然、`this` が正しく動作するのをやめます。この状況は初心者の開発者には典型的ですが、経験者でも同様に起こりえます。

## "this" を失う 
=======
When passing object methods as callbacks, for instance to `setTimeout`, there's a known problem: "losing `this`".

In this chapter we'll see the ways to fix it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

私たちはすでに、JavaScriptでは `this` を失うことが容易であることを知っています。 あるメソッドがオブジェクトから別の場所に渡されると、`this` は失われます。

<<<<<<< HEAD
ここで `setTimeout` を利用してどのように起こるのかを示します:
=======
We've already seen examples of losing `this`. Once a method is passed somewhere separately from the object -- `this` is lost.

Here's how it may happen with `setTimeout`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Hello, undefined!
*/!*
```

上で分かる通り出力は、 `this.firstName` は "John" ではなく、 `undefined` です!

これは、 `setTimeout` はオブジェクトとは別に関数 `user.sayHi` を持っているためです。最後の行はこのように書き直すことができます:

```js
let f = user.sayHi;
setTimeout(f, 1000); // user コンテキストを失います
```

<<<<<<< HEAD
ブラウザにおいて、メソッド `setTimeout` は少し特別です: 関数呼び出しでは `this=window` を設定します(Node.js では、`this` はタイマーオブジェクトになりますが、ここではほとんど関係ありません)。従って、`this.firstName` は、存在しない `window.firstName` を取得しようとします。他の同様のケースでは、通常 `this` は `undefined` になります。
=======
The method `setTimeout` in-browser is a little special: it sets `this=window` for the function call (for Node.js, `this` becomes the timer object, but doesn't really matter here). So for `this.firstName` it tries to get `window.firstName`, which does not exist. In other similar cases, usually `this` just becomes `undefined`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

このタスクは非常に典型的です -- オブジェクトメソッドをどこか別の場所（ここではスケジューラに渡して）から呼び出したい場合です。それが適切なコンテキストで呼び出されることはどのように確認すればよいでしょう？

## 解決策 1: 囲む 

<<<<<<< HEAD
最もシンプルな解決策はラップされた関数を使うことです:
=======
The simplest solution is to use a wrapping function:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
*/!*
```

これは上手く動きます。なぜなら、外部のレキシカル環境から `user` を受け取り、メソッドを普通に呼び出すためです。

これも同じですが、より短い記法です:

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

良く見えますが、コード構造に僅かな脆弱性があります。

仮に `setTimeout` が動く前に(上の例では1秒の遅延があります!)、`user` が値を変更していたら？すると突然、間違ったオブジェクトを呼び出すでしょう!


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

<<<<<<< HEAD
// ...1秒以内に次が行われると
=======
// ...the value of user changes within 1 second
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Another user in setTimeout!
```

次の解決策はこのようなことが起きないことを保証します。

## 解決策 2: bind 

関数は、`this` を固定できる組み込みメソッド [bind](mdn:js/Function/bind) を提供します。

基本の構文は次の通りです:

```js
<<<<<<< HEAD
// より複雑な構文はもう少し後で
=======
// more complex syntax will come a little later
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let boundFunc = func.bind(context);
```

`func.bind(context)` の結果は特別な関数ライクな "エキゾチックオブジェクト(exotic object)" です。これは関数として呼ぶことができ、`func` に `this=context` を透過的に渡します。

言い換えると、`boundFunc` の呼び出しは、固定された `this` での `func` 呼び出しです。

例えば、`funcUser` は `this=user` での `func` 呼び出しを渡します:

```js run  
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John  
*/!*
```

ここで、`func.bind(user)` は `this=user` で固定された `func` の "バインドされたバリアント" となります。

すべての引数はオリジナルの `func` に "そのまま" 渡されます。例:

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// this を user にバインドする
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John (引数 "Hello" が渡され, this=user)
*/!*
```

さて、オブジェクトメソッドで試してみましょう。:


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

<<<<<<< HEAD
// オブジェクトなしで実行可能
=======
// can run it without an object
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

<<<<<<< HEAD
// 1秒以内に user の値が変わったとしても
// sayHi は古い user オブジェクトを参照しているバインド前の値を使用します
=======
// even if the value of user changes within 1 second
// sayHi uses the pre-bound value which is reference to the old user object
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

`(*)` の行で、メソッド `user.sayHi` を `user` にバインドしています。`sayHi` は "束縛(バインド)された" 関数であり、単独もしくは `setTimeout` に渡して呼び出すことができます。

引数が "そのまま" 渡され、`this` だけが `bind` によって固定されていることがわかります:

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

<<<<<<< HEAD
say("Hello"); // Hello, John ("Hello" 引数は say に渡されます)
say("Bye"); // Bye, John ("Bye" は say に渡されます)
=======
say("Hello"); // Hello, John! ("Hello" argument is passed to say)
say("Bye"); // Bye, John! ("Bye" is passed to say)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

````smart header="便利なメソッド: `bindAll`"
もしオブジェクトが多くのメソッドを持ち、それらをバインドする必要がある場合、すべてループでバインドできます。:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

<<<<<<< HEAD
JavaScriptライブラリは、便利な多数のバインドを行うための機能も提供しています。e.g. [_.bindAll(obj)](http://lodash.com/docs#bindAll) in lodash.
````

## 部分関数

これまでは、`this` のバインドについてのみ説明してきました。次のステップにいきましょう。

`this` だけでなく、引数もバインドすることが可能です。これはめったにされませんが、便利な場合があります。

`bind` の完全な構文は次の通りです:
=======
JavaScript libraries also provide functions for convenient mass binding , e.g. [_.bindAll(object, methodNames)](https://lodash.com/docs#bindAll) in lodash.
````

## Partial functions

Until now we have only been talking about binding `this`. Let's take it a step further.

We can bind not only `this`, but also arguments. That's rarely done, but sometimes can be handy.

The full syntax of `bind`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

<<<<<<< HEAD
context を `this`　とし、関数の開始引数をバインドすることができます。

例えば、乗算関数 `mul(a, b)` があるとします:
=======
It allows to bind context as `this` and starting arguments of the function.

For instance, we have a multiplication function `mul(a, b)`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
function mul(a, b) {
  return a * b;
}
```

<<<<<<< HEAD
これをベースに、`bind` を使用して、`double` 関数を作成しましょう。:
=======
Let's use `bind` to create a function `double` on its base:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

<<<<<<< HEAD
`mul.bind(null, 2)` の呼び出しで新しい関数 `double` を作成し、これはコンテキストを `null`、最初の引数を `2` で固定した `mul` を呼び出します。それ以降の引数は "そのまま" 渡されます。

これは [部分関数アプリケーション](https://en.wikipedia.org/wiki/Partial_application) と呼ばれ、既存のパラメータのいくつかを固定にすることで新しい関数を作成します。

実際にはここでは `this` は使用しないことに留意してください。ですが、`bind` で指定が必要なので `null` など何かしらを置く必要があります。

以下のコードの関数 `triple` は値を3倍します。:
=======
The call to `mul.bind(null, 2)` creates a new function `double` that passes calls to `mul`, fixing `null` as the context and `2` as the first argument. Further arguments are passed "as is".

That's called [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- we create a new function by fixing some parameters of the existing one.

Please note that we actually don't use `this` here. But `bind` requires it, so we must put in something like `null`.

The function `triple` in the code below triples the value:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

<<<<<<< HEAD
なぜ部分関数を作るのでしょうか？

メリットは、読みやすい名前（`double`, `triple`）で独立した関数を作ることができることです。`bind` で固定されているため、毎回最初の引数を指定する必要がありません。

他のケースでは、非常に一般的な関数がある状態で、便利さのために特定用途のパターンが欲しい場合に部分関数は役立ちます。

例えば、関数 `send(from, to, text)` があるとします。`user` オブジェクトの中で、その部分パターンを使用したい場合、現在のユーザから送信をする関数 `sendTo(to, text)` 。

## Going partial without context

仮に引数のいくつかを固定したいけど、コンテキスト `this` は固定したくない場合はどうしますか？例えば、オブジェクトメソッドです。

ネイティブの `bind` はそれは許可しません。コンテキストを省略して引数だけ指定することはできません。

幸いなことに、引数だけをバインドするための関数 `partial` は簡単に実装できます。

次のようになります:
=======
Why do we usually make a partial function?

The benefit is that we can create an independent function with a readable name (`double`, `triple`). We can use it and not provide the first argument every time as it's fixed with `bind`.

In other cases, partial application is useful when we have a very generic function and want a less universal variant of it for convenience.

For instance, we have a function `send(from, to, text)`. Then, inside a `user` object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

## Going partial without context

What if we'd like to fix some arguments, but not the context `this`? For example, for an object method.

The native `bind` does not allow that. We can't just omit the context and jump to arguments.

Fortunately, a function `partial` for binding only arguments can be easily implemented.

Like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// Usage:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

<<<<<<< HEAD
// 固定時間で部分メソッドを追加
=======
// add a partial method with fixed time
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!
```

<<<<<<< HEAD
`partial(func[, arg1, arg2...])`呼び出しの結果は以下をもつ `func` を呼び出すラッパー `(*)`です。
- 取得したものと同じ `this`（`user.sayNow` 呼び出しの場合、`user`）
- 次に `...argsBound` を指定します。`partial` 呼び出しからの引数 (`"10:00"`)
- 次に `...args`。ラッパーに与えられた引数(`"Hello"`)

なので、スプレッド構文で簡単に行うことができます。

また、lodash ライブラリでは、[_.partial](https://lodash.com/docs#partial) 実装が用意されています。

## サマリ 

メソッド `func.bind(context, ...args)` はコンテキスト `this` を固定した関数 `func` の "束縛されたバリアント" を返します。

通常は、オブジェクトメソッドで `this` を固定するために `bind` を適用し、どこかに渡すことができるようにします。たとえば、`setTimeout` に。 
=======
The result of `partial(func[, arg1, arg2...])` call is a wrapper `(*)` that calls `func` with:
- Same `this` as it gets (for `user.sayNow` call it's `user`)
- Then gives it `...argsBound` -- arguments from the `partial` call (`"10:00"`)
- Then gives it `...args` -- arguments given to the wrapper (`"Hello"`)

So easy to do it with the spread syntax, right?

Also there's a ready [_.partial](https://lodash.com/docs#partial) implementation from lodash library.

## Summary
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

When we fix some arguments of an existing function, the resulting (less universal) function is called *partially applied* or *partial*.

<<<<<<< HEAD
=======
Usually we apply `bind` to fix `this` for an object method, so that we can pass it somewhere. For example, to `setTimeout`.

When we fix some arguments of an existing function, the resulting (less universal) function is called *partially applied* or *partial*.

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
Partials are convenient when we don't want to repeat the same argument over and over again. Like if we have a `send(from, to)` function, and `from` should always be the same for our task, we can get a partial and go on with it.
