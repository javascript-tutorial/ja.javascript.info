# 分割代入

JavaScriptで最も使われる2つのデータ構造は `Object` と `Array` です。

<<<<<<< HEAD
オブジェクトは多くの情報を1つのエンティティにまとめることができ、配列は順序付けされたコレクションを格納することができます。従って、私たちはオブジェクトまたは配列を作り、それを1つのエンティティとして扱うことができます。また、それを関数呼び出しの際に渡すこともできます。

*分割代入(Destructuring assignment)* は、配列またはオブジェクトの中身を複数の変数に代入できる特別な構文です。デストラクタリング(非構造化/構造の分解)は、多くのパラメータとデフォルト値を持つ複雑な関数でもうまく機能します。このチャプターでは、すぐにこれらがどのように処理されているかわかるでしょう。
=======
Objects allow us to create a single entity that stores data items by key, and arrays allow us to gather data items into an ordered collection.

But when we pass those to a function, it may need not an object/array as a whole, but rather individual pieces.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

*Destructuring assignment* is a special syntax that allows us to "unpack" arrays or objects into a bunch of variables, as sometimes that's more convenient. Destructuring also works great with complex functions that have a lot of parameters, default values, and so on.

## Array の非構造化 

配列を変数に分割する方法の例です:

```js
// 姓名の配列があります
let arr = ["Ilya", "Kantor"]

*!*
<<<<<<< HEAD
// 分割代入
=======
// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
let [firstName, surname] = arr;
*/!*

alert(firstName); // Ilya
alert(surname);  // Kantor
```

これで、配列要素の代わりに変数を扱うことができます。

`split` やその他配列を返すメソッドと組み合わせると便利です:

```js
let [firstName, surname] = "Ilya Kantor".split(' ');
```

<<<<<<< HEAD
````smart header="\"分割\" は \"破壊的\" を意味しません"
これは、項目を変数にコピーすることによって "非構造化(destructurizes)" するため、"分割代入(destructuring assignment)" と呼ばれています。 配列自体は変更されません。
=======
````smart header="\"Destructuring\" does not mean \"destructive\"."
It's called "destructuring assignment," because it "destructurizes" by copying items into variables. But the array itself is not modified.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

これは、より短い書き方になります:
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
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
*/!*

alert( title ); // Consul
```

<<<<<<< HEAD
上のコードでは、最初の2つの要素がスキップされ、3つ目は `title` に代入され、残りもスキップされています。
=======
In the code above, the second element of the array is skipped, the third one is assigned to `title`, and the rest of the array items is also skipped (as there are no variables for them).
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
````

````smart header="右辺は任意の反復可能(iterable)に対して動作します"

実際には配列だけでなく、任意の反復可能(iterable)に対して使うことができます:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

````


````smart header="左辺では任意のものに代入することが可能です"

左辺には任意の "割り当て可能なもの" を指定することができます。

例えば、オブジェクトのプロパティも指定できます:
```js run
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');

alert(user.name); // Ilya
```

````

````smart header=".entries() を使ったループ"

以前のチャプターで、[Object.entries(obj)](mdn:js/Object/entries) メソッドを見ました。

オブジェクトの key-value をループするのに、分割代入を一緒に使うこともできます:

```js run
let user = {
  name: "John",
  age: 30
};

// key-value のループ
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```

map も同様です:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```
````

### 残り '...'

最初の値を取得するだけでなく、それに続くすべての値も集めたい場合、"残りの部分" の取得を意味する 3つのドッド `"..."` をパラメータに追加することで実現できます:


```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

alert(name1); // Julius
alert(name2); // Caesar

*!*
// Note that type of `rest` is Array.
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

`rest` は残りの値が要素として格納されている配列です。 `rest` の代わりに他の変数名を使うこともできます。変数名の前には3つのドットがあり、利用時には分割代入の最後にくるようにしてください。

### デフォルト値

代入する変数の数よりも配列の要素数のほうが少ない場合、エラーにはなりません。不足している値は undefined とみなされます:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

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


## オブジェクトの非構造化 

分割代入はオブジェクトでも動作します。

基本の構文は次の通りです:

```js
let {var1, var2} = {var1:…, var2…}
```

右辺には、変数に分割したい既存のオブジェクトがあります。左辺には該当するプロパティの "パターン" を指定します。単純なケースでは、それは `{...}` に変数名を並べたものです。

例:

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

プロパティ `options.title`, `options.width` と `options.height` は、該当する変数に代入されます。順序は関係ありません。これも動作します。:

```js
<<<<<<< HEAD
// let {...} 内のプロパティ順を変えた場合
=======
// changed the order in let {...}
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

