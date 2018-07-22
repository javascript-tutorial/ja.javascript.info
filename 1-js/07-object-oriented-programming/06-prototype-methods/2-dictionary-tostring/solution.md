
このメソッドは `Object.keys` を使ってすべての列挙可能なキーを取り、そのリストを出力します。

`toString` を非列挙型にするために、プロパティディスクリプタを使って定義しましょう。`Object.create` の構文は、2番目の引数としてプロパティディスクリプタのオブジェクトを指定することができます。

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // toString プロパティの定義
    value() { // 値は関数です
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// ループでは apple と __proto__ だけです
for(let key in dictionary) {
  alert(key); // "apple", then "__proto__"
}  

// toString によるカンマ区切りのプロパティのリスト
alert(dictionary); // "apple,__proto__"
```

ディスクリプタを使ってプロパティを作成するとき、そのフラグはデフォルトでは `false` です。なので、上のコードで。`dictionary.toString` は非列挙型です。
