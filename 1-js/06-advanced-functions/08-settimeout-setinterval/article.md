# スケジューリング: setTimeout と setInterval

関数をすぐには実行させず、ある時点で実行するようにしたいことがあります。それは "呼び出しのスケジューリング" と呼ばれます。

そのための2つのメソッドがあります。:

- `setTimeout` は指定時間経過後、一度だけ関数を実行します。
- `setInterval` は各実行の間は指定した間隔で、定期的に関数を実行します。

それらのメソッドは JavaScript の仕様の一部ではありません。しかしほとんどの環境は内部スケジューラをもち、それらのメソッドを提供します。特に、これらはすべてのブラウザと Node.js でサポートされています。

## setTimeout

構文:

```js
let timerId = setTimeout(func|code, delay[, arg1, arg2...])
```

パラメータ:

`func|code`
: 関数もしくは実行するコードの文字列。
通常は関数です。歴史的な理由で、コードの文字列も渡すことができますが、推奨されません。

`delay`
: 実行前の遅延時間で、ミリ秒単位です (1000 ms = 1 秒).

`arg1`, `arg2`...
: 関数の引数です(IE9-ではサポートされていません)

例えば、このコードは1秒後に `sayHi()` を呼びます:

```js run
function sayHi() {
  alert('Hello');
}

*!*
setTimeout(sayHi, 1000);
*/!*
```

引数がある場合はこちら:

```js run
function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}

*!*
setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John
*/!*
```

もし最初の引数が文字列の場合、JavaScript はそれから関数を作ります。

従って、これも動作します:

```js run no-beautify
setTimeout("alert('Hello')", 1000);
```

しかし、文字列を使うことは推奨されていません。次のように、それらの代わりに関数を使ってください。:

```js run no-beautify
setTimeout(() => alert('Hello'), 1000);
```

````smart header="関数を渡しますが、実行はしないでください"
初心者の開発者は、関数の後に括弧 `()` をつけるミスをすることがあります:

```js
// wrong!
setTimeout(sayHi(), 1000);
```
`setTimeout` は関数への参照を期待しているため、これは動作しません。ちなみに、ここでは `sayHi()` 関数を実行し、*その実行結果* が `setTimeout` に渡されます。我々のケースでは、`sayHi()` の結果は `undefined`(関数は何も返さないため)であり、何もスケジュールされていないことになります。
````

### clearTimeout を使ったキャンセル

`setTimeout` の呼び出しは、実行を取り消すために使用できる "タイマー識別子" `timerId` を返します。

キャンセルするための構文は次の通りです:

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```

下のコードでは、私たちは関数をスケジュールし、その後キャンセルしています。結果としては、何も起きません:

```js run no-beautify
let timerId = setTimeout(() => alert("never happens"), 1000);
alert(timerId); // timer 識別子

clearTimeout(timerId);
alert(timerId); // 同じ 識別子 (キャンセル後 null にはなりません)
```

`alert` の出力から分かるように、ブラウザではタイマー識別子は数値です。他の環境では、それは他の何かの場合があります。例えば、Node.js だと、追加メソッドを持つタイマーオブジェクトを返します。

改めて、それらのメソッドのための普遍的な仕様はありませんので問題ありません。

ブラウザの場合、タイマーはHTML5標準の[timers section](https://www.w3.org/TR/html5/webappapis.html#timers) で説明されています。

## setInterval

メソッド `setInterval` は `setTimeout` と同じ構文を持っています:

```js
let timerId = setInterval(func|code, delay[, arg1, arg2...])
```

すべての引数が同じ意味です。しかし `setTimeout` とは異なり、関数を1回ではなく定期的に与えられた時間間隔で実行します。

これ以上の呼び出しを止めるためには、`clearInterval(timerId)` を呼ぶ必要があります。

次の例は、2秒毎にメッセージを表示し、5秒後に表示は停止されます。:

```js run
// 2秒のインターバルで繰り返し
let timerId = setInterval(() => alert('tick'), 2000);

