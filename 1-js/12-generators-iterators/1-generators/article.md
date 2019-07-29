
# ジェネレータ

通常の関数は、単一の値だけを返します(もしくはなにも返しません)。

ジェネレータは、要求に応じて次々に複数の値、場合によっては無限の数の値を返す("生み出す")ことができます。それらは [反復可能(iterables)](info:iterable) と上手く機能し、データストリームを簡単に作成することができます。

## ジェネレータ関数

ジェネレータを作成するには、特別な構文構造: `function*`、いわゆる "ジェネレータ関数" を使用する必要があります。

このようになります:

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```

`generateSequence()` が呼ばれたとき、コードは実行されません。代わりに、"ジェネレータ" と呼ばれる特別なオブジェクトを返します。

```js
// "ジェネレータ関数" は "ジェネレータオブジェクト" を生成します。
let generator = generateSequence();
```

`generator` オブジェクトは "凍結された関数呼び出し" と捉えることができます。:

![](generateSequence-1.svg)

作成時に、コードの実行は最初の部分で一時停止されます。

ジェネレータのメインのメソッドは `next()` です。呼ばれると、最も近い `yield <value>` 文まで実行を再開します。その後、実行は一時停止し、値は外部のコードに返却されます。

例えば、ここではジェネレータを作成し、最初に戻される値を取得しています:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

*!*
let one = generator.next();
*/!*

alert(JSON.stringify(one)); // {value: 1, done: false}
```

`next()` の結果は常にオブジェクトです:
- `value`: 戻された値
- `done`: コードがまだ終わっていない場合は `false`, そうでなければ `true`.

現時点では、最初の値だけ取得しました:

![](generateSequence-2.svg)

再び `generator.next()` を呼びましょう。実行が再開し、次の `yield` を貸します。:

```js
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}
```

![](generateSequence-3.svg)

そして、3回目を呼び出すと、実行は関数を終了する `return` 文に到達します。

```js
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, *!*done: true*/!*}
```

![](generateSequence-4.svg)

これでジェネレータが済みました。`done:true` でそれが判断でき、`value:3` を最終結果として処理します。

新たな `generator.next()` 呼び出しはこれ以上意味をなしません。それを行っても、同じオブジェクト `{done: true}` が返却されます。

ジェネレータを "ロールバック" する方法はありません。しかし、`generateSequence()` 呼び出しによって、別の物を作ることはできます。

これまでのところ、理解すべき最も重要なことは、ジェネレータ関数は通常の関数とは異なり、コードを実行しないことです。それらは "ジェネレータ工場(ファクトリー)" として機能します。 `function*` の実行はジェネレータを返し、その後、ジェネレータに値を要求します。

```smart header="`function* f(…)` それとも `function *f(…)`?"
これは軽い宗教的な質問で、両方の構文は正しいです。

しかし、アスタリスク `*`はジェネレータ関数であることを表し、名前ではなく種類を表すので、通常は最初の構文がより好まれます。したがって、`function` キーワードに付けてください。
```

## ジェネレータは反復可能です

おそらく `next()` メソッドを見て既に推測していると思いますが、ジェネレータは [反復可能(iterable)](info:iterable)です。

`for..of` によって、値をループすることができます:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, 次に 2
}
```

これは `.next().value` を呼び出すよりも、ジェネレータを操作するのにはるかに見栄えの良い方法ですね。

...しかし、注意してください: 上の例では `1` が表示された後 `2` が表示され、それですべてです。`3` は表示されません!

これは、`done: true` のとき、for-of イテレーションは最後の `value` を無視するからです。なので、すべての結果を `for..of` で表示したい場合は、それらを `yield` で返さなければなりません:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
*!*
  yield 3;
*/!*
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, 次に 2, 次に 3
}
```

