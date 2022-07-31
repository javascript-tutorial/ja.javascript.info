
# 非同期イテレーションとジェネレータ

非同期イテレーションを使用すると、要求に応じて非同期に来るデータに対して反復処理することができます。例えば、ネットワーク経由でチャンクごとに何かをダウンロードする場合です。そして、非同期ジェネレータはそれをさらに便利にします。

最初に単純な例を見て構文を把握し、その後、実際のユースケースを見ていきましょう。

## 反復可能（iterable）を思い出してください

反復可能（iterable）についてのトピックを思い出しましょう。

ここでは `range` のようなオブジェクトがあると考えます:
```js
let range = {
  from: 1,
  to: 5
};
```

そして、これに対して `for(value of range)` のように `for..of` を使用して、`1` から `5` までの値を取得したいとします。

つまり、オブジェクトに *反復する機能* を追加したい、です。

これは `Symbol.iterator` という名前の特別なメソッドを使用することで実装できます。

- このメソッドはループが開始されたときに `for..of` コンストラクトで呼び出され、`next` メソッドをもつオブジェクトを返却する必要があります。
- 各イテレーションのたびに、`next()` メソッドが実行され、次の値を取得します。
- `next()` は `{done: true/false, value:<loop value>}` の形式の値の返却が必要で、`done:true` はループが終わりであることを意味します。

