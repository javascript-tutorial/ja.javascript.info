# MAC アドレスのチェック

ネットワークインターフェースの [MAC アドレス](https://en.wikipedia.org/wiki/MAC_address) はコロンで区切られた6つの2桁の16進数から構成されます。

例: `subject:'01:32:54:67:89:AB'`.

文字列が MAC アドレスかをチエックする正規表現を書いてください。

使用方法:
```js
let regexp = /your regexp/;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (コロンなし)

alert( regexp.test('01:32:54:67:89') ); // false (数字が5個, 6個である必要があります)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ)
```
