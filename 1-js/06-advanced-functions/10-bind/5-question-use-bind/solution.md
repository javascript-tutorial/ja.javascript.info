
`ask` はオブジェクトなしで関数 `loginOk/loginFail` を取得しているためにエラーが起きます。

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
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

It's a bit less reliable though in more complex situations where `user` variable might change *after* `askPassword` is called, but *before* the visitor answers and calls `() => user.loginOk()`. 