当然、ジェネレータは反復可能なので、スプレッド演算子`...` のような、関連するすべての機能を呼び出すことができます。:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
```

上のコードでは、`...generateSequence()` は iterable をアイテムの配列に変換します(スプレッド演算子についてはチャプター [](info:rest-parameters-spread-operator#spread-operator)) を読んでください)。

## 反復可能(iterable)の代わりにジェネレータを使用する

少し前、チャプター [](info:iterable) で、値 `from..to` を返す反復可能な `range` オブジェクトを作りました。

ここで、そのコードを思い出しましょう。:

```js run
let range = {
  from: 1,
  to: 5,

  // for..of は最初にこのメソッドを一度呼び出します
  [Symbol.iterator]() {
    // ...これは iterator オブジェクトを返します:
    // 以降, for..of はそのオブジェクトでのみ機能し、次の値を要求します。
    return {
      current: this.from,
      last: this.to,

      // next() は for..of ループの各イテレーションで呼ばれます
      next() {
        // 値をオブジェクトとして返す必要があります {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

alert([...range]); // 1,2,3,4,5
```

ジェネレータを使用して反復可能(iterable)のシーケンスを作るほうが、遥かにエレガントです:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

let sequence = [...generateSequence(1,5)];

alert(sequence); // 1, 2, 3, 4, 5
```

...ですが、仮にカスタムの `range` オブジェクトを保持したいとしたらどうなるでしょうか？

## Symbol.iterator からジェネレータへの変換

ジェネレータを `Symbol.iterator` として提供することで、両方の世界からベストを得ることができます:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // [Symbol.iterator]: function*() の短縮記法
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

alert( [...range] ); // 1,2,3,4,5
```

`range` オブジェクトはいま反復可能です。

これは非常に上手く機能します。なぜなら、`range[Symbol.iterator]` が呼ばれたとき、:
- オブジェクトを返します(いまはジェネレータです)。
- そのオブジェクトは `.next()` メソッドを持っています(そう、ジェネレータはそれを持っています)。
- これは、`{value: ..., done: true/false}` の形式で値を返します。

もちろん、これは偶然ではありません。ジェネレータは iterable をより簡単にすることを目的としているので、そのようにすることができます。

ジェネレータを使用した最後のパターンは、元の iterable なコードよりも遥かに簡潔で、かつ同じ機能を提供します。

```smart header="ジェネレータは永遠に続く可能性があります"
上の例では、有限の数字列を生成しましたが、永遠に値を生成するジェネレータを作ることも可能です。例えば、終わりのない疑似乱数の列です。

それは必ず `for..of` の中で `break` を必要とします。そうでなければ、ループは永遠に繰り返され、ハングします。
```

## ジェネレータの合成

ジェネレータの合成は、ジェネレータ同士を透過的に "埋め込む" ことを可能にするジェネレータの特別な機能です。
例えば、次のシーケンスを生成したいとします。

- 数字 `0..9` (文字コード 48..57)
- 大文字の `A..Z` が続く(文字コード 65..90)
- アルファベット文字 `a..z` が続く(文字コード 97..122)

次に、そこから選択した文字でパスワードを作成することを考えます(同様にして構文文字を追加することも可能です)が、最初にシーケンスを生成する必要があります。

すでに `function* generateSequence(start, end)` があるので、3つのシーケンスを順に作りだすのに、これを再利用しましょう。

通常の関数では、複数の別々の関数からの結果をまとめるためには、それらを呼び出し、結果を格納し、最後に結合します。

ジェネレータの場合は、次のようによりスマートに行うことができます:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

*!*
  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);
*/!*

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

この例にある特別な `yield*` ディレクティブは合成を担当します。これは、別のジェネレータに実行を *委譲(デリゲート)* します。あるいは、単純に言うと、ジェネレータを実行し、あたかもそれらが呼び出し元のジェネレータ自体によって行われたかのように、それらの yield を外部に透過的に転送します。

結果は、入れ子のジェネレータのコードがインライン展開された場合と同じです。:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

*!*
  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;
*/!*

}

let str = '';

for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

ジェネレータの合成は、あるジェネレータのフローを別のジェネレータに挿入するための、自然な方法です。

入れ子のジェネレータからの値のフローが無限の場合でも動作します。それはシンプルで中間結果を格納するための余分なメモリを必要としません。

## "yield" は双方向

ここまで、ジェネレータは "強化されたイテレータ" のようでした。これはよく利用される方法です。

しかし、実際にはジェネレータはより強力で柔軟です。

なぜなら、`yield` は双方向だからです: 結果を外部に返すだけでなく、ジェネレータ内部に値を渡す事もできます。

そうするためには、引数を持つ `generator.next(arg)` を呼び出す必要があります。この引数は `yield` の結果になります。

例を見てみましょう:

```js run
function* gen() {
*!*
  // 質問を外側のコードに渡して答えを待ちます
  let result = yield "2 + 2?"; // (*)
*/!*

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield は値を返します

generator.next(4); // --> 結果をジェネレータに渡します
```

![](genYield2.svg)

1. 最初の呼び出し `generator.next()` は常に引数なしです。実行を開始し、最初の `yield` ("2+2?") の結果を返します。この時点で、ジェネレータは実行を一時停止します(依然としてその行にいます)。
2. 次に、上の図にあるように、`yield` の結果は呼び出しコードの `question` 変数に入ります。
3. `generator.next(4)` でジェネレータが再開し、結果として `4` が入ります: `let result = 4`

外部のコードはすぐに `next(4)` を呼び出す必要はないことに注目してください。計算に時間がかかる場合があります。これも有効なコードです。:

```js
// ある時間経過後にジェネレータを再開する
setTimeout(() => generator.next(4), 1000);
```

構文は少し変に見えるかもしれません。関数と呼び出しコードがお互いに値を渡し合うことはめったにありません。しかし、それがまさに起こっていることです。

より明白にするために、これは別の例です:

```js run
function* gen() {
  let ask1 = yield "2 + 2?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3?"

  alert(ask2); // 9
}

let generator = gen();

alert( generator.next().value ); // "2 + 2?"

alert( generator.next(4).value ); // "3 * 3?"

alert( generator.next(9).done ); // true
```

実行の図です:

![](genYield2-2.svg)

1. まず、`.next()` は実行を開始します。そして最初の `yield` に到達します。
2. 結果は外部のコードに返却されます。
3. 2つ目の `.next(4)` は、`4` を最初の `yield` の結果としてジェネレータに戻し、実行を再開します。
4. ...2つ目の `yield` に到達します。これはジェネレータ呼び出しの結果になります。
5. 3つ目の `.next(9)` 2つ目の `yield` の結果として `9` をジェネレータに渡し実行を再開します。そして関数の終わりに到達するので、`done: true` です。

これは "ピンポン" ゲームのようです。各 `next(value)` (最初のものを除く) はジェネレータに値を渡し、それは現在の `yield` の結果になり、次の `yield` の結果を戻します。

## generator.throw

上の例で見たように、外部のコードは `yield` の結果として値をジェネレータに渡す可能性があります。

...しかし、そこでエラーを起こす(スローする)こともできます。エラーも結果の1つなので、これは自然なことです。

エラーを `yield` に渡すには、`generator.throw(err)` を呼び出す必要があります。この場合、`err` は `yield` のある行に投げられます。

例えば、ここで `"2 + 2?"` の yield はエラーになります:

```js run
function* gen() {
  try {
    let result = yield "2 + 2?"; // (1)

    alert("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    alert(e); // エラーを表示します
  }
}

let generator = gen();

let question = generator.next().value;

*!*
generator.throw(new Error("The answer is not found in my database")); // (2)
*/!*
```

エラーは、行 `(2)` でジェネレータにスローされ、`yield` のある行 `(1)` で例外となります。上の例では、`try..catch` がそれをキャッチし表示しています。

キャッチしない場合、他の例外のように、ジェネレータは呼び出しコードで "落ちます"。

呼び出しコードの現在の行は、`(2)` とラベル付けされた `generator.throw` を持つ行です。なので、次のようにここでキャッチすることができます:

```js run
function* generate() {
  let result = yield "2 + 2?"; // この行でエラー
}

let generator = generate();

let question = generator.next().value;

*!*
try {
  generator.throw(new Error("The answer is not found in my database"));
} catch(e) {
  alert(e); // エラーを表示します
}
*/!*
```

ここでエラーをキャッチしなければ、通常どおり、外部の呼び出しコード(あれば)へ渡され、キャッチされなければスクリプトが強制終了します。

## サマリ

- ジェネレータはジェネレータ関数 `function*(…) {…}` により生成されます。
- ジェネレータ内部にのみ `yield` 演算子が存在します。
- 外部のコードとジェネレータは `next/yield` 呼び出しを通して結果をやり取りすることができます。

モダンな JavaScript では、ジェネレータはめったに使用されません。しかし、実行中に呼び出しコードとデータをやり取りする関数の機能は非常にユニークであるため、便利なときがあります。

また、次のチャプターでは、非同期のジェネレータについて学びます。それは `for` ループで非同期的に生成されたデータをのストリームを読むのに使われます。

web プログラミングでは、しばしばストリーミングデータを扱います。e.g. ページングされた結果を取得する必要があるため、これはとても重要なユースケースです。
