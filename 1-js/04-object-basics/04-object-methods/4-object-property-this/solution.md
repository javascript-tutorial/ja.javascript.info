**答え: エラーです**

やってみましょう:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

<<<<<<< HEAD
これは `this` をセットするルールがオブジェクトリテラルを見ないためです。

ここで `makeUser()` の中の `this` 値は `undefined` です。なぜなら、関数として呼ばれており、メソッドではないためです。

また、オブジェクトリテラル自身は `this` に影響しません。`this` の値は関数全体で、コードブロックやオブジェクトリテラルはそれに影響しません。
=======
That's because rules that set `this` do not look at object definition. Only the moment of call matters.

Here the value of `this` inside `makeUser()` is `undefined`, because it is called as a function, not as a method with "dot" syntax.

The value of `this` is one for the whole function, code blocks and object literals do not affect it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

従って、`ref: this` は実際にはその関数の現在の `this` を取ります。

<<<<<<< HEAD

これは反対のケースです:
=======
We can rewrite the function and return the same `this` with `undefined` value: 

```js run
function makeUser(){
  return this; // this time there's no object literal
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
As you can see the result of `alert( makeUser().name )` is the same as the result of `alert( user.ref.name )` from the previous example.

Here's the opposite case:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
}

let user = makeUser();

alert( user.ref().name ); // John
```

<<<<<<< HEAD
これは動作します。なぜなら `user.ref()` はメソッドだからです。そして `this` の値はドット `.` の前のオブジェクトがセットされます。
=======
Now it works, because `user.ref()` is a method. And the value of `this` is set to the object before dot `.`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
