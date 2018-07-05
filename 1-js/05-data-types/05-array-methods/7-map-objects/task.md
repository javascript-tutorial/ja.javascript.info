importance: 5

---

# オブジェクトへのマップ

あなたは `user` オブジェクトの配列をもっており、それは `name`, `surname` と `id` を持っています。

そこから、`id` と `fullName` (`fullName` は `name` と `surname` から生成されます)をもつオブジェクトの別の配列を作成するコードを書いてください。

例:

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... your code ... */
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // John Smith
```

したがって、実際には、オブジェクトの1つの配列を別の配列にマップする必要があります。 ここで `=>`を使ってみてください。 
