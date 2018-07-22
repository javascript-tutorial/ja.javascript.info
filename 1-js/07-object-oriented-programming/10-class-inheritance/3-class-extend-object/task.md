importance: 5

---

# クラスは Object を拡張しますか？

私たちが知っている通り、すべてのオブジェクトは通常 `Object.prototype` を継承しており、"一般的な" オブジェクトメソッドにアクセスできます。

ここでのデモンストレーションのように:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// hasOwnProperty メソッドは Object.prototype からです
// rabbit.__proto__ === Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

従って、`"class Rabbit extends Object"` は正確に `"class Rabbit"` と同じである、と言うのは正しいでしょうか？それとも違うでしょうか？

これは動作するでしょうか?

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```

もし動かない場合、コードを直してください。
