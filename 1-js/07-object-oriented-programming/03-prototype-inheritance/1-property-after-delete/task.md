importance: 5

---

# プロトタイプの操作

ここに2つのオブジェクトを作り、次にそれらを変更するコードがあります。

処理の中で、どの値が表示されるでしょう？

```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
```

3つ答えてください。
