
# オブジェクト

<<<<<<< HEAD
チャプター <info:types> で学んだ通り、JavaScriptには７つの型があります。そのうち６つは "プリミティブ" と呼ばれています。なぜなら、それらは１つの値だけを持つからです(文字列、数値、など任意の値になります)。
=======
As we know from the chapter <info:types>, there are eight data types in JavaScript. Seven of them are called "primitive", because their values contain only a single thing (be it a string or a number or whatever).
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

一方で、オブジェクトは様々なデータと、より複雑なエンティティのキー付けされた集合を保持するために使われます。JavaScriptでは、オブジェクトは言語のほぼすべての面で関連します。そのため、まず最初にオブジェクトを理解する必要があります。

<<<<<<< HEAD
[cut]

オブジェクトは波括弧 `{…}`と任意の *プロパティ* の一覧から成ります。プロパティは "key:value" のペアで、`key` は文字列(もしくは"プロパティ名"と呼ばれます)で、`value` は何でも構いません。

オブジェクトは、署名されたファイルを持つキャビネットとしてイメージすることができます。すべてのデータは、キーによってそのファイルの中に格納されます。ファイルを名前で検索したり、ファイルの追加や削除は簡単です。
=======
An object can be created with figure brackets `{…}` with an optional list of *properties*. A property is a "key: value" pair, where `key` is a string (also called a "property name"), and `value` can be anything.

We can imagine an object as a cabinet with signed files. Every piece of data is stored in its file by the key. It's easy to find a file by its name or add/remove a file.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

![](object.svg)

空のオブジェクト("空のキャビネット")は、次の2つ構文のいずれかで作ることができます:

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

私たちは、いつでもそこからファイルの追加、削除、参照ができます。

プロパティ値へは、ドット表記を使ってアクセスすることができます。:

```js
<<<<<<< HEAD
// オブジェクトのフィールドを取得:
=======
// get property values of the object:
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
alert( user.name ); // John
alert( user.age ); // 30
```

値はどんな型にもなります。boolean の値を追加してみましょう:

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

プロパティを削除するには、`delete` 演算子を使います:

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
このリストの最後のプロパティはカンマで終わることがあります:
=======
The last property in the list may end with a comma:
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
<<<<<<< HEAD

これは、「末尾」または「ぶら下がり」のカンマと呼ばれます。 これがあると、すべての行が同じ表記になるため、プロパティの追加/削除/移動が簡単になります。

````smart header="Object with const can be changed"
Please note: an object declared as `const` *can* be modified.

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

It might seem that the line `(*)` would cause an error, but no. The `const` fixes the value of `user`, but not its contents.

The `const` would give an error only if we try to set `user=...` as a whole.

There's another way to make constant object properties, we'll cover it later in the chapter <info:property-descriptors>.
````
=======
That is called a "trailing" or "hanging" comma. Makes it easier to add/remove/move around properties, because all lines become alike.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

## 角括弧 

複数語のプロパティの場合、ドットを使用したアクセスは上手く動作しません:

```js run
// これは構文エラーになります
user.likes birds = true
```

JavaScript doesn't understand that. It thinks that we address `user.likes`, and then gives a syntax error when comes across unexpected `birds`.
<<<<<<< HEAD

The dot requires the key to be a valid variable identifier. That implies: contains no spaces, doesn't start with a digit and doesn't include special characters (`$` and `_` are allowed).

代わりに、任意の文字列で動作する "角括弧表記" を使います:
=======

The dot requires the key to be a valid variable identifier. That implies: contains no spaces, doesn't start with a digit and doesn't include special characters (`$` and `_` are allowed).
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

There's an alternative "square bracket notation" that works with any string:

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
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

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

The dot notation cannot be used in a similar way:
<<<<<<< HEAD
=======

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

```js run
let user = {
  name: "John",
  age: 30
};

<<<<<<< HEAD
let key = "name";
alert( user.key ) // undefined
```
=======
We can use square brackets in an object literal, when creating an object. That's called *computed properties*.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

### 算出プロパティ

オブジェクトリテラルでは、角括弧を使うことができます。それは *算出プロパティ* と呼ばれます。

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
=======
Square brackets are much more powerful than the dot notation. They allow any property names and variables. But they are also more cumbersome to write.

So most of the time, when property names are known and simple, the dot is used. And if we need something more complex, then we switch to square brackets.

## Property value shorthand
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

例えば:

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
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
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
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
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
=======

## Property names limitations

As we already know, a variable cannot have a name equal to one of language-reserved words like "for", "let", "return" etc.

But for an object property, there's no such restriction:

```js run
// these properties are all right
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
let obj = {
  for: 1,
  let: 2,
  return: 3
<<<<<<< HEAD
}
=======
};
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

alert( obj.for + obj.let + obj.return );  // 6
```

In short, there are no limitations on property names. They can be any strings or symbols (a special type for identifiers, to be covered later).

Other types are automatically converted to strings.

For instance, a number `0` becomes a string `"0"` when used as a property key:

```js run
let obj = {
  0: "test" // same as "0": "test"
};

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

<<<<<<< HEAD

## プロパティ存在チェック, "in" 演算子 

注目すべきオブジェクトの機能は、どんなプロパティへもアクセスできることです。プロパティが存在しない場合でもエラーにはなりません! 存在しないプロパティへのアクセスは、単に `undefined` を返します。これはプロパティが存在するかどうかを確認する非常に一般的な方法です -- その値を取得し、 undefined と比較します。:
=======
## Property existence test, "in" operator

A notable feature of objects in JavaScript, compared to many other languages, is that it's possible to access any property. There will be no error if the property doesn't exist!

Reading a non-existing property just returns `undefined`. So we can easily test whether the property exists:
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true は "そのようなプロパティはありません" を意味する
```

