
# アロー関数を使った書き換え

<<<<<<< HEAD
次のコードで、関数式をアロー関数に置き換えてください。:
=======
Replace Function Expressions with arrow functions in the code below:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

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
