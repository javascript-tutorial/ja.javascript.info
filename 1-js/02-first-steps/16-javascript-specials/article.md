# JavaScript 特別授業

このチャプターでは、微妙なケースに特に注意を払いながら、私たちが今まで学んだJavaScriptの機能を簡単に再確認します。

<<<<<<< HEAD
[cut]

## コード構造 
=======
## Code structure
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

文はセミコロンで区切られます:

```js run no-beautify
alert('Hello'); alert('World');
```

通常、行の終わりは区切りとして扱われますので、これは動作します:

```js run no-beautify
alert('Hello')
alert('World')
```

これは "自動セミコロン挿入" と呼ばれます。ときどき、これは動作しません。例えば:

```js run
alert("There will be an error after this message")

[1, 2].forEach(alert)
```

ほとんどのコードスタイルのガイドは、各文の後にセミコロンを置くことに賛同しています。

セミコロンはコードブロック `{...}` や、ループのような構文構造の後では必要ありません:

```js
function f() {
  // 関数宣言のあとにセミコロンは不要です
}

for(;;) {
  // ループの後にセミコロンは不要です
}
```

...しかし、"余分な" セミコロンを任意の場所に置いたとしても、それはエラーではありません。それは無視されます。

より詳細はこちら: <info:structure>.

## Strict モード 

現在のJavaScriptのすべての機能を完全に有効にするには、`"use strict"` でスクリプトを始める必要があります。

```js
'use strict';

...
```

そのディレクティブはスクリプトの先頭、もしくは関数の最初である必要があります。

`"use strict"` がなくても動作しますが、幾つかの機能が古いスタイル, "互換の方法" で振る舞います。私たちは一般的に現代の振る舞いを好みます。

より詳細はこちら: <info:strict-mode>.

## 変数 

これらを使って定義できます:

- `let`
- `const` (定数, 変更できない)
- `var` (古いスタイル, あとで見ます)

変数の名前は次を含むことができます:
- 文字と数字、しかし1文字目に数字は指定できません。
- 文字 `$` と `_` は普通の文字です。
- 非ラテンのアルファベットや象形文字も使えますが、一般的には使用されません。

変数は動的に型付けされます。 それらは任意の値を格納することができます:

```js
let x = 5;
x = "John";
```

7つのデータ型があります:

<<<<<<< HEAD
- `number` 浮動少数点と整数値両方
- `string` 文字列
- `boolean` 論理値: `true/false`
- `null` -- 単一の値 `null` を持つ型。"空白", "存在しない" を意味する
- `undefined` -- 単一の値 `undefined` を持つ型。"未割り当て" を意味する
- `object` と `symbol` -- 複雑なデータ構造やユニークな識別子です。私たちはまだそれらは学んでいません。
=======
- `number` for both floating-point and integer numbers,
- `string` for strings,
- `boolean` for logical values: `true/false`,
- `null` -- a type with a single value `null`, meaning "empty" or "does not exist",
- `undefined` -- a type with a single value `undefined`, meaning "not assigned",
- `object` and `symbol` -- for complex data structures and unique identifiers, we haven't learnt them yet.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

`typeof` 演算子は値の型を返します。2つ例外があります:
```js
typeof null == "object" // 言語の間違い
typeof function(){} == "function" // 関数は特別に扱われます
```

より詳細はこちらです: <info:variables> and <info:types>.

## インタラクション 

私たちは動作環境としてブラウザを使っているので、基本のUI関数は次の通りです:

<<<<<<< HEAD
[`prompt(question[, default])`](mdn:api/Window/prompt)
: `question` を訪ね、訪問者の入力もしくは、"cancel" が選択されたときは `null` を返します。
=======
[`prompt(question, [default])`](mdn:api/Window/prompt)
: Ask a `question`, and return either what the visitor entered or `null` if they clicked "cancel".
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

[`confirm(question)`](mdn:api/Window/confirm)
: `question` を訪ね、OKかキャンセルを選択させます。選択は `true/false` として返却されます。

[`alert(message)`](mdn:api/Window/alert)
: `message` を出力します。

<<<<<<< HEAD
それらの関数はすべて *モーダル* であり、コードの実行を止め、訪問者が回答するまでそのページとのやり取りを防ぎます。
=======
All these functions are *modal*, they pause the code execution and prevent the visitor from interacting with the page until they answer.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

例えば:

```js run
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName ); // Alice
alert( "Tea wanted: " + isTeaWanted ); // true
```

より詳細はこちらです: <info:alert-prompt-confirm>.

## 演算子 

JavaScriptは次のような演算子をサポートします:

算術
: 常連: `* + - /`, また剰余として `%`、数字の累乗として `**`。

