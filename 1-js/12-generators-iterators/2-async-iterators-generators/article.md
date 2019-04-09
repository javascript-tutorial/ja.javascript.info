
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

## Async generators

Javascript also provides generators, that are also iterable.

Let's recall a sequence generator from the chapter [](info:generators). It generates a sequence of values from `start` to `end` (could be anything else):

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


Normally, we can't use `await` in generators. All values must come synchronously: there's no place for delay in `for..of`.

But what if we need to use `await` in the generator body? To perform network requests, for instance.

No problem, just prepend it with `async`, like this:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // yay, can use await!
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

Now we have an the async generator, iteratable with `for await...of`.

It's indeed very simple. We add the `async` keyword, and the generator now can use `await` inside of it, rely on promises and other async functions.

Technically, another the difference of an async generator is that its `generator.next()` method is now asynchronous also, it returns promises.

Instead of `result = generator.next()` for a regular, non-async generator, values can be obtained like this:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```

## Iterables via async generators

When we'd like to make an object iterable, we should add `Symbol.iterator` to it.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() { ...return object with next to make range iterable...  }
*/!*
}
```

A common practice for `Symbol.iterator` is to return a generator, rather than a plain object with `next` as in the example before.

Let's recall an example from the chapter [](info:generators):

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

Here a custom object `range` is iterable, and the generator `*[Symbol.iterator]` implements the logic for listing values.

If we'd like to add async actions into the generator, then we should replace `Symbol.iterator` with async `Symbol.asyncIterator`:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  async *[Symbol.asyncIterator]() { // same as [Symbol.asyncIterator]: async function*()
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // make a pause between values, wait for something  
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

Now values come with a delay of 1 second between them.

## Real-life example

So far we've seen simple examples, to gain basic understanding. Now let's review a real-life use case.

There are many online APIs that deliver paginated data. For instance, when we need a list of users, then we can fetch it page-by-page: a request returns a pre-defined count (e.g. 100 users), and provides an URL to the next page.

The pattern is very common, it's not about users, but just about anything. For instance, Github allows to retrieve commits in the same, paginated fasion:

- We should make a request to URL in the form `https://api.github.com/repos/<repo>/commits`.
- It responds with a JSON of 30 commits, and also provides a link to the next page in the `Link` header.
- Then we can use that link for the next request, to get more commits, and so on.

What we'd like to have is an iterable source of commits, so that we could use it like this:

```js
let repo = 'iliakan/javascript-tutorial-en'; // Github repository to get commits from

for await (let commit of fetchCommits(repo)) {
  // process commit
}
```

We'd like `fetchCommits` to get commits for us, making requests whenever needed. And let it care about all pagination stuff, for us it'll be a simple `for await..of`.

With async generators that's pretty easy to implement:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github requires user-agent header
    });

    const body = await response.json(); // (2) parses response as JSON (array of commits)

    // (3) the URL of the next page is in the headers, extract it
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage && nextPage[1];

    url = nextPage;

    for(let commit of body) { // (4) yield commits one by one, until the page ends
      yield commit;
    }
  }
}
```

1. We use the browser `fetch` method to download from a remote URL. It allows to supply authorization and other headers if needed, here Github requires `User-Agent`.
2. The fetch result is parsed as JSON, that's again a `fetch`-specific method.
3. We can get the next page URL from the `Link` header of the response. It has a special format, so we use a regexp for that. The next page URL may look like this: `https://api.github.com/repositories/93253246/commits?page=2`, it's generatd by Github itself.
4. Then we yield all commits received, and when they finish -- the next `while(url)` iteration will trigger, making one more request.

An example of use (shows commit authors in console):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('iliakan/javascript-tutorial-en')) {

    console.log(commit.author.login);

    if (++count == 100) { // let's stop at 100 commits
      break;
    }
  }

})();
```

That's just what we wanted. The internal pagination mechanics is invisible from the outside. For us it's just an async generator that returns commits.

## Summary

Regular iterators and generators work fine with the data that doesn't take time to generate.

When we expect the data to come asynchronously, with delays, their async counterparts can be used, and `for await..of` instead of `for..of`.

Syntax differences between async and regular iterators:

|       | Iterators | Async iterators |
|-------|-----------|-----------------|
| Object method to provide iteraterable | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is              | any value         | `Promise`  |

Syntax differences between async and regular generators:

|       | Generators | Async generators |
|-------|-----------|-----------------|
| Declaration | `function*` | `async function*` |
| `generator.next()` returns              | `{value:…, done: true/false}`         | `Promise` that resolves to `{value:…, done: true/false}`  |

In web-development we often meet streams of data, when it flows chunk-by-chunk. For instance, downloading or uploading a big file.

We could use async generators to process such data, but there's also another API called Streams, that may be more convenient, as it provides special interfaces to transform the data and to pass it from one stream to another (e.g. download from one place and immediately send elsewhere). But they are also more complex.

Streams API not a part of Javascript language standard. Streams and async generators complement each other, both are great ways to handle async data flows.
