解答: **John**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```


`f.bind(...)` によって返却された [バインドされた関数](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) オブジェクトは作成時にのみコンテキスト(と提供されていれば引数を)を覚えます。

関数を再バインドすることはできません。