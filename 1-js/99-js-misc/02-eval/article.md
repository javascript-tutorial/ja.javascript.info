<<<<<<< HEAD
# Eval: コード文字列を実行する

組み込みの `eval` 関数を使うとコード文字列を実行することができます。

構文:
=======
# Eval: run a code string

The built-in `eval` function allows to execute a string of code.

The syntax is:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let result = eval(code);
```

<<<<<<< HEAD
例:
=======
For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let code = 'alert("Hello")';
eval(code); // Hello
```

<<<<<<< HEAD
コードの文字列は長かったり、改行や関数定義、変数を含んでいる可能性があります。

`eval` の結果は最後の文の結果です。

例:
=======
A string of code may be long, contain line breaks, function declarations, variables and so on.

The result of `eval` is the result of the last statement.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js run
let value = eval('1+1');
alert(value); // 2
```

```js run
let value = eval('let i = 0; ++i');
alert(value); // 1
```

<<<<<<< HEAD
eval されたコードは現在のレキシカル環境で実行されるため、外部変数を参照することができます。:
=======
The eval'ed code is executed in the current lexical environment, so it can see outer variables:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run no-beautify
let a = 1;

function f() {
  let a = 2;

*!*
  eval('alert(a)'); // 2
*/!*
}

f();
```

<<<<<<< HEAD
同様に外部変数を変更することもできます:
=======
It can change outer variables as well:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js untrusted refresh run
let x = 5;
eval("x = 10");
<<<<<<< HEAD
alert(x); // 10, 値の変更
```

strict モードでは、`eval` は独自のレキシカル環境を持ちます。そのため、eval 内で宣言された関数や変数は外側では見えません。:

```js untrusted refresh run
// 実行可能な例では、'use strict' はデフォルトで有効になっています

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (そのような変数はありません)
// function f も見えません
```

`use strict` がなければ、`eval` は独自のレキシカル環境を持たないので、外側から `x` や `f`を見ることができます。

## "eval" を利用する

モダンプログラミングでは、`eval` は非常に控えめに使用されます。しばしば "eval は悪" と言われます。

理由は簡単です: ずっと昔、JavaScript は今よりずっと弱い言語であり、多くのことは `eval` でしかできませんでした。ですが、それから 10年が経過しました。

現在は、`eval` を利用する理由はほとんどありません。もし誰かがそれを使用しているなら、モダンな言語構造、あるいは [JavaScript Module](info:modules)に置き換えるよい機会です。

外部変数にアクセスする機能には副作用があることに注意してください。

コードの minifier (JSを本番環境に適用する前に使われるツールで、JSを圧縮(minify)します)は最適化のために、ローカル変数をより短いものに置き換えます。これは通常安全ですが、`eval` が使われている場合、それらを参照する可能性があるため安全ではありません。したがって、minifier は `eval` から見える可能性のあるすべてのローカル変数を置き換えません。これはコードの圧縮率に悪影響を及ぼします。

`eval` の内部で外部のローカル変数を使用することは、コードのメンテナンスをより難しくするためバッドプラクティスとされています。

このような問題に対し、完全に安全にする方法は2つです。

**eval されたコードが外部変数を使用していない場合、`eval` を `window.eval(...)` で呼び出してください**

この方法では、コードはグローバルスコープで実行されます。:
=======
alert(x); // 10, value modified
```

In strict mode, `eval` has its own lexical environment. So functions and variables, declared inside eval, are not visible outside:

```js untrusted refresh run
// reminder: 'use strict' is enabled in runnable examples by default

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (no such variable)
// function f is also not visible
```

Without `use strict`, `eval` doesn't have its own lexical environment, so we would see `x` and `f` outside.

## Using "eval"

In modern programming `eval` is used very sparingly. It's often said that "eval is evil".

The reason is simple: long, long time ago JavaScript was a much weaker language, many things could only be done with `eval`. But that time passed a decade ago.

Right now, there's almost no reason to use `eval`. If someone is using it, there's a good chance they can replace it with a modern language construct or a [JavaScript Module](info:modules).

Please note that its ability to access outer variables has side-effects.

Code minifiers (tools used before JS gets to production, to compress it) rename local variables into shorter ones (like `a`, `b` etc) to make the code smaller. That's usually safe, but not if `eval` is used, as local variables may be accessed from eval'ed code string. So minifiers don't do that renaming for all variables potentially visible from `eval`. That negatively affects code compression ratio.

Using outer local variables inside `eval` is also considered a bad programming practice, as it makes maintaining the code more difficult.

There are two ways how to be totally safe from such problems.

**If eval'ed code doesn't use outer variables, please call `eval` as `window.eval(...)`:**

This way the code is executed in the global scope:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js untrusted refresh run
let x = 1;
{
  let x = 5;
<<<<<<< HEAD
  window.eval('alert(x)'); // 1 (グローバル変数)
}
```

**eval されたコードがローカル変数を必要とする場合、`eval` を `new Function` に変更し、引数としてそれらを渡してください**
=======
  window.eval('alert(x)'); // 1 (global variable)
}
```

**If eval'ed code needs local variables, change `eval` to `new Function` and pass them as arguments:**
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

<<<<<<< HEAD
`new Function` についてはチャプター <info:new-function> で説明しています。これは文字列から関数を作成し、グローバルスコープになります。そのため、ローカル変数は見えません。ですが、上記の例のように、引数として明示的に渡すほうがはるかに明白です。

## サマリ

`eval(code)` の呼び出しはコード文字列を実行し、最後の文の結果を返します。
- 通常は必要ないため、モダン JavaScript ではめったに使われません。
- 外部のローカル変数にアクセスできます。これはバッドプラクティスとされています。
- 代わりに、グローバルスコープでコードを `eval` するには `window.eval(code)` を使います。
- あるいは、外部スコープから何らかのデータが必要な場合は `new Function` を使い引数としてそれを渡します。
=======
The `new Function` construct is explained in the chapter <info:new-function>. It creates a function from a string, also in the global scope. So it can't see local variables. But it's so much clearer to pass them explicitly as arguments, like in the example above.

## Summary

A call to `eval(code)` runs the string of code and returns the result of the last statement.
- Rarely used in modern JavaScript, as there's usually no need.
- Can access outer local variables. That's considered bad practice.
- Instead, to `eval` the code in the global scope, use `window.eval(code)`.
- Or, if your code needs some data from the outer scope, use `new Function` and pass it as arguments.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
