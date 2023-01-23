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
ladder.down();
ladder.showStep(); // 0
```

<<<<<<< HEAD
`up` と `down` のコードを修正して、連鎖可能な呼び出しができるようにしてください。:
=======
Modify the code of `up`, `down` and `showStep` to make the calls chainable, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

このようなアプローチはJavaScriptライブラリの中で広く使われています。
