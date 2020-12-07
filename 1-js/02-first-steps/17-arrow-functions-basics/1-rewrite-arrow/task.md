
# アロー関数を使った書き換え

<<<<<<< HEAD:1-js/02-first-steps/17-arrow-functions-basics/1-rewrite-arrow/task.md
次のコードで、関数式をアロー関数に置き換えてください。:
=======
Replace Function Expressions with arrow functions in the code below:
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b:1-js/02-first-steps/17-arrow-functions-basics/1-rewrite-arrow/task.md

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```
