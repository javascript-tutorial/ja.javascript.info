# ネイティブのプロトタイプ

`"prototype"` プロパティはJavaScript自身のコア部分で広く使われています。すべての組み込みのコンストラクタ関数はそれを使っています。

最初に単純なオブジェクトの場合を、次により複雑なオブジェクトの場合にどのようになるかを見ていきましょう。

## Object.prototype

空のオブジェクトを出力してみましょう。:

```js run
let obj = {};
alert( obj ); // "[object Object]" ?
```

文字列 `"[object Object]"` を生成するコードはどこにあるのでしょう？ それは組み込みの `toString` メソッドですが、どこにあるのでしょう？ `obj` は空です!

...しかし、短い記法 `obj = {}` は `obj = new Object()` と同じで、その `Object` は -- 組み込みのオブジェクトコンストラクタ関数です。その関数は `toString` や他の関数を持つ巨大なオブジェクトを参照する `Object.prototype` を持っています。

このようになります(すべて組み込みです):

![](object-prototype.svg)

`new Object()` が呼ばれた(もしくはリテラルオブジェクト `{...}` が作られた)とき、その `[[Prototype]]` は前のチャプターで私たちが話してきたルールによって、 `Object.prototype` にセットされます。:

![](object-prototype-1.svg)

その後、`obj.toString()` が呼ばれると -- `Object.prototype` からメソッドが取り出されます。

このようにして、それを確認することができます:

```js run
let obj = {};

alert(obj.__proto__ === Object.prototype); // true
// obj.toString === obj.__proto__.toString == Object.prototype.toString
```

上の `Object.prototype` のチェーンで、追加の `[[Prototype]]` がないことに注意してください。:

```js run
alert(Object.prototype.__proto__); // null
```

## 他の組み込みのプロトタイプ 

`Array`, `Date`, `Function` のような、他の組み込みのプロトタイプもまたプロトタイプにメソッドを保持しています。

例えば、配列 `[1, 2, 3]` を作るとき、デフォルトの `new Array()` コンストラクタが内部で使われます。なので、配列データは新しいオブジェクトに書き込まれ、`Array.prototype` はそのプロトタイプとなり、メソッドを提供します。これは非常にメモリ効率が良いです。

仕様では、すべての組み込みのプロトタイプは先頭に `Object.prototype` を持っています。なので、"すべてはオブジェクトを継承している" という人もいます。

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

以前見たように、`Object.prototype` も同様に `toString` を持っていますが、`Array.prototype` はチェーンでより近いので、配列のバリアントが使われます。

![](native-prototypes-array-tostring.svg)


Chrome developer console のようなブラウザ内のツールでも継承を表示できます(組み込みオブジェクトのために `console.dir` を使う必要があるかもしれません)。

![](console_dir_array.png)

他の組み込みオブジェクトも同じように動作します。関数でさえも。それらは組み込みの `Function` コンストラクタのオブジェクトであり、メソッドです: `call/apply` など、`Function.prototype` から取り出されたものです。関数には独自の `toString`もあります。

```js run
function f() {}

alert(f.__proto__ == Function.prototype); // true
alert(f.__proto__.__proto__ == Object.prototype); // true, object からの継承
```

## プリミティブ(Primitives)

最も複雑なことは、文字列、数値、ブール値で起こります。

覚えている通り、それらはオブジェクトではありません。しかし、それらのプロパティへアクセスをしようとした場合、組み込みのコンストラクタ `String`, `Number`, `Boolean` を使った一時的なラッパーオブジェクトが作られます。それらはメソッドを提供し、消えます。

それらのオブジェクトは我々には見えない形で作られ、ほとんどのエンジンはそれらを最適化しますが、仕様ではこのように正確に説明されています。それらのオブジェクトのメソッドもまた `String.prototype`, `Number.prototype` や `Boolean.prototype` として利用可能なものとしてプロトタイプに存在します。

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

開発の過程で、私たちは新しい組み込みメソッドを持っていたいと考えているかもしれません。そして、それをネイティブプロトタイプに加えたいという、若干の誘惑があるかもしれません。 しかし、それは一般的には悪い考えです。

プロトタイプはグローバルです。なので、コンフリクトを起こしやすいです。もし２つのライブラリがメソッド `String.prototype.show` を追加している場合、片方はもう一方に上書きされます。

現代のプログラミングでは、ネイティブプロトタイプの変更が認められたケースが１つだけあります。それはポリフィルです。言い換えると、もし我々のJavaScriptエンジン(または我々がサポートしたいもの)がまだサポートしていないJavaScript仕様上のメソッドがある場合、それを手動で実装し、組み込みのプロトタイプにそれを取り込むことができます。

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

```js run
function showArgs() {
*!*
  // 配列から join を借り、引数コンテキストでそれを呼び出す
  alert( [].join.call(arguments, " - ") );
*/!*
}

showArgs("John", "Pete", "Alice"); // John - Pete - Alice
```

`join` は `Array.prototype` にあるため、そこから直接呼び出すことができ、次のように書き直すことができます:

```js
function showArgs() {
*!*
  alert( Array.prototype.join.call(arguments, " - ") );
*/!*
}
```

これは、余分な配列オブジェクト `[]` の作成を避けることができるので、より効率的です。一方で記述は長いですが。

## サマリ 

- すべての組み込みオブジェクトは同じパターンに従います。:
    - メソッドはプロトタイプに保持されています(`Array.prototype`, `Object.prototype`, `Date.prototype` など)。
    - オブジェクト自身はデータのみを保持します(配列アイテム、オブジェクトプロパティ、日付)。
- プリミティブもまたラッパーオブジェクトのプロトタイプにメソッドを保持します。: `Number.prototype`, `String.prototype`, `Boolean.prototype` 。`undefined` と `null` にだけはラッパーオブジェクトはありません。
- 組み込みのプロトタイプを変更したり、新しいメソッドを実装することができます。 しかし、それを変更することはお勧めしません。 おそらく唯一許可されるケースは、新しい標準を追加したがまだエンジンのJavaScriptメソッドではサポートされていないときだけです。
