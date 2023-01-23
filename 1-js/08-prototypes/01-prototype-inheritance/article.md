<<<<<<< HEAD
# プロトタイプ継承

プログラミングでは、何かを取得しそれを拡張することがしばしばあります。

例えば、プロパティとメソッドをもつ `user` オブジェクトがあるとします。そして、そのいくつかを僅かに変更した `admin` や `guest` を作りたいとします。メソッドのコピーや再実装ではなく、単にその上に新しいオブジェクトを作成することで、`user` が持っているものを再利用したいです。

*プロトタイプ継承* はそれを助ける言語の機能です。

## プロトタイプ [[Prototype]]

JavaScriptでは、オブジェクトは特別な隠しプロパティ `[[Prototype]]` （スペックにて命名されています）を持っており、それは `null` または別のオブジェクトを参照します。そのオブジェクトは "プロトタイプ" と呼ばれます。

![prototype](object-prototype-empty.svg)

`object` からプロパティを読んだときに存在しない場合、JavaScriptは自動的にプロトタイプからそれを取得します。プログラミングではこのようなことを "プロトタイプ継承" と呼びます。多くのクールな言語機能やプログラミングテクニックは、これがベースになっています。

プロパティ `[[Prototype]]` は内部であり隠されていますが、セットする多くの方法があります。

それらの１つは、次のように `__proto__` を使う方法です:
=======
# Prototypal inheritance

In programming, we often want to take something and extend it.

For instance, we have a `user` object with its properties and methods, and want to make `admin` and `guest` as slightly modified variants of it. We'd like to reuse what we have in `user`, not copy/reimplement its methods, just build a new object on top of it.

*Prototypal inheritance* is a language feature that helps in that.

## [[Prototype]]

In JavaScript, objects have a special hidden property `[[Prototype]]` (as named in the specification), that is either `null` or references another object. That object is called "a prototype":

![prototype](object-prototype-empty.svg)

When we read a property from `object`, and it's missing, JavaScript automatically takes it from the prototype. In programming, this is called "prototypal inheritance". And soon we'll study many examples of such inheritance, as well as cooler language features built upon it.

The property `[[Prototype]]` is internal and hidden, but there are many ways to set it.

One of them is to use the special name `__proto__`, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
<<<<<<< HEAD
rabbit.__proto__ = animal; // rabbit.[[Prototype]] = animal をセット
*/!*
```

`rabbit` のプロパティを読むときにそれがない場合、JavaScriptは自動で `animal` から取得します。

例:

```js run
=======
rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal
*/!*
```

Now if we read a property from `rabbit`, and it's missing, JavaScript will automatically take it from `animal`.

For instance:

```js
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // (*)
*/!*

<<<<<<< HEAD
// 今、rabbit で両方のプロパティを見つけることができます:
=======
// we can find both properties in rabbit now:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*!*
alert( rabbit.eats ); // true (**)
*/!*
alert( rabbit.jumps ); // true
```

<<<<<<< HEAD
ここで、行 `(*)` は `rabbit` のプロトタイプに `animal` をセットしています。

次に、`alert` がプロパティ `rabbit.eats` `(**)` を読もうとしたとき、それは `rabbit` にはないので、JavaScriptは `[[Prototype]]` 参照に従って、`animal` の中でそれを見つけます(下から上に向かいます)。

![](proto-animal-rabbit.svg)

ここでは、私たちは "`animal` は `rabbit` のプロトタイプ" または "`rabbit` がプロトタイプ的に `animal` を継承している" という事ができます。"

したがって、もし `animal` が多くの役立つプロパティやメソッドを持っている場合、それらは自動的に `rabbit` でも利用可能になります。このようなプロパティは "継承" と呼ばれます。

もし `animal` がメソッドを持っている場合、`rabbit` でもそれを呼ぶことができます:
=======
Here the line `(*)` sets `animal` to be the prototype of `rabbit`.

Then, when `alert` tries to read property `rabbit.eats` `(**)`, it's not in `rabbit`, so JavaScript follows the `[[Prototype]]` reference and finds it in `animal` (look from the bottom up):

![](proto-animal-rabbit.svg)

Here we can say that "`animal` is the prototype of `rabbit`" or "`rabbit` prototypically inherits from `animal`".

So if `animal` has a lot of useful properties and methods, then they become automatically available in `rabbit`. Such properties are called "inherited".

If we have a method in `animal`, it can be called on `rabbit`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let animal = {
  eats: true,
*!*
  walk() {
    alert("Animal walk");
  }
*/!*
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

<<<<<<< HEAD
// walk は prototype から得られました
=======
// walk is taken from the prototype
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*!*
rabbit.walk(); // Animal walk
*/!*
```

