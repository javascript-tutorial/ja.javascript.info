配列要素を見ていきましょう:
- 各アイテムに対して、返却する配列がすでにそれを持っているかをチェックします。
- もしそうであれば無視し、持っていなければ結果に追加します。

```js run demo
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
```

このコードは機能しますが、そこには潜在的な性能問題があります。

メソッド `result.includes(str)` は内部で配列 `result` を歩き、各要素を `str` と比較して一致するものを探します。

従って、もし `result` の中に `100` 要素あり、誰も `str` にマッチしない場合、`result` 全体を歩き、正確に `100` 回の比較を行うことになります。また、 `10000` のように `result` が大きいと `10000` 回の比較になります。

JavaScriptエンジンは非常に高速なので、それ自体は問題ではありません。なので、 `10000` 配列を見るのはマイクロ秒のレベルです。

しかし、`for` ループの中で `arr` の各要素にこのようなテストをします。

すると、`arr.length` が `10000` の場合、`10000*10000` = 1億回の比較になります。これは多いです。

従って、この解答は小さい配列の場合にのみ良いです。

<<<<<<< HEAD
さらにチャプター <info:map-set-weakmap-weakset> では、それを最適化する方法を見ていきます。
=======
Further in the chapter <info:map-set> we'll see how to optimize it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
