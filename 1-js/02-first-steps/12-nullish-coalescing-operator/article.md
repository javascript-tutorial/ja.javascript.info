<<<<<<< HEAD
# NULL合体演算子(Nullish coalescing operator) '??'

[recent browser="new"]

NULL合体演算子は２つの疑問符 `??` で記述されます。

これは `null` と `undefined` を同じように扱うので、この記事では特別な用語を使用します。`null` でも `undefined` でも無いときは、"定義済み" である、と言います。

`a ?? b` の結果は:
- `a` が `null` あるいは `undefined` でなければ `a`,
- それ以外の場合は `b`.

つまり、`??` は `null/undefined` でなければ最初の引数を返し、それ以外の場合は2つ目を返します。

NULL合体演算子はまったく新しいものではありません。2つのうちから、最初の "定義済み" の値を取得するには良い構文です。

既に知っている演算子を使用して `result = a ?? b` を書き直すことができます:
=======
# Nullish coalescing operator '??'

[recent browser="new"]

The nullish coalescing operator is written as two question marks `??`.

As it treats `null` and `undefined` similarly, we'll use a special term here, in this article. For brevity, we'll say that a value is "defined" when it's neither `null` nor `undefined`.

The result of `a ?? b` is:
- if `a` is defined, then `a`,
- if `a` isn't defined, then `b`.

In other words, `??` returns the first argument if it's not `null/undefined`. Otherwise, the second one.

The nullish coalescing operator isn't anything completely new. It's just a nice syntax to get the first "defined" value of the two.

We can rewrite `result = a ?? b` using the operators that we already know, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
result = (a !== null && a !== undefined) ? a : b;
```

<<<<<<< HEAD
これで、`??` がすることがなにか明確ですね。これがどこで役立つが見ていきましょう。

`??` の一般的なユースケースは、潜在的に未定義の変数のデフォルト値を提供することです。

例えば、ここでは定義済みであれば `user` を、そうでなければ `Anonymous` を表示します:
=======
Now it should be absolutely clear what `??` does. Let's see where it helps.

The common use case for `??` is to provide a default value.

For example, here we show `user` if its value isn't `null/undefined`, otherwise `Anonymous`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user;

<<<<<<< HEAD
alert(user ?? "Anonymous"); // Anonymous (user は未定義)
```

こちらは名前が割り当てられた `user` の例です:
=======
alert(user ?? "Anonymous"); // Anonymous (user is undefined)
```

Here's the example with `user` assigned to a name:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = "John";

<<<<<<< HEAD
alert(user ?? "Anonymous"); // John (user は定義済み)
```

`??` のシーケンスを使用して、`null/undefined` ではないリストから最初の値を選択することも可能です。

変数 `firstName`, `lastName` or `nickName` にユーザデータがあるとしましょう。ユーザが値を入れなかった場合、未定義かもしれません。

これらの変数の1つを使用してユーザ名を表示、あるいはすべて未定義の場合には "Anonymous" と表示したいです。

