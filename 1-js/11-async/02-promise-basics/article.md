# Promise

あなたはトップシンガーで、ファンは今後のシングルについて絶えず尋ねていると想像してください。

それに関して解放されるため、あなたは公開時にその曲を送ることを約束します。 また、ファンに更新を購読できるリストを提供します。 彼らはメールアドレスを記入することができ、曲が利用可能になるとすべての購読者がすぐに受け取れるようになります。 
そして、万が一何か手違いがありその曲を発表する計画が取り消されたとしても、彼らはその通知を受けとることができるでしょう。

みんな幸せです: ファンはこれ以上あなたの元へ押し寄せることはしません。また、ファンはその歌を見逃すことはありません。

これはプログラミングにおいてしばしば抱くことに対する現実的なアナロジーです。:

1. 何かを行い時間を必要とする "生成コード"。例えば、コードはリモートスクリプトをロードします。それは "シンガー" です。
2. 準備が整ったらすぐ "生成コード" の結果が欲しい "消費コード"。多くの関数がその結果を必要とするかもしれません。それらは "ファン" です。
3. *promise* は "生成コード" と "消費コード" をリンクする特別な JavaScript オブジェクトです。今回のアナロジーではそれは "購読リスト" です。生成コードは約束された結果を生成するために必要な時間をとります。そして "promise" は準備ができたら、購読したすべてのコードが結果を利用できるようにします。

JavaScript の promise は追加の特徴や制限があり単純な 購読リスト よりも複雑であるため、このアナロジーはあまり正確ではありません。しかし、最初に理解には良いです。

promise オブジェクトのコンストラクタ構文は次の通りです:

```js
let promise = new Promise(function(resolve, reject) {
  // executor (生成コード, "シンガー")
});
```

`new Promise` へ渡される関数は *executor(執行者)* と呼ばれます。primise が作成されると、自動的に呼ばれます。それは最終的に結果と一緒に終了する生成コードを含んでいます。上記のアナロジーの言葉では、executor は "シンガー" です。

生成された `promise` オブジェクトは内部プロパティを持っています:

- `state` -- 最初は "pending(保留中)" であり、その後 "fulfilled(完了)" もしくは "rejected(拒否)" に変更されます。
- `result` -- 任意の値です。初期値は `undefined` です。

executor がジョブを終了した時、次の中のいずれか1つを呼びます:

- `resolve(value)` -- ジョブが正常に終了したことを示します。:
    - `state` を `"fulfilled"` に設定します,
    - `result` を `value` に設定します.
- `reject(error)` -- エラーが発生したことを示します:
    - `state` を `"rejected"` に設定します,
    - `result` を `error` に設定します.

![](promise-resolve-reject.svg)

ここには、シンプルな executor があります。:

```js run
let promise = new Promise(function(resolve, reject) {
  // promise が作られたとき、関数は自動的に実行されます

  alert(resolve); // function () { [native code] }
  alert(reject);  // function () { [native code] }

  // 1秒後、ジョブが "done!" という結果と一緒に完了したことを合図します
  setTimeout(() => *!*resolve("done!")*/!*, 1000);
});
```

上のコードを実行すると2つの事が見えます:

1. executor は自動的かつ即座に呼ばれます(`new Promise` によって)。
2. executor は2つの引数を受け取ります: `resolve` と `reject` です -- これらの関数は JavaScript エンジンから来ており、これらを作る必要はありません。代わりに、executor は準備ができた際にそれらを呼ぶ必要があります。

1秒後、executor は結果を生成するために `resolve("done")` を呼び出します。:

![](promise-resolve-1.svg)

これは、 "ジョブが正常に完了した" 例でした。

そして、次はエラーで executor が promise を拒否する例です。:

