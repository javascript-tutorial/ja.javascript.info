
<<<<<<< HEAD
# 非同期イテレーションとジェネレータ

非同期イテレーションを使用すると、要求に応じて非同期に来るデータに対して反復処理することができます。

例えば、チャンクごとに何かをダウンロードしたり、単に非同期的に発生するイベントを待ち受け、それらをイテレートしたい場合、非同期イテレーションとジェネレータが役に立つかもしれません。
最初に単純な例を見て構文を把握し、次に実際のユースケースを見ていきましょう。

## 非同期イテレータ

非同期イテレータは通常のイテレータと本当に似ていますが、いくつか構文的な違いがあります。

チャプター <info:iterable> での "通常の" 反復可能オブジェクトは、次のようなものです:
=======
# Async iteration and generators

Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.

Let's see a simple example first, to grasp the syntax, and then review a real-life use case.

## Recall iterables

Let's recall the topic about iterables. 

The idea is that we have an object, such as `range` here:
```js
let range = {
  from: 1,
  to: 5
};
```

...And we'd like to use `for..of` loop on it, such as `for(value of range)`, to get values from `1` to `5`.

In other words, we want to add an *iteration ability* to the object.

That can be implemented using a special method with the name `Symbol.iterator`:

- This method is called in by the `for..of` construct when the loop is started, and it should return an object with the `next` method.
- For each iteration, the `next()` method is invoked for the next value.
- The `next()` should return a value in the form `{done: true/false, value:<loop value>}`, where `done:true` means the end of the loop.

