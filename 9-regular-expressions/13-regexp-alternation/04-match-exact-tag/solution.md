
<<<<<<< HEAD
パターンの開始は明らかです: `pattern:<style`.

...しかし次に単純に `<style.*?>` と書くことはできません。なぜなら `match:<styler>` がマッチするからです。

`match:<style` の後にスペースがあり、その後必要に応じてなにかが続く、もしくは終了である `match:>` が必要です。

正規表現はこのようになります: `pattern:<style(>|\s.*?>)`.

動作:

```js run
let reg = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(reg) ); // <style>, <style test="...">
=======
The pattern start is obvious: `pattern:<style`.

...But then we can't simply write `pattern:<style.*?>`, because `match:<styler>` would match it.

We need either a space after `match:<style` and then optionally something else or the ending `match:>`.

In the regexp language: `pattern:<style(>|\s.*?>)`.

In action:

```js run
let regexp = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
>>>>>>> 20208769e528337949e946f526534d61d38bac47
```