<<<<<<< HEAD
メソッドは次のように自動的にプロトタイプから取られます。:

![](proto-animal-rabbit-walk.svg)

プロトタイプチェーンは長くても問題ありません。:
=======
The method is automatically taken from the prototype, like this:

![](proto-animal-rabbit-walk.svg)

The prototype chain can be longer:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let animal = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};

let rabbit = {
  jumps: true,
*!*
  __proto__: animal
*/!*
};

let longEar = {
  earLength: 10,
*!*
  __proto__: rabbit
*/!*
};

<<<<<<< HEAD
// walk は prototype チェーンから取られました
longEar.walk(); // Animal walk
alert(longEar.jumps); // true (rabbit から)
=======
// walk is taken from the prototype chain
longEar.walk(); // Animal walk
alert(longEar.jumps); // true (from rabbit)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

![](proto-animal-rabbit-chain.svg)

Now if we read something from `longEar`, and it's missing, JavaScript will look for it in `rabbit`, and then in `animal`.

<<<<<<< HEAD
実際には、2つの制限があります。:

1. 参照を循環させることはできません。JavaScriptは、循環するように `__proto__` を割り当てようとするとエラーになります。
2. `__proto__` の値はオブジェクトまたは `null` になります。プリミティブのような、それ以外のすべての値は無視されます。

また、明白かもしれませんが、1つの `[[Prototype]]` しか存在しません。 オブジェクトは2つの他のものから継承することはできません。


```smart header="`__proto__` は `[[Prototype]]` のための歴史的な getter/setter です。"
この2つの違いを知らないのは、初心者の開発者にありがちなミスです。

`__proto__` は内部の `[[Prototype]]` プロパティとは *同じではない* ことに注意してください。これは、`[[Prototype]]` のgetter/setter です。後でそれが重要な場面をみていきますが、今は JavaScript 言語を理解するために、このプロパティについて心に留めておいてください。

`__proto__` プロパティは少し時代遅れです。これは歴史的な理由から存在しており、モダンな JavaScript では、プロトタイプの get/set の代わりに、 `Object.getPrototypeOf/Object.setPrototypeOf` 関数を使用することが推奨されています。これらの関数についても、後ほど説明していきます。

スペックでは、`__proto__` はブラウザでのみサポートされなければなりません。ですが、実際にはサーバサイドを含むすべての環境で`__proto__` がサポートされています。ので、安全に使用することができます。

`__proto__` 記法は直感的でわかりやすいので、例ではこの記法を使います。
```

## 書き込みはプロトタイプを使用しません

プロトタイプは、プロパティを読むためだけに使われます。

書き込み/削除操作はオブジェクトで直接動作します。

下の例では、自身の `walk` メソッドを `rabbit` に割り当てています。:
=======
There are only two limitations:

1. The references can't go in circles. JavaScript will throw an error if we try to assign `__proto__` in a circle.
2. The value of `__proto__` can be either an object or `null`. Other types are ignored.

Also it may be obvious, but still: there can be only one `[[Prototype]]`. An object may not inherit from two others.

