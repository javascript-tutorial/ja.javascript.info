<<<<<<< HEAD
# MAC アドレスのチェック

ネットワークインターフェースの [MAC アドレス](https://en.wikipedia.org/wiki/MAC_address) はコロンで区切られた6つの2桁の16進数から構成されます。

例: `subject:'01:32:54:67:89:AB'`.

文字列が MAC アドレスかをチエックする正規表現を書いてください。

使用方法:
=======
# Check MAC-address

[MAC-address](https://en.wikipedia.org/wiki/MAC_address) of a network interface consists of 6 two-digit hex numbers separated by a colon.

For instance: `subject:'01:32:54:67:89:AB'`.

Write a regexp that checks whether a string is MAC-address.

Usage:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```js
let regexp = /your regexp/;

alert( regexp.test('01:32:54:67:89:AB') ); // true

<<<<<<< HEAD
alert( regexp.test('0132546789AB') ); // false (コロンなし)

alert( regexp.test('01:32:54:67:89') ); // false (数字が5個, 6個である必要があります)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ)
=======
alert( regexp.test('0132546789AB') ); // false (no colons)

alert( regexp.test('01:32:54:67:89') ); // false (5 numbers, must be 6)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ at the end)
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```
