importance: 5

---

<<<<<<< HEAD
# 辞書に toString を追加する

任意の `key/value` ペアを格納するために `Object.create(null)` として生成されたオブジェクト `dictonary` があります。

その中にメソッド `dictionary.toString()` を追加してください。それはカンマ区切りのキーのリストを返します。あなたの `toString` はオブジェクト上の `for..in` で現れるべきではありません。

次のように動作します:
=======
# Add toString to the dictionary

There's an object `dictionary`, created as `Object.create(null)`, to store any `key/value` pairs.

Add method `dictionary.toString()` into it, that should return a comma-delimited list of keys. Your `toString` should not show up in `for..in` over the object.

Here's how it should work:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js
let dictionary = Object.create(null);

*!*
<<<<<<< HEAD
// dictionary.toString メソッドを追加するあなたのコード
*/!*

// データの追加
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ はここでは通常のプロパティキー

// ループでは apple と __proto__ だけです
=======
// your code to add dictionary.toString method
*/!*

// add some data
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ is a regular property key here

// only apple and __proto__ are in the loop
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
for(let key in dictionary) {
  alert(key); // "apple", then "__proto__"
}  

<<<<<<< HEAD
// 実行時のあなたの toString です
=======
// your toString in action
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
alert(dictionary); // "apple,__proto__"
```
