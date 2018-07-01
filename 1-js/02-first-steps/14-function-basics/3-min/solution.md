`if` を使った方法:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

疑問符演算子 `'?'` を使った方法:

```js
function min(a, b) {
  return a < b ? a : b;
}
```

P.S. 等しい `a == b` 場合、何を返すかは気にする必要ありません。
