<<<<<<< HEAD
# hh:mm または hh-mm の時間を見つける

時間は `hours:minutes` もしくは `hours-minutes` というフォーマットで表せます。いずれの時も分も2桁です: `09:00` や `21-30`.

時間を見つける正規表現を書いてください:

```js
let reg = /your regexp/g;
alert( "Breakfast at 09:00. Dinner at 21-30".match(reg) ); // 09:00, 21-30
```

P.S. このタスクでは、時間は常に正しいと想定するので、"45:67" のような正しくない文字列をフィルタする必要はありません。あとでそれらも扱っていきます。
=======
# Find the time as hh:mm or hh-mm

The time can be in the format `hours:minutes` or `hours-minutes`. Both hours and minutes have 2 digits:  `09:00` or `21-30`.

Write a regexp to find time:

```js
let regexp = /your regexp/g;
alert( "Breakfast at 09:00. Dinner at 21-30".match(regexp) ); // 09:00, 21-30
```

P.S. In this task we assume that the time is always correct, there's no need to filter out bad strings like "45:67". Later we'll deal with that too.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