左辺のパターンはより複雑で、プロパティと変数の間のマッピングを指定することができます。

プロパティを別の名前の変数に代入したい場合、例えば、`options.width` を変数名 `w` にしたい場合、コロンを使うことでセットすることができます:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { 元のプロパティ: ターゲットとなる変数 }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

コロンは "何を: どこに" を示します。上の例では、プロパティ `width` は `w`に、プロパティ `height` は `h`, `title` は同じ名前に代入されます。

値がない可能性のあるプロパティについては、次のように `"="` を使ってデフォルト値を設定できます:

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

配列や関数パラメータのように、デフォルト値は任意の式または関数呼び出しにすることができます。それらは値がない場合に評価されます。

下のコードは、 width はプロンプトで尋ねられますが、 title は聞かれません。

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
=======
alert(width);  // (whatever the result of prompt is)
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
```

コロンと等号の両方を組み合わせることもできます。:

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
### 残りの演算子(Rest operator)
=======
### The rest pattern "..."
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

仮に、指定した変数よりも多くのプロパティをオブジェクトがもっていたらどうなるでしょうか。いくつか設定した後、"残り" をどこかにまとめて代入することはできるでしょうか？

<<<<<<< HEAD
ここで、残りの演算子（3つのドット）を使用するという仕様はほぼ標準ですが、ほとんどのブラウザではまだサポートされていません。
=======
We can use the rest pattern, just like we did with arrays. It's not supported by some older browsers (IE, use Babel to polyfill it), but works in modern ones.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

このようになります:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = property named title
// rest = object with the rest of properties
let {title, ...rest} = options;
*/!*

// now title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```



<<<<<<< HEAD
````smart header="Gotcha without `let`"
上の例で、変数は代入の直前に宣言されています: `let {…} = {…}`。もちろん既存の変数を使うこともできますが、罠もあります。
=======
````smart header="Gotcha if there's no `let`"
In the examples above variables were declared right in the assignment: `let {…} = {…}`. Of course, we could use existing variables too, without `let`. But there's a catch.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

これは動作しません:
```js run
let title, width, height;

// この行はエラーです
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

問題は、JavaScriptがメインコードフローの `{...}' をコードブロックとして扱うことです。このようなコードブロックは、次のように文をグループ化するために使われます。

```js run
{
  // a code block
  let message = "Hello";
  // ...
  alert( message );
}
```

<<<<<<< HEAD
コードブロックではないと JavaScript に示すためには、代入全体を括弧 `(...)` で囲む必要があります:
=======
To show JavaScript that it's not a code block, we can make it a part of an expression by wrapping in parentheses `(...)`:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

```js run
let title, width, height;

<<<<<<< HEAD
// これでOKです
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;
=======
// okay now
*!*(*/!*{title, width, height}*!*)*/!* = {title: "Menu", width: 200, height: 100};
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

alert( title ); // Menu
```

````

## 入れ子構造の非構造化 

オブジェクトまたは配列に他のオブジェクトや配列が含まれている場合、より複雑な左辺のパターンを使用して、より深い部分を抽出することもできます。

下のコードでは、`options` はプロパティ `size` の中に別のオブジェクトを持っており、プロパティ `items` に配列を持っています。ここで、代入する左辺のパターンは同じ構造を持っています。:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true    // 分割されない何か追加のデータ
};

