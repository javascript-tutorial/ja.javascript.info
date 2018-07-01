
# アロー関数を使った書き換え

次のコードで、関数式をアロー関数に置き換えてください。:

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
