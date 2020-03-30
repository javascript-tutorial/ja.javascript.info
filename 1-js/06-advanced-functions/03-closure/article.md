
<<<<<<< HEAD
# クロージャ

JavaScript は非常に関数指向な言語です。それは我々に多くの自由を与えます。ある時点で作成した関数は、別の変数にコピーしたり別の関数に引数として渡し、後でまったく別の場所から呼ぶことができます。

私たちは関数が外側の変数にアクセスできることを知っています。そしてこの特徴は頻繁に使われます。

しかし、外部の変数が変わると何が起きるでしょう？関数は最新の値を得るでしょうか？それとも関数が生成された時点で存在していた値を取得することになるでしょうか？

また、関数がコード内の別の場所に移動して、そこから呼び出されたとき、何が起きるでしょう？新しい場所での外部変数にアクセスできるのでしょうか？

言語によっては、ここで説明する内容とは異なる振る舞いをします。このチャプターでは、JavaScript について説明します。

[cut]

## いくつかの質問 

最初に2つの状況を考え、内部の仕組みを少しずつ学んで行きましょう。そうすれば、次の質問や、今後出てくるであろうより複雑なものにも答えることができるでしょう。

1. 関数 `sayHi` は外部変数 `name` を使います。関数を実行するとき、2つの値のうち、どちらが使われるでしょうか？

    ```js
    let name = "John";

    function sayHi() {
      alert("Hi, " + name);
    }

    name = "Pete";

    *!*
    sayHi(); // 何が表示されますか？: "John" それとも "Pete"?
    */!*
    ```

    このような状況は、ブラウザやサーバサイドでの開発両方で一般的です。関数は作られた時間よりも後、例えばユーザ操作やネットワークリクエストの後に実行がスケジュールされる場合があります。

    従って、質問は: 関数 `sayHi` は最新の変更を受け取りますか？


2. 関数 `makeWorker` は別の関数を作り、それを返します。その新しい関数は他の場所から呼び出すことができます。作成された場所、呼び出し場所、あるいはその両方からの外部変数にアクセスできますか？

    ```js
    function makeWorker() {
      let name = "Pete";

      return function() {
        alert(name);
      };
    }

    let name = "John";

    // 関数を作成する
    let work = makeWorker();

    // それを呼ぶ
    *!*
    work(); // 何が表示されますか? "Pete" (作成された場所の name ) or "John" (呼び出された場所の name )?
    */!*
    ```


## レキシカル/語彙環境(Lexical Environment) 

何が起きるか理解するために、まず "変数" が技術的に何であるかを議論しましょう。

JavaScript では、すべての実行中の関数やコードブロック、スクリプト全体は *レキシカル環境* と呼ばれる関連オブジェクトを持っています。

レキシカル環境オブジェクトは2つの部分から構成されます:

1. *環境レコード(Environment Record)* 。プロパティとしてすべてのローカル変数をもつオブジェクトです(`this` の値など、他の情報もいくらか持っています)。
2. *外部のレキシカル環境* への参照。通常、直近の外部のレキシカルなコードに関連付けられています（現在の波括弧の外側）。

なので、"変数" は単に、特別な内部オブジェクト、環境レコードのプロパティです。"変数を取得または変更する" とは、"そのオブジェクトのプロパティを取得または変更する" ことを意味します。

例えば、この簡単なコードでは、レキシカル環境は1つだけあります。:

![lexical environment](lexical-environment-global.svg)

これは、スクリプト全体に関連付けられた、いわゆるグローバルレキシカル環境です。 ブラウザの場合、すべての `<script>` タグは同じグローバル環境を共有します。

上の図の長方形は環境レコード(変数ストア)で、矢印(outerの部分)は外部参照を意味します。グローバルレキシカル環境は外部参照を持っていないので、 `null` です。

下記は、`let` 変数がどのように動作するかを示す図です:

![lexical environment](lexical-environment-global-2.svg)

右側の長方形は、実行の間でどのようにグローバルレキシカル環境が変わるかを示しています。:

1. スクリプト開始時、レキシカル環境は空です。
2. `let phrase` 定義が現れました。今は初期値がないので、 `undefined` が格納されます。
3. `phrase` が代入されます。
4. `phrase` が新しい値を参照します。

今のところすべてシンプルに見えますね。

要約すると:

