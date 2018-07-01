importance: 5

---

# 'if..else' を '?' で書き直します

複数の三項演算子 `'?'` を使って `if..else` を書き直してください。

可読性のために、コードを複数行に分割することをオススメします。

```js
let message;

if (login == 'Employee') {
  message = 'Hello';
} else if (login == 'Director') {
  message = 'Greetings';
} else if (login == '') {
  message = 'No login';
} else {
  message = '';
}
```
