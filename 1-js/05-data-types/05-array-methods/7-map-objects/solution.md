
```js run no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ); // 1
alert( usersMapped[0].fullName ); // John Smith
```

<<<<<<< HEAD
アロー関数の場合、追加の括弧が必要であることに注意してください。
=======
Please note that in the arrow functions we need to use additional brackets. 
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

このように書くことはできません:
```js
let usersMapped = users.map(user => *!*{*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
```

ご存知のように、2つのアロー関数があります: 本体なし `value => expr` と本体あり `value => {...}`。

ここでは、JavaScript は `{` をオブジェクトの開始ではなく、関数本体の開始として扱います。ワークアラウンドは "通常の" 括弧でそれらを囲むことです。:

```js
let usersMapped = users.map(user => *!*({*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
```

これで大丈夫です。