- 変数は特別な内部オブジェクトのプロパティで、現在の実行ブロック/関数/スクリプトと関連付けられています。
- 変数を使った作業は、実際にはそのオブジェクトのプロパティを使って作業しています。

### 関数宣言

関数宣言は特別です。`let` 変数とは異なり、実行がそこに到達したときに処理されるのではなく、レキシカル環境が作られたときに処理されます。グローバルレキシカル環境では、スクリプトが開始される瞬間を意味します。

そういうわけで、定義される前に関数宣言を呼び出すことができます。

下のコードはレキシカル環境は最初から空ではないことを示しています。関数宣言なので `say` を持っています。その後 `let` で宣言された `phrase` を取得します:

![lexical environment](lexical-environment-global-3.svg)
=======
# Variable scope

JavaScript is a very function-oriented language. It gives us a lot of freedom. A function can be created dynamically, passed as an argument to another function and called from a totally different place of code later.

We already know that a function can access variables outside of it.

Now let's expand our knowledge to include more complex scenarios.

```smart header="We'll talk about `let/const` variables here"
In JavaScript, there are 3 ways to declare a variable: `let`, `const` (the modern ones), and `var` (the remnant of the past).

- In this article we'll use `let` variables in examples.
- Variables, declared with `const`, behave the same, so this article is about `const` too.
- The old `var` has some notable differences, they will be covered in the article <info:var>.
```

## Code blocks
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

If a variable is declared inside a code block `{...}`, it's only visible inside that block.

<<<<<<< HEAD
### 内外のレキシカル環境

呼び出しの中で、`say()` は外部変数を使います。何が起きているか見てみましょう。

まず、関数を実行するとき、新しい関数のレキシカル環境が自動的に作られます。それはすべての関数での一般的なルールです。そのレキシカル環境はローカル変数や呼び出しパラメータを格納するために使われます。
=======
For example:

```js run
{
  // do some job with local variables that should not be seen outside

  let message = "Hello"; // only visible in this block
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

  alert(message); // Hello
}

alert(message); // Error: message is not defined
```
<<<<<<< HEAD
-->

これは、実行が `say("John")` の内部にあるときで、矢印のついた行にあるレキシカル環境の図です。:

![lexical environment](lexical-environment-simple.svg)

関数呼び出しの間、2つのレキシカル環境があります: 内部のもの(関数呼び出し用)と、外部のもの(グローバル)です:

- 内部のレキシカル環境は現在の `say` の実行に対応しています。1つ変数(`name`)を持っており、それは関数の引数です。私たちは `say("John")` を呼び出したので、 `name` は `"John"` です。
- 外部のレキシカル環境はグローバルレキシカル環境です。

内部のレキシカル環境は外部のものへの `外部` 参照を持っています。

**コードが変数にアクセスしたいとき、最初に内部のレキシカル環境を探します。その次に外側を探し、チェーンの最後になるまで繰り返します。**

もし変数がどこにもない場合、strict モードではエラーになります。`use strict` がなければ、未定義変数への代入は下位互換性のために新しいグローバル変数を作成します。

今回の例でどのように探索されるか見てみましょう:

- `say` の内側にある `alert` が `name` にアクセスしたいとき、関数のレキシカル環境の中からすぐに見つけます。
- `phrase` にアクセスしたいとき、ローカルには `phrase` がないので、続いて `外部` 参照を行い、グローバルでそれを見つけます。

![lexical environment lookup](lexical-environment-simple-lookup.svg)

これで、このチャプターの最初にあった1つ目の質問に答えることができます。

**関数は外部変数を最新の値として取得します。**

これは、説明されたメカニズムによるものです。 古い変数の値はどこにも保存されません。 関数がそれらを必要とするとき、自身または外部のレキシカル環境から現在の値を取ります。

従って、最初の質問の答えは `Pete` です:
=======

We can use this to isolate a piece of code that does its own task, with variables that only belong to it:

```js run
{
  // show message
  let message = "Hello";
  alert(message);
}

{
  // show another message
  let message = "Goodbye";
  alert(message);
}
```

````smart header="There'd be an error without blocks"
Please note, without separate blocks there would be an error, if we use `let` with the existing variable name:

```js run
// show message
let message = "Hello";
alert(message);

// show another message
*!*
let message = "Goodbye"; // Error: variable already declared
*/!*
alert(message);
```
````

For `if`, `for`, `while` and so on, variables declared in `{...}` are also only visible inside:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
if (true) {
  let phrase = "Hello!";

  alert(phrase); // Hello!
}

