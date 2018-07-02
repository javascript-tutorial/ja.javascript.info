# 変数

ほとんどの場合で、JavaScript アプリケーションは情報を処理する必要があります。ここに2つの例があります。
1. オンラインショップ -- 情報は、売られれている商品やショッピングカートを含むかもしれません。
2. チャットアプリケーション -- 情報は、ユーザ、メッセージやより多くのものが含まれるかもしれません。

変数は情報を保持するために使われます。

[cut]

## 変数

[変数](https://en.wikipedia.org/wiki/Variable_(computer_science)) はデータのための "名前付けされた格納場所" です。私たちはグッズや訪問者、その他のデータを格納するために、変数が使えます。

JavaScriptで変数を作るために、`let` キーワードを使います。

下のステートメントは "message" という名前の変数を作ります(別の言い方: *宣言* または *定義* ):

```js
let message;
```

今、私たちは代入演算子 `=` を使って、そこにデータを置く事ができます。

```js
let message;

*!*
message = 'Hello'; // store the string
*/!*
```

文字列は今、変数に関連付けられたメモリ領域に保存されています。私たちは変数名を使ってそれにアクセスすることができます。:

```js run
let message;
message = 'Hello!';

*!*
alert(message); // shows the variable content
*/!*
```

簡潔にするために、私達は変数宣言と代入を1行にマージすることができます。

```js run
let message = 'Hello!'; // define the variable and assign the value

alert(message); // Hello!
```

また、1行で複数の変数を宣言することもできます。

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

より短いように見えるかもしれませんが、それは推奨しません。よりより可読性のため、1変数に1行を使ってください。

複数行のバリアントはちょっと長いですが、読みやすいです。

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

多くの変数をこのように書く人もいます:
```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hello';
```

...もしくは "カンマから始まる" スタイル:

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

技術的には、これらすべてのバリアントは同じです。なので、これは個人の好みと美学の問題です。


````smart header="`let` の代わりに `var`"
古いスクリプトでは、別のキーワードを見つけるかもしれません: `let` の代わりに `var`:

```js
*!*var*/!* message = 'Hello';
```

キーワード `var` は `let` と *ほとんど* 一緒です。それも変数を宣言します。が、わずかに違います, 伝統的スタイルのやり方です。

`let` と `var` には微妙な違いがありますが、それらはまだ私たちにとって関係ありません。 その詳細については、<info:var> のチャプターでカバーします。
````

## 現実との類似性

ユニークな名前のステッカーを付けて、データの "ボックス" として想像すれば、私たちは "変数" という概念を簡単に把握できます。

たとえば、変数 `message` は値 `"Hello!"` を持った `"message"` とラベル付けされたボックスとして想像することができます。:

![](variable.png)

私たちはボックスの中にどんな値でも入れることができます。

また、それを変えることもできます。値は必要なぶんだけ何度でも変更することができます。

```js run
let message;

message = 'Hello!';

message = 'World!'; // value changed

alert(message);
```

値が変更されたとき、古いでは変数から削除されます。

![](variable-change.png)

私たちは2つの変数を宣言して、ある変数から別の変数にデータをコピーすることもできます。

```js run
let hello = 'Hello world!';

let message;

*!*
// copy 'Hello world' from hello into message
message = hello;
*/!*

// now two variables hold the same data
alert(hello); // Hello world!
alert(message); // Hello world!
```

```smart header="関数言語"
変数の値の変更を禁止する[functional](https://en.wikipedia.org/wiki/Functional_programming)プログラミング言語も存在することは興味深いかもしれません。たとえば, [Scala](http://www.scala-lang.org/) または [Erlang](http://www.erlang.org/).

このような言語では、一度 "ボックスの中に" 値を格納すると、それは永遠です。もし他の何かを格納する必要がある場合、その言語は新しいボックスを作ることを強制します(新しい変数を宣言します)。私達は古いものを再利用することはできません。

一見したところでは、それは少し奇妙に見えるかもしれませんが、それらの言語は本格的な開発が可能です。それ以上に、この制限が確かな利益を与える並列計算のような領域があります。このような言語を勉強することは、心を広げるために推奨されます(たとえすぐにそれを使う予定がなくても)。
```

## 変数のネーミング [#variable-naming]

JavaScript変数名は2つの制限があります:

1. 名前は文字、数字、記号 `$` と `_` のみを含む必要があります。
2. 最初の文字は数字であってはいけません。

変数名の例:

```js
let userName;
let test123;
```

名前に複数の単語を含む場合、[camelCase](https://en.wikipedia.org/wiki/CamelCase) が一般的に使われます。 つまり: 単語が続々を続き, 各単語は大文字で始まります。: `myVeryLongName`.

なんと興味深い -- ドル `'$'` や アンダースコア `'_'` も名前に使われます。それらは特別な意味をもたない、ただの文字のような正規の記号です。

それらの名前は正しいです:

```js run untrusted
let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now a variable with the name "_"

alert($ + _); // 3
```

正しくない変数名の例です:

```js no-beautify
let 1a; // cannot start with a digit

let my-name; // a hyphen '-' is not allowed in the name
```

```smart header="Case matters"
変数名 `apple` と `AppLE` -- は2つの異なる変数です。
```

````smart header="Non-english letters are allowed, but not recommended"
キリル文字や象牙文字を含め、どの言語を使うことも可能です。:

```js
let имя = '...';
let 我 = '...';
```

技術的には、ここでエラーは起きず、このような名前は許可されます。しかし、変数名では英語を使うのが国際的な伝統です。たとえ小さなスクリプトを書いているとしても、それの人生は長いかもしれません。他の国の人々はときどきそれを見る必要があるかもしれません。
````

````warn header="Reserved names"
予約語の一覧があり、それらは変数としては使用することができません。なぜならそれらは言語自身によって使われるからです。

たとえば、単語 `let`, `class`, `return`, `function` は予約されています。

下のコードは構文エラーです:

```js run no-beautify
let let = 5; // can't name a variable "let", error!
let return = 5; // also can't name it "return", error!
```
````

````warn header="An assignment without `use strict`"

通常、変数を使う前に定義する必要があります。しかし、以前は `let` なしで、単に値を代入することによって変数を作成することが技術的に可能でした。`use strict` でない場合はこれは今でも動作します。その振る舞いは古いスクリプトの互換性のために維持されています。

```js run no-strict
// note: no "use strict" in this example

num = 5; // the variable "num" is created if didn't exist

alert(num); // 5
```

これは悪い悪い習慣です、strict モードではエラーになります:

```js run untrusted
"use strict";

*!*
num = 5; // error: num is not defined
*/!*
```

````

## 定数

定数を宣言するためには、 `let` の代わりに `const` を使います。

```js
const myBirthday = '18.04.1982';
```

`const` を使って宣言された変数は "定数" と呼ばれます。それらは変更することが出来ません。その試みはエラーを引き起こします。:

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // error, can't reassign the constant!
```

プログラマがその変数は決して変更されないべきと確信するとき、 それを保証し、また、みんなにその事実を明示的に示すために `const` を使うことが出来ます。


### 大文字の定数

実行する前にわかっている覚えるのが難しい値のために、エイリアスとして定数を使うという慣習は広く行われています。

このような定数は大文字とアンダースコアを使って名前がつけられます。

このように:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...when we need to pick a color
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

メリット:

- `COLOR_ORANGE` は `"#FF7F00"` よりも覚えるのが遥かに簡単です。
- `COLOR_ORANGE` よりも `"#FF7F00"` のほうがミスタイプをし易いです。
- コードを読むとき、`#FF7F00` よりも `COLOR_ORANGE` のほうがより意味があります。

私たちはいつ定数に大文字を使うべきなのか、そして通常はいつそれらの命名をするべきなのか？それらを明らかにしましょう。

"定数" であることは、その値は決して変わらないことを意味します。しかし、実行する前に知られている定数(赤の16進数のような)があります。また、実行中にランタイムで *計算* されますが、代入後は変更されないものもあります。

たとえば:
```js
const pageLoadTime = /* time taken by a webpage to load */;
```

`pageLoadTime` の値はページロードする前にはわからないので、通常の名前がつけられます。しかし代入後に変更されないので、それは定数です。

言い換えると、大文字の名前の定数は "ハードコードされた" 値のエイリアスとしてのみ使われます。

## Name things right

変数について話すとき、もう1つ極めて重要な事が有ります。

変数は分かりやすい名前にしてください。必要に応じて考えましょう。

変数のネーミングは、プログラミングにおいて、もっとも重要で複雑なスキルの1つです。変数名をちょっと見れば、どのコードが初心者で書かれ、どれが経験豊富な開発者によって書かれたものかがわかります。

実際のプロジェクトでは、スクラッチで完全に分離された何かを書くよりも、既存のコードベースの修正や拡張に最も時間を費やします。そして、何か他のことをした後にコードに戻ったとき、よくラベル付けされた情報を探すのははるかに簡単です。それは、言い換えると、適切な名前がついている変数、です。

変数を宣言する前に正しい名前について考えるようにしてください。それはあなたに多くのことに報いるでしょう。

いくつかの良いルールです:

- `userName` または `shoppingCart` のように人間が読みやすい名前を使ってください。
- あなたが本当に何をしているか知っていない限り、 `a`, `b`, `c` のような略語や短い名前は避けてください。
- 最大限説明的、かつ簡潔な名前を作ってください。悪い名前の例としては `data` や `value` です。このような名前は何も言いません。コンテキストからデータや値が意味することが例外的に明白な場合のみ使ってもOKです。
- あなたのチームやあなた自身の心と、表現を合意してください。もしあるサイト訪問者が "ユーザ" と呼ばれる場合、関連する変数として `currentVisitor` や `newManInTown` ではなく `currentUser` や `newUser` のように命名するべきです。

単純に聞こえますか？ 確かにそうですが、実際には良い説明的で簡潔な名前を作ることは簡単ではありません。頑張りましょう。

```smart header="Reuse or create?"
そして最後のメモです。新しい変数宣言する代わりに、既存の変数を再利用する傾向のある怠けたプラグラマが中にはいます。

その結果、変数は、人々がステッカーの変更なしに異なったものを投げ入れるボックスのようになります。今その中は何でしょうか？誰が知っている... 私たちはもっと近づきチエックする必要があります。

このようなプログラマは変数定義では多少節約しますが、デバッグで10倍以上の時間を失います。

余分な変数は良く、悪ではないです。

モダンなJavaScriptは minify したりブラウザは十分にコードを最適化します。なので、パフォーマンスの問題を作ることはありません。異なった値のために異なる変数を使うことは、エンジンの最適化を助けることがあります。
```

## サマリ

私たちはデータを格納するために変数を宣言することができます。それは `var`, `let`, または `const` を使うことでできます。

- `let` -- は現代の変数宣言です。Chrome(V8)では、 `let` を使うには、そのコードは strict モードである必要があります。
- `var` -- は伝統的なスタイルの変数宣言です。一般的に私たちはそれを使いませんが、必要なときのために、チャプター <info:var> で `let` との微妙な違いを説明します。
- `const` --　は `let` のようですが、変数の値は変更することができません。

変数は、私たちが内部のことを簡単に理解できるように命名するべきです。
