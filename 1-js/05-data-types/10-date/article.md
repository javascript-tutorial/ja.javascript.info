# 日付 と 時刻

新しい組み込みオブジェクトを見ていきましょう: [Date](mdn:js/Date)。日付や時刻を保存し、管理するためのメソッドを提供します。

<<<<<<< HEAD
例えば、作成/修正時刻を保存したり、時間を測定したり、単に現在の時刻を表示するために使うことができます。

[cut]
=======
For instance, we can use it to store creation/modification times, to measure time, or just to print out the current date.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

## 作成 

新しい `Date` オブジェクトを作るには、 次のいずれかの引数で `new Date()` を呼びます:

`new Date()`
: 引数なし -- 現在の日付と時刻で `Date` オブジェクトを作ります:

    ```js run
    let now = new Date();
    alert( now ); // 現在の日時を表示します
    ```

`new Date(milliseconds)`
: Jan 1st of 1970 UTC+0 (1970年 1月1日 UTC+0) からの経過したミリ秒(秒の1/1000)に等しい時間をもつ `Date` オブジェクトを作ります。

    ```js run
    // 0 は 01.01.1970 UTC+0 を意味します
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // 今 24 時間を追加しました, 02.01.1970 UTC+0 になります
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    1970年初めから経過したミリ秒の数値は *タイムスタンプ* と呼ばれます。

    これは日付の軽量な数値表現です。常に `new Date(timestamp)` を使ってタイムスタンプから日付を作成し、存在する `Date` オブジェクトを `date.getTime()` メソッド(後述) を使ってタイムスタンプに変換します。

`new Date(datestring)`
: 1つの引数でそれが文字列の場合、`Date.parse` アルゴリズム(後述)でパースされます。

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // The time portion of the date is assumed to be midnight GMT and 
    // is adjusted according to the timezone the code is run in
    // So the result could be
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // or
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)
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
    new Date(2011, 0, 1); // 同じです。時などはデフォルトで 0 です
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
多くのJavaScriptエンジンは 標準ではないメソッド `getYear()` を実装しています。このメソッドは非推奨です。これは2桁の年を返す時があるので、決して使わないでください。年の取得には `getFullYear()` があります。
```

加えて、週の曜日を取得することもできます:

[getDay()](mdn:js/Date/getDay)
: 週の曜日を取得し、値は `0` (日曜) から `6` (土曜) です。最初の日は常に日曜です。いくつかの国ではそうではありませんが、変えることはできません。

**上のすべてのメソッドはローカルタイムゾーンを基準に構成要素を返します。**

タイムゾーン UTC+0 の日、月、年などを返す、UTCカウンターパートもあります:[getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). 単に `"get"` の直後に `"UTC"` を挿入するだけです。.

あなたのタイムゾーンが UTC から相対的にシフトしている場合、下のコードの結果は異なる時間を表示します:

```js run
// 現在の date
let date = new Date();

// あなたの現在のタイムゾーンでの時間
alert( date.getHours() );

// UTC+0 のタイムゾーンでの時間 (サマータイムのないロンドン時間)
alert( date.getUTCHours() );
```

<<<<<<< HEAD
なお、UTCのパターンを持たない、2つの特別なメソッドがあります:
=======
Besides the given methods, there are two special ones that do not have a UTC-variant:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

[getTime()](mdn:js/Date/getTime)
: 日付のタイムスタンプを返します -- それは、1970年 UTC+0 の 1月1日からの経過ミリ秒です。

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: ローカルタイムゾーンとUTCの差を、分で返します:

    ```js run
    // タイムゾーン UTC-1 にいる場合、60 を出力
    // タイムゾーン UTC+3 にいる場合、-180 を出力
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
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (1970年1月1日UTC+0からの経過日をミリ秒で設定します)

`setTime()` を除くすべてのものは UTCのパターンもあります。例えば `setUTCHours()` です。

これまで見たように、いくつかのメソッドは一度に複数の構成要素をセットすることができます。例えば、`setHours` です。設定するときに言及されていない構成要素は変更されません。

例:

```js run
let today = new Date();

today.setHours(0);
alert(today); // 今日のままですが、時は 0 に変更されます

today.setHours(0, 0, 0, 0);
alert(today); // 今日のままで, 今は 00:00:00 です
```

## 自動補正 

*自動補正* は `Date` オブジェクトのとても便利な機能です。私たちが範囲外の値を指定した場合、それは自動的に調節されます。

例:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...iは 2013/2/1 です!
```

範囲外の数値が指定された構成要素は自動的に補正されます。

"2016年2月28日" の日付を2日増やす必要があるとしましょう。"3月2日"、うるう年の場合には "3月1日" になりますが、考える必要はありません。 2日を追加するだけです。 `Date` オブジェクトが残りを行います:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

この機能は、指定した期間後の日付を取得したいときによく利用されます。 例えば、"70秒後" の日付を取得しましょう。:

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // 正しい日時を表示します
```

また、ゼロや負値をセットすることもできます。例えば:

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // 月の1日を設定します
alert( date );

date.setDate(0); // 最小日は1なので、先月の最後の日になります
alert( date ); // 31 Dec 2015
```

## 日付から数値へ、日付の差分 

`Date` オブジェクトが数値へ変換されるとき、`date.getTime()` と同じようにタイムスタンプになります:

```js run
let date = new Date();
alert(+date); // ミリ秒の数値です, date.getTime() と同じです
```

重要な副作用は、日付は減算することができますが、結果はミリ秒単位での差分になることです。

これは時間の計測で使うことができます:

