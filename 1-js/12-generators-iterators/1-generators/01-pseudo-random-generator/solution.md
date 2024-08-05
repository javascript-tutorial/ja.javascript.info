```js run demo
function* pseudoRandom(seed) {
  let value = seed;

  while(true) {
<<<<<<< HEAD
    value = value * 16807 % 2147483647
=======
    value = value * 16807 % 2147483647;
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d
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
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d

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
That also works. But then we lose ability to iterate with `for..of` and to use generator composition, that may be useful elsewhere.
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d
