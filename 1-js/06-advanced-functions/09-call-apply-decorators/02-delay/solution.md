解答:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("test"); // shows "test" after 1000ms
```

ここで、アロー関数がどう使われているか注意してください。ご存知の通り、アロー関数は独自の `this` や `arguments` を持ちません。なので、`f.apply(this, arguments)` はラッパーから `this` と `arguments` を取ります。

<<<<<<< HEAD
もし、通常の関数を渡す場合、`setTimeout` はそれを引数なしで、 `this=window` (ブラウザの場合) で呼び出します。なので、ラッパーからそれらをわすようにコードを書く必要があります。:
=======
If we pass a regular function, `setTimeout` would call it without arguments and `this=window` (assuming we're in the browser).

We still can pass the right `this` by using an intermediate variable, but that's a little bit more cumbersome:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
function delay(f, ms) {

<<<<<<< HEAD
  // setTimeout の中で、ラッパーから this と 引数を渡すための変数を追加
=======
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  return function(...args) {
    let savedThis = this; // store this into an intermediate variable
    setTimeout(function() {
      f.apply(savedThis, args); // use it here
    }, ms);
  };

}
```
