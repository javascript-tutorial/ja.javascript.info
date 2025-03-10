
<<<<<<< HEAD
# プロパティ getters と setters

オブジェクトプロパティには2種類あります。

１つ目は *データプロパティ* です。我々は既にそれがどのように動作するのか知っています。実際、これまで使ってきたすべてのプロパティはデータプロパティでした。

2つ目のプロパティの種類は新しいものです。それは *アクセサプロパティ* です。これらは基本的には値の取得やセットをする関数ですが、外部コードからは通常のプロパティのように見えます。

## Getters と setters

アクセサプロパティは "getter" と "setter" メソッドで表現されます。オブジェクトリテラルでは、`get` と `set` で表されます:
=======
# Property getters and setters

There are two kinds of object properties.

The first kind is *data properties*. We already know how to work with them. All properties that we've been using until now were data properties.

The second type of property is something new. It's an *accessor property*. They are essentially functions that execute on getting and setting a value, but look like regular properties to an external code.

## Getters and setters

Accessor properties are represented by "getter" and "setter" methods. In an object literal they are denoted by `get` and `set`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
let obj = {
  *!*get propName()*/!* {
<<<<<<< HEAD
    // getter, obj.propName を取得するときにコードが実行されます
  },

  *!*set propName(value)*/!* {
    // setter, obj.propName = value 時にコードが実行されます
=======
    // getter, the code executed on getting obj.propName
  },

  *!*set propName(value)*/!* {
    // setter, the code executed on setting obj.propName = value
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
  }
};
```

<<<<<<< HEAD
`obj.propName` が読まれたときに getter は動作し、setter は割り当てられたときに動作します。

例えば、`name` と `surname` を持つ `user` オブジェクトがあります。:

```js run
=======
The getter works when `obj.propName` is read, the setter -- when it is assigned.

For instance, we have a `user` object with `name` and `surname`:

```js
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
let user = {
  name: "John",
  surname: "Smith"
};
```

<<<<<<< HEAD
今、"John Smith" という値を持つ "fullName" プロパティを追加したいとします。もちろん、既存の情報のコピーペーストはしたくありません。ここで、アクセサを使用して実装することができます。:
=======
Now we want to add a `fullName` property, that should be `"John Smith"`. Of course, we don't want to copy-paste existing information, so we can implement it as an accessor:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

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

<<<<<<< HEAD
外部からは、アクセサプロパティは通常の変数に見えます。それがアクセサプロパティの考え方です。関数として `user.fullName` を *呼び出すのではなく*、通常通り *読み込みます*。: getter は背後で実行されます。  

今のところ、`fullName` は getter しか持っていません。`user.fullName =` を指定しようとすると、エラーになります。
=======
From the outside, an accessor property looks like a regular one. That's the idea of accessor properties. We don't *call* `user.fullName` as a function, we *read* it normally: the getter runs behind the scenes.

As of now, `fullName` has only a getter. If we attempt to assign `user.fullName=`, there will be an error:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

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

<<<<<<< HEAD
`user.fullName` の setter を追加して修正しましょう。:
=======
Let's fix it by adding a setter for `user.fullName`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

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

<<<<<<< HEAD
// set fullName は指定された値で実行されます
=======
// set fullName is executed with the given value.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

<<<<<<< HEAD
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
=======
As the result, we have a "virtual" property `fullName`. It is readable and writable.

## Accessor descriptors

Descriptors for accessor properties are different from those for data properties.

For accessor properties, there is no `value` or `writable`, but instead there are `get` and `set` functions.

That is, an accessor descriptor may have:

- **`get`** -- a function without arguments, that works when a property is read,
- **`set`** -- a function with one argument, that is called when the property is set,
- **`enumerable`** -- same as for data properties,
- **`configurable`** -- same as for data properties.

For instance, to create an accessor `fullName` with `defineProperty`, we can pass a descriptor with `get` and `set`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

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

<<<<<<< HEAD
プロパティはアクセサ（`get/set` メソッドを持つ）かデータプロパティ（`value`を持つ）のいずれかになれますが、両方にはなれないことに注意してください。

`get` と `value` を同じディスクリプタで指定すると、エラーになります。:
=======
Please note that a property can be either an accessor (has `get/set` methods) or a data property (has a `value`), not both.

If we try to supply both `get` and `value` in the same descriptor, there will be an error:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

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

<<<<<<< HEAD
## スマートな getters/setters 

Getter/setter は、"実際の" プロパティ値のラッパーとして使用することで、それらをより詳細に制御することができます。

例えば、`user` で短すぎる名前を禁止したい場合、`name` を特別なプロパティ `_name` に格納することができます。そして、setter で値をフィルタします。:
=======
## Smarter getters/setters

Getters/setters can be used as wrappers over "real" property values to gain more control over operations with them.

For instance, if we want to forbid too short names for `user`, we can have a setter `name` and keep the value in a separate property `_name`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

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

<<<<<<< HEAD
そのため、 名前は `_name` プロパティに格納され、アクセスは getter/setter と通して行われます。

技術的には、外部コードは `user._name` を使うことで、直接 name にアクセスできるかもしれません。しかし、アンダースコア `"_"` で始まるプロパティは内部のもので、外部のオブジェクトから触るべきではないということは広く知られています。


## 互換性のために使用する 

getter と setter の裏にある素晴らしいアイデアの1つは、それらは "通常の" データプロパティを制御し、それをいつでも調整することができることです。

例えば、データプロパティ `name` と `age` を使って user オブジェクトを実装し始めました。:
=======
So, the name is stored in `_name` property, and the access is done via getter and setter.

Technically, external code is able to access the name directly by using `user._name`. But there is a widely known convention that properties starting with an underscore `"_"` are internal and should not be touched from outside the object.


## Using for compatibility

One of the great uses of accessors is that they allow to take control over a "regular" data property at any moment by replacing it with a getter and a setter and tweak its behavior.

Imagine we started implementing user objects using data properties `name` and `age`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

<<<<<<< HEAD
...しかし、遅かれ早かれそれを変更するかもしれません。より正確にするために、`age` の代わりに `birthday` を格納することに決めるかもしれません。:
=======
...But sooner or later, things may change. Instead of `age` we may decide to store `birthday`, because it's more precise and convenient:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

<<<<<<< HEAD
さて、まだ `age` プロパティを使っている古いコードはどうすればよいでしょうか？

そのような箇所をすべて見つけて直していくこともできますが、時間がかかったり別の人が書いているコードであれば直すのが難しいかもしれません。その上、`age` は　`user` が持っていても良いものですよね？

そのままにしておきましょう。

`age` の getter を追加することで問題が解消できます:
=======
Now what to do with the old code that still uses `age` property?

We can try to find all such places and fix them, but that takes time and can be hard to do if that code is used by many other people. And besides, `age` is a nice thing to have in `user`, right?

Let's keep it.

Adding a getter for `age` solves the problem:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
<<<<<<< HEAD
  // age は現在の日付と誕生日から計算されます
=======
  // age is calculated from the current date and birthday
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

<<<<<<< HEAD
alert( john.birthday ); // birthday は利用可能です
alert( john.age );      // ...age も同様です
```

これで古いコードも機能しつつ、追加のプロパティも追加できました。
=======
alert( john.birthday ); // birthday is available
alert( john.age );      // ...as well as the age
```

Now the old code works too and we've got a nice additional property.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
