<<<<<<< HEAD
# Github からユーザをフェッチする

Github のログイン(ユーザ名)の配列を取得し、Github からユーザをフェッチし、Github ユーザの配列を返す非同期関数 `getUsers(names)` を作成してください。

指定された `USERNAME` に対するユーザ情報の Github url は `https://api.github.com/users/USERNAME` です。

サンドボックスにテスト例があります。

重要な点:

1. ユーザ毎に1つの `fetch` リクエストがあるはずです。また、リクエストはお互い待つ必要はありません。データはなるべく早く取得できるようにしてください。
2. リクエストが失敗した場合、またはそのようなユーザがいない場合は、関数は結果の配列で `null` を返します。
=======
# Fetch users from GitHub

Create an async function `getUsers(names)`, that gets an array of GitHub logins, fetches the users from GitHub and returns an array of GitHub users.

The GitHub url with user information for the given `USERNAME` is: `https://api.github.com/users/USERNAME`.

There's a test example in the sandbox.

Important details:

1. There should be one `fetch` request per user.
2. Requests shouldn't wait for each other. So that the data arrives as soon as possible.
3. If any request fails, or if there's no such user, the function should return `null` in the resulting array.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