```js run
let start = new Date(); // 計測開始

// なにかする
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // 終了

alert( `The loop took ${end - start} ms` );
```

## Date.now() 

もし差分だけ測定したい場合、`Date` オブジェクトを使う必要はありません。

現在のタイムスタンプを返す特別なメソッド `Date.now()` があります。

これは、意味的には `new Date().getTime()` と同じですが、中間の `Date` オブジェクトを作らないため、より速く、ガベージコレクションに負荷をかけません。

これは主に利便性であったり、JavaScriptでのゲームやその他特別なアプリケーションなどパフォーマンスが重要な場合に使われます。

なので、これはおそらくベターです:

```js run
*!*
let start = Date.now(); // 1 Jan 1970 からのミリ秒
*/!*

// なにかする
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // 終了
*/!*

alert( `The loop took ${end - start} ms` ); // 日付ではなく、数値を減算する
```

## ベンチマーク 

CPUを必要とする機能について、信頼できるベンチマークが必要な場合は注意が必要です。

例えば、2つの日付の差を計算する2つの関数を測定してみましょう。どちらがより速いでしょうか？

```js
// date1 と date2 を持っており、これらの差をmsで返すのはどちらの関数が速いでしょう？
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

これら2つは正確に同じことをしますが、片方は日付のミリ秒を取得するために明示的な `date.getTime()` を使います。また、もう一方は日付の数値変換を当てにしています。これらの結果は常に同じです。

さて、どちらがより速いでしょうか？

最初に思いつくアイデアは、それらを何度も連続で実行し、その時間の差を測ることです。我々のケースでは、関数はとてもシンプルなので、約10万回程度行う必要があります。

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

なんということでしょう! `getTime()` を使う方が遥かに速いです! なぜかと言うと、この場合は型変換がなく、エンジンが最適化をするのがとても簡単なためです。

さて、私たちは測定結果を得ましたが、これはまだ良いベンチマークではありません。

`bench(diffSubtract)` を実行しているときにCPUは並列で何かをしていてリソースを消費しており、`bench(diffGetTime)` の実行時までにはその作業が完了していたと想像してください。

これは、現代のマルチプロセスOSでのよくある実際のシナリオです。

上の場合、結果として最初のベンチマークは2回目よりも利用できるCPUリソースが少なくなります。これは誤った結果を導きます。

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
// bench(upperSlice) と bench(upperLoop) を交互に10回実行する
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
// メインループの前の "ヒートアップ" のために追加
bench(diffSubtract);
bench(diffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="マイクロベンチマークをするのは気をつけてください"
現代のJavaScriptエンジンは多くの最適化を行います。それらは "人工的なテスト" の結果を "通常の使用" と比較して調整するかもしれません。 非常に小さいものをベンチマークするときは特にそうです。従って、真面目にパフォーマンスを理解したいのであれば、JavaScriptエンジンの仕組みを学んでください。そして、マイクロベンチマークは全く必要ないでしょう。

V8 についての素晴らしい記事は <http://mrale.ph> にあります。
```

## 文字列からの Date.parse 

メソッド [Date.parse(str)](mdn:js/Date/parse) は文字列から日付を読むことができます。

文字列のフォーマットは `YYYY-MM-DDTHH:mm:ss.sssZ` でなければなりません。:

- `YYYY-MM-DD` は日付です。年-月-日
- `"T"` の文字はデリミタとして使用されます。
- `HH:mm:ss.sss` は時間です(時、分、秒とミリ秒)。
- オプションの `'Z'` の部分は、フォーマット `+-hh:mm` のタイムゾーンを示します。UTC+0 を意味する単一の文字 `Z` です。

より短い表記も可能です。`YYYY-MM-DD` や `YYYY-MM` 、または `YYYY` です。

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

## サマリ 

- JavaScript での日付と時刻は[Date](mdn:js/Date) オブジェクトで表現されます。"日付だけ"、"時刻だけ" を作ることはできません。`Date` オブジェクトは常に両方を持ちます。
- 月はゼロからカウントされます(なので、1月は ゼロです)。
- `getDay()` の週の曜日もゼロからカウントされます(ゼロは日曜です)
- 範囲外の構成要素がセットされたとき、`Date` は自身を自動補正します。日/月/時の加減算の場合には便利です。
- 日付はミリ秒で与えられた差分で引き算することができます。これは、数値に変換されるとき、`Date` はタイムスタンプになるためです。
- 素早く現在のタイムスタンプを取得するには `Date.now()` を使いましょう。

多くの他のシステムとは異なり、JavaScriptでのタイムスタンプは秒ではなく、ミリ秒です。

また、私たちはより高精度の時間計測が必要な場合があります。JavaScript自身はマイクロ秒(100万分の1秒)での時間を計測する方法を持っていませんが、ほとんどの環境はそれを提供しています。例えば、ブラウザはマイクロ秒の精度(少数第3桁)で、ページ読み込み開始からのミリ秒を返す [performance.now()](mdn:api/Performance/now) を持っています。:

```js run
alert(`Loading started ${performance.now()}ms ago`);
// このようになります: "Loading started 34731.26000000001ms ago"
// .26 はマイクロ秒 (260 マイクロ秒)
// 少数点3桁以上は精度エラーで、最初の3桁だけが正しいです
```

<<<<<<< HEAD
Node.JS は `microtime` モジュールや他の方法を持っています。技術的には、どのデバイスや環境でも精度をあげることができます。単に `Date` にはないだけです。
=======
Node.js has `microtime` module and other ways. Technically, any device and environment allows to get more precision, it's just not in `Date`.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f
