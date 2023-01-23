importance: 5

---

<<<<<<< HEAD
# 関数の軍隊

次のコードは `shooters` の配列を作ります。

すべての関数は、その番号を出力するためのものです。しかし、どこか間違っています...
=======
# Army of functions

The following code creates an array of `shooters`.

Every function is meant to output its number. But something is wrong...
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
<<<<<<< HEAD
    let shooter = function() { // 射手(shooter) 関数
      alert( i ); // その番号を表示するべき
    };
    shooters.push(shooter);
    i++;
  }

=======
    let shooter = function() { // create a shooter function,
      alert( i ); // that should show its number
    };
    shooters.push(shooter); // and add it to the array
    i++;
  }

  // ...and return the array of shooters
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  return shooters;
}

let army = makeArmy();

<<<<<<< HEAD
army[0](); // 射手 番号 0 表示 10
army[5](); // また 番号 5 ですが表示は 10...
// ... すべての射手は 0, 1, 2, 3... の代わりに 10 が表示されます
```

なぜすべての射手(shooters)は同じものが表示されるのでしょう？期待通りに動作するようコードを直してください。
=======
*!*
// all shooters show 10 instead of their numbers 0, 1, 2, 3...
army[0](); // 10 from the shooter number 0
army[1](); // 10 from the shooter number 1
army[2](); // 10 ...and so on.
*/!*
```

Why do all of the shooters show the same value? 

Fix the code so that they work as intended.

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
