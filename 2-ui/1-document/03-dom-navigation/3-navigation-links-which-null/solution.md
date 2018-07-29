1. はい、真実です。要素 `elem.lastChild` は常に最後の要素で、`nextSibling` を持っていません。なので、子要素がある場合は yes です。
2. いいえ、間違いです。なぜなら、`elem.children[0]` は要素の中の最初子だからです。しかし、その前に非要素ノードがある可能性があります。なので、`previousSibling` はテキストノードかもしれません。

両方のケースに対し、子がいない場合にはエラーになることに注意してください。例えば、`elem.lastChild` が `null` の場合、 `elem.lastChild.nextSibling` にアクセスすることはできません。
