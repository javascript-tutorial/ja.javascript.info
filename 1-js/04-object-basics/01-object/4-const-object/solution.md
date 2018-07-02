もちろん動きます。問題ありません。

`const` は変数自身のみ変更から保護します。

つまり、`user` オブジェクトへの参照を格納しています。そしてそれは変更できません。しかし、オブジェクト中身は可能です。


```js run
const user = {
  name: "John"
};

*!*
// works
user.name = "Pete";
*/!*

// error
user = 123;
```
