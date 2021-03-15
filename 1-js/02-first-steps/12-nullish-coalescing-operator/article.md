<<<<<<< HEAD
# NULL合体演算子(Nullish coalescing operator) '??'

[recent browser="new"]

NULL合体演算子 `??` はリストの中から最初の "定義済み" 変数を選択するための短縮構文です。

`a ?? b` の結果は:
- `a` が `null` あるいは `undefined` でなければ `a`,
- それ以外の場合は `b`.

したがって、`x = a ?? b` は以下と同等です:

```js
x = (a !== null && a !== undefined) ? a : b;
```

次はより長い例です。

想像してください、ユーザがいて、性、名、ニックネーム用の変数 `firstName`, `lastName`, `nickName` があるとします。ユーザが何も入力しなければ、それらはすべて undefined になるかもしれません。

ユーザ名を表示します: 3つの変数のいずれか、あるいは設定されていない場合は "Anonymous" とします。

`??` 演算子を使って最初に定義されたものを選択しましょう。:
=======
# Nullish coalescing operator '??'

[recent browser="new"]

The nullish coalescing operator is written as two question marks `??`.

As it treats `null` and `undefined` similarly, we'll use a special term here, in this article. We'll say that an expression is "defined" when it's neither `null` nor `undefined`.

The result of `a ?? b` is:
- if `a` is defined, then `a`,
- if `a` isn't defined, then `b`.

In other words, `??` returns the first argument if it's not `null/undefined`. Otherwise, the second one.

The nullish coalescing operator isn't anything completely new. It's just a nice syntax to get the first "defined" value of the two.

We can rewrite `result = a ?? b` using the operators that we already know, like this:

```js
result = (a !== null && a !== undefined) ? a : b;
```

Now it should be absolutely clear what `??` does. Let's see where it helps.

The common use case for `??` is to provide a default value for a potentially undefined variable.

For example, here we show `user` if defined, otherwise `Anonymous`:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous (user not defined)
```

Here's the example with `user` assigned to a name:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user defined)
```

We can also use a sequence of `??` to select the first value from a list that isn't `null/undefined`.

Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be not defined, if the user decided not to enter a value.

We'd like to display the user name using one of these variables, or show "Anonymous" if all of them aren't defined.

Let's use the `??` operator for that:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

<<<<<<< HEAD
// 最初の null/undefined でない値を表示します
=======
// shows the first defined value:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

<<<<<<< HEAD
## || との比較

OR `||` 演算子は `??` と同じ方法で利用することができます。[前のチャプター](info:logical-operators#or-finds-the-first-truthy-value) で説明したように、実際、上のコードでは `??` を `||` に置き換えることができ、同じ結果を得ることができます。

重要な違いは次の通りです:
- `||` は最初の *真* の値を返します。
- `??` は最初の *定義済み* の値を返します。

これは、`null/undefined` を `0` とは別に扱いたい場合、非常に重要です。

例えば、次を考えてみましょう:

```js
height = height ?? 100;
```

`height` が未定義であれば、`100` が設定されます。

`||` と比較してみましょう:
=======
## Comparison with ||

The OR `||` operator can be used in the same way as `??`, as it was described in the [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).

For example, in the code above we could replace `??` with `||` and still get the same result:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first truthy value:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

Historically, the OR `||` operator was there first. It exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.

On the other hand, the nullish coalescing operator `??` was added to JavaScript only recently, and the reason for that was that people weren't quite happy with `||`.

The important difference between them is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.

In other words, `||` doesn't distinguish between `false`, `0`, an empty string `""` and `null/undefined`. They are all the same -- falsy values. If any of these is the first argument of `||`, then we'll get the second argument as the result.

In practice though, we may want to use default value only when the variable is `null/undefined`. That is, when the value is really unknown/not set.

For example, consider this:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

<<<<<<< HEAD
ここでは、`height || 100` は 高さゼロを `null` や `undefined` あるいは他の偽の値と同様に未定義として扱っています。そのため、結果は `100` です。

`height ?? 100` は `height` がまさに `null` あるいは `undefined` の場合にのみ `100` を返します。したがって、`alert` は高さの値 `0` を "そのまま" 表示します。

どちらの振る舞いがよいかはユースケースによります。高さゼロは有効な値の場合、`??` の方が好ましいです。

## 優先順位

`??` の順位は低めです: [MDN テーブル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table) の `5` です。

したがって、`??` は他の多くの演算子の後で、`=` と `?` の前に評価されます。

複雑な式で `??` を用いて値を選択する必要がある場合は括弧を用いることを検討してください:
=======
- The `height || 100` checks `height` for being a falsy value, and it's `0`, falsy indeed.
    - so the result of `||` is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it's not,
    - so the result is `height` "as is", that is `0`.

In practice, the zero height is often a valid value, that shouldn't be replaced with the default. So `??` does just the right thing.

## Precedence

The precedence of the `??` operator is about the same as `||`, just a bit lower. It equals `5` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table), while `||` is `6`.

That means that, just like `||`, the nullish coalescing operator `??` is evaluated before `=` and `?`, but after most other operations, such as `+`, `*`.

So if we'd like to choose a value with `??` in an expression with other operators, consider adding parentheses:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

```js run
let height = null;
let width = null;

<<<<<<< HEAD
// 重要: 括弧を使用します
=======
// important: use parentheses
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

<<<<<<< HEAD
そうでない場合、括弧を省略すると `*` は `??` よりも優先度が高いため、最初に実行されます。

これば次のように動くことを意味します:

```js
// 恐らくこれは正しくない計算でしょう
let area = height ?? (100 * width) ?? 50;
```

また、ここには関連する言語レベルの制限もあります。

**安全上の理由により、`&&` や `||` 演算子と一緒に `??` を用いることは禁止されています。**

次のコードは構文エラーになります:
=======
Otherwise, if we omit parentheses, then as `*` has the higher precedence than `??`, it would execute first, leading to incorrect results.

```js
// without parentheses
let area = height ?? 100 * width ?? 50;

// ...works the same as this (probably not what we want):
let area = height ?? (100 * width) ?? 50;
```

### Using ?? with && or ||

Due to safety reasons, JavaScript forbids using `??` together with `&&` and `||` operators, unless the precedence is explicitly specified with parentheses.

The code below triggers a syntax error:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

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
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
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

- 演算子 `??` は優先度が低く、`?` や `=` よりも少し高い程度です。
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
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
