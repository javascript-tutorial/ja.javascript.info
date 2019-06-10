# switch文

`switch` 文は複数の `if` チェックに置換できます。

これは値を複数のパターンと比較するための、よりわかりやすい方法を提供します。

<<<<<<< HEAD
[cut]

## 構文 
=======
## The syntax
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

`switch` は1つ以上の `case` ブロックを持ち、 オプションで default を持ちます。

このようになります:

```js no-beautify
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- `x` の値は、最初の `case` (それは `value1`)の値と厳密な等価のチェックをされます、そして2つ目(`value2`)と続きます。
- 等価が見つかった場合、 `switch` は該当する `case` から始まるコードを実行し始めます。最も近い `break` まで(もしくは `switch` の終わりまで)。
- マッチするケースが無い場合は、`default` コードが実行されます(存在する場合)

## 例 

`switch` の例です(実行されるコードはハイライトされています)

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
    break;
*!*
  case 4:
    alert( 'Exactly!' );
    break;
*/!*
  case 5:
    alert( 'Too large' );
    break;
  default:
    alert( "I don't know such values" );
}
```

ここで、 `switch` は `3` というパターンの最初の `case` から `a` と比較を始めます。マッチはしません。

そして `4` です。マッチするので、`case 4` から最も近い `break` までの実行を開始します。

**`break` がない場合、チェックなしで次の `case` の実行を継続します。**


`break` なしの例です:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
*!*
  case 4:
    alert( 'Exactly!' );
  case 5:
    alert( 'Too big' );
  default:
    alert( "I don't know such values" );
*/!*
}
```

上の例では、3つの `alert` の順序実行になるでしょう。

```js
alert( 'Exactly!' );
alert( 'Too big' );
alert( "I don't know such values" );
```

````smart header="どのような式も `switch / case` の引数になります"
`switch` と `case` の両方は任意の表現が可能です。

例:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("this runs, because +a is 1, exactly equals b+1");
    break;
*/!*

  default:
    alert("this doesn't run");
}
```
ここで `+a` は `1` が与えられ、 `case` で `b + 1` と比較されます。そして、対応するコードが実行されます。
````

## "case"のグルーピング 

同じコードを共有する複数の `case` のパターンはグループ化できます。

たとえば、`case 3` と `case 5` で同じコードを実行したい場合:

```js run no-beautify
let a = 2 + 2;

switch (a) {
  case 4:
    alert('Right!');
    break;

*!*
  case 3:                    // (*) 2つのケースをグループ化
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;
*/!*

  default:
    alert('The result is strange. Really.');
}
```

今、`3` と `5` は同じメッセージを表示します。

ケースを "グループ化" する機能は、`break` がない場合の `switch/case` の動作の副作用です。ここで `case 3` の実行は、`break` がないので `(*)` の行から始まり、`case 5` を通り抜けます。

## 型の問題 

等価チェックは常に厳密であることに注目しましょう。
マッチするために値は同じ型である必要があります。

たとえば、このコードを考えてみましょう:

```js run
let arg = prompt("Enter a value?");
switch (arg) {
  case '0':
  case '1':
    alert( 'One or zero' );
    break;

  case '2':
    alert( 'Two' );
    break;

  case 3:
    alert( 'Never executes!' );
    break;
  default:
    alert( 'An unknown value' );
}
```

1. `0`, `1` の場合、最初の `alert` が実行されます。
2. `2` の場合は2つ目の `alert` が実行されます。
3. しかし `3` の場合、`prompt` の結果は文字列の `"3"`なので、数字の `3` との厳密な等価 `===` ではありません。そのため、`case 3` はデッドコードです! `default` ケースが実行されるでしょう。
