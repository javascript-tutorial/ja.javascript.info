<<<<<<< HEAD
検索で大文字と小文字を区別しないようにするには、文字列を小文字にしてから検索してみましょう:
=======
To make the search case-insensitive, let's bring the string to lower case and then search:
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```
