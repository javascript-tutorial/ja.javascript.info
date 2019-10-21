# 関数式とアロー

JavaScriptでは、関数は "魔法の言語構造" ではなく、特別な種類の値です。

<<<<<<< HEAD
[cut]

前に私たちが使っていた構文は *関数宣言* と呼ばれます:
=======
The syntax that we used before is called a *Function Declaration*:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js
function sayHi() {
  alert( "Hello" );
}
```

これとは別に、*関数式* と呼ばれる、関数を作るための別の構文があります。

それはこのようになります:

```js
let sayHi = function() {
  alert( "Hello" );
};
```

ここでは、関数は他の任意の値と同じように明示的に変数に代入されています。
どのように変数が定義されても、それは単に変数 `sayHi` に格納される値です。

<<<<<<< HEAD
これらのコード例の意味は同じです: "関数を作成し、変数 `sayHi` にそれを格納します"

`alert` を使ってその値を出力することもできます:
=======
The meaning of these code samples is the same: "create a function and put it into the variable `sayHi`".

We can even print out that value using `alert`:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // 関数のコードが表示されます
*/!*
```

`sayHi` の後に括弧がないので、最後の行は関数は実行されないことに注意してください。関数名への言及がその実行となるプログラミング言語も存在しますが、JavaScriptはそうではありません。

JavaScriptでは、関数は値です。そのため、それを値として扱うことができます。上のコードはその文字列表現を表示します(それはソースコードです)。

<<<<<<< HEAD
`sayHi()` のように呼ぶことができる点で、もちろんそれは特別な値です。
=======
Surely, a function is a special value, in the sense that we can call it like `sayHi()`.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

しかし、それは値なので、他のタイプの値のように扱うことができます。

関数を別の変数にコピーすることができます:

```js run no-beautify
function sayHi() {   // (1) 作成
  alert( "Hello" );
}

let func = sayHi;    // (2) コピー

func(); // Hello     // (3) コピーの実行(動きます)!
sayHi(); // Hello    //     これもまだ動きます(なぜでしょう？)
```

上で起こっていることの詳細は次の通りです:

<<<<<<< HEAD
1. 関数宣言 `(1)` で関数を生成し、変数名 `sayHi` に格納します。
2. 行 `(2)` でそれを変数 `func` にコピーします。

    改めて注意してください:`sayHi` の後に括弧はありません。もし括弧があった場合、`sayHi` の *関数自身* ではなく、`func = sayHi()` は `sayHi()` の呼び出し結果を `func` に書き込みます。
3. これで、関数は `sayHi()` と `func()` どちらでも呼ぶことができます。
=======
1. The Function Declaration `(1)` creates the function and puts it into the variable named `sayHi`.
2. Line `(2)` copies it into the variable `func`. Please note again: there are no parentheses after `sayHi`. If there were, then `func = sayHi()` would write  *the result of the call* `sayHi()` into `func`, not *the function* `sayHi` itself.
3. Now the function can be called as both `sayHi()` and `func()`.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

また、1行目で `sayHi` を宣言するのに関数式を使うこともできます:

```js
let sayHi = function() {
  alert( "Hello" );
};

let func = sayHi;
// ...
```

<<<<<<< HEAD
すべて同じように動作します。何が起こっているのかより明白ですね。


````smart header="なぜ末尾にセミコロンがあるのでしょう？"
疑問があるかもしれません。なぜ関数式は末尾にセミコロン `;` を持つのか、そして関数宣言にはそれがないのか:
=======
Everything would work the same.


````smart header="Why is there a semicolon at the end?"
You might wonder, why does Function Expression have a semicolon `;` at the end, but Function Declaration does not:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

<<<<<<< HEAD
答えはシンプルです:
- コードブロックや `if { ... }`, `for {  }`, `function f { }` などの構文構造の末尾には `;` が必要ありません。
- 関数式は文の内側で使われます: `let sayHi = ...;` の値として利用します。これはコードブロックではありません。セミコロン `;` はどんな値であれ文の最後に推奨されています。従って、ここのセミコロンは関数式自体と関係はなく、単に文の終わりです。
=======
The answer is simple:
- There's no need for `;` at the end of code blocks and syntax structures that use them like `if { ... }`, `for {  }`, `function f { }` etc.
- A Function Expression is used inside the statement: `let sayHi = ...;`, as a value. It's not a code block, but rather an assignment. The semicolon `;` is recommended at the end of statements, no matter what the value is. So the semicolon here is not related to the Function Expression itself, it just terminates the statement.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
````

