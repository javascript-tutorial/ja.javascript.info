
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
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
