
# プロトタイプのためのメソッド

このチャプターでは、プロトタイプを操作する追加のメソッドを説明します。

私たちがすでに知っている方法以外にも、プロトタイプを get/set する方法があります。

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- 与えられた `proto` を `[[Prototype]]` として、また任意のプロパティディスクリプタで空のオブジェクトを作ります。
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- `obj` の `[[Prototype]]` を返します。
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- `obj` の `[[Prototype]]` に `proto` をセットします。

[cut]

例:

```js run
let animal = {
  eats: true
};

// animal をプロトタイプとして新しいオブジェクトを作成する
*!*
let rabbit = Object.create(animal);
*/!*

alert(rabbit.eats); // true
*!*
alert(Object.getPrototypeOf(rabbit) === animal); // rabbit のプロトタイプを取得
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // rabbit のプロトタイプを {} に変更
*/!*
```

`Object.create` は任意の2つ目の引数を持っています: プロパティディスクリプタです。私たちはこのように、新しいオブジェクトに追加のプロパティを提供することができます。:

```js run
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
```

ディスクリプタはチャプター <info:property-descriptors> で説明したのと同じフォーマットです。

`for..in` でプロパティをコピーするよりも、よりパワフルにオブジェクトをクローンするために `Object.create` を使うことができます。:


```js
// 完全に同一の obj の浅いクローン
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

この呼び出しはすべてのプロパティを含む `obj` の本当の正確なコピーを作ります。: 列挙型、非列挙型、データプロパティ、setter/getter -- すべてと、正確な `[[Prototype]]` です。

## 略史 

もし `[[Prototype]]` を管理するすべての方法を数えると、たくさんあります! 同じことをするたくさんの方法があります!

なぜでしょう？

それは歴史的な理由のためです。

- コンストラクタ関数の `"prototype"` プロパティは非常に古代から機能しています。
- 2012年後半: `Object.create` が標準に登場しました。それは与えられたプロトタイプでオブジェクトを作りますが、それを取得/設定することはできませんでした。なのでブラウザはいつでもプロトタイプの取得/設定ができる非標準の `__proto__` アクセサを実装しました。
- 2015年後半: `Object.setPrototypeOf` と `Object.getPrototypeOf` が標準に追加されました。`__proto__` はどこでも実行されているデファクトだったので、標準の付録Bに追加されています。これはブラウザ以外の環境ではオプションです。

今のところ、私たちはすべての方法を自由に使い分けています。

技術的には、いつでも `[[Prototype]]` の取得/設定が可能です。しかし、通常はオブジェクト作成時に一度だけ設定を行い、変更はしません。: `rabbit` は `animal` から継承しており、それは変更しません。また、JavaScriptエンジンは高度に最適化されています。`Object.setPrototypeOf` または `obj.__proto__=` で "その場で" プロトタイプを変更することは、可能ですがとても遅い操作になります。


## "非常にシンプルな" オブジェクト 

ご存知の通り、オブジェクトはキー/値ペアを格納するための連想配列として使うことができます。

...しかし、もしその中で *ユーザから提供された* キーを格納しようとした場合(例えばユーザが入力した辞書)、興味深い問題が起こります。: すべてのキーは `"__proto__"` を除いてうまく動作します。

例を確認してみましょう:

```js run
let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object], "some value" ではありません!
```

もしユーザが `__proto__` を入力した場合、その代入は無視されます!

それは驚くことではありません。`__proto__` プロパティは特別です: それはオブジェクトまたは `null` であり、文字列はプロトタイプにはなれません。

しかし、このような振る舞いを実装するつもりはありませんでした。私たちはキー/値ペアを格納したいですが、キー名が `"__proto__"` の場合は正しく保存されませんでした。なので、これはバグです。ここでの結果はひどくはありませんが、他のケースでは、プロトタイプは実際に変更される可能性があるため、処理が予期しない方向で間違ってしまう可能性があります。

最悪なのは -- 通常開発者はこのような可能性について全く考えません。これにより、このようなバグに気付きにくくなり、特にJavaScriptがサーバー側で使用されている場合には、それらを脆弱性に変えることさえあります。

このようなことは `__proto__` の場合にのみ起こります。すべての他のプロパティは通常 "代入可能" です。

どうやってこの問題を回避しましょう？

最初に、`Map` を使うよう切り替えることができます。それですべて問題ありません。

しかし、 言語の作成者がその問題をずっと前から考えていたため、`Object` もまたここでは上手くいきます。

`__proto__` はオブジェクトのプロパティではなく、`Object.prototype` のアクセサプロパティです。:

![](object-prototype-2.png)

なので、もし `obj.__proto__` が読み込まれたり代入された場合、該当の getter/setter がそのプロトタイプから呼ばれ、それは `[[Prototype]]` の取得/設定をします。

最初に言ったとおり、`__proto__` は `[[Prototype]]` にアクセスする方法であり、`[[Prototype]]` 自身ではありません。

今、もし連想配列としてオブジェクトを使いたい場合、リテラルのトリックを使ってそれを行う事ができます。:

```js run
*!*
let obj = Object.create(null);
*/!*

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"
```

`Object.create(null)` はプロトタイプなし(`[[Prototype]]` が `null`)の空オブジェクトを作ります。:

![](object-prototype-null.png)

したがって、`__proto__` のための継承された getter/setter はありません。今や通常のデータプロパティとして処理されますので、上の例は正しく動作します。

このようなオブジェクトを "非常にシンプルな" または "純粋な辞書オブジェクト" と呼びます。なぜなら、それらは通常のオブジェクト `{...}` よりもシンプルなためです。

欠点は、そのようなオブジェクトには組み込みのオブジェクトメソッドがないことです。 `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error (no toString)
```

...しかし、連想配列ではそれは通常問題ありません。

ほとんどのオブジェクトに関連したメソッドは `Object.keys(obj)` のように `Object.something(...)` であることに注意してください。 -- それらはプロトタイプにはないので、このようなオブジェクトで機能し続けます。:


```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "ni hao";
chineseDictionary.bye = "zai jian";

