importance: 5

---

# "賢い" ツールチップ

<<<<<<< HEAD
訪問者がマウスを *そこを通る* のではなく *その上* に移動させた場合、その上にツールチップを表示する関数を書いてください。

言い換えると、もし訪問者が要素上にマウス動かして止めた場合 -- ツールチップを表示します。そして、もし単にマウスをすばやく移動させた場合にはそれは必要ありません。誰が余分な点滅を必要とするでしょうか？
=======
Write a function that shows a tooltip over an element only if the visitor moves the mouse *to it*, but not *through it*.

In other words, if the visitor moves the mouse to the element and stops there -- show the tooltip. And if they just moved the mouse through, then no need, who wants extra blinking?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

技術的には、要素上のマウス速度を測る事ができます。そしてもし速度が遅い場合、"要素上" にくると想定してツールチップを表示し、速度が早い場合には -- 無視します。

<<<<<<< HEAD
そのための汎用的なオブジェクト `new HoverIntent(options)` を作ります。`options` は次の通りです:

- `elem` -- 追跡する要素です
- `over` -- マウスが要素をゆっくり移動している場合に呼び出す関数です
- `out` -- マウスが要素を離れるときに呼び出す関数です(もし `over` が呼ばれたら)
=======
Make a universal object `new HoverIntent(options)` for it.

Its `options`:
- `elem` -- element to track.
- `over` -- a function to call if the mouse came to the element: that is, it moves slowly or stopped over it.
- `out` -- a function to call when the mouse leaves the element (if `over` was called).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

ツールチップに対してこのようなオブジェクトを使用する例です:

```js
// サンプルのツールチップ
let tooltip = document.createElement('div');
tooltip.className = "tooltip";
tooltip.innerHTML = "Tooltip";

// オブジェクトはマウスを追跡し、over/out を呼び出します
new HoverIntent({
  elem,
  over() {
    tooltip.style.left = elem.getBoundingClientRect().left + 'px';
    tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
    document.body.append(tooltip);
  },
  out() {
    tooltip.remove();
  }
});
```

デモ:

[iframe src="solution" height=140]

マウスをすばやく移動し、"時計" を横切った場合は何も起こりません。ゆっくり、もしくはその上で停止した場合、ツールチップになります。

注意: ツールチップはカーソルが時計のサブ要素の間を移動するときに "点滅" しません、