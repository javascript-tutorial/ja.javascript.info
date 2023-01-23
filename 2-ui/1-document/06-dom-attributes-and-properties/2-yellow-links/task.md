importance: 3

---

# 外部リンクをオレンジにする

`style` プロパティを変更することで、すべての外部リンクをオレンジにしてください。

<<<<<<< HEAD
次のものが外部リンクです:
- `href` の中に `://` がある場合
- しかし、`http://internal.com` から始まらない場合
=======
A link is external if:
- Its `href` has `://` in it
- But doesn't start with `http://internal.com`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:

```html run
<a name="list">the list</a>
<ul>
  <li><a href="http://google.com">http://google.com</a></li>
  <li><a href="/tutorial">/tutorial.html</a></li>
  <li><a href="local/path">local/path</a></li>
  <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
  <li><a href="http://nodejs.org">http://nodejs.org</a></li>
  <li><a href="http://internal.com/test">http://internal.com/test</a></li>
</ul>

<script>
  // 単一リンクの style を設定
  let link = document.querySelector('a');
  link.style.color = 'orange';
</script>
```

結果は次のようになるはずです:

[iframe border=1 height=180 src="solution"]
