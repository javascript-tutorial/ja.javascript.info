<<<<<<< HEAD
# 分割代入

JavaScriptで最も使われる2つのデータ構造は `Object` と `Array` です。

- オブジェクトを使用すると、データ項目をキーごとに格納する単一のエンティティを作成できます。
- 配列は順序付けされたリストにデータ項目を集めることができます。

ですが、これらを関数にわたすとき、オブジェクト／配列全体は必要としない場合があります。個々の部分が必要な場合です。

*分割代入(Destructuring assignment)* は、配列またはオブジェクトの中身を複数の変数に *アンパック* できるようにする特別な構文であり、非常に便利な場合があります。

分割代入(非構造化/構造の分解)は、多くのパラメータとデフォルト値を持つ複雑な関数でもうまく機能します。この後すぐにそれらを見ていきます。

## Array の非構造化 

配列を変数に分割する方法の例です:

```js
// 姓名の配列があります
let arr = ["John", "Smith"]

*!*
// 分割代入
=======
# Destructuring assignment

The two most used data structures in JavaScript are `Object` and `Array`.

- Objects allow us to create a single entity that stores data items by key.
- Arrays allow us to gather data items into an ordered list.

However, when we pass these to a function, we may not need all of it. The function might only require certain elements or properties.

*Destructuring assignment* is a special syntax that allows us to "unpack" arrays or objects into a bunch of variables, as sometimes that's more convenient.

Destructuring also works well with complex functions that have a lot of parameters, default values, and so on. Soon we'll see that.

## Array destructuring

Here's an example of how an array is destructured into variables:

```js
// we have an array with a name and surname
let arr = ["John", "Smith"]

*!*
// destructuring assignment
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // John
alert(surname);  // Smith
```

<<<<<<< HEAD
これで、配列要素の代わりに変数を扱うことができます。

`split` やその他配列を返すメソッドと組み合わせると便利です:
=======
Now we can work with variables instead of array members.

It looks great when combined with `split` or other array-returning methods:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```

<<<<<<< HEAD
ご覧の通り、構文はシンプルです。ですがいくつかの独特な部分があります。より理解するために他の例も見ていきましょう。

````smart header="\"分割\" は \"破壊的\" を意味しません"
これは、項目を変数にコピーすることによって "非構造化(destructurizes)" するため、"分割代入(destructuring assignment)" と呼ばれています。 配列自体は変更されません。

これは、より短い書き方になります:
=======
As you can see, the syntax is simple. There are several peculiar details though. Let's see more examples to understand it better.

````smart header="\"Destructuring\" does not mean \"destructive\"."
It's called "destructuring assignment," because it "destructurizes" by copying items into variables. However, the array itself is not modified.

It's just a shorter way to write:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

<<<<<<< HEAD
````smart header="最初の要素を無視する"
配列の不要な要素は、余分なカンマをつけることで捨てることができます:

```js run
*!*
// 1番目、2番目の要素が不要の場合
let [, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
=======
````smart header="Ignore elements using commas"
Unwanted elements of the array can also be thrown away via an extra comma:

```js run
*!*
// second element is not needed
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
*/!*

alert( title ); // Consul
```

<<<<<<< HEAD
上のコードでは、最初の2つの要素がスキップされ、3つ目は `title` に代入され、残りもスキップされています。
````

````smart header="右辺は任意の反復可能(iterable)に対して動作します"

...実際には配列だけでなく、任意の反復可能(iterable)に対して使うことができます:
=======
In the code above, the second element of the array is skipped, the third one is assigned to `title`, and the rest of the array items are also skipped (as there are no variables for them).
````

````smart header="Works with any iterable on the right-side"

...Actually, we can use it with any iterable, not only arrays:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
<<<<<<< HEAD
内部的には分割代入は右辺の値に対してイテレーションすることで動作するため、これも動作します。これは `=` の右側の値に対して `for..of` を呼び出し、値を代入するためのシンタックスシュガーの一種です。
````


````smart header="左辺では任意のものに代入することが可能です"
左辺には任意の "割り当て可能なもの" を指定することができます。

例えば、オブジェクトのプロパティも指定できます:
=======
That works, because internally a destructuring assignment works by iterating over the right value. It's a kind of syntax sugar for calling `for..of` over the value to the right of `=` and assigning the values.
````


````smart header="Assign to anything at the left-side"
We can use any "assignables" on the left side.

For instance, an object property:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```

