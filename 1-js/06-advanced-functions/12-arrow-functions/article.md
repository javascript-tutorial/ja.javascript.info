# アロー関数ふたたび

アロー関数について改めて考えてみましょう。

<<<<<<< HEAD
アロー関数は小さなものを書くための単なる "簡略化" ではありません。役立つ特徴がいくつかあります。

JavaScriptは、小さな関数を書く必要がある状況に満ちており、それはいろんな場所で実行されます。

例えば:
=======
Arrow functions are not just a "shorthand" for writing small stuff. They have some very specific and useful features.

JavaScript is full of situations where we need to write a small function that's executed somewhere else.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- `arr.forEach(func)` -- `func` は `forEach` によって、すべての配列項目に対して実行されます。
- `setTimeout(func)` -- `func` は組み込みのスケジューラにより実行されます。
- ...もっとあります。

関数を作成してどこかに渡すのは、JavaScriptの真髄です。

そして、このような関数では、私たちは通常現在のコンテキストから離れたくありません。アロー関数はこのようなとき便利です。

<<<<<<< HEAD
## アロー関数は "this" を持っていません 
=======
And in such functions we usually don't want to leave the current context. That's where arrow functions come in handy.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

チャプター <info:object-methods> で覚えているように、アロー関数は `this` を持っていません。もし `this` がアクセスされた場合、それは外側から取られます。

例えば、それを使ってオブジェクトメソッドの内側を反復することができます。:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
*/!*
  }
};

group.showList();
```

`forEach` では、アロー関数が使われているので、その中の `this.title` は外部メソッド `showList` と全く同じです。つまり: `group.title` です。

もし "通常の" 関数を使った場合はエラーになります。:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student);
    });
*/!*
  }
};

group.showList();
```

`forEach` は、デフォルトでは `this=undefined` で関数を実行するので、`undefined.title` へのアクセスへの試みが行われます。そのためエラーが起こります。

これはアロー関数には影響しません。なぜなら、`this` を持っていないためです。

```warn header="アロー関数は `new` で実行することはできません"
`this` を持たないことは当然別の制限を意味します。アロー関数はコンストラクタとして使用できません。 彼らは `new` で呼び出すことはできません。
```

```smart header="アロー関数 VS bind"
アロー関数 `=>` と `.bind(this)` で呼ばれた通常の関数の間には微妙な違いがあります。:

- `.bind(this)` は関数の "バインドされたバージョン" を作ります。
- アロー `=>` はバインディングを作成しません。関数には単に `this` がありません。`this` の検索は通常の変数検索とまったく同じ方法で行われます: 外部のレキシカル環境です。
```

## アロー関数は "arguments" を持ちません 

アロー関数は `arguments` 変数も持っていません。

それは、現在の `this` と `arguments` を使って呼び出しをフォワードする必要があるときなど、デコレータとしてはとても素晴らしいものです。

例えば、`defer(f, ms)` は関数を得て、`ms` ミリ秒で呼び出しを遅らせるラッパーを返します。:

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John 2秒後に
```

アロー関数を使わない場合は次のようになります:

```js
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
```

ここでは、私たちは `setTimeout` 内の関数がそれを受け取るために、余分な変数 `args` と `ctx` を作らなければなりませんでした。

## サマリ 

アロー関数:

<<<<<<< HEAD
- `this` を持ちません。
- `arguments` を持ちません。
- `new` で呼び出すことはできません。
- (`super` も持っていません。が、私たちはまだそれを学んでいませんでした。チャプター <info:class-inheritance> で学習しましょう)。

これは、独自の "コンテキスト" を持たず、むしろ現在のコンテキストで動作するコードの小さい部品を意味するためです。そして、そのようなユースケースで本当に輝きます。
=======
- Do not have `this`
- Do not have `arguments`
- Can't be called with `new`
- They also don't have `super`, but we didn't study it yet. We will on the chapter <info:class-inheritance>

That's because they are meant for short pieces of code that do not have their own "context", but rather work in the current one. And they really shine in that use case.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
