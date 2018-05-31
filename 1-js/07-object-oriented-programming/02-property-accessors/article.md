
# プロパティの getters と setters

プロパティには2種類あります。

最初の種類は *データプロパティ* です。私たちはすでにそれがどうやって動作するのかを知っています。実際、これまで使ってきたすべてのプロパティはデータプロパティでした。

2つ目のプロパティの種類は新しいものです。それは *アクセサプロパティ* です。それらは基本的には値の取得やセットをする関数ですが、外部コードへは通常のプロパティのように見えます。

[cut]

## Getters と setters

アクセサプロパティは "getter" と "setter" メソッドで表現されます。オブジェクトリテラルでは、それらは `get` と `set` で表されますｊ．:

```js
let obj = {
  *!*get propName()*/!* {
    // getter, the code executed on getting obj.propName
  },

  *!*set propName(value)*/!* {
    // setter, the code executed on setting obj.propName = value
  }
};
```

`obj.propName` が読まれたときに getter は動作し、setter は割り当てられたときです。

例えば、`name` と `surname` を持つ `user` オブジェクトを持っているとします。:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
```

今、私たちは "John Smith" という値となる "fullName" プロパティを追加したいとします。もちろん、既存の情報のコピーペーストはしたくありません。ここで、アクセサとしてそれを実装することができます。:

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

外部からは、アクセサプロパティは通常の変数に見えます。それがアクセサプロパティの考え方です。私たちは、関数として `user.fullName` を *呼び出すのではなく*、それを通常通り *読み込みます*。: getter は背後で実行されます。  

今のところ、 `fullName` は getter しか持っていません。 `user.fullName =` を指定しようとすると、エラーが発生します。

`user.fullName` の setter を追加してそれを修正しましょう。:

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

// set fullName is executed with the given value.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

今私たちは "仮想" プロパティを持っています。 読み書き可能ですが、実際には存在しません。

```smart header="Accessor properties are only accessible with get/set"
プロパティは、 "データプロパティ" か "アクセサプロパティ" のいずれかになりますが、両方にはなりません。

プロパティが `get prop()` または `set prop()` で定義されると、それはアクセサプロパティです。 なので、getter で読まなければなりません。それに値を割り当てたいならば、setter を使わなければなりません。

setter または getter だけがある場合もあります。この場合は、プロパティの読み込みまたは書き込みはできません。

```


## アクセサディスクリプタ

アクセサプロパティのためのディスクリプタは、データプロパティを比べて異なります。

アクセサプロパティでは、`value` と `writable` がありませんが、代わりに、`get` と `set` 関数があります。

したがって、アクセサディスクリプタには次のものがあります:

- **`get`** -- 引数なしの関数で、プロパティが読まれたときに動作します。
- **`set`** -- 1つの引数をもつ巻数で、プロパティがセットされたときに呼ばれます。
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

for(let key in user) alert(key);
```

プロパティはアクセサかデータプロパティのいずれかになれますが、両方に離れないことに再度注意してください。

もしも `get` と `value` を同じディスクリプタで指定しようとすると、エラーになります。:

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

Getter/setter は、実際のプロパティ値をラッパーとして使用して、より多くのコントロールを得ることができます。

例えば、`user` で短すぎる名前を禁止したい場合、`name` を特別なプロパティ `_name` に格納することができます。そして、setter で割り当てをフィルタします。:

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

技術的には、外部コードは `user_name` を使うことで、直接 name にアクセスできるかもしれません。しかし、アンダースコア `"_"` で始まるプロパティは内部のもので、外部のオブジェクトから触るべきではないということは広く知られています。


## 互換性のために使用する

getter と setter の裏にある素晴らしいアイデアの1つは -- それらは "通常の" データプロパティを制御し、それをいつでも調整することができます。

例えば、データプロパティ `name` と `age` を使って user オブジェクトを実装し始めました。:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...しかし、遅かれ早かれ、それを変更するかもしれません。より正確で便利のため、`age` の代わりに `birthday` を格納することに決めるかもしれません。:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

さて、まだ `age` プロパティを使っている古いコードはどうすればよいでしょうか？

そのような箇所をすべて見つけて直していくこともできますが、時間がかかったり別の人が書いているコードであれば直すのが難しいかもしれません。その上、`age` は　`user` が持っていても良いものですよね？場所によってはそれを必要とするかもしれません。

`age` の getter を追加すると、問題が緩和されます:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // age is calculated from the current date and birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // birthday is available
alert( john.age );      // ...as well as the age
```

これで古いコードも機能します。
