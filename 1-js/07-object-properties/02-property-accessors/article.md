
# プロパティ getters と setters

オブジェクトプロパティには2種類あります。

１つ目は *データプロパティ* です。我々は既にそれがどのように動作するのか知っています。実際、これまで使ってきたすべてのプロパティはデータプロパティでした。

2つ目のプロパティの種類は新しいものです。それは *アクセサプロパティ* です。これらは基本的には値の取得やセットをする関数ですが、外部コードからは通常のプロパティのように見えます。

## Getters と setters

アクセサプロパティは "getter" と "setter" メソッドで表現されます。オブジェクトリテラルでは、`get` と `set` で表されます:

```js
let obj = {
  *!*get propName()*/!* {
    // getter, obj.propName を取得するときにコードが実行されます
  },

  *!*set propName(value)*/!* {
    // setter, obj.propName = value 時にコードが実行されます
  }
};
```

`obj.propName` が読まれたときに getter は動作し、setter は割り当てられたときに動作します。

例えば、`name` と `surname` を持つ `user` オブジェクトがあります。:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
```

今、"John Smith" という値を持つ "fullName" プロパティを追加したいとします。もちろん、既存の情報のコピーペーストはしたくありません。ここで、アクセサを使用して実装することができます。:

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

外部からは、アクセサプロパティは通常の変数に見えます。それがアクセサプロパティの考え方です。関数として `user.fullName` を *呼び出すのではなく*、通常通り *読み込みます*。: getter は背後で実行されます。  

今のところ、`fullName` は getter しか持っていません。`user.fullName =` を指定しようとすると、エラーになります。

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // Error (property has only a getter)
*/!*
```

`user.fullName` の setter を追加して修正しましょう。:

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// set fullName は指定された値で実行されます
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

結果、"仮想" プロパティ `fullName` を持っており、これは読み書き可能です。

## アクセサディスクリプタ 

アクセサプロパティのディスクリプタは、データプロパティと比べて異なります。

アクセサプロパティには、`value` も `writable` もありませんが、代わりに、`get` と `set` があります。

したがって、アクセサディスクリプタには次のものがあります:

- **`get`** -- 引数なしの関数で、プロパティが読まれたときに動作します。
- **`set`** -- 1つの引数をもつ関数で、プロパティがセットされたときに呼ばれます。
- **`enumerable`** -- データプロパティと同じです。
- **`configurable`** -- データプロパティと同じです。

例えば、アクセサ `fullName` を `defineProperty` で作るとき、`get` と `set` をディスクリプタに渡すことができます。:

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```

プロパティはアクセサ（`get/set` メソッドを持つ）かデータプロパティ（`value`を持つ）のいずれかになれますが、両方にはなれないことに注意してください。

`get` と `value` を同じディスクリプタで指定すると、エラーになります。:

```js run
*!*
// Error: Invalid property descriptor.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## スマートな getters/setters 

Getter/setter は、"実際の" プロパティ値のラッパーとして使用することで、それらをより詳細に制御することができます。

例えば、`user` で短すぎる名前を禁止したい場合、`name` を特別なプロパティ `_name` に格納することができます。そして、setter で値をフィルタします。:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Name is too short...
```

そのため、 名前は `_name` プロパティに格納され、アクセスは getter/setter と通して行われます。

技術的には、外部コードは `user._name` を使うことで、直接 name にアクセスできるかもしれません。しかし、アンダースコア `"_"` で始まるプロパティは内部のもので、外部のオブジェクトから触るべきではないということは広く知られています。


## 互換性のために使用する 

getter と setter の裏にある素晴らしいアイデアの1つは、それらは "通常の" データプロパティを制御し、それをいつでも調整することができることです。

例えば、データプロパティ `name` と `age` を使って user オブジェクトを実装し始めました。:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...しかし、遅かれ早かれそれを変更するかもしれません。より正確にするために、`age` の代わりに `birthday` を格納することに決めるかもしれません。:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

さて、まだ `age` プロパティを使っている古いコードはどうすればよいでしょうか？

そのような箇所をすべて見つけて直していくこともできますが、時間がかかったり別の人が書いているコードであれば直すのが難しいかもしれません。その上、`age` は　`user` が持っていても良いものですよね？

そのままにしておきましょう。

`age` の getter を追加することで問題が解消できます:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // age は現在の日付と誕生日から計算されます
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // birthday は利用可能です
alert( john.age );      // ...age も同様です
```

これで古いコードも機能しつつ、追加のプロパティも追加できました。
