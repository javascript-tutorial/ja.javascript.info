
<<<<<<< HEAD:1-js/11-async/08-async-await/02-rewrite-async-2/task.md
# "再スロー" を async/await で書き直す
=======
# Rewrite "rethrow" with async/await
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b:1-js/11-async/08-async-await/02-rewrite-async-2/task.md

下にチャプター <info:promise-chaining> にある "再スロー" の例があります。`.then/catch` の代わりに `async/await` を使って書き直してください。

また、`demoGithubUser` のループのために(`async/await` が簡単になるよう)再帰を取り除きます。

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

// gitub が有効なユーザを返すまでユーザ名を訪ねる
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```
