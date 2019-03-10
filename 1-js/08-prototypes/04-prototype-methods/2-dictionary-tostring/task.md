importance: 5

---

# 辞書に toString を追加する

任意の `key/value` ペアを格納するために `Object.create(null)` として生成されたオブジェクト `dictonary` があります。

その中にメソッド `dictionary.toString()` を追加してください。それはカンマ区切りのキーのリストを返します。あなたの `toString` はオブジェクト上の `for..in` で現れるべきではありません。

次のように動作します:

```js
let dictionary = Object.create(null);

*!*
// dictionary.toString メソッドを追加するあなたのコード
*/!*

// データの追加
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ はここでは通常のプロパティキー

// ループでは apple と __proto__ だけです
for(let key in dictionary) {
  alert(key); // "apple", then "__proto__"
}  

// 実行時のあなたの toString です
alert(dictionary); // "apple,__proto__"
```
