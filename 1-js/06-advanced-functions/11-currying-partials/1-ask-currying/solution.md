

1. ラッパー関数、簡単化のためにアローを使う:

    ```js 
    askPassword(() => user.login(true), () => user.login(false)); 
    ```

    これで外部変数から `user` を取得し、通常の方法で実行します。

2. もしくは、`user` をコンテキストとして使い、正しい1つ目の引数を持つ `user.login` からの部分関数を作ります:

    ```js 
    askPassword(user.login.bind(user, true), user.login.bind(user, false)); 
    ```
