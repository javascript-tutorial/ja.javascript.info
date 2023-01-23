<<<<<<< HEAD
2桁の16進数は `pattern:[0-9a-f]{2}` (フラグ `pattern:i` がセットされる想定)です。

数値 `NN`、その後5回続く `:NN` が必要です。

正規表現: `pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

あとは、一致がテキスト全体を捕らえるよう、先頭から開始し、末尾で終わるようにします: `pattern:^...$` でパターンをラップすればOKです。

最終的に:

```js run
let regexp = /^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$/i;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (コロンなし)

alert( regexp.test('01:32:54:67:89') ); // false (5数字が5個, 6個である必要があります)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ)
=======
A two-digit hex number is `pattern:[0-9a-f]{2}` (assuming the flag `pattern:i` is set).

We need that number `NN`, and then `:NN` repeated 5 times (more numbers);

The regexp is: `pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

Now let's show that the match should capture all the text: start at the beginning and end at the end. That's done by wrapping the pattern in `pattern:^...$`.

Finally:

```js run
let regexp = /^[0-9a-f]{2}(:[0-9a-f]{2}){5}$/i;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (no colons)

alert( regexp.test('01:32:54:67:89') ); // false (5 numbers, need 6)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ in the end)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
