importance: 5

---

# なぜ2匹のハムスターがお腹一杯？

私たちは2匹のハムスターを持っています: `speedy` と `lazy` は一般的な `hamster` オブジェクトを継承しています。

そのうちの1匹に餌をやるとき、もう1匹もお腹一杯になります。なぜでしょう？どのような直しますか？

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// 一方が食べ物を見つけました
speedy.eat("apple");
alert( speedy.stomach ); // apple

// もう一方も持っています。なぜでしょう？直してください。
alert( lazy.stomach ); // apple
```