// 5秒後に停止
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
```

```smart header="`alert`が表示されている間、時間は経過します"
Chrome や Firefox を含むほとんどのブラウザは、`alert/confirm/prompt` を表示している間、内部のタイマーが継続されます。

そのため、上のコードを実行した後、しばらく `alert` ウィンドウを消さなかった場合、次の `alert` はすぐに表示されます。実際のインターバル間隔は２秒よりも短くなります。
```

## 再帰的な（ネストされた） setTimeout

定期的に何かを実行するのに 2つの方法があります。

1つは、`setInterval` です。もう1つは、ネストされた `setTimeout` で、このようになります:

```js
/** 次の代わり:
let timerId = setInterval(() => alert('tick'), 2000);
*/

let timerId = setTimeout(function tick() {
  alert('tick');
*!*
  timerId = setTimeout(tick, 2000); // (*)
*/!*
}, 2000);
```

上の `setTimeout` は現在の実行の最後の `(*)` で次の呼び出しをスケジュールします。

再帰的な `setTimeout` は `setInterval` よりも柔軟です。この方法は、現在の呼び出しの結果に応じて、次の呼び出しのスケジュールが異なる場合があります。

例えば、5秒毎にデータを確認するためにサーバへリクエストを送るサービスを書く必要があるとします。しかし、サーバが高負荷である場合には、間隔を 10, 20, 40 秒... と言ったように増やす必用があります。

これは、その疑似コードです:
```js
let delay = 5000;

