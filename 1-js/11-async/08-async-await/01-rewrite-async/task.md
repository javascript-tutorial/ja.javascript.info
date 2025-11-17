
# async/await を使用して書き直す

<<<<<<< HEAD
チャプター <info:promise-chaining> にある例の1つを `.then/catch` の代わりに `async/await` を使って書き直してください。: 
=======
Rewrite this example code from the chapter <info:promise-chaining> using `async/await` instead of `.then/catch`:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404
```
