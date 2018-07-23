# 分割代入

JavaScriptで最も使われる2つのデータ構造は `Object` と `Array` です。

オブジェクトは多くの情報を1つのエンティティにまとめることができ、配列は順序付けされたコレクションを格納することが出来ます。従って、私たちはオブジェクトまたは配列を作りそれを1つのエンティティとして扱うことができます。もしくはそれを関数呼出しに渡すこともできます。

*Destructuring assignment (分割代入)* は配列またはオブジェクトの中身を複数の変数に代入できる特別な構文で、便利な場合があります。デストラクタリング(構造の分解)は、多くのパラメータとデフォルト値を持つ複雑な関数でもうまく機能し、我々はすぐにこれらがどのように処理されているかわかるでしょう。

[cut]

## Array のデストラクタリング

配列がどのように変数に分解されるかの例です:

```js
// we have an array with the name and surname
let arr = ["Ilya", "Kantor"]

*!*
// destructuring assignment
let [firstName, surname] = arr;
*/!*

alert(firstName); // Ilya
alert(surname);  // Kantor
```

これで、配列メンバーの代わりに変数を扱うことができます。

`split` や他の配列を返すメソッドと組み合わせるとよいです:

```js
let [firstName, surname] = "Ilya Kantor".split(' ');
```

````smart header="\"分割\" は \"破壊的\" を意味しません"
これは、項目を変数にコピーすることによって "非構造化(destructurizes)" するため、"分割代入(destructuring assignment)" と呼ばれています。 配列自体は変更されません。

これは、より短い書き方になります:
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="最初の要素を無視する"
配列の不要な要素は、余分なカンマをつけることで捨てることができます:

```js run
*!*
// first and second elements are not needed
let [, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

上のコードでは、最初と2つ目の配列の要素がスキップされていますが、3つ目は `title` に代入され、残りもまたスキップされています。
````

````smart header="右側の任意の反復可能なもの(iterable)で動作します"

...実際には、配列だけでなく任意の反復可能なもの(iterable)で使うことができます:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

````


````smart header="左側の任意のものに代入する"

左側には任意の "割り当て可能なもの" を使用できます。

例えば、オブジェクトのプロパティも指定できます:
```js run
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');

alert(user.name); // Ilya
```

````

````smart header=".entries() を使ったループ"

以前のチャプターで、私たちは [Object.entries(obj)](mdn:js/Object/entries) メソッドを見ました。

オブジェクトの key-value をループするために、それをデストラクタリングと一緒使うこともできます:

```js run
let user = {
  name: "John",
  age: 30
};

// loop over keys-and-values
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```

...また、map でも同じです:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
for (let [key, value] of user.entries()) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```
````

### 残り '...'

もしも、単に1つ目の値だけではなく、それに続く全てを集めたい場合 -- 3つのドッド `"..."` を使うことで "残りの部分" を取得するもう１つのパラメータを追加することができます:


```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

alert(name1); // Julius
alert(name2); // Caesar

*!*
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

`rest` の値は残りの配列要素の配列です。 `rest` の代わりに他の変数名を使うこともできます。その前に3つのドットがあることを確認して、最後に分割代入を行います。

### デフォルト値

もしも代入変数よりも配列の値のほうが少ない場合、エラーにはなりません。欠けている値は undefined とみなされます:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
```

値がなかった場合に "デフォルト" 値に置き換えたいとき、`=` を使って値を指定することができます:

```js run
*!*
// default values
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (from array)
alert(surname); // Anonymous (default used)
```

デフォルト値はより複雑な式や関数呼び出しにすることもできます。それらは値が提供されなかったときのみ評価されます。

例えば、ここでは、2つのデフォルトのために `prompt` 関数を使っていますが、それは値がなかったものの場合にだけ実行されます:

```js run
// runs only prompt for surname
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (from array)
alert(surname); // whatever prompt gets
```



## オブジェクトのデストラクタリング

分割代入はオブジェクトでも動作します。

基本の構文は次の通りです:

```js
let {var1, var2} = {var1:…, var2…}
```

右辺には、変数に分割したい既存のオブジェクトがあります。左辺は該当するプロパティの "パターン" を含みます。シンプルなケースでは、それは `{...}` の変数名のリストです。

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
// changed the order of properties in let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

左側のパターンはより複雑で、プロパティと変数の間のマッピングを指定することができます。

もしプロパティを別の名前の変数に代入したい場合、例えば、 `options.width` を変数名 `w` にしたい場合、コロンを使うことでセットすることができます:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

コロンは "代入するプロパティ名: 代入先の変数名" となります。上の例では、プロパティ `width` は `w`に、プロパティ `height` は `h`, `title` は同じ名前に代入されます。

潜在的に不足しているプロパティについては、次のように `"="` を使ってデフォルト値を設定できます:

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

ちょうど配列や関数のパラメータのように、デフォルト値は任意の式または関数呼び出しにすることができます。それらは値がない場合に評価されます。

