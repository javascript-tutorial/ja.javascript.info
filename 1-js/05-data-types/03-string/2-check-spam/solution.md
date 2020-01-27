<<<<<<< HEAD
検索で大文字と小文字を区別しないようにするには、文字列を小文字にしてから検索してみましょう:
=======
To make the search case-insensitive, let's bring the string to lower case and then search:
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```