let timerId = setTimeout(function request() {
  ...send request...

  if (request failed due to server overload) {
    // 次の実行のためにインターバルを増加させる
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```


また、もしも定期的にCPUを必要とするタスクを持っている場合には、実行にかかった時間を計測し次の呼び出しを計画することが出来ます。

**再帰的な `setTimeout` は実行の間の遅延を保証しますが、`setInterval` は保証しません**

2つのコードを比較してみましょう。最初の例は `setInterval` を使います。:

```js
let i = 1;
setInterval(function() {
  func(i++);
}, 100);
```

2つ目は再帰的な `setTimeout` を使います:

```js
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
```

`setInterval` では、内部スケジューラは100ms秒毎に `func(i++)` を実行します。:

![](setinterval-interval.svg)

気づきましたか...？

**`setInterval` での `func` 呼び出し間の実際の遅延はコード内のそれよりも短いです!**

それは当然のことです、なぜなら `func` の実行にかかる時間はインターバルの一部を "消費" するためです。

`func` の実行が予想していたよりも長くなり、100ms を超える可能性があります。

このケースでは、エンジンは `func` の完了を待ちます。その後、スケジューラをチェックして時間が経過していた場合は *すぐに* それを再度実行します。

エッジケースですが、もし関数が常に `delay` ms よりも長く実行される場合、呼び出しは全く停止することなく起こります。

次に、これは再帰的な `setTimeout` の図です:

![](settimeout-interval.svg)

**再帰的な `setInterval` は固定の遅延 (ここでは 100ms) を保証します。**

新しい呼び出しは、以前の呼び出しの終わりに計画されるためです。

````smart header="ガベージコレクション"
関数が `setInterval/setTimeout` に渡されたとき、内部参照がそこに作られスケジューラに保存されます。この場合、たとえその関数への参照が他にない場合でも、関数はガベージコレクションの対象にはなりません。

```js
// 関数はスケジューラが呼び出すまでメモリ内に留まります
setTimeout(function() {...}, 100);
```

`setInterval` では `cancelInterval` が呼ばれるまで、関数はメモリ上に存在し続けます。

そこには副作用があります。関数は外部のレキシカル環境を参照するので、それが生きている間は外部の変数も生き続けます。それらは関数自身よりもはるかに多くのメモリを必要とする場合があります。従って、スケジュールされた機能がもう必要ないときは、たとえそれが非常に小さいとしても、それをキャンセルする方がいいです。
````

## 遅延なしの setTimeout

特別なユースケースがあります: `setTimeout(func, 0)`、あるいは単に `setTimeout(func)` です。

これは `func` をできるだけ速く実行するようスケジュールします。しかし、スケジューラは現在のコードが完了した後にそれを実行します。

なので、関数は現在のコードの "すぐ後" に実行するようスケジュールされています。言い換えると、*非同期* です。

例えば、これは "Hello" を出力し、その後すぐに "World" を表示します。:

```js run
setTimeout(() => alert("World"), 0);

alert("Hello");
```

最初の行は "0ms 後のカレンダーに呼び出しを置いています"。しかし、スケジューラは現在のコードが完了した後に "カレンダーのチェック" をします。そのため、 `"Hello"` が最初で、`"World"` が後になります。

また、<info:event-loop> の章で説明する、遅延なしの timeout の高度なブラウザ関連のユースケースもあります。

````smart header="遅延ゼロは実際にはゼロではありません（ブラウザにおいて）"
ブラウザでは、ネストされたタイマーを実行できる頻度に制限があります。[HTML5 標準](https://www.w3.org/TR/html5/webappapis.html#timers) では次のように書かれています: "5つのネストされたタイマーの後には...間隔は少なくとも4ミリ秒に強制されます。"

何を意味しているか、下の例でデモしてみましょう。例での `setTimeout` 呼び出しは、自身を `0ms` 後に実行するよう再スケジュールします。各呼び出しは `times` 配列に、直前のものからの実行時間を覚えています。実際の遅延はどのように見えるでしょう？見てみましょう:

```js run
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // 前の呼び出しからの遅延を覚える

  if (start + 100 < Date.now()) alert(times); // 100ms 後に遅延を表示
  else setTimeout(run, 0); // もしくは再スケジュール
}, 0);

// 出力例:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

最初のタイマーはすぐに実行され(仕様に書いてある通り)、次に遅延が発生し、`9, 15, 20, 24...` となっています。呼び出し間で4ミリ秒以上の必須の遅延が発生します。

同様のことが、`setTimeout` の代わりに `setInterval` を使用する場合にも起きます: `setInterval(f)` は数回ゼロ遅延で `f` を実行し、その後 4ミリ秒以上の遅延で実行します。

その制限は古くからあり、多くのスクリプトがそれに依存しているため、歴史的な理由から存在しています。

サーバサイド JavaScript では、その制限は存在しません。また、Node.js では [process.nextTick](https://nodejs.org/api/process.html) や [setImmediate](https://nodejs.org/api/timers.html) のような即時非同期ジョブをスケジュールする他の方法も存在します。従って、この概念はブラウザ固有のものです。
````

## サマリ 

- メソッド `setInterval(func, delay, ...args)` と `setTimeout(func, delay, ...args)` は、`delay` ミリ秒に `func` を定期的に/一度だけ実行することができます。
- 実行をキャンセルするためには、`setInterval/setTimeout` で返却された値と一緒に `clearInterval/clearTimeout` を呼ぶ必要があります。
- ネストされた `setTimeout` 呼び出しは、`setInterval` よりも柔軟です。また、それは実行 *間* の最小時間を保証することができます。
- `setTimeout(func, 0)` （`setTimeout(func` と同じ）での遅延ゼロのスケジューリングは "できるだけ早く、しかし現在のコードが終わった後に" 呼び出しをスケジュールするために使われます。
- ブラウザは、5つ以上のネストされた `setTimeout` 呼び出し、または `setInterval`（５回目以降の呼び出し後）の最小遅延を4msに制限しています。それは歴史的な理由によるものです。

すべてのスケジューリングメソッドは正確な遅延を *保証しない* ことに注意してください。

例えば、ブラウザ内でのタイマーは、多くの理由で遅くなる可能性があります:
- CPUが過負荷になっている
- ブラウザタブがバックエンドモードになっている
- ラップトップがバッテリーモード

最小のタイマー精度(最小遅延)をブラウザや設定に応じて300msまたは1000msまで増やすことができます。
