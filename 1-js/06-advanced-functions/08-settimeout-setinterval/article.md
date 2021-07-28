# スケジューリング: setTimeout と setInterval

関数をすぐには実行させず、ある時点で実行するようにしたいことがあります。それは "呼び出しのスケジューリング" と呼ばれます。

そのための2つのメソッドがあります。:

<<<<<<< HEAD
- `setTimeout` は指定時間経過後、一度だけ関数を実行します。
- `setInterval` は各実行の間は指定した間隔で、定期的に関数を実行します。

それらのメソッドは JavaScript の仕様の一部ではありません。しかしほとんどの環境は内部スケジューラをもち、それらのメソッドを提供します。特に、これらはすべてのブラウザと Node.js でサポートされています。

[cut]
=======
- `setTimeout` allows us to run a function once after the interval of time.
- `setInterval` allows us to run a function repeatedly, starting after the interval of time, then repeating continuously at that interval.

These methods are not a part of JavaScript specification. But most environments have the internal scheduler and provide these methods. In particular, they are supported in all browsers and Node.js.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

## setTimeout

構文:

```js
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
```

パラメータ:

`func|code`
: 関数もしくは実行するコードの文字列。
通常は関数です。歴史的な理由で、コードの文字列も渡すことができますが、推奨されません。

`delay`
<<<<<<< HEAD
: 実行前の遅延時間で、ミリ秒単位です (1000 ms = 1 秒).
=======
: The delay before run, in milliseconds (1000 ms = 1 second), by default 0.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

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

<<<<<<< HEAD
しかし、文字列を使うことは推奨されていません。次のように、それらの代わりに関数を使ってください。:
=======
But using strings is not recommended, use arrow functions instead of them, like this:
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js run no-beautify
setTimeout(() => alert('Hello'), 1000);
```

````smart header="関数を渡しますが、実行はしないでください"
初心者の開発者は、関数の後に括弧 `()` をつけるミスをすることがあります:

```js
// wrong!
setTimeout(sayHi(), 1000);
```
<<<<<<< HEAD
`setTimeout` は関数への参照を期待しているため、これは動作しません。ちなみに、ここでは `sayHi()` 関数を実行し、*その実行結果* が `setTimeout` に渡されます。我々のケースでは、`sayHi()` の結果は `undefined`(関数は何も返さないため)であり、何もスケジュールされていないことになります。
=======
That doesn't work, because `setTimeout` expects a reference to a function. And here `sayHi()` runs the function, and the *result of its execution* is passed to `setTimeout`. In our case the result of `sayHi()` is `undefined` (the function returns nothing), so nothing is scheduled.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b
````

### clearTimeout を使ったキャンセル

`setTimeout` の呼び出しは、実行を取り消すために使用できる "タイマー識別子" `timerId` を返します。

キャンセルするための構文は次の通りです:

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```

<<<<<<< HEAD
下のコードでは、私たちは関数をスケジュールし、その後キャンセルしています。結果としては、何も起きません:
=======
In the code below, we schedule the function and then cancel it (changed our mind). As a result, nothing happens:
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js run no-beautify
let timerId = setTimeout(() => alert("never happens"), 1000);
alert(timerId); // timer 識別子

clearTimeout(timerId);
alert(timerId); // 同じ 識別子 (キャンセル後 null にはなりません)
```

<<<<<<< HEAD
`alert` の出力から分かるように、ブラウザではタイマー識別子は数値です。他の環境では、それは他の何かの場合があります。例えば、Node.js だと、追加メソッドを持つタイマーオブジェクトを返します。
=======
As we can see from `alert` output, in a browser the timer identifier is a number. In other environments, this can be something else. For instance, Node.js returns a timer object with additional methods.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

改めて、それらのメソッドのための普遍的な仕様はありませんので問題ありません。

ブラウザの場合、タイマーはHTML5標準の[timers section](https://www.w3.org/TR/html5/webappapis.html#timers) で説明されています。

## setInterval

<<<<<<< HEAD
メソッド `setInterval` は `setTimeout` と同じ構文を持っています:
=======
The `setInterval` method has the same syntax as `setTimeout`:
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
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

<<<<<<< HEAD
```smart header="Chrome/Opera/Safari ではモーダルウィンドウは時間を止めます"
IEとFirefoxでは、内部タイマーは `alert/confirm/prompt` を表示している間も "作動" し続けますが、Chrome、Opera、Safariでは内部タイマーは "凍結" します。

