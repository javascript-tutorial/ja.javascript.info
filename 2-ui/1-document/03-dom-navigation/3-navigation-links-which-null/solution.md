<<<<<<< HEAD
1. はい、真実です。要素 `elem.lastChild` は常に最後の要素で、`nextSibling` を持っていません。なので、子要素がある場合は yes です。
2. いいえ、間違いです。なぜなら、`elem.children[0]` は要素の中の最初子だからです。しかし、その前に非要素ノードがある可能性があります。なので、`previousSibling` はテキストノードかもしれません。

両方のケースに対し、子がいない場合にはエラーになることに注意してください。例えば、`elem.lastChild` が `null` の場合、 `elem.lastChild.nextSibling` にアクセスすることはできません。
=======
1. Yes, true. The element `elem.lastChild` is always the last one, it has no `nextSibling`.
2. No, wrong, because `elem.children[0]` is the first child *among elements*. But there may exist non-element nodes before it. So `previousSibling` may be a text node.

Please note: for both cases if there are no children, then there will be an error.

If there are no children, `elem.lastChild` is `null`, so we can't access `elem.lastChild.nextSibling`. And the collection `elem.children` is empty (like an empty array `[]`).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
