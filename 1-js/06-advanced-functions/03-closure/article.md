
# クロージャ

JavaScrip は非常に機能指向な言語です。それは多くの自由を与えます。ある時点で作成した関数は、別の変数にコピーしたり別の関数に引数として渡し、後で全く別の場所から呼ぶことができます。

私たちは、関数が外側の変数にアクセスできることを知っています。そしてこの特徴は頻繁に使われます。

しかし、外部変数が変わると何が起きるでしょう？関数は最新の値、もしくは関数が作られたときに存在していた値を取得することになるでしょうか？

また、関数がコードの別の場所に移動し、そこから呼ばれたとき何がおきるでしょう -- 新しい場所で外部変数にアクセスできるのでしょうか？

別の言語はこことは異なる振る舞いをします。このチャプターでは、JavaScript について説明します。

[cut]

## いくつかの質問 [#a-couple-of-questions]

基本の2つの質問を定式化し、内部の仕組みを個別に調べて、これらの質問や将来より複雑な質問に答えることができるようにしましょう。

1. 関数 `sayHi` は外部変数 `name` を使います。関数が実行するとき、その2つの値のどちらが使われますか？

    ```js
    let name = "John";

    function sayHi() {
      alert("Hi, " + name);
    }

    name = "Pete";

    *!*
    sayHi(); // what will it show: "John" or "Pete"?
    */!*
    ```

    このような状況は、ブラウザやサーバサイドでの開発両方で一般的です。関数は、作られた時間よりも後、例えばユーザアクションやネットワークのリクエストの後に実行がスケジュールされる場合があります。

    従って、質問は: 最新の変更を受け取りますか？


2. 関数 `makeWorker` は別の関数を作り、それを返します。その新しい関数はどこか他の場所から呼び出すことができます。 作成場所や呼び出し場所、あるいはその両方から外部変数にアクセスできますか？

    ```js
    function makeWorker() {
      let name = "Pete";

      return function() {
        alert(name);
      };
    }

    let name = "John";

    // create a function
    let work = makeWorker();

    // call it
    *!*
    work(); // what will it show? "Pete" (name where created) or "John" (name where called)?
    */!*
    ```


## レキシカル環境/語彙環境(Lexical Environment)

何が起きるか理解するために、まず "変数" が技術的に何であるかを議論しましょう。

JavaScript では、すべての実行中の関数やコードブロック、スクリプト全体は *レキシカル環境* と呼ばれる関連オブジェクトを持っています。

語彙環境オブジェクトは2つの部分から構成されます:

1. *環境レコード(Environment Record)* -- プロパティとしてすべてのローカル変数をもつオブジェクトです(`this` の値のようにいくつかの他の情報も持っています)。
2. *外部の語彙環境* への参照。通常、直近の外部のレキシカルなコードに関連付けられています（現在の波括弧の外側）。

なので、"変数" は単に、特別な内部オブジェクト、環境レコードのプロパティです。"変数を取得または変更する" とは、"そのオブジェクトのプロパティを取得または変更する" ことを意味します。

例えば、このシンプルなコードでは、レキシカル環境が1つだけあります。:

![lexical environment](lexical-environment-global.png)

これは、スクリプト全体に関連付けられた、いわゆるグローバルレキシカル環境です。 ブラウザの場合、すべての `<script>` タグは同じグローバル環境を共有します。

上の図の長方形は環境レコード(変数ストア)で、矢印は外部参照を意味します。グローバルレキシカル環境は外部参照を持っていないので、 `null` です。

これは、`let` 変数がどのように動作するかを示す図です:

![lexical environment](lexical-environment-global-2.png)

右側の長方形は、実行の間でどのようにグローバルレキシカル環境が変わるかを示しています。:

1. スクリプトがスタートしたとき、レキシカル環境は空です。
2. `let phrase` 定義が現れました。今は初期値がないので、 `undefined` が格納されます。
3. `phrase` が代入されます。
4. `phrase` が新しい値を参照します。

今のところすべてシンプルに見えますね。

要約すると:

- 変数は特別な内部オブジェクトのプロパティで、現在の実行ブロック/関数/スクリプトと関連付けられています。
- 変数を使った作業は、実際にはそのオブジェクトのプロパティを使って作業しています

### 関数宣言

関数宣言は特別です。`let` 変数とは違い、実行時に処理されるのではなく、レキシカル環境が作られたときに処理されます。グローバルレキシカル環境では、スクリプトが開始される瞬間を意味します。

...そのため、関数宣言を定義する前に関数宣言を呼び出すことができます。

下のコードはレキシカル環境は最初から空ではないことを示しています。関数宣言なので `say` を持っています。その後 `let` で宣言された `phrase` を取得します:

![lexical environment](lexical-environment-global-3.png)


### 内外のレキシカル環境

呼び出しの間、`say()` は外部変数を使います。何が起きているか見てみましょう。

まず、関数を実行するとき、新しい関数のレキシカル環境が自動的に作られます。それはすべての関数での一般的なルールです。そのレキシカル環境はローカル変数や呼び出しパラメータを格納するために使われます。

<!--
```js
let phrase = "Hello";

function say(name) {
  alert( `${phrase}, ${name}` );
}

say("John"); // Hello, John
```
-->

これは、実行が `say("John")` の内部にあるときで、矢印のついた行にあるレキシカル環境の図です。:

![lexical environment](lexical-environment-simple.png)

関数呼び出しの間、2つのレキシカル環境があります: 内部のもの(関数呼び出しのため)と、外部のもの(グローバル)です:

- 内部のレキシカル環境は現在の `say` の実行に対応しています。それは1つ変数(`name`)を持っており、それは関数の引数です。私たちは `say("John")` を呼んだので、 `name` は `"John"` です。
- 外部のレキシカル環境はグローバルレキシカル環境です。

内部のレキシカル環境は外部のものへの `外部` 参照を持っています。

**コードが変数にアクセスしたいとき -- 最初に内部のレキシカル環境を探します。その次に外部を探し、チェインの最後になるまで繰り返します**

もし変数がどのにもない場合、strict モードではエラーになります。`use strict` がなければ、未定義変数への代入は下位互換性のために新しいグローバル変数を作成します。

我々の例でどのように検索されるか見てみましょう:

- `say` の内側にある `alert` が `name` にアクセスしたいとき、関数のレキシカル環境の中からすぐにそれを見つけます。
- `phrase` にアクセスしたいとき、ローカルには `phrase` がないので、続いて `外部` 参照を行い、グローバルでそれを見つけます。

![lexical environment lookup](lexical-environment-simple-lookup.png)

これで、このチャプターの最初にある最初の基本の質問に答えることができます。

**関数は外部変数を最新の値として取得します。**

これは、説明されたメカニズムのためです。 古い変数の値はどこにも保存されません。 関数がそれらを必要とするとき、それはそれ自身または外部のレキシカル環境から現在の値を取ります。

従って、最初の質問の答えは `Pete` です:

```js run
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete"; // (*)

*!*
sayHi(); // Pete
*/!*
```

上のコードの実行フローは次の通りです:

1. グローバルレキシカル環境は `name` を持っています: `"John"`.
2. `(*)` の行でグローバル変数が変更され、今 `name` は　`"Pete"` です。
3. 関数 `say()` が実行され、外部から `name` を取得します。ここでは、それはグローバルレキシカル環境であり、`"Pete"` です。

```smart header="1つの呼び出しに -- 1つのレキシカル環境"
新しい関数のレキシカル環境は関数が実行するたびに作られることに注意してください。

また、関数が複数回呼び出された場合、各呼び出しには自身のレキシカル環境があり、ローカル変数とその実行に固有のパラメーターがあります。
```

```smart header="レキシカル環境は仕様上のオブジェクトです"
"レキシカル環境" は仕様上のオブジェクトです。私たちはコードからそのオブジェクトを取得したり、直接操作することはできません。JavaScriptエンジンはメモリを節約するために使っていない変数を破棄したり、他の内部トリックを行うと言った最適化をする場合がありますが、見える振る舞いは説明した通りである必要があります。
```


## ネストされた関数