<<<<<<< HEAD
// わかりやすくするために、複数の行での分割代入
=======
// destructuring assignment split in multiple lines for clarity
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
let {
  size: { // ここにサイズを格納
    width,
    height
  },
  items: [item1, item2], // ここに items を割り当てる
  title = "Menu" // オブジェクトには存在しない (デフォルト値が使われます)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

左辺で言及されていなかった `extra` を除いた `options` オブジェクト全体が該当する変数に代入されます。

Note that `size` and `items` itself is not destructured.

![](destructuring-complex.png)

最終的には、`width`, `height`, `item1`, `item2` と、デフォルト値から `title` を得ます。

<<<<<<< HEAD
これは分割代入ではよく起こります。私たちは、多くのプロパティを持つ複雑なオブジェクトを持っており、必要なものだけを抽出したいからです。

このようなことも頻繁にあります。:
=======
If we have a complex object with many properties, we can extract only what we need:

>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
```js
// 変数全体から size を取り、残りは無視します
let { size } = options;
```

## スマートな関数パラメータ 

<<<<<<< HEAD
ある関数が多くのパラメータを持っており、ほどんどがオプションであることがあります。特にユーザインタフェースのときに当てはまります。メニューを作る関数を想像してみてください。幅と高さ、タイトル、アイテムのリストなどを持っています。
=======
There are times when a function has many parameters, most of which are optional. That's especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, items list and so on.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

ここに、良くない関数の書き方があります:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

<<<<<<< HEAD
現実の問題の1つは、どうやって引数の順番を覚えるか、です。コードがしっかりドキュメント化されていれば、通常は IDE が助けてくれます。しかし、他にも問題があります。ほとんどのパタメータがデフォルトでOKの場合の関数の呼び方です。
=======
In real-life, the problem is how to remember the order of arguments. Usually IDEs try to help us, especially if the code is well-documented, but still... Another problem is how to call a function when most parameters are ok by default.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

こうなりますか?

```js
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

これは見にくく、より多くのパラメータを扱う場合、非常に読みにくいです。

このようなケースで非構造化が役に立ちます!

オブエジェクトとしてパラメータを渡し、関数はそれらを変数に分解します:

```js run
// オブジェクトを関数に渡す
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...そしてすぐに変数に展開します
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – options から取得,
  // width, height – デフォルト値を利用
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

また、入れ子のオブジェクトやコロンのマッピング使った複雑な非構造化を使うこともできます:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width は w に
  height: h = 200, // height は h に
  items: [item1, item2] // items の最初の要素は item1 へ、次は item2 へ
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

構文は分割代入と同じです:
```js
function({
  // 渡されるプロパティ: 内部で利用するパラメータ名 = デフォルト値
  incomingProperty: parameterName = defaultValue
  ...
})
```

なお、このような分割代入は `showMenu()` に引数があることを前提にしている点に注意してください。もしすべての値をデフォルトにしたい場合には、空のオブジェクトを指定する必要があります:

```js
showMenu({});

<<<<<<< HEAD
// これはエラーになります
showMenu();
=======

showMenu(); // this would give an error
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
```

これについては、非構造化対象全体のデフォルト値に `{}` を指定することで対応することができます:


```js run
// 明快にするためのちょっとしたパラメータの簡略化
function showMenu(*!*{ title = "Menu", width = 100, height = 200 } = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

上のコードでは、全体の引数オブジェクトがデフォルトで `{}` なので常に分解する何かがあります。

## サマリ 

- 分割代入はオブジェクトや配列を多数の変数に即座にマッピングすることができます。
- オブジェクト構文:
    ```js
    let {prop : varName = default, ...rest} = object
    ```

<<<<<<< HEAD
    これはプロパティ `prop` が変数 `varName` に代入され、もしこのようなプロパティが存在しない場合には `default` が使われることを意味します。
=======
    This means that property `prop` should go into the variable `varName` and, if no such property exists, then the `default` value should be used.

    Object properties that have no mapping are copied to the `rest` object.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

- 配列構文:

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

<<<<<<< HEAD
    最初のアイテムは `item1` に行き、2つ目は `item2` に行きます。残りのすべてのアイテムは配列 `rest` になります。
=======
    The first item goes to `item1`; the second goes into `item2`, all the rest makes the array `rest`.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

- より複雑なケースでは、左辺は右辺と同じ構造を指定します。
