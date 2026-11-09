呼び出し `arr[2]()` は、構文的には古き良き `obj[method]()` であり、`arr` が `obj` の役割を、`2` が `method` の役割を持っています。

従って、`arr[2]` の関数をオブジェクトメソッドとして呼び出します（訳注: `arr[2]` には `function() { alert( this ); }` が `push` されています)。当然のことながら、この関数はオブジェクト `arr` を参照している `this` を受け取るため、配列 `arr` を出力します。:

```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // a,b,function(){...}
```

配列は 3つの値をもっています: 初期に2つを持っているのに加えて、関数です。
