
<<<<<<< HEAD
`width` と `height` 両方をアニメーションする CSS です:
```css
/* 元の class */
=======
CSS to animate both `width` and `height`:
```css
/* original class */
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

#flyjet {
  transition: all 3s;
}

<<<<<<< HEAD
/* JS で .growing を追加*/
=======
/* JS adds .growing */
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
#flyjet.growing {
  width: 400px;
  height: 240px;
}
```

<<<<<<< HEAD
`transitionend` は 2回トリガすることに注意してください -- すべてのプロパティに対して1度トリガします。したがって、追加のチェックをしない場合、メッセージは2度表示されます。
=======
Please note that `transitionend` triggers two times -- once for every property. So if we don't perform an additional check then the message would show up 2 times.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
