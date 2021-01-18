はい、可能です。

もし関数がオブジェクトを返す場合、`new` は `this` の代わりにそれを返します。

<<<<<<< HEAD
なので、例えば、同じ外部で定義されたオブジェクト `obj` を返すことで実現できます。:
=======
So they can, for instance, return the same externally defined object `obj`:
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
