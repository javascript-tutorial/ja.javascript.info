importance: 3

---

<<<<<<< HEAD
# ログインのチェック

`prompt` でログインを要求するコードを書いてください。

もし訪問者が `"Admin"` と入力したら、パスワードのための `prompt` を出します。もし入力が空行または `key:Esc` の場合 -- "Canceled" と表示します。別の文字列の場合は -- "I don't know you" と表示します。

パスワードは次に沿ってチェックされます:

- ”TheMaster" と等しい場合には "Welcome!" と表示します。
- 別の文字列の場合 -- "Wrong password" を表示します。
- 空文字または入力がキャンセルされた場合には "Canceled." と表示します。


図:

![](ifelse_task.svg)

入れ子の `if` ブロックを使ってください。コードの全体的な読みやすさに気をつけてください。
=======
# Check the login

Write the code which asks for a login with `prompt`.

If the visitor enters `"Admin"`, then `prompt` for a password, if the input is an empty line or `key:Esc` -- show "Canceled", if it's another string -- then show "I don't know you".

The password is checked as follows:

- If it equals "TheMaster", then show "Welcome!",
- Another string -- show "Wrong password",
- For an empty string or cancelled input, show "Canceled"

The schema:

![](ifelse_task.svg)

Please use nested `if` blocks. Mind the overall readability of the code.

Hint:  passing an empty input to a prompt returns an empty string `''`. Pressing `key:ESC` during a prompt returns `null`.
>>>>>>> 20208769e528337949e946f526534d61d38bac47

[demo]
