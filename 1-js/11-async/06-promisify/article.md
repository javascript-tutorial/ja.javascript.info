# Promisification

"Promisification" は単純な変換を表す長い用語です。コールバックを受け付ける関数から、Promise を返す関数への変換です。

多くの関数やライブラリはコールバックベースなので、このような変換は実際しばしば必要とされます。Promise はより便利であるため、このような変換は理にかなっています。

より理解するために例を見てみましょう。

例えば、章 <info:callbacks> の `loadScript(src, callback)` を考えてみましょう。

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

関数は指定された `src` のスクリプトを読み込み、エラーの場合は `callback(err)`, 読み込みに成功した場合には `callback(null, script)` を呼び出します。こちらは以前みましたが、このフォーマットはコールバックの使用で広く合意されているものです。

Promise 化してみましょう。

新しい `loadScriptPromise(src)` 関数は同じことをしますが、コールバックの代わりに Promise を返します。

つまり、`src` のみ（`callback` なし）を渡し、戻り値で promise を得ます。この promise は読み込みが成功すると `script` で resolve し、そうでなければエラーで reject します。

こちらです:
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

ご覧の通り、新しい関数は元の `loadScript` 関数のラッパーです。結果を Promise の `resolve/reject` に変換する独自のコールバックを提供し、呼び出します。

これで `loadScriptPromise` は Promise ベースのコードによくフィットします。コールバックよりも promise の方がよい（この後その理由をみていきます）なら、代わりにこちらを利用します。

実際には、複数の関数を promise 化する必要があるかもしれません。この場合はヘルパーを用意するのが便利です。

`promisify(f)` は Promise 化する関数 `f` を引数に取り、ラッパー関数を返します。

```js
function promisify(f) {
  return function (...args) { // ラッパー関数を返します
    return new Promise((resolve, reject) => {
      function callback(err, result) { // f のためのカスタムコールバック
        if (err) {
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

コードは多少複雑に見えますが、`loadScript` 関数の Promise 化をしており、本質的には上で書いたものと同じです。

`promisify(f)` の呼び出しは、`f` `(*)` のラッパーを返します。ラッパーは promise を返し、呼び出しを元の `f` に転送し、カスタムコールバック `(**)` で結果を追跡します。

ここで、`promisify` は、元の関数は2つの引数 `(err, result)` を持つコールバックを期待している前提です。これはもっともよく出くわすパターンです。そして、カスタムコールバックはまさに正しい形式であり、`promisify` はこのようなケースで上手く機能します。

しかし、仮に元の `f` がより多くの引数 `callback(err, res1, res2)` を期待しているとしたらどうなるでしょうか？

複数のコールバックの結果の配列を返す `promifify` の修正です:

- `promisify(f)` が呼ばれた場合は、上と同様に動作します。
- `promisify(f, true)` が呼ばれた場合は、コールバックの結果配列で resolve する promise を返します。これが複数の引数をもつコールバックに対するものです。

```js
// 結果の配列を得る場合は promisify(f, true)
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // f のカスタムコールバック
        if (err) {
          return reject(err);
        } else {
          // manyArgs が指定されている場合、すべてのコールバック結果で resolve します
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

ご覧の通り、基本的には上記と同様ですが、`resolve` は `manyArgs` が true がどうかによって、1つまたはすべての引数で呼び出されます。

ケースによっては、`err` はまったくないかもしれません: `callback(result)`, また、コールバックの形式が珍しいような場合には、ヘルパーを使わず、手動でこのような関数たちを Promise 化するのがよいでしょう。

もう少し柔軟な Promisification 関数を持つモジュールもあります。例えば、[es6-promisify](https://github.com/digitaldesignlabs/es6-promisify) です。Node.js では、組み込みの `util.promisify` があります。

```smart
Promisification は素晴らしいアプローチです。特に `async/await` (次の章で説明します)を使うときには。ですが、これはコールバックの完全な置き換えにはなりません。

覚えておいてください、Promise は1つの結果のみを持ちますが、コールバックは技術的には何度も呼ぶことができます。

そのため、Promisification はコールバックを1度だけ呼ぶ関数のみを対象としています。それ以降の呼び出しは無視されます。
```
