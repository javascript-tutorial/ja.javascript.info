importance: 2

---

# チェーン

上下に移動できる `ladder` オブジェクトがあります。:

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

さて、順番にいくつかの呼び出しをする場合、このようにできます:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

<<<<<<< HEAD
`up` と `down` のコードを修正して、連鎖可能な呼び出しができるようにしてください。:
=======
Modify the code of `up`, `down` and `showStep` to make the calls chainable, like this:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js
ladder.up().up().down().showStep(); // 1
```

このようなアプローチはJavaScriptライブラリの中で広く使われています。
