**答え: エラーです**

やってみましょう:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

これは `this` をセットするルールがオブジェクトリテラルを見ないためです。

ここで `makeUser()` の中の `this` 値は `undefined` です。なぜなら、関数として呼ばれており、メソッドではないためです。

また、オブジェクトリテラル自身は `this` に影響しません。`this` の値は関数全体で、コードブロックやオブジェクトリテラルはそれに影響しません。

従って、`ref: this` は実際にはその関数の現在の `this` を取ります。


これは反対のケースです:

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
};

let user = makeUser();

alert( user.ref().name ); // John
```

これは動作します。なぜなら `user.ref()` はメソッドだからです。そして `this` の値はドット `.` の前のオブジェクトがセットされます。
