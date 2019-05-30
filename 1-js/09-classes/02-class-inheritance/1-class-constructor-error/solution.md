これは、子のコンストラクタは `super()` を必ず呼ばないといけないためです。

これが正しいコードです。

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // ok now
*/!*
alert(rabbit.name); // White Rabbit
```
