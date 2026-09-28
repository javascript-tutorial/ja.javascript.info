<<<<<<< HEAD
# 日付 と 時刻

新しい組み込みオブジェクトを見ていきましょう: [Date](mdn:js/Date)。日付や時刻を保存し、管理するためのメソッドを提供します。

例えば、作成/修正時刻を保存したり、時間を測定したり、単に現在の時刻を表示するために使うことができます。

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
=======
# Date and time

Let's meet a new built-in object: [Date](mdn:js/Date). It stores the date, time and provides methods for date/time management.

For instance, we can use it to store creation/modification times, to measure time, or just to print out the current date.

## Creation

To create a new `Date` object call `new Date()` with one of the following arguments:

`new Date()`
: Without arguments -- create a `Date` object for the current date and time:

    ```js run
    let now = new Date();
    alert( now ); // shows current date/time
    ```

`new Date(milliseconds)`
: Create a `Date` object with the time equal to number of milliseconds (1/1000 of a second) passed after the Jan 1st of 1970 UTC+0.

    ```js run
    // 0 means 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // now add 24 hours, get 02.01.1970 UTC+0
>>>>>>> 20208769e528337949e946f526534d61d38bac47
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

<<<<<<< HEAD
    1970年初めから経過したミリ秒の数値は *タイムスタンプ* と呼ばれます。

    これは日付の軽量な数値表現です。常に `new Date(timestamp)` を使ってタイムスタンプから日付を作成し、存在する `Date` オブジェクトを `date.getTime()` メソッド(後述) を使ってタイムスタンプに変換します。

    1970.01.01 以前の日付は負のタイムスタンプになります。例:
=======
    An integer number representing the number of milliseconds that has passed since the beginning of 1970 is called a *timestamp*.

    It's a lightweight numeric representation of a date. We can always create a date from a timestamp using `new Date(timestamp)` and convert the existing `Date` object to a timestamp using the `date.getTime()` method (see below).

    Dates before 01.01.1970 have negative timestamps, e.g.:
>>>>>>> 20208769e528337949e946f526534d61d38bac47
    ```js run
    // 31 Dec 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
    ```

`new Date(datestring)`
<<<<<<< HEAD
: 1つの引数でそれが文字列の場合、自動でパースされます。`Date.parse` アルゴリズム(後述)でパースされます。
=======
: If there is a single argument, and it's a string, then it is parsed automatically. The algorithm is the same as `Date.parse` uses, we'll cover it later.
>>>>>>> 20208769e528337949e946f526534d61d38bac47

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
<<<<<<< HEAD
    // 時刻が設定されていないので、GMT の深夜0時とみなされ、
    // コーザルが実行されるタイムゾーンに応じて調整されます。 
    // したがって、結果は以下になります
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // または
=======
    // The time is not set, so it's assumed to be midnight GMT and
    // is adjusted according to the timezone the code is run in
    // So the result could be
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // or
>>>>>>> 20208769e528337949e946f526534d61d38bac47
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
<<<<<<< HEAD
: ローカルタイムゾーンで、与えられた要素で日付を作成します。最初の2つの引数は必須です。

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
=======
: Create the date with the given components in the local time zone. Only the first two arguments are obligatory.

    - The `year` should have 4 digits. For compatibility, 2 digits are also accepted and considered `19xx`, e.g. `98` is the same as `1998` here, but always using 4 digits is strongly encouraged.
    - The `month` count starts with `0` (Jan), up to `11` (Dec).
    - The `date` parameter is actually the day of month, if absent then `1` is assumed.
    - If `hours/minutes/seconds/ms` is absent, they are assumed to be equal `0`.

    For instance:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // the same, hours etc are 0 by default
    ```

    The maximal precision is 1 ms (1/1000 sec):
>>>>>>> 20208769e528337949e946f526534d61d38bac47

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

<<<<<<< HEAD
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

なお、UTCのパターンを持たない、2つの特別なメソッドがあります:

