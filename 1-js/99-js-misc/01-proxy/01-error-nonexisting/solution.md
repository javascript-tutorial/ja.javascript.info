
```js run
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        throw new ReferenceError(`Property doesn't exist: "${prop}"`)
      }
    }
  });
}

user = wrap(user);

alert(user.name); // John
<<<<<<< HEAD
alert(user.age); // Error: Property doesn't exist
=======
alert(user.age); // ReferenceError: Property doesn't exist: "age"
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b
```
