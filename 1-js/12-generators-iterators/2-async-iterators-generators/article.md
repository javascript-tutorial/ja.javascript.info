
# 非同期イテレーションとジェネレータ

非同期イテレーションを使用すると、要求に応じて非同期に来るデータに対して反復処理することができます。

例えば、チャンクごとに何かをダウンロードしたり、単に非同期的に発生するイベントを待ち受け、それらをイテレートしたい場合、非同期イテレーションとジェネレータが役に立つかもしれません。
最初に単純な例を見て構文を把握し、次に実際のユースケースを見ていきましょう。

## 非同期イテレータ

非同期イテレータは通常のイテレータと本当に似ていますが、いくつか構文的な違いがあります。

チャプター <info:iterable> での "通常の" 反復可能オブジェクトは、次のようなものです:

```js run
let range = {
  from: 1,
  to: 5,

  // for..of は最初に一度だけこのメソッドを呼び出します
*!*
  [Symbol.iterator]() {
*/!*
    // ...イテレータオブジェクトを返します:
    // 以降、for..of はそのオブジェクトとのみ動作し、次の値を要求します
    return {
      current: this.from,
      last: this.to,

      // next() は for..of ループによる各イテレーションで呼ばれます
*!*
      next() { // (2)
        // 値をオブジェクトとして返す必要があります {done:.., value :...}
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1 then 2, then 3, then 4, then 5
}
```

必要であれば、通常のイテレータの詳細について [反復可能(iterable)に関するチャプター](info:iterable) を参照してください。

オブジェクトを非同期的に反復可能にするには、:
1. `Symbol.iterator` の代わりに、`Symbol.asyncIterator` を使う必要があります。
2. `next()` は promise を返す必要があります。
3. このようなオブジェクトをイテレートするには、`for await (let item of iterable)` ループを使用します。

以前のように、反復可能な `range` オブジェクトを作成しましょう。しかし、今度は1秒毎に値を非同期的に返します。:

```js run
let range = {
  from: 1,
  to: 5,

  // for..of は最初に一度だけこのメソッドを呼び出します
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...イテレータオブジェクトを返します:
    // 以降、for..of はそのオブジェクトとのみ動作し、次の値を要求します
    return {
      current: this.from,
      last: this.to,

      // next() は for..of ループによる各イテレーションで呼ばれます
*!*
      async next() { // (2)
        // 値をオブジェクトとして返す必要があります {done:.., value :...}
        // (async により、自動的に promise にラップされます)
*/!*

        // 非同期のことをするのに、内部で await が使えます:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

ご覧の通り、構成は通常のイテレータと似ています。:

1. オブジェクトを非同期的に反復可能にするために、`Symbol.asyncIterator` を持っていなければなりません。`(1)` 
2. それは primsie を返す `next()` メソッドを持つオブジェクトを返す必要があります。`(2)`
3. `next()` メソッドは `async` である必要はなく、promise を返す通常のメソッドかもしれませんが、`async` は中で `await` を使うことを可能にします。ここでは単に1秒だけ遅延させています。`(3)`
4. イテレートするために、`for await(let value of range)` `(4)` を使います。すなわち、"for" の後に "await" を追加します。これは `range[Symbol.asyncIterator]()` を一度だけ呼び出し、値に対して `next()` を呼び出します。

これは小さなチートシートです:

|       | イテレータ | 非同期イテレータ |
|-------|-----------|-----------------|
| 反復可能を提供するオブジェクトメソッド | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` が返す値は              | 任意の値         | `Promise`  |
| ループするのに使用するものは                          | `for..of`         | `for await..of` |


````warn header="スプレッド演算子は非同期には動作しません"
通常の、同期的なイテレータを要する機能は、非同期イテレータでは動作しません。

例えば、スプレッド演算子は動作しません:
```js
alert( [...range] ); // Error, no Symbol.iterator
```

`await` なしの `for..of` と同じで、`Symbol.iterator` を見つけることを期待しているので、これは当然の結果です。
````

## 非同期ジェネレータ

JavaScript が提供するジェネレータも反復可能です。

チャプター [](info:generators) にあった、ジェネレータを思い出してください。これは `start` から `end` までの一連の値を生成します。:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

通常、ジェネレータの中では `await` は使うことができません。すべての値は同期的にこなければなりません。

しかし、仮にジェネレータ本体で `await` の利用が必要な場合はどうすればよいでしょうか？例えば、ネットワークリクエストの実行です。

問題ありません、次のように `async` をその前に置くだけです。:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // await が使えます!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, then 2, then 3, then 4, then 5
  }

})();
```

これで `for await...of` で反復可能な非同期ジェネレータができました。

これはとてもシンプルです。`async` キーワードを追加すれは、ジェネレータは中で `await` が使えるようになり、promise や他の非同期関数と上手く機能します。

技術的には、非同期ジェネレータのもう1つの違いは、その `generator.next()` メソッドも非同期になり、promise を返すことです。

通常の非同期でないジェネレータでは、`result = generator.next()` の代わりに、次のようにして値を取得することができます。:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```

## 非同期ジェネレータを介した反復可能(iterable)