<<<<<<< HEAD
プロパティの存在チェックのための特別な演算子 `"in"` もあります。
=======
There's also a special operator `"in"` for that.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

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
If we omit quotes, that means a variable, it should contain the actual name to be tested. For instance:
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

```js run
let user = { age: 30 };

let key = "age";
<<<<<<< HEAD
alert( *!*key*/!* in user ); // true, キーから名前を取り、そのプロパティをチェック
=======
alert( *!*key*/!* in user ); // true, property "age" exists
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
```

Why does the `in` operator exist? Isn't it enough to compare against `undefined`?

Well, most of the time the comparison with `undefined` works fine. But there's a special case when it fails, but `"in"` works correctly.

それは、オブジェクトのプロパティは存在するが、`undefined` が格納されているときです:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // これは undefined, なので - このようなプロパティはなし?

alert( "test" in obj ); // true, プロパティは存在します!
```

<<<<<<< HEAD

上のコードでは、プロパティ `obj.test` は技術的には存在します。なので、 `in` 演算子は正しく動いています。

このようなシチュエーションは非常にまれです。なぜなら `undefined` は通常代入されないからです。殆どの場合、"不明" または "空" の値として `null` を使います。
=======
In the code above, the property `obj.test` technically exists. So the `in` operator works right.

Situations like this happen very rarely, because `undefined` should not be explicitly assigned. We mostly use `null` for "unknown" or "empty" values. So the `in` operator is an exotic guest in the code.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311


## "for..in" ループ 

オブジェクトのすべてのキーを見て回るための、ループの特別な形があります: `for..in` です。これは以前学んだ `for(;;)` 構造と完全に異なるものです。

構文:

```js
<<<<<<< HEAD
for(key in object) {
  // オブジェクトプロパティの各キーに対して本体を実行
=======
for (key in object) {
  // executes the body for each key among object properties
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
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

=======
Also, we could use another variable name here instead of `key`. For instance, `"for (let prop in obj)"` is also widely used.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

### オブジェクトの順序付け

<<<<<<< HEAD
オブジェクトは順序付けられますか？つまり、オブジェクトをループするとき、追加したのと同じ順序ですべてのプロパティを取得しますか？それを保証することはできるでしょうか？
=======
Are objects ordered? In other words, if we loop over an object, do we get all properties in the same order they were added? Can we rely on this?
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

回答は、"特別な方法で順序付けられます"。: 整数値のプロパティはソートされます、それ以外は作成した順になります。以下、その詳細です。

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

オブジェクトはユーザに対してオプションの一覧を提案をするのに使われるかもしれません。もし主にドイツのユーザをターゲットにしたサイトを作る場合、恐らく最初に `49` が出て欲しいです。

しかし、コードを実行すると完全に異なったものが見えます:

- USA (1) が最初に来ます
- 次に Switzerland (41) などが並びます.

電話コードは昇順にソートされて表示されます。なぜなら、それらが整数だからです。なので、`1, 41, 44, 49` と見えます。

````smart header="整数プロパティとは?"
ここで "整数プロパティ" という用語は、変更なしで整数に変換できる文字列を意味します。

したがって、"49" は整数のプロパティ名です。なぜなら、整数の数に変換されて戻っても、それは変わらないからです。 しかし、 "+49"と "1.2"はそうではありません:

```js run
<<<<<<< HEAD
// Math.trunc は小数部を取り除く組み込み関数
alert( String(Math.trunc(Number("49"))) ); // "49", 同じ, 整数プロパティ
alert( String(Math.trunc(Number("+49"))) ); // "49", 同じではない ⇒ 非整数プロパティ
alert( String(Math.trunc(Number("1.2"))) ); // "1", 同じではない ⇒ 非整数プロパティ
=======
// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
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
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311


## サマリ 

オブジェクトはいくつかの特別な機能を持つ連想配列です。

<<<<<<< HEAD
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
Additional operators:
- To delete a property: `delete obj.prop`.
- To check if a property with the given key exists: `"key" in obj`.
- To iterate over an object: `for (let key in obj)` loop.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

What we've studied in this chapter is called a "plain object", or just `Object`.

JavaScriptには他にも多くの種類のオブジェクトがあります:

- 順序付けされたデータコレクションを格納する `Array`
- 日付と時刻に関する情報を格納する `Date`
- エラーに関する情報を格納する `Error`
- ...等々

後で勉強しますが、それらは特別な機能を持っています。また、それらは "Array型" もしくは "Data型" と言われることがありますが、形式的には自身の型ではなく、単一の「オブジェクト」データ型に属しています。 そして、それをさまざまな方法で拡張しています。

<<<<<<< HEAD
Javascript のオブジェクトはとても強力です。ここでは本当に巨大なトピックのほんの始まりを学びました。この後に続くチャプターでは、オブジェクトをより深く見ていき、それらについてもっと学んでいきます。
=======
Objects in JavaScript are very powerful. Here we've just scratched the surface of a topic that is really huge. We'll be closely working with objects and learning more about them in further parts of the tutorial.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
