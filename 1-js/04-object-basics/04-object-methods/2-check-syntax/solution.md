**エラーです**!

やってみましょう:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // error!
```

ほとんどのブラウザでのエラーメッセージは何を間違えているのか理解できません。

**`user = {...}` の後にセミコロンがないため、エラーになります。**

<<<<<<< HEAD
JavaScript 括弧 `(user.go)()` の前にはセミコロンを想定していないので、このようにコードを解釈します:
=======
JavaScript does not auto-insert a semicolon before a bracket `(user.go)()`, so it reads the code like:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js no-beautify
let user = { go:... }(user.go)()
```

<<<<<<< HEAD
そして、このようなジョイント式は構文的にはオブジェクト `{ go: ...}` を引数 `(user.go)` をもつ関数として呼びだすことができます。また、それは `let user` と同じ行で起こります。なので、`user` オブジェクトはまだ定義されていないのでエラーになります。
=======
Then we can also see that such a joint expression is syntactically a call of the object `{ go: ... }` as a function with the argument `(user.go)`. And that also happens on the same line with `let user`, so the `user` object has not yet even been defined, hence the error.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

セミコロンを挿入すると、すべてうまく行きます。:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

<<<<<<< HEAD
`(user.go)` の周りの括弧はここではなにもしないことに注意してください。通常それらは操作の順番のために設定されますが、ここではドット `.` がとにかく最初に動作するので影響がありません。セミコロンだけが関係します。
=======
Please note that brackets around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
