importance: 5

---

<<<<<<< HEAD
# インスタンス作成エラー

これは `Animal` を拡張した `Rabbit` のコードです。

残念なことに、`Rabbit` オブジェクトを作ることができません。何が間違っているでしょう？直してください。

=======
# Error creating an instance

Here's the code with `Rabbit` extending `Animal`.

Unfortunately, `Rabbit` objects can't be created. What's wrong? Fix it.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    this.name = name;
    this.created = Date.now();
  }
}

*!*
<<<<<<< HEAD
let rabbit = new Rabbit("White Rabbit"); // エラー: 定義されていません
=======
let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
*/!*
alert(rabbit.name);
```
