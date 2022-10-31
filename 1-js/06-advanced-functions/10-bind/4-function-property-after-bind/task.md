importance: 5

---

# バインド後の関数プロパティ

関数プロパティには値があります。`bind` 後それは変わるでしょうか？なぜ？詳細に述べてください。

<<<<<<< HEAD
=======
There's a value in the property of a function. Will it change after `bind`? Why, or why not?
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

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

