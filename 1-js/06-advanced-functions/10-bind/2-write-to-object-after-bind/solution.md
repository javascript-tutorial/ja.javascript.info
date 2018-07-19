解答: `null`.


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```


バインドされた関数のコンテキストはハードコードされています。さらにそれを変える方法はありません。

従って、たとえ `user.g()` を実行しても、元の関数は `this=null` で呼ばれます。
