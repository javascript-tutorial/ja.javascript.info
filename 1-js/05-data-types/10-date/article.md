# 日付 と 時刻

新しい組み込みオブジェクトを見てみましょう: [Date](mdn:js/Date)。日付や時刻を保存し、日付/時刻を管理するためのメソッドを提供します。

例えば、作成/修正時刻を保存したり、時間を測定したり、単に現在の時刻を印刷するために使うことができます。

[cut]

## 作成

新しい `Date` オブジェクトを作るために、 次の引数のいずれかで `new Date()` を呼びます:

`new Date()`
: 引数なし -- 現在の日付と時刻で `Date` オブジェクトを作ります:

    ```js run
    let now = new Date();
    alert( now ); // shows current date/time
    ```

`new Date(milliseconds)`
: Jan 1st of 1970 UTC+0 (1970年 1月1日 UTC+0) からの経過したミリ秒(秒の1/1000)に等しい時間をもつ `Date` オブジェクトを作ります。

    ```js run
    // 0 means 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // now add 24 hours, get 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    1970年初めから経過したミリ秒の数値は *タイムスタンプ* と呼ばれます。

    これは日付の軽量な数値表現です。私たちはいつも `new Date(timestamp)` を使ってタイムスタンプから日付を作成し、存在する `Date` オブジェクトを `date.getTime()` メソッド(後述) を使ってタイムスタンプに変換します。

`new Date(datestring)`
: 1つの引数でそれが文字列の場合、`Date.parse` アルゴリズム(後述)でパースされます。

    ```js run
    let date = new Date("2017-01-26");
    alert(date); // Thu Jan 26 2017 ...
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: ローカルタイムゾーンで、与えられた要素で日付を作成します。最初の2つの引数は必須です。

    補足:

    - `year` は4桁でなければいけません。`2013` はOKですが、`98` はダメです。
    - `month` `0` (1月) から数え、`11` (12月)までです。
    - `date` パラメータは実際の月の日です。もし指定がなければ `1` になります。
    - もし `hours/minutes/seconds/ms` がなければ、これらは `0` とみなされます。

    例:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // the same, hours etc are 0 by default
    ```

    最小の精度は 1ms (1/1000秒)です:

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## date コンポーネントへのアクセス

`Date` オブジェクトから 年、月などへアクセスする多くのメソッドがあります。しかし、カテゴライズすることで簡単に覚えることができます。

[getFullYear()](mdn:js/Date/getFullYear)
: 年を取得します(4桁)

[getMonth()](mdn:js/Date/getMonth)
: 月を取得します, **0から11**。

[getDate()](mdn:js/Date/getDate)
: 月の日を取得し、値は 1 から 31 です。メソッドの名前には少し違和感がありますが。

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: 対応する時刻の構成要素を取得します。

```warn header="`getYear()` ではなく `getFullYear()` です"
多くのJavaScriptエンジンは 標準ではないメソッド `getYear()` を実装しています。このメソッドは非推奨です。これは2桁の年を返す時がありますので、決して使わないでください。年のためには `getFullYear()` がります。
```

加えて、週の日を取得することもできます:

[getDay()](mdn:js/Date/getDay)
: 週の日を取得し、値は `0` (日曜) から `6` (土曜) です。最初の日は常に日曜です。いくつかの国ではそうではありませんが、変えることはできません。

**上のすべてのメソッドはローカルタイムゾーンを基準に構成要素を返します。**

タイムゾーン UTC+0 の日、月、年などを返す、UTCカウンターパートもあります:[getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). 単に `"get"` の直後に `"UTC"` を挿入するだけです。.

もしもあなたのタイムゾーンが UTC から相対的にシフトしている場合、下のコードは異なる時間を表示します:

```js run
// current date
let date = new Date();

// the hour in your current time zone
alert( date.getHours() );