従って、もし上のコードを実行し、しばらく `alert` ウィンドウを消さなかった場合、Firefox/IE では次の `alert` はウィンドウを消した直後に表示されます(前の実行から2秒経過しているため)。Chrome/Opera/Safari では -- 2秒後に表示されます(タイマーは `alert` 中は作業していなかったため)。
```

## 再帰的な setTimeout
=======
```smart header="Time goes on while `alert` is shown"
In most browsers, including Chrome and Firefox the internal timer continues "ticking" while showing `alert/confirm/prompt`.

So if you run the code above and don't dismiss the `alert` window for some time, then the next `alert` will be shown immediately as you do it. The actual interval between alerts will be shorter than 2 seconds.
```

## Nested setTimeout
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

何かを定期的に実行するのに 2つの方法があります。

<<<<<<< HEAD
1つは、`setInterval` です。もう1つは、再帰的な `setTimeout` で、このようになります:
=======
One is `setInterval`. The other one is a nested `setTimeout`, like this:
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

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

<<<<<<< HEAD
上の `setTimeout` は現在の実行の最後の `(*)` で次の呼び出しをスケジュールします。

再帰的な `setTimeout` は `setInterval` よりも柔軟です。この方法は、現在の呼び出しの結果に応じて、次の呼び出しのスケジュールが異なる場合があります。

例えば、5秒毎にデータを確認するためにサーバへリクエストを送るサービスを書く必要があるとします。しかし、サーバが高負荷である場合には、間隔を 10, 20, 40 秒... と言ったように増やす必用があります。
=======
The `setTimeout` above schedules the next call right at the end of the current one `(*)`.

The nested `setTimeout` is a more flexible method than `setInterval`. This way the next call may be scheduled differently, depending on the results of the current one.

For instance, we need to write a service that sends a request to the server every 5 seconds asking for data, but in case the server is overloaded, it should increase the interval to 10, 20, 40 seconds...
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

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


<<<<<<< HEAD
また、もしも定期的にCPUを必要とするタスクを持っている場合には、実行にかかった時間を計測し次の呼び出しを計画することが出来ます。

**再帰的な `setTimeout` は実行の間の遅延を保証しますが、`setInterval` は保証しません**
=======
And if the functions that we're scheduling are CPU-hungry, then we can measure the time taken by the execution and plan the next call sooner or later.

**Nested `setTimeout` allows to set the delay between the executions more precisely than `setInterval`.**
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

2つのコードを比較してみましょう。最初の例は `setInterval` を使います。:

```js
let i = 1;
setInterval(function() {
  func(i++);
}, 100);
```

<<<<<<< HEAD
2つ目は再帰的な `setTimeout` を使います:
=======
The second one uses nested `setTimeout`:
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
```

<<<<<<< HEAD
`setInterval` では、内部スケジューラは100ms秒毎に `func(i)` を実行します。:

![](setinterval-interval.svg)

気づきましたか...？
=======
For `setInterval` the internal scheduler will run `func(i++)` every 100ms:

![](setinterval-interval.svg)

Did you notice?
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

**`setInterval` での `func` 呼び出し間の実際の遅延はコード内のそれよりも短いです!**

<<<<<<< HEAD
それは当然のことです、なぜなら `func` の実行にかかる時間はインターバルの一部を "消費" するためです。

`func` の実行が予想していたよりも長くなり、100ms を超える可能性があります。

このケースでは、エンジンは `func` の完了を待ちます。その後、スケジューラをチェックして時間が経過していた場合は *すぐに* それを再度実行します。

エッジケースですが、もし関数が常に `delay` ms よりも長く実行される場合、呼び出しは全く停止することなく起こります。

