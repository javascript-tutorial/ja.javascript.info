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

ミックスインは自身の内部で継承を活用することもできます。

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
    super.say("Hello " + this.name); // (*)
  },
  sayBye() {
    super.say("Bye " + this.name); // (*)
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
