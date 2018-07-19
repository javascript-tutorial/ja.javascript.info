
`setInterval` を使った場合:

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// usage:
printNumbers(5, 10);
```

再帰的な `setTimeout` を使った場合:


```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// usage:
printNumbers(5, 10);
```

両方の解法において、最初の出力前の初期遅延があることに注意してください。最初の出力をすぐにするために行を追加する必要がある場合もありますが、簡単です。
