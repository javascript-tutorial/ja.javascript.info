
`makeArmy` の中で行われていることを検査してみましょう、それで解決策が明白になるでしょう。

1. 空の配列 `shooters` を作ります:

    ```js
    let shooters = [];
    ```
2. ループで、`shooters.push(function...)` を通してそれを埋めます。

    すべての要素は関数なので、結果の配列はこのように見えます:

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

<<<<<<< HEAD
修正はとてもシンプルです。:
=======
We can fix it by moving the variable definition into the loop:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

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

<<<<<<< HEAD
これで、正しく動きます。なぜなら、`for (..) {...}` で毎回コードブロックが実行され、`i` の値に対応する新しいレキシカル環境が作られるからです。

従って、`i` の値は今は少し近くにあります。`makeArmy` レキシカル環境ではなく、現在のループイテレーションに対応するレキシカル環境の中です。`shooter` は作られたレキシカル環境から値を取り出します。
=======
Now it works correctly, because every time the code block in `for (let i=0...) {...}` is executed, a new Lexical Environment is created for it, with the corresponding variable `i`.

So, the value of `i` now lives a little bit closer. Not in `makeArmy()` Lexical Environment, but in the Lexical Environment that corresponds the current loop iteration. That's why now it works.
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

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