```smart header="`__proto__` is a historical getter/setter for `[[Prototype]]`"
It's a common mistake of novice developers not to know the difference between these two.

Please note that `__proto__` is *not the same* as the internal `[[Prototype]]` property. It's a getter/setter for `[[Prototype]]`. Later we'll see situations where it matters, for now let's just keep it in mind, as we build our understanding of JavaScript language.

The `__proto__` property is a bit outdated. It exists for historical reasons, modern JavaScript suggests that we should use `Object.getPrototypeOf/Object.setPrototypeOf` functions instead that get/set the prototype. We'll also cover these functions later.

By the specification, `__proto__` must only be supported by browsers. In fact though, all environments including server-side support `__proto__`, so we're quite safe using it.

As the `__proto__` notation is a bit more intuitively obvious, we use it in the examples.
```

## Writing doesn't use prototype

The prototype is only used for reading properties.

Write/delete operations work directly with the object.

In the example below, we assign its own `walk` method to `rabbit`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let animal = {
  eats: true,
  walk() {
<<<<<<< HEAD
    /* このメソッドは rabbit では使われません */  
=======
    /* this method won't be used by rabbit */  
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
};

let rabbit = {
  __proto__: animal
<<<<<<< HEAD
}
=======
};
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

*!*
rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};
*/!*

rabbit.walk(); // Rabbit! Bounce-bounce!
```

<<<<<<< HEAD
これ以降、`rabbit.walk()` 呼び出しは、プロトタイプを使うことなく、オブジェクトの中にすぐにメソッドを見つけ、それを実行します。

![](proto-animal-rabbit-walk-2.svg)

getter/setter の場合 -- もしプロパティの読み書きをすると、プロトタイプで参照されて呼び出されます。

例えば、以下のコードで `admin.fullName` プロパティをチェックしてください:
=======
From now on, `rabbit.walk()` call finds the method immediately in the object and executes it, without using the prototype:

![](proto-animal-rabbit-walk-2.svg)

Accessor properties are an exception, as assignment is handled by a setter function. So writing to such a property is actually the same as calling a function.

For that reason `admin.fullName` works correctly in the code below:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith (*)

<<<<<<< HEAD
// setter がトリガします!
admin.fullName = "Alice Cooper"; // (**)

alert(admin.fullName); // Alice Cooper, admin の状態が変更されました。
alert(user.fullName); // John Smith, user の状態はそのままです。
```

ここで、行 `(*)` では、プロパティ `admin.fullName` はプロトタイプである `user` が getter を持っているので、それが呼ばれます。同様に行 `(**)` では、プロパティはプロトタイプにある setter が呼ばれます。

## "this" の値 

上の例で、興味深い質問が起きるかもしれません。: `set fullName(value)` の内側での `this` の値はなんでしょうか？プロパティ `this.name` と `this.surname` が書かれているのはどこでしょうか？ `user` または `admin` ?

答えはシンプルです: `this` はプロトタイプによる影響を持ったく受けません。

**メソッドがどこにあるかは関係ありません：オブジェクトの中でも、そのプロトタイプ内でも。メソッド呼び出しでは、`this` は常にドットの前のオブジェクトです。**

したがって、setter は実際に `this` として `admin` となり、`user` ではありません。

多くのメソッドを持つ大きなオブジェクトを持ち、それを継承する場合があるため、これは実際には非常に重要なことです。継承したオブジェクトで継承したメソッドを実行すると、大きなオブジェクトではなく、継承したオブジェクトの状態を変更します。

例えば、ここでは `animal` は "メソッド格納域" を表現しており、`rabbit` はそれを使います。

呼び出し `rabbit.sleep()` は `rabbit` オブジェクトに `this.isSleeping` をセットします。:

```js run
// animal がメソッドを持っています
=======
// setter triggers!
admin.fullName = "Alice Cooper"; // (**)

alert(admin.fullName); // Alice Cooper, state of admin modified
alert(user.fullName); // John Smith, state of user protected
```

