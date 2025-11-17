<<<<<<< HEAD
解答: `pattern:\d\d[-:]\d\d`.

```js run
let reg = /\d\d[-:]\d\d/g;
alert( "Breakfast at 09:00. Dinner at 21-30".match(reg) ); // 09:00, 21-30
```

ダッシュ `pattern:'-'` は角括弧の中で特別な意味を持っていますが、先頭や末尾のときではなく、他の文字の間にある場合のみなので、エスケープする必要はないことに注意してください。
=======
Answer: `pattern:\d\d[-:]\d\d`.

```js run
let regexp = /\d\d[-:]\d\d/g;
alert( "Breakfast at 09:00. Dinner at 21-30".match(regexp) ); // 09:00, 21-30
```

Please note that the dash `pattern:'-'` has a special meaning in square brackets, but only between other characters, not when it's in the beginning or at the end, so we don't need to escape it.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
