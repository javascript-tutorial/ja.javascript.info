違い:

<<<<<<< HEAD
1. `clientWidth` は数値で、`getComputedStyle(elem).width` は末尾に `px` がついた文字列を返します。
2. `getComputedStyle` はインライン要素の場合、`"auto"` のような非数値の幅を返す場合があります。
3. `clientWidth` は要素の内部のコンテンツ領域にパディングを加えたものである一方、CSS幅(標準の `box-sizing`の場合)は *パディングなし* の内部コンテンツ領域です。
4. もしスクロールバーがあり、ブラウザはそのスペースを確保している場合、一部のブラウザは CSS幅からそのスペースを引き(コンテンツのためにはそれ以上使えないからです)、一部のブラウザは引きません。`clientWidth` プロパティは常に同じです: 確保されている場合、スクロールバーサイズは引かれます。
=======
1. `clientWidth` is numeric, while `getComputedStyle(elem).width` returns a string with `px` at the end.
2. `getComputedStyle` may return non-numeric width like `"auto"` for an inline element.
3. `clientWidth` is the inner content area of the element plus paddings, while CSS width (with standard `box-sizing`) is the inner content area *without paddings*.
4. If there's a scrollbar and the browser reserves the space for it, some browser substract that space from CSS width (cause it's not available for content any more), and some do not. The `clientWidth` property is always the same: scrollbar size is substracted if reserved.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
