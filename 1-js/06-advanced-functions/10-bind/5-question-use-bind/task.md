importance: 5

---

# Fix a function that loses "this"

下のコードの `askPassword()` の呼び出しは、パスワードをチェックし、その回答により `user.loginOk/LoginFail` を呼びます。

しかし、それはエラーになります、なぜでしょう？

すべてが正しく動作し始めるよう、ハイライトされた行を修正してください(他の行は変更しません)。

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
askPassword(user.loginOk, user.loginFail);
*/!*
```
