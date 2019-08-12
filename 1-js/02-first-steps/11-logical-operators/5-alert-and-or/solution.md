答え: `3`.

```js run
alert( null || 2 && 3 || 4 );
```

AND `&&` の優先順位は `||` よりも高いので、最初に実行されます。

`2 && 3 = 3` なので、式はこのようになります:

```
null || 3 || 4
```

<<<<<<< HEAD
これの最初の真値の結果なので、`3` です。
=======
Now the result is the first truthy value: `3`.

>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
