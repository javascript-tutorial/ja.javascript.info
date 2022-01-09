libs:
  - lodash

---

# 関数バインディング

オブジェクトメソッドで `setTimeout` 使ったり、オブジェクトメソッドを渡すような場合、"`this` を失う" という既知の問題があります。

突然、`this` が正しく動作するのをやめます。この状況は初心者の開発者には典型的ですが、経験者でも同様に起こりえます。

## "this" を失う 

私たちはすでに、JavaScriptでは `this` を失うことが容易であることを知っています。 あるメソッドがオブジェクトから別の場所に渡されると、`this` は失われます。

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

ブラウザにおいて、メソッド `setTimeout` は少し特別です: 関数呼び出しでは `this=window` を設定します(Node.js では、`this` はタイマーオブジェクトになりますが、ここではほとんど関係ありません)。従って、`this.firstName` は、存在しない `window.firstName` を取得しようとします。他の同様のケースでは、通常 `this` は `undefined` になります。

このタスクは非常に典型的です -- オブジェクトメソッドをどこか別の場所（ここではスケジューラに渡して）から呼び出したい場合です。それが適切なコンテキストで呼び出されることはどのように確認すればよいでしょう？

## 解決策 1: 囲む 

最もシンプルな解決策はラップされた関数を使うことです:

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

// ...1秒以内に次が行われると
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Another user in setTimeout?!?
```

次の解決策はこのようなことが起きないことを保証します。

## 解決策 2: bind 

関数は、`this` を固定できる組み込みメソッド [bind](mdn:js/Function/bind) を提供します。

基本の構文は次の通りです:

```js
// より複雑な構文はもう少し後で
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

// オブジェクトなしで実行可能
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// 1秒以内に user の値が変わったとしても
// sayHi は古い user オブジェクトを参照しているバインド前の値を使用します
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

JavaScriptライブラリは、便利な多数のバインドを行うための機能も提供しています。e.g. [_.bindAll(obj)](http://lodash.com/docs#bindAll) in lodash.
````

## 部分関数

これまでは、`this` のバインドについてのみ説明してきました。次のステップにいきましょう。

`this` だけでなく、引数もバインドすることが可能です。これはめったにされませんが、便利な場合があります。

`bind` の完全な構文は次の通りです:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

context を `this`　とし、関数の開始引数をバインドすることができます。

例えば、乗算関数 `mul(a, b)` があるとします:

```js
function mul(a, b) {
  return a * b;
}
```

これをベースに、`bind` を使用して、`double` 関数を作成しましょう。:

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

`mul.bind(null, 2)` の呼び出しで新しい関数 `double` を作成し、これはコンテキストを `null`、最初の引数を `2` で固定した `mul` を呼び出します。それ以降の引数は "そのまま" 渡されます。

これは [部分関数アプリケーション](https://en.wikipedia.org/wiki/Partial_application) と呼ばれ、既存のパラメータのいくつかを固定にすることで新しい関数を作成します。

実際にはここでは `this` は使用しないことに留意してください。ですが、`bind` で指定が必要なので `null` など何かしらを置く必要があります。

以下のコードの関数 `triple` は値を3倍します。:

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

なぜ部分関数を作るのでしょうか？

メリットは、読みやすい名前（`double`, `triple`）で独立した関数を作ることができることです。`bind` で固定されているため、毎回最初の引数を指定する必要がありません。

他のケースでは、非常に一般的な関数がある状態で、便利さのために特定用途のパターンが欲しい場合に部分関数は役立ちます。

例えば、関数 `send(from, to, text)` があるとします。`user` オブジェクトの中で、その部分パターンを使用したい場合、現在のユーザから送信をする関数 `sendTo(to, text)` 。

## Going partial without context

仮に引数のいくつかを固定したいけど、コンテキスト `this` は固定したくない場合はどうしますか？例えば、オブジェクトメソッドです。

ネイティブの `bind` はそれは許可しません。コンテキストを省略して引数だけ指定することはできません。

幸いなことに、引数だけをバインドするための関数 `partial` は簡単に実装できます。

次のようになります:

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

// 固定時間で部分メソッドを追加
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!
```

`partial(func[, arg1, arg2...])`呼び出しの結果は以下をもつ `func` を呼び出すラッパー `(*)`です。
- 取得したものと同じ `this`（`user.sayNow` 呼び出しの場合、`user`）
- 次に `...argsBound` を指定します。`partial` 呼び出しからの引数 (`"10:00"`)
- 次に `...args`。ラッパーに与えられた引数(`"Hello"`)

なので、スプレッド構文で簡単に行うことができます。

また、lodash ライブラリでは、[_.partial](https://lodash.com/docs#partial) 実装が用意されています。

## サマリ 

メソッド `func.bind(context, ...args)` はコンテキスト `this` を固定した関数 `func` の "束縛されたバリアント" を返します。

通常は、オブジェクトメソッドで `this` を固定するために `bind` を適用し、どこかに渡すことができるようにします。たとえば、`setTimeout` に。 

When we fix some arguments of an existing function, the resulting (less universal) function is called *partially applied* or *partial*.

Partials are convenient when we don't want to repeat the same argument over and over again. Like if we have a `send(from, to)` function, and `from` should always be the same for our task, we can get a partial and go on with it.
