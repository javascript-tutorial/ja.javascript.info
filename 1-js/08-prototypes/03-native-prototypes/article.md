# ネイティブのプロトタイプ

`"prototype"` プロパティはJavaScript自身のコア部分で広く使われています。すべての組み込みのコンストラクタ関数はこれを使用しています。

最初に単純なオブジェクトの場合を見ていき、次により複雑なオブジェクトの場合にどのようになるかを見ていきましょう。

## Object.prototype

空のオブジェクトを出力してみましょう。:

```js run
let obj = {};
alert( obj ); // "[object Object]" ?
```

文字列 `"[object Object]"` を生成するコードはどこにあるのでしょう？ それは組み込みの `toString` メソッドですが、どこにあるのでしょう？ `obj` は空です!

...しかし、短い記法 `obj = {}` は `obj = new Object()` と同じで、その `Object` は組み込みのオブジェクトコンストラクタ関数です。その関数は `toString` や他の関数を持つ巨大なオブジェクトを参照する `Object.prototype` を持っています。

このようになります:

![](object-prototype.svg)

`new Object()` が呼ばれた(もしくはリテラルオブジェクト `{...}` が作られた)とき、その `[[Prototype]]` は前のチャプターで私たちが話してきたルールによって、 `Object.prototype` にセットされます。:

![](object-prototype-1.svg)

その後、`obj.toString()` が呼ばれると、`Object.prototype` からメソッドが取り出されます。

このようにして確認できます:

```js run
let obj = {};

alert(obj.__proto__ === Object.prototype); // true

alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true
```

上の `Object.prototype` のチェーンで、追加の `[[Prototype]]` がないことに注意してください。:

```js run
alert(Object.prototype.__proto__); // null
```

## 他の組み込みのプロトタイプ 

`Array`, `Date`, `Function` のような、他の組み込みのオブジェクトもまたプロトタイプにメソッドを保持しています。

例えば、配列 `[1, 2, 3]` を作るとき、デフォルトの `new Array()` コンストラクタが内部で使われます。なので、配列データは新しいオブジェクトに書き込まれ、`Array.prototype` はそのプロトタイプとなり、メソッドを提供します。これは非常にメモリ効率が良いです。

スペックでは、すべての組み込みのプロトタイプは先頭に `Object.prototype` を持っています。なので、"すべてはオブジェクトを継承している" という人もいます。

全体図は次のとおりです（3つの組み込みについて書いています）:

![](native-prototypes-classes.svg)

プロトタイプを手動でチェックしてみましょう。:

```js run
let arr = [1, 2, 3];

// Array.prototype から継承している?
alert( arr.__proto__ === Array.prototype ); // true

// 次に Object.prototype からは継承している?
alert( arr.__proto__.__proto__ === Object.prototype ); // true

// そしてトップの null
alert( arr.__proto__.__proto__.__proto__ ); // null
```

プロトタイプのメソッドのいくつかは重複する可能性があります。例えば、`Array.prototype` はカンマ区切りで要素を表示する自身の `toString` を持っています。:

```js run
let arr = [1, 2, 3]
alert(arr); // 1,2,3 <-- Array.prototype.toString の結果
```

以前見たように、`Object.prototype` も同様に `toString` を持っていますが、`Array.prototype` はチェーンでより近い位置にあるので、配列がもつものが使用されます。


![](native-prototypes-array-tostring.svg)


Chrome developer console のようなブラウザ内のツールでも継承を表示できます(組み込みオブジェクトのために `console.dir` を使う必要があるかもしれません)。

![](console_dir_array.png)

他の組み込みオブジェクトも同じように動作します。関数でさえも、それらは組み込みの `Function` コンストラクタのオブジェクトであり、メソッドです: `call/apply` など、`Function.prototype` から取り出されたものです。関数には独自の `toString`もあります。

```js run
function f() {}

alert(f.__proto__ == Function.prototype); // true
alert(f.__proto__.__proto__ == Object.prototype); // true, object からの継承
```

## プリミティブ(Primitives)

最も複雑なことは、文字列、数値、ブール値で起こります。

覚えている通り、それらはオブジェクトではありません。しかし、それらのプロパティへアクセスをしようとした場合、組み込みのコンストラクタ `String`, `Number`, `Boolean` を使った一時的なラッパーオブジェクトが作られます。それらはメソッドを提供し、消えます。

