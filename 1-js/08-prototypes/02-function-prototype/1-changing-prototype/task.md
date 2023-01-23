importance: 5

---

# "prototype" の変更

下のコードでは、`new Rabbit` を作り、そのプロトタイプを変更しようとしています。

最初は次のコードがあります:

```js run
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert( rabbit.eats ); // true
```


<<<<<<< HEAD:1-js/08-prototypes/02-function-prototype/1-changing-prototype/task.md
1. 1つ文字列を追加しました(強調部分)。今 `alert` は何が表示されるでしょう?
=======
1. We added one more string (emphasized). What will `alert` show now?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff:1-js/08-prototypes/02-function-prototype/1-changing-prototype/task.md

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype = {};
    */!*

    alert( rabbit.eats ); // ?
    ```

2. ...また、コードが次のような場合は(1行置き換えました)?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype.eats = false;
    */!*

    alert( rabbit.eats ); // ?
    ```

<<<<<<< HEAD:1-js/08-prototypes/02-function-prototype/1-changing-prototype/task.md
3. この場合は (1行置き換えました)?
=======
3. And like this (replaced one line)?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff:1-js/08-prototypes/02-function-prototype/1-changing-prototype/task.md

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete rabbit.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```

4. 最後のバリアントです:

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete Rabbit.prototype.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```