```js
let promise = new Promise(function(resolve, reject) {
  // 1秒後、ジョブがエラーで終わったことを合図します
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

![](promise-reject-1.svg)

要約すると、executor はジョブ(通常は時間のかかる何か)を行い、その後、対応する promise オブジェクトの状態を変更するために、`resolve` または `reject` を呼び出します。

解決または拒否されている promise は、 "pending" の promise とは対象的に "settled" と呼ばれます。

````smart header="1つの結果またはエラーのみです"
executor は1つの `resolve` または `reject` だけを呼びだす必要があります。promise の状態の変化は最後のものです。

さらなるすべての `resolve` や `reject` は無視されます:

```js
let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // 無視されます
  setTimeout(() => resolve("…")); // 無視されます
});
```

この考えは、executor により行われたジョブは1つの結果またはエラーのみを持つということです。プログラミングでは、ストリームやキューなど、多くの "フロー" の結果を許容する他のデータ構造が存在します。それらには promise と比較したときに長所と短所があります。それらは JavaScript のコアではサポートされておらず、promsise が提供する幾つかの言語機能が不足していますが、ここでは promise に集中するためにそれらは説明しません。

また、1つ以上の引数で `resolve/reject` を呼び出した場合、最初の引数が使われ、次の引数は無視されます。
````

```smart header="`Error` オブジェクトで reject する"
技術的には、任意の型の引数で `reject` を呼び出すことが可能です(`resolve` のように)。しかし、`reject` (またはそれを継承したもの)では、`Error` オブジェクトを利用することを推奨します。その理由は後ほど明らかになります。
```

````smart header="Resolve/rejectは即時実行可能です"
実際には、通常 executor は非同期で何かを行い、暫く時間が経過した後に `resolve/reject` を呼び出しますが、それは必須ではありません。次のように、すぐに `resolve` や `reject` を呼び出すことが可能です。:

```js
let promise = new Promise(function(resolve, reject) {
  resolve(123); // 即座に結果を返します: 123
});
```

例えば、ジョブの開始後、すでに完了していることが分かったとき等です。技術的には即座に promise を解決することは問題ありません。
````

```smart header="`state` と `result` は内部のプロパティです"
promise オブジェクトのプロパティ `state` と `result` は内部的なものです。我々のコードから直接アクセスすることはできません。代わりに `.then/catch` メソッドを利用します。それらについては下で説明します。
```

## 消費者: ".then" and ".catch" 

promise オブジェクトは生成コード(executor)と消費関数(結果/エラーを受け取りたいもの)の間のリンクとして機能します。消費関数は `promise.then` と `promise.catch` メソッドを使用して登録することができます。

`.then` の構文は次の通りです:

```js
promise.then(
  function(result) { /* 成功した結果を扱う */ },
  function(error) { /* エラーを扱う */ }
);
```

最初の関数の引数は、promise が解決され結果を得たときに実行されます。そして2つ目は -- 拒否され、エラーを取得したときに実行されます。

例:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve は .then の最初の関数を実行する
promise.then(
*!*
  result => alert(result), // 1秒後に "done!" を表示
*/!*
  error => alert(error) // 実行されない
);
```

拒否の場合:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject は .then の2つ目の関数を実行する
promise.then(
  result => alert(result), // 実行されない
*!*
  error => alert(error) // 1秒後に "Error: Whoops!" を表示
*/!*
);
```

もし、正常完了の場合だけを扱いたい場合は、`.then` に1つの引数だけを指定することもできます。:

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

*!*
promise.then(alert); // 1秒後に "done!" を表示
*/!*
```

エラーの場合だけ興味があれば、`.then(null, function)` またはその "エイリアス" である `.catch(function)` を使います。


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

*!*
// .catch(f) は promise.then(null, f) と同じです
promise.catch(alert); // 1秒後に "Error: Whoops!" を表示
*/!*
```

`.catch(f)` の呼び出しは、`.then(null, f)` の完全な類似物であり、単に簡略化したものです。

````smart header="完了済みの promises の `then` はすぐに実行されます"
promise が pending の場合、`.then/catch` ハンドラは結果を待ちます。そうではなく、promise がすでに settled である場合は直ちに実行されます。:

```js run
// 即座に promise が解決されます
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (すぐに表示されます)
```

これは時間がかかることもあればすぐに終わることもあるジョブにとっては便利です。ハンドラは両方の場合に実行されることが保証されています。
````

````smart header="`.then/catch` のハンドラは常に非同期です"
さらに正確に言うと、`.then/catch` ハンドラが実行されるとき、それは最初に内部キューに入ります。JavaScript エンジンはキューからハンドラを取り出し、`setTimeout(..., 0)` と同じように現在のコードが終了した際に実行します。

言い換えると、`.then(handler)` がトリガするとき、それは `setTimeout(handler, 0)` のようなことをします。

下の例では、promise は直ちに解決されます。なので、`.then(alert)` はすぐにトリガします: `alert` 呼び出しはキューに格納され、コードが終了した後即座に実行します。

```js run
// 即座に解決された promise
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (現在のコード終了直後)

alert("code finished"); // このアラートが最初に表示されます
```

したがって、`.then` の後にあるコードは常にハンドラの前に実行されます(たとえ事前に解決された promise だとしても)。通常それは重要ではありませんが、場面によっては重要な場合があります。
````

さて、非同期コードを書くにあたり、promise がどのように役立つか、より実践的な例を見てみましょう。

## 例: loadScript 

以前のチャプターで、スクリプトを読み込むための関数 `loadScript` がありました。

思い出すために、ここにコールバックベースのパターンを示します。:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error ` + src));

  document.head.append(script);
}
```

promise を使って再実装してみましょう。

新しい関数 `loadScript` はコールバックを必要としません。代わりに、読み込みが完了したときに解決する promise オブジェクトを生成し返します。外部コードは `.then` を使用してそれにハンドラを追加することができます。:

```js run
function loadScript(src) {  
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error("Script load error: " + src));

    document.head.append(script);
  });
}
```

使用方法:

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js");

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('One more handler to do something else!'));
```

コールバックベースのパターンと比べると利点がすぐにわかります。:

```compare minus="Callbacks" plus="Promises"
- `loadScript` を呼び出す際、`callback` 関数を準備する必要があります。つまり、`loadScript` が呼ばれる *前* に、その結果で何をするのか知っておかなければなりません。
- コールバックは1つだけです。
+ Promise を使うと自然な順番で物事をコード化することができます。最初に `loadScript` を走らせ、`.then` はその結果をどうするかを記述します。
+ いつでも、必要なだけ promise に対する `.then` を呼び出すことが可能です。
```

promise はより良いコードフローと柔軟性をもたらします。しかしもっと多くのことがあります。それらについては次のチャプターで見ていきましょう。