次に、これは再帰的な `setTimeout` の図です:

![](settimeout-interval.svg)

**再帰的な `setInterval` は固定の遅延 (ここでは 100ms) を保証します。**
=======
That's normal, because the time taken by `func`'s execution "consumes" a part of the interval.

It is possible that `func`'s execution turns out to be longer than we expected and takes more than 100ms.

In this case the engine waits for `func` to complete, then checks the scheduler and if the time is up, runs it again *immediately*.

In the edge case, if the function always executes longer than `delay` ms, then the calls will happen without a pause at all.

And here is the picture for the nested `setTimeout`:

![](settimeout-interval.svg)

**The nested `setTimeout` guarantees the fixed delay (here 100ms).**
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

新しい呼び出しは、以前の呼び出しの終わりに計画されるためです。

<<<<<<< HEAD
````smart header="ガベージコレクション"
関数が `setInterval/setTimeout` に渡されたとき、内部参照がそこに作られスケジューラに保存されます。この場合、たとえその関数への参照が他にない場合でも、関数はガベージコレクションの対象にはなりません。
=======
````smart header="Garbage collection and setInterval/setTimeout callback"
When a function is passed in `setInterval/setTimeout`, an internal reference is created to it and saved in the scheduler. It prevents the function from being garbage collected, even if there are no other references to it.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js
// 関数はスケジューラが呼び出すまでメモリ内に留まります
setTimeout(function() {...}, 100);
```

<<<<<<< HEAD
`setInterval` では `cancelInterval` が呼ばれるまで、関数はメモリ上に存在し続けます。
=======
For `setInterval` the function stays in memory until `clearInterval` is called.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

そこには副作用があります。関数は外部のレキシカル環境を参照するので、それが生きている間は外部の変数も生き続けます。それらは関数自身よりもはるかに多くのメモリを必要とする場合があります。従って、スケジュールされた機能がもう必要ないときは、たとえそれが非常に小さいとしても、それをキャンセルする方がいいです。
````

## Zero delay setTimeout

<<<<<<< HEAD
特別なユースケースがあります: `setTimeout(func, 0)` です。

これは `func` をできるだけ速く実行するようスケジュールします。しかし、スケジューラは現在のコードが完了した後にそれを実行します。

なので、関数は現在のコードの "すぐ後" に実行するようスケジュールされています。言い換えると、*非同期* です。
=======
There's a special use case: `setTimeout(func, 0)`, or just `setTimeout(func)`.

This schedules the execution of `func` as soon as possible. But the scheduler will invoke it only after the currently executing script is complete.

So the function is scheduled to run "right after" the current script.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

例えば、これは "Hello" を出力し、その後すぐに "World" を表示します。:

```js run
setTimeout(() => alert("World"));

alert("Hello");
```

<<<<<<< HEAD
最初の行は "0ms 後のカレンダーに呼び出しを置いています"。しかし、スケジューラは現在のコードが完了した後に "カレンダーのチェック" をします。そのため、 `"Hello"` が最初で、`"World"` が後になります。

### CPUを必要とするタスクの分割

`setTimeout` を使ってCPUを必要とするタスクを分割するトリックがあります。

たとえば、構文強調表示スクリプト（このページのコード例を色分けするために使用されます）はかなりCPUが重いです。 コードを強調表示するために、分析を実行し、多くの色の要素を作成し、文書に追加します。 ブラウザが "ハングアップ" することさえあり、それは容認できません。

そこで、私たちは長いテキストを小さく分割することができます。`setTimeout(...,0)` を使って、最初の100行、次の100行を計画する、と言ったように。

わかりやすくするために、より単純な例を考えてみましょう。 `1` から `1000000000` まで数える関数があります。

それを実行する場合、CPUはハングアップするでしょう。サーバサイド JS だと容易に気付き、ブラウザで実行した場合にはページ上の他のボタンをクリックしようとしても -- 実際にはJavaScript全体が一時停止しています。

```js run
let i = 0;

let start = Date.now();

