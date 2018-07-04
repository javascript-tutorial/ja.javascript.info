importance: 5

---

# テキストを切り捨てる

`str` の長さをチェックし、`maxlength` を超えていた場合には、-- 長さを `maxlength` と等しくするために、`str` の末尾を省略記号 `"…"` に置き換える関数 `truncate(str, maxlength)` を作りなさい。

関数の結果は(必要であれば)切り捨てられた文字列です。

例:

```js
truncate("What I'd like to tell on this topic is:", 20) = "What I'd like to te…"

truncate("Hi everyone!", 20) = "Hi everyone!"
```
