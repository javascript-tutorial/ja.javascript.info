importance: 5

---

# バインド後の関数プロパティ

関数プロパティには値があります。`bind` 後それは変わるでしょうか？なぜ？詳細に述べてください。

<<<<<<< HEAD
=======
There's a value in the property of a function. Will it change after `bind`? Why, or why not?
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // 何が出力されるでしょう? それはなぜでしょう?
*/!*
```