以下は、反復可能な `range` の実装です:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.iterator]() { // for..of の最初に一度呼ばれます
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      next() { // 各イテレーションで呼ばれ、次の値を取得します
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

不明点があれば、通常のイテレータの詳細について [](info:iterable) を参照してください。

## 非同期の反復可能

非同期のイテレーションは、非同期（`setTimeout` や他の種類の遅延処理の後）に値がくるときに必要になります。

一般的なケースは、オブジェクトが次の値を提供するためにネットワークリクエストを行う必要がある場合です。実際の例については、少し後で説明します。

オブジェクトを非同期的に反復可能とするには、:

1. `Symbol.iterator` の代わりに、`Symbol.asyncIterator` を使用します。
2. `next()` は promise を返す必要があります（次の値で解決される）。
    - `async` キーワードはこれを処理します。シンプルに `async next()` とできます。
3. このようなオブジェクトをイテレートするには、`for await (let item of iterable)` ループを使用します。
    - `await` に留意してください。

最初の例として、先程と同様、反復可能な `range` オブジェクトを作成しましょう。ですが、今度は1秒毎に値を非同期的に返します。:

やるべきことは、上のコードに対し少し置き換えるだけです:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      async next() { // (2)
*/!*

*!*
        // asyc next の中で、 "await" が使えます
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
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

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

ご覧の通り、構成は通常のイテレータと同様です:

1. オブジェクトを非同期的に反復可能にするために、`Symbol.asyncIterator` メソッドが必要です。 `(1)`
2. それは promise を返す `next()` メソッドを持つオブジェクトを返す必要があります。`(2)`
3. `next()` メソッドは `async` である必要はなく、promise を返す通常のメソッドかもしれませんが、`async` は中では `await` が使えるので便利です。ここでは単に1秒だけ遅延させています。`(3)`
4. イテレートするために、`for await(let value of range)` `(4)` を使用しています。すなわち、"for" の後に "await" を追加します。これは `range[Symbol.asyncIterator]()` を一度だけ呼び出し、値に対して `next()` を呼び出します。

以下は違いを示した表です:

|       | イテレータ | 非同期イテレータ |
|-------|-----------|-----------------|
| 反復可能を提供するオブジェクトメソッド | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` が返す値は              | 任意の値         | `Promise`  |
| ループするのに使用するものは                          | `for..of`         | `for await..of` |

````warn header="スプレッド演算子 `...` は非同期には動作しません"
通常の、同期的なイテレータを要する機能は、非同期イテレータでは動作しません。

例えば、スプレッド演算子は動作しません:
```js
alert( [...range] ); // Error, no Symbol.iterator
```

`Symbol.asyncIterator` ではなく、`Symbol.iterator` があることを期待しているので、これは当然の結果です。

また、`for..of` のケースに対しても同様です: `await` なしの構文は `Symbol.iterator` を必要とします。
````

## Recall generators

ここでジェネレータを思い出しましょう。ジェネレータを使用すると、イテレーションのコードをはるかに短くすることができます。ほとんどの場合、反復可能にしたい場合、ジェネレータを使用します。

単純にするために、いくつかの重要な点を省略すると、ジェネレータは "値を生成(yield)する関数" です。この詳細は [](info:generators) で説明しています。

ジェネレータは `function*` ( * に注目)でラベル付けされたもので、値を生成すのに `yield` を使用します。ジェネレータをループするのに `for..of` が利用できます。

この例は `start` から end` までの一連の値を生成します:

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

すでにご存知の通り、オブジェクトを反復可能にするには `Symbol.iterator` の追加が必要です。

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <object with next to make range iterable>
  }
*/!*
}
```

`Symbol.iterator` の一般的なプラクティスはジェネレータを返すことで、以下のようにコードをより短くできます:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // [Symbol.iterator]: function*() の短縮形
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

より詳細を知りたい場合は、[](info:generators) の章を参照してください。

通常のジェネレータでは、`await` は使用できません。すべての値は `for..of` 構造によって同期的である必要があります。

仮に、非同期で値を生成したい場合はどうすればよいでしょうか? 例えばネットワークリクエスト。

それができるように、非同期ジェネレータじ変更しましょう。

## 非同期ジェネレータ

ほとんどの実践的なアプリケーションでは、一連の値を非同期的に生成するオブジェクトを作成したい場合、非同期ジェネレータが使えます。

構文はシンプルです。`function*` の前に `async` をつけます。これでジェネレートが非同期になります。

また、次のようにそれをイテレートするのに、`for await (...)` を使用します。

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
    alert(value); // 1, then 2, then 3, then 4, then 5 (間に遅延をはさみながら)
  }

})();
```

ジェネレータは非同期なので、その中で `await` や promise に依存するネットワークリクエストを実行したりできます。

````smart header="内部的な違い"
技術的には、ジェネレータの詳細を覚えている読者であれば、内部的な違いに気づくかもしれません。

非同期ジェネレータの場合、`generator.nex()` メソッドは非同期であり、promise を返します。

通常のジェネレータでは、`result = generator.next()` を使用して値を取得します。非同期ジェネレータでは、次のように `await` を追加する必要があります:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
そういうわけで、非同期ジェネレータは `for await...of` で動作します。
````

### Async iterable range

通常のジェネレータは `Symbol.iterator` を使用することで、イテレーションコードをより短くすることができます。

それと同様に、非同期ジェネレータも `Symbol.asyncIterator` を使用することで、非同期のイテレーションを実装することができます。

例えば、1秒に1回、非同期に値を生成する `range` オブジェクトを作りたい場合、`Symbol.iterator` を非同期の `Symbol.asyncIterator` に置き換えることで実現できます:

```js run
let range = {
  from: 1,
  to: 5,

  // この行は次と同じです: [Symbol.asyncIterator]: async function*() {
*!*
  async *[Symbol.asyncIterator]() {
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // 値の間に間隔を作り、なにかを待ちます
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

```smart
技術的には、`Symbol.iterator` と `Symbol.asyncIterator` 両方をオブジェクトに追加することができます。そのため、同期 (`for..of`) と非同期 (`for await..of`) 両方で反復可能です。

ただし、実際にはそれは微妙です。
```

## 実例: ページネーション　データ

ここまで基本的な例を見てきました。ここでは実際のユースケースを見ていきましょう。

ページング機能を持つデータを提供する多くのオンラインAPIがあります。例えば、ユーザの一覧が必要なとき、ページ毎に取得することができます。: リクエストは事前に定義されたカウント(e.g. 100 ユーザ)のユーザ情報を返し、次のページへの URL を提供します。

このパターンは非常に一般的で、ユーザに限ったものではありません。

例えば、Github で同じようにページングの形式でコミットを取得することができます。:

- `https://api.github.com/repos/<repo>/commits` の形式でURLをリクエストします。
- 30 コミット分の JSON が返却され、`Link` ヘッダに次のページへのリンクも提供します。
- その後、そのリンクをより多くのコミットを取得するための次のリクエストとして使用したりすることができます。

いま、コミットを取得するより簡単な方法がほしいです。

`fetchCommits(repo)` 関数を作り、必要に応じてリクエストを行いコミットを取得します。そして、ページネーションについて考慮します。それは単純な非同期イテレーション `for await..of` です。

使い方は以下の通りです:

```js
for await (let commit of fetchCommits("username/repository")) {
  // process commit
}
```

これがその関数で、非同期ジェネレータで実装しています:

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

どのように動くかの説明です:

1. ブラウザの [fetch](info:fetch) メソッドを使ってコミットをダウンロードします。

    - 最初のURLは `https://api.github.com/repos/<repo>/commits` で、次のページはレスポンスヘッダの `Link` にあります。
    - `fetch` メソッドでは必要に応じて authorization や他のヘッダ を付与できます。ここでは Github は `User-Agent` を要求します。
2. コミットは JSON 形式で返却荒れます。
3. レスポンスの `Link` ヘッダから次のページの URL を取得できます。それは特別なフォーマットなので、そのための正規表現（[正規表現](info:regular-expressions)で学びます）を使います。
    - 次のページの URL はこのようになります。: `https://api.github.com/repositories/93253246/commits?page=2`。これは Github 自身により生成されます。
4. そして、受け取ったすべてのコミットを返し、それらが終了すると、次の `while(url)` イテレーションがトリガーされ、もう1つ要求を行います。

使用例 (コンソールにコミット者を表示します):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // let's stop at 100 commits
      break;
    }
  }

})();

// 補足: 外部のサンドボックスで実行している場合、上で記述した fetchCommits 関数をここに貼り付ける必要があります。
```

これは私たちが欲しかったものです。

内部のページネーションの仕組みは外部からは見えません。我々にとって、それはコミットを返す非同期ジェネレータです。

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

非同期ジェネレータを使用して、このようなデータを処理することもできます。また、ブラウザなどの一部の環境では、Stream と呼ばれる別の API もあることに注目してください。これは、データを変換してあるストリームから別のストリームに渡す特別なインターフェースを提供しますす(e.g ある場所からダウンロードして、すぐに別の場所に送信する場合)。