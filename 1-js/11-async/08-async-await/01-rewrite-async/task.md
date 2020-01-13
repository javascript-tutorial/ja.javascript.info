
# async/await を使用して書き直す

<<<<<<< HEAD:1-js/11-async/08-async-await/01-rewrite-async/task.md
チャプター <info:promise-chaining> にある例の1つを `.then/catch` の代わりに `async/await` を使って書き直してください。: 
=======
Rewrite this example code from the chapter <info:promise-chaining> using `async/await` instead of `.then/catch`:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874:1-js/11-async/08-async-await/01-rewrite-async/task.md

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