関数は、別の関数の内部で作成されたとき、"ネストされた" と呼ばれます。

技術的には、それは簡単に可能です。

私たちは、これを使ってコードを整理できます:

```js
function sayHiBye(firstName, lastName) {

  // helper nested function to use below
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert( "Hello, " + getFullName() );
  alert( "Bye, " + getFullName() );

}
```

ここでの *ネストされた* 関数 `getFullName()` は便宜のために作られています。それは外部変数にアクセスすることができるので、フルネームを返すことができます。

より興味深い点は、ネストされた関数を返すことができることです: 新しいオブジェクトのプロパティとして(もし外部関数がメソッドをもつオブジェクトを作った場合)、または結果としてそれ自身を。そして、他の場所で使用されています。 どこにいても、同じ外部変数へのアクセスを維持します。

コンストラクタ関数を持つ例です(チャプター <info:constructor-new> を参照):

```js run
// constructor function returns a new object
function User(name) {

  // the object method is created as a nested function
  this.sayHi = function() {
    alert(name);
  };
}

let user = new User("John");
user.sayHi(); // the method code has access to the outer "name"
```

関数を返す例です:

```js run
function makeCounter() {
  let count = 0;

  return function() {
    return count++; // has access to the outer counter
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```

`makeCounter` の例を続けましょう。それは各呼び出しで次の数値を返す "counter" 関数を作ります。シンプルであるにも関わらず、そのコードからわずかに変更されたバリアントは実践で使われています。例えば、[擬似乱数生成器(pseudorandom number generator)](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) などとして。したがって、この例はあまり不自然ではありません。

counter は内部でどのように動作しているのでしょう？

内部関数が実行されると、`count++` の変数を内側から外に検索されます。上の例では、その順番は次のようになります。:

![](lexical-search-order.png)

1. ネストされた関数のローカル
2. 外部関数の変数
3. ...そしてさらにグローバルに到達するまで

この例では、`count` はステップ `2` で見つかります。外部変数が変更されると、それが見つかった場所が変わります。従って、`count++` は属するレキシカル環境で外部変数を見つけ増加させます。

ここであなたに2つの質問があります:

1. `counter` を `makeCounter` に属していないコードからリセットすることはできますか？ 例えば。 上記の例で `alert` 呼び出し後で。
2. もし `makeCounter()` を複数回呼び出した場合 -- それは複数の `counter` 関数を返します。それらは独立していますか？それとも同じ `count` を共有しますか？

続きを読む前に考えてみてください。

...答えはでましたか？

では、答えをみていきましょう。

1. 方法はありません。`counter` はローカル関数の変数であり、外部からアクセスすることはできません。
2. すべての `makeCounter()` の呼び出しで、自身の `counter` を持つ新しい関数のレキシカル環境が作られます。従って、`counter` 関数の結果は独立します。

デモです:

```js run
function makeCounter() {
  let count = 0;
  return function() {
    return count++;
  };
}

let counter1 = makeCounter();
let counter2 = makeCounter();

alert( counter1() ); // 0
alert( counter1() ); // 1

alert( counter2() ); // 0 (independent)
```

恐らく、外部変数の状況は、今のところはっきりしています。しかし、より複雑な状況では、内部のより深い理解が必要になります。なので次に進みましょう。

## 詳細な環境

今、クロージャが一般的にどのように動作するかを理解するにつれ、最終的に要点まで降りてきました。

ここでは、`makeCounter` の例では何が起こっているのかを段階的に示しています。すべてを理解していることを確認してください。私たちがまだカバーしていない追加の `[[Environment]]` プロパティに注意してください。

1. スクリプトが開始された直後は、グローバルレキシカル環境だけがあります:

    ![](lexenv-nested-makecounter-1.png)

    開始時点では、`makeCounter` 関数だけがあります。なぜなら、それが関数宣言だからです。それはまだ実行されていません。

    "出現した" すべての関数は、作成されたレキシカル環境への参照を持つ隠しプロパティ `[[Environment]]` を受け取ります。私たちは、まだこれについて話していませんでしたが、技術的には関数がどのように作られたのかを知る方法です。。

    ここで、`makeCounter` はグローバルレキシカル環境に作られるので、`[[Environment]]` はそれを参照し続けます。

    言い換えると、関数は、それが生まれたレキシカル環境への参照を "刻印" されています。 そして `[[Environment]]`はその参照を持つ隠れた関数プロパティです。