それらのオブジェクトは我々には見えない形で作られ、ほとんどのエンジンはそれらを最適化しますが、スペックではこのように正確に説明されています。それらのオブジェクトのメソッドもまた `String.prototype`, `Number.prototype` や `Boolean.prototype` として利用可能なものとしてプロトタイプに存在します。

```warn header="値 `null` と `undefined` はオブジェクトラッパーを持っていません"
特別な値 `null` や `undefined` は別です。それらはオブジェクトラッパーを持ちません。そのため、利用可能なメソッドやプロパティはありません。また、それらに対応するプロトタイプもありません。
```

## ネイティブプロトタイプの変更 

ネイティブプロトタイプは変更することができます。例えば、もしあるメソッドを `String.prototype` に追加した場合、それはすべての文字列で利用可能になります。:

```js run
String.prototype.show = function() {
  alert(this);
};

"BOOM!".show(); // BOOM!
```

開発の過程で、新しい組み込みメソッドを追加したいと考えてるかもしれません。そして、それをネイティブプロトタイプに加えたいという、若干の誘惑があるかもしれません。ですが、それは一般的には悪い考えです。

```
プロトタイプはグローバルなので、コンフリクトが発生しやすいです。もし２つのライブラリがメソッド `String.prototype.show` を追加している場合、片方はもう一方に上書きされます。

そのため、一般的には、ネイティブのプロトタイプの変更は悪いアイデアとされています。
```

**現代のプログラミングでは、ネイティブプロトタイプの変更が認められたケースが１つだけあります。それはポリフィルです。**

ポリフィルは JavaScript のスペックには存在するが、特定のJavaScript エンジンではまだサポートされていないメソッドの代わりを用意することを指す用語です。

手動で実装し、組み込みのプロトタイプにそれを取り込むことができます。

例:

```js run
if (!String.prototype.repeat) { // もしこのようなメソッドがない場合
  // prototype に追加します

  String.prototype.repeat = function(n) {
    // 文字列を n 回繰り返す

    // 実際、このコードはこれより複雑になります
    // "n" の負の値に対するエラーのスロー
    // 完全なアルゴリズムは仕様にあります
    return new Array(n + 1).join(this);
  };
}

alert( "La".repeat(3) ); // LaLaLa
```


## プロトタイプからの借用 

チャプター <info:call-apply-decorators#method-borrowing> で私たちはメソッドの借用について話しました。:

これはあるオブジェクトからメソッドをとり、それを別のオブジェクトにコピーするときです。

ネイティブプロトタイプのメソッドのいくつかはしばしば借用されます。

例えば、配列ライクなオブジェクトを作成している場合、そこにいくつかの `Array` メソッドをそこにコピーしたい場合があります。

例

```js run
let obj = {
  0: "Hello",
  1: "world!",
  length: 2,
};

*!*
obj.join = Array.prototype.join;
*/!*

alert( obj.join(',') ); // Hello,world!
```

組み込みの `join` メソッドの内部アルゴリズムは、正しいインデックスと `length` プロパティのみを考慮するため、これは機能します。オブジェクトがたしかに配列かどうかはチェックしません。多くの組み込みメソッドはこのようになっています。

別の可能性は、`obj.__proto__` を `Array.prototype` に設定することで継承することで、これによりすべての　`Array` メソッドは自動的に `obj` で利用可能になります。

ですが、`obj` が既に別のオブジェクトを継承していた場合にはこれは不可能です。一度に1つのオブジェクトしか継承できません。

借用メソッドは柔軟であり、必要であれば異なるオブジェクトから機能を混ぜることも可能です。

## サマリ 

- すべての組み込みオブジェクトは同じパターンに従います。:
    - メソッドはプロトタイプに保持されています(`Array.prototype`, `Object.prototype`, `Date.prototype` など)。
    - オブジェクト自身はデータのみを保持します(配列アイテム、オブジェクトプロパティ、日付)。
- プリミティブもまたラッパーオブジェクトのプロトタイプにメソッドを保持します。: `Number.prototype`, `String.prototype`, `Boolean.prototype` 。`undefined` と `null` にだけはラッパーオブジェクトはありません。
- 組み込みのプロトタイプを変更したり、新しいメソッドを実装することができます。 しかし、それを変更することはお勧めしません。 おそらく唯一許可されるケースは、新しい標準が追加されたものの、まだエンジンのJavaScriptメソッドではサポートされていないときだけです。
