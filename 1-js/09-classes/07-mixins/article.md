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

```js run
*!*
// mixin
*/!*
let sayHiMixin = {
  sayHi() {
    alert("Hello " + this.name);
  },
  sayBye() {
    alert("Bye " + this.name);
  }
};

*!*
// 使い方:
*/!*
class User {
  constructor(name) {
    this.name = name;
  }
}

// メソッドをコピー
Object.assign(User.prototype, sayHiMixin);

// これで User は sayHi できます
new User("Dude").sayHi(); // Hi Dude!
```

これは継承ではなく、単純なメソッドのコピーです。従って、`User` は他のクラスを拡張することができ、さらに以下のように追加のメソッドをミックスインするとして含めることができます:

```js
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
```

ミックスインは自身の内部で継承を活用することもできます。。

例えば、ここでは `sayHiMixin` は `sayMixin` を継承しています。:

```js run
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
  __proto__: sayMixin, // (またはここで prototype を設定するのに Object.create が使えます)

  sayHi() {
    *!*
    // 親のメソッド呼び出し
    */!*
    super.say("Hello " + this.name);
  },
  sayBye() {
    super.say("Bye " + this.name);
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// メソッドをコピー
Object.assign(User.prototype, sayHiMixin);

// これで User は sayHi できます
new User("Dude").sayHi(); // Hello Dude!
```

`sayHiMixin` からの親メソッド `super.say()` の呼び出しは、クラスではなくそのミックスインのプロトタイプの中のメソッドを探すことに注意してください。

![](mixin-inheritance.png)

これは `sayHiMixin` のメソッドに `[[HomeObject]]` がセットされているからです。そのため、`super` は実際には `sayHiMixin.__proto__`を意味し、`User.__proto__`を意味しません。

## イベントMixin 

さて、実践のためのミックスインを作ってみましょう。

多くのオブジェクトの重要な特徴はイベントを扱うことです。

つまり: オブジェクトには、何か重要な事が起きたときに "イベントを生成する" メソッドが必要であり、他のオブジェクトはこのようなイベントを "リッスン" できる必要があります。

イベントには名前が必要であり、必要に応じて追加データをバンドルする必要があります。

例えば、オブジェクト `user` は訪問者がログインするときに `"login"` というイベントを生成することができます。そして、別オブジェクト `calendar` はログインした人のカレンダーをロードするために、このようなイベントを受けりたいかもしれません。

あるいは、`menu` はメニューアイテムが選択されたときに `"select"` イベントを生成することができ、他のオブジェクトはその情報を取得したりイベントに反応したいかもしれません。

イベントは、それを望む人と "情報を共有する" 方法です。 それらはどのクラスでも役に立ちますので、そのためのミックスインを作ってみましょう:

```js run
let eventMixin = {
  /**
   * イベントの購読, 使い方:
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
   * 購読のキャンセル 使い方:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers && this._eventHandlers[eventName];
    if (!handlers) return;
    for(let i = 0; i < handlers.length; i++) {
      if (handlers[i] == handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * イベントを生成してデータをアタッチ
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return; // イベントに対応するハンドラがない場合
    }

    // ハンドラ呼び出し
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```

ここでは3つのメソッドがあります:

1. `.on(eventName, handler)` -- その名前のイベントが発生した時に実行するための関数 `handler` を割り当てます。ハンドラは `_eventHandlers` プロパティの中に格納されます。
2. `.off(eventName, handler)` -- ハンドラリストから関数を削除します。
3. `.trigger(eventName, ...args)` -- イベントを生成します: すべての割り当てられたハンドラが呼び出され、`args` がそれらの引数として渡されます。

使い方:

```js run
// クラスを作成
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// mixin を追加
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

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
