
<<<<<<< HEAD
# promise での遅延

組み込み関数 `setTimeout` はコールバックを使用します。promise ベースで代替のものを作成してください。

関数 `delay(ms)` は promise を返す必要があります。その promise は `ms` ミリ秒後に解決され、そこへ `.then` を追加することができます。次のようになります:


```js
function delay(ms) {
  // あなたのコード
=======
# Delay with a promise

The built-in function `setTimeout` uses callbacks. Create a promise-based alternative.

The function `delay(ms)` should return a promise. That promise should resolve after `ms` milliseconds, so that we can add `.then` to it, like this:

```js
function delay(ms) {
  // your code
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
}

delay(3000).then(() => alert('runs after 3 seconds'));
```
