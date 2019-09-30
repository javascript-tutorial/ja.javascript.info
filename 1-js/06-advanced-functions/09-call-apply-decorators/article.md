# デコレータと転送, call/apply

JavaScriptでは関数を扱う際、非常に柔軟性があります。関数は渡され、オブジェクトとして使われます。また、これらの間の呼び出しを *転送* したり、それらを *装飾(デコレータ)* することもできます。ここではそれらの方法を見ていきましょう。


<<<<<<< HEAD
[cut]

## 透過キャッシュ(Transparent caching) 
=======
## Transparent caching
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

CPU負荷は高いが、その結果が不変である関数 `slow(x)` を持っているとします。言い換えると、同じ `x` の場合、常に同じ結果が返ってきます。

<<<<<<< HEAD
もし関数が頻繁に呼ばれた場合、再計算に余分な時間を費やすことを避けるために、異なる `x` の結果をキャッシュ（覚えておく）して欲しいかもしれません。

その機能を `slow()` に追加する代わりに、ラッパーを作りましょう。これから見ていくように、そうすることで多くのメリットがあります。
=======
If the function is called often, we may want to cache (remember) the results to avoid spending extra-time on recalculations.

But instead of adding that functionality into `slow()` we'll create a wrapper function, that adds caching. As we'll see, there are many benefits of doing so.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

コードと説明は次の通りです:

```js run
function slow(x) {
  // CPUを大量に消費するジョブがここにある可能性があります
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
<<<<<<< HEAD
    if (cache.has(x)) { // 結果が map にあれば
      return cache.get(x); // それを返します
    }

    let result = func(x); // なければ func を呼び

    cache.set(x, result); // 結果をキャッシュ(覚える)します
=======
    if (cache.has(x)) {    // if there's such key in cache
      return cache.get(x); // read the result from it
    }

    let result = func(x);  // otherwise call func

    cache.set(x, result);  // and cache (remember) the result
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea
    return result;
  };
}

slow = cachingDecorator(slow);

alert( slow(1) ); // slow(1) はキャッシュされました
alert( "Again: " + slow(1) ); // 同じ

alert( slow(2) ); // slow(2) はキャッシュされました
alert( "Again: " + slow(2) ); // 前の行と同じ
```

上のコード中の `cachingDecorator` は *デコレータ* です: 別の関数を取り、その振る舞いを変更する特別な関数です。

この考え方は、任意の関数で `cachingDecorator` を呼ぶことができ、それはキャッシングラッパーを返します。このような機能を使うことができる多くの関数を持つことができるので、これは素晴らしいことです。また、必要なのは、関数に `cachingDecorator` を適用するだけです。

メインの関数コードからキャッシュ機能を分離することで、コードをシンプルに保つこともできます。

<<<<<<< HEAD
さて、それがどのように動作するのか詳細を見ていきましょう:

`cachingDecorator(func)` の結果は "ラッパー" です: `func(x)` の呼び出しをキャッシュロジックに "ラップ" する `function(x)` です。:

![](decorator-makecaching-wrapper.svg)

上でわかるように、ラッパーは `func(x)` の結果を "そのまま" 返します。外部のコードからは、ラップされた `slow` 関数は、依然として同じことを行い、単にその振る舞いに追加されたキャッシュの側面をもちます。
=======
The result of `cachingDecorator(func)` is a "wrapper": `function(x)` that "wraps" the call of `func(x)` into caching logic:

![](decorator-makecaching-wrapper.svg)

From an outside code, the wrapped `slow` function still does the same. It just got a caching aspect added to its behavior.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

要約すると、`slow` 自身のコードを修正する代わりに、分離した `cachingDecorator` を利用することは、いくつかのメリットがあります。:

<<<<<<< HEAD
- `cachingDecorator` は再利用可能です。私たちは、別の関数に適用することもできます。
- キャッシュロジックは分離されているので、`slow` 自身の複雑性は増加しません。
- 必要に応じて、複数のデコレータを組み合わせることができます（他のデコレータについては次に続きます）。


## コンテキストのために、"func.call" を利用する
=======
- The `cachingDecorator` is reusable. We can apply it to another function.
- The caching logic is separate, it did not increase the complexity of `slow` itself (if there was any).
- We can combine multiple decorators if needed (other decorators will follow).