反復可能なオブジェクトを作りたいときは、`Symbol.iterator` を追加します。

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() { ...return object with next to make range iterable...  }
*/!*
}
```

`Symbol.iterator` の一般的なプラクティスは、以前の例にあるような `next` をもつ普通のオブジェクトよりも、ジェネレータを返すことです。

チャプター [](info:generators) の例を思い出しましょう。:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // [Symbol.iterator]: function*() の簡略記法
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

ここで、カスタムオブジェクト `range` は反復可能で、ジェネレータ `*[Symbol.iterator]` は値をリストするロジックを実装します。

もしジェネレータの中に非同期のアクションを追加したい場合、`Symbol.iterator` を非同期の `Symbol.asyncIterator` に置き換える必要があります。:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  async *[Symbol.asyncIterator]() { // [Symbol.asyncIterator]: async function*() と同じ
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // 各値の間で一時停止を設ける
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, then 2, then 3, then 4, then 5
  }

})();
```

これで、値は繰り返し毎に1秒の遅延で来ます。

## 実例

これまで、私たちは基本を理解するために簡単な例を見てきました。ここでは実際のユースケースを見ていきましょう。

ページング機能を持つデータを提供する多くのオンラインAPIがあります。例えば、ユーザの一覧が必要なとき、ページ毎に取得することができます。: リクエストは事前に定義されたカウント(e.g. 100 ユーザ)のユーザ情報を返し、次のページへの URL を提供します。

このパターンは非常に一般的で、ユーザに限ったものではありません。例えば、Github で同じようにページングの形式でコミットを取得することができます。:

- `https://api.github.com/repos/<repo>/commits` の形式でURLをリクエストします。
- 30 コミット分の JSON が返却され、`Link` ヘッダに次のページへのリンクも提供します。
- その後、そのリンクをより多くのコミットを取得するための次のリクエストとして使用したりすることができます。

私たちがほしいのは、次のように使うことができる反復可能なコミットの情報源です。:

```js
let repo = 'iliakan/javascript-tutorial-en'; // コミットを取得する Github リポジトリ

for await (let commit of fetchCommits(repo)) {
  // process commit
}
```

必要に応じてリクエストを行い、`fetchCommits` がコミットを得るようにしたいです。そして、ページネーションのすべてのことを意識させてください。それはシンプルな `for await..of` になります。

非同期ジェネレータを使うと、実装はとても簡単です:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github は user-agent ヘッダを要求します
    });

    const body = await response.json(); // (2) JSON として response をパース(コミットの配列)

    // (3) ヘッダにある次のページの URL を抽出
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage && nextPage[1];

    url = nextPage;

    for(let commit of body) { // (4) ページが終わるまで1つずつ yield commits
      yield commit;
    }
  }
}
```

1. ブラウザの `fetch` メソッドを使ってリモートURLからダウンロードします。必要に応じて認証やその他のヘッダを提供することができます。ここでは Github は `User-Agent` を要求します。
2. fetch の結果は JSON としてパースされます。これも `fetch` 固有のメソッドです。
3. レスポンスの `Link` ヘッダから次のページの URL を取得することができます。それは特別なフォーマットを持っているので、そのための正規表現を使います。次のページの URL はこのようになります。: `https://api.github.com/repositories/93253246/commits?page=2`。これは Github 自身により生成されます。
4. そして、受け取ったすべてのコミットを返し、それらが終了すると、次の `while(url)` イテレーションがトリガーされ、もう1つ要求を行います。

使用例 (コンソールにコミット者を表示します):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('iliakan/javascript-tutorial-en')) {

    console.log(commit.author.login);

    if (++count == 100) { // 100 コミットで停止しましょう
      break;
    }
  }

})();
```

これは私たちが欲しかったものです。内部のページネーションの仕組みは外部からは見えません。我々にとって、それはコミットを返す非同期ジェネレータです。

## サマリ

通常のイテレータとジェネレータは生成に時間のかからないデータと上手く機能します。

データが非同期に遅延ありでくることが想定される場合は、それらの非同期に対応したものを使用することができ、`for..of` の代わりに `for await..of` とします。

非同期と通常のイテレータの構文の違い:

|       | イテレータ | 非同期イテレータ |
|-------|-----------|-----------------|
| 反復可能を提供するオブジェクトメソッド | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` が返す値は              | 任意の値         | `Promise`  |

非同期と通常のジェネレータの構文の違い:

|       | ジェネレータ | 非同期ジェネレータ |
|-------|-----------|-----------------|
| 宣言 | `function*` | `async function*` |
| `generator.next()` が返却するもの              | `{value:…, done: true/false}`         | `{value:…, done: true/false}` に解決する `Promise` |

Web 開発では、データがチャンクごとに流れるとき、データのストリームを扱うことがよくあります。例えば、大きなファイルのダウンロードやアップロードです。

非同期ジェネレータを使用して、このようなデータを処理することもできますが、Stream と呼ばれる別の API もあります。これは、データを変換してあるストリームから別のストリームに渡す特別なインターフェースを提供するため、より便利な場合があります(e.g ある場所からダウンロードして、すぐに別の場所に送信する場合)。しかし、これらはより複雑です。

Stream API は JavaScript 言語標準の一部ではありません。Stream と非同期ジェネレータは互いに補完しあい、どちらも非同期のデータフローを処理するのに優れた方法です。