````

<<<<<<< HEAD
````smart header=".entries() を使ったループ"
以前のチャプターで、[Object.entries(obj)](mdn:js/Object/entries) メソッドを見ました。

オブジェクトの key-value をループするのに、分割代入を一緒に使うこともできます:
=======
````smart header="Looping with .entries()"
In the previous chapter, we saw the [Object.entries(obj)](mdn:js/Object/entries) method.

We can use it with destructuring to loop over the keys-and-values of an object:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let user = {
  name: "John",
  age: 30
};

<<<<<<< HEAD
// key-value のループ
=======
// loop over the keys-and-values
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```

<<<<<<< HEAD
`Map` を使用した同様のコードは、反復可能なのでよりシンプルです:
=======
The similar code for a `Map` is simpler, as it's iterable:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
<<<<<<< HEAD
// Map は [key, value] ペアで反復します
=======
// Map iterates as [key, value] pairs, very convenient for destructuring
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```
````

<<<<<<< HEAD
````smart header="変数を入れ替えるトリック"
分割代入を使用して２つの変数の値を入れ替える、広く知られたトリックがあります:
=======
````smart header="Swap variables trick"
There's a well-known trick for swapping values of two variables using a destructuring assignment:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let guest = "Jane";
let admin = "Pete";

<<<<<<< HEAD
// 値を入れかえましょう: guest=Pete, admin=Jane
=======
// Let's swap the values: make guest=Pete, admin=Jane
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)
```

<<<<<<< HEAD
ここでは、2つの変数の一時的な配列を作り、その直後、入れ替えた順番で分割しました。

この方法で２つ以上の変数を入れ替えることも可能です。
````

### 残り '...'

通常、代入する変数の数よりも配列の要素数のほうが多い場合、"余分な" 項目は省略されます。

例えば、ここでは2つの項目が取得され、残りは無視されています:
=======
Here we create a temporary array of two variables and immediately destructure it in swapped order.

We can swap more than two variables this way.
````

### The rest '...'

Usually, if the array is longer than the list at the left, the "extra" items are omitted.

For example, here only two items are taken, and the rest is just ignored:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
<<<<<<< HEAD
// その以降の項目はどこにも代入されていません
```

続く項目もすべて取得したい場合は、３つのドット `"..."` を使用して "残り" を取得するパラメータを１つ追加します。:
=======
// Further items aren't assigned anywhere
```

If we'd like also to gather all that follows -- we can add one more parameter that gets "the rest" using three dots `"..."`:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

*!*
<<<<<<< HEAD
// rest は３つ目の項目からの配列です
=======
// rest is an array of items, starting from the 3rd one
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

<<<<<<< HEAD
`rest `の値は、残りの配列要素の配列です。

`rest` の代わりに他の変数名を使用できます。その前に3つのドットがあり、分割代入の最後にくるようにしてください。
=======
The value of `rest` is the array of the remaining array elements.

We can use any other variable name in place of `rest`, just make sure it has three dots before it and goes last in the destructuring assignment.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// now titles = ["Consul", "of the Roman Republic"]
```

<<<<<<< HEAD
### デフォルト値

代入する変数の数よりも配列の要素数のほうが少ない場合、エラーにはなりません。不足している値は undefined とみなされます:
=======
### Default values

If the array is shorter than the list of variables on the left, there will be no errors. Absent values are considered undefined:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

<<<<<<< HEAD
値がなかった場合に "デフォルト" 値を使いたければ、`=` を使ってデフォルト値を指定することができます:

```js run
*!*
// デフォルト値
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (配列から)
alert(surname); // Anonymous (デフォルトが使用されました)
```

デフォルト値はより複雑な式や関数呼び出しにすることもできます。それらは値が提供されなかったときのみ評価されます。

例えば、ここでは2つのデフォルトに対して `prompt` 関数を使っていますが、値がなかった場合のみ実行されます:

```js run
// 姓のプロンプトのみを実行する
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (配列から)
alert(surname); // プロンプトが得たもの
```

注意: `prompt` は値がない場合（`surname`）にのみ実行されます。

## オブジェクトの非構造化 

分割代入はオブジェクトでも動作します。

基本の構文は次の通りです:

