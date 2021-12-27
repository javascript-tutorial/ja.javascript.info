
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

<<<<<<< HEAD
再帰的な `setTimeout` を使った場合:
=======
Using nested `setTimeout`:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c


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

<<<<<<< HEAD
両方の解法において、最初の出力前の初期遅延があることに注意してください。最初の出力をすぐにするために行を追加する必要がある場合もありますが、簡単です。
=======
Note that in both solutions, there is an initial delay before the first output. The function is called after `1000ms` the first time.

If we also want the function to run immediately, then we can add an additional call on a separate line, like this:

```js run
function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

*!*
  go();
*/!*
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
```
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
