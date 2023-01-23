
<<<<<<< HEAD
# 非同期イテレーションとジェネレータ

非同期イテレーションを使用すると、要求に応じて非同期に来るデータに対して反復処理することができます。例えば、ネットワーク経由でチャンクごとに何かをダウンロードする場合です。そして、非同期ジェネレータはそれをさらに便利にします。

最初に単純な例を見て構文を把握し、その後、実際のユースケースを見ていきましょう。

## 反復可能（iterable）を思い出してください

反復可能（iterable）についてのトピックを思い出しましょう。

ここでは `range` のようなオブジェクトがあると考えます:
=======
# Async iteration and generators

Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.

Let's see a simple example first, to grasp the syntax, and then review a real-life use case.

## Recall iterables

Let's recall the topic about iterables. 

The idea is that we have an object, such as `range` here:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
let range = {
  from: 1,
  to: 5
};
```

<<<<<<< HEAD
そして、これに対して `for(value of range)` のように `for..of` を使用して、`1` から `5` までの値を取得したいとします。

つまり、オブジェクトに *反復する機能* を追加したい、です。

これは `Symbol.iterator` という名前の特別なメソッドを使用することで実装できます。

- このメソッドはループが開始されたときに `for..of` コンストラクトで呼び出され、`next` メソッドをもつオブジェクトを返却する必要があります。
- 各イテレーションのたびに、`next()` メソッドが実行され、次の値を取得します。
- `next()` は `{done: true/false, value:<loop value>}` の形式の値の返却が必要で、`done:true` はループが終わりであることを意味します。

以下は、反復可能な `range` の実装です:
=======
...And we'd like to use `for..of` loop on it, such as `for(value of range)`, to get values from `1` to `5`.

In other words, we want to add an *iteration ability* to the object.

That can be implemented using a special method with the name `Symbol.iterator`:

- This method is called in by the `for..of` construct when the loop is started, and it should return an object with the `next` method.
- For each iteration, the `next()` method is invoked for the next value.
- The `next()` should return a value in the form `{done: true/false, value:<loop value>}`, where `done:true` means the end of the loop.

Here's an implementation for the iterable `range`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let range = {
  from: 1,
  to: 5,

*!*
<<<<<<< HEAD
  [Symbol.iterator]() { // for..of の最初に一度呼ばれます
=======
  [Symbol.iterator]() { // called once, in the beginning of for..of
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
<<<<<<< HEAD
      next() { // 各イテレーションで呼ばれ、次の値を取得します
=======
      next() { // called every iteration, to get the next value
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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

<<<<<<< HEAD
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
=======
If anything is unclear, please visit the chapter [](info:iterable), it gives all the details about regular iterables.

## Async iterables

Asynchronous iteration is needed when values come asynchronously: after `setTimeout` or another kind of delay. 

The most common case is that the object needs to make a network request to deliver the next value, we'll see a real-life example of it a bit later.

To make an object iterable asynchronously:

1. Use `Symbol.asyncIterator` instead of `Symbol.iterator`.
2. The `next()` method should return a promise (to be fulfilled with the next value).
    - The `async` keyword handles it, we can simply make `async next()`.
3. To iterate over such an object, we should use a `for await (let item of iterable)` loop.
    - Note the `await` word.

As a starting example, let's make an iterable `range` object, similar like the one before, but now it will return values asynchronously, one per second.

All we need to do is to perform a few replacements in the code above:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
<<<<<<< HEAD
        // asyc next の中で、 "await" が使えます
=======
        // note: we can use "await" inside the async next:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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

<<<<<<< HEAD
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
=======
As we can see, the structure is similar to regular iterators:

1. To make an object asynchronously iterable, it must have a method `Symbol.asyncIterator` `(1)`.
2. This method must return the object with `next()` method returning a promise `(2)`.
3. The `next()` method doesn't have to be `async`, it may be a regular method returning a promise, but `async` allows us to use `await`, so that's convenient. Here we just delay for a second `(3)`.
4. To iterate, we use `for await(let value of range)` `(4)`, namely add "await" after "for". It calls `range[Symbol.asyncIterator]()` once, and then its `next()` for values.

Here's a small table with the differences:

|       | Iterators | Async iterators |
|-------|-----------|-----------------|
| Object method to provide iterator | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is              | any value         | `Promise`  |
| to loop, use                          | `for..of`         | `for await..of` |

````warn header="The spread syntax `...` doesn't work asynchronously"
Features that require regular, synchronous iterators, don't work with asynchronous ones.

For instance, a spread syntax won't work:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
alert( [...range] ); // Error, no Symbol.iterator
```

