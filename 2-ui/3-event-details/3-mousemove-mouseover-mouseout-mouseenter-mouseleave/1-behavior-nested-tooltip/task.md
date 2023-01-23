importance: 5

---

# 改善されたツールチップ動作

<<<<<<< HEAD
属性 `data-tooltip` を持つ要素にツールチップを表示する JavaScript を書いてください。
=======
Write JavaScript that shows a tooltip over an element with the attribute `data-tooltip`. The value of this attribute should become the tooltip text.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

それは、タスク <info:task/behavior-tooltip> と似ていますが、ここでは注釈付き要素はネストできます。最も深くネストしたツールチップが表示されます。

<<<<<<< HEAD
例えば:
=======
Only one tooltip may show up at the same time.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
<div data-tooltip="Here – is the house interior" id="house">
  <div data-tooltip="Here – is the roof" id="roof"></div>
  ...
  <a href="https://en.wikipedia.org/wiki/The_Three_Little_Pigs" data-tooltip="Read on…">Hover over me</a>
</div>
```

iframe での結果です:

[iframe src="solution" height=300 border=1]
<<<<<<< HEAD

P.S. ヒント: 同時に1つのツールチップだけ表示します。
=======
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
