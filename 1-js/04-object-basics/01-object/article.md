
# オブジェクト

<<<<<<< HEAD
<info:types> の章で学んだように、JavaScriptには8つの型があります。そのうち7つは "プリミティブ" と呼ばれています。なぜなら、それらは単一の値のみを持つからです(文字列や数値など何であれ)。
=======
As we know from the chapter <info:types>, there are eight data types in JavaScript. Seven of them are called "primitive", because their values contain only a single thing (be it a string or a number or whatever).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

これに対し、オブジェクトは、キー付されたさまざまなデータのコレクションや、より複雑なエンティティを格納するために使用されます。JavaScriptでは、オブジェクトは言語のほぼすべての側面に関連しています。そのため、まず最初にオブジェクトを理解する必要があります。

<<<<<<< HEAD
オブジェクトは波括弧 `{…}`と任意の *プロパティ* の一覧から成ります。プロパティは "key:value" のペアで、`key` は文字列(もしくは"プロパティ名"と呼ばれます)で、`value` は何でも構いません。

オブジェクトは、署名されたファイルを持つキャビネットとしてイメージすることができます。すべてのデータは、キーによってそのファイルの中に格納されます。ファイルを名前で検索したり、ファイルの追加や削除は簡単です。

![](object.svg)

空のオブジェクト("空のキャビネット")は、次の2つの構文のいずれかで作ることができます:
=======
An object can be created with figure brackets `{…}` with an optional list of *properties*. A property is a "key: value" pair, where `key` is a string (also called a "property name"), and `value` can be anything.

We can imagine an object as a cabinet with signed files. Every piece of data is stored in its file by the key. It's easy to find a file by its name or add/remove a file.

![](object.svg)

An empty object ("empty cabinet") can be created using one of two syntaxes:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let user = new Object(); // "オブジェクトコンストラクタ" 構文
let user = {};  // "オブジェクトリテラル" 構文
```

![](object-user-empty.svg)

通常は波括弧 `{...}` が使われます。その宣言は *オブジェクトリテラル* と呼ばれます。

## リテラルとプロパティ 

プロパティを "key: value" のペアの形式で `{...}` に置くことができます。

```js
let user = {     // オブジェクト
  name: "John",  // キー "name" に値 "John" が格納される
  age: 30        // キー "age" に値 30 が格納される
};
```

プロパティはコロン `":"` の前がキー("名前" もしくは "識別子" として知られています)で、コロンの右が値です。

ここでは、`user` オブジェクトは2つのプロパティを持っています:

1. 最初のプロパティは名前 `"name"` とその値 `"John"` です。
2. 2つ目は、名前 `"age"` とその値 `30` です。

生成された `user` オブジェクトは、"name" と "age" とラベル付けされた2つのファイルを持つキャビネットと考えることができます。

![user object](object-user.svg)

<<<<<<< HEAD
私たちは、いつでもそこからファイルの追加、削除、参照ができます。
=======
We can add, remove and read files from it at any time.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

プロパティ値へは、ドット表記を使ってアクセスすることができます。:

```js
<<<<<<< HEAD
// オブジェクトのフィールドを取得:
=======
// get property values of the object:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
alert( user.name ); // John
alert( user.age ); // 30
```

値はどんな型にもなります。boolean の値を追加してみましょう:

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

<<<<<<< HEAD
プロパティを削除するには、`delete` 演算子を使います:
=======
To remove a property, we can use the `delete` operator:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

また、複数単語からなるプロパティ名を使うこともできます。この場合は引用符で囲む必要があります:

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // 複数語のプロパティ名は引用符で囲まなければなりません
};
```

![](object-user-props.svg)


<<<<<<< HEAD
リストの最後のプロパティはカンマで終わってもかまいません:
=======
The last property in the list may end with a comma:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
<<<<<<< HEAD
これは、「末尾」または「ぶら下がり」のカンマと呼ばれます。 これがあると、すべての行が同じ表記になるため、プロパティの追加/削除/移動が簡単になります。
=======
That is called a "trailing" or "hanging" comma. Makes it easier to add/remove/move around properties, because all lines become alike.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 角括弧 

