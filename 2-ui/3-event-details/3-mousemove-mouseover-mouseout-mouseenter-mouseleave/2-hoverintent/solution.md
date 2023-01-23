
<<<<<<< HEAD
アルゴリズムはシンプルです:
1. 要素上に `onmouseover/out` ハンドラを置きます。また、ここでは `onmouserenter/leave` を使うこともできますが、汎用性が下がり、移譲を導入すると上手く動作しません。
2. マウスカーソルが要素に入ったとき、`mousemove` で速度の計算を開始します。
3. もし速度が遅い場合、`over` を実行します。
4. その後、要素から出て、`over` が実行された場合には `out` を実行します。

質問: "どうやって速度を測る？"

最初のアイデア: `100ms` 毎に関数を実行し、前後の座標間の距離を計算する方法です。もしそれが小さい場合、スピードは小さいです。
=======
The algorithm looks simple:
1. Put `onmouseover/out` handlers on the element. Also can use `onmouseenter/leave` here, but they are less universal, won't work if we introduce delegation.
2. When a mouse cursor entered the element, start measuring the speed on `mousemove`.
3. If the speed is slow, then run `over`.
4. When we're going out of the element, and `over` was executed, run `out`.

But how to measure the speed?

The first idea can be: run a function every `100ms` and measure the distance between previous and new coordinates. If it's small, then the speed is small.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

残念ながら、JavaScript で "現在のマウス座標" を取得する方法はありません。`getCurrentMouseCoordinates()` のような関数はありません。

<<<<<<< HEAD
座標を取得する唯一の方法は、`mousemove` のようにマウスイベントをリッスンすることです。

したがって、座標を追跡しそれを覚えるために `mousermove` のハンドラを設定できます。
=======
The only way to get coordinates is to listen for mouse events, like `mousemove`, and take coordinates from the event object.

So let's set a handler on `mousemove` to track coordinates and remember them. And then compare them, once per `100ms`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

P.S. 注意: 解決策のテストでは、`dispatchEvent` を使用して、ツールチップが正しく動作するかを確認します。
