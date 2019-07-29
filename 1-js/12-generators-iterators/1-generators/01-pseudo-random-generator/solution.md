```js run demo
function* pseudoRandom(seed) {
  let value = seed;

  while(true) {
    value = value * 16807 % 2147483647
    yield value;
  }

};

let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```

<<<<<<< HEAD
注意してください。次のように通常の関数でも同じことができます:
=======
Please note, the same can be done with a regular function, like this:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js run
function pseudoRandom(seed) {
  let value = seed;

  return function() {
    value = value * 16807 % 2147483647;
    return value;
  }
}

let generator = pseudoRandom(1);

alert(generator()); // 16807
alert(generator()); // 282475249
alert(generator()); // 1622650073
```

<<<<<<< HEAD
これは、このコンテキストでは問題ありません。しかし、どこかで役立つかのしれない `for..of` を使ったイテレートや、ジェネレータの合成を使うことはできなくなります。
=======
That also works. But then we loose ability to iterate with `for..of` and to use generator composition, that may be useful elsewhere.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