複数語のプロパティの場合、ドットを使用したアクセスは上手く動作しません:

```js run
// これは構文エラーになります
user.likes birds = true
```

<<<<<<< HEAD
JavaScript はこれを理解することができません。`user.likes` に対して何か処理をするものと解釈され、その後思いがけない `bird` によって構文エラーが発生します。

ドットを使用したアクセスを使用するには、有効なプロパティ名である必要があります。具体的には、スペースが含まれていない、数値から始まっていない、特殊文字が含まれていないなどです(ただし、`$` と `_` は有効です)。

代わりに、任意の文字列で動作する "角括弧表記" を使います:
=======
JavaScript doesn't understand that. It thinks that we address `user.likes`, and then gives a syntax error when comes across unexpected `birds`.

The dot requires the key to be a valid variable identifier. That implies: contains no spaces, doesn't start with a digit and doesn't include special characters (`$` and `_` are allowed).

There's an alternative "square bracket notation" that works with any string:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = {};

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];
```

これですべて問題ありません。括弧内の文字列は適切に引用符がつけられている(どのようなタイプの引用符でも動作します)ことに留意してください。

角括弧は、任意の式の結果としてプロパティ名を取得する方法も提供します -- リテラル文字列とは逆に -- 次のようになります:

```js
let key = "likes birds";

// user["likes birds"] = true; と同じ
user[key] = true;
```

<<<<<<< HEAD
ここで、変数 `key` は実行時に計算されるかもしれないし、ユーザの入力に依存するかもしれません。そして、プロパティにアクセスするときにそれを使います。これは素晴らしい柔軟性をもたらします。ドット表記の場合、同じようにはできません。
=======
Here, the variable `key` may be calculated at run-time or depend on the user input. And then we use it to access the property. That gives us a great deal of flexibility.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// 変数でアクセス
alert( user[key] ); // John ("name" が入力された場合)
```

<<<<<<< HEAD
ドット表記は、同じように使用することはできません:
=======
The dot notation cannot be used in a similar way:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### 算出プロパティ

<<<<<<< HEAD
オブジェクトリテラルでは、角括弧を使うことができます。それは *算出プロパティ* と呼ばれます。
=======
We can use square brackets in an object literal, when creating an object. That's called *computed properties*.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:

```js run
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
*!*
  [fruit]: 5, // プロパティ名は変数 fruit から取られます
*/!*
};

alert( bag.apple ); // 5 fruit="apple" の場合
```

算出プロパティの意味はシンプルです: `[fruit]` は、プロパティ名は変数 `fruit` の値になることを意味します。

なので、もし訪問者が `"apple"` を入力すると, `bag` は `{apple: 5}` になります。

基本的には、次と同じように動作します。
```js run
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};

// fruit 変数からプロパティ名を取る
bag[fruit] = 5;
```

...が、よりよく見えます。

角括弧の中では、より複雑な式を使うこともできます。

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

<<<<<<< HEAD
角括弧はドット表記よりもはるかに強力です。それらは任意のプロパティ名や変数を許容します。しかし、書くのはドットより面倒です。

そのため、プロパティ名を知っていて単純な場合であれば、ドットが使われます。そして、もしより複雑な何かが必要なとき、角括弧に切り替えます。

## プロパティの短縮構文 

実際のコードでは、既存の変数をプロパティ名の値として使用することがよくあります。

例えば:
=======
Square brackets are much more powerful than dot notation. They allow any property names and variables. But they are also more cumbersome to write.

So most of the time, when property names are known and simple, the dot is used. And if we need something more complex, then we switch to square brackets.

## Property value shorthand

