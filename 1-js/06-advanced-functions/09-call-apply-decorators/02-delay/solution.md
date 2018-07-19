解答:

```js
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}
```

ここで、アロー関数がどう使われているか注意してください。ご存知の通り、アロー関数は独自の `this` や `arguments` を持ちません。なので、`f.apply(this, arguments)` はラッパーから `this` と `arguments` を取ります。

もし、通常の関数を渡す場合、`setTimeout` はそれを引数なしで、 `this=window` (ブラウザの場合) で呼び出します。なので、ラッパーからそれらをわすようにコードを書く必要があります。:

```js
function delay(f, ms) {

  // setTimeout の中で、ラッパーから this と 引数を渡すための変数を追加
  return function(...args) {
    let savedThis = this;
    setTimeout(function() {
      f.apply(savedThis, args);
    }, ms);
  };

}
```
