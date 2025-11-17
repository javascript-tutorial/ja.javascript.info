はい、可能です。

もし関数がオブジェクトを返す場合、`new` は `this` の代わりにそれを返します。

<<<<<<< HEAD
なので、例えば、同じ外部で定義されたオブジェクト `obj` を返すことで実現できます。:
=======
So they can, for instance, return the same externally defined object `obj`:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
