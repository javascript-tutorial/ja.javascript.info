
# 非 async から async を呼び出す

"通常" の関数があります。そこから `async` 呼び出しを行い、その結果を使うにはどうすればよいでしょう？

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...ここに何を書きますか？
  // async wait() をして 10 を取得するのを待ちます
  // 覚えておいてください、"await" は使えません
}
```

P.S. このタスクは技術的には非常に単純です。が、async/await に不慣れた開発者にようある質問です。
