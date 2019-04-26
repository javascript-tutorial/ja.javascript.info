importance: 4

---

# setTimeout を setInterval で書き直す

これは、ネストされた `setTimeout`を使ってジョブを分割する関数です。

`setInterval` に書き直してください:

```js run
let i = 0;

let start = Date.now();

function count() {

  if (i == 1000000000) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count);
  }

  // a piece of heavy job
  for(let j = 0; j < 1000000; j++) {
    i++;
  }

}

count();
```
