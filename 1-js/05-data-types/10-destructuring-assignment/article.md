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
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // John
alert(surname);  // Smith
```

これで、配列要素の代わりに変数を扱うことができます。

`split` やその他配列を返すメソッドと組み合わせると便利です:

```js run
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```

ご覧の通り、構文はシンプルです。ですがいくつかの独特な部分があります。より理解するために他の例も見ていきましょう。

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
// 1番目、2番目の要素が不要の場合
let [, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

上のコードでは、最初の2つの要素がスキップされ、3つ目は `title` に代入され、残りもスキップされています。
````

````smart header="右辺は任意の反復可能(iterable)に対して動作します"

...実際には配列だけでなく、任意の反復可能(iterable)に対して使うことができます:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
内部的には分割代入は右辺の値に対してイテレーションすることで動作するため、これも動作します。これは `=` の右側の値に対して `for..of` を呼び出し、値を代入するためのシンタックスシュガーの一種です。
````


````smart header="左辺では任意のものに代入することが可能です"
左辺には任意の "割り当て可能なもの" を指定することができます。

例えば、オブジェクトのプロパティも指定できます:
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
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

`Map` を使用した同様のコードは、反復可能なのでよりシンプルです:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
// Map は [key, value] ペアで反復します
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```
````

````smart header="変数を入れ替えるトリック"
分割代入を使用して２つの変数の値を入れ替える、広く知られたトリックがあります:

```js run
let guest = "Jane";
let admin = "Pete";

// 値を入れかえましょう: guest=Pete, admin=Jane
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)
```

ここでは、2つの変数の一時的な配列を作り、その直後、入れ替えた順番で分割しました。

この方法で２つ以上の変数を入れ替えることも可能です。
````

### 残り '...'

通常、代入する変数の数よりも配列の要素数のほうが多い場合、"余分な" 項目は省略されます。

例えば、ここでは2つの項目が取得され、残りは無視されています:

```js run
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// その以降の項目はどこにも代入されていません
```

続く項目もすべて取得したい場合は、３つのドット `"..."` を使用して "残り" を取得するパラメータを１つ追加します。:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

*!*
// rest は３つ目の項目からの配列です
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

`rest `の値は、残りの配列要素の配列です。

`rest` の代わりに他の変数名を使用できます。その前に3つのドットがあり、分割代入の最後にくるようにしてください。

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// now titles = ["Consul", "of the Roman Republic"]
```

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

注意: `prompt` は値がない場合（`surname`）にのみ実行されます。

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

プロパティ `options.title`, `options.width` と `options.height` は、該当する変数に代入されます。順序は関係ありません。

順番は関係ありません。これも動作します。:

```js
// let {...} 内のプロパティ順を変えた場合
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
alert(width);  // (プロンプトの結果)
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

多くのプロパティをもつ複雑なオブジェクトがあったとしても、必要なものだけを抽出することができます:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// title だけ変数として抽出
let { title } = options;

alert(title); // Menu
```

### 残りのパターン "..."

仮に、指定した変数よりも多くのプロパティをオブジェクトがもっていたらどうなるでしょうか。いくつか設定した後、"残り" をどこかにまとめて代入することはできるでしょうか？

配列でしたのと同じように、残りのパターンを使用することができます。いくつかの古いブラウザ（IE、polyfill するために Babel を使用）ではサポートされていませんが、モダンブラウザでは動作します。

このようになります:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = title と名前付けられたプロパティ
// rest = オブジェクトのプロパティの残り
let {title, ...rest} = options;
*/!*

// now title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="Gotcha without `let`"
上の例で、変数は代入の直前に宣言されています: `let {…} = {…}`。もちろん `let` なしで既存の変数を使うこともできますが、罠もあります。

これは動作しません:
```js run
let title, width, height;

// この行はエラーです
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

問題は、JavaScriptがメインコードフローの `{...}` をコードブロックとして扱うことです。このようなコードブロックは、次のように文をグループ化するために使われます。

```js run
{
  // a code block
  let message = "Hello";
  // ...
  alert( message );
}
```

そのため、ここでは JavaScript はコードブロックがあることを前提としています。したがってエラーになりますが、本当は分割代入がしたいです。

コードブロックではないと JavaScript に示すためには、代入全体を括弧 `(...)` で囲む必要があります:

```js run
let title, width, height;

// これでOKです
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

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
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

左辺で言及されていなかった `extra` を除いた `options` オブジェクト全体が該当する変数に代入されます。

![](destructuring-complex.svg)

最終的には、`width`, `height`, `item1`, `item2` と、デフォルト値から `title` を得ます。

代わりに中身を取得しているので、`size` と `items` の変数はないことに注意してください。

## スマートな関数パラメータ 

ある関数が多くのパラメータを持っており、ほどんどがオプションであることがあります。特にユーザインタフェースのときに当てはまります。メニューを作る関数を想像してみてください。幅と高さ、タイトル、アイテムのリストなどを持っています。

ここに、良くない関数の書き方があります:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

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
  incomingProperty: varName = defaultValue
  ...
})
```

パラメータのオブジェクトに対して、プロパティ `incomingProperty` に対応する変数 `varName` があり、デフォルトでは `defaultValue` になります。

なお、このような分割代入は `showMenu()` に引数があることを前提にしている点に注意してください。もしすべての値をデフォルトにしたい場合には、空のオブジェクトを指定する必要があります:

```js
showMenu({}); // OK, すべての値はデフォルト値になります

showMenu(); // これはエラーになります
```

これについては、非構造化対象全体のデフォルト値に `{}` を指定することで対応することができます:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
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

    これはプロパティ `prop` が変数 `varName` に代入され、もしこのようなプロパティが存在しない場合には `default` が使われることを意味します。

    マッピングがないオブジェクトプロパティは、`rest` オブジェクトへコピーされます。

- 配列構文:

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    最初のアイテムは `item1` に行き、2つ目は `item2` に行きます。残りのすべてのアイテムは配列 `rest` になります。

- ネストされた配列/オブジェクトからデータを抽出することも可能で、その場合、左辺は右辺と同じ構造を指定する必要があります。
