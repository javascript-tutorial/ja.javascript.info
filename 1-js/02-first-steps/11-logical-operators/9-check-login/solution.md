

```js run demo
let userName = prompt("Who's there?", '');

if (userName === 'Admin') {

  let pass = prompt('Password?', '');

  if (pass === 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass === '' || pass === null) {
    alert( 'Canceled' );
  } else {
    alert( 'Wrong password' );
  }

} else if (userName === '' || userName === null) {
  alert( 'Canceled' );
} else {
  alert( "I don't know you" );
}
```

<<<<<<< HEAD
`if` ブロック内の縦のインデントに注意してください。技術的には必須ではありませんが、コードの可読性をより良くします。
=======
Note the vertical indents inside the `if` blocks. They are technically not required, but make the code more readable.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
