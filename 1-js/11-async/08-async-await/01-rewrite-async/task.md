
# async/await を使用して書き直す

チャプター <info:promise-chaining> にある例の1つを `.then/catch` の代わりに `async/await` を使って書き直してください。: 

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
}

loadJson('no-such-user.json') // (3)
  .catch(alert); // Error: 404
```