In real code, we often use existing variables as values for property names.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function makeUser(name, age) {
  return {
    name: name,
<<<<<<< HEAD
    age: age
    // ...他のプロパティ
=======
    age: age,
    // ...other properties
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

上の例では、プロパティは変数と同じ名前を持っています。変数からプロパティを作るユースケースでは、非常に一般的です。そして、それを短く書くための特別な *プロパティの短縮構文* があります。

`name:name` の代わりに、このように単に `name` と書くことができます:

```js
function makeUser(name, age) {
*!*
  return {
<<<<<<< HEAD
    name, // name: name と同じ
    age   // age: age と同じ
=======
    name, // same as name: name
    age,  // same as age: age
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    // ...
  };
*/!*
}
```

同じオブジェクトで、通常のプロパティと短縮構文両方を使うこともできます:

```js
let user = {
  name,  // name:name と同じ
  age: 30
};
```


<<<<<<< HEAD
## プロパティ名の制限

すでにご存知の通り、変数は "for", "let", "return" といった、予約語と同じものをもつことはできません。

しかし、オブジェクトプロパティではこのような制限はありません。どんな名前でも大丈夫です:

```js run
// これらのプロパティはすべて問題ありません
=======
## Property names limitations

As we already know, a variable cannot have a name equal to one of the language-reserved words like "for", "let", "return" etc.

But for an object property, there's no such restriction:

```js run
// these properties are all right
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let obj = {
  for: 1,
  let: 2,
  return: 3
<<<<<<< HEAD
}
=======
};
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

alert( obj.for + obj.let + obj.return );  // 6
```

<<<<<<< HEAD
つまり、プロパティ名には制限がありません。 任意の文字列またはシンボル (後で説明する識別子の特別なタイプ) を使用することができます。

他のタイプの場合は、自動的に文字列に変換されます。

例えば、`0` という数値をプロパティに使用すると、文字列の `"0"` になります。
=======
In short, there are no limitations on property names. They can be any strings or symbols (a special type for identifiers, to be covered later).

Other types are automatically converted to strings.

For instance, a number `0` becomes a string `"0"` when used as a property key:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let obj = {
  0: "test" // same as "0": "test"
};

<<<<<<< HEAD
// 両方とも同じプロパティにアクセスします (数値の 0 は文字列の "0" に変換されます)
alert( obj["0"] ); // test
alert( obj[0] ); // test (同じプロパティ)
```

`__proto__` という特殊なプロパティには落とし穴があります。オブジェクトではない値を設定することができません:

```js run
let obj = {};
obj.__proto__ = 5; // 数値を設定
alert(obj.__proto__); // [object Object] - 値はオブジェクトで、意図した通りに動作しません
```

コードから分かるように、`5` の設定は無視されました。

 `__proto__` の特殊な性質は [後続の章](info:prototype-inheritance) で説明します。また、このような [動作の修正方法](info:prototype-methods) も提案します。

## プロパティ存在チェック, "in" 演算子 

他の言語と比べて JavaScript で注目すべきオブジェクトの特徴は、どんなプロパティへもアクセスできることです。プロパティが存在しない場合でもエラーにはなりません!

存在しないプロパティへのアクセスは、単に `undefined` を返します。なのでプロパティが存在するかは簡単に確認できます。:
=======
// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
```

There's a minor gotcha with a special property named `__proto__`. We can't set it to a non-object value:

```js run
let obj = {};
obj.__proto__ = 5; // assign a number
alert(obj.__proto__); // [object Object] - the value is an object, didn't work as intended
```

As we see from the code, the assignment to a primitive `5` is ignored.

We'll cover the special nature of `__proto__` in [subsequent chapters](info:prototype-inheritance), and suggest the [ways to fix](info:prototype-methods) such behavior.

## Property existence test, "in" operator

A notable feature of objects in JavaScript, compared to many other languages, is that it's possible to access any property. There will be no error if the property doesn't exist!

Reading a non-existing property just returns `undefined`. So we can easily test whether the property exists:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true は "そのようなプロパティはありません" を意味する
```

<<<<<<< HEAD
プロパティの存在チェックのための特別な演算子 `"in"` もあります。
=======
There's also a special operator `"in"` for that.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

構文は次の通りです:
```js
"key" in object
```

例:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age は存在する
alert( "blabla" in user ); // false, user.blabla は存在しない
```

`in` の左側は *プロパティ名* である必要があることに注意してください。通常それは引用符で囲まれた文字列です。

<<<<<<< HEAD
もし引用符を除いた場合、テストされる実際のプロパティ名を持つ変数であることを意味します。例えば:
=======
If we omit quotes, that means a variable should contain the actual name to be tested. For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = { age: 30 };

let key = "age";
<<<<<<< HEAD
alert( *!*key*/!* in user ); // true, キーから名前を取り、そのプロパティをチェック
```

なぜ、`in` 演算子が存在するのでしょうか？ `undefined` と比較するだけで十分ではないでしょうか？
=======
alert( *!*key*/!* in user ); // true, property "age" exists
```

Why does the `in` operator exist? Isn't it enough to compare against `undefined`?

Well, most of the time the comparison with `undefined` works fine. But there's a special case when it fails, but `"in"` works correctly.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

確かに、多くの場合 `undefined` と比較するだけで正しく動作します。しかし、この方法は特殊なケースで失敗します。一方で、`"in"` は特殊なケースでも正しく動作します。

それは、オブジェクトのプロパティは存在するが、`undefined` が格納されているときです:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // これは undefined, なので - このようなプロパティは存在しない?

alert( "test" in obj ); // true, プロパティは存在します!
```

<<<<<<< HEAD
上のコードでは、プロパティ `obj.test` は技術的には存在します。なので、 `in` 演算子は正しく動いています。

このようなシチュエーションは非常にまれです。なぜなら `undefined` は通常代入されないからです。殆どの場合、"不明" または "空" の値として `null` を使います。


## "for..in" ループ 
=======
In the code above, the property `obj.test` technically exists. So the `in` operator works right.

Situations like this happen very rarely, because `undefined` should not be explicitly assigned. We mostly use `null` for "unknown" or "empty" values. So the `in` operator is an exotic guest in the code.


## The "for..in" loop [#forin]
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

オブジェクトのすべてのキーを見て回るための、ループの特別な形があります: `for..in` です。これは以前学んだ `for(;;)` 構造と完全に異なるものです。

構文:

```js
<<<<<<< HEAD
for(key in object) {
  // オブジェクトプロパティの各キーに対して本体を実行
=======
for (key in object) {
  // executes the body for each key among object properties
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
}
```

例えば、`user` のすべてのプロパティを出力してみましょう:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // values for the keys
  alert( user[key] ); // John, 30, true
}
```

すべての "for" 構造は、ここでの `let key`  のように、ループ内でループする変数を宣言することに留意してください。

<<<<<<< HEAD
また、ここでの `key` の代わりに、別の変数名を使うこともできます。例えば、`"for(let prop in obj)"` もまた広く使われています。

### オブジェクトの順序付け
=======
Also, we could use another variable name here instead of `key`. For instance, `"for (let prop in obj)"` is also widely used.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

オブジェクトは順序付けられますか？つまり、オブジェクトをループするとき、追加したのと同じ順序ですべてのプロパティを取得しますか？それを保証することはできるでしょうか？

<<<<<<< HEAD
回答は、"特別な方法で順序付けられます": 整数値のプロパティはソートされます、それ以外は作成した順になります。以下、その詳細です。
=======
Are objects ordered? In other words, if we loop over an object, do we get all properties in the same order they were added? Can we rely on this?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例として、電話のコードをもつオブジェクトを考えてみましょう:

```js run
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

