```js run no-beautify
<<<<<<< HEAD
function sortByName(arr) {
  arr.sort((a, b) => b.name > a.name ? 1 : -1);
=======
function sortByAge(arr) {
  arr.sort((a, b) => a.age - b.age);
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// now sorted is: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