<<<<<<< HEAD
`Symbol.asyncIterator` ではなく、`Symbol.iterator` があることを期待しているので、これは当然の結果です。

また、`for..of` のケースに対しても同様です: `await` なしの構文は `Symbol.iterator` を必要とします。
=======
That's natural, as it expects to find `Symbol.iterator`, not `Symbol.asyncIterator`.

It's also the case for `for..of`: the syntax without `await` needs `Symbol.iterator`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
````

## Recall generators

<<<<<<< HEAD
ここでジェネレータを思い出しましょう。ジェネレータを使用すると、イテレーションのコードをはるかに短くすることができます。ほとんどの場合、反復可能にしたい場合、ジェネレータを使用します。

単純にするために、いくつかの重要な点を省略すると、ジェネレータは "値を生成(yield)する関数" です。この詳細は [](info:generators) で説明しています。

ジェネレータは `function*` ( * に注目)でラベル付けされたもので、値を生成すのに `yield` を使用します。ジェネレータをループするのに `for..of` が利用できます。

この例は `start` から end` までの一連の値を生成します:
=======
Now let's recall generators, as they allow to make iteration code much shorter. Most of the time, when we'd like to make an iterable, we'll use generators.

For sheer simplicity, omitting some important stuff, they are "functions that generate (yield) values". They are explained in detail in the chapter [](info:generators).

Generators are labelled with `function*` (note the star) and use `yield` to generate a value, then we can use `for..of` to loop over them.

This example generates a sequence of values from `start` to `end`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
すでにご存知の通り、オブジェクトを反復可能にするには `Symbol.iterator` の追加が必要です。
=======
As we already know, to make an object iterable, we should add `Symbol.iterator` to it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
`Symbol.iterator` の一般的なプラクティスはジェネレータを返すことで、以下のようにコードをより短くできます:
=======
A common practice for `Symbol.iterator` is to return a generator, it makes the code shorter, as you can see:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  *[Symbol.iterator]() { // [Symbol.iterator]: function*() の短縮形
=======
  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

<<<<<<< HEAD
より詳細を知りたい場合は、[](info:generators) の章を参照してください。

通常のジェネレータでは、`await` は使用できません。すべての値は `for..of` 構造によって同期的である必要があります。

仮に、非同期で値を生成したい場合はどうすればよいでしょうか? 例えばネットワークリクエスト。

それができるように、非同期ジェネレータじ変更しましょう。

## 非同期ジェネレータ

ほとんどの実践的なアプリケーションでは、一連の値を非同期的に生成するオブジェクトを作成したい場合、非同期ジェネレータが使えます。

構文はシンプルです。`function*` の前に `async` をつけます。これでジェネレートが非同期になります。

また、次のようにそれをイテレートするのに、`for await (...)` を使用します。
=======
Please see the chapter [](info:generators) if you'd like more details.

In regular generators we can't use `await`. All values must come synchronously, as required by the `for..of` construct.

What if we'd like to generate values asynchronously? From network requests, for instance. 

Let's switch to asynchronous generators to make it possible.

## Async generators (finally)

For most practical applications, when we'd like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.

The syntax is simple: prepend `function*` with `async`. That makes the generator asynchronous.

And then use `for await (...)` to iterate over it, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
<<<<<<< HEAD
    // await が使えます!
=======
    // Wow, can use await!
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
<<<<<<< HEAD
    alert(value); // 1, then 2, then 3, then 4, then 5 (間に遅延をはさみながら)
=======
    alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }

})();
```