<<<<<<< HEAD
オブジェクトはユーザに対してオプションの一覧を提案をするのに使われるかもしれません。もし主にドイツのユーザをターゲットにしたサイトを作る場合、恐らく最初に `49` が出て欲しいです。
=======
The object may be used to suggest a list of options to the user. If we're making a site mainly for a German audience then we probably want `49` to be the first.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

しかし、コードを実行すると完全に異なったものが見えます:

- USA (1) が最初に来ます
- 次に Switzerland (41) などが並びます.

電話コードは昇順にソートされて表示されます。なぜなら、それらが整数だからです。なので、`1, 41, 44, 49` と見えます。

````smart header="整数プロパティとは?"
ここで "整数プロパティ" という用語は、変更なしで整数に変換できる文字列を意味します。

<<<<<<< HEAD
したがって、"49" は整数プロパティ名です。なぜなら、整数の数に変換されて戻っても、それは変わらないからです。 しかし、 "+49"と "1.2"はそうではありません:

```js run
// Math.trunc は小数部を取り除く組み込み関数
alert( String(Math.trunc(Number("49"))) ); // "49", 同じ, 整数プロパティ
alert( String(Math.trunc(Number("+49"))) ); // "49", 同じではない ⇒ 非整数プロパティ
alert( String(Math.trunc(Number("1.2"))) ); // "1", 同じではない ⇒ 非整数プロパティ
=======
So, `"49"` is an integer property name, because when it's transformed to an integer number and back, it's still the same. But `"+49"` and `"1.2"` are not:

```js run
// Number(...) explicitly converts to a number
// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
````

