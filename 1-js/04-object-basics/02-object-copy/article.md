<<<<<<< HEAD
# オブジェクト参照とコピー

オブジェクトとプリミティブの基本的な違いの１つは、オブジェクトは "参照によって" 格納されたりコピーされることです。それに対して、プリミティブ値(文字列、数値、真偽値 など)は、常に "値" としてコピーされます。

値をコピーするときに何が起きているのか少し詳しくみることで、簡単に理解できます。

文字列のような、プリミティブから始めましょう。

ここでは、`message` のコピーを `phrase` に格納します。:
=======
# Object references and copying

One of the fundamental differences of objects versus primitives is that objects are stored and copied "by reference", whereas primitive values: strings, numbers, booleans, etc -- are always copied "as a whole value".

That's easy to understand if we look a bit under the hood of what happens when we copy a value.

Let's start with a primitive, such as a string.

Here we put a copy of `message` into `phrase`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let message = "Hello!";
let phrase = message;
```

<<<<<<< HEAD
結果、2つの独立した変数ができます。それぞれが文字列 `"Hello!"` を格納しています。

![](variable-copy-value.svg)

とても明白な結果ですね。

オブジェクトはそうではありません。

**オブジェクトに割り当てられた変数は、オブジェクト自体ではなく、"メモリ上のアドレス"、言い換えるとオブジェクトへの "参照" を格納します。**

このような変数の例を見てみましょう:
=======
As a result we have two independent variables, each one storing the string `"Hello!"`.

![](variable-copy-value.svg)

Quite an obvious result, right?

Objects are not like that.

**A variable assigned to an object stores not the object itself, but its "address in memory" -- in other words "a reference" to it.**

Let's look at an example of such a variable:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let user = {
  name: "John"
};
```

<<<<<<< HEAD
そして、これはメモリ上に実際にどのように格納されているかを示します:

![](variable-contains-reference.svg)

オブジェクトはメモリ上のどこか（図の右側）に格納され、`user` 変数（図の左側）は、そこへの "参照" を持ちます。

`user` のようなオブジェクト変数は、オブジェクトのアドレスが記載された用紙と考えることができます。

オブジェクトへのアクションを行う際（例えば プロパティ `user.name` を取得する）JavaScript エンジンはそのアドレスにあるものを見て、実際のオブジェクト上で操作を実行します。

これが重要な理由です。

**オブジェクト変数がコピーされた場合、参照はコピーされます。が、オブジェクト自体は複製されません。**

例:
=======
And here's how it's actually stored in memory:

![](variable-contains-reference.svg)

The object is stored somewhere in memory (at the right of the picture), while the `user` variable (at the left) has a "reference" to it.

We may think of an object variable, such as `user`, like a sheet of paper with the address of the object on it.

When we perform actions with the object, e.g. take a property `user.name`, the JavaScript engine looks at what's at that address and performs the operation on the actual object.

Now here's why it's important.

**When an object variable is copied, the reference is copied, but the object itself is not duplicated.**

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js no-beautify
let user = { name: "John" };

<<<<<<< HEAD
let admin = user; // 参照のコピー
```

今、２つの変数があり、それぞれが同じオブジェクトへの参照を保持しています:

![](variable-copy-reference.svg)

ご覧の通り、依然として1つのオブジェクトですが、今はそのオブジェクトを参照している変数は2つです。

どちらの変数を使用しても、オブジェクトにアクセスでき、その内容を変更することができます:
=======
let admin = user; // copy the reference
```

Now we have two variables, each storing a reference to the same object:

![](variable-copy-reference.svg)

As you can see, there's still one object, but now with two variables that reference it.

We can use either variable to access the object and modify its contents:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = { name: 'John' };

let admin = user;

*!*
<<<<<<< HEAD
admin.name = 'Pete'; // "admin" の参照で変更されました
*/!*

alert(*!*user.name*/!*); // 'Pete', "user" の参照からも変更が確認できます
```

これは、２つの鍵があるキャビネットで、そのうちの1つ（`admin`）を使用して中身を取得したり変更したかのように捉えることができます。その後、別の鍵（`user`）を使って、同じキャビネットを開き、変更されたコンテンツにアクセスできます。

### 参照による比較

2つのオブジェクトが等しいのは、それらが同一のオブジェクトである場合のみです。

例えば、ここではaとbは同じオブジェクトを参照しているため、それらは等しいということになります:

```js run
let a = {};
let b = a; // 参照のコピー

alert( a == b ); // true, 両方の変数は同じオブジェクトを参照しています
alert( a === b ); // true
```

そして、2つの独立したオブジェクトは等しくはありません。たとえどちらも空で、同じように見えるとしてもです:

```js run
let a = {};
let b = {}; // 2つの独立したオブジェクト
=======
admin.name = 'Pete'; // changed by the "admin" reference
*/!*

