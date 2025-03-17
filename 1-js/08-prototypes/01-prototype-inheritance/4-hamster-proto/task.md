importance: 5

---

<<<<<<< HEAD
# なぜ2匹のハムスターがお腹一杯？

私たちは2匹のハムスターを持っています: `speedy` と `lazy` は一般的な `hamster` オブジェクトを継承しています。

そのうちの1匹に餌をやるとき、もう1匹もお腹一杯になります。なぜでしょう？どのように修正しますか？
=======
# Why are both hamsters full?

We have two hamsters: `speedy` and `lazy` inheriting from the general `hamster` object. 

When we feed one of them, the other one is also full. Why? How can we fix it?
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

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

<<<<<<< HEAD
// 一方が食べ物を見つけました
speedy.eat("apple");
alert( speedy.stomach ); // apple

// もう一方も持っています。なぜでしょう？修正してください。
=======
// This one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// This one also has it, why? fix please.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
alert( lazy.stomach ); // apple
```