Here in the line `(*)` the property `admin.fullName` has a getter in the prototype `user`, so it is called. And in the line `(**)` the property has a setter in the prototype, so it is called.

## The value of "this"

An interesting question may arise in the example above: what's the value of `this` inside `set fullName(value)`? Where are the properties `this.name` and `this.surname` written: into `user` or `admin`?

The answer is simple: `this` is not affected by prototypes at all.

**No matter where the method is found: in an object or its prototype. In a method call, `this` is always the object before the dot.**

So, the setter call `admin.fullName=` uses `admin` as `this`, not `user`.

That is actually a super-important thing, because we may have a big object with many methods, and have objects that inherit from it. And when the inheriting objects run the inherited methods, they will modify only their own states, not the state of the big object.

For instance, here `animal` represents a "method storage", and `rabbit` makes use of it.

The call `rabbit.sleep()` sets `this.isSleeping` on the `rabbit` object:

```js run
// animal has methods
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};

<<<<<<< HEAD
// rabbit.isSleeping を変更する
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (prototype にそのようなプロパティはありません)
```

結果の図は次のようになります:

![](proto-animal-rabbit-walk-3.svg)

もし `bird`, `snake` など `animal` から継承された他のオブジェクトを持っていた場合、それらもまた `animal` のメソッドへのアクセスができます。しかし各メソッドでの `this` は対応するオブジェクトであり、`animal` ではなく、呼び出し時に評価されます（前のドット）。 したがって、`this` にデータを書き込むとき、これらのオブジェクトに格納されます。

結果として、メソッドは共有されますが、オブジェクトの状態は共有されません。

## for..in loop

`for..in` ループは継承したプロパティも繰り返し処理します。

例:
=======
// modifies rabbit.isSleeping
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (no such property in the prototype)
```

The resulting picture:

![](proto-animal-rabbit-walk-3.svg)

If we had other objects, like `bird`, `snake`, etc., inheriting from `animal`, they would also gain access to methods of `animal`. But `this` in each method call would be the corresponding object, evaluated at the call-time (before dot), not `animal`. So when we write data into `this`, it is stored into these objects.

As a result, methods are shared, but the object state is not.

## for..in loop

The `for..in` loop iterates over inherited properties too.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
<<<<<<< HEAD
// Object.keys は実親のキーだけを返します
=======
// Object.keys only returns own keys
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
<<<<<<< HEAD
// for..in は実親と継承したキー両方をループします
for(let prop in rabbit) alert(prop); // jumps, eats
*/!*
```

これは期待している動作ではなく、継承したプロパティは除きたい場合は組み込みのメソッド [obj.hasOwnProperty(key)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)が利用できます。これは `obj` が `key` という名前のプロパティをもつ場合（継承したものは含みません）、`true` を返します。

従って、継承したプロパティをフィルタする（あるいはそれらについて何かをする）ことが可能です。:
=======
// for..in loops over both own and inherited keys
for(let prop in rabbit) alert(prop); // jumps, then eats
*/!*
```

If that's not what we want, and we'd like to exclude inherited properties, there's a built-in method [obj.hasOwnProperty(key)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty): it returns `true` if `obj` has its own (not inherited) property named `key`.

So we can filter out inherited properties (or do something else with them):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Our: ${prop}`); // Our: jumps
  } else {
    alert(`Inherited: ${prop}`); // Inherited: eats
  }
}
```

<<<<<<< HEAD
ここでは、次の継承チェーンがあります: `rabbit` は `animal` を継承し、`animal` は `Object.prototype` を継承しています（`animal` はリテラルオブジェクト `{...}` なので、これはデフォルトです）。その上は `null` です。:

![](rabbit-animal-object.svg)

興味深い点が1つあります。メソッド `rabbit.hasOwnProperty` はどこから来るのでしょうか？我々は定義していません。チェーンをみることで、メソッドは `Object.prototype.hasOwnProperty` で提供されていることがわかります。つまり、継承されたものです。

...ですが、なぜ `hasOwnProperty` は継承したプロパティもリストする `for..in` ループで `eats` や `jumps` のように登場しないのでしょう。

答えはシンプルです。これは列挙不可だからです。`Object.prototype` の他のすべてのプロパティと同様に、`enumerable:false` フラグを持ちます。そして、`for..in` は列挙可能なプロパティのみをリストします。そのため、`Object.prototype` のプロパティは列挙されません。

```smart header="ほぼすべての他のキー/バリュー取得メソッドは継承したプロパティを無視します"
`Object.keys`, `Object.values` などのほとんどの他のキー/バリュー取得メソッドは、継承したプロパティを無視します。