alert(phrase); // Error, no such variable!
```

<<<<<<< HEAD
上のコードの実行フローは次の通りです:

1. グローバルレキシカル環境は `name` を持っています: `"John"`.
2. `(*)` の行でグローバル変数が変更され、今 `name` は　`"Pete"` です。
3. 関数 `say()` が実行され、外部から `name` を取得します。ここでは、それはグローバルレキシカル環境であり、`"Pete"` です。

```smart header="1つの呼び出しに、1つのレキシカル環境です"
新しい関数のレキシカル環境は、関数が実行するたびに作られることに注意してください。

また、関数が複数回呼び出された場合、各呼び出しには自身のレキシカル環境があり、ローカル変数とその実行に固有のパラメーターがあります。
```

```smart header="レキシカル環境は仕様上のオブジェクトです"
"レキシカル環境" は仕様上のオブジェクトです。コードからそのオブジェクトを取得したり、直接操作することはできません。JavaScriptエンジンはメモリを節約するために使っていない変数を破棄したり、他の内部トリックを行うと言った最適化をする場合がありますが、見える振る舞いは上で説明した通りである必要があります。
=======
Here, after `if` finishes, the `alert` below won't see the `phrase`, hence the error.

That's great, as it allows us to create block-local variables, specific to an `if` branch.

The similar thing holds true for `for` and `while` loops:

```js run
for (let i = 0; i < 3; i++) {
  // the variable i is only visible inside this for
  alert(i); // 0, then 1, then 2
}

alert(i); // Error, no such variable
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
```

Visually, `let i` is outside of `{...}`. But the `for` construct is special here: the variable, declared inside it, is considered a part of the block.

## ネストされた関数 

関数は、別の関数の内部で作成されたとき、"ネストされた" と呼ばれます。

<<<<<<< HEAD
技術的には、それは簡単に可能です。

私たちは、コードを整理するのに利用します:
=======
It is easily possible to do this with JavaScript.

We can use it to organize our code, like this:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
function sayHiBye(firstName, lastName) {

  // 下で使うネストされたヘルパー関数です
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert( "Hello, " + getFullName() );
  alert( "Bye, " + getFullName() );

}
```

<<<<<<< HEAD
ここでの *ネストされた* 関数 `getFullName()` は利便性のために作られています。それは外部変数にアクセスすることができるので、フルネームを返すことができます。

さらに興味深い点は、新しいオブジェクトのプロパティ（外部関数がメソッドを持つオブジェクトを作成する場合）またはその自身の結果として、ネストされた関数を返すことができることです:  それは他の場所で使うことができます。どこにいても、同じ外部変数には依然としてアクセスできます。

コンストラクタ関数を持つ例です(チャプター <info:constructor-new> を参照):

```js run
// コンストラクタ関数は新しいオブジェクトを返します
function User(name) {

  // オブジェクトメソッドはネストされた関数として作成されます
  this.sayHi = function() {
    alert(name);
  };
}

let user = new User("John");
user.sayHi(); // このメソッドは外部の "name" へアクセスできます
```

関数を返す例です:
=======
Here the *nested* function `getFullName()` is made for convenience. It can access the outer variables and so can return the full name. Nested functions are quite common in JavaScript.

What's much more interesting, a nested function can be returned: either as a property of a new object or as a result by itself. It can then be used somewhere else. No matter where, it still has access to the same outer variables.

Below, `makeCounter` creates the "counter" function that returns the next number on each invocation:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
function makeCounter() {
  let count = 0;

  return function() {
<<<<<<< HEAD
    return count++; // 外の counter へアクセスできます
=======
    return count++;
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```

<<<<<<< HEAD
`makeCounter` の例を続けましょう。それは各呼び出しで次の数値を返す "counter" 関数を作ります。シンプルであるにも関わらず、そのコードからわずかに変更されたバリアントは実践で使われています。例えば、[擬似乱数生成器(pseudorandom number generator)](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) などです。なので、この例はあまり不自然ではありません。

counter は内部でどのように動作しているのでしょう？

内部関数が実行されると、`count++` の変数は内側から外に検索されます。上の例では、その順番は次のようになります。:

![](lexical-search-order.svg)

1. ネストされた関数のローカル変数
2. 外部関数の変数
3. ...そしてさらにグローバルに到達するまで

