
<<<<<<< HEAD
# 非 async から async を呼び出す

"通常" の関数があります。そこから `async` 呼び出しを行い、その結果を使うにはどうすればよいでしょう？
=======
# Call async from non-async

We have a "regular" function. How to call `async` from it and use its result?
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
<<<<<<< HEAD
  // ...ここに何を書きますか？
  // async wait() をして 10 を取得するのを待ちます
  // 覚えておいてください、"await" は使えません
}
```

P.S. このタスクは技術的には非常に単純です。が、async/await に不慣れた開発者にようある質問です。
=======
  // ...what to write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
}
```

P.S. The task is technically very simple, but the question is quite common for developers new to async/await.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