alert(Object.keys(chineseDictionary)); // hello,bye
```

## すべてのプロパティを取得する 

オブジェクトから キー/値 を取得する多くの方法があります。

それらの１つはすでに知っています。:

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- 列挙可能な自身の文字列プロパティ名/値/キー値ペアの配列を返します。それらのメソッドは *列挙可能な* プロパティで、*キーとして文字列を持つ* ものだけをリストします。

もしもシンボリックプロパティがほしい場合は:

- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- すべての自身のシンボリックプロパティ名の配列を返します。

非列挙型のプロパティが欲しい場合は:

- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- すべての自身の文字列プロパティ名を返します。

*すべて* のプロパティが欲しい場合は:

- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- すべての自身のプロパティ名の配列を返します。


これらのメソッドは、どのプロパティが返されるかについて少し異なりますが、すべてがそのオブジェクト自身で動作します。プロトタイプからのプロパティはリストされません。

`for..in` ループは異なります。: それは継承されたプロパティもループします。

例:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
// 自身のキーのみ
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
// 継承されたキーも
for(let prop in rabbit) alert(prop); // jumps, eats
*/!*
```

もし継承されたプロパティを区別したい場合、組み込みのメソッド [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty) があります。: それは `obj` 自身が `key` という名前のプロパティをもつ(継承でない) 場合に `true` を返します。

だから、継承されたプロパティをフィルタリングすることができます。:

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
  alert(`${prop}: ${isOwn}`); // jumps:true, then eats:false
}
```
ここでは、私たちは次の継承のチェーンを持っています。: `rabbit`, 次に `animal` そして `Object.prototype` (`animal` はリテラルオブジェクト `{...}` なので、これはデフォルトです)、その上に `null` があります。:

![](rabbit-animal-object.png)

面白いことが1つあります。メソッド `rabbit.hasOwnProperty` はどこからきたでしょう？チェーンを見ると、`Object.prototype.hasOwnProperty` によってメソッドが提供されていることがわかります。言い換えると、それは継承されています。


...しかしなぜ `hasOwnProperty` は `for..in` ループで現れないのでしょうか？答えはシンプルです。それは列挙可能ではありません。 `Object.prototype`の他のすべてのプロパティと同様です。だからこそそれらはリストに載っていません。

## サマリ 

このチャプターで説明したメソッドの簡単なリストを要約として示します。:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- 与えられた `proto` を `[[Prototype]]` (`null` もOK)として、また任意のプロパティディスクリプタで空のオブジェクトを作ります。
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- `obj` の `[[Prototype]]` を返します( `__proto__` の getter と同じです)。
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- `obj` の `[[Prototype]]` に `proto` をセットします( `__proto__` の setter と同じです)。
- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- 列挙可能な自身の文字列プロパティ名/値/キー値ペアの配列を返します。
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- すべての自身のシンボリックプロパティ名の配列を返します。
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- すべての自身の文字列プロパティ名を返します。
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- すべての自身のプロパティ名の配列を返します。
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): それは `obj` 自身が `key` という名前のプロパティをもつ(継承でない) 場合に `true` を返します。

私たちは `__proto__` は `[[Prototype]]` の getter/setterであり、他のメソッドと同様に `Object.prototype` に存在することも明らかにしました。

私たちは、`Object.create(null)` によってプロトタイプなしのオブジェクトを作ることができます。このようなオブジェクトは "純粋な辞書" として使われ、キーとして `"__proto__"` の問題はありません。

オブジェクトプロパティ(`Object.keys` など)を返すすべてのメソッドは -- "自身の" プロパティを返します。もし継承されたものが欲しい場合は、`for..in` を使います。
