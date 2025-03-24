
<<<<<<< HEAD

```js run
let users = [
  { name: "John", age: 20, surname: "Johnson" }, 
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];

*!*
function byField(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}
*/!*

users.sort(byField('name'));
users.forEach(user => alert(user.name)); // Ann, John, Pete

users.sort(byField('age'));
users.forEach(user => alert(user.name)); // Pete, Ann, John
```

=======
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
