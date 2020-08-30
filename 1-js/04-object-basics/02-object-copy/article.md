# Object copying, references

One of the fundamental differences of objects vs primitives is that they are stored and copied "by reference".

Primitive values: strings, numbers, booleans -- are assigned/copied "as a whole value".

For instance:

```js
let message = "Hello!";
let phrase = message;
```

As a result we have two independent variables, each one is storing the string `"Hello!"`.

![](variable-copy-value.svg)

Objects are not like that.

**A variable stores not the object itself, but its "address in memory", in other words "a reference" to it.**

Here's the picture for the object:

```js
let user = {
  name: "John"
};
```

![](variable-contains-reference.svg)

Here, the object is stored somewhere in memory. And the variable `user` has a "reference" to it.

**When an object variable is copied -- the reference is copied, the object is not duplicated.**

For instance:

```js no-beautify
let user = { name: "John" };

let admin = user; // copy the reference
```

Now we have two variables, each one with the reference to the same object:

![](variable-copy-reference.svg)

We can use any variable to access the object and modify its contents:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // changed by the "admin" reference
*/!*

alert(*!*user.name*/!*); // 'Pete', changes are seen from the "user" reference
```

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

alert( a == b ); // false
```

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

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // 新しい空オブジェクト

// すべての user プロパティをその中にコピーしましょう
for (let key in user) {
  clone[key] = user[key];
}
*/!*

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
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// permissions1 and permissions2 のすべてのプロパティを user にコピー
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
```

もし、受け取ったオブジェクト (`user`) が既に同じプロパティ名のものをもっていたら、上書きします:

```js
let user = { name: "John" };

// name を上書き, isAdmin を追加
Object.assign(user, { name: "Pete", isAdmin: true });

// now user = { name: "Pete", isAdmin: true }
```

また、単純なクローンをする場合のループ処理を置き換えるために、`Object.assign` を使うこともできます。

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

これは `user` のすべてのプロパティを空のオブジェクトにコピーし、返します。ループの場合と同じことをしますが、より短い記載になります。

今まで、`user` のすべてのプロパティがプリミティブであると仮定していましたが、プロパティは他のオブジェクトの参照になることもあります。それらはどうなるでしょう？

このような:
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

今、`user.sizes` はオブジェクトであり、参照によるコピーがされるため、`clone.sizes = user.sizes` というコピーでは不十分です。なので、`clone` と `user` は同じ sizes を共有します:

このようになります:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

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

All operations via copied references (like adding/removing properties) are performed on the same single object.

To make a "real copy" (a clone) we can use `Object.assign` for the so-called "shallow copy" (nested objects are copied by reference) or a "deep cloning" function, such as [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
