importance: 5

---

# ツールチップの振る舞い

ツールチップの振る舞いのための JSコードを書いてください。

マウスが `data-tooltip` を持つ要素上に来たら、ツールチップがその上に現れます。そしてマウスが過ぎると隠れます。


注釈付きのHTMLの例です:
```html
<button data-tooltip="the tooltip is longer than the element">Short button</button>
<button data-tooltip="HTML<br>tooltip">One more button</button>
```

このように動作します:

[iframe src="solution" height=200 border=1]

<<<<<<< HEAD
このタスクでは `data-tooltip` を持つすべての要素は内側にテキストだけと想定します。入れ子のタグはありません。
=======
In this task we assume that all elements with `data-tooltip` have only text inside. No nested tags (yet).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

詳細:

<<<<<<< HEAD
- ツールチップはウィンドウの端は超えません。通常、ツールチップは要素の上にありますが、もし要素がページ上部にあり、ツールチップのスペースが無い場合、下に位置します。
- ツールチップは`data-tooltip` 属性の中で与えられます。それは任意のHTMLです。
=======
- The distance between the element and the tooltip should be `5px`.
- The tooltip should be centered relative to the element, if possible.
- The tooltip should not cross window edges. Normally it should be above the element, but if the element is at the page top and there's no space for the tooltip, then below it.
- The tooltip content is given in the `data-tooltip` attribute. It can be arbitrary HTML.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

ここでは2つのイベントが必要になります:
- ポインタが要素の上にきたとき、`mouseover` をトリガします。
- ポインタが要素を離れたとき、`mouseout` をトリガします。

イベント移譲を使用してください: `data-tooltip` を持つ要素からすべての "イン" と "アウト" を追跡するため、`document` 上に2つのハンドラを設定し、そこでツールチップを管理してください。

振る舞いが実装できたら、JavaScriptに精通していない人でも注釈付き要素を追加できます。

<<<<<<< HEAD
P.S. 自然でシンプルなものを保つために、一度に表示できるツールチップは1つだけです。
=======
P.S. Only one tooltip may show up at a time.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
