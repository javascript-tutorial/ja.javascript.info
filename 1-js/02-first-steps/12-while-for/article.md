# ループ: while と for

私たちはしばしば連続して何度も似たような処理を実行する必要があります。

例えば、1つずつリストから商品を出力する必要がある場合、もしくは、単に1から10の数値それぞれに同じコードを実行する場合。

*ループ* は複数回コードの同じ部分を繰り返す方法です。

[cut]

## "while" ループ

`while` ループは次の構文を持っています:

```js
while (condition) {
  // code
  // so-called "loop body"
}
```

`condition` が `true` の間、ループの本体の `code` が実行されます。

例えば、下のループは、 `i < 3` の間、 `i` を出力します:

```js run
let i = 0;
while (i < 3) { // shows 0, then 1, then 2
  alert( i );
  i++;
}
```

ループ本体の1つの実行は *イテレーション* と呼ばれます。上の例のループは3つのイテレーションをします。

もしも、上の例に `i++` がない場合、ループは (理論上は) 永遠に繰り返されます。実際には、ブラウザこのようなループを止める方法を提供しており、サーバサイドJavaScriptではそのプロセスを殺すことができます。

任意の式または変数は、単に比較ではなくループ条件になります。それらは評価され `while` によって真偽値に変換されます。

たとえば、`while (i != 0)` をより短く書く方法として`while (i)`があります:

```js run
let i = 3;
*!*
while (i) { // when i becomes 0, the condition becomes falsy, and the loop stops
*/!*
  alert( i );
  i--;
}
```

````smart header="Brackets are not required for a single-line body"
もしもループの本体が1つのステートメントを持っている場合、括弧`{…}`を省略することができます:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## "do..while" ループ

条件チェックは `do..while` 構文を使うことでループ本体の *下に* 移動することができます。:

```js
do {
  // loop body
} while (condition);
```

ループは最初本体を実行します、次に条件をチェックし、真となる間実行を繰り返します。

例:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

この構文の形式は、あなたが 条件が真になるかどうかに関わらず、**少なくとも1度** 実行するループ本体が欲しい場合を除き、ほとんど使われません。通常、他の形式が好まれます: `while(…) {…}`

## "for" ループ

`for` ループは最も使われるものの1つです。

このようになります:

```js
for (begin; condition; step) {
  // ... loop body ...
}
```

例でこれらのパーツの意味を学びましょう。下のループは `0` から `3` まで(`3` は含みません)、`i` に対して `alert(i)` を実行します。:

```js run
for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
  alert(i);
}
```

`for` ステートメントを部分的に調べてみましょう:

| パート  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| begin | `i = 0`    | ループに入ると1度実行されます。     |
| condition | `i < 3`| すべてのループのイテレーションの前にチェックされます、もしも false の場合ループを停止します。       |
| step| `i++`      | 各イテレーションで、条件チェックの前に本体の後に実行されます。 |
| body | `alert(i)`| 条件が真の間繰り返し実行されます。         |

一般的なループアルゴリズムは次のように動作します:
```
Run begin
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ ...
```

もしもあなたが初めてループを使う場合、この例に戻って、紙の上でステップ毎にどのように動作するかを再現することが恐らく役立つでしょう。

これが私たちのケースで正確に起こっていることです:

```js
// for (let i = 0; i < 3; i++) alert(i)

// run begin
let i = 0
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// ...finish, because now i == 3
```

````smart header="Inline variable declaration"
ここで "カウンタ" 変数 `i` はループの中で正しく宣言されます。それは "インライン" 変数宣言と呼ばれます。
このような変数はループの中でだけ見えます。

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // error, no such variable
```

変数を宣言する代わりに、存在するもの使うことも出来ます:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // use an existing variable
  alert(i); // 0, 1, 2
}

alert(i); // 3, visible, because declared outside of the loop
```

````


### 部分のスキップ

`for` の任意のパーツをスキップすることができます。
例えば、ループの最初で何もする必要がなければ、`begin` を省略することができます。

このように:

```js run
let i = 0; // we have i already declared and assigned

for (; i < 3; i++) { // no need for "begin"
  alert( i ); // 0, 1, 2
}
```

同じように `step` パートも除去することができます。:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

ループは `while (i < 3)` と同じになりました。

実際にはすべてを除くこともできます、それは無限ループになります:

```js
for (;;) {
  // repeats without limits
}
```

2つの `for` のセミコロン `;` は必須ですであることに注意してください、ない場合は構文エラーになります。

## ループの終わり

通常、ループは条件が偽になると終了します。

しかし、私たちはいつでも出口を強制することができます。そのための特別な `break` ディレクティブがあります。