下のコードは、 width は聞かれますが、 title は聞かれません。

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (whatever you the result of prompt is)
```

コロンと等号の両方を組み合わせることも出来ます。:

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

### 残りの演算子

仮に、指定した変数よりも多くのプロパティをオブジェクトがもっていたらどうなるでしょうか。いくつかを設定し、"残り" をどこかに代入することはできるでしょうか？

残りの演算子（3つの点）を使用するための仕様はほぼ標準ですが、ほとんどのブラウザではまだサポートされていません。

このようになります:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
let {title, ...rest} = options;
*/!*

// now title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```



````smart header="Gotcha without `let`"
上の例で、変数は代入の直前に宣言されています: `let {…} = {…}`。もちろん既存の変数を使うこともできますが、罠もあります。

これは動作しません:
```js run
let title, width, height;

// error in this line
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

問題は、JavaScriptが（別の式の中ではなく）メインコードフローの `{...}' をコードブロックとして扱うことです。このようなコードブロックを使用すると、次のように文をグループ化できます。

```js run
{
  // a code block
  let message = "Hello";
  // ...
  alert( message );
}
```

コードブロックではない JavaScript と示すためには、代入全体を括弧 `(...)` で囲む必要があります:

```js run
let title, width, height;

// okay now
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```

````

## 入れ子構造のデストラクタリング

オブジェクトまたは配列に他のオブジェクトや配列が含まれている場合、より複雑な左側のパターンを使用してより深い部分を抽出することができます。

下のコードでは、`options` はプロパティ `size` の中に別のオブジェクトを持っており、プロパティ `items` に配列を持っています。代入の左辺のパターンは同じ構造を持ちます。:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true    // something extra that we will not destruct
};

// destructuring assignment on multiple lines for clarity
let {
  size: { // put size here
    width,
    height
  },
  items: [item1, item2], // assign items here
  title = "Menu" // not present in the object (default value is used)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

言及されていなかった `extra` を除いた `options` オブジェクト全体が該当する変数に代入されます。

![](destructuring-complex.png)

最終的に、`width`, `height`, `item1`, `item2` とデフォルト値から `title` を持ちます。

それは分割代入ではよく起こります。私たちは、多くのプロパティを持つ複雑なオブジェクトを持っており、必要なものだけを抽出したいため。

このようなことも頻繁にあります。:
```js
// take size as a whole into a variable, ignore the rest
let { size } = options;
```

## スマートな関数パラメータ

ある関数が多くのパラメータを持っており、それのほどんどがオプションであることがあります。それは特にユーザインタフェースのときに当てはまります。メニューを作る関数を想像してみてください。それは幅と高さ、タイトル、アイテムのリストなどを持っています。

ここに、このような関数の悪い書き方があります:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

現実において、問題はどうやって引数の順番を覚えるか、です。通常は IDE が助けてくれます、特にコードが良くドキュメント化されていれば。しかし、他にも…別の問題は、殆どのパタメータがデフォルトでOKの場合の関数の呼び方です。

こうなりますか?

```js
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

これは酷く、より多くのパラメータを扱うときに読みにくくなります。

このようなケースで。デストラクタリングが助けに来てくれます!

私たちは、オブエジェクトとしてパラメータを渡し、関数はすぐにそれらを変数に分解することができます:

```js run
// we pass object to function
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...and it immediately expands it to variables
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – taken from options,
  // width, height – defaults used
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

また、我々は入れ子のオブジェクトやコロンのマッピング使った複雑なデストラクタリングを使うこともできます:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width goes to w
  height: h = 200, // height goes to h
  items: [item1, item2] // items first element goes to item1, second to item2
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
  incomingProperty: parameterName = defaultValue
  ...
})
```

このような分割代入は `showMenu()` に引数があることを前提にしている点に注意してください。もし全ての値をデフォルトにしたい場合には、空のオブジェクトを指定する必要があります:

```js
showMenu({});

// that would give an error
showMenu();
```

これについては、デストラクタリング対象全体のデフォルト値に `{}` を指定することで直すことができます:


```js run
// simplified parameters a bit for clarity
function showMenu(*!*{ title = "Menu", width = 100, height = 200 } = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

上のコードでは、全体の引数オブジェクトがデフォルトで `{}` なので、常に分解されて何かがあります。

## サマリ [#summary]

- 分割代入はオブジェクトや配列を多数の変数に即座にマッピングすることができます。
- オブジェクト構文:
    ```js
    let {prop : varName = default, ...} = object
    ```

    これはプロパティ `prop` が変数 `varName` に代入され、もしこのようなプロパティが存在しない場合には `default` が使われることを意味します。

- 配列構文:

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    最初のアイテムは `item1` に行き、2つ目は `item2` に行きます。残りのすべてのアイテムは配列 `rest` になります。

- より複雑なケースでは、左辺は右辺と同じ構造を指定します。
