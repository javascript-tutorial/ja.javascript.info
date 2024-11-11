
<<<<<<< HEAD
`ask` はオブジェクトなしで関数 `loginOk/loginFail` を取得しているためにエラーが起きます。
=======
The error occurs because `askPassword` gets functions `loginOk/loginFail` without the object.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

それらを呼ぶとき、通常 `this=undefined` と想定します。

コンテキストを `bind` しましょう:

```js run
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

*!*
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

これで動作します。

別の解答としては:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

<<<<<<< HEAD
通常は動作しますが、`user` が要求して `() => user.loginOk()` を実行する間に上書きされる可能性のあるようなより複雑な状況の場合に失敗する可能性があります。
=======
Usually that also works and looks good.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

It's a bit less reliable though in more complex situations where `user` variable might change *after* `askPassword` is called, but *before* the visitor answers and calls `() => user.loginOk()`. 