[getTime()](mdn:js/Date/getTime)
: 日付のタイムスタンプを返します -- それは、1970年 UTC+0 の 1月1日からの経過ミリ秒です。

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: ローカルタイムゾーンとUTCの差を、分で返します:

    ```js run
    // タイムゾーン UTC-1 にいる場合、60 を出力
    // タイムゾーン UTC+3 にいる場合、-180 を出力
=======
## Access date components

There are methods to access the year, month and so on from the `Date` object:

[getFullYear()](mdn:js/Date/getFullYear)
: Get the year (4 digits)

[getMonth()](mdn:js/Date/getMonth)
: Get the month, **from 0 to 11**.

[getDate()](mdn:js/Date/getDate)
: Get the day of month, from 1 to 31, the name of the method does look a little bit strange.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Get the corresponding time components.

```warn header="Not `getYear()`, but `getFullYear()`"
Many JavaScript engines implement a non-standard method `getYear()`. This method is deprecated. It returns 2-digit year sometimes. Please never use it. There is `getFullYear()` for the year.
```

Additionally, we can get a day of week:

[getDay()](mdn:js/Date/getDay)
: Get the day of week, from `0` (Sunday) to `6` (Saturday). The first day is always Sunday, in some countries that's not so, but can't be changed.

**All the methods above return the components relative to the local time zone.**

There are also their UTC-counterparts, that return day, month, year and so on for the time zone UTC+0: [getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). Just insert the `"UTC"` right after `"get"`.

If your local time zone is shifted relative to UTC, then the code below shows different hours:

```js run
// current date
let date = new Date();

// the hour in your current time zone
alert( date.getHours() );

// the hour in UTC+0 time zone (London time without daylight savings)
alert( date.getUTCHours() );
```

Besides the given methods, there are two special ones that do not have a UTC-variant:

[getTime()](mdn:js/Date/getTime)
: Returns the timestamp for the date -- a number of milliseconds passed from the January 1st of 1970 UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Returns the difference between UTC and the local time zone, in minutes:

    ```js run
    // if you are in timezone UTC-1, outputs 60
    // if you are in timezone UTC+3, outputs -180
>>>>>>> 20208769e528337949e946f526534d61d38bac47
    alert( new Date().getTimezoneOffset() );

    ```

<<<<<<< HEAD
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
=======
## Setting date components

The following methods allow to set date/time components:

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (sets the whole date by milliseconds since 01.01.1970 UTC)

Every one of them except `setTime()` has a UTC-variant, for instance: `setUTCHours()`.

As we can see, some methods can set multiple components at once, for example `setHours`. The components that are not mentioned are not modified.

For instance:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js run
let today = new Date();

today.setHours(0);
<<<<<<< HEAD
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
=======
alert(today); // still today, but the hour is changed to 0

today.setHours(0, 0, 0, 0);
alert(today); // still today, now 00:00:00 sharp.
```

## Autocorrection

The *autocorrection* is a very handy feature of `Date` objects. We can set out-of-range values, and it will auto-adjust itself.

For instance:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...is 1st Feb 2013!
```

Out-of-range date components are distributed automatically.

Let's say we need to increase the date "28 Feb 2016" by 2 days. It may be "2 Mar" or "1 Mar" in case of a leap-year. We don't need to think about it. Just add 2 days. The `Date` object will do the rest:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

<<<<<<< HEAD
この機能は、指定した期間後の日付を取得したいときによく利用されます。 例えば、"70秒後" の日付を取得しましょう。:
=======
That feature is often used to get the date after the given period of time. For instance, let's get the date for "70 seconds after now":
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

<<<<<<< HEAD
alert( date ); // 正しい日時を表示します
```

また、ゼロや負値をセットすることもできます。例えば:
=======
alert( date ); // shows the correct date
```

We can also set zero or even negative values. For example:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

<<<<<<< HEAD
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
=======
date.setDate(1); // set day 1 of month
alert( date );

date.setDate(0); // min day is 1, so the last day of the previous month is assumed
alert( date ); // 31 Dec 2015
```

## Date to number, date diff

When a `Date` object is converted to number, it becomes the timestamp same as `date.getTime()`:

```js run
let date = new Date();
alert(+date); // the number of milliseconds, same as date.getTime()
```

The important side effect: dates can be subtracted, the result is their difference in ms.

That can be used for time measurements:

