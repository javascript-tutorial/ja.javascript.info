<<<<<<< HEAD
その違いは、関数内のコードを見ると明らかになります。

もし `try..catch` の "飛び出し" がある場合、振る舞いは異なります。

例えば、`try..catch` の中で `return` がある場合です。`finally` 句は `try..catch` が *どのような終わり方の場合にでも* 動作します。たとえ、`return` 文経由でさえも。
=======
The difference becomes obvious when we look at the code inside a function.

The behavior is different if there's a "jump out" of `try...catch`.

For instance, when there's a `return` inside `try...catch`. The `finally` clause works in case of *any* exit from `try...catch`, even via the `return` statement: right after `try...catch` is done, but before the calling code gets the control.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
function f() {
  try {
    alert('start');
*!*
    return "result";
*/!*
<<<<<<< HEAD
  } catch (e) {
=======
  } catch (err) {
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
    /// ...
  } finally {
    alert('cleanup!');
  }
}

f(); // cleanup!
```

<<<<<<< HEAD
...もしくは次のように `throw` がある場合:
=======
...Or when there's a `throw`, like here:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
function f() {
  try {
    alert('start');
    throw new Error("an error");
<<<<<<< HEAD
  } catch (e) {
    // ...
    if("can't handle the error") {
*!*
      throw e;
=======
  } catch (err) {
    // ...
    if("can't handle the error") {
*!*
      throw err;
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
*/!*
    }

  } finally {
    alert('cleanup!')
  }
}

f(); // cleanup!
```

<<<<<<< HEAD
ここで `finally` はクリーンアップを保証します。もし `f` の終わりにコードをおいた場合は実行されない場合があります。
=======
It's `finally` that guarantees the cleanup here. If we just put the code at the end of `f`, it wouldn't run in these situations.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
