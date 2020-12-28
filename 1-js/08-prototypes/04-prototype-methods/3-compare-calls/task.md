importance: 5

---

<<<<<<< HEAD:1-js/08-prototypes/04-prototype-methods/3-compare-calls/task.md
# 呼び出し感の差異
=======
# The difference between calls
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293:1-js/08-prototypes/04-prototype-methods/3-compare-calls/task.md

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
