importance: 5

---

# "switch" を "if" で書き直す

`if..else` を使って次の `switch` に対応するコードを書いてください。:

```js
switch (browser) {
  case 'Edge':
    alert( "У вас браузер Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Мы поддерживаем и эти браузеры' );
    break;

  default:
    alert( 'Надеемся, что эта страница выглядит хорошо!' );
}
```