例えば、下のループはユーザに一連の数字を入力するよう求めますが、文字以外が入力されたとき "中断" します。:

```js
let sum = 0;

while (true) {

  let value = +prompt("Enter a number", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sum: ' + sum );
```

もしもユーザが空を入力、もしくは入力をキャンセルした場合、`break` ディレクティブは行 `(*)` で有効になります。
それはループをすぐに停止し、ループ後の最初の行へ制御を渡します。つまり、`alert` です。

"必要に応じた無限ループ + `break`" の組み合わせは、ループの最初/最後ではなく中央もしくは本体のいくつかの場所で条件をチェックする必要がある状況で最適です。

## 次のイテレーションに進む[#continue]

`continue` ディレクティブは `break` の "軽量版" です。ループ全体はストップしません。その代わりに、現在のイテレーションを停止し、新しいイテレーションのスタートを強制します(もしも条件が真であれば)。

私たちは、現在のイテレーションが完了し次へ移動したいときにそれを使うことが出来ます。

下のループは奇数値だけを出力するために `continue` をつかっています:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // if true, skip the remaining part of the body
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, then 3, 5, 7, 9
}
```

`i` の値が偶数の場合、`continue` ディレクティブは本体の実行を停止し、`for` の次のイテレーションへ制御を渡しします(次の番号で)。
したがって、`alert` は奇数値の対してのみ実行されます。

````smart header="The directive `continue` helps to decrease nesting level"
奇数値を表示するループはこのように書くこともできます:

```js
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

技術的な観点からは、これは上の例と同じです。確かに、`continue` の代わりに `if` ブロックにコードをラップするだけです。

しかし、副作用として1つ多くの括弧のネスティングレベルを得ます。もしも `if` のコードの中が数行より長い場合は、全体の可読性が下がる可能性があります。
````

````warn header="No `break/continue` to the right side of '?'"
式ではない構文構造は `'?'` の中では使うことはできないことに注意してください。特に、ディレクティブ `break/continue` はそこでは許可されません。

例えば、このコードを使うとします:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...そして、疑問符を使って書き直します:

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue not allowed here
```

...それは動作を停止します。このようなコードは構文エラーになります:


これは `if` の代わりに疑問符演算子 `'?'` を使用しない別の理由です。
````

## break/continue のためのラベル

時々、複数のネストしたループから一度で抜け出す必要があります。

例えば、下のコードでは 座標 `(i, j)` を `(0,0)` から `(3,3)` へプロンプトするよう `i` と `j` をループします:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // what if I want to exit from here to Done (below)?

  }
}

alert('Done!');
```

ユーザが入力をキャンセルする場合、処理をストップする方法が必要です。

`input` の後の通常の `break` は内部ループのみの終了です。それだけでは十分ではありません。
ラベルが助けにきます。

*ラベル* はループの前のコロンがついた識別子です:
```js
labelName: for (...) {
  ...
}
```

ループの中の `break <labelName>` ステートメントはラベルまで終了にします。

このように:

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) *!*break outer*/!*; // (*)

    // do something with the value...
  }
}
alert('Done!');
```

上のコードで、`break outer` は `outer` と名付けされたラベルを上に探し、そのループを抜けます。

そのため、制御は `(*)` から `alert('Done!')` にまっすぐに進みます。

ラベルを別の行に移動させることもできます:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

`continue` ディレクティブもまたラベルと一緒に使うことが出来ます。このケースでは、実行はラベル付けされたループの次のイテレーションにジャンプします。

````warn header="Labels are not a \"goto\""
ラベルはコードの任意の場所にジャンプすることはできません。

例えば、このようにすることは出来ません:
```js
break label;  // jumps to label? No.

label: for (...)
```

`break/continue` への呼び出しはループの中からだけ可能です、またラベルはそのディレクティブから上のどこかにある必要があります。
````

## サマリ

3つのループのタイプについてカバーしました:

- `while` -- 条件は各イテレーションの前にチェックされます。
- `do..while` -- 条件は各イテレーションの後にチェックされます。
- `for (;;)` -- 条件は各イテレーションの前にチェックされ、追加の設定が利用可能です。

"無限" ループを作るために、通常は `while(true)` 構造が使われます。このようなループは他の他のループと同様に `break` ディレクティブで停止することが出来ます。

もしも現在のイテレーションで何もしたくなく、次のイテレーションに進みたい場合は、`continue` ディレクティブがそれをします。

`break/continue` はループの前のラベルをサポートします。ラベルはネストを抜け、外のループに行くための `break/continue` のための方法です。
