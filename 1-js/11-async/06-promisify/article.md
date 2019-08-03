# Promisification

Promisification -- 単純な変換を表す長い単語です。コールバックを受け付ける関数から、Promise を返す関数への変換です。

より正確には、同じことを行い(内部的には元の関数を呼び出す)ますが、Promise を返すラッパー関数を作成します。

多くの関数やライブラリはコールバックベースなので、このような変換は実際しばしば必要とされます。Promise はより便利であるため、このような変換は理にかなっています。

例えば、チャプター <info:callbacks> の `loadScript(src, callback)` を考えてみましょう。

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// 使用例:
// loadScript('path/script.js', (err, script) => {...})
```

Promise 化してみましょう。新しい `loadScriptPromise(src)` 関数は同じことをしますが、`src` のみを受け付け(コールバックなし)、Promise を返します。

```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
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
      function callback(err, result) { // f のためのカスタムコールバック  if (err) {
          return reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // 引数の末尾にカスタムコールバックを追加

      f.call(this, ...args); // 元の関数を呼び出します
    });
  };
};

// 使用例:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

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
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
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
```