```js
let {var1, var2} = {var1:…, var2…}
```

右辺には、変数に分割したい既存のオブジェクトがあります。左辺には該当するプロパティの "パターン" を指定します。単純なケースでは、それは `{...}` に変数名を並べたものです。

例:
=======
If we want a "default" value to replace the missing one, we can provide it using `=`:

```js run
*!*
// default values
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (from array)
alert(surname); // Anonymous (default used)
```

Default values can be more complex expressions or even function calls. They are evaluated only if the value is not provided.

For instance, here we use the `prompt` function for two defaults:

```js run
// runs only prompt for surname
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (from array)
alert(surname); // whatever prompt gets
```

Please note: the `prompt` will run only for the missing value (`surname`).

## Object destructuring

The destructuring assignment also works with objects.

The basic syntax is:

```js
let {var1, var2} = {var1:…, var2:…}
```

We should have an existing object on the right side, that we want to split into variables. The left side contains an object-like "pattern" for corresponding properties. In the simplest case, that's a list of variable names in `{...}`.

For instance:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

<<<<<<< HEAD
プロパティ `options.title`, `options.width` と `options.height` は、該当する変数に代入されます。順序は関係ありません。

順番は関係ありません。これも動作します。:

```js
// let {...} 内のプロパティ順を変えた場合
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

左辺のパターンはより複雑で、プロパティと変数の間のマッピングを指定することができます。

プロパティを別の名前の変数に代入したい場合、例えば、`options.width` を変数名 `w` にしたい場合、コロンを使うことでセットすることができます:
=======
Properties `options.title`, `options.width` and `options.height` are assigned to the corresponding variables.

The order does not matter. This works too:

```js
// changed the order in let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

The pattern on the left side may be more complex and specify the mapping between properties and variables.

If we want to assign a property to a variable with another name, for instance, make `options.width` go into the variable named `w`, then we can set the variable name using a colon:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
<<<<<<< HEAD
// { 元のプロパティ: ターゲットとなる変数 }
=======
// { sourceProperty: targetVariable }
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

<<<<<<< HEAD
コロンは "何を: どこに" を示します。上の例では、プロパティ `width` は `w`に、プロパティ `height` は `h`, `title` は同じ名前に代入されます。

値がない可能性のあるプロパティについては、次のように `"="` を使ってデフォルト値を設定できます:
=======
The colon shows "what : goes where". In the example above the property `width` goes to `w`, property `height` goes to `h`, and `title` is assigned to the same name.

For potentially missing properties we can set default values using `"="`, like this:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

<<<<<<< HEAD
配列や関数パラメータのように、デフォルト値は任意の式または関数呼び出しにすることができます。それらは値がない場合に評価されます。

下のコードは、 width はプロンプトで尋ねられますが、 title は聞かれません。
=======
Just like with arrays or function parameters, default values can be any expressions or even function calls. They will be evaluated if the value is not provided.

In the code below `prompt` asks for `width`, but not for `title`:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
<<<<<<< HEAD
alert(width);  // (プロンプトの結果)
```

コロンと等号の両方を組み合わせることもできます。:
=======
alert(width);  // (whatever the result of prompt is)
```

We also can combine both the colon and equality:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

<<<<<<< HEAD
多くのプロパティをもつ複雑なオブジェクトがあったとしても、必要なものだけを抽出することができます:
=======
If we have a complex object with many properties, we can extract only what we need:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

<<<<<<< HEAD
// title だけ変数として抽出
=======
// only extract title as a variable
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
let { title } = options;

alert(title); // Menu
```

<<<<<<< HEAD
### 残りのパターン "..."

仮に、指定した変数よりも多くのプロパティをオブジェクトがもっていたらどうなるでしょうか。いくつか設定した後、"残り" をどこかにまとめて代入することはできるでしょうか？

配列でしたのと同じように、残りのパターンを使用することができます。いくつかの古いブラウザ（IE、polyfill するために Babel を使用）ではサポートされていませんが、モダンブラウザでは動作します。

このようになります:
=======
### The rest pattern "..."

What if the object has more properties than we have variables? Can we take some and then assign the "rest" somewhere?

We can use the rest pattern, just like we did with arrays. It's not supported by some older browsers (IE, use Babel to polyfill it), but works in modern ones.

It looks like this:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
<<<<<<< HEAD
// title = title と名前付けられたプロパティ
// rest = オブジェクトのプロパティの残り
=======
// title = property named title
// rest = object with the rest of properties
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
let {title, ...rest} = options;
*/!*

// now title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

<<<<<<< HEAD
````smart header="Gotcha without `let`"
上の例で、変数は代入の直前に宣言されています: `let {…} = {…}`。もちろん `let` なしで既存の変数を使うこともできますが、罠もあります。

これは動作しません:
```js run
let title, width, height;