// the hour in UTC+0 time zone (London time without daylight savings)
alert( date.getUTCHours() );
```

与えられたメソッドに加えて、UTCバリアントを持たない、特別な2つのメソッドがあります:

[getTime()](mdn:js/Date/getTime)
: 日付のタイムスタンプを返します -- それは、1970年 UTC+0 の 1月1日からの経過ミリ秒です。

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: ローカルタイムゾーンとUTCの差を、分で返します:

    ```js run
    // if you are in timezone UTC-1, outputs 60
    // if you are in timezone UTC+3, outputs -180
    alert( new Date().getTimezoneOffset() );

    ```

## 日付の構成要素を設定する

次のメソッドで、日付/時刻の構成要素をセットすることができます:

- [`setFullYear(year [, month, date])`](mdn:js/Date/setFullYear)
- [`setMonth(month [, date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour [, min, sec, ms])`](mdn:js/Date/setHours)
- [`setMinutes(min [, sec, ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec [, ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (1970年1月1日UTC+0からのみ市秒で日付全体をセットします)

`setTime()` を除くすべてのものは UTCバリアントをもっています。例えば `setUTCHours()`。

これまで見たように、いくつかのメソッドは一度に複数の構成要素をセットすることができます。例えば、`setHours` です。  言及されていない構成要素は変更されません。

例:

```js run
let today = new Date();

today.setHours(0);
alert(today); // still today, but the hour is changed to 0

today.setHours(0, 0, 0, 0);
alert(today); // still today, now 00:00:00 sharp.
```

## 自動補正

*自動補正* は `Date` オブジェクトのとても便利な機能です。私たちが範囲外の値を指定することができますが、それは自動的に調節されます。

例:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...is 1st Feb 2013!
```

範囲外の日付の構成要素は自動的に配布されます。

"2016年2月28日" の日付を2日増やす必要があるとします。 うるう年の場合は "2月" または "1月" になることがあります。 それについて考える必要はありません。 単に2日を追加してください。 `Date` オブジェクトは残りの作業を行います:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

この機能は、指定した期間の後に日付を取得するためによく使用されます。 たとえば、 "70秒後" の日付を取得しましょう。:

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // shows the correct date
```

また、ゼロ、または負値をセットすることも出来ます。例えば:

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // set day 1 of month
alert( date );

date.setDate(0); // min day is 1, so the last day of the previous month is assumed
alert( date ); // 31 Dec 2015
```

## 日付から数値へ、日付の差分

`Date` オブジェクトが数値へ変換されるとき、`date.getTime()` と同じようにタイムスタンプになります:

```js run
let date = new Date();
alert(+date); // the number of milliseconds, same as date.getTime()
```

重要な副作用は、日付を差し引くことができますが、結果はその差分(ミリ秒)になります。

これは時間の計測で使うことができます:

```js run
let start = new Date(); // start counting

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // done

alert( `The loop took ${end - start} ms` );
```

## Date.now()

もしも差分だけ測定したい場合、`Date` オブジェクトを使う必要はありません。

現在のタイムスタンプを返す特別なメソッド `Date.now()` があります。

意味的には `new Date().getTime()` と同じですが、中間の `Date` オブジェクトを作りません。なので、より速くガベージコレクションに圧力をかけません。

これは、便利さや、JavaScriptでのゲームや他の特別なアプリケーションのようにパフォーマンスが重要な場合に主に使われます。

従って、これは恐らくベターです:

```js run
*!*
let start = Date.now(); // milliseconds count from 1 Jan 1970
*/!*

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // done
*/!*

alert( `The loop took ${end - start} ms` ); // subtract numbers, not dates
```

## ベンチマーク

CPUを必要とする機能の信頼できるベンチマークが必要な場合は、注意が必要です。

例えば、2つの日付の差を計算する2つの関数を測定してみましょう。どちらがより速いでしょうか？

```js
// we have date1 and date2, which function faster returns their difference in ms?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

これら2つは正確に同じことをしますが、片方は日付のミリ秒を取得するために明示的な `date.getTime()` を使います。また、他方は日付の数値変換を頼っています。これらの結果は常に同じです。

さて、どちらがより速いでしょうか？

最初に思いつくアイデアは、それらを何度も連続で実行し、その時間の差を測ることです。我々のケースでは、関数はとてもシンプルなので、約10万回行う必要があります。

測定してみましょう。:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

なんということでしょう! `getTime()` を使う方が遥かに速いです! なぜなら、この場合には型変換がなく、エンジンが最適化をするのがとても簡単なためです。

さて、私たちは測定結果を得ましたが、まだ良いベンチマークではありません。

`bench(diffSubtract)` を実行しているときに、CPUは並列で何かをしており、リソースを取っていたと想像してください。そして、`bench(diffGetTime)` の実行をするときまでに、その処理は完了しました。

これは、現代のマルチプロセスOSでのよくある実際のシナリオです。

上の場合、結果として、最初のベンチマークは2回目よりも少ないCPUリソースになります。これは誤った結果を導きます。

**より信頼性の高いベンチマークを行うには、ベンチマーク全体を複数回再実行する必要があります。**

ここではそのコードのサンプルです:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// run bench(upperSlice) and bench(upperLoop) each 10 times alternating
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

現代のJavaScriptエンジンは、何度も実行される「ホットコード」に対してのみ高度な最適化を適用し始めます（ほとんど実行されないものを最適化する必要はないためです）。したがって、上記の例では、最初の実行は最適化されていません。 ヒートアップ(メインの実行の前の助走)を追加することもできます:

```js
// added for "heating up" prior to the main loop
bench(diffSubtract);
bench(diffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="マイクロベンチマークをするのは気をつけてください"
現代のJavaScriptエンジンは多くの最適化を行います。それらは "人工的なテスト" の結果を "通常の使用" と比較して調整するかもしれません。 非常に小さいものをベンチマークするときは特にそうです。従って、あなたが真面目にパフォーマンスを理解したいのであれば、JavaScriptエンジンの仕組みを学んでください。そして、マイクロベンチマークは全く必要ないでしょう。

V8 についての素晴らしい記事は <http://mrale.ph> にあります。
```

## 文字列からの Date.parse

メソッド [Date.parse(str)](mdn:js/Date/parse) は文字列から日付を読むことができます。

文字列のフォーマットは `YYYY-MM-DDTHH:mm:ss.sssZ` でなければなりません。:

- `YYYY-MM-DD` -- は日付です。年-月-日
- `"T"` の文字はデリミタとして使用されます。
- `HH:mm:ss.sss` -- は時間です(時、分、秒とミリ秒)。
- オプションの `'Z'` の部分は、フォーマット `+-hh:mm` のタイムゾーンを示します。UTC+0 を意味する単一の文字 `Z` です。

より短いバリアントも可能です。`YYYY-MM-DD` や `YYYY-MM` 、または `YYYY` です。

`Date.parse(str)` の呼び出しでは、文字列を与えられたフォーマットにパースし、タイムスタンプを返します(1970年 1月1日 UTC+0からのミリ秒)。もしフォーマットが正しくない場合には `NaN` を返します。

例:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
```

タイムスタンプから、即座に `new Date` オブジェクトを作ることができます。

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## サマリ [#summary]

- JavaScript での日付と時刻は[Date](mdn:js/Date) オブジェクトで表現されます。"日付だけ"、"時刻だけ" を作ることはできません。`Date` オブジェクトは常に両方を持ちます。
- 月はゼロからカウントされます(なので、1月は ゼロです)。
- `getDay()` の週の日もゼロからカウントされます(ゼロは日曜です)
- 範囲外の構成要素がセットされたとき、`Date` は自身を自動補正します。日/月/時の加減算の場合に良いです。
- 日付はミリ秒で与えられた差分で引き算することができます。これは、数値に変換されるとき、`Date` はタイムスタンプになるためです。
- 素早く現在のタイムスタンプを取得するためには `Date.now()` を使いましょう。

多くのたのシステムとは違い、JavaScriptでのタイムスタンプは秒ではなく、ミリ秒です。

また、私たちはより高精度の時間計測が必要な場合があります。JavaScript自身はマイクロ秒(100万分の1秒)での時間を計測する方法を持っていませんが、ほとんどの環境はそれを提供しています。例えば、ブラウザはマイクロ秒の精度(少数第3桁)で、ページ読み込み開始からのミリ秒を返す [performance.now()](mdn:api/Performance/now) を持っています。:

```js run
alert(`Loading started ${performance.now()}ms ago`);
// Something like: "Loading started 34731.26000000001ms ago"
// .26 is microseconds (260 microseconds)
// more than 3 digits after the decimal point are precision errors, but only the first 3 are correct
```

Node.JS は `microtime` モジュールや他の方法を持っています。技術的には、どのデバイスや環境で精度をあげることができます。単に `Date` にはないだけです。