この例では、`count` はステップ `2` で見つかります。外部変数が変更されると、それが見つかった場所で変更されます。従って、`count++` は外部変数を見つけ、それが属するレキシカル環境内でその値を増やします。

ここで2つの質問があります:

1. `counter` を `makeCounter` に属していないコードからリセットすることはできるでしょうか？ 例えば、上記の例で `alert` 呼び出し後で。
2. もし `makeCounter()` を複数回呼び出した場合、それは複数の `counter` 関数を返します。それらは独立していますか？それとも同じ `count` を共有しますか？

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
=======
Despite being simple, slightly modified variants of that code have practical uses, for instance, as a [random number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) to generate random values for automated tests.

How does this work? If we create multiple counters, will they be independent? What's going on with the variables here?

Undestanding such things is great for the overall knowledge of JavaScript and beneficial for more complex scenarios. So let's go a bit in-depth.

## Lexical Environment
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```warn header="Here be dragons!"
The in-depth technical explanation lies ahead.

<<<<<<< HEAD
alert( counter2() ); // 0 (独立))
```

外部変数の状況は明らかになってきたと思います。しかし、より複雑な状況では、内部のより深い理解が必要になります。なので次に進みましょう。

## 環境の詳細 

今や、クロージャが一般的にどのように動作するかを理解したので、重要なポイントまで降りることができます。

これは `makeCounter` の例で起こっていることを段階的に示したものです。すべてを理解するよう、順に見てください。まだ説明していない追加の `[[Environment]]` プロパティに注意してください。

1. スクリプトが開始された直後は、グローバルレキシカル環境だけがあります:

    ![](lexenv-nested-makecounter-1.svg)

    開始時点では、`makeCounter` 関数だけがあります。なぜなら、それが関数宣言だからです。それはまだ実行されていません。

    "誕生した" すべての関数は、作成されたレキシカル環境への参照を持つ隠しプロパティ `[[Environment]]` を受け取ります。まだこれについて話していませんでしたが、このプロパティは関数が作られた場所を知る方法です。

    ここで、`makeCounter` はグローバルレキシカル環境に作られるので、`[[Environment]]` はそこへの参照を維持します。

    つまり、関数にはそれが生まれたレキシカル環境への参照が "刻み込まれて" います。 `[[Environment]]`は、その参照を持つ隠し関数プロパティです。

2. 次に、コードが実行され `makeCounter()` の呼び出しが行われます。これは、実行が `makeCounter()` の処理の最初の行の時点の図です。

    ![](lexenv-nested-makecounter-2.svg)

    `makeCounter()` 呼び出しの時点で、その変数や引数を保持するためにレキシカル環境が作られます。

    すべてのレキシカル環境では2つのものを保持します:
    1. ローカル変数を持つ環境レコード。我々のケースでは、`count` は唯一のローカル変数です(`let count` の行が実行されたとき出現します)。
    2. 外部のレキシカルへの参照。それは関数の `[[Environment]]` にセットされています。ここでは `makeCounter` の `[[Environment]]` はグローバルレキシカル環境を参照します。

    従って、今は 2つのレキシカル環境があります。1つ目はグローバル、2つ目はグローバルへの外部参照を持つ現在の `makeCounter` 呼び出しです。

3. `makeCounter` の実行中、小さいネストされた関数が作られます。

    関数が関数宣言、関数式どちらを使って作られたのかは関係ありません。すべての関数は、作成されたレキシカル環境を参照する `[[Environment]]` プロパティを取得します。従って、小さなネストされた関数も同様に取得します。

    新しいネストされた関数の `[[Environment]]` の値は `makeCounter()` の現在のレキシカル環境です。:

    ![](lexenv-nested-makecounter-3.svg)

    このステップでは内部関数が作られますが、まだ呼ばれていないことに注意してください。`function() { return count++; }` の内側のコードは実行されておらず、私たちはそのコードを返します。

4. 実行が進み、`makeCounter()` 呼び出しが終わると、結果(小さなネストされた関数)がグローバル変数 `counter` に代入されます。

    ![](lexenv-nested-makecounter-4.svg)

    関数は1行 `return count++` だけです。これは呼び出されたときに実行されます。

