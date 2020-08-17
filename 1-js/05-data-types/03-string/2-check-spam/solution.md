<<<<<<< HEAD
検索で大文字と小文字を区別しないようにするには、文字列を小文字にしてから検索してみましょう:
=======
To make the search case-insensitive, let's bring the string to lower case and then search:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```
