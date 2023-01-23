# シンプルだが間違った解法

最もシンプルで、しかし間違った解法は、`min` から `max` の値を生成してから丸める方法です:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

この関数は動きますが、間違っています。境界値 `min` と `max` を得る確率は他の値の半分になります。

上の例を複数回実行してみると、`2` が他より多く現れることに簡単に気付くでしょう。

これは、`Math.round()` が `1..3` のランダムな数値を取った後に、次のように丸めるためです:

```js no-beautify
1   から 1.4999999999 までの値は 1 になります
1.5 から 2.4999999999 までの値は 2 になります
2.5 から 2.9999999999 までの値は 3 になります
```

これで、`1` が `2` の半分しか取得できないことが明白に分かりますね。`3`についても同様です。

# 正しい解法

<<<<<<< HEAD
このタスクを正しく解く方法はたくさんあります。一例は、区間の端を調整することです。同じ区間となるように、値を `0.5 から 3.5` の間で生成します。そうすると境界値の発生確率が上がります:
=======
There are many correct solutions to the task. One of them is to adjust interval borders. To ensure the same intervals, we can generate values from `0.5 to 3.5`, thus adding the required probabilities to the edges:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
*!*
function randomInteger(min, max) {
  // rand は (min-0.5) から (max+0.5) になりました
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

もう一つの例は、`min` から `max+1` のランダムな数値に対して `Math.floor` を使う方法です。

```js run
*!*
function randomInteger(min, max) {
  // ここでは rand は min から (max+1) です
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

ここでは、区間は次のように割り当てられます:

```js no-beautify
1 から 1.9999999999 の値は 1 になります
2 から 2.9999999999 の値は 2 になります
3 から 3.9999999999 の値は 3 になります
```

全ての区間は同じ長さを持つため、最終的な分布が等しくなります。