// この行はエラーです
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

問題は、JavaScriptがメインコードフローの `{...}` をコードブロックとして扱うことです。このようなコードブロックは、次のように文をグループ化するために使われます。
=======
````smart header="Gotcha if there's no `let`"
In the examples above variables were declared right in the assignment: `let {…} = {…}`. Of course, we could use existing variables too, without `let`. But there's a catch.

This won't work:
```js run
let title, width, height;

// error in this line
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

The problem is that JavaScript treats `{...}` in the main code flow (not inside another expression) as a code block. Such code blocks can be used to group statements, like this:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
{
  // a code block
  let message = "Hello";
  // ...
  alert( message );
}
```

<<<<<<< HEAD
そのため、ここでは JavaScript はコードブロックがあることを前提としています。したがってエラーになりますが、本当は分割代入がしたいです。

コードブロックではないと JavaScript に示すためには、代入全体を括弧 `(...)` で囲む必要があります:
=======
So here JavaScript assumes that we have a code block, that's why there's an error. We want destructuring instead.

To show JavaScript that it's not a code block, we can wrap the expression in parentheses `(...)`:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let title, width, height;

<<<<<<< HEAD
// これでOKです
=======
// okay now
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

<<<<<<< HEAD
## 入れ子構造の非構造化 

オブジェクトまたは配列に他のオブジェクトや配列が含まれている場合、より複雑な左辺のパターンを使用して、より深い部分を抽出することもできます。

下のコードでは、`options` はプロパティ `size` の中に別のオブジェクトを持っており、プロパティ `items` に配列を持っています。ここで、代入する左辺のパターンは同じ構造を持っています。:
=======
## Nested destructuring

If an object or an array contains other nested objects and arrays, we can use more complex left-side patterns to extract deeper portions.

In the code below `options` has another object in the property `size` and an array in the property `items`. The pattern on the left side of the assignment has the same structure to extract values from them:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
<<<<<<< HEAD
  extra: true 
};

// わかりやすくするために、複数の行での分割代入
let {
  size: { // ここにサイズを格納
    width,
    height
  },
  items: [item1, item2], // ここに items を割り当てる
  title = "Menu" // オブジェクトには存在しない (デフォルト値が使われます)
=======
  extra: true
};