Here's an implementation for the iterable `range`:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // for..of は最初に一度だけこのメソッドを呼び出します
*!*
  [Symbol.iterator]() {
*/!*
    // ...イテレータオブジェクトを返します:
    // 以降、for..of はそのオブジェクトとのみ動作し、次の値を要求します
=======
*!*
  [Symbol.iterator]() { // called once, in the beginning of for..of
*/!*
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() は for..of ループによる各イテレーションで呼ばれます
*!*
      next() { // (2)
        // 値をオブジェクトとして返す必要があります {done:.., value :...}
=======
*!*
      next() { // called every iteration, to get the next value
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
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
必要であれば、通常のイテレータの詳細について [反復可能(iterable)に関するチャプター](info:iterable) を参照してください。

オブジェクトを非同期的に反復可能にするには、:
1. `Symbol.iterator` の代わりに、`Symbol.asyncIterator` を使う必要があります。
2. `next()` は promise を返す必要があります。
3. このようなオブジェクトをイテレートするには、`for await (let item of iterable)` ループを使用します。

以前のように、反復可能な `range` オブジェクトを作成しましょう。しかし、今度は1秒毎に値を非同期的に返します。:
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
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // for..of は最初に一度だけこのメソッドを呼び出します
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...イテレータオブジェクトを返します:
    // 以降、for..of はそのオブジェクトとのみ動作し、次の値を要求します
=======
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() は for..of ループによる各イテレーションで呼ばれます
*!*
      async next() { // (2)
        // 値をオブジェクトとして返す必要があります {done:.., value :...}
        // (async により、自動的に promise にラップされます)
*/!*

        // 非同期のことをするのに、内部で await が使えます:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
=======
*!*
      async next() { // (2)
*/!*

*!*
        // note: we can use "await" inside the async next:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
*/!*
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

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
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
```js
alert( [...range] ); // Error, no Symbol.iterator
```

<<<<<<< HEAD
`await` なしの `for..of` と同じで、`Symbol.iterator` を見つけることを期待しているので、これは当然の結果です。
````

## 非同期ジェネレータ

JavaScript が提供するジェネレータも反復可能です。

チャプター [](info:generators) にあった、ジェネレータを思い出してください。これは `start` から `end` までの一連の値を生成します。:
=======
That's natural, as it expects to find `Symbol.iterator`, not `Symbol.asyncIterator`.

It's also the case for `for..of`: the syntax without `await` needs `Symbol.iterator`.
````

## Recall generators

Now let's recall generators, as they allow to make iteration code much shorter. Most of the time, when we'd like to make an iterable, we'll use generators.

For sheer simplicity, omitting some important stuff, they are "functions that generate (yield) values". They are explained in detail in the chapter [](info:generators).

Generators are labelled with `function*` (note the star) and use `yield` to generate a value, then we can use `for..of` to loop over them.

This example generates a sequence of values from `start` to `end`:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

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
通常、ジェネレータの中では `await` は使うことができません。すべての値は同期的にこなければなりません。

しかし、仮にジェネレータ本体で `await` の利用が必要な場合はどうすればよいでしょうか？例えば、ネットワークリクエストの実行です。

問題ありません、次のように `async` をその前に置くだけです。:
=======
As we already know, to make an object iterable, we should add `Symbol.iterator` to it.

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

A common practice for `Symbol.iterator` is to return a generator, it makes the code shorter, as you can see:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

Please see the chapter [](info:generators) if you'd like more details.

In regular generators we can't use `await`. All values must come synchronously, as required by the `for..of` construct.

What if we'd like to generate values asynchronously? From network requests, for instance. 

Let's switch to asynchronous generators to make it possible.

## Async generators (finally)

For most practical applications, when we'd like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.

The syntax is simple: prepend `function*` with `async`. That makes the generator asynchronous.

And then use `for await (...)` to iterate over it, like this:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
<<<<<<< HEAD
    // await が使えます!
=======
    // Wow, can use await!
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
<<<<<<< HEAD
    alert(value); // 1, then 2, then 3, then 4, then 5
=======
    alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
  }

})();
```

<<<<<<< HEAD
これで `for await...of` で反復可能な非同期ジェネレータができました。

これはとてもシンプルです。`async` キーワードを追加すれは、ジェネレータは中で `await` が使えるようになり、promise や他の非同期関数と上手く機能します。

技術的には、非同期ジェネレータのもう1つの違いは、その `generator.next()` メソッドも非同期になり、promise を返すことです。

通常の非同期でないジェネレータでは、`result = generator.next()` の代わりに、次のようにして値を取得することができます。:
=======
As the generator is asynchronous, we can use `await` inside it, rely on promises, perform network requests and so on.

````smart header="Under-the-hood difference"
Technically, if you're an advanced reader who remembers the details about generators, there's an internal difference.

For async generators, the `generator.next()` method is asynchronous, it returns promises.

In a regular generator we'd use `result = generator.next()` to get values. In an async generator, we should add `await`, like this:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
<<<<<<< HEAD

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
=======
That's why async generators work with `for await...of`.
````

### Async iterable range

Regular generators can be used as `Symbol.iterator` to make the iteration code shorter.

Similar to that, async generators can be used as `Symbol.asyncIterator` to implement the asynchronous iteration.

For instance, we can make the `range` object generate values asynchronously, once per second, by replacing synchronous `Symbol.iterator` with asynchronous `Symbol.asyncIterator`:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
*!*
  async *[Symbol.asyncIterator]() { // [Symbol.asyncIterator]: async function*() と同じ
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // 各値の間で一時停止を設ける
=======
  // this line is same as [Symbol.asyncIterator]: async function*() {
*!*
  async *[Symbol.asyncIterator]() {
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // make a pause between values, wait for something  
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
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

```js
for await (let commit of fetchCommits("username/repository")) {
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
  // process commit
}
```

<<<<<<< HEAD
必要に応じてリクエストを行い、`fetchCommits` がコミットを得るようにしたいです。そして、ページネーションのすべてのことを意識させてください。それはシンプルな `for await..of` になります。

非同期ジェネレータを使うと、実装はとても簡単です:
=======
Here's such function, implemented as async generator:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

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
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
      yield commit;
    }
  }
}
```

<<<<<<< HEAD
1. ブラウザの `fetch` メソッドを使ってリモートURLからダウンロードします。必要に応じて認証やその他のヘッダを提供することができます。ここでは Github は `User-Agent` を要求します。
2. fetch の結果は JSON としてパースされます。これも `fetch` 固有のメソッドです。
3. レスポンスの `Link` ヘッダから次のページの URL を取得することができます。それは特別なフォーマットを持っているので、そのための正規表現を使います。次のページの URL はこのようになります。: `https://api.github.com/repositories/93253246/commits?page=2`。これは Github 自身により生成されます。
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
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```js run
(async () => {

  let count = 0;

<<<<<<< HEAD
  for await (const commit of fetchCommits('iliakan/javascript-tutorial-en')) {

    console.log(commit.author.login);

    if (++count == 100) { // 100 コミットで停止しましょう
=======
  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // let's stop at 100 commits
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
      break;
    }
  }

})();
<<<<<<< HEAD
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
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
