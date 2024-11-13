# デコレータと転送, call/apply

JavaScript は関数を処理する際、非常に高い柔軟性を提供します。関数は渡され、オブジェクトとして使われます。ここでは、これらの間の呼び出しを *転送* したり、*装飾(デコレータ)* する方法を説明します。

## 透過キャッシュ(Transparent caching) 

CPU負荷は高いが、その結果が不変である関数 `slow(x)` があるとします。言い換えると、同じ `x` の場合、常に同じ結果が返ってきます。

もし関数が頻繁に呼ばれる場合、再計算に余分な時間を費やすことを避けるため、結果をキャッシュ（覚えておく）して欲しいかもしれません。

その機能を `slow()` に追加する代わりに、ラッパーを作りましょう。これから見ていくように、そうすることで多くのメリットがあります。

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
    if (cache.has(x)) { // 結果が map にあれば
      return cache.get(x); // それを返します
    }

    let result = func(x); // なければ func を呼び

    cache.set(x, result); // 結果をキャッシュ(覚える)します
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

`cachingDecorator(func)` の結果は "ラッパー" です: `func(x)` の呼び出しをキャッシュロジックに "ラップ" する `function(x)` です。:

![](decorator-makecaching-wrapper.svg)

上でわかるように、ラッパーは `func(x)` の結果を "そのまま" 返します。外部のコードからは、ラップされた `slow` 関数は、依然として同じことを行い、単にその振る舞いに追加されたキャッシュの側面をもちます。

要約すると、`slow` 自身のコードを修正する代わりに、分離した `cachingDecorator` を利用することは、いくつかのメリットがあります。:

- `cachingDecorator` は再利用可能です。私たちは、別の関数に適用することもできます。
- キャッシュロジックは分離されているので、`slow` 自身の複雑性は増加しません。
- 必要に応じて、複数のデコレータを組み合わせることができます（他のデコレータについては次に続きます）。

## コンテキストのために、"func.call" を利用する

上で言及されたキャッシュデコレータはオブジェクトメソッドで動作するのには適していません。

例えば、下のコードでは、デコレーションの後、`worker.slow()` は動作を停止します:

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

理由は、ラッパーは行 `(**)` でオリジナル関数を `func(x)` として呼び出すためです。また、このように呼び出した場合、関数は `this = undefined` となります。

次のコードを実行しようとすると、同様の現象が見られます:

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

我々のケースでは、オリジナルの関数にコンテキストを渡すため、ラッパーの中で `call` を使うことができます。:

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

## 複数の引数

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

以前は、1つの引数 `x` に対し、単に `cache.set(x, result)` として結果を保存し、`cache.get(x)` でそれを取得していました。しかし、今回は *引数の組み合わせ* `(min,max)` で結果を覚える必要があります。ネイティブの `Map` は1つのキーに1つの値のみを取ります。

可能な解決策はたくさんあります:

1. より汎用性があり、複数のキーを許可する新しい(もしくは 3rdパーティを使って)マップライクなデータ構造を実装する方法です。
2. 入れ子のマップを使います: `cache.set(min)` は `(max, result)` ペアを格納する `Map` になるでしょう。なので、`cache.get(min).get(max)` で `result` を得ることができます。
3. 2つの値を1つに結合します。今のケースだと、`Map` として文字列 `"min,max"` を使うことができます。柔軟性のために、デコレータに *ハッシュ関数* を提供することもできます。それは多くのものから一つの値を作る方法です。

実用的な多くのアプリケーションでは、第3の策で十分ですので、それで進めます。

また、`func.call` で `x` だけでなくすべての引数を渡す必要があります。`function()` の中で、 `arguments` として引数の疑似配列を取得できるので、`func.call(this,x)` を `func.call(this, ...arguments)` に置き換えます。

これはより強力な `cachingDecorator` です:

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

これで任意の数の引数でも動作します（ただし、ハッシュ関数も任意の数の引数を許可するように調整する必要があります。これを処理する興味深い方法については、以下で説明します）。

2つの変更があります:

- 行 `(*)` では、`hash` を呼び出し、`arguments` から単一のキーを生成しています。ここではシンプルな "結合" 関数を使用しています（引数 `(3, 5)` をキー `"3,5"` にする）。より複雑なケースでは他のハッシュ関数を必要とするかもしれません。
- その後、`(**)` で`func.call(this, ...arguments)` を使用して、コンテキストとラッパーが取得したすべての引数をオリジナルの関数に渡しています。

### func.apply

`func.call(this, ...arguments)` の代わりに `func.apply(this, arguments)` を利用することができます。

組み込みメソッド [func.apply](mdn:js/Function/apply) の構文は以下の通りです:

```js
func.apply(context, args)
```

これは、`this=context` として設定し、引数のリストとして配列ライクなオブジェクト `args` を使って `func` を実行します。

`call` と `apply` の構文の唯一の違いは、`call` は引数のリストを期待し、`apply` はそれらの配列ライクなオブジェクトを期待している点です。

そのため、これら2つの呼び出しはほぼ同等です:

```js
func.call(context, ...args);
func.apply(context, args);
```

これらは与えられたコンテキストと引数で `func` 呼び出しを実行します。

`apply` の使い方には若干の違いがあります。

- スプレッド演算子 `...` は `call` へのリストとして *反復可能(iterable)* な `args` を渡すことができます。
- `apply` は *配列ライク(array-like)* な `args` のみを許可します。

...また、実際の配列など、反復可能かつ配列ライクなオブジェクトの場合は、任意のいずれかを使用できますが、多くの JavaScript エンジンで内部の最適化がされるため、`apply` の方が恐らく高速です。

コンテキストと一緒にすべての引数を別の関数にわたすことは、*call forwarding（呼び出しの転送）* と言われます。

最もシンプルな形は以下です：

```js
let wrapper = function() {
  return func.apply(this, arguments);
};
```

外部のコードがこのような `wrapper` は呼び出すと、元の関数 `func` の呼び出しと見分けはつきません。

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

## デコレータと関数プロパティ

一般的に、1つの小さい点を除けば、デコレートされている関数やメソッドを置き換えるのは安全です。もしオリジナルの関数に `func.calledCount` といったようなプロパティが含まれている場合、デコレートされた関数はラッパーであるためそれらは提供しません。したがって、それらを利用する際には注意が必要です。

E.g. 上記の例では、`slow` 関数にあるプロパティが含まれている場合、`cachingDecorator(slow)` はそれを持たないラッパーです。

一部のデコレータは独自のプロパティを提供することがあります。E.g. 関数が何回実行されたか、どれだけ時間がかかったかをカウントし、ラッパープロパティを介してこの情報を公開する、といったケースです。

関数のプロパティへのアクセスを維持するデコレータを作成する方法はありますが、これには、関数をラップするために特別な `Proxy` オブジェクトを使用する必要があります。これについては、後ほど <info:proxy#proxy-apply> で説明します。

## サマリ 

*デコレータ* は関数の振る舞いを変更するラッパーです。メインの仕事は引き続き元の関数により行われます。

デコレータは、関数に追加できる「機能」または「特徴」として見ることができます。 1つを追加したり、より多く追加することができます。 そして、これらすべてコードを変更することなく行うことができます！

`cachingDecorator` を実装するために、次のメソッドを学びました:

- [func.call(context, arg1, arg2...)](mdn:js/Function/call) -- `func` を与えられたコンテキストと引数で呼び出します。
- [func.apply(context, args)](mdn:js/Function/apply) -- `context` を `this` とし、配列ライク `args` を引数のリストとして `func` を呼び出します。

一般的な *呼び出し転送(call forwarding)* は通常 `apply` で行われます。:

```js
let wrapper = function() {
  return original.apply(this, arguments);
}
```

また、私たちはオブジェクトからメソッドを取得し、別のオブジェクトのコンテキストでそのメソッドを呼び出すと言う、 *メソッドの借用* の例も見ました。配列のメソッドを取り、それらを引数 `arguments` に適用するのはよくあることです。代替としては、本当の配列である残りのパラメータオブジェクトを使うこと、があります。

多くのデコレータが世の中に出回っています。このチャプターのタスクを解決することで、いかにデコレータが良いものかを確認してください。
