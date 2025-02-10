<<<<<<< HEAD
検索で大文字と小文字を区別しないようにするには、文字列を小文字にしてから検索してみましょう:
=======
To make the search case-insensitive, let's bring the string to lower case and then search:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```
