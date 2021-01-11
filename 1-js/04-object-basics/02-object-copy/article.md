<<<<<<< HEAD
# Object copying, references

One of the fundamental differences of objects vs primitives is that they are stored and copied "by reference".

Primitive values: strings, numbers, booleans -- are assigned/copied "as a whole value".

For instance:
=======
# Object references and copying

One of the fundamental differences of objects versus primitives is that objects are stored and copied "by reference", whereas primitive values: strings, numbers, booleans, etc -- are always copied "as a whole value".

That's easy to understand if we look a bit under the hood of what happens when we copy a value.

Let's start with a primitive, such as a string.

Here we put a copy of `message` into `phrase`:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js
let message = "Hello!";
let phrase = message;
```

<<<<<<< HEAD
As a result we have two independent variables, each one is storing the string `"Hello!"`.

![](variable-copy-value.svg)

Objects are not like that.

**A variable stores not the object itself, but its "address in memory", in other words "a reference" to it.**

Here's the picture for the object:
=======
As a result we have two independent variables, each one storing the string `"Hello!"`.

![](variable-copy-value.svg)

Quite an obvious result, right?

Objects are not like that.

**A variable assigned to an object stores not the object itself, but its "address in memory" -- in other words "a reference" to it.**

Let's look at an example of such a variable:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js
let user = {
  name: "John"
};
```

<<<<<<< HEAD
![](variable-contains-reference.svg)

Here, the object is stored somewhere in memory. And the variable `user` has a "reference" to it.

**When an object variable is copied -- the reference is copied, the object is not duplicated.**
=======
And here's how it's actually stored in memory:

![](variable-contains-reference.svg)

The object is stored somewhere in memory (at the right of the picture), while the `user` variable (at the left) has a "reference" to it.

We may think of an object variable, such as `user`, as like a sheet of paper with the address of the object on it.

When we perform actions with the object, e.g. take a property `user.name`, the JavaScript engine looks at what's at that address and performs the operation on the actual object.

Now here's why it's important.

**When an object variable is copied, the reference is copied, but the object itself is not duplicated.**
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

For instance:

```js no-beautify
let user = { name: "John" };

let admin = user; // copy the reference
```

<<<<<<< HEAD
Now we have two variables, each one with the reference to the same object:

![](variable-copy-reference.svg)

We can use any variable to access the object and modify its contents:
=======
Now we have two variables, each storing a reference to the same object:

![](variable-copy-reference.svg)

As you can see, there's still one object, but now with two variables that reference it.

We can use either variable to access the object and modify its contents:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // changed by the "admin" reference
*/!*

alert(*!*user.name*/!*); // 'Pete', changes are seen from the "user" reference
```

<<<<<<< HEAD
The example above demonstrates that there is only one object. As if we had a cabinet with two keys and used one of them (`admin`) to get into it. Then, if we later use another key (`user`) we can see changes.

### 参照による比較

オブジェクトの等価 `==` と厳密等価　`===` 演算子は、全く同じように動作します。

**2つのオブジェクトは、同じオブジェクトのときだけ等しくなります。**

例えば、2つの変数が同じオブジェクトを参照しているとき、それらは等しいです:

```js run
let a = {};
let b = a; // 参照のコピー

alert( a == b ); // true, 両方の変数は同じオブジェクトを参照しています
alert( a === b ); // true
```

また、2つの独立したオブジェクトは等しくありません。たとえそれらが空だとしても:

```js run
let a = {};
let b = {}; // 2つの独立したオブジェクト
=======
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
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

alert( a == b ); // false
```

<<<<<<< HEAD
`obj1 > obj2` のような比較、もしくは反対にプリミティブ `obj == 5` のような比較では、オブジェクトはプリミティブに変換されます。私たちはオブジェクト変換がどのように動作するのか、この後すぐに学ぶでしょう。ただし、真実を言うと、このような比較はほとんど必要とされず、通常はコードの誤りです。

### Const オブジェクト

`const` として宣言されたオブジェクトは変更 *できます* 。

例:

```js run
const user = {
  name: "John"
};

*!*
user.age = 25; // (*)
*/!*

alert(user.age); // 25
```

行 `(*)` はエラーを起こすように見えるかもしれませんが、それらは全く問題ありません。`const` は `user` 自身の値を固定するからです。そしてここで `user` は常に同じオブジェクトへの参照を保持します。行　`(*)` はオブジェクトの *内側* へ行っており、`user` の再代入ではありません。

`const` は、もし `user` に他の何かをセットしようとしたときにエラーになります。例えば:

```js run
const user = {
  name: "John"
};

