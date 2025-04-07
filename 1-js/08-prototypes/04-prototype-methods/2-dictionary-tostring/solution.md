
<<<<<<< HEAD
このメソッドは `Object.keys` を使ってすべての列挙可能なキーを取り、そのリストを出力します。

`toString` を非列挙型にするために、プロパティディスクリプタを使って定義しましょう。`Object.create` の構文は、2番目の引数としてプロパティディスクリプタのオブジェクトを指定することができます。
=======
The method can take all enumerable keys using `Object.keys` and output their list.

To make `toString` non-enumerable, let's define it using a property descriptor. The syntax of `Object.create` allows us to provide an object with property descriptors as the second argument.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
*!*
let dictionary = Object.create(null, {
<<<<<<< HEAD
  toString: { // toString プロパティの定義
    value() { // 値は関数です
=======
  toString: { // define toString property
    value() { // the value is a function
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

<<<<<<< HEAD
// ループでは apple と __proto__ だけです
=======
// apple and __proto__ is in the loop
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
for(let key in dictionary) {
  alert(key); // "apple", then "__proto__"
}  

<<<<<<< HEAD
// toString によるカンマ区切りのプロパティのリスト
alert(dictionary); // "apple,__proto__"
```

ディスクリプタを使ってプロパティを作成するとき、そのフラグはデフォルトでは `false` です。なので、上のコードで。`dictionary.toString` は非列挙型です。
=======
// comma-separated list of properties by toString
alert(dictionary); // "apple,__proto__"
```

When we create a property using a descriptor, its flags are `false` by default. So in the code above, `dictionary.toString` is non-enumerable.

See the chapter [](info:property-descriptors) for review.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
