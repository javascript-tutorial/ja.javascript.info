importance: 5

---

# Throttle decorator

<<<<<<< HEAD
"スロットリング" デコレータ `throttle(f, ms)` を作ります -- これはラッパーを返し、`ms` ミリ秒毎に最大一度 `f` の呼び出しを渡します。"クールダウン" 期間に入る呼び出しは無視されます。

**`debounce` との違いは -- もし無視された呼び出しがクールダウン中の最後のものであれば、遅延の終わりにそれを実行します。**
=======
Create a "throttling" decorator `throttle(f, ms)` -- that returns a wrapper.

When it's called multiple times, it passes the call to `f` at maximum once per `ms` milliseconds.

Compared to the debounce decorator, the behavior is completely different:
- `debounce` runs the function once after the "cooldown" period. Good for processing the final result.
- `throttle` runs it not more often than given `ms` time. Good for regular updates that shouldn't be very often.

In other words, `throttle` is like a secretary that accepts phone calls, but bothers the boss (calls the actual `f`) not more often than once per `ms` milliseconds.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

実際のアプリケーションを確認して、要件のよりよい理解とそれがどこから来るのかを見てみましょう。

**例えば、マウスの動きを追跡したいと思います。**

<<<<<<< HEAD
ブラウザでは、マウスのマイクロレベルの動きに対して実行される関数を設定し、移動に応じたポインタの場所を取得する事ができます。マウス使用中、この関数は通常とても頻繁に実行され、1秒あたり100回(10ミリ秒毎)程度になります。

**この追跡関数は web ページ上の一部の情報を更新する必要があります。**

更新を行う関数 `update()` はマイクロレベルの移動で実行するには重すぎます。また、100ms に1回より多くの頻度で実行しても意味がありません。

従って、オリジナルの `update()` の代わりにマウス移動毎に実行する関数として `throttle(update, 100)` を割り当てます。このデコレータは頻繁に呼ばれても、`update()` が呼ばれるのは 100ms 毎に最大一回です。
=======
In a browser we can setup a function to run at every mouse movement and get the pointer location as it moves. During an active mouse usage, this function usually runs very frequently, can be something like 100 times per second (every 10 ms).
**We'd like to update some information on the web-page when the pointer moves.**

...But updating function `update()` is too heavy to do it on every micro-movement. There is also no sense in updating more often than once per 100ms.

So we'll wrap it into the decorator: use `throttle(update, 100)` as the function to run on each mouse move instead of the original `update()`. The decorator will be called often, but forward the call to `update()` at maximum once per 100ms.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

視覚的に、次のようになります:

<<<<<<< HEAD
1. 最初のマウスの移動に対して、デコレートされたバリアントは `update` へ呼び出しを渡します。これは重要で、ユーザは自身の移動に対するリアクションがすぐに見えます。
2. その後、マウスが移動するのに対し `100ms` まで何も起こりません。デコレータは呼び出しを無視します。
3. `100ms` が経過すると -- 最後の座標でもう一度 `update` が発生します。
4. そして最終的に、マウスはどこかで停止します。デコレートされたバリアントは `100ms` の期限まで待ち、その後最後の座標で `update` を実行します。従って、恐らく最も重要な最後のマウス座標は処理されます。
=======
1. For the first mouse movement the decorated variant immediately passes the call to `update`. That's important, the user sees our reaction to their move immediately.
2. Then as the mouse moves on, until `100ms` nothing happens. The decorated variant ignores calls.
3. At the end of `100ms` -- one more `update` happens with the last coordinates.
4. Then, finally, the mouse stops somewhere. The decorated variant waits until `100ms` expire and then runs `update` with last coordinates. So, quite important, the final mouse coordinates are processed.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

コード例:

```js
function f(a) {
  console.log(a);
}

// f1000 は、1000ms 毎に最大1回 f へ呼び出しを渡します
let f1000 = throttle(f, 1000);

f1000(1); // shows 1
f1000(2); // (throttling, 1000ms not out yet)
f1000(3); // (throttling, 1000ms not out yet)

// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored
```

P.S. `f1000` に渡される引数とコンテキスト `this` はオリジナルの `f` に渡される必要があります。
