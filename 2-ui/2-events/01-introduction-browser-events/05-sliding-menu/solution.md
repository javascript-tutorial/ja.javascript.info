
# HTML/CSS
最初に HTML/CSS を作成しましょう。

<<<<<<< HEAD
メニューはページ上のスタンドアロンのグラフィカルコンポーネントなので、単一の DOM 要素に配置するのが良いです。

メニュー項目のリストは、リスト `ul/li` として配置することができます。
=======
A menu is a standalone graphical component on the page, so it's better to put it into a single DOM element.

A list of menu items can be laid out as a list `ul/li`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

これはその構造例です:

```html
<div class="menu">
  <span class="title">Sweeties (click me)!</span>
  <ul>
    <li>Cake</li>
    <li>Donut</li>
    <li>Honey</li>
  </ul>
</div>
```

`<div>` は暗黙で `display:block` を持っており、水平幅の 100% を占めるため、タイトルには `<span>` を使います。

このようになります:

```html autorun height=50
<div style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</div>
```

なので、`onclick` を設定した場合、それはテキストの右側のクリックをキャッチします。

<<<<<<< HEAD
...しかし、`<span>` 暗黙の `display: inline` を持っているので、すべてのテキストにフィットするのに十分な場所を占めます。
=======
As `<span>` has an implicit `display: inline`, it occupies exactly enough place to fit all the text:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</span>
```

# メニューを切り替える

メニューを切り替えると、矢印が変わり、メニューリストが表示/非表示になります。

これらすべての変更は、完全に CSS によって行われます。JavaScript では、クラス `.open` の追加/削除によって、現在のメニューの状態を分類する必要があります。

`.open` がない場合メニューは閉じられます:

```css
.menu ul {
  margin: 0;
  list-style: none;
  padding-left: 20px;
  display: none;
}

.menu .title::before {
  content: '▶ ';
  font-size: 80%;
  color: green;
}
```

...そして `.open` では、矢印は変わりリストが表示されます:

```css
.menu.open .title::before {
  content: '▼ ';
}

.menu.open ul {
  display: block;
}
```
