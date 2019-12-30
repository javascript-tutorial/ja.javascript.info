importance: 5

---

<<<<<<< HEAD:1-js/08-prototypes/04-prototype-methods/3-compare-calls/task.md
# 呼び出し感の差異
=======
# The difference between calls
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117:1-js/08-prototypes/04-prototype-methods/3-compare-calls/task.md

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