alert(*!*user.name*/!*); // 'Pete', changes are seen from the "user" reference
```

It's as if we had a cabinet with two keys and used one of them (`admin`) to get into it and make changes. Then, if we later use another key (`user`), we are still opening the same cabinet and can access the changed contents.

## Comparison by reference

Two objects are equal only if they are the same object.

For instance, here `a` and `b` reference the same object, thus they are equal:

```js run
let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true
```

And here two independent objects are not equal, even though they look alike (both are empty):

```js run
let a = {};
let b = {}; // two independent objects
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

alert( a == b ); // false
```

<<<<<<< HEAD
`obj1 > obj2` のような比較、もしくは反対にプリミティブ `obj == 5` のような比較では、オブジェクトはプリミティブに変換されます。私たちはオブジェクト変換がどのように動作するのか、この後すぐに学ぶでしょう。ただし、真実を言うと、このような比較はほとんど必要とされず、通常はコードの誤りです。

## クローンとマージ, Object.assign 

前記のように、オブジェクト変数のコピーは、同一オブジェクトへの参照をもう1つ作ります。

しかし、オブジェクトを複製する必要がある場合はどうでしょうか？独立したコピー、クローンを作るには？

それは可能ですが、JavaScriptにはクローンのための組み込みメソッドがないため少し手間がかかります。しかし、それが必要になることはほとんどないでしょう。ほとんどの場合、参照によるコピーで十分だからです。

しかし、もし本当にそうしたい場合は、新しいオブジェクトを作り、プリミティブなレベルでそのプロパティを繰り返しコピーしていくことで、既存のものの構造を複製する必要があります。

このようになります:
=======
For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons are needed very rarely -- usually they appear as a result of a programming mistake.

````smart header="Const objects can be modified"
An important side effect of storing objects as references is that an object declared as `const` *can* be modified.

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

It might seem that the line `(*)` would cause an error, but it does not. The value of `user` is constant, it must always reference the same object, but properties of that object are free to change.

In other words, the `const user` gives an error only if we try to set `user=...` as a whole.

That said, if we really need to make constant object properties, it's also possible, but using totally different methods. We'll mention that in the chapter <info:property-descriptors>.
````

## Cloning and merging, Object.assign [#cloning-and-merging-object-assign]

So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object?

We can create a new object and replicate the structure of the existing one, by iterating over its properties and copying them on the primitive level.

Like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = {
  name: "John",
  age: 30
};

*!*
<<<<<<< HEAD
let clone = {}; // 新しい空オブジェクト

// すべての user プロパティをその中にコピーしましょう
=======
let clone = {}; // the new empty object

// let's copy all user properties into it
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
for (let key in user) {
  clone[key] = user[key];
}
*/!*

<<<<<<< HEAD
// 今、clone は完全に独立したクローンです
clone.name = "Pete"; // その中のデータを変更

alert( user.name ); // 依然としてオリジナルのオブジェクトは John
```

また、そのために、[Object.assign](mdn:js/Object/assign) 関数を使うことができます。

構文はこうです:

```js
Object.assign(dest[, src1, src2, src3...])
```

- 最初の引数 `dest` はターゲットとなるオブジェクトです。
- つづく引数 `src1, ..., srcN` (必要なだけ) は元となるオブジェクトです。
- すべてのオブジェクト `src1, ..., srcN` のプロパティを `dest` にコピーします。言い換えると、2つ目から始まる全ての引数のプロパティは、最初の引数のオブジェクトにコピーされます。
- `dest` を返します。

例えば、いくつかのオブジェクトを1つにマージするために使います:
```js
=======
// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object
```

