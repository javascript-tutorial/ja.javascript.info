importance: 2

---

# チェーン

<<<<<<< HEAD
上下に移動できる `ladder` オブジェクトがあります。:
=======
There's a `ladder` object that allows you to go up and down:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function() { // 現在の段を表示します
    alert( this.step );
  }
};
```

<<<<<<< HEAD
さて、順番にいくつかの呼び出しをする場合、このようにできます:
=======
Now, if we need to make several calls in sequence, we can do it like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

<<<<<<< HEAD
`up` と `down` のコードを修正して、連鎖可能な呼び出しができるようにしてください。:
=======
Modify the code of `up`, `down`, and `showStep` to make the calls chainable, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

<<<<<<< HEAD
このようなアプローチはJavaScriptライブラリの中で広く使われています。
=======
Such an approach is widely used across JavaScript libraries.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
