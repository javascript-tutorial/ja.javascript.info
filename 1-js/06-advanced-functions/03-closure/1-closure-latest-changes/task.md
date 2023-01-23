importance: 5

---

<<<<<<< HEAD
# 関数は最新の変更を取得しますか？

関数 sayHi は外部の変数を使用しています。関数実行時、どの値が利用されるでしょう？
=======
# Does a function pickup latest changes?

The function sayHi uses an external variable name. When the function runs, which value is it going to use?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

<<<<<<< HEAD
sayHi(); // 何が表示される？: "John" or "Pete"?
```

このような状況はブラウザとサーバサイドの開発両方で共通です。例えばユーザ操作やネットワークリクエストなど、関数は作成されたときよりも後に実行するようスケジュールすることができます。

したがって、問題は: 最新の変更を取得しますか？

=======
sayHi(); // what will it show: "John" or "Pete"?
```

Such situations are common both in browser and server-side development. A function may be scheduled to execute later than it is created, for instance after a user action or a network request.

So, the question is: does it pick up the latest changes?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
