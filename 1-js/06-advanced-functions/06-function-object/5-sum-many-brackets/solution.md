
1. *いずれにしても* 全体が動作するために、`sum` の結果は関数である必要があります。
2. その関数は呼び出し間で、メモリに現在の値を覚えておく必要があります。
3. タスクによると、関数は `==` が使われたとき数値になる必要があります。関数はオブジェクトなので、チャプター <info:object-toprimitive> で説明したように変換が行われ、私たちは数値を返す独自のメソッドを提供することができます。

コードです:

```js demo run
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15
```

`sum` 関数は実際には一度しか動作していないことに注意してください。それは関数 `f` を返します。

その後、それぞれの呼び出しで `f` はパラメータを合計 `currentSum` に加え、自身を返します。

**`f` の最後の行は再帰ではありません**

再帰は次のように見えます:

```js
function f(b) {
  currentSum += b;
  return f(); // <-- 再帰呼出し
}
```

また、我々のケースでは単に関数を返しているだけで、呼び出しはありません:

```js
function f(b) {
  currentSum += b;
  return f; // <-- 自身を呼ばず、返している
}
```

<<<<<<< HEAD
この `f` は次の呼び出しで使われ、必要に応じて何度でも再び自身を返却します。次に、数値または文字列として使用すると、`toString` は `currentSum` を返します。また、ここでは `Symbol.toPrimitive` または `valueOf` を変換に使うこともできます。
=======
This `f` will be used in the next call, again return itself, as many times as needed. Then, when used as a number or a string -- the `toString` returns the `currentSum`. We could also use `Symbol.toPrimitive` or `valueOf` here for the conversion.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
