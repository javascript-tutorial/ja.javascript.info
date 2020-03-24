importance: 5

---

# 通知を作成する

<<<<<<< HEAD
通知を作成する関数 `showNotification(options)` を書いてください。通知は `<div class="notification">` という要素にしてください。通知の内容などはオプションで指定できるようにしてください。通知は1.5秒後に自動的に消えるようにしてください。
=======
Write a function `showNotification(options)` that creates a notification: `<div class="notification">` with the given content. The notification should automatically disappear after 1.5 seconds.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

オプションは次の通りです:

```js
// ウィンドウの右上近くに "Hello" というテキストを持つ要素を表示します
showNotification({
  top: 10, // ウィンドウのトップから 10px (デフォルトは 0px)
  right: 10, // ウィンドウの右端から 10px (デフォルトは 0px)
  html: "Hello!", // 通知として表示する HTML
  className: "welcome" // div への追加クラス (任意)
});
```

[demo src="solution"]


指定された top/right 座標へ要素を表示するために、 CSS の配置を使用してください。ソースのドキュメントは必要なスタイルを持っています。