5. `counter()` が呼ばれると、"空の" レキシカル環境が作られます。それはローカル変数を持っていませんが、`counter` の `[[Environment]]` はその外部参照として使われるので、それが作られた場所である、前の `makeCounter()` 呼び出しの変数にアクセスすることができます。

    ![](lexenv-nested-makecounter-5.svg)

    いま、変数にアクセスすると、最初に自身のレキシカル環境を探します(空です)。次に前の `makeCounter()` 呼び出しのレキシカル環境、次にグローバルです。

    `count` を探すとき、最も近い外部のレキシカル環境、つまり `makeCounter` 変数の中でそれを見つけます。

    ここでどのようにメモリ管理がされているか注意してください。 `makeCounter()` 呼び出しが少し前に終わったとき、その `[[Environment]]` を参照するネストされた関数があるので、そのレキシカル環境はメモリに保持されています。

    一般的に、レキシカル環境オブジェクトは、それを使用する可能性のある関数が存在する限り存続します。 それがなければクリアされます。

6. `counter()` の呼び出しは `count` の値を返すだけでなく、その値も増やします。変更は "その場" で行われることに注目してください。`count` の値は、正確に見つかった環境で変更されます。

    ![](lexenv-nested-makecounter-6.svg)

    なので、変更(`count` の新しい値)だけ前のステップに戻ります。以降の呼び出しはすべて同じことを行います。

7. 次の `counter()` 呼び出しも同じです。

これで、このチャプターの最初にあった、2つ目の質問への答えも明らかになったはずです。

下のコードの `work()` 関数は、その起源の場所から外部のレキシカル環境への参照を通じて `name` を得ようとします。:

![](lexenv-nested-work.svg)

従って、結果は `"Pete"` です。

しかし、もし `makeWorker()` に `let name` がなかった場合は外側へ探しに行き、上のチェーンで分かるようにグローバル変数を取得します。この場合、結果は `"John"` になります。

```smart header="クロージャ"
開発者が一般的に知っておくべき、一般的なプログラミング用語 "クロージャ" があります。

[クロージャ(closure)](https://en.wikipedia.org/wiki/Closure_(computer_programming)) は外部変数を記憶し、それらにアクセスできる関数です。いくつかの言語ではそれは不可能、もしくはそれを実現するために特別な方法で関数を書く必要があります。しかし、上で説明したとおり、JavaScriptにおいては、すべての関数は自然にクロージャです(1つだけ例外があります。それについては <info:new-function> で説明します)。

つまり: それらは隠された `[[Environment]]`プロパティを使ってどこに作成されたのかを自動的に覚えていて、すべてが外部変数にアクセスできます。

面接でフロントエンドの開発者が「クロージャは何ですか？」という質問を受けたとき、有効な回答は、クロージャの定義と、JavaScriptにおいてはすべての関数がクロージャであること、また `[[Environment]]` プロパティとレキシカル環境の仕組みと言った技術的に詳細な用語です 。
```

## コードブロックとループ、IIFE(即時実行関数) 

上の例では関数に焦点を当てていました。しかしレキシカル環境はコードブロック `{...}` にも存在します。

