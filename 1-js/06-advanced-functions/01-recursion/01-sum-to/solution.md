ループを使った解決策です:

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

再帰を使った解決策です:

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```

公式: `sumTo(n) = n*(n+1)/2` を使った解決策です:

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

P.S. 当然のことながら、この式は最速の解法です。任意の数 n に対して3つの演算しか使用しません。数学は助けます！

ループのバリアントは速度の点では2番目です。再帰とループのバリアント共に同じ数を合計していますが、再帰にはネストされた呼び出しと実行スタック管理が含まれます。それもまたリソースを取るため、より遅くなります。

<<<<<<< HEAD
P.P.S この規格は、「テールコール(末尾呼び出し)」最適化について説明しています。もし再帰呼び出しが関数の中の最後のものである場合(上の `sumTo` のように)、外部の関数は実行を再開する必要はなく、その実行コンテキストを覚えておく必要はありません。その場合であれば、`sumTo(100000)` はカウント可能です。しかし、もしあなたのJavaScriptエンジンがそれをサポートしていない場合は最大スタックサイズを超えたというエラーが発生します。これは、通常、スタックサイズの合計に制限があるためです。
=======
P.P.S. Some engines support the "tail call" optimization: if a recursive call is the very last one in the function, with no other calculations performed, then the outer function will not need to resume the execution, so the engine doesn't need to remember its execution context. That removes the burden on memory. But if the JavaScript engine does not support tail call optimization (most of them don't), there will be an error: maximum stack size exceeded, because there's usually a limitation on the total stack size.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
