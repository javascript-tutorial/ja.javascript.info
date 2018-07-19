
どの `setTimeout` も現在のコードが完了した後にだけ実行されます。

`i` は最後のもの `100000000` になるでしょう。

```js run
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// assume that the time to execute this function is >100ms
for(let j = 0; j < 100000000; j++) {
  i++;
}
```
