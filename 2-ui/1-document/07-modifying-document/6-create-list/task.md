importance: 4

---

# リストを作成する

ユーザの入力からリストを作成するインタフェースを書いてください。

すべてのリスト項目に対して:

<<<<<<< HEAD
1. `prompt` を使用して、ユーザにそのコンテンツについて訪ねます。
2. それを持つ `<li>` を作成し、`<ul>` に追加します。
3. ユーザが入力をキャンセルするまで続けます(`key:Esc` を押すかプロンプトの CANCEL をするか)。
=======
1. Ask a user about its content using `prompt`.
2. Create the `<li>` with it and add it to `<ul>`.
3. Continue until the user cancels the input (by pressing `key:Esc` or via an empty entry).
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

すべての要素は動的に作られる必要があります。

もしユーザが HTMLタグを入力したとき、それはテキストのように扱う必要があります。

[demo src="solution"]