We can also use the method [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

The syntax is:

```js
Object.assign(dest, ...sources)
```

- The first argument `dest` is a target object.
- Further arguments is a list of source objects.

It copies the properties of all source objects into the target `dest`, and then returns it as the result.

For example, we have `user` object, let's add a couple of permissions to it:

```js run
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
<<<<<<< HEAD
// permissions1 and permissions2 のすべてのプロパティを user にコピー
=======
// copies all properties from permissions1 and permissions2 into user
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
<<<<<<< HEAD
```

もし、既に同じプロパティ名のものをもっていた場合、上書きします:
=======
alert(user.name); // John
alert(user.canView); // true
alert(user.canEdit); // true
```

If the copied property name already exists, it gets overwritten:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // now user = { name: "Pete" }
```

<<<<<<< HEAD
また、単純なクローンをする場合の `for..in`  ループ処理を置き換えるために、`Object.assign` を使うこともできます。

```js
=======
We also can use `Object.assign` to perform a simple object cloning:

```js run
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
<<<<<<< HEAD
```

これは `user` のすべてのプロパティを空のオブジェクトにコピーし、返します。

例えば、[spread syntax](info:rest-parameters-spread) `clone = {...user}` を使用するなど、オブジェクトをクローンする方法は他にもあります。これらはチュートリアルの後半で説明します。

## ネストされたクローン

今までは、`user` のすべてのプロパティがプリミティブであると仮定していましたが、プロパティは他のオブジェクトの参照になることもあります。それらはどうなるでしょう？

このような場合です:
=======

alert(clone.name); // John
alert(clone.age); // 30
```

Here it copies all properties of `user` into the empty object and returns it.

There are also other methods of cloning an object, e.g. using the [spread syntax](info:rest-parameters-spread) `clone = {...user}`, covered later in the tutorial.

## Nested cloning

Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects.

Like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

<<<<<<< HEAD
今、`user.sizes` はオブジェクトであり、参照によるコピーがされるため、`clone.sizes = user.sizes` というコピーでは不十分です。なので、`clone` と `user` は同じ sizes を共有します:

このようになります:
=======
Now it's not enough to copy `clone.sizes = user.sizes`, because `user.sizes` is an object, and will be copied by reference, so `clone` and `user` will share the same sizes:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

<<<<<<< HEAD
alert( user.sizes === clone.sizes ); // true, 同じオブジェクト

// user と clone は sizes を共有します
user.sizes.width++;       // 一方からプロパティを変更します
alert(clone.sizes.width); // 51, 他方から変更した結果が見えます
```

これを修正するには、`user[key]` の各値を調べ、それがオブジェクトの場合はその構造も複製するクローンのループを使用する必要があります。 これは "ディープクローン(ディープコピー)" と呼ばれます。

その実現のためには、再帰を使用する、あるいは、車輪の再発明をしないために、例えば既存の JavaScript ライブラリ[lodash](https://lodash.com) にある[_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) を利用することができます。

````smart header="Const オブジェクトは変更可能です"
オブジェクトを参照として格納する重要な副作用は、`const` として宣言されたオブジェクトは変更 *できます* 。

例:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

行 `(*)` はエラーを起こすように見えるかもしれませんが、そうではありません。`const` である `user` は、常に同じオブジェクトを参照しなければなりませんが、そのオブジェクトのプロパティは自由に変更可能だからです。

つまり、`const user` は `user=...` のように全体を設定しようとした場合にのみエラーになります。

とはいえ、どうしてもオブジェクトのプロパティを定数にしたい場合はそれも可能ですが、全く異なるメソッドを使用します。これについては、<info:property-descriptors> の章で説明します。
````

## Summary

オブジェクトの割り当てやコピーは、参照によって行われます。つまり、変数には "オブジェクトの値" ではなく、 値への "参照" (メモリ上のアドレス)が格納されています。従って、このような変数をコピーしたり、それを関数の引数として渡すと、オブジェクトそのものではなく、その参照がコピーされます。

コピーされた参照を介したすべての操作（プロパティの追加/削除など）は、同じ単一のオブジェクトに対して実行されます。

"本当のコピー" (クローン) を作るには、`Object.assign` を使った "shallow copy"（浅いコピー、ネストされたオブジェクトは参照がコピーされる）を行うか、 [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) のような "deep cloning" 関数を使います。
=======
alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 60, get the result from the other one
```

To fix that and make `user` and `clone` truly separate objects, we should use a cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning" or "structured cloning". There's [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) method that implements deep cloning.


### structuredClone

The call `structuredClone(object)` clones the `object` with all nested properties.

Here's how we can use it in our example:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

*!*
let clone = structuredClone(user);
*/!*

alert( user.sizes === clone.sizes ); // false, different objects

// user and clone are totally unrelated now
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 50, not related
```

The `structuredClone` method can clone most data types, such as objects, arrays, primitive values.

It also supports circular references, when an object property references the object itself (directly or via a chain or references).

For instance:

```js run
let user = {};
// let's create a circular reference:
// user.me references the user itself
user.me = user;

let clone = structuredClone(user);
alert(clone.me === clone); // true
```

As you can see, `clone.me` references the `clone`, not the `user`! So the circular reference was cloned correctly as well.

Although, there are cases when `structuredClone` fails.

For instance, when an object has a function property:

```js run
// error
structuredClone({
  f: function() {}
});
```

Function properties aren't supported.

To handle such complex cases we may need to use a combination of cloning methods, write custom code or, to not reinvent the wheel, take an existing implementation, for instance [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).

## Summary

Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object itself.

All operations via copied references (like adding/removing properties) are performed on the same single object.

To make a "real copy" (a clone) we can use `Object.assign` for the so-called "shallow copy" (nested objects are copied by reference) or a "deep cloning" function `structuredClone` or use a custom cloning implementation, such as [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