そのために `??` 演算子を使用しましょう:
=======
alert(user ?? "Anonymous"); // John (user is not null/undefined)
```

We can also use a sequence of `??` to select the first value from a list that isn't `null/undefined`.

Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be not defined, if the user decided not to fill in the corresponding values.

We'd like to display the user name using one of these variables, or show "Anonymous" if all of them are `null/undefined`.

Let's use the `??` operator for that:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

<<<<<<< HEAD
// 最初の null/undefined でない値を表示します
=======
// shows the first defined value:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

<<<<<<< HEAD
## || との比較

[前のチャプター](info:logical-operators#or-finds-the-first-truthy-value) で説明したように、OR `||` 演算子は `??` と同じ方法で利用することができます。

例えば、上のコードで `??` を `||` に置き換えることができ、同じ結果を得ることができます:
=======
## Comparison with ||

The OR `||` operator can be used in the same way as `??`, as it was described in the [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).

For example, in the code above we could replace `??` with `||` and still get the same result:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

<<<<<<< HEAD
// 最初の真値を表示
=======
// shows the first truthy value:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

<<<<<<< HEAD
歴史的には、OR `||` 演算子が最初にありました。JavaScript の登場以来存在しているため、開発者は長い間そのような目的で使用していました。

一方、NULL合体演算子 `??` が JavaScript に追加されたのは最近のことで、その理由は人々が `||` にあまり満足していなかったためです。

重要な違いは次の通りです:
- `||` は最初の *真* の値を返します。
- `??` は最初の *定義済み* の値を返します。

言い換えると、`||` は `false`, `0`, 空文字 `""` と `null/undefined` を区別しません。それらはすべて同じ偽値です。これらのいずれかが `||` の引数の最初にある場合は、2つ目の引数が結果として取得されます。

ただし、実際には、変数が `null/undefined` の場合にのみデフォルト値を使用したい場合があります。つまり、値が本当に未知/設定されていない場合です。

例として次を考えましょう:
=======
Historically, the OR `||` operator was there first. It exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.

On the other hand, the nullish coalescing operator `??` was added to JavaScript only recently, and the reason for that was that people weren't quite happy with `||`.

The important difference between them is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.

In other words, `||` doesn't distinguish between `false`, `0`, an empty string `""` and `null/undefined`. They are all the same -- falsy values. If any of these is the first argument of `||`, then we'll get the second argument as the result.

In practice though, we may want to use default value only when the variable is `null/undefined`. That is, when the value is really unknown/not set.

For example, consider this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

<<<<<<< HEAD
- `height || 100` は `height` が偽値になるかをチェックし、それは `0` であり偽です。
    - なので、`||` の結果は2つ目の引数である `100` です。
- `height ?? 100` は `height` が `null/undefined` かをチェックしますが、そうではありません。
    - なので、結果は `height` の "まま"、つまり `0` です。

実践では、高さゼロはしばしば有効な値であり、デフォルト値で置き換えられるべきではありません。こういった場合、`??` が正しい動作をします。

## 優先順位

`??` の優先順位は、おおよそ `||` と同じですが、少しだけ低いです。[MDN テーブル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table) で `5` です(`||` は `6`)。

つまり、`||` と同様に NULL合体演算子 `??` は `=` と `?` の前に評価されますが、`+` や `*` などの他のほとんどの演算子の後に評価されます。

したがって、他の演算子を含む式で `??` で値を選択したい場合は、括弧を追加することを検討してください:
=======
- The `height || 100` checks `height` for being a falsy value, and it's `0`, falsy indeed.
    - so the result of `||` is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it's not,
    - so the result is `height` "as is", that is `0`.

In practice, the zero height is often a valid value, that shouldn't be replaced with the default. So `??` does just the right thing.

## Precedence

The precedence of the `??` operator is the same as `||`. They both equal `3` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

That means that, just like `||`, the nullish coalescing operator `??` is evaluated before `=` and `?`, but after most other operations, such as `+`, `*`.

So we may need to add parentheses in expressions like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let height = null;
let width = null;

<<<<<<< HEAD
// 重要: 括弧を使用します
=======
// important: use parentheses
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

<<<<<<< HEAD
そうでない場合、括弧を省略すると `*` は `??` よりも優先度が高いため、最初に実行され、正しくない結果になるでしょう。

```js
// 括弧なし
let area = height ?? 100 * width ?? 50;

// ...これと同じように動作します (恐らくしたいことではないはずです):
let area = height ?? (100 * width) ?? 50;
```

###  && や || と一緒に ?? を使用する

安全上の理由により、JavaScript は優先順位が括弧で明示的に指定されていない限り、`&&` や `||` 演算子と一緒に `??` を用いることを禁止しています。

次のコードは構文エラーになります:
=======
Otherwise, if we omit parentheses, then as `*` has the higher precedence than `??`, it would execute first, leading to incorrect results.

```js
// without parentheses
let area = height ?? 100 * width ?? 50;

// ...works this way (not what we want):
let area = height ?? (100 * width) ?? 50;
```

### Using ?? with && or ||

Due to safety reasons, JavaScript forbids using `??` together with `&&` and `||` operators, unless the precedence is explicitly specified with parentheses.

The code below triggers a syntax error:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

<<<<<<< HEAD
この制限には当然議論の余地がありますが、人々が `||` から `??` に切り替え始めるときに、プログラミングのミスを避ける目的で言語仕様に追加されました。

回避するには明示的に括弧を使用します:

```js run
*!*
let x = (1 && 2) ?? 3; // 動作します
=======
The limitation is surely debatable, it was added to the language specification with the purpose to avoid programming mistakes, when people start to switch from `||` to `??`.

Use explicit parentheses to work around it:

```js run
*!*
let x = (1 && 2) ?? 3; // Works
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*

alert(x); // 2
```

<<<<<<< HEAD
## サマリ

- Null合体演算子 `??` は一覧から "定義済み" の値を選択するための簡単な方法を提供します。

    変数にデフォルト値を代入するために使用されます:

    ```js
    // height が null あるいは undefined であれば height=100 を設定します
    height = height ?? 100;
    ```

- 演算子 `??` は優先度が低く、`?` や `=` よりも少し高い程度です。そのため、式の中で使用する際には括弧を追加することを検討してください。
- 明示的な括弧なしに  `||` や `&&` と一緒に利用することは禁止されています。
=======
## Summary

- The nullish coalescing operator `??` provides a short way to choose the first "defined" value from a list.

    It's used to assign default values to variables:

    ```js
    // set height=100, if height is null or undefined
    height = height ?? 100;
    ```

- The operator `??` has a very low precedence, only a bit higher than `?` and `=`, so consider adding parentheses when using it in an expression.
- It's forbidden to use it with `||` or `&&` without explicit parentheses.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
