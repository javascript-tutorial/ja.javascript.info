importance: 5

---

# モーダルフォーム

メッセージ `html` 入力フィールドとボタン `OK/CANCEL` を持つフォームを表示する関数 `showPrompt(html, callback)` を作成してください。

<<<<<<< HEAD
- ユーザテキストフィールドに何か入力し、`key:Enter` または OK ボタンをクリックする必要があります。その後、入力された値を一緒に `callback(value)` が呼ばれます。
- そうではなく、ユーザが `key:Esc` や CANCEL を押した場合、`callback(null)` が呼ばれます。
=======
- A user should type something into a text field and press `key:Enter` or the OK button, then `callback(value)` is called with the value they entered.
- Otherwise if the user presses `key:Esc` or CANCEL, then `callback(null)` is called.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

どちらの場合も、入力プロセスが終了したらフォームが削除されます。

要件:

- フォームはウィンドウの中央です。
- フォームは *モーダル* です。つまり、ユーザがそれを閉じるまではページの残り部分とのやりとりはできません。
- フォームが表示されたとき、ユーザのためにフォーカスは `<input>` の中であるべきです。
- キー `key:Tab`/`key:Shift+Tab` はフォームフィールド間でフォーカス移動し、他のページの要素へ移らないようにします。

使用例:

```js
showPrompt("Enter something<br>...smart :)", function(value) {
  alert(value);
});
```

iframe でのデモ:

[iframe src="solution" height=160 border=1]

P.S. ソースドキュメントは固定された位置付けのフォーム用のHTML / CSSがありますが、それをモーダルにするのはあなた次第です。
