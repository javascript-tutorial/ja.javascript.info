
# ジェネレータ

通常の関数は、単一の値だけを返します(もしくはなにも返しません)。

ジェネレータは、要求に応じて次々に複数の値、場合によっては無限の数の値を返す("生み出す")ことができます。それらは [反復可能(iterables)](info:iterable) と上手く機能し、データストリームを簡単に作成することができます。

## ジェネレータ関数

ジェネレータを作成するには、特別な構文構造: `function*`、いわゆる "ジェネレータ関数" を使用する必要があります。

このようになります:

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```

`generateSequence()` が呼ばれたとき、コードは実行されません。代わりに、"ジェネレータ" と呼ばれる特別なオブジェクトを返します。

```js
// "ジェネレータ関数" は "ジェネレータオブジェクト" を生成します。
let generator = generateSequence();
```

`generator` オブジェクトは "凍結された関数呼び出し" と捉えることができます。:

![](generateSequence-1.png)

作成時に、コードの実行は最初の部分で一時停止されます。

ジェネレータのメインのメソッドは `next()` です。呼ばれると、最も近い `yield <value>` 文まで実行を再開します。その後、実行は一時停止し、値は外部のコードに返却されます。

例えば、ここではジェネレータを作成し、最初に戻される値を取得しています:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

*!*
let one = generator.next();
*/!*

alert(JSON.stringify(one)); // {value: 1, done: false}
```

`next()` の結果は常にオブジェクトです:
- `value`: 戻された値
- `done`: コードがまだ終わっていない場合は `false`, そうでなければ `true`.

現時点では、最初の値だけ取得しました:

![](generateSequence-2.png)

再び `generator.next()` を呼びましょう。実行が再開し、次の `yield` を貸します。:

```js
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}
```

![](generateSequence-3.png)

そして、3回目を呼び出すと、実行は関数を終了する `return` 文に到達します。

```js
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, *!*done: true*/!*}
```

![](generateSequence-4.png)

これでジェネレータが済みました。`done:true` でそれが判断でき、`value:3` を最終結果として処理します。

新たな `generator.next()` 呼び出しはこれ以上意味をなしません。それを行っても、同じオブジェクト `{done: true}` が返却されます。

ジェネレータを "ロールバック" する方法はありません。しかし、`generateSequence()` 呼び出しによって、別の物を作ることはできます。

これまでのところ、理解すべき最も重要なことは、ジェネレータ関数は通常の関数とは異なり、コードを実行しないことです。それらは "ジェネレータ工場(ファクトリー)" として機能します。 `function*` の実行はジェネレータを返し、その後、ジェネレータに値を要求します。

```smart header="`function* f(…)` それとも `function *f(…)`?"
これは軽い宗教的な質問で、両方の構文は正しいです。

しかし、アスタリスク `*`はジェネレータ関数であることを表し、名前ではなく種類を表すので、通常は最初の構文がより好まれます。したがって、`function` キーワードに付けてください。
```

## ジェネレータは反復可能です

おそらく `next()` メソッドを見て既に推測していると思いますが、ジェネレータは [反復可能(iterable)](info:iterable)です。

`for..of` によって、値をループすることができます:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, 次に 2
}
```

これは `.next().value` を呼び出すよりも、ジェネレータを操作するのにはるかに見栄えの良い方法ですね。

...しかし、注意してください: 上の例では `1` が表示された後 `2` が表示され、それですべてです。`3` は表示されません!

これは、`done: true` のとき、for-of イテレーションは最後の `value` を無視するからです。なので、すべての結果を `for..of` で表示したい場合は、それらを `yield` で返さなければなりません:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
*!*
  yield 3;
*/!*
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, 次に 2, 次に 3
}
```