これらはオブジェクト自身の操作のみ行います。プロトタイプからのプロパティは考慮され *ません*。
```

## サマリ 

- JavaScriptでは、すべてのオブジェクトは隠れた `[[Prototype]]` プロパティを持っており、それは別のオブジェクトまたは `null` です。
- それにアクセスするために `obj.__proto__` を使うことができます(他の方法もあります。それらは後ほど学びます)。
- `[[Prototype]]` によるオブジェクトの参照は "プロトタイプ" と呼ばれます。
- もしも `obj` のプロパティを読みたい、またはメソッドを呼び出したいが、そこに存在しない場合、JavaScriptはプロトタイプの中で見つけようとします。
- 書き込み/削除操作はオブジェクトに対して直接動作し、プロトタイプを使いません(プロパティが setter でない限り)。
- `obj.method()` を呼び出し、`method` がプロトタイプから取られた場合も、`this` は依然として `obj` を参照します。したがって、メソッドはたとえ継承されていたとしても、常に現在のオブジェクトで動作します。
- `for..in` ループは自身と継承したプロパティ両方を繰り返し処理します。他のすべてのキー/バリュー取得メソッドはオブジェクト自身に対してのみ操作します。
=======
Here we have the following inheritance chain: `rabbit` inherits from `animal`, that inherits from `Object.prototype` (because `animal` is a literal object `{...}`, so it's by default), and then `null` above it:

![](rabbit-animal-object.svg)

Note, there's one funny thing. Where is the method `rabbit.hasOwnProperty` coming from? We did not define it. Looking at the chain we can see that the method is provided by `Object.prototype.hasOwnProperty`. In other words, it's inherited.

...But why does `hasOwnProperty` not appear in the `for..in` loop like `eats` and `jumps` do, if `for..in` lists inherited properties?

The answer is simple: it's not enumerable. Just like all other properties of `Object.prototype`, it has `enumerable:false` flag. And `for..in` only lists enumerable properties. That's why it and the rest of the `Object.prototype` properties are not listed.

```smart header="Almost all other key/value-getting methods ignore inherited properties"
Almost all other key/value-getting methods, such as `Object.keys`, `Object.values` and so on ignore inherited properties.

They only operate on the object itself. Properties from the prototype are *not* taken into account.
```

## Summary

- In JavaScript, all objects have a hidden `[[Prototype]]` property that's either another object or `null`.
- We can use `obj.__proto__` to access it (a historical getter/setter, there are other ways, to be covered soon).
- The object referenced by `[[Prototype]]` is called a "prototype".
- If we want to read a property of `obj` or call a method, and it doesn't exist, then JavaScript tries to find it in the prototype.
- Write/delete operations act directly on the object, they don't use the prototype (assuming it's a data property, not a setter).
- If we call `obj.method()`, and the `method` is taken from the prototype, `this` still references `obj`. So methods always work with the current object even if they are inherited.
- The `for..in` loop iterates over both its own and its inherited properties. All other key/value-getting methods only operate on the object itself.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