コードブロックが実行され、ブロック内のローカル変数を含むときそれらが作られます。ここではいくつかの例を示します。
=======
As far as I'd like to avoid low-level language details, any understanding without them would be lacking and incomplete, so get ready.
```

For clarity, the explanation is split into multiple steps.

### Step 1. Variables

In JavaScript, every running function, code block `{...}`, and the script as a whole have an internal (hidden) associated object known as the *Lexical Environment*.

The Lexical Environment object consists of two parts:

1. *Environment Record* -- an object that stores all local variables as its properties (and some other information like the value of `this`).
2. A reference to the *outer lexical environment*, the one associated with the outer code.

**A "variable" is just a property of the special internal object, `Environment Record`. "To get or change a variable" means "to get or change a property of that object".**

In this simple code without functions, there is only one Lexical Environment:

![lexical environment](lexical-environment-global.svg)

This is the so-called *global* Lexical Environment, associated with the whole script.

On the picture above, the rectangle means Environment Record (variable store) and the arrow means the outer reference. The global Lexical Environment has no outer reference, that's why the arrow points to `null`.

As the code starts executing and goes on, the Lexical Environment changes.

Here's a little bit longer code:

![lexical environment](closure-variable-phrase.svg)

Rectangles on the right-hand side demonstrate how the global Lexical Environment changes during the execution:

1. When the script starts, the Lexical Environment is pre-populated with all declared variables.
    - Initially, they are in the "Uninitialized" state. That's a special internal state, it means that the engine knows about the variable, but it cannot be referenced until it has been declared with `let`. It's almost the same as if the variable didn't exist.
2. Then `let phrase` definition appears. There's no assignment yet, so its value is `undefined`. We can use the variable since this moment.
3. `phrase` is assigned a value.
4. `phrase` changes the value.

Everything looks simple for now, right?

- A variable is a property of a special internal object, associated with the currently executing block/function/script.
- Working with variables is actually working with the properties of that object.

```smart header="Lexical Environment is a specification object"
"Lexical Environment" is a specification object: it only exists "theoretically" in the [language specification](https://tc39.es/ecma262/#sec-lexical-environments) to describe how things work. We can't get this object in our code and manipulate it directly.

JavaScript engines also may optimize it, discard variables that are unused to save memory and perform other internal tricks, as long as the visible behavior remains as described.
```

### Step 2. Function Declarations

A function is also a value, like a variable.

**The difference is that a Function Declaration is instantly fully initialized.**

When a Lexical Environment is created, a Function Declaration immediately becomes a ready-to-use function (unlike `let`, that is unusable till the declaration).

That's why we can use a function, declared as Function Declaration, even before the declaration itself.

For example, here's the initial state of the global Lexical Environment when we add a function:

![](closure-function-declaration.svg)

Naturally, this behavior only applies to Function Declarations, not Function Expressions where we assign a function to a variable, such as `let say = function(name)...`.

### Step 3. Inner and outer Lexical Environment

When a function runs, at the beginning of the call, a new Lexical Environment is created automatically to store local variables and parameters of the call.

For instance, for `say("John")`, it looks like this (the execution is at the line, labelled with an arrow):

<!--
    ```js
    let phrase = "Hello";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Hello, John
    ```-->

![](lexical-environment-simple.svg)

During the function call we have two Lexical Environments: the inner one (for the function call) and the outer one (global):

- The inner Lexical Environment corresponds to the current execution of `say`. It has a single property: `name`, the function argument. We called `say("John")`, so the value of the `name` is `"John"`.
- The outer Lexical Environment is the global Lexical Environment. It has the `phrase` variable and the function itself.

The inner Lexical Environment has a reference to the `outer` one.

**When the code wants to access a variable -- the inner Lexical Environment is searched first, then the outer one, then the more outer one and so on until the global one.**

If a variable is not found anywhere, that's an error in strict mode (without `use strict`, an assignment to a non-existing variable creates a new global variable, for compatibility with old code).

In this example the search proceeds as follows:

- For the `name` variable, the `alert` inside `say` finds it immediately in the inner Lexical Environment.
- When it wants to access `phrase`, then there is no `phrase` locally, so it follows the reference to the outer Lexical Environment and finds it there.

![lexical environment lookup](lexical-environment-simple-lookup.svg)
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648


<<<<<<< HEAD
下の例では、実行が `if` ブロックに来たとき、新しい "ifだけの" レキシカル環境が作られます。:
=======
### Step 4. Returning a function
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

Let's return to the `makeCounter` example.

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

<<<<<<< HEAD
alert(user); // Error, このような変数は見えません!
=======
let counter = makeCounter();
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
```

<<<<<<< HEAD
![](lexenv-if.svg)

新しいレキシカル環境はその外部への参照をもつため `phrase` を見つけることができます。しかし、`if` の中で宣言されたすべての変数と関数式はレキシカル環境の中にあり、外部からは見えません。

例えば、`if` が終わった後にある `alert` は、 `user`が見えないため、エラーになります。
=======
At the beginning of each `makeCounter()` call, a new Lexical Environment object is created, to store variables for this `makeCounter` run.

So we have two nested Lexical Environments, just like in the example above:

![](closure-makecounter.svg)
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

What's different is that, during the execution of `makeCounter()`, a tiny nested function is created of only one line: `return count++`. We don't run it yet, only create.

<<<<<<< HEAD
ループでは、すべての実行が別々のレキシカル環境を持っています。もし変数が `for` で宣言されると、そのレキシカル環境のローカル変数になります:

```js run
for (let i = 0; i < 10; i++) {
  // 各ループはそれぞれのレキシカル環境を持ちます
  // {i: value}
}

alert(i); // Error, このような変数はありません
```

これは例外です。なぜなら、`let i` は視覚的に `{...}` の外にあるからです。しかし、実際にはループの各実行はその中に現在の `i` を持つレキシカル環境を持ちます。

ループの後、`i` は見えません。

### コードブロック

また、変数を "ローカルスコープ" に分離するため、"裸の" コードブロック `{…}` を使うこともできます。

例えば、Webブラウザでは、すべてのスクリプトは同じグローバル領域で共有されています。従って、もしもあるスクリプトの中にグローバル変数を作ると、他からも利用可能になります。が、2つのスクリプトが同じ変数名を使っていたりお互いにオーバライドしている場合、ソースの衝突が起きます。

変数名が広く使われていて、スクリプトの作者が互いを認識していない場合に起こります。

これを回避したい場合は、コードブロックを使用して、スクリプト全体またはスクリプト内の領域を分離することができます。:

```js run
{
  // 外には見せるべきでないローカル変数で必要な処理をする
=======
All functions remember the Lexical Environment in which they were made. Technically, there's no magic here: all functions have the hidden property named `[[Environment]]`, that keeps the reference to the Lexical Environment where the function was created:

![](closure-makecounter-environment.svg)

So, `counter.[[Environment]]` has the reference to `{count: 0}` Lexical Environment. That's how the function remembers where it was created, no matter where it's called. The `[[Environment]]` reference is set once and forever at function creation time.

Later, when `counter()` is called, a new Lexical Environment is created for the call, and its outer Lexical Environment reference is taken from `counter.[[Environment]]`:

![](closure-makecounter-nested-call.svg)

Now when the code inside `counter()` looks for `count` variable, it first searches its own Lexical Environment (empty, as there are no local variables there), then the Lexical Environment of the outer `makeCounter()` call, where finds it and changes.

**A variable is updated in the Lexical Environment where it lives.**

Here's the state after the execution:

![](closure-makecounter-nested-call-2.svg)

If we call `counter()` multiple times, the `count` variable will be increased to `2`, `3` and so on, at the same place.

```smart header="Closure"
There is a general programming term "closure", that developers generally should know.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

A [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) is a function that remembers its outer variables and can access them. In some languages, that's not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in <info:new-function>).

That is: they automatically remember where they were created using a hidden `[[Environment]]` property, and then their code can access outer variables.

<<<<<<< HEAD
alert(message); // Error: message は未定義
```

ブロックの外のコード(もしくは別のスクリプト)はその中の変数が見えません。なぜならコードブロックは自身のレキシカル環境を持つからです。

### IIFE(即時実行関数)

古いスクリプトでは、いわゆる "即時実行関数(immediately-invoked function expressions)" (IIFEと略します) がこの目的に使われます。

このようなものです。:
=======
When on an interview, a frontend developer gets a question about "what's a closure?", a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe a few more words about technical details: the `[[Environment]]` property and how Lexical Environments work.
```

## Garbage collection

Usually, a Lexical Environment is removed from memory with all the variables after the function call finishes. That's because there are no references to it. As any JavaScript object, it's only kept in memory while it's reachable.

...But if there's a nested function that is still reachable after the end of a function, then it has `[[Environment]]` property that references the lexical environment.

In that case the Lexical Environment is still reachable even after the completion of the function, so it stays alive.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

For example:

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g.[[Environment]] stores a reference to the Lexical Environment
// of the corresponding f() call
```

<<<<<<< HEAD
関数式が作られすぐに呼ばれます。従って、コードはすぐに実行され自身のプライベート変数を持ちます。

関数式は括弧 `(function {...})` で囲まれています。なぜなら、JavaScriptはメインコードフローの中で `"function"` を見つけると、関数宣言の開始と理解します。しかし、関数宣言は名前が必須なので、エラーになります。
:

```js run
// Error: Unexpected token (
function() { // <-- JavaScript は関数名を見つけることができません (エラーになります)

  let message = "Hello";

  alert(message); // Hello

}();
```

"わかった、では関数宣言にして名前をつけよう" と思うかもしれませんが、これは動作しません。JavaScriptでは関数宣言をすぐに呼ぶことができません。:

```js run
// 下の括弧による構文エラー
function go() {

}(); // <-- 関数宣言は即時呼び出しできません
```

従って、関数が別の式のコンテキストで作られており、関数式であることを JavaScript に示すには括弧が必要になります。名前なしで、すぐに呼び出せる必要があります。

JavaScriptには、関数式を意味する他の方法があります:

```js run
// IIFE の作成方法

(function() {
  alert("関数を括弧で囲みます");
}*!*)*/!*();

(function() {
  alert("全体を括弧で囲みます");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("NOT 演算子は式を開始します");
}();

*!*+*/!*function() {
  alert("単項プラスは式を開始します");
}();
```

上のすべてのケースで、私たちは関数式を宣言した後すぐに実行することができます。

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

- ...しかし、もし `f` の後でもまだ到達可能なネストされた関数がある場合、その `[[Environment]]` 参照は外部のレキシカル環境を生かし続けます。:

    ```js
    function f() {
      let value = 123;

      function g() { alert(value); }

    *!*
      return g;
    */!*
    }

    let g = f(); // g は到達可能であり、メモリ上で外部のレキシカル環境で保持されます
    ```

- もし `f()` が何度も呼ばれ、結果の関数が保持される場合、対応するレキシカル環境オブジェクトもまたメモリに残ります。下のコードでは3つすべて:

    ```js
    function f() {
      let value = Math.random();

      return function() { alert(value); };
    }

    // 配列に3つの関数があり、それぞれが対応する f() からの
    // レキシカル環境と関連づいています
    //         LE   LE   LE
    let arr = [f(), f(), f()];
    ```

- レキシカル環境オブジェクトは到達不能になったときに死にます。つまり: それを参照するネストされた関数が残っていないときです。下のコードでは、 `g` が到達不能になった後、`value` もまたメモリからクリアされます:

    ```js
    function f() {
      let value = 123;

      function g() { alert(value); }

      return g;
    }

    let g = f(); // g が生きている間
    // 対応するレキシカル環境も生きている

    g = null; // ...今、メモリはクリーンアップされます
    ```

### 現実の最適化(Real-life optimizations)
=======
Please note that if `f()` is called many times, and resulting functions are saved, then all corresponding Lexical Environment objects will also be retained in memory. All 3 of them in the code below:

```js
function f() {
  let value = Math.random();

  return function() { alert(value); };
}

// 3 functions in array, every one of them links to Lexical Environment
// from the corresponding f() run
let arr = [f(), f(), f()];
```

A Lexical Environment object dies when it becomes unreachable (just like any other object). In other words, it exists only while there's at least one nested function referencing it.

In the code below, after the nested function is removed, its enclosing Lexical Environment (and hence the `value`) is cleaned from memory:

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // while g function exists, the value stays in memory

g = null; // ...and now the memory is cleaned up
```

### Real-life optimizations
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

これまで見てきたように、理論的には関数が生きている間、すべての外部変数も保持されます。

<<<<<<< HEAD
しかし、実際にはJavaScriptエンジンはそれを最適化しようとします。変数の使用状況を分析し、外部変数が使用されていないことがわかりやすい場合は削除されます。
=======
But in practice, JavaScript engines try to optimize that. They analyze variable usage and if it's obvious from the code that an outer variable is not used -- it is removed.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

**V8(Chrome, Opera)の重要な副作用はこのような変数はデバッグでは利用できなくなることです。**

<<<<<<< HEAD
Chromeで Developer Tools を開いて下の例を実行してみてください。

一時停止したとき、console で `alert(value)` をタイプしてください。
=======
Try running the example below in Chrome with the Developer Tools open.

When it pauses, in the console type `alert(value)`.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
function f() {
  let value = Math.random();

  function g() {
    debugger; // in console: type alert(value); No such variable!
  }

  return g;
}

let g = f();
g();
```

ご覧の通り、このような変数はありません! 理論的にはアクセスできるはずですが、エンジンが最適化しています。

これは興味深い（そうでなくても時間のかかる）デバッグの問題につながる可能性があります。 期待しているものの代わりに、同じ名前の外部変数を見ることができます:

```js run global
let value = "Surprise!";

function f() {
  let value = "the closest value";

  function g() {
    debugger; // in console: type alert(value); Surprise!
  }

  return g;
}

let g = f();
g();
```

<<<<<<< HEAD
```warn header="See ya!"
V8 のこの機能は知っておくと良いです。もしも Chrome/Opera でデバッグしている場合、遅かれ早かれこれに遭遇するでしょう。

これはデバッガのバグではなく、V8の特別な機能です。時々変わるかもしれません。
このページの例を実行することで、いつでもチェックすることができます。
```
=======
This feature of V8 is good to know. If you are debugging with Chrome/Opera, sooner or later you will meet it.

That is not a bug in the debugger, but rather a special feature of V8. Perhaps it will be changed sometime. You always can check for it by running the examples on this page.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
