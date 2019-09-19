
# Accessing array[-1]

プログラム言語によっては、負の値を使って配列要素にアクセスすることが可能で、この場合は末尾から数えられます。

このようになります。

```js
let array = [1, 2, 3];

array[-1]; // 3, 最後の要素
array[-2]; // 2, 最後から1つ前
array[-3]; // 1, 最後から2つ前
```

つまり、`array[-N]` は `array[array.length - N]` と同じです。

この挙動を実装するプロキシを作成しましょう。

次のように動作します:

```js
let array = [1, 2, 3];

array = new Proxy(array, {
  /* your code */
});

alert( array[-1] ); // 3
alert( array[-2] ); // 2

// 他の配列の機能は "そのまま" 動作すべきです
```
