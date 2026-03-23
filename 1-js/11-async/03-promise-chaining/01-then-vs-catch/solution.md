<<<<<<< HEAD
解答: **いいえ、それらは等しくありません**:

違いですが、以下では `f1` でエラーが発生したとき、`.catch` で処理されます:
=======
The short answer is: **no, they are not equal**:

The difference is that if an error happens in `f1`, then it is handled by `.catch` here:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js run
promise
  .then(f1)
  .catch(f2);
```

<<<<<<< HEAD
...しかしここでは違います:
=======
...But not here:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js run
promise
  .then(f1, f2);
```

<<<<<<< HEAD
なぜならエラーはチェーンを下に進み、2番目のコードは `f1` の下のチェーンにはないためです。

つまり、`.then` は次の `.then/catch` へ結果/エラーを渡します。そのため、最初の例では下に `catch` があり、2つ目の例は -- ありません。なので、エラーは処理されません。
=======
That's because an error is passed down the chain, and in the second code piece there's no chain below `f1`.

In other words, `.then` passes results/errors to the next `.then/catch`. So in the first example, there's a `catch` below, and in the second one there isn't, so the error is unhandled.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