## コールバック関数 

値として関数を渡し、関数式を使う例をみてみましょう。

私たちは、3つのパラメータを持つ関数 `ask(question, yes, no)` を書きます:

`question`
: 質問内容

`yes`
: 答えが "はい" の場合に実行する関数

`no`
: 答えが "いいえ" の場合に実行する関数

関数は `question` を聞き、ユーザの回答に合わせて、`yes()` または `no()` を呼びます:

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// 使用法: 関数 showOk, showCancel は ask の引数として渡されます
ask("Do you agree?", showOk, showCancel);
```

<<<<<<< HEAD
これをもっと簡単に書く方法を探る前に、ブラウザ(と場合によってはサーバ側)では、このような関数は非常に一般的であること留意しましょう。実際の実装と上の例の主な違いは、実際の関数は単純な `confirm` よりも、より複雑な方法でユーザとやり取りをすることです。ブラウザでは、通常このような関数は見栄えのよい質問ウィンドウを描画します。が、それはまた別の話です。

**`ask`の引数は *コールバック関数* または単に *コールバック* と呼ばれます。**

この考え方は、私たちは関数を渡し、それが必要であれば後で "呼び戻す" ことを期待します。このケースでは、`showOK` は "はい" のためのコールバックになり、`showCancel` は "いいえ" の回答のためです。
=======
In practice, such functions are quite useful. The major difference between a real-life `ask` and the example above is that real-life functions use more complex ways to interact with the user than a simple `confirm`. In the browser, such function usually draws a nice-looking question window. But that's another story.

**The arguments `showOk` and `showCancel` of `ask` are called *callback functions* or just *callbacks*.**

The idea is that we pass a function and expect it to be "called back" later if necessary. In our case, `showOk` becomes the callback for "yes" answer, and `showCancel` for "no" answer.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

同じ関数をより短く書くために関数式を使うことができます:

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
*/!*
```

<<<<<<< HEAD
ここでは、関数は `ask(...)` 呼び出しの中で正しく宣言されています。これらは名前を持たないので *無名* と呼ばれます。
このような関数は、変数に割り当てられていないため `ask` の外側からアクセスできません。が、それはここで期待するものです。

このようなコードはスクリプトの中で自然に現れます。それは JavaScript の精神に基づいています。

```smart header="関数は \"アクション\" を表す値です"
文字列や数値のような通常の値は *データ* を現します。
=======
Here, functions are declared right inside the `ask(...)` call. They have no name, and so are called *anonymous*. Such functions are not accessible outside of `ask` (because they are not assigned to variables), but that's just what we want here.

Such code appears in our scripts very naturally, it's in the spirit of JavaScript.

```smart header="A function is a value representing an \"action\""
Regular values like strings or numbers represent the *data*.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

関数は *アクション* として認識されます。

