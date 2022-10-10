このタスクの HTML は正しくありません。これが奇妙な事象の理由です。

<<<<<<< HEAD
ブラウザはそれを自動的に修正する必要があります。しかし、`<table>` の中にテキストはないかもしれません。: 仕様によると、テーブル固有のタグだけが許可されます。したがって、ブラウザは `<table>` の *前に* `"aaa"` を追加します。
=======
The browser has to fix it automatically. But there may be no text inside the `<table>`: according to the spec only table-specific tags are allowed. So the browser shows `"aaa"` *before* the `<table>`.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

これで、テーブルを削除したときに文字列が残っていた理由は明白になりました。

<<<<<<< HEAD
この問題はブラウザツールを使ってDOMを調べると簡単に答えることができます。`<table>` の前に `"aaa"` があります。
=======
The question can be easily answered by exploring the DOM using the browser tools. You'll see `"aaa"` before the `<table>`.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

HHTML標準では、悪いHTMLを処理する方法を詳細に指定しています。このようなブラウザの動作は正しいです。