...一方、もしキーが整数でない場合、作られた順でリストされます。例です:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // 1つ追加

*!*
// 非整数プロパティは作成順にリストされます
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

従って、電話コードの問題を直すためには、整数でないコードを作ることで対応することができます。 各コードの前にプラス `"+"` 記号をつければ十分です。

このように:

```js run
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

<<<<<<< HEAD
これで意図した通りに動作します。
=======
Now it works as intended.

## Summary

Objects are associative arrays with several special features.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## サマリ 

<<<<<<< HEAD
オブジェクトはいくつかの特別な機能を持つ連想配列です。

それらはプロパティ(key-valueペア)を格納します:
- プロパティのキーは文字列またはシンボル(通常は文字列)です。
- 値は任意の型になります。

プロパティにアクセスするには、次のようにします:
- ドット表記: `obj.property`
- 角括弧表記: `obj["property"]`。角括弧は変数からキーを取ることもできます。`obj[varWithKey]` のように。

追加の演算子:
- プロパティを削除: `delete obj.prop`
- 与えられたキーを持つプロパティの存在チェック: `"key" in obj`
- オブジェクトのイテレート: `for(let key in obj)` ループ
=======
To access a property, we can use:
- The dot notation: `obj.property`.
- Square brackets notation `obj["property"]`. Square brackets allow taking the key from a variable, like `obj[varWithKey]`.

Additional operators:
- To delete a property: `delete obj.prop`.
- To check if a property with the given key exists: `"key" in obj`.
- To iterate over an object: `for (let key in obj)` loop.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

この章で学習したものは、"plain object" または単に `Object` と呼ばれます。

JavaScriptには他にも多くの種類のオブジェクトがあります:

- 順序付けされたデータコレクションを格納する `Array`
- 日付と時刻に関する情報を格納する `Date`
- エラーに関する情報を格納する `Error`
- ...等々

後で勉強しますが、それらは特別な機能を持っています。また、それらは "Array型" もしくは "Data型" と言われることがありますが、形式的には自身の型ではなく、単一の「オブジェクト」データ型に属しています。 そして、それをさまざまな方法で拡張しています。

<<<<<<< HEAD
Javascript のオブジェクトはとても強力です。ここでは本当に巨大なトピックの表面をなぞっただけです。このチュートリアルの他の部分では、オブジェクトをより深く見ていき、それらについてもっと学んでいきます。
=======
Objects in JavaScript are very powerful. Here we've just scratched the surface of a topic that is really huge. We'll be closely working with objects and learning more about them in further parts of the tutorial.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