変数間で渡し、必要な時に実行させることができます。
```


## 関数式 vs 関数宣言 

関数宣言と関数式の違いを明確に述べてみましょう。

<<<<<<< HEAD
まず、構文です:
=======
First, the syntax: how to differentiate between them in the code.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

- *関数宣言:* メインのコードフローで別の文として宣言された関数

    ```js
    // 関数宣言
    function sum(a, b) {
      return a + b;
    }
    ```
<<<<<<< HEAD
- *関数式:* 式の内部、または別の構文構造の中で作れらた関数

    ここで、関数は "代入式 =" の右側に作成されます。:
=======
- *Function Expression:* a function, created inside an expression or inside another syntax construct. Here, the function is created at the right side of the "assignment expression" `=`:

>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
    ```js
    // 関数式
    let sum = function(a, b) {
      return a + b;
    };
    ```

よりささいな違いは、関数がJavaScriptエンジンによって *作られたとき* です。

<<<<<<< HEAD
**関数式は、実行がそれに到達した時に作られ、それ以降で利用可能になります。**

一度実行フローが代入 `let sum = function…` の右辺へ渡ったら -- 関数は作られ、そこから使えるようになります(代入や呼び出しなど)。
=======
**A Function Expression is created when the execution reaches it and is usable only from that moment.**

Once the execution flow passes to the right side of the assignment `let sum = function…` -- here we go, the function is created and can be used (assigned, called, etc. ) from now on.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

関数宣言は異なります

<<<<<<< HEAD
**関数宣言はスクリプト/コードブロック全体で使用できます。**

つまり、JavaScriptがスクリプトまたはコードブロックの実行の準備をする時、最初にその中の関数定義を探し、関数を生成します。それは "初期化段階" と考えることができます。

そして、すべての関数宣言が処理されたあと、実行が続けられます。

結果的に、関数宣言として宣言された関数は、定義された関数よりも早く呼ぶことができます。
=======
**A Function Declaration can be called earlier than it is defined.**

For example, a global Function Declaration is visible in the whole script, no matter where it is.

That's due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an "initialization stage".

And after all Function Declarations are processed, the code is executed. So it has access to these functions.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

例えば、これは動作します:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

関数宣言 `sayHi` は、JavaScriptがスクリプトの開始の準備をしているときに生成され、その中でどこからでも見えます。

<<<<<<< HEAD
...もしもそれが関数式だった場合、動作しないでしょう:
=======
...If it were a Function Expression, then it wouldn't work:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js run refresh untrusted
*!*
sayHi("John"); // エラー!
*/!*

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

関数式は、実行がそれに到達した時に作られます。それは行 `(*)` で起こります。遅すぎます。

<<<<<<< HEAD
**関数宣言がコードブロックの中で作られるとき、そのブロックの内側であればどこからでも見えます。しかし、その外側からは見えません。**

必要とされるブロックの中だけでローカル変数を宣言することは、時には便利です。しかし、その機能も問題を引き起こす可能性があります。

例えば、ランタイムの中で得た `age` 変数に依存する関数 `welcome()` を宣言する必要があるとしましょう。そして、しばらくしてから使用する予定だとします。

下のコードはうまく動作しません:
=======
Another special feature of Function Declarations is their block scope.

**In strict mode, when a Function Declaration is within a code block, it's visible everywhere inside that block. But not outside of it.**

For instance, let's imagine that we need to declare a function `welcome()` depending on the `age` variable that we get during runtime. And then we plan to use it some time later.

If we use Function Declaration, it won't work as intended:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js run
let age = prompt("What is your age?", 18);

// 条件付きで関数を宣言する
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...後でそれを使う
*!*
welcome(); // エラー: welcome は未定義です
*/!*
```

なぜなら、関数宣言は、それが存在するコードブロックの内側でのみ見えるからです。

別の例です:

```js run
let age = 16; // 例として16

if (age < 18) {
*!*
  welcome();               // \   (実行)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Hello!");       //  |  関数宣言はそれが宣言されたブロックの中であれば
  }                        //  |  どこでも利用可能です
                           //  |
*!*
  welcome();               // /   (実行)
*/!*

} else {

<<<<<<< HEAD
  function welcome() {     //  age = 16 の場合, この "welcome" は決して作られません
=======
  function welcome() {    
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
    alert("Greetings!");
  }
}

<<<<<<< HEAD
// ここは、波括弧の外です
// なのでその中で作られた関数宣言は見ることができません
=======
// Here we're out of curly braces,
// so we can not see Function Declarations made inside of them.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

*!*
welcome(); // エラー: welcome は定義されていません
*/!*
```

`if` の外側で `welcome` を見えるようにするためにはどうしたらよいでしょうか？

正しいアプローチは、関数式を使い、`welcome` を `if` の外で宣言し、適切なスコープをもつ変数に代入することです。

<<<<<<< HEAD
これは、意図したとおりに動作します:
=======
This code works as intended:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // ok now
*/!*
```

もしくは、疑問符演算子 `?` を使うことでさらにシンプルにできます:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ok now
*/!*
```


<<<<<<< HEAD
```smart header="関数宣言と関数式のどちらを選択するのか？"
経験則として、関数を宣言する必要があるとき、最初に考えるのは関数宣言構文です。関数が宣言される前に呼ぶことができるため、コードを体系化する自由度が増します。

また、コードの中で、`let f = function(…) {…}` よりも `function f(…) {…}`  の方が調べるのが少し簡単です。関数宣言はより "目を引きます"。

...しかし、関数宣言が幾つかの理由で適していない場合(上でみた例)、関数式を使用するべきです。
=======
```smart header="When to choose Function Declaration versus Function Expression?"
As a rule of thumb, when we need to declare a function, the first to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.