当然、ジェネレータは反復可能なので、スプレッド演算子`...` のような、関連するすべての機能を呼び出すことができます。:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
```

上のコードでは、`...generateSequence()` は iterable をアイテムの配列に変換します(スプレッド演算子についてはチャプター [](info:rest-parameters-spread-operator#spread-operator)) を読んでください)。

## 反復可能(iterable)の代わりにジェネレータを使用する

少し前、チャプター [](info:iterable) で、値 `from..to` を返す反復可能な `range` オブジェクトを作りました。

ここで、そのコードを思い出しましょう。:

```js run
let range = {
  from: 1,
  to: 5,

  // for..of は最初にこのメソッドを一度呼び出します
  [Symbol.iterator]() {
    // ...これは iterator オブジェクトを返します:
    // 以降, for..of はそのオブジェクトでのみ機能し、次の値を要求します。
    return {
      current: this.from,
      last: this.to,

      // next() は for..of ループの各イテレーションで呼ばれます
      next() {
        // 値をオブジェクトとして返す必要があります {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

alert([...range]); // 1,2,3,4,5
```

ジェネレータを使用して反復可能(iterable)のシーケンスを作るほうが、遥かにエレガントです:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

let sequence = [...generateSequence(1,5)];

alert(sequence); // 1, 2, 3, 4, 5
```

...ですが、仮にカスタムの `range` オブジェクトを保持したいとしたらどうなるでしょうか？

## Converting Symbol.iterator to generator

We can get the best from both worlds by providing a generator as `Symbol.iterator`:

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

alert( [...range] ); // 1,2,3,4,5
```

The `range` object is now iterable.

That works pretty well, because when `range[Symbol.iterator]` is called:
- it returns an object (now a generator)
- that has `.next()` method (yep, a generator has it)
- that returns values in the form `{value: ..., done: true/false}` (check, exactly what generator does).

That's not a coincidence, of course. Generators aim to make iterables easier, so we can see that.

The last variant with a generator is much more concise than the original iterable code, and keeps the same functionality.

```smart header="Generators may continue forever"
In the examples above we generated finite sequences, but we can also make a generator that yields values forever. For instance, an unending sequence of pseudo-random numbers.

That surely would require a `break` in `for..of`, otherwise the loop would repeat forever and hang.
```

## Generator composition

Generator composition is a special feature of generators that allows to transparently "embed" generators in each other.

For instance, we'd like to generate a sequence of:
- digits `0..9` (character codes 48..57),
- followed by alphabet letters `a..z` (character codes 65..90)
- followed by uppercased letters `A..Z` (character codes 97..122)

Then we plan to create passwords by selecting characters from it (could add syntax characters as well), but need to generate the sequence first.

We already have `function* generateSequence(start, end)`. Let's reuse it to deliver 3 sequences one after another, together they are exactly what we need.

In a regular function, to combine results from multiple other functions, we call them, store the results, and then join at the end.

For generators, we can do better, like this:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

*!*
  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);
*/!*

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

The special `yield*` directive in the example is responsible for the composition. It *delegates* the execution to another generator. Or, to say it simple, it runs generators and transparently forwards their yields outside, as if they were done by the calling generator itself.

The result is the same as if we inlined the code from nested generators:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

*!*
  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;
*/!*

}

let str = '';

for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

A generator composition is a natural way to insert a flow of one generator into another.

It works even if the flow of values from the nested generator is infinite. It's simple and doesn't use extra memory to store intermediate results.

## "yield" is a two-way road

Till this moment, generators were like "iterators on steroids". And that's how they are often used.

But in fact they are much more powerful and flexible.

That's because `yield` is a two-way road: it not only returns the result outside, but also can pass the value inside the generator.

To do so, we should call `generator.next(arg)`, with an argument. That argument becomes the result of `yield`.

Let's see an example:

```js run
function* gen() {
*!*
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2?"; // (*)
*/!*

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield returns the value

generator.next(4); // --> pass the result into the generator  
```

![](genYield2.png)

1. The first call `generator.next()` is always without an argument. It starts the execution and returns the result of the first `yield` ("2+2?"). At this point the generator pauses the execution (still on that line).
2. Then, as shown at the picture above, the result of `yield` gets into the `question` variable in the calling code.
3. On `generator.next(4)`, the generator resumes, and `4` gets in as the result: `let result = 4`.

Please note, the outer code does not have to immediately call`next(4)`. It may take time to calculate the value. This is also a valid code:

```js
// resume the generator after some time
setTimeout(() => generator.next(4), 1000);
```

The syntax may seem a bit odd. It's quite uncommon for a function and the calling code to pass values around to each other. But that's exactly what's going on.

To make things more obvious, here's another example, with more calls:

```js run
function* gen() {
  let ask1 = yield "2 + 2?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3?"

  alert(ask2); // 9
}

let generator = gen();

alert( generator.next().value ); // "2 + 2?"

alert( generator.next(4).value ); // "3 * 3?"

alert( generator.next(9).done ); // true
```

The execution picture:

![](genYield2-2.png)

1. The first `.next()` starts the execution... It reaches the first `yield`.
2. The result is returned to the outer code.
3. The second `.next(4)` passes `4` back to the generator as the result of the first `yield`, and resumes the execution.
4. ...It reaches the second `yield`, that becomes the result of the generator call.
5. The third `next(9)` passes `9` into the generator as the result of the second `yield` and resumes the execution that reaches the end of the function, so `done: true`.

It's like a "ping-pong" game. Each `next(value)` (excluding the first one) passes a value into the generator, that becomes the result of the current `yield`, and then gets back the result of the next `yield`.

## generator.throw

As we observed in the examples above, the outer code may pass a value into the generator, as the result of `yield`.

...But it can also initiate (throw) an error there. That's natural, as an error is a kind of result.

To pass an error into a `yield`, we should call `generator.throw(err)`. In that case, the `err` is thrown in the line with that `yield`.

For instance, here the yield of `"2 + 2?"` leads to an error:

```js run
function* gen() {
  try {
    let result = yield "2 + 2?"; // (1)

    alert("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    alert(e); // shows the error
  }
}

let generator = gen();

let question = generator.next().value;

*!*
generator.throw(new Error("The answer is not found in my database")); // (2)
*/!*
```

The error, thrown into the generator at the line `(2)` leads to an exception in the line `(1)` with `yield`. In the example above, `try..catch` catches it and shows.

If we don't catch it, then just like any exception, it "falls out" the generator into the calling code.

The current line of the calling code is the line with `generator.throw`, labelled as `(2)`. So we can catch it here, like this:

```js run
function* generate() {
  let result = yield "2 + 2?"; // Error in this line
}

let generator = generate();

let question = generator.next().value;

*!*
try {
  generator.throw(new Error("The answer is not found in my database"));
} catch(e) {
  alert(e); // shows the error
}
*/!*
```

If we don't catch the error there, then, as usual, it falls through to the outer calling code (if any) and, if uncaught, kills the script.

## Summary

- Generators are created by generator functions `function*(…) {…}`.
- Inside generators (only) there exists a `yield` operator.
- The outer code and the generator may exchange results via `next/yield` calls.

In modern Javascript, generators are rarely used. But sometimes they come in handy, because the ability of a function to exchange data with the calling code during the execution is quite unique.

Also, in the next chapter we'll learn async generators, which are used to read streams of asynchronously generated data in `for` loop.

In web-programming we often work with streamed data, e.g. need to fetch paginated results, so that's a very important use case.