function count() {

  // 重い処理を実行
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("Done in " + (Date.now() - start) + 'ms');
}

count();
```

ブラウザは "スクリプトが時間がかかりすぎている" 警告を出す場合があります。

入れ子の `setTimeout` を使ってジョブを分割しましょう:

```js run
let i = 0;

let start = Date.now();

function count() {

  // 重い処理の一部を実行 (*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count, 0); // 新しい呼び出しをスケジュール (**)
  }

}

count();
```

これで、ブラウザUIは "カウント" 処理中でも完全に機能します。


`(*)` でジョブの一部を行います:

1. 最初の実行: `i=1...1000000`.
2. ２回めの実行: `i=1000001..2000000`.
3. ...が続き、`while` は `i` が `100000` で均等に分割されているかどうかをチェックします。

そして、まだ終わっていない場合には `(**)` で次の呼び出しがスケジュールされます。

`count` の実行間の休止は、JavaScriptエンジンが何か他のことをしたり、他のユーザアクションに反応するのに十分な "一息" を提供します。

注目すべき点は、両方のバリアントです: `setTimeout` によりジョブを分割してもしなくてもスピードは同等です。全体のカウント時間に大きな違いはありません。

それらをもっと近づけるために改善しましょう。

`count()` の先頭にスケジューリングを移動させます:

```js run
let i = 0;

let start = Date.now();

function count() {

  // 開始時にスケジューリングを移動する
  if (i < 1e9 - 1e6) {
    setTimeout(count, 0); // 新しい呼び出しをスケジュール
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  }

}

count();
```

これで、`count()` を開始して `count()` をもっと呼ぶ必要があると知ったとき -- 私たちはジョブを実行する前に、すぐにそれをスケジュールします。

それを実行すると、時間が大幅に短縮されることに簡単に気づきます。

````smart header="ブラウザにおけるネストされたタイマーの最小遅延"
ブラウザでは、ネストされたタイマーを実行できる頻度に制限があります。[HTML5 標準](https://www.w3.org/TR/html5/webappapis.html#timers) では次のように書かれています: "5つのネストされたタイマーの後には...間隔は少なくとも4ミリ秒に強制されます。"

何を意味しているか、下の例でデモしてみましょう。例での `setTimeout` 呼び出しは、自身を `0ms` 後に実行するよう再スケジュールします。各呼び出しは `times` 配列に、直前のものからの実行時間を覚えています。実際の遅延はどのように見えるでしょう？見てみましょう:
=======
The first line "puts the call into calendar after 0ms". But the scheduler will only "check the calendar" after the current script is complete, so `"Hello"` is first, and `"World"` -- after it.

There are also advanced browser-related use cases of zero-delay timeout, that we'll discuss in the chapter <info:event-loop>.

````smart header="Zero delay is in fact not zero (in a browser)"
In the browser, there's a limitation of how often nested timers can run. The [HTML5 standard](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) says: "after five nested timers, the interval is forced to be at least 4 milliseconds.".

Let's demonstrate what it means with the example below. The `setTimeout` call in it re-schedules itself with zero delay. Each call remembers the real time from the previous one in the `times` array. What do the real delays look like? Let's see:
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js run
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // 前の呼び出しからの遅延を覚える

<<<<<<< HEAD
  if (start + 100 < Date.now()) alert(times); // 100ms 後に遅延を表示
  else setTimeout(run, 0); // もしくは再スケジュール
}, 0);
=======
  if (start + 100 < Date.now()) alert(times); // show the delays after 100ms
  else setTimeout(run); // else re-schedule
});
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

// 出力例:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

<<<<<<< HEAD
最初のタイマーはすぐに実行され(仕様に書いてある通り)、次に遅延が発生し、`9, 15, 20, 24...` となっています。
=======
First timers run immediately (just as written in the spec), and then we see `9, 15, 20, 24...`. The 4+ ms obligatory delay between invocations comes into play.

The similar thing happens if we use `setInterval` instead of `setTimeout`: `setInterval(f)` runs `f` few times with zero-delay, and afterwards with 4+ ms delay.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

その制限は古代からあり、多くのスクリプトがそれに依存しているため、歴史的な理由から存在しています。

<<<<<<< HEAD
サーバサイド JavaScript では、その制限は存在しません。また、Node.js では [process.nextTick](https://nodejs.org/api/process.html) や [setImmediate](https://nodejs.org/api/timers.html) のような即時非同期ジョブをスケジュールする他の方法も存在します。従って、この概念はブラウザ固有のものです。
````

### ブラウザのレンダリングを許可する

ブラウザ内でのスクリプトの別の利点は、プログレスバー等をユーザに表示できることです。これは、ブラウザは通常スクリプトが完了した後に全ての "再ペイント" をするためです。

従って、私たちが1つの巨大な関数を実行し、そこで何かを変えたとしても、その変更は関数が終わるまでドキュメント上には反映されません。

これはそのデモです:
```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {
    for (let j = 0; j < 1e6; j++) {
      i++;
      // 現在の i を <div> に表示
      // (innerHTML については別のチャプターで説明します)
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

あなたがこれを実行した場合、 `i` の変更は count 全体が終わった後に行われます。

そして、`setTimeout` を使ってそれを小さく分割すると、変更は各実行の間で適用されます。なので、これは良く見えます:

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // 重い処理の一部を実行 (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e9) {
      setTimeout(count, 0);
    }

  }

  count();
