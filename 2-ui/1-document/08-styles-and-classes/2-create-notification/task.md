importance: 5

---

# 通知を作成する

<<<<<<< HEAD
通知の関数 `showNotification(options)` を書いてください。: `<div class="notification">` と与えられたコンテンツ。通知は1.5秒後に自動的に消える必要があります。
=======
Write a function `showNotification(options)` that creates a notification: `<div class="notification">` with the given content. The notification should automatically disappear after 1.5 seconds.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

オプションは次の通りです:

```js
// ウィンドウの右上近くに "Hello" というテキストを持つ要素を表示します
showNotification({
  top: 10, // ウィンドウのトップから 10px (デフォルトは 0px)
  right: 10, // ウィンドウの右端から 10px (デフォルトは 0px)
  html: "Hello!", // 通知の HTML
  className: "welcome" // div への追加クラス (任意)
});
```

[demo src="solution"]


指定された top/right 座標へ要素を表示するために、 CSS の配置を使用してください。ソースのドキュメントは必要なスタイルを持っています。
