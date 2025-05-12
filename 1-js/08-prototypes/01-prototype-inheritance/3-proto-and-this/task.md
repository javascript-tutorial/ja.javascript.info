importance: 5

---

<<<<<<< HEAD
# どこに書きますか？

`animal` から継承している `rabbit` があります。

もし `rabbit.eat()` を呼び出す場合、どのオブジェクトが `full` を受け取りますか？: `animal` または `rabbit`?
=======
# Where does it write?

We have `rabbit` inheriting from `animal`.

If we call `rabbit.eat()`, which object receives the `full` property: `animal` or `rabbit`? 
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```
