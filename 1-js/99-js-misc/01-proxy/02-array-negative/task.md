
# Accessing array[-1]

<<<<<<< HEAD
プログラム言語によっては、負の値を使って配列要素にアクセスすることが可能で、この場合は末尾から数えられます。

このようになります。
=======
In some programming languages, we can access array elements using negative indexes, counted from the end.

Like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let array = [1, 2, 3];

<<<<<<< HEAD
array[-1]; // 3, 最後の要素
array[-2]; // 2, 最後から1つ前
array[-3]; // 1, 最後から2つ前
```

つまり、`array[-N]` は `array[array.length - N]` と同じです。

この挙動を実装するプロキシを作成しましょう。

次のように動作します:
=======
array[-1]; // 3, the last element
array[-2]; // 2, one step from the end
array[-3]; // 1, two steps from the end
```

In other words, `array[-N]` is the same as `array[array.length - N]`.

Create a proxy to implement that behavior.

That's how it should work:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let array = [1, 2, 3];

array = new Proxy(array, {
  /* your code */
});

alert( array[-1] ); // 3
alert( array[-2] ); // 2

<<<<<<< HEAD
// 他の配列の機能は "そのまま" 動作すべきです
=======
// Other array functionality should be kept "as is"
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