```js run
let start = new Date(); // start measuring time

// do the job
>>>>>>> 20208769e528337949e946f526534d61d38bac47
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

<<<<<<< HEAD
let end = new Date(); // 終了
=======
let end = new Date(); // end measuring time
>>>>>>> 20208769e528337949e946f526534d61d38bac47

alert( `The loop took ${end - start} ms` );
```

<<<<<<< HEAD
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
=======
## Date.now()

If we only want to measure time, we don't need the `Date` object.

There's a special method `Date.now()` that returns the current timestamp.

It is semantically equivalent to `new Date().getTime()`, but it doesn't create an intermediate `Date` object. So it's faster and doesn't put pressure on garbage collection.

It is used mostly for convenience or when performance matters, like in games in JavaScript or other specialized applications.

So this is probably better:

```js run
*!*
let start = Date.now(); // milliseconds count from 1 Jan 1970
*/!*

// do the job
>>>>>>> 20208769e528337949e946f526534d61d38bac47
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
<<<<<<< HEAD
let end = Date.now(); // 終了
*/!*

alert( `The loop took ${end - start} ms` ); // 日付ではなく、数値を減算する
```

## ベンチマーク 

CPUを必要とする機能について、信頼できるベンチマークが必要な場合は注意が必要です。

例えば、2つの日付の差を計算する2つの関数を測定してみましょう。どちらがより速いでしょうか？

このようなパフォーマンス測定はよく "ベンチマーク" と呼ばれます。

```js
// date1 と date2 を持っており、これらの差をmsで返すのはどちらの関数が速いでしょう？
=======
let end = Date.now(); // done
*/!*

alert( `The loop took ${end - start} ms` ); // subtract numbers, not dates
```

## Benchmarking

If we want a reliable benchmark of CPU-hungry function, we should be careful.

For instance, let's measure two functions that calculate the difference between two dates: which one is faster?

Such performance measurements are often called "benchmarks".

```js
// we have date1 and date2, which function faster returns their difference in ms?
>>>>>>> 20208769e528337949e946f526534d61d38bac47
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

<<<<<<< HEAD
これら2つは正確に同じことをしますが、片方は日付のミリ秒を取得するために明示的な `date.getTime()` を使います。また、もう一方は日付の数値変換を当てにしています。これらの結果は常に同じです。

さて、どちらがより速いでしょうか？

最初に思いつくアイデアは、それらを何度も連続で実行し、その時間の差を測ることです。我々のケースでは、関数はとてもシンプルなので、約10万回程度行う必要があります。

測定してみましょう。:
=======
These two do exactly the same thing, but one of them uses an explicit `date.getTime()` to get the date in ms, and the other one relies on a date-to-number transform. Their result is always the same.

So, which one is faster?

The first idea may be to run them many times in a row and measure the time difference. For our case, functions are very simple, so we have to do it at least 100000 times.

Let's measure:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

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

<<<<<<< HEAD
なんということでしょう! `getTime()` を使う方が遥かに速いです! なぜかと言うと、この場合は型変換がなく、エンジンが最適化をするのがとても簡単なためです。

さて、私たちは測定結果を得ましたが、これはまだ良いベンチマークではありません。

`bench(diffSubtract)` を実行しているときにCPUは並列で何かをしていてリソースを消費しており、`bench(diffGetTime)` の実行時までにはその作業が完了していたと想像してください。

これは、現代のマルチプロセスOSでのよくある実際のシナリオです。

上の場合、結果として最初のベンチマークは2回目よりも利用できるCPUリソースが少なくなります。これは誤った結果を導きます。

**より信頼性の高いベンチマークを行うには、ベンチマーク全体を複数回再実行する必要があります。**

ここではそのコードのサンプルです:
=======
Wow! Using `getTime()` is so much faster! That's because there's no type conversion, it is much easier for engines to optimize.

Okay, we have something. But that's not a good benchmark yet.

Imagine that at the time of running `bench(diffSubtract)` CPU was doing something in parallel, and it was taking resources. And by the time of running `bench(diffGetTime)` that work has finished.

A pretty real scenario for a modern multi-process OS.

As a result, the first benchmark will have less CPU resources than the second. That may lead to wrong results.

**For more reliable benchmarking, the whole pack of benchmarks should be rerun multiple times.**

For example, like this:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

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
<<<<<<< HEAD
// bench(upperSlice) と bench(upperLoop) を交互に10回実行する
=======
// run bench(diffSubtract) and bench(diffGetTime) each 10 times alternating
>>>>>>> 20208769e528337949e946f526534d61d38bac47
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

<<<<<<< HEAD
現代のJavaScriptエンジンは、何度も実行される「ホットコード」に対してのみ高度な最適化を適用し始めます（ほとんど実行されないものを最適化する必要はないためです）。したがって、上記の例では、最初の実行は最適化されていません。 ヒートアップ(メインの実行の前の助走)を追加することもできます:

```js
// メインループの前の "ヒートアップ" のために追加
=======
Modern JavaScript engines start applying advanced optimizations only to "hot code" that executes many times (no need to optimize rarely executed things). So, in the example above, first executions are not well-optimized. We may want to add a heat-up run:

```js
// added for "heating up" prior to the main loop
>>>>>>> 20208769e528337949e946f526534d61d38bac47
bench(diffSubtract);
bench(diffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

<<<<<<< HEAD
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
=======
```warn header="Be careful doing microbenchmarking"
Modern JavaScript engines perform many optimizations. They may tweak results of "artificial tests" compared to "normal usage", especially when we benchmark something very small, such as how an operator works, or a built-in function. So if you seriously want to understand performance, then please study how the JavaScript engine works. And then you probably won't need microbenchmarks at all.

The great pack of articles about V8 can be found at <https://mrale.ph>.
```

## Date.parse from a string

The method [Date.parse(str)](mdn:js/Date/parse) can read a date from a string.

The string format should be: `YYYY-MM-DDTHH:mm:ss.sssZ`, where:

- `YYYY-MM-DD` -- is the date: year-month-day.
- The character `"T"` is used as the delimiter.
- `HH:mm:ss.sss` -- is the time: hours, minutes, seconds and milliseconds.
- The optional `'Z'` part denotes the time zone in the format `+-hh:mm`. A single letter `Z` would mean UTC+0.

Shorter variants are also possible, like `YYYY-MM-DD` or `YYYY-MM` or even `YYYY`.

The call to `Date.parse(str)` parses the string in the given format and returns the timestamp (number of milliseconds from 1 Jan 1970 UTC+0). If the format is invalid, returns `NaN`.

For instance:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
```

<<<<<<< HEAD
タイムスタンプから、即座に `new Date` オブジェクトを作ることができます。
=======
We can instantly create a `new Date` object from the timestamp:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

<<<<<<< HEAD
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

Node.js は `microtime` モジュールや他の方法を持っています。技術的には、どのデバイスや環境でも精度をあげることができます。単に `Date` にはないだけです。
=======
alert(date);
```

## Summary

- Date and time in JavaScript are represented with the [Date](mdn:js/Date) object. We can't create "only date" or "only time": `Date` objects always carry both.
- Months are counted from zero (yes, January is a zero month).
- Days of week in `getDay()` are also counted from zero (that's Sunday).
- `Date` auto-corrects itself when out-of-range components are set. Good for adding/subtracting days/months/hours.
- Dates can be subtracted, giving their difference in milliseconds. That's because a `Date` becomes the timestamp when converted to a number.
- Use `Date.now()` to get the current timestamp fast.

Note that unlike many other systems, timestamps in JavaScript are in milliseconds, not in seconds.

Sometimes we need more precise time measurements. JavaScript itself does not have a way to measure time in microseconds (1 millionth of a second), but most environments provide it. For instance, browser has [performance.now()](mdn:api/Performance/now) that gives the number of milliseconds from the start of page loading with microsecond precision (3 digits after the point):

```js run
alert(`Loading started ${performance.now()}ms ago`);
// Something like: "Loading started 34731.26000000001ms ago"
// .26 is microseconds (260 microseconds)
// more than 3 digits after the decimal point are precision errors, only the first 3 are correct
```

Node.js has `microtime` module and other ways. Technically, almost any device and environment allows to get more precision, it's just not in `Date`.
>>>>>>> 20208769e528337949e946f526534d61d38bac47
