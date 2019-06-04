
パターンの開始は明らかです: `pattern:<style`.

...しかし次に単純に `<style.*?>` と書くことはできません。なぜなら `match:<styler>` がマッチするからです。

`match:<style` の後にスペースがあり、その後必要に応じてなにかが続く、もしくは終了である `match:>` が必要です。

正規表現はこのようになります: `pattern:<style(>|\s.*?>)`.

動作:

```js run
let reg = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(reg) ); // <style>, <style test="...">
```
