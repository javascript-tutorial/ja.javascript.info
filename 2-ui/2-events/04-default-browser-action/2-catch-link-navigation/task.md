importance: 5

---

# 要素内のリンクをキャッチする

<<<<<<< HEAD
`id="contents"` の要素内のすべてのリンクが、ユーザに本当に離れたいかを尋ねるようにしてください。そして、答えが No の場合は遷移しません。
=======
Make all links inside the element with `id="contents"` ask the user if they really want to leave. And if they don't then don't follow.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

このようになります:

[iframe height=100 border=1 src="solution"]

詳細:

<<<<<<< HEAD
- 要素内の HTML はロードされているかもしれないし、いつでも動的に再作成されるかもしれません。そのため、すべてのリンクを見つけてハンドラを配置することはできません。イベントの移譲を使ってください。
- コンテンツはネストされたタグを持っている場合があります。リンクも同じです。 `<a href=".."><i>...</i></a>`.
=======
- HTML inside the element may be loaded or regenerated dynamically at any time, so we can't find all links and put handlers on them. Use event delegation.
- The content may have nested tags. Inside links too, like `<a href=".."><i>...</i></a>`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