2. 次に、コードが実行され、`makeCounter()` の呼び出しが行われます。これは、実行が `makeCounter()` の処理の最初の行の時点の図です。

    ![](lexenv-nested-makecounter-2.png)

    `makeCounter()` 呼び出しの時点で、その変数や引数を保持するためにレキシカル環境が作られます。

    すべてのレキシカル環境では2つのものを保持します:
    1. ローカル変数を持つ環境レコード。我々のケースでは、`count` は唯一のローカル変数です(`let count` の行が実行されたとき出現します)。
    2. 外部のレキシカルへの参照。それは関数の `[[Environment]]` にセットされています。ここでは `makeCounter` の `[[Environment]]` はグローバルレキシカル環境を参照します。

    従って、今私たちは2つのレキシカル環境を持っています: 最初のはグローバル、2つ目はグローバルへの外部参照を持つ現在の `makeCounter` 呼び出し。

3. `makeCounter` の実行中、小さいネストされた関数が作られます。

    関数が関数宣言、関数式どちらを使って作られたのかは関係ありません。すべての関数は、作成されたレキシカル環境を参照する `[[Environment]]` プロパティを取得します。従って、小さなネストされた関数も同様に取得します。

    新しいネストされた関数の `[[Environment]]` の値は `makeCounter()` の現在のレキシカル環境です。:

    ![](lexenv-nested-makecounter-3.png)

    このステップでは内部関数が作られますが、まだ呼ばれていないことに注意してください。`function() { return count++; }` の内側のコードは実行されておらず、私たちはそれを返します。

4. 実行が進み、`makeCounter()` 呼び出しが終わると、結果(小さなネストされた関数)がグローバル変数 `counter` に代入されます。

    ![](lexenv-nested-makecounter-4.png)

    その関数は1行だけです: `return count++`。それは呼び出されたときに実行されます。

5. `counter()` が呼ばれたとき、"空の" レキシカル環境が作られます。それはローカル変数を持っていませんが、`counter` の `[[Environment]]` はその外部参照として使われるので、それが作られた場所である、前の `makeCounter()` 呼び出しの変数にアクセスすることができます。

    ![](lexenv-nested-makecounter-5.png)

    今、変数にアクセスすると、最初に自身のレキシカル環境(空です)を探します。次に前の `makeCounter()` 呼び出しのレキシカル環境、次にグローバルです。

    `count` を探すとき、最も近い外部のレキシカル環境、`makeCounter` 変数の中でそれを見つけます。

    ここでどのようにメモリ管理がされているか注意してください。 `makeCounter()` 呼び出しが少し前に終わったとき、その `[[Environment]]` を参照するネストされた関数があるので、そのレキシカル環境はメモリに保持されています。

    一般的に、レキシカル環境オブジェクトは、それを使用する可能性のある関数が存在する限り存続します。 それがなければ、それはクリアされます。

6. `counter()` の呼び出しは `count` の値を返すだけでなく、その増加も行います。変更は "決まった場所" で行われることに注意してください。`count` の値は、正確に見つかった環境で変更されます。

    ![](lexenv-nested-makecounter-6.png)

    従って、変更(`count` の新しい値)だけ前のステップに戻ります。次の呼び出しはすべて同じです。

7. 次の `counter()` 呼び出しも同じです。

これで、このチャプターの最初の2つ目の基本の質問への答えは明らかになったはずです。

下のコードの `work()` 関数は、その起源の場所から外部のレキシカル環境への参照を通じて `name` を使います。:

![](lexenv-nested-work.png)

従って、結果は `"Pete"` です。

...しかし、もし `makeWorker()` に `let name` がなかった場合は外側へ探しに行き、上のチェインで分かるようにグローバル変数を取得します。この場合、結果は `"John"` になります。

