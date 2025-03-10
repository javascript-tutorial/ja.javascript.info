
# アロー関数を使った書き換え

<<<<<<< HEAD
次のコードで、関数式をアロー関数に置き換えてください。:
=======
Replace Function Expressions with arrow functions in the code below:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```
