<<<<<<< HEAD
# ミックスイン

JavaScriptでは、単一のオブジェクトからのみ継承できます。オブジェクトの `[[Prototype]]` は1つしかありません。そしてクラスは単一の他のクラスだけを拡張することができます。

ですが、それを制限と感じる場面があります。例えば、`StreetSweeper` と `Bicycle` というクラスを持っていて、`StreetSweepingBicycle` を作りたい場合などです。

あるいは、`User` クラスと、イベント生成を実装した `EventEmitter` クラスがあり、`EventEmitter` の機能性を `User` に追加し、user がイベントを emit できるようにしたい、などです。

ここでは、それを助ける "mixins(ミックスイン)" と呼ばれる考え方があります。

Wikipedis の定義によると、[mixin](https://en.wikipedia.org/wiki/Mixin) は他のクラスの親クラスでないが、他のクラスで使用するためのメソッドを含むクラスです。

つまり、*mixin* は特定の振る舞いを実装したメソッドを提供しますが、単独では使わず、別のクラスの振る舞いを追加するために使います。

## mixin の例

JavaScriptで mixin を作る最もシンプルな方法は、役立つメソッドをもつオブジェクトを作ることです。そうすることで、それらを簡単にどのクラスのプロトタイプにもマージできます。

例えば、ここでは mixin `sayHiMixin` は `User` のためのいくつかの "スピーチ" を追加するために使われます。:
=======
# Mixins

In JavaScript we can only inherit from a single object. There can be only one `[[Prototype]]` for an object. And a class may extend only one other class.

But sometimes that feels limiting. For instance, we have a class `StreetSweeper` and a class `Bicycle`, and want to make their mix: a `StreetSweepingBicycle`.

Or we have a class `User` and a class `EventEmitter` that implements event generation, and we'd like to add the functionality of `EventEmitter` to `User`, so that our users can emit events.

There's a concept that can help here, called "mixins".

As defined in Wikipedia, a [mixin](https://en.wikipedia.org/wiki/Mixin) is a class containing methods that can be used by other classes without a need to inherit from it.

In other words, a *mixin* provides methods that implement a certain behavior, but we do not use it alone, we use it to add the behavior to other classes.

## A mixin example

The simplest way to implement a mixin in JavaScript is to make an object with useful methods, so that we can easily merge them into a prototype of any class.

For instance here the mixin `sayHiMixin` is used to add some "speech" for `User`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
*!*
// mixin
*/!*
let sayHiMixin = {
  sayHi() {
<<<<<<< HEAD
    alert("Hello " + this.name);
  },
  sayBye() {
    alert("Bye " + this.name);
=======
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
};

*!*
<<<<<<< HEAD
// 使い方:
=======
// usage:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
class User {
  constructor(name) {
    this.name = name;
  }
}

<<<<<<< HEAD
// メソッドをコピー
Object.assign(User.prototype, sayHiMixin);

// これで User は sayHi できます
new User("Dude").sayHi(); // Hi Dude!
```

これは継承ではなく、単純なメソッドのコピーです。従って、`User` は他のクラスを拡張することができ、さらに以下のように追加のメソッドをミックスインするとして含めることができます:
=======
// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
```

There's no inheritance, but a simple method copying. So `User` may inherit from another class and also include the mixin to "mix-in" the additional methods, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
```

<<<<<<< HEAD
ミックスインは自身の内部で継承を活用することもできます。

例えば、ここでは `sayHiMixin` は `sayMixin` を継承しています。:
=======
Mixins can make use of inheritance inside themselves.

For instance, here `sayHiMixin` inherits from `sayMixin`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
<<<<<<< HEAD
  __proto__: sayMixin, // (またはここで prototype を設定するのに Object.create が使えます)

  sayHi() {
    *!*
    // 親のメソッド呼び出し
    */!*
    super.say("Hello " + this.name); // (*)
  },
  sayBye() {
    super.say("Bye " + this.name); // (*)
=======
  __proto__: sayMixin, // (or we could use Object.setPrototypeOf to set the prototype here)

  sayHi() {
    *!*
    // call parent method
    */!*
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

<<<<<<< HEAD
// メソッドをコピー
Object.assign(User.prototype, sayHiMixin);

// これで User は sayHi できます
new User("Dude").sayHi(); // Hello Dude!
```

`sayHiMixin` からの親メソッド `super.say()` の呼び出し（`(*)` でラベル付けされた行）は、クラスではなくそのミックスインのプロトタイプの中のメソッドを探すことに注意してください。

これがその図です（右の部分を見てください）:

![](mixin-inheritance.svg)

これは、メソッド `sayHi` と `sayBye` は最初に `sayHiMixin` で作成されたためです。そのため、たとえコピーされたとしても、上の図で示す通り、`[[HomeObject]]` 内部プロパティは `sayHiMixin` を参照します。

`super` は `[[HomeObject]].[[Prototype]]` で親メソッドを探すので、これは `User.[[Prototype]]` ではなく、`sayHiMixin.[[Prototype]]` を探すことを意味します。

## イベントMixin 

さて、実践のためのミックスインを作ってみましょう。

多くのブラウザオブジェクト（例えば）の重要な特徴は、イベントを生成できることです。イベントは、それを必要とするものへ "情報をブロードキャスト" する優れた方法です。そのため、簡単にイベントに関連する関数を任意の class/object に追加できるよう minxin を作成しましょう。

- mixin はなにか重要なことが起こったときに、"イベントを生成" するためのメソッド `.trigger(name, [...data])` を提供します。`name` 引数はイベント名で、オプションでイベントデータを含む追加の引数が続きます。
- また、指定された名前のイベントのリスナーとして `handler` 関数を追加するメソッド `.on(name, handler)` も提供します。指定された `name` のイベントがとリガーされたときに呼ばれ、`.trigger` 呼び出しから引数と取得します。
- そして、`handler` リスナーを削除するためのメソッド `.off(name, handler)`。

この minxin を追加したあと、オブジェクト `user` は、訪問者がログインするときに、`"login"` イベントを生成することができるようになります。また、別のオブジェクト、例えば `calendar` はそのようなイベントをリッスンし、ログインした人のカレンダーを読み込みます。

あるいは、`menu` はメニュー項目が選択されたときにイベント `"select"` を生成でき、他のオブジェクトはそのイベントに反応するためにハンドラを割り当てることができます。などです。

これはそのコードです:
=======
// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
```

Please note that the call to the parent method `super.say()` from `sayHiMixin` (at lines labelled with `(*)`) looks for the method in the prototype of that mixin, not the class.

Here's the diagram (see the right part):

![](mixin-inheritance.svg)

That's because methods `sayHi` and `sayBye` were initially created in `sayHiMixin`. So even though they got copied, their `[[HomeObject]]` internal property references `sayHiMixin`, as shown in the picture above.

As `super` looks for parent methods in `[[HomeObject]].[[Prototype]]`, that means it searches `sayHiMixin.[[Prototype]]`.

## EventMixin

Now let's make a mixin for real life.

An important feature of many browser objects (for instance) is that they can generate events. Events are a great way to "broadcast information" to anyone who wants it. So let's make a mixin that allows us to easily add event-related functions to any class/object.

- The mixin will provide a method `.trigger(name, [...data])` to "generate an event" when something important happens to it. The `name` argument is a name of the event, optionally followed by additional arguments with event data.
- Also the method `.on(name, handler)` that adds `handler` function as the listener to events with the given name. It will be called when an event with the given `name` triggers, and get the arguments from the `.trigger` call.
- ...And the method `.off(name, handler)` that removes the `handler` listener.

After adding the mixin, an object `user` will be able to generate an event `"login"` when the visitor logs in. And another object, say, `calendar` may want to listen for such events to load the calendar for the logged-in person.

Or, a `menu` can generate the event `"select"` when a menu item is selected, and other objects may assign handlers to react on that event. And so on.

Here's the code:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let eventMixin = {
  /**
<<<<<<< HEAD
   * イベントの購読, 使い方:
=======
   * Subscribe to event, usage:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
   *  menu.on('select', function(item) { ... }
  */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
<<<<<<< HEAD
   * 購読のキャンセル 使い方:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers && this._eventHandlers[eventName];
    if (!handlers) return;
    for(let i = 0; i < handlers.length; i++) {
      if (handlers[i] == handler) {
=======
   * Cancel the subscription, usage:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
        handlers.splice(i--, 1);
      }
    }
  },

  /**
<<<<<<< HEAD
   * イベントを生成してデータをアタッチ
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return; // イベントに対応するハンドラがない場合
    }

    // ハンドラ呼び出し
=======
   * Generate an event with the given name and data
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return; // no handlers for that event name
    }

    // call the handlers
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```


<<<<<<< HEAD
1. `.on(eventName, handler)` -- その名前のイベントが発生した時に実行するための関数 `handler` を割り当てます。ハンドラは `_eventHandlers` プロパティの中に格納されます。
2. `.off(eventName, handler)` -- ハンドラリストから関数を削除します。
3. `.trigger(eventName, ...args)` -- イベントを生成します: すべての割り当てられたハンドラが呼び出され、`args` がそれらの引数として渡されます。

使い方:

```js run
// クラスを作成
=======
- `.on(eventName, handler)` -- assigns function `handler` to run when the event with that name occurs. Technically, there's an `_eventHandlers` property that stores an array of handlers for each event name, and it just adds it to the list.
- `.off(eventName, handler)` -- removes the function from the handlers list.
- `.trigger(eventName, ...args)` -- generates the event: all handlers from `_eventHandlers[eventName]` are called, with a list of arguments `...args`.

Usage:

```js run
// Make a class
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
<<<<<<< HEAD
// mixin を追加
=======
// Add the mixin with event-related methods
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

<<<<<<< HEAD
// 選択時にハンドラを呼び出し
*!*
menu.on("select", value => alert("Value selected: " + value));
*/!*

// イベントのトリガ => 上のハンドラを実行し次を表示 
// Value selected: 123
menu.choose("123"); // 選択された値
```

これで、もしユーザ選択に反応するためのコードがある場合、`menu.on(...)` でバインドすることができます。

そして、`eventMixin` は継承のチェーンを邪魔することなく、我々が望むだけのクラスに対してこのような振る舞いを追加することができます。

## サマリ 

*Mixin(ミックスイン)* -- は一般的なオブジェクト指向プログラミングの言葉です: 他のクラスのためのメソッドを含むクラスです。

いくつかの他の言語は多重継承をサポートしています。JavaScriptは多重継承をサポートしていませんが、プロトタイプにそれらをコピーすることでミックスインが実装できます。

上で見てきたイベントハンドリングのように、複数の振る舞いを追加することでクラスを拡張する方法としてミックスインが利用できます。

ミックスインで誤って既存のクラスメソッドを上書きすると、競合が発生する可能性があります。そのため、一般的には、このような可能性を最小化するためにも、ミックスインの命名についてよく考える必要があります。
=======
// add a handler, to be called on selection:
*!*
menu.on("select", value => alert(`Value selected: ${value}`));
*/!*

// triggers the event => the handler above runs and shows:
// Value selected: 123
menu.choose("123");
```

Now, if we'd like any code to react to a menu selection, we can listen for it with `menu.on(...)`.

And `eventMixin` mixin makes it easy to add such behavior to as many classes as we'd like, without interfering with the inheritance chain.

## Summary

*Mixin* -- is a generic object-oriented programming term: a class that contains methods for other classes.

Some other languages allow multiple inheritance. JavaScript does not support multiple inheritance, but mixins can be implemented by copying methods into prototype.

We can use mixins as a way to augment a class by adding multiple behaviors, like event-handling as we have seen above.

Mixins may become a point of conflict if they accidentally overwrite existing class methods. So generally one should think well about the naming methods of a mixin, to minimize the probability of that happening.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
