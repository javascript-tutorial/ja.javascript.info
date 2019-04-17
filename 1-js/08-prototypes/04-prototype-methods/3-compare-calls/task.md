importance: 5

---

<<<<<<< HEAD:1-js/08-prototypes/04-prototype-methods/3-compare-calls/task.md
# 呼び出し感の差異
=======
# The difference between calls
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/08-prototypes/04-prototype-methods/3-compare-calls/task.md

新しい `rabbit` オブジェクトを作りましょう:

```js
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
};

let rabbit = new Rabbit("Rabbit");
```

これらの呼び出しは同じことをしますか？それとも違う？

```js
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```
