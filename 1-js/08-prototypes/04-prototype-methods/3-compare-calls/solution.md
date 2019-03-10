
最初の呼び出しは、`this == rabbit` を持っており、他のものは `this` は `Rabbit.prototype` と等しいものを持っています。なぜなら、それは実際にドットの前のオブジェクトだからです。

従って、最初の呼び出しのみ `Rabbit` を表示し、それ以外は `undefined` を表示します。:

```js run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```