```smart header="クロージャ"
開発者が一般的に知っておくべき、一般的なプログラミング用語 "クロージャ" があります。

[クロージャ(closure)](https://en.wikipedia.org/wiki/Closure_(computer_programming)) は外部変数を記憶し、それらにアクセスできる関数です。いくつかの言語ではそれは不可能、もしくはそれを実現するために特別な方法で関数を書く必要があります。しかし、上で説明したとおり、JavaScriptにおいては、すべての関数は自然にクロージャです(1つだけ例外があります。それについては <info:new-function> で説明します)。

つまり: それらは隠された `[[Environment]]`プロパティを使ってどこに作成されたのかを自動的に覚えていて、すべてが外部変数にアクセスできます。

面談でフロントエンドの開発者が「クロージャは何ですか？」という質問を受けたとき、有効な回答はクロージャの定義と、JavaScriptにおいてはすべての関数がクロージャであること、またその他の技術的に詳細な用語です: `[[Environment]]` プロパティとレキシカル環境の仕組み。
```

## コードブロックとループ、IIFE(即時実行関数)

上の例では関数に焦点を当てていました。しかしレキシカル環境はコードブロック `{...}` にも存在します。

コードブロックが実行され、ブロック内のローカル変数を含むときそれらが作られます。ここでいくつかの例です。

## If

下の例では、実行が `if` ブロックに来たとき、新しい "ifだけの" レキシカル環境が作られます。:

<!--
```js run
let phrase = "Hello";

if (true) {
  let user = "John";

  alert(`${phrase}, ${user}`); // Hello, John
}

alert(user); // Error, can't see such variable!
```
-->

![](lexenv-if.png)

新しいレキシカル環境はその外部への参照をもつため `phrase` を見つけることができます。しかし、`if` の中で宣言されたすべての変数と関数式はレキシカル環境の中にあり、外部からは見えません。

例えば、`if` が終わった後、下にある `alert` は `user`が見えないため、エラーになります。

## For, while

ループでは、すべての実行が別々のレキシカル環境を持っています。もし変数が `for` で宣言されると、そのレキシカル環境のローカル変数になります:

```js run
for (let i = 0; i < 10; i++) {
  // Each loop has its own Lexical Environment
  // {i: value}
}

alert(i); // Error, no such variable
```

これは例外です。なぜなら、`let i` は視覚的に `{...}` の外にあるからです。しかし、実際にはループの各実行はその中に現在の `i` を持つレキシカル環境を持ちます。

ループの後、`i` は見えません。

### コードブロック

また、私たちは変数を "ローカルスコープ" に分離するため、"裸の" コードブロック `{…}` を使うことが出来ます。

例えば、Webブラウザでは、すべてのスクリプトは同じグローバル領域で共有されています。従って、もしもあるスクリプトの中にグローバル変数を作ると、他からも利用可能になります。が、2つのスクリプトが同じ変数名を使っていたりお互いにオーバライドしている場合、ソースの衝突が起きます。

変数名が広く使われていて、スクリプトの作者が互いを認識していない場合に起こります。

これを回避したい場合は、コードブロックを使用して、スクリプト全体またはスクリプト内の領域を分離することができます。:

```js run
{
  // do some job with local variables that should not be seen outside

  let message = "Hello";

  alert(message); // Hello
}

alert(message); // Error: message is not defined
```

ブロックの外のコード(もしくは別のスクリプト)はその中の変数が見えません。なぜならコードブロックは自身のレキシカル環境を持つからです。

### IIFE(即時実行関数)

古いスクリプトでは、所謂 "即時実行関数(immediately-invoked function expressions)" (IIFEと略します) がこの目的に使われます。

このようなものです。:

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

関数式が作られすぐに呼ばれます。従って、コードはすぐに実行され自身のプライベート変数を持ちます。

関数式は括弧 `(function {...})` で囲まれています。なぜなら、JavaScriptはメインコードフローの中で `"function"` を見つけると、関数宣言の開始と理解します。しかし、関数宣言は名前が必須なので、エラーになります。
:

```js run
// Error: Unexpected token (
function() { // <-- JavaScript cannot find function name, meets ( and gives error

  let message = "Hello";

  alert(message); // Hello

}();
```

