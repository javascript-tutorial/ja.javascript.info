
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
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