## Using "func.call" for the context
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

上で言及されたキャッシュデコレータはオブジェクトメソッドで動作するのには適していません。

<<<<<<< HEAD
例えば、下のコードでは、デコレーションの後、`worker.slow()` は動作を停止します:
=======
For instance, in the code below `worker.slow()` stops working after the decoration:
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

```js run
// worker.slow のキャッシングを作成する
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // 実際には、CPUの重いタスクがここにあるとします
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

// 前と同じコード
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func(x); // (**)
*/!*
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // オリジナルメソッドは動きます

worker.slow = cachingDecorator(worker.slow); // キャッシングする

*!*
alert( worker.slow(2) ); // Whoops! Error: Cannot read property 'someMethod' of undefined
*/!*
```

行 `(*)` で、`this.someMethod` にアクセスしようとして失敗してエラーが起きます。なぜかわかりますか？

理由は、ラッパーは行 `(**)` でオリジナル関数を `func(x)` として呼び出すためです。また、そのように呼び出した場合、関数は `this = undefined` となります。


次のコードを実行しようとすると、同様の現象が観察されます:

```js
let func = worker.slow;
func(2);
```

したがって、ラッパーは呼び出しを元のメソッドに渡しますが、コンテキスト `this` は使用しません。 したがって、エラーになります。

これを直しましょう。

明示的に設定した `this` で関数を呼び出すことができる、特別な組み込みの関数メソッド [func.call(context, ...args)](mdn:js/Function/call) があります。

構文は次の通りです:

```js
func.call(context, arg1, arg2, ...)
```

これは、提供された最初の引数を `this` とし、次を引数として `func` を実行します。

これら2つの呼び出しはほとんど同じです:
```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

それらは両方とも `func` を引数 `1`, `2`, `3` で呼び出しています。唯一の違いは、`func.call` は `this` を `obj` にセットしていることです。

例として、下のコードでは異なるオブジェクトのコンテキストで `sayHi` を呼び出しています。: `sayHi.call(user)` は `this=user` を提供する `sayHi` を実行し、次の行で `this=admin` をセットします。:

```js run
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// 別のオブジェクトを "this" として渡すために call を使用する
sayHi.call( user ); // this = John
sayHi.call( admin ); // this = Admin
```

そして、ここでは `call` を使って与えられたコンテキストとフレーズで `say` を呼び出しています。:


```js run
function say(phrase) {
  alert(this.name + ': ' + phrase);
}

let user = { name: "John" };

// user は this になり, "Hello" は最初の引数になります
say.call( user, "Hello" ); // John: Hello
```

<<<<<<< HEAD
我々のケースでは、オリジナルの関数にコンテキストを渡すため、ラッパーの中で `call` を使うことができます。:
=======
In our case, we can use `call` in the wrapper to pass the context to the original function:
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

```js run
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func.call(this, x); // "this" は正しいものが渡されます
*/!*
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // キャッシングします

alert( worker.slow(2) ); // 動作します
alert( worker.slow(2) ); // 動作します（キャッシュが使われます）
```

これで全てうまく行きます。

すべてをクリアにするために、どのように `this` が渡されているか詳しくみてみましょう:

1. デコレーション後の `worker.slow` はラッパー `function (x) { ... }` です。
2. なので、`worker.slow(2)` が実行されるとき、ラッパーは引数として `2` と、`this=worker` を取ります(これはドットの前のオブジェクトになります)。
3. ラッパーの中では、 結果がまだキャッシュされていないと仮定すると、`func.call(this, x)` はオリジナルのメソッドに現在の `this` (`=worker`) と、現在の引数 (`=2`)を渡します。


## "func.apply" で複数の引数を使用する

さて、`cachingDecorator` をより普遍的なものにしましょう。これまでは、単一引数の関数でのみ動作していました。

どのようにして複数の引数の `worker.slow` メソッドをキャッシュするでしょう？

```js
let worker = {
  slow(min, max) {
    return min + max; // 恐ろしいCPU負荷が想定される
  }
};