// destructuring assignment split in multiple lines for clarity
let {
  size: { // put size here
    width,
    height
  },
  items: [item1, item2], // assign items here
  title = "Menu" // not present in the object (default value is used)
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

<<<<<<< HEAD
左辺で言及されていなかった `extra` を除いた `options` オブジェクト全体が該当する変数に代入されます。

![](destructuring-complex.svg)

最終的には、`width`, `height`, `item1`, `item2` と、デフォルト値から `title` を得ます。

代わりに中身を取得しているので、`size` と `items` の変数はないことに注意してください。

## スマートな関数パラメータ 

ある関数が多くのパラメータを持っており、ほどんどがオプションであることがあります。特にユーザインタフェースのときに当てはまります。メニューを作る関数を想像してみてください。幅と高さ、タイトル、アイテムのリストなどを持っています。

ここに、良くない関数の書き方があります:
=======
All properties of `options` object except `extra` which is absent in the left part, are assigned to corresponding variables:

![](destructuring-complex.svg)

Finally, we have `width`, `height`, `item1`, `item2` and `title` from the default value.

Note that there are no variables for `size` and `items`, as we take their content instead.

## Smart function parameters

There are times when a function has many parameters, most of which are optional. That's especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, an item list and so on.

Here's a bad way to write such a function:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

<<<<<<< HEAD
現実の問題の1つは、どうやって引数の順番を覚えるか、です。コードがしっかりドキュメント化されていれば、通常は IDE が助けてくれます。しかし、他にも問題があります。ほとんどのパラメータがデフォルトでOKの場合の関数の呼び方です。

こうなりますか?

```js
// デフォルト値で良い場合は undefined にする
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

これは見にくく、より多くのパラメータを扱う場合、非常に読みにくいです。

このようなケースで非構造化が役に立ちます!

オブエジェクトとしてパラメータを渡し、関数はそれらを変数に分解します:

```js run
// オブジェクトを関数に渡す
=======
In real-life, the problem is how to remember the order of arguments. Usually, IDEs try to help us, especially if the code is well-documented, but still... Another problem is how to call a function when most parameters are ok by default.

Like this?

```js
// undefined where default values are fine
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

That's ugly. And becomes unreadable when we deal with more parameters.

Destructuring comes to the rescue!

We can pass parameters as an object, and the function immediately destructurizes them into variables:

```js run
// we pass object to function
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

<<<<<<< HEAD
// ...そしてすぐに変数に展開します
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – options から取得,
  // width, height – デフォルト値を利用
=======
// ...and it immediately expands it to variables
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – taken from options,
  // width, height – defaults used
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

<<<<<<< HEAD
また、入れ子のオブジェクトやコロンのマッピング使った複雑な非構造化を使うこともできます:
=======
We can also use more complex destructuring with nested objects and colon mappings:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
<<<<<<< HEAD
  width: w = 100,  // width は w に
  height: h = 200, // height は h に
  items: [item1, item2] // items の最初の要素は item1 へ、次は item2 へ
=======
  width: w = 100,  // width goes to w
  height: h = 200, // height goes to h
  items: [item1, item2] // items first element goes to item1, second to item2
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

<<<<<<< HEAD
構文は分割代入と同じです:
=======
The full syntax is the same as for a destructuring assignment:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

<<<<<<< HEAD
パラメータのオブジェクトに対して、プロパティ `incomingProperty` に対応する変数 `varName` があり、デフォルトでは `defaultValue` になります。

なお、このような分割代入は `showMenu()` に引数があることを前提にしている点に注意してください。もしすべての値をデフォルトにしたい場合には、空のオブジェクトを指定する必要があります:

```js
showMenu({}); // OK, すべての値はデフォルト値になります

showMenu(); // これはエラーになります
```

これについては、非構造化対象全体のデフォルト値に `{}` を指定することで対応することができます:
=======
Then, for an object of parameters, there will be a variable `varName` for the property `incomingProperty`, with `defaultValue` by default.

Please note that such destructuring assumes that `showMenu()` does have an argument. If we want all values by default, then we should specify an empty object:

```js
showMenu({}); // ok, all values are default

showMenu(); // this would give an error
```

We can fix this by making `{}` the default value for the whole object of parameters:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

<<<<<<< HEAD
上のコードでは、全体の引数オブジェクトがデフォルトで `{}` なので常に分解する何かがあります。

## サマリ 

- 分割代入はオブジェクトや配列を多数の変数に即座にマッピングすることができます。
- オブジェクト構文:
    ```js
    let {prop : varName = default, ...rest} = object
    ```

    これはプロパティ `prop` が変数 `varName` に代入され、もしこのようなプロパティが存在しない場合には `default` が使われることを意味します。

    マッピングがないオブジェクトプロパティは、`rest` オブジェクトへコピーされます。

- 配列構文:

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    最初のアイテムは `item1` に行き、2つ目は `item2` に行きます。残りのすべてのアイテムは配列 `rest` になります。

- ネストされた配列/オブジェクトからデータを抽出することも可能で、その場合、左辺は右辺と同じ構造を指定する必要があります。
=======
In the code above, the whole arguments object is `{}` by default, so there's always something to destructurize.

## Summary

- Destructuring assignment allows for instantly mapping an object or array onto many variables.
- The full object syntax:
    ```js
    let {prop : varName = defaultValue, ...rest} = object
    ```

    This means that property `prop` should go into the variable `varName` and, if no such property exists, then the `default` value should be used.

    Object properties that have no mapping are copied to the `rest` object.

- The full array syntax:

    ```js
    let [item1 = defaultValue, item2, ...rest] = array
    ```

    The first item goes to `item1`; the second goes into `item2`, and all the rest makes the array `rest`.

- It's possible to extract data from nested arrays/objects, for that the left side must have the same structure as the right one.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
