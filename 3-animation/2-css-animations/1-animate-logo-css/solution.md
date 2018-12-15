
`width` と `height` 両方をアニメーションする CSS です:
```css
/* 元の class */

#flyjet {
  transition: all 3s;
}

/* JS で .growing を追加*/
#flyjet.growing {
  width: 400px;
  height: 240px;
}
```

`transitionend` は 2回トリガすることに注意してください -- すべてのプロパティに対して1度トリガします。したがって、追加のチェックをしない場合、メッセージは2度表示されます。