// 同じ引数呼び出しを覚える必要があります
worker.slow = cachingDecorator(worker.slow);
```

<<<<<<< HEAD
ここでは、それを解決するための2つのタスクがあります。

最初は、`cache` マップのキーに、`min` と `max` 両方の引数を使う方法です。以前は、1つの引数 `x` に対し、単に `cache.set(x, result)` として結果を保存し、`cache.get(x)` でそれを取得していました。しかし、今回は *引数の組み合わせ* `(min,max)` で結果を覚える必要があります。ネイティブの `Map` は1つのキーに1つの値のみを取ります。
=======
Previously, for a single argument `x` we could just `cache.set(x, result)` to save the result and `cache.get(x)` to retrieve it. But now we need to remember the result for a *combination of arguments* `(min,max)`. The native `Map` takes single value only as the key.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

可能な解決策はたくさんあります:

1. より汎用性があり、複数のキーを許可する新しい(もしくは 3rdパーティを使って)マップライクなデータ構造を実装する方法です。
2. 入れ子のマップを使います: `cache.set(min)` は `(max, result)` ペアを格納する `Map` になるでしょう。なので、`cache.get(min).get(max)` で `result` を得ることができます。
3. 2つの値を1つに結合します。今のケースだと、`Map` として文字列 `"min,max"` を使うことができます。柔軟性のために、デコレータに *ハッシュ関数* を提供することもできます。それは多くのものから一つの値を作る方法です。

<<<<<<< HEAD
実用的な多くのアプリケーションでは、第3の策で十分ですので、それで進めます。

解決するための2つ目のタスクは、多くの引数を `func` に渡す方法です。現在ラッパー `function(x)` は１つの引数を想定しており、`func.call(this, x)` はそれを渡します。

ここで、私たちは別の組み込みメソッド [func.apply](mdn:js/Function/apply) を使うことができます。

構文は次の通りです:

```js
func.apply(context, args)
```

これは、`this=context` として設定し、引数のリストとして配列ライクなオブジェクト `args` を使って `func` を実行します。

例えば、これら2つの呼び出しはほぼ同じです:

```js
func(1, 2, 3);
func.apply(context, [1, 2, 3])
```

両方とも、引数 `1,2,3` が与えられた `func` を実行します。しかし、`apply` は `this=context` のセットもします。

例えば、`this=user` と引数のリストとして `messageData` で `say` が呼ばれると次のようになります:

```js run
function say(time, phrase) {
  alert(`[${time}] ${this.name}: ${phrase}`);
}

let user = { name: "John" };

let messageData = ['10:00', 'Hello']; // time と phrase になります

*!*
// user は this　になり, messageData は引数のリストとして渡されます (time, phrase)
say.apply(user, messageData); // [10:00] John: Hello (this=user)
*/!*
```

`call` と `apply` の構文の唯一の違いは、`call` は引数のリストを期待し、`apply` はそれらの配列ライクなオブジェクトを期待している点です。

私たちは既に、チャプター　<info:rest-parameters-spread-operator> で、引数のリストとして配列 (もしくは任意の反復可能(iterable)) を渡すことのできるスプレッド演算子 `...` を知っています。`call` でそれを使う場合、`apply` とほぼ同じ結果になります。

これら2つの呼び出しはほぼほぼ同等です:

```js
let args = [1, 2, 3];

*!*
func.call(context, ...args); // スプレッド演算子として配列を渡すことは
func.apply(context, args);   // apply を使うのと同じです
*/!*
```

より詳しく見ると、 `call` と `apply` の使い方には若干の違いがあります。

- スプレッド演算子 `...` は `call` へのリストとして *反復可能(iterable)* な `args` を渡すことができます。
- `apply` は *配列ライク(array-like)* な `args` のみを許可します。

したがって、これらの呼び出しはお互いを補完します。 反復可能(iterable) が期待されるところでは、 `call` が動作します。配列ライク(array-like)が期待される場合は `apply` が動作します。

また、`args` が 反復可能であり配列ライクである場合は、本当の配列のように、技術的にはどちらを使うことも可能ですが、`apply` は恐らくより高速です。なぜなら、1つの操作だからです。ほとんどのJavaScriptエンジンの内部の最適化は、 `call + spread` のペアよりも良いものです。

`apply` の最も重要な用途の1つは、次のように別の関数へ呼び出しを渡すことです。:

```js
let wrapper = function() {
  return anotherFunction.apply(this, arguments);
};
```

これは *呼び出し転送(call forwarding)* と呼ばれます。 `wrapper` はコンテキスト `this` と `anotherFunction` への引数を取得し、その結果の戻り値を返します。

このような `wrapper` を外部コードが呼び出すと、元の関数の呼び出しと区別できなくなります。

今度はそれをもっと強力な `cachingDecorator` にしましょう。:
=======
For many practical applications, the 3rd variant is good enough, so we'll stick to it.

Also we need to replace `func.call(this, x)` with `func.call(this, ...arguments)`, to pass all arguments to the wrapped function call, not just the first one.

Here's a more powerful `cachingDecorator`:
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

```js run
let worker = {
  slow(min, max) {
    alert(`Called with ${min},${max}`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
*!*
    let key = hash(arguments); // (*)
*/!*
    if (cache.has(key)) {
      return cache.get(key);
    }

*!*
    let result = func.call(this, ...arguments); // (**)
*/!*

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert( worker.slow(3, 5) ); // works
alert( "Again " + worker.slow(3, 5) ); // same (cached)
```

<<<<<<< HEAD
これで、ラッパー任意の数の引数で動作します。
=======
Now it works with any number of arguments (though the hash function would also need to be adjusted to allow any number of arguments. An interesting way to handle this will be covered below).
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

2つの変更をしています:

<<<<<<< HEAD
- 行 `(*)` では、`arguments` から1つのキーを作成するために `hash` を呼び出しています。ここでは、引数 `(3, 5)` をキー `"3,5"` に変換する単純な "結合" 関数を使います。より複雑なケースでは他のハッシュ関数が必要になる場合もあります。
- 次に `(**)` でラッパーが取得したコンテキストとすべての引数(どれだけ多くても問題ありません)を元の関数に渡すために `func.apply` を使っています。
=======
- In the line `(*)` it calls `hash` to create a single key from `arguments`. Here we use a simple "joining" function that turns arguments `(3, 5)` into the key `"3,5"`. More complex cases may require other hashing functions.
- Then `(**)` uses `func.call(this, ...arguments)` to pass both the context and all arguments the wrapper got (not just the first one) to the original function.

Instead of `func.call(this, ...arguments)` we could use `func.apply(this, arguments)`.

The syntax of built-in method [func.apply](mdn:js/Function/apply) is:

```js
func.apply(context, args)
```

It runs the `func` setting `this=context` and using an array-like object `args` as the list of arguments.

The only syntax difference between `call` and `apply` is that `call` expects a list of arguments, while `apply` takes an array-like object with them.

So these two calls are almost equivalent:

```js
func.call(context, ...args); // pass an array as list with spread operator
func.apply(context, args);   // is same as using apply
```
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

There's only a minor difference:

- The spread operator `...` allows to pass *iterable* `args` as the list to `call`.
- The `apply` accepts only *array-like* `args`.

So, these calls complement each other. Where we expect an iterable, `call` works, where we expect an array-like, `apply` works.

And for objects that are both iterable and array-like, like a real array, we technically could use any of them, but `apply` will probably be faster, because most JavaScript engines internally optimize it better.

Passing all arguments along with the context to another function is called *call forwarding*.

That's the simplest form of it:

```js
let wrapper = function() {
  return func.apply(this, arguments);
};
```

When an external code calls such `wrapper`, it is indistinguishable from the call of the original function `func`.

## メソッドの借用(Borrowing a method) 

ハッシュ関数に小さな改善をしてみましょう:

```js
function hash(args) {
  return args[0] + ',' + args[1];
}
```

今のところ、2つの引数にのみ依存しています。任意の数の `args` を指定できるほうがよいでしょう。

自然な対応策は、[arr.join](mdn:js/Array/join) メソッドを使うことです。:

```js
function hash(args) {
  return args.join();
}
```

...残念なことに、これは動作しません。なぜなら私たちが呼んでいる `hash(arguments)` と `arguments` オブジェクトは両方とも 反復可能であり配列ライクではありますが、本当の配列ではありません。

なので下の通り、 `join` の呼び出しは失敗します:

```js run
function hash() {
*!*
  alert( arguments.join() ); // Error: arguments.join is not a function
*/!*
}

hash(1, 2);
```

とは言っても、配列結合を使う簡単な方法があります。:

```js run
function hash() {
*!*
  alert( [].join.call(arguments) ); // 1,2
*/!*
}

hash(1, 2);
```

このトリックは *メソッドの借用(method borrowing)* と呼ばれます。

私たちは、通常の配列から結合メソッドを行いました(借りました): `[].join`。また、`arguments` のコンテキストで実行するため `[].join.call` を使っています。

なぜこれが動作するのでしょう？

これは、ネイティブメソッド `arr.join(glue)` の内部アルゴリズムが非常に単純なためです。

仕様からほとんど "そのまま" です:

1. `glue` を最初の引数にし、引数がない場合はカンマ `","` にします。
2. `result` は空の文字列にします。
3. `this[0]` を `result` に追加します。
4. `glue` と `this[1]` を追加します。
5. `glue` と `this[2]` を追加します。
6. `this.length` の項目が処理されるまで続けます。
7. `result` を返します。

従って、技術的には `this` を取り、`this[0]`, `this[1]` ... などを一緒に結合します。これは意図的に任意の配列ライク(array-like) の `this` を許容する方法で書かれています(多くのメソッドがこの慣習に従っています)。そういうわけで `this=arguments` でも動きます。

<<<<<<< HEAD
## サマリ 
=======
## Decorators and function properties

It is generally safe to replace a function or a method with a decorated one, except for one little thing. If the original function had properties on it, like `func.calledCount` or whatever, then the decorated one will not provide them. Because that is a wrapper. So one needs to be careful if one uses them.

E.g. in the example above if `slow` function had any properties on it, then `cachingDecorator(slow)` is a wrapper without them.

Some decorators may provide their own properties. E.g. a decorator may count how many times a function was invoked and how much time it took, and expose this information via wrapper properties.

There exists a way to create decorators that keep access to function properties, but this requires using a special `Proxy` object to wrap a function. We'll discuss it later in the article <info:proxy#proxy-apply>.

## Summary
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

*デコレータ* は関数の振る舞いを変更するラッパーです。メインの仕事は引き続き元の関数により行われます。

<<<<<<< HEAD
小さい点を除けば、デコレートされた関数またはメソッドへの置き換えは安全です。もし `func.calledCount` のように元の関数がプロパティを持っている場合、デコレートされた関数はそれらを提供しません。なぜなら、それはラッパーだからです。従って、使用する場合は注意する必要があります。 一部のデコレータは独自のプロパティを提供します。

デコレータは、関数に追加できる「機能」または「特徴」として見ることができます。 1つを追加したり、より多く追加することができます。 そして、これらすべてコードを変更することなく行うことができます！
=======
Decorators can be seen as "features" or "aspects" that can be added to a function. We can add one or add many. And all this without changing its code!
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

`cachingDecorator` を実装するために、次のメソッドを学びました:

- [func.call(context, arg1, arg2...)](mdn:js/Function/call) -- `func` を与えられたコンテキストと引数で呼び出します。
- [func.apply(context, args)](mdn:js/Function/apply) -- `context` を `this` とし、配列ライク `args` を引数のリストとして `func` を呼び出します。

一般的な *呼び出し転送(call forwarding)* は通常 `apply` で行われます。:

```js
let wrapper = function() {
  return original.apply(this, arguments);
};
```

<<<<<<< HEAD
また、私たちはオブジェクトからメソッドを取得し、別のオブジェクトのコンテキストでそのメソッドを `呼び出す` と言う、 *メソッドの借用* の例も見ました。配列のメソッドを取り、それらを引数に適用するのはよくあることです。代替としては、本当の配列である残りのパラメータオブジェクトを使うこと、があります。
=======
We also saw an example of *method borrowing* when we take a method from an object and `call` it in the context of another object. It is quite common to take array methods and apply them to `arguments`. The alternative is to use rest parameters object that is a real array.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

多くのデコレータが世の中に出回っています。このチャプターのタスクを解決することで、いかにデコレータが良いものかを確認してください。
