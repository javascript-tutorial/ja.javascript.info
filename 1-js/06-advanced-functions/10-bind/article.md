libs:
  - lodash

---

# 関数バインディング

<<<<<<< HEAD
オブジェクトメソッドで `setTimeout` 使ったり、オブジェクトメソッドを渡すような場合、"`this` を失う" という既知の問題があります。

突然、`this` が正しく動作するのをやめます。この状況は初心者の開発者には典型的ですが、経験者でも同様に起こりえます。

[cut]
=======
When passing object methods as callbacks, for instance to `setTimeout`, there's a known problem: "losing `this`".

In this chapter we'll see the ways to fix it.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

## "this" を失う 

<<<<<<< HEAD
私たちはすでに、JavaScriptでは `this` を失うことが容易であることを知っています。 あるメソッドがオブジェクトから別の場所に渡されると、`this` は失われます。
=======
We've already seen examples of losing `this`. Once a method is passed somewhere separately from the object -- `this` is lost.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

ここで `setTimeout` を利用してどのように起こるのかを示します:

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
ブラウザにおいて、メソッド `setTimeout` は少し特別です: 関数呼び出しでは `this=window` を設定します(Node.JS では、`this` はタイマーオブジェクトになりますが、ここではほとんど関係ありません)。従って、`this.firstName` は、存在しない `window.firstName` を取得しようとします。他の同様のケースでは、通常 `this` は `undefined` になります。
=======
The method `setTimeout` in-browser is a little special: it sets `this=window` for the function call (for Node.js, `this` becomes the timer object, but doesn't really matter here). So for `this.firstName` it tries to get `window.firstName`, which does not exist. In other similar cases, usually `this` just becomes `undefined`.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

このタスクは非常に典型的です -- オブジェクトメソッドをどこか別の場所（ここではスケジューラに渡して）から呼び出したい場合です。それが適切なコンテキストで呼び出されることはどのように確認すればよいでしょう？

## 解決策 1: 囲む 

<<<<<<< HEAD
最もシンプルな解決策はラップされた関数を使うことです:
=======
The simplest solution is to use a wrapping function:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

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
user = { sayHi() { alert("Another user in setTimeout!"); } };
=======
// ...the value of user changes within 1 second
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

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
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b
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

// can run it without an object
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// even if the value of user changes within 1 second
// sayHi uses the pre-bound value
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

say("Hello"); // Hello, John ("Hello" 引数は say に渡されます)
say("Bye"); // Bye, John ("Bye" は say に渡されます)
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

JavaScriptライブラリはまた、便利な大量バインディングのための機能も提供しています。e.g. [_.bindAll(obj)](http://lodash.com/docs#bindAll) in lodash.
````

<<<<<<< HEAD
## サマリ 
=======
## Partial functions

Until now we have only been talking about binding `this`. Let's take it a step further.

We can bind not only `this`, but also arguments. That's rarely done, but sometimes can be handy.

The full syntax of `bind`:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

It allows to bind context as `this` and starting arguments of the function.

For instance, we have a multiplication function `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Let's use `bind` to create a function `double` on its base:

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

The call to `mul.bind(null, 2)` creates a new function `double` that passes calls to `mul`, fixing `null` as the context and `2` as the first argument. Further arguments are passed "as is".

That's called [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- we create a new function by fixing some parameters of the existing one.

Please note that here we actually don't use `this` here. But `bind` requires it, so we must put in something like `null`.

The function `triple` in the code below triples the value:

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

Why do we usually make a partial function?

The benefit is that we can create an independent function with a readable name (`double`, `triple`). We can use it and not provide the first argument every time as it's fixed with `bind`.

In other cases, partial application is useful when we have a very generic function and want a less universal variant of it for convenience.

For instance, we have a function `send(from, to, text)`. Then, inside a `user` object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

## Going partial without context

What if we'd like to fix some arguments, but not the context `this`? For example, for an object method.

The native `bind` does not allow that. We can't just omit the context and jump to arguments.

Fortunately, a helper function `partial` for binding only arguments can be easily implemented.

Like this:

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

// add a partial method with fixed time
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!
```

The result of `partial(func[, arg1, arg2...])` call is a wrapper `(*)` that calls `func` with:
- Same `this` as it gets (for `user.sayNow` call it's `user`)
- Then gives it `...argsBound` -- arguments from the `partial` call (`"10:00"`)
- Then gives it `...args` -- arguments given to the wrapper (`"Hello"`)

So easy to do it with the spread operator, right?

Also there's a ready [_.partial](https://lodash.com/docs#partial) implementation from lodash library.

## Summary
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

メソッド `func.bind(context, ...args)` はコンテキスト `this` を固定した関数 `func` の "束縛されたバリアント" を返します。

<<<<<<< HEAD
通常は、オブジェクトメソッドで `this` を固定するために `bind` を適用し、どこかに渡すことができるようにします。たとえば、`setTimeout` に。 近代的な開発で "束縛する" 理由はまだまだありますが、私たちは後でそれらを知るでしょう。
=======
Usually we apply `bind` to fix `this` for an object method, so that we can pass it somewhere. For example, to `setTimeout`.

When we fix some arguments of an existing function, the resulting (less universal) function is called *partially applied* or *partial*.

Partials are convenient when we don't want to repeat the same argument over and over again. Like if we have a `send(from, to)` function, and `from` should always be the same for our task, we can get a partial and go on with it.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b