</script>
```

これで、`<div>` は `i` の値の増加を表示します。

## サマリ 

- メソッド `setInterval(func, delay, ...args)` と `setTimeout(func, delay, ...args)` は、`delay` ミリ秒に `func` を定期的に/一度だけ実行することができます。
- 実行をキャンセルするためには、`setInterval/setTimeout` で返却された値と一緒に `clearInterval/clearTimeout` を呼ぶ必要があります。
- ネストされた `setTimeout` 呼び出しは、`setInterval` よりも柔軟です。また、それは実行 *間* の最小時間を保証することができます。
- ゼロタイムアウトスケジューリング `setTimeout(...,0)` は "できるだけ早く、しかし現在のコードが終わった後に" 呼び出しをスケジュールするために使われます。

`setTimeout(...,0)` のいくつかのユースケースです:
- CPUを必要とするタスクを小さく分割するために、スクリプトが "ハングアップ" しないために。
- 処理が進行している間にブラウザに何か他のことをさせるために（プログレスバーを描画するなど）。

すべてのスケジューリングメソッドは正確な遅延を *保証しない* ことに注意してください。スケジュールされたコードでは、それに頼るべきではありません。
=======
For server-side JavaScript, that limitation does not exist, and there exist other ways to schedule an immediate asynchronous job, like [setImmediate](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args) for Node.js. So this note is browser-specific.
````

## Summary

- Methods `setTimeout(func, delay, ...args)` and `setInterval(func, delay, ...args)` allow us to run the `func` once/regularly after `delay` milliseconds.
- To cancel the execution, we should call `clearTimeout/clearInterval` with the value returned by `setTimeout/setInterval`.
- Nested `setTimeout` calls are a more flexible alternative to `setInterval`, allowing us to set the time *between* executions more precisely.
- Zero delay scheduling with `setTimeout(func, 0)` (the same as `setTimeout(func)`) is used to schedule the call "as soon as possible, but after the current script is complete".
- The browser limits the minimal delay for five or more nested calls of `setTimeout` or for `setInterval` (after 5th call) to 4ms. That's for historical reasons.

Please note that all scheduling methods do not *guarantee* the exact delay.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

例えば、ブラウザ内でのタイマーは、多くの理由で遅くなる可能性があります:
- CPUが過負荷になっている
- ブラウザタブがバックエンドモードになっている
- ラップトップがバッテリーモード

<<<<<<< HEAD
最小のタイマー精度(最小遅延)をブラウザや設定に応じて300msまたは1000msまで増やすことができます。
=======
All that may increase the minimal timer resolution (the minimal delay) to 300ms or even 1000ms depending on the browser and OS-level performance settings.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b