That's also better for readability, as it's easier to look up `function f(…) {…}` in the code than `let f = function(…) {…}`. Function Declarations are more "eye-catching".

...But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we've just seen an example), then Function Expression should be used.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
```


## アロー関数 

関数を作成するための、より非常にシンプルで簡潔な構文がもう1つあります。それはしばしば関数式よりも優れています。これは "アロー関数" と呼ばれ、次のようになります:

```js
let func = (arg1, arg2, ...argN) => expression
```

...これは引数 `arg1..argN` をもち、右側でそれらを使用する `expression` を評価し、その結果を返す関数 `func` を作ります。

言い換えると、次のコードと概ね一緒です:

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

...が、はるかに簡潔です

例を見てみましょう:

```js run
let sum = (a, b) => a + b;

/* アロー関数は次の形式のより短い形です:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3

```

<<<<<<< HEAD
もしも引数が1つだけの場合、括弧は省略可能なので、さらに短くできます:
=======
If we have only one argument, then parentheses around parameters can be omitted, making that even shorter:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js run
// 次と同じです
// let double = function(n) { return n * 2 }
*!*
let double = n => n * 2;
*/!*

alert( double(3) ); // 6
```

もしも引数がない場合、括弧は必須で、空白にします:

```js run
let sayHi = () => alert("Hello!");

sayHi();
```

アロー関数は、関数式として同じ方法で使用できます。

例えば、ここでは `welcome()` の例を再び書きます:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now
```

アロー関数は、最初は馴染みが無く、読みにくいように見えるかもしれませんが、構造に慣れるとすぐに変わります。

多くの文字を書くのが面倒なとき、シンプルなワンライナーの処理を書くときにはとても便利です。

```smart header="複数行のアロー関数"

上の例は、`=>` の左から引数を取得し、右側の式を評価しました。

<<<<<<< HEAD
複数の式や文のように、もう少し複雑なものが必要な時があります。それも可能ですが、この場合は括弧で囲む必要があります。そして、その中で通常の `return` を使います。
=======
Sometimes we need something a little bit more complex, like multiple expressions or statements. It is also possible, but we should enclose them in curly braces. Then use a normal `return` within them.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

このようになります:

```js run
<<<<<<< HEAD
let sum = (a, b) => {  // 波括弧を使って複数行の関数を書けます
  let result = a + b;
*!*
  return result; // 波括弧を使った場合、結果を得るには return を使います
=======
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, use return to get results
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="他にもあります"
ここでは、簡潔にするためにアロー関数を賞賛しました。しかし、それだけではありません!!アロー関数は他にも興味深い機能を持っています。後ほどチャプター<info:arrow-functions> で触れます。

<<<<<<< HEAD
今の時点で、我々はすでにワンライナーの処理やコールバック処理のためにアロー関数を使うことができます。
=======
For now, we can already use arrow functions for one-line actions and callbacks.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
```

## サマリ 

<<<<<<< HEAD
- 関数は値です。それらはコード上のどの場所でも、割り当て、コピー、宣言をすることができます。
- 関数がメインのコードフローの中で別の文として宣言されていたら、それは "関数宣言" と呼ばれます。
- 関数が式の一部として作られたら、それは "関数式" と呼ばれます。
- 関数宣言は、コードブロックが実行される前に処理されます。ブロックの中ではどこからでも見えます。
- 関数式は、実行フローがそれに到達した時に作られます。

たいていのケースでは、関数の宣言が必要な場合、関数宣言が望ましいです。なぜなら、それ自身の宣言の前でも利用することができるからです。これにより、コード構成の柔軟性が増し、通常は読みやすくなります。
=======
In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

従って、関数宣言がそのタスクに適さない場合にのみ関数式を使うべきです。このチャプターで幾つかの例を見て来ました、そして今後もっと見ていくでしょう。

アロー関数はワンライナーに対し便利です。2つの種類があります:

<<<<<<< HEAD
1. 括弧無し: `(...args) => expression` -- 右側は式です: 関数はそれを評価しその結果を返します。
2. 括弧あり: `(...args) => { body }` -- 括弧があると、関数内で複数の文を書くことができます、しかし何かを返却する場合には、明確に `return` が必要です。
=======
1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
