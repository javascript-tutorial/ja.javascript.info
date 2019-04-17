
ここには細工はありません。単に `demoGithubUser` の中の `.catch` を `try...catch` に置き換え、必要な場所に  `async/await` を追加しています:

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// gitub が有効なユーザを返すまでユーザ名を訪ねる
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Enter a name?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // エラーがない場合、ループを抜ける
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // alert の後ループを続ける
        alert("No such user, please reenter.");
      } else {
        // 未知のエラー、再スロー
        throw err;
      }
    }      
  }


  alert(`Full name: ${user.name}.`);
  return user;
}

demoGithubUser();
```
