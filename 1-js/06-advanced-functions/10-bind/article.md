libs:
  - lodash

---

# 関数バインディング

オブジェクトメソッドで `setTimeout` 使ったり、オブジェクトメソッドを渡すような場合、"`this` を失う" という既知の問題があります。

突然、`this` が正しく動作するのをやめます。この状況は初心者の開発者には典型的ですが、経験者でも同様に起こりえます。

<<<<<<< HEAD
[cut]

## "this" を失う 
=======
## Losing "this"
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

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

<<<<<<< HEAD
ブラウザにおいて、メソッド `setTimeout` は少し特別です: 関数呼び出しでは `this=window` を設定します(Node.JS では、`this` はタイマーオブジェクトになりますが、ここではほとんど関係ありません)。従って、`this.firstName` は、存在しない `window.firstName` を取得しようとします。他の同様のケースでは、通常 `this` は `undefined` になります。
=======
The method `setTimeout` in-browser is a little special: it sets `this=window` for the function call (for Node.js, `this` becomes the timer object, but doesn't really matter here). So for `this.firstName` it tries to get `window.firstName`, which does not exist. In other similar cases as we'll see, usually `this` just becomes `undefined`.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

このタスクは非常に典型的です -- オブジェクトメソッドをどこか別の場所（ここではスケジューラに渡して）から呼び出したい場合です。それが適切なコンテキストで呼び出されることはどのように確認すればよいでしょう？

## 解決策 1: 囲む 

<<<<<<< HEAD
最もシンプルな解決策はラップされた関数を使うことです:
=======
The simplest solution is to use a wrapping function:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

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
user = { sayHi() { alert("Another user in setTimeout!"); } };

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

sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!
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

## サマリ 

メソッド `func.bind(context, ...args)` はコンテキスト `this` を固定した関数 `func` の "束縛されたバリアント" を返します。

通常は、オブジェクトメソッドで `this` を固定するために `bind` を適用し、どこかに渡すことができるようにします。たとえば、`setTimeout` に。 近代的な開発で "束縛する" 理由はまだまだありますが、私たちは後でそれらを知るでしょう。
