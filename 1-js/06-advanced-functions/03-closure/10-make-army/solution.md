
<<<<<<< HEAD
`makeArmy` の中で行われていることを検査してみましょう、それで解決策が明白になるでしょう。

1. 空の配列 `shooters` を作ります:
=======
Let's examine what exactly happens inside `makeArmy`, and the solution will become obvious.

1. It creates an empty array `shooters`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js
    let shooters = [];
    ```
<<<<<<< HEAD
2. ループで、`shooters.push(function...)` を通してそれを埋めます。

    すべての要素は関数なので、結果の配列はこのように見えます:
=======
2. Fills it with functions via `shooters.push(function)` in the loop.

    Every element is a function, so the resulting array looks like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js no-beautify
    shooters = [
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); }
    ];
    ```

<<<<<<< HEAD
3. 配列が関数から返却されます。

次に、`army[5]()` の呼び出しは、その配列から `army[5]` の要素を取得(それは関数になります)し、呼び出します。

さて、なぜすべての関数は同じものを表示するのでしょう？

それは、`shooter` 関数の内側にローカル変数 `i` がないからです。このような関数が呼ばれるとき、`i` はその外部のレキシカル環境から取られます。

`i` の値は何になるでしょう？

ソースを見ると:

```js
function makeArmy() {
  ...
  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter function
      alert( i ); // should show its number
    };
    ...
  }
  ...
}
```

...`i` は現在の `makeArmy()` の実行に関連付けられたレキシカル環境で生きているのがわかります。しかし、`army[5]()` が呼ばれたとき、`makeArmy` はすでにその処理を終えているので、`i` は最後の値である `10` (`while` の最後) です。

結果として、すべての `shooter` 関数は外部のレキシカル環境から同じ最後の値 `i=10` を取ります。

修正はとてもシンプルです。:

```js run
function makeArmy() {

  let shooters = [];

*!*
  for(let i = 0; i < 10; i++) {
*/!*
    let shooter = function() { // shooter function
      alert( i ); // should show its number
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

これで、正しく動きます。なぜなら、`for (..) {...}` で毎回コードブロックが実行され、`i` の値に対応する新しいレキシカル環境が作られるからです。

従って、`i` の値は今は少し近くにあります。`makeArmy` レキシカル環境ではなく、現在のループイテレーションに対応するレキシカル環境の中です。`shooter` は作られたレキシカル環境から値を取り出します。

![](lexenv-makearmy.svg)

これは、`while` を `for` で書き直しました。

別のトリックでも可能です。この話題をより理解するために次のコードを見てみましょう。:


```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
*!*
    let j = i;
*/!*
    let shooter = function() { // shooter function
      alert( *!*j*/!* ); // should show its number
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

ちょうど `for` と同じように `while` ループは各実行に対するレキシカル環境を作ります。従って、`shooter` の正しい値を取得することが確認できます。

私たちは `let j = i` のコピーをしています。これはループ本体のローカル `j` を作り、`i` の値をコピーします。プリミティブは "値によって" コピーされるので、現在のループイテレーションに属する実際に完全に独立した `i` のコピーになります。
=======
3. The array is returned from the function.
    
    Then, later, the call to any member, e.g. `army[5]()` will get the element `army[5]` from the array (which is a function) and calls it.
    
    Now why do all such functions show the same value, `10`?
    
    That's because there's no local variable `i` inside `shooter` functions. When such a function is called, it takes `i` from its outer lexical environment.
    
    Then, what will be the value of `i`?
    
    If we look at the source:
    
    ```js
    function makeArmy() {
      ...
      let i = 0;
      while (i < 10) {
        let shooter = function() { // shooter function
          alert( i ); // should show its number
        };
        shooters.push(shooter); // add function to the array
        i++;
      }
      ...
    }
    ```
    
    We can see that all `shooter` functions are created in the lexical environment of `makeArmy()` function. But when `army[5]()` is called, `makeArmy` has already finished its job, and the final value of `i` is `10` (`while` stops at `i=10`).
    
    As the result, all `shooter` functions get the same value from the outer lexical environment and that is, the last value, `i=10`.
    
    ![](lexenv-makearmy-empty.svg)
    
    As you can see above, on each iteration of a `while {...}` block, a new lexical environment is created. So, to fix this, we can copy the value of `i` into a variable within the `while {...}` block, like this:
    
    ```js run
    function makeArmy() {
      let shooters = [];
    
      let i = 0;
      while (i < 10) {
        *!*
          let j = i;
        */!*
          let shooter = function() { // shooter function
            alert( *!*j*/!* ); // should show its number
          };
        shooters.push(shooter);
        i++;
      }
    
      return shooters;
    }
    
    let army = makeArmy();
    
    // Now the code works correctly
    army[0](); // 0
    army[5](); // 5
    ```
    
    Here `let j = i` declares an "iteration-local" variable `j` and copies `i` into it. Primitives are copied "by value", so we actually get an independent copy of `i`, belonging to the current loop iteration.
    
    The shooters work correctly, because the value of `i` now lives a little bit closer. Not in `makeArmy()` Lexical Environment, but in the Lexical Environment that corresponds to the current loop iteration:
    
    ![](lexenv-makearmy-while-fixed.svg)
    
    Such a problem could also be avoided if we used `for` in the beginning, like this:
    
    ```js run demo
    function makeArmy() {
    
      let shooters = [];
    
    *!*
      for(let i = 0; i < 10; i++) {
    */!*
        let shooter = function() { // shooter function
          alert( i ); // should show its number
        };
        shooters.push(shooter);
      }
    
      return shooters;
    }
    
    let army = makeArmy();
    
    army[0](); // 0
    army[5](); // 5
    ```
    
    That's essentially the same, because `for` on each iteration generates a new lexical environment, with its own variable `i`. So `shooter` generated in every iteration references its own `i`, from that very iteration.
    
    ![](lexenv-makearmy-for-fixed.svg)

Now, as you've put so much effort into reading this, and the final recipe is so simple - just use `for`, you may wonder -- was it worth that?

Well, if you could easily answer the question, you wouldn't read the solution. So, hopefully this task must have helped you to understand things a bit better. 

Besides, there are indeed cases when one prefers `while` to `for`, and other scenarios, where such problems are real.

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