"大丈夫、関数宣言にして名前をつけよう" と言うことはできますが、これは動作しません。JavaScriptでは関数宣言をすぐに呼ぶことができません。:

```js run
// syntax error because of brackets below
function go() {

}(); // <-- can't call Function Declaration immediately
```

...従って、関数が別の式のコンテキストで作られたJavaScriptを表示するために括弧が必要になります。名前が不要で、すぐに呼び出すことができます。

JavaScriptには、関数式を意味する他の方法があります:

```js run
// Ways to create IIFE

(function() {
  alert("Brackets around the function");
}*!*)*/!*();

(function() {
  alert("Brackets around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

上のすべてのケースで、私たちは関数式を宣言しすぐにそれを実行することが出来ます。

## ガベージコレクション

私たちが話してきたレキシカル環境オブジェクトは、通常の値と同じメモリ管理ルールの対象です。

- 通常、レキシカル環境は関数が実行された後にクリーンアップされます。例:

    ```js
    function f() {
      let value1 = 123;
      let value2 = 456;
    }

    f();
    ```

    ここで2つの値は技術的にレキシカル環境のプロパティです。しかし `f()` が終わった後、レキシカル環境は到達不能になるので、メモリから削除されます。

- ...しかし、も `f` の後でもまだ到達可能なネストされた関数がある場合、その `[[Environment]]` 参照は外部のレキシカル環境を生かし続けます。:

    ```js
    function f() {
      let value = 123;

      function g() { alert(value); }

    *!*
      return g;
    */!*
    }

    let g = f(); // g is reachable, and keeps the outer lexical environment in memory
    ```

- もし `f()` が何度も呼ばれ、結果の関数が保持される場合、対応するレキシカル環境オブジェクトもまたメモリに残ります。下のコードでは3つすべて:

    ```js
    function f() {
      let value = Math.random();

      return function() { alert(value); };
    }

    // 3 functions in array, every one of them links to Lexical Environment
    // from the corresponding f() run
    //         LE   LE   LE
    let arr = [f(), f(), f()];
    ```

- レキシカル環境オブジェクトは到達不能になったときに死にます。すまり: それを参照するネストされた関数が残っていないときです。下のコードでは、 `g` が到達不能になった後、`value` もまたメモリからクリアされます:

    ```js
    function f() {
      let value = 123;

      function g() { alert(value); }

      return g;
    }

    let g = f(); // while g is alive
    // there corresponding Lexical Environment lives

    g = null; // ...and now the memory is cleaned up
    ```

### 現実の最適化(Real-life optimizations)

これまで見てきたように、理論的には関数が生きている間、すべての外部変数も保持されます。

しかし、実際には、JavaScriptエンジンはそれを最適化しようとします。変数の使用状況を分析し、外部変数が使用されていないことがわかりやすい場合は削除されます。

**V8(Chrome, Opera)の重要な副作用はこのような変数はデバッグでは利用できなくなることです。**

Chromeで Developer Tools を開いて下の例を実行してみてください。

一時停止したとき、console で `alert(value)` をタイプしてください。

```js run
function f() {
  let value = Math.random();

  function g() {
    debugger; // in console: type alert( value ); No such variable!
  }

  return g;
}

let g = f();
g();
```

あなたが見た通り -- このような変数はありません! 理論的にはアクセスできるはずですが、エンジンが最適化しています。

これは面白い（そうでなくても時間のかかる）デバッグの問題につながる可能性があります。 そのうちの1つ - 期待されるものの代わりに、同じ名前の外部変数を見ることができます:

```js run global
let value = "Surprise!";

function f() {
  let value = "the closest value";

  function g() {
    debugger; // in console: type alert( value ); Surprise!
  }

  return g;
}

let g = f();
g();
```

```warn header="See ya!"
V8 のこの機能は知っておくと良いです。もしも Chrome/Opera でデバッグしている場合、遅かれ早かれこれに遭遇するでしょう。

これはデバッガのバグではなく、V8の特別な機能です。時々変わるかもしれません。
このページの例を実行することで、いつでもチェックすることができます。
```