<<<<<<< HEAD
    二項演算子プラス `+` は文字列を連結します。また、オペランドのいずれかが文字列であれば、もう一方も文字列に変換されます:
=======
    The binary plus `+` concatenates strings. And if any of the operands is a string, the other one is converted to string too:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

代入
: シンプルな代入があります: `a = b` と `a *= 2` のような組み合わせです。

ビット単位
: ビット演算子ビットレベルで整数を扱います。必要なときに、[docs](mdn:/JavaScript/Reference/Operators/Bitwise_Operators)を見てください。

<<<<<<< HEAD
3項
: 3つのパラメータを持つ唯一の演算子です: `cond ? resultA : result B`. `cond` が真の場合、`resultA` を返し、そうでなければ `resultB` を返します。

論理演算子
: 論理積 `&&` と 論理和 `||` は短絡評価を行い、それが停止したところの値を返します。
=======
Ternary
: The only operator with three parameters: `cond ? resultA : resultB`. If `cond` is truthy, returns `resultA`, otherwise `resultB`.

Logical operators
: Logical AND `&&` and OR `||` perform short-circuit evaluation and then return the value where it stopped. Logical NOT `!` converts the operand to boolean type and returns the inverse value.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

比較
: 異なる型の値のための等価チェック `==` は、それらを数値に変換します(`null` と `undefined`を除きます。それらは、お互いに等しく、他とは等しくなりません)、従って、これらは等価です。:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    他の比較も同様に数値に変換します。

<<<<<<< HEAD
    厳密等価演算子 `===` は変換を行いません: 異なる型は常に異なる値を意味します。:
=======
    The strict equality operator `===` doesn't do the conversion: different types always mean different values for it.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

    値 `null` と `undefined` は特別です: それらはお互いに等価 `==` であり、それ以外と等しくありません。

    より大きい/少ない演算子は文字列を1文字ずつ比較し、他の型は数値に変換します。

<<<<<<< HEAD
論理演算子
: カンマ演算子のように、他のものはほとんど使われません。
=======
Other operators
: There are few others, like a comma operator.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

より詳細はこちらです: <info:operators>, <info:comparison>, <info:logical-operators>.

## ループ 

- 私たちは3つのタイプのループを説明しました:

    ```js
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- `for(let...)` ループの中で宣言された変数はループの内側でのみ見えます。しかし、`let` を省略することができ、既存の変数を再利用することも出来ます。
- ディレクティブ `break/continue` はループ全体/現在のイテレーションを終了させることができます。ネストされたループを停止する場合にはラベルを使ってください。

詳細はこちらです: <info:while-for>.

今後、オブジェクトを扱うためのより多くの種類のループを学びます。

## "switch" 構造 

<<<<<<< HEAD
"switch" 構造は複数の `if` チェックに置換できます。それは比較に `===` を使います。
=======
The "switch" construct can replace multiple `if` checks. It uses `===` (strict equality) for comparisons.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

例えば:

```js run
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // プロンプトの結果は文字列であり、数値ではありません

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

詳細はこちらです: <info:switch>.

## 関数 

私たちは、JavaScriptで関数を作る3つの方法をカバーしました。:

1. 関数宣言: メインコードフローの中の関数

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. 関数式: 式のコンテキストにある関数

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    }
    ```

<<<<<<< HEAD
    `sum = function name(a, b)` のように、関数式は名前を持つことができます、しかしその `name` は関数の内側でのみ見えます。
=======
    Function expressions can have a name, like `sum = function name(a, b)`, but that `name` is only visible inside that function.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

3. アロー関数:

    ```js
    // 右側の式です
    let sum = (a, b) => a + b;

    // もしくは { ... } を使った複数行の構文で、return が必要です:
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // 引数なし
    let sayHi = () => alert("Hello");

    // 1つの引数
    let double = n => n * 2;
    ```


- 関数はローカル変数を持ちます: それらはその関数本体の中で宣言されます。このような変数は関数の中でだけ見えます。
- パラメータはデフォルト値を持つことが出来ます。: `function sum(a = 1, b = 2) {...}`.
- 関数は常に何かを返します。もしも `return` 文がない場合は　`undefined` を返します。


| 関数宣言 | 関数式 |
|----------------------|---------------------|
| 全体のコードブロックで見える| 実行がそこに到達したときに作られる |
|   - | 名前を持つことができますが、関数の内側でのみ見えます。 |

詳細はこちら: <info:function-basics>, <info:function-expressions-arrows>.

## これからが本番です 

ここまではJavaScriptの機能の簡単な一覧でした。今のところ、私たちは基本だけを学びました。このチュートリアルではさらに、JavaScriptのより特別で高度な機能について説明していきます。