*!*
// エラー (user の再代入ができない)
*/!*
user = {
  name: "Pete"
};
```

...そうすると、もしオブジェクトのプロパティを定数にしたい場合はどうすればいいでしょう？ `user.age = 25` がエラーになるように。そうすることも可能です。 これについては、チャプター <info:property-descriptors> で説明します。

## クローンとマージ, Object.assign 

これまでの通り、オブジェクト変数のコピーは、同じオブジェクトへの参照をもう1つ作ります。

しかし、もしオブジェクトの複製が必要な場合はどうしましょう？独立したコピー、クローンを作るには？

それは可能ですが、JavaScriptには組み込みのメソッドがないため多少難しいです。実際、それはめったに必要ありません。参照によるコピーはたいていの場合で問題ありません。

しかし、もし本当にそうしたい場合は、新しいオブジェクトを作り、プリミティブなレベルでそのプロパティを繰り返しコピーしていくことで、既存のものの構造を複製する必要があります。

このようになります:
=======
For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons are needed very rarely -- usually they appear as a result of a programming mistake.

## Cloning and merging, Object.assign

So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object? Create an independent copy, a clone?

That's also doable, but a little bit more difficult, because there's no built-in method for that in JavaScript. But there is rarely a need -- copying by reference is good most of the time.

But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its properties and copying them on the primitive level.

Like this:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

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
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
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

- 引数 `dest`, そして `src1, ..., srcN` (必要なだけ) はオブジェクトです。
- すべてのオブジェクト `src1, ..., srcN` のプロパティを `dest` にコピーします。言い換えると、2つ目から始まる全ての引数のプロパティは、最初の引数のオブジェクトにコピーされます。そして `dest` を返します。

例えば、いくつかのオブジェクトを1つにマージするために使います:
=======
// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object
```

Also we can use the method [Object.assign](mdn:js/Object/assign) for that.

The syntax is:

```js
Object.assign(dest, [src1, src2, src3...])
```

- The first argument `dest` is a target object.
- Further arguments `src1, ..., srcN` (can be as many as needed) are source objects.
- It copies the properties of all source objects `src1, ..., srcN` into the target `dest`. In other words, properties of all arguments starting from the second are copied into the first object.
- The call returns `dest`.

For instance, we can use it to merge several objects into one:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
<<<<<<< HEAD
// permissions1 and permissions2 のすべてのプロパティを user にコピー
=======
// copies all properties from permissions1 and permissions2 into user
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
```

<<<<<<< HEAD
もし、受け取ったオブジェクト (`user`) が既に同じプロパティ名のものをもっていたら、上書きします:

```js
let user = { name: "John" };

// name を上書き, isAdmin を追加
Object.assign(user, { name: "Pete", isAdmin: true });

// now user = { name: "Pete", isAdmin: true }
```

また、単純なクローンをする場合のループ処理を置き換えるために、`Object.assign` を使うこともできます。
=======
If the copied property name already exists, it gets overwritten:

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // now user = { name: "Pete" }
```

We also can use `Object.assign` to replace `for..in` loop for simple cloning:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

<<<<<<< HEAD
これは `user` のすべてのプロパティを空のオブジェクトにコピーし、返します。ループの場合と同じことをしますが、より短い記載になります。

今まで、`user` のすべてのプロパティがプリミティブであると仮定していましたが、プロパティは他のオブジェクトの参照になることもあります。それらはどうなるでしょう？

このような:
=======
It copies all properties of `user` into the empty object and returns it.

## Nested cloning

Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects. What to do with them?

Like this:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
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
Now it's not enough to copy `clone.sizes = user.sizes`, because the `user.sizes` is an object, it will be copied by reference. So `clone` and `user` will share the same sizes:

Like this:

>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
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

上記のケースやより複雑なケースを処理するディープクローン作成のための標準的なアルゴリズムがあります、それは[Structured cloning algorithm](https://w3c.github.io/html/infrastructure.html#internal-structured-cloning-algorithm) と呼ばれています。
車輪の再発明をしないために、JavaScript ライブラリ[lodash](https://lodash.com) にある処理を利用することができます。そのメソッドは [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) と呼ばれています。

## Summary

オブジェクトは、参照によって代入やコピーがされます。つまり、変数は "オブジェクトの値" ではなく、 値への "参照" (メモリ上のアドレス)を格納します。従って、このような変数をコピーしたり、それを関数の引数として渡すと、オブジェクトではなく参照がコピーされます。 コピーされた参照（プロパティの追加/削除など）によるすべての操作は、同じ単一のオブジェクトに対して実行されます。

"本当のコピー" (クローン) をするためには、`Object.assign` または [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) を使います。

このチャプターで学んだのは、"普通のオブジェクト"、あるいは単に "オブジェクト" と呼ばれています。


Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object.
=======
alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width++;       // change a property from one place
alert(clone.sizes.width); // 51, see the result from the other one
```

To fix that, we should use a cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning".

We can use recursion to implement it. Or, to not reinvent the wheel, take an existing implementation, for instance [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).

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

## Summary

Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object itself.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

All operations via copied references (like adding/removing properties) are performed on the same single object.

To make a "real copy" (a clone) we can use `Object.assign` for the so-called "shallow copy" (nested objects are copied by reference) or a "deep cloning" function, such as [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
