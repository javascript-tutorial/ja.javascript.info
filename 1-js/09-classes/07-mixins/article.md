<<<<<<< HEAD
# ミックスイン

JavaScriptでは、単一のオブジェクトからのみ継承できます。オブジェクトの `[[Prototype]]` は1つしかありません。そしてクラスは1つの他のクラスだけを拡張することができます。

しかし、それを制限と感じる場合があります。例えば、`StreetSweeper` と `Bycicle` というクラスを持っていて、`StreetSweepingBycicle` を作りたい場合などです。

あるいは `Renderer` クラスとイベントハンドラを実装する `EventEmitter` クラスを持っていて、テンプレートとイベントの発火を利用できるページを作るために、`Page` クラスで一緒にそれらの機能性をマージしたい場合があります。

ここでは、それを助ける "mixins(ミックスイン)" と呼ばれるコンセプトがあります。

Wikipedis の定義によると、[mixin](https://en.wikipedia.org/wiki/Mixin) は他のクラスの親クラスでないが、他のクラスで使用するためのメソッドを含むクラスです。

つまり、*mixin* は特定の振る舞いを実装したメソッドを提供しますが、単独では使わず、別のクラスの振る舞いを追加するために使います。


## mixin のサンプル

JavaScriptで mixin を作る最もシンプルな方法は、役立つメソッドをもつオブジェクトを作ることです。そのすることで、それらを簡単にどのクラスのプロトタイプにもマージすることができます。

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
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

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
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
  }
};

*!*
<<<<<<< HEAD
// 使い方:
=======
// usage:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
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
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
```

<<<<<<< HEAD
ミックスインは自身の内部で継承を活用することもできます。。

例えば、ここでは `sayHiMixin` は `sayMixin` を継承しています。:
=======
Mixins can make use of inheritance inside themselves.

For instance, here `sayHiMixin` inherits from `sayMixin`:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

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
    super.say("Hello " + this.name);
  },
  sayBye() {
    super.say("Bye " + this.name);
=======
  __proto__: sayMixin, // (or we could use Object.create to set the prototype here)

  sayHi() {
    *!*
    // call parent method
    */!*
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
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

`sayHiMixin` からの親メソッド `super.say()` の呼び出しは、クラスではなくそのミックスインのプロトタイプの中のメソッドを探すことに注意してください。

![](mixin-inheritance.svg)

これは `sayHiMixin` のメソッドに `[[HomeObject]]` がセットされているからです。そのため、`super` は実際には `sayHiMixin.__proto__`を意味し、`User.__proto__`を意味しません。

## イベントMixin 

さて、実践のためのミックスインを作ってみましょう。

多くのオブジェクトの重要な特徴はイベントを扱うことです。

つまり: オブジェクトには、何か重要な事が起きたときに "イベントを生成する" メソッドが必要であり、他のオブジェクトはこのようなイベントを "リッスン" できる必要があります。

イベントには名前が必要であり、必要に応じて追加データをバンドルする必要があります。

例えば、オブジェクト `user` は訪問者がログインするときに `"login"` というイベントを生成することができます。そして、別オブジェクト `calendar` はログインした人のカレンダーをロードするために、このようなイベントを受けりたいかもしれません。

あるいは、`menu` はメニューアイテムが選択されたときに `"select"` イベントを生成することができ、他のオブジェクトはその情報を取得したりイベントに反応したいかもしれません。

イベントは、それを望む人と "情報を共有する" 方法です。 それらはどのクラスでも役に立ちますので、そのためのミックスインを作ってみましょう:
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

As `super` looks for parent methods in `[[HomeObject]].[[Prototype]]`, that means it searches `sayHiMixin.[[Prototype]]`, not `User.[[Prototype]]`.

## EventMixin

Now let's make a mixin for real life.

An important feature of many browser objects (for instance) is that they can generate events. Events are a great way to "broadcast information" to anyone who wants it. So let's make a mixin that allows us to easily add event-related functions to any class/object.

- The mixin will provide a method `.trigger(name, [...data])` to "generate an event" when something important happens to it. The `name` argument is a name of the event, optionally followed by additional arguments with event data.
- Also the method `.on(name, handler)` that adds `handler` function as the listener to events with the given name. It will be called when an event with the given `name` triggers, and get the arguments from the `.trigger` call.
- ...And the method `.off(name, handler)` that removes the `handler` listener.

After adding the mixin, an object `user` will be able to generate an event `"login"` when the visitor logs in. And another object, say, `calendar` may want to listen for such events to load the calendar for the logged-in person.

Or, a `menu` can generate the event `"select"` when a menu item is selected, and other objects may assign handlers to react on that event. And so on.

Here's the code:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
let eventMixin = {
  /**
<<<<<<< HEAD
   * イベントの購読, 使い方:
=======
   * Subscribe to event, usage:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
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
=======
   * Cancel the subscription, usage:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers && this._eventHandlers[eventName];
    if (!handlers) return;
<<<<<<< HEAD
    for(let i = 0; i < handlers.length; i++) {
      if (handlers[i] == handler) {
=======
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
        handlers.splice(i--, 1);
      }
    }
  },

  /**
<<<<<<< HEAD
   * イベントを生成してデータをアタッチ
=======
   * Generate an event with the given name and data
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
<<<<<<< HEAD
      return; // イベントに対応するハンドラがない場合
    }

    // ハンドラ呼び出し
=======
      return; // no handlers for that event name
    }

    // call the handlers
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```

<<<<<<< HEAD
ここでは3つのメソッドがあります:

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
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
<<<<<<< HEAD
// mixin を追加
=======
// Add the mixin with event-related methods
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

<<<<<<< HEAD
// 選択時にハンドラを呼び出し
*!*
menu.on("select", value => alert("Value selected: " + value));
*/!*

// イベントのトリガ => Value selected: 123 を表示
menu.choose("123"); // 選択された値
```

これで、もしユーザ選択に反応するためのコードがある場合、`menu.on(...)` でバインドすることができます。

そして、`eventMixin` は継承のチェーンを邪魔することなく、我々が望むだけのクラスに対してこのような振る舞いを追加することができます。

## サマリ 

*Mixin(ミックスイン)* -- は一般的なオブジェクト指向プログラミングの言葉です: 他のクラスのためのメソッドを含むクラスです。

python のようないくつかの他の言語は、多重継承を使いミックスインを作成することができます。JavaScriptでは多重継承をサポートしていませんが、プロトタイプにそれらをコピーすることでミックスインを実装することができます。

上で見てきたように、イベントハンドリングのような複数の振る舞いによってクラスを拡張する方法としてミックスインが利用できます。

時折、ミックスインがネイティブのクラスメソッドを上書きすると、矛盾する点になることがあります。なので、一般的にはこのような可能性を最小化するために、ミックスインの名付けについてよく考える必要があります。
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
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
