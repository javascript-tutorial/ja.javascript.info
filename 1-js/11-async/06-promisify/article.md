# Promisification

<<<<<<< HEAD
Promisification -- 単純な変換を表す長い単語です。コールバックを受け付ける関数から、Promise を返す関数への変換です。

より正確には、同じことを行い(内部的には元の関数を呼び出す)ますが、Promise を返すラッパー関数を作成します。

多くの関数やライブラリはコールバックベースなので、このような変換は実際しばしば必要とされます。Promise はより便利であるため、このような変換は理にかなっています。

例えば、チャプター <info:callbacks> の `loadScript(src, callback)` を考えてみましょう。
=======
"Promisification" is a long word for a simple transformation. It's the conversion of a function that accepts a callback into a function that returns a promise.

Such transformations are often required in real-life, as many functions and libraries are callback-based. But promises are more convenient, so it makes sense to promisify them.

For better understanding, let's see an example.

For instance, we have `loadScript(src, callback)` from the chapter <info:callbacks>.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

<<<<<<< HEAD
// 使用例:
// loadScript('path/script.js', (err, script) => {...})
```

Promise 化してみましょう。新しい `loadScriptPromise(src)` 関数は同じことをしますが、`src` のみを受け付け(コールバックなし)、Promise を返します。

=======
// usage:
// loadScript('path/script.js', (err, script) => {...})
```

The function loads a script with the given `src`, and then calls `callback(err)` in case of an error, or `callback(null, script)` in case of successful loading. That's a widespread agreement for using callbacks, we saw it before.

Let's promisify it. 

We'll make a new function `loadScriptPromise(src)`, that does the same (loads the script), but returns a promise instead of using callbacks.

In other words, we pass it only `src` (no `callback`) and get a promise in return, that resolves with `script` when the load is successful, and rejects with the error otherwise.

Here it is:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
<<<<<<< HEAD
      if (err) reject(err)
      else resolve(script);
    });
  })
}

// 使用例:
// loadScriptPromise('path/script.js').then(...)
```

これで `loadScriptPromise` は我々の Promise ベースのコードによくフィットします。

ご覧の通り、これはすべての処理を元の `loadScript` に移譲し、それを Promise の `resolve/reject` に変換する独自のコールバックを提供しています。

多くの機能を Promise 化する必要があるかもしれないので、ヘルパーを使うのが理にかなっています。

それは実際にはとてもシンプルです -- 下記の `promisify(f)` は Promise 化する関数 `f` を引数に取り、ラッパー関数を返します。

このラッパーは上記のコードと同じことを行います: Promise を返し、呼び出しを元の `f` に渡し、カスタムのコールバックで結果を追跡します。

```js
function promisify(f) {
  return function (...args) { // ラッパー関数を返します
    return new Promise((resolve, reject) => {
      function callback(err, result) { // f のためのカスタムコールバック
        if (err) {
          return reject(err);
=======
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// usage:
// loadScriptPromise('path/script.js').then(...)
```

As we can see, the new function is a wrapper around the original `loadScript` function. It calls it providing its own callback that translates to promise `resolve/reject`.

Now `loadScriptPromise` fits well in promise-based code. If we like promises more than callbacks (and soon we'll see more reasons for that), then we will use it instead.

In practice we may need to promisify more than one function, so it makes sense to use a helper.

We'll call it `promisify(f)`: it accepts a to-promisify function `f` and returns a wrapper function.

```js
function promisify(f) {
  return function (...args) { // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f (**)
        if (err) {
          reject(err);
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
        } else {
          resolve(result);
        }
      }

<<<<<<< HEAD
      args.push(callback); // 引数の末尾にカスタムコールバックを追加

      f.call(this, ...args); // 元の関数を呼び出します
    });
  };
};

// 使用例:
=======
      args.push(callback); // append our custom callback to the end of f arguments

      f.call(this, ...args); // call the original function
    });
  };
}

// usage:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

<<<<<<< HEAD
ここでは、元の関数は2つの引数 `(err, result)` を持つコールバックを期待していると想定しています。これはもっともよく出くわすパターンです。そして、カスタムコールバックはまさに正しい形式であり、`promisify` はこのようなケースで上手く機能します。

しかし、仮に元の `f` がより多くの引数 `callback(err, res1, res2)` を期待しているとしたらどうなるでしょうか？

複数のコールバックの結果の配列を返す `promifify` の修正です:

```js
// 結果の配列を得る場合は promisify(f, true)
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // f のためのカスタムコールバック
        if (err) {
          return reject(err);
        } else {
          // manyArgs を指定されている場合、すべてのコールバック結果で resolve します
=======
The code may look a bit complex, but it's essentially the same that we wrote above, while promisifying `loadScript` function.

A call to `promisify(f)` returns a wrapper around `f` `(*)`. That wrapper returns a promise and forwards the call to the original `f`, tracking the result in the custom callback `(**)`.

Here, `promisify` assumes that the original function expects a callback with exactly two arguments `(err, result)`. That's what we encounter most often. Then our custom callback is in exactly the right format, and `promisify` works great for such a case.

But what if the original `f` expects a callback with more arguments `callback(err, res1, res2, ...)`?

We can improve our helper. Let's make a more advanced version of `promisify`.

- When called as `promisify(f)` it should work similar to the version above.
- When called as `promisify(f, true)`, it should return the promise that resolves with the array of callback results. That's exactly for callbacks with many arguments.

```js
// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // our custom callback for f
        if (err) {
          reject(err);
        } else {
          // resolve with all callback results if manyArgs is specified
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
<<<<<<< HEAD
};

// 使用例:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```

ケースによっては、`err` はまったくないかもしれません: `callback(result)`, また、コールバックの形式が珍しいような場合には、ヘルパーを使わず、手動でこのような関数たちを Promise 化するのがよいでしょう。

もう少し柔軟な Promisification 関数を持つモジュールもあります。例えば、[es6-promisify](https://github.com/digitaldesignlabs/es6-promisify) です。Node.js では、組み込みの `util.promisify` があります。

```smart
Promisification は素晴らしいアプローチです。特に `async/await` (次のチャプターで説明します)を使うときには。ですが、これはコールバックの完全な置き換えにはなりません。

覚えておいてください、Promise は1つの結果のみを持ちますが、コールバックは技術的には何度も呼ぶことができます。

そのため、Promisification はコールバックを1度だけ呼ぶ関数に対してのみ意味があります。それ以降呼び出しをしても無視されます。
=======
}

// usage:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```

As you can see it's essentially the same as above, but `resolve` is called with only one or all arguments depending on whether `manyArgs` is truthy.

For more exotic callback formats, like those without `err` at all: `callback(result)`, we can promisify such functions manually without using the helper.

There are also modules with a bit more flexible promisification functions, e.g. [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). In Node.js, there's a built-in `util.promisify` function for that.

```smart
Promisification is a great approach, especially when you use `async/await` (see the next chapter), but not a total replacement for callbacks.

Remember, a promise may have only one result, but a callback may technically be called many times.

So promisification is only meant for functions that call the callback once. Further calls will be ignored.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
```