<<<<<<< HEAD
ジェネレータは非同期なので、その中で `await` や promise に依存するネットワークリクエストを実行したりできます。

````smart header="内部的な違い"
技術的には、ジェネレータの詳細を覚えている読者であれば、内部的な違いに気づくかもしれません。

非同期ジェネレータの場合、`generator.nex()` メソッドは非同期であり、promise を返します。

通常のジェネレータでは、`result = generator.next()` を使用して値を取得します。非同期ジェネレータでは、次のように `await` を追加する必要があります:
=======
As the generator is asynchronous, we can use `await` inside it, rely on promises, perform network requests and so on.

````smart header="Under-the-hood difference"
Technically, if you're an advanced reader who remembers the details about generators, there's an internal difference.

For async generators, the `generator.next()` method is asynchronous, it returns promises.

In a regular generator we'd use `result = generator.next()` to get values. In an async generator, we should add `await`, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
<<<<<<< HEAD
そういうわけで、非同期ジェネレータは `for await...of` で動作します。
=======
That's why async generators work with `for await...of`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
````

### Async iterable range

<<<<<<< HEAD
通常のジェネレータは `Symbol.iterator` を使用することで、イテレーションコードをより短くすることができます。

それと同様に、非同期ジェネレータも `Symbol.asyncIterator` を使用することで、非同期のイテレーションを実装することができます。

例えば、1秒に1回、非同期に値を生成する `range` オブジェクトを作りたい場合、`Symbol.iterator` を非同期の `Symbol.asyncIterator` に置き換えることで実現できます:
=======
Regular generators can be used as `Symbol.iterator` to make the iteration code shorter.

Similar to that, async generators can be used as `Symbol.asyncIterator` to implement the asynchronous iteration.

