<<<<<<< HEAD
# switch文

`switch` 文は複数の `if` チェックに置換できます。

これは値を複数のパターンと比較するための、よりわかりやすい方法を提供します。

## 構文 

`switch` は1つ以上の `case` ブロックを持ち、 オプションで default を持ちます。

このようになります:
=======
# The "switch" statement

A `switch` statement can replace multiple `if` checks.

It gives a more descriptive way to compare a value with multiple variants.

## The syntax

The `switch` has one or more `case` blocks and an optional default.

It looks like this:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

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

<<<<<<< HEAD
- `x` の値は、最初の `case` (それは `value1`)の値と厳密な等価のチェックをされます、そして2つ目(`value2`)と続きます。
- 等価なものが見つかった場合、 `switch` は該当する `case` から始まるコードを実行し始めます。最も近い `break` まで(もしくは `switch` の終わりまで)。
- マッチするケースが無い場合は、`default` コードが実行されます(存在する場合)

## 例 

`switch` の例です(実行されるコードはハイライトされています)
=======
- The value of `x` is checked for a strict equality to the value from the first `case` (that is, `value1`) then to the second (`value2`) and so on.
- If the equality is found, `switch` starts to execute the code starting from the corresponding `case`, until the nearest `break` (or until the end of `switch`).
- If no case is matched then the `default` code is executed (if it exists).

## An example

An example of `switch` (the executed code is highlighted):
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

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
<<<<<<< HEAD
    alert( 'Too large' );
=======
    alert( 'Too big' );
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
    break;
  default:
    alert( "I don't know such values" );
}
```

<<<<<<< HEAD
ここで、 `switch` は、最初の `case` である `3` から `a` との比較を始めます。マッチはしません。

そして `4` です。マッチするので、`case 4` から最も近い `break` までの実行を開始します。

**`break` がない場合、チェックなしで次の `case` の実行を継続します。**

`break` なしの例です:
=======
Here the `switch` starts to compare `a` from the first `case` variant that is `3`. The match fails.

Then `4`. That's a match, so the execution starts from `case 4` until the nearest `break`.

**If there is no `break` then the execution continues with the next `case` without any checks.**

An example without `break`:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

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

<<<<<<< HEAD
上の例では、3つの `alert` が順に実行されるでしょう。
=======
In the example above we'll see sequential execution of three `alert`s:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js
alert( 'Exactly!' );
alert( 'Too big' );
alert( "I don't know such values" );
```

<<<<<<< HEAD
````smart header="どのような式も `switch / case` の引数になります"
`switch` と `case` の両方は任意の表現が可能です。

例:
=======
````smart header="Any expression can be a `switch/case` argument"
Both `switch` and `case` allow arbitrary expressions.

For example:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

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
<<<<<<< HEAD
ここで `+a` は `1` が与えられ、 `case` で `b + 1` と比較されます。そして、対応するコードが実行されます。
````

## "case"のグルーピング 

同じコードを共有する複数の `case` のパターンはグループ化できます。

たとえば、`case 3` と `case 5` で同じコードを実行したい場合:

```js run no-beautify
let a = 2 + 2;
=======
Here `+a` gives `1`, that's compared with `b + 1` in `case`, and the corresponding code is executed.
````

## Grouping of "case"

Several variants of `case` which share the same code can be grouped.

For example, if we want the same code to run for `case 3` and `case 5`:

```js run no-beautify
let a = 3;
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

switch (a) {
  case 4:
    alert('Right!');
    break;

*!*
<<<<<<< HEAD
  case 3:                    // (*) 2つのケースをグループ化
=======
  case 3: // (*) grouped two cases
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;
*/!*

  default:
    alert('The result is strange. Really.');
}
```

<<<<<<< HEAD
今、`3` と `5` は同じメッセージを表示します。

ケースを "グループ化" する機能は、`break` がない場合の `switch/case` の動作の副作用です。ここで `case 3` の実行は、`break` がないので `(*)` の行から始まり、`case 5` を通り抜けます。

## 型の問題 

等価チェックは常に厳密であることに注目しましょう。マッチするために値は同じ型である必要があります。

たとえば、このコードを考えてみましょう:

```js run
let arg = prompt("Enter a value?")
=======
Now both `3` and `5` show the same message.

The ability to "group" cases is a side effect of how `switch/case` works without `break`. Here the execution of `case 3` starts from the line `(*)` and goes through `case 5`, because there's no `break`.

## Type matters

Let's emphasize that the equality check is always strict. The values must be of the same type to match.

For example, let's consider the code:

```js run
let arg = prompt("Enter a value?");
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
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
<<<<<<< HEAD
    alert( 'An unknown value' )
}
```

1. `0`, `1` の場合、最初の `alert` が実行されます。
2. `2` の場合は2つ目の `alert` が実行されます。
3. しかし `3` の場合、`prompt` の結果は文字列の `"3"`なので、数字の `3` との厳密な等価 `===` ではありません。そのため、`case 3` はデッドコードです! `default` ケースが実行されるでしょう。
=======
    alert( 'An unknown value' );
}
```

1. For `0`, `1`, the first `alert` runs.
2. For `2` the second `alert` runs.
3. But for `3`, the result of the `prompt` is a string `"3"`, which is not strictly equal `===` to the number `3`. So we've got a dead code in `case 3`! The `default` variant will execute.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
