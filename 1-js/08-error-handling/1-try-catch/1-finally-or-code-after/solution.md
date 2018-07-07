その違いは、関数内のコードを見ると明らかになります。

もし `try..catch` の "飛び出し" がある場合、振る舞いは異なります。

例えば、`try..catch` の中で `return` がある場合です。`finally` 句は `try..catch` が *どのような終わり方の場合にでも* 動作します。たとえ、`return` 文経由でさえも。

```js run
function f() {
  try {
    alert('start');
*!*
    return "result";
*/!*
  } catch (e) {
    /// ...
  } finally {
    alert('cleanup!');
  }
}

f(); // cleanup!
```

...もしくは次のように `throw` がある場合:

```js run
function f() {
  try {
    alert('start');
    throw new Error("an error");
  } catch (e) {
    // ...
    if("can't handle the error") {
*!*
      throw e;
*/!*
    }

  } finally {
    alert('cleanup!')
  }
}

f(); // cleanup!
```

ここで `finally` はクリーンアップを保証します。もし `f` の終わりにコードをおいた場合は実行されない場合があります。