For instance, we can make the `range` object generate values asynchronously, once per second, by replacing synchronous `Symbol.iterator` with asynchronous `Symbol.asyncIterator`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // この行は次と同じです: [Symbol.asyncIterator]: async function*() {
=======
  // this line is same as [Symbol.asyncIterator]: async function*() {
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*!*
  async *[Symbol.asyncIterator]() {
*/!*
    for(let value = this.from; value <= this.to; value++) {

<<<<<<< HEAD
      // 値の間に間隔を作り、なにかを待ちます
=======
      // make a pause between values, wait for something  
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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

<<<<<<< HEAD
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
=======
Now values come with a delay of 1 second between them.

```smart
Technically, we can add both `Symbol.iterator` and `Symbol.asyncIterator` to the object, so it's both synchronously (`for..of`) and asynchronously (`for await..of`) iterable.

In practice though, that would be a weird thing to do.
```

## Real-life example: paginated data

So far we've seen basic examples, to gain understanding. Now let's review a real-life use case.

There are many online services that deliver paginated data. For instance, when we need a list of users, a request returns a pre-defined count (e.g. 100 users) - "one page", and provides a URL to the next page.

This pattern is very common. It's not about users, but just about anything. 

For instance, GitHub allows us to retrieve commits in the same, paginated fashion:

- We should make a request to `fetch` in the form `https://api.github.com/repos/<repo>/commits`.
- It responds with a JSON of 30 commits, and also provides a link to the next page in the `Link` header.
- Then we can use that link for the next request, to get more commits, and so on.

For our code, we'd like to have a simpler way to get commits.

Let's make a function `fetchCommits(repo)` that gets commits for us, making requests whenever needed. And let it care about all pagination stuff. For us it'll be a simple async iteration `for await..of`.

So the usage will be like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
for await (let commit of fetchCommits("username/repository")) {
  // process commit
}
```

<<<<<<< HEAD
これがその関数で、非同期ジェネレータで実装しています:
=======
Here's such function, implemented as async generator:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
<<<<<<< HEAD
      headers: {'User-Agent': 'Our script'}, // github は user-agent ヘッダを要求します
    });

    const body = await response.json(); // (2) JSON として response をパース(コミットの配列)

    // (3) ヘッダにある次のページの URL を抽出
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage && nextPage[1];

    url = nextPage;

    for(let commit of body) { // (4) ページが終わるまで1つずつ yield commits
=======
      headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
    });

    const body = await response.json(); // (2) response is JSON (array of commits)

    // (3) the URL of the next page is in the headers, extract it
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) yield commits one by one, until the page ends
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
      yield commit;
    }
  }
}
```

<<<<<<< HEAD
どのように動くかの説明です:

1. ブラウザの [fetch](info:fetch) メソッドを使ってコミットをダウンロードします。

    - 最初のURLは `https://api.github.com/repos/<repo>/commits` で、次のページはレスポンスヘッダの `Link` にあります。
    - `fetch` メソッドでは必要に応じて authorization や他のヘッダ を付与できます。ここでは Github は `User-Agent` を要求します。
2. コミットは JSON 形式で返却荒れます。
3. レスポンスの `Link` ヘッダから次のページの URL を取得できます。それは特別なフォーマットなので、そのための正規表現（[正規表現](info:regular-expressions)で学びます）を使います。
    - 次のページの URL はこのようになります。: `https://api.github.com/repositories/93253246/commits?page=2`。これは Github 自身により生成されます。
4. そして、受け取ったすべてのコミットを返し、それらが終了すると、次の `while(url)` イテレーションがトリガーされ、もう1つ要求を行います。

使用例 (コンソールにコミット者を表示します):
=======
More explanations about how it works:

1. We use the browser [fetch](info:fetch) method to download the commits.

    - The initial URL is `https://api.github.com/repos/<repo>/commits`, and the next page will be in the `Link` header of the response.
    - The `fetch` method allows us to supply authorization and other headers if needed -- here GitHub requires `User-Agent`.
2. The commits are returned in JSON format.
3. We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regular expression for that (we will learn this feature in [Regular expressions](info:regular-expressions)).
    - The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`. It's generated by GitHub itself.
4. Then we yield the received commits one by one, and when they finish, the next `while(url)` iteration will trigger, making one more request.

An example of use (shows commit authors in console):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
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
=======
// Note: If you are running this in an external sandbox, you'll need to paste here the function fetchCommits described above 
```

That's just what we wanted. 

The internal mechanics of paginated requests is invisible from the outside. For us it's just an async generator that returns commits.

## Summary

Regular iterators and generators work fine with the data that doesn't take time to generate.

When we expect the data to come asynchronously, with delays, their async counterparts can be used, and `for await..of` instead of `for..of`.

Syntax differences between async and regular iterators:

|       | Iterable | Async Iterable |
|-------|-----------|-----------------|
| Method to provide iterator | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is          | `{value:…, done: true/false}`         | `Promise` that resolves to `{value:…, done: true/false}`  |

Syntax differences between async and regular generators:

|       | Generators | Async generators |
|-------|-----------|-----------------|
| Declaration | `function*` | `async function*` |
| `next()` return value is          | `{value:…, done: true/false}`         | `Promise` that resolves to `{value:…, done: true/false}`  |

In web-development we often meet streams of data, when it flows chunk-by-chunk. For instance, downloading or uploading a big file.

We can use async generators to process such data. It's also noteworthy that in some environments, like in browsers, there's also another API called Streams, that provides special interfaces to work with such streams, to transform the data and to pass it from one stream to another (e.g. download from one place and immediately send elsewhere).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
