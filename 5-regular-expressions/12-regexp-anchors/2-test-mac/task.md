# MAC アドレスをチェックする

ネットワークインターフェースの [MAC アドレス](https://en.wikipedia.org/wiki/MAC_address) はコロンで区切られた6つの2桁の16進数で構成されています。

例: `subject:'01:32:54:67:89:AB'`.

文字列が MAC アドレスかどうかをチェックする正規表現を書いてください。

使用方法:
```js
let reg = /your regexp/;

alert( reg.test('01:32:54:67:89:AB') ); // true

alert( reg.test('0132546789AB') ); // false (コロンなし)

alert( reg.test('01:32:54:67:89') ); // false (5 個, 6 個である必要があります)

alert( reg.test('01:32:54:67:89:ZZ') ) // false (末尾が ZZ)
```
