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
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js
ladder.up().up().down().showStep(); // 1
```

このようなアプローチはJavaScriptライブラリの中で広く使われています。
