<<<<<<< HEAD
# NULL合体演算子(Nullish coalescing operator) '??'

[recent browser="new"]

NULL合体演算子 `??` はリストの中から最初の "定義済み" 変数を選択するための短縮構文です。

`a ?? b` の結果は:
- `a` が `null` あるいは `undefined` でなければ `a`,
- それ以外の場合は `b`.

したがって、`x = a ?? b` は以下と同等です:
=======
# Nullish coalescing operator '??'

[recent browser="new"]

The nullish coalescing operator `??` provides a short syntax for selecting a first "defined" variable from the list.

The result of `a ?? b` is:
- `a` if it's not `null` or `undefined`,
- `b`, otherwise.

So, `x = a ?? b` is a short equivalent to:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js
x = (a !== null && a !== undefined) ? a : b;
```

<<<<<<< HEAD
次はより長い例です。

想像してください、ユーザがいて、性、名、ニックネーム用の変数 `firstName`, `lastName`, `nickName` があるとします。ユーザが何も入力しなければ、それらはすべて undefined になるかもしれません。

ユーザ名を表示します: 3つの変数のいずれか、あるいは設定されていない場合は "Anonymous" とします。

`??` 演算子を使って最初に定義されたものを選択しましょう。:
=======
Here's a longer example.

Imagine, we have a user, and there are variables `firstName`, `lastName` or `nickName` for their first name, last name and the nick name. All of them may be undefined, if the user decided not to enter any value.

We'd like to display the user name: one of these three variables, or show "Anonymous" if nothing is set.

Let's use the `??` operator to select the first defined one:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

<<<<<<< HEAD
// 最初の null/undefined でない値を表示します
=======
// show the first not-null/undefined value
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
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
=======
## Comparison with ||

The OR `||` operator can be used in the same way as `??`. Actually, we can replace `??` with `||` in the code above and get the same result, as it was described in the [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).

The important difference is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.

This matters a lot when we'd like to treat `null/undefined` differently from `0`.

For example, consider this:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js
height = height ?? 100;
```

<<<<<<< HEAD
`height` が未定義であれば、`100` が設定されます。

`||` と比較してみましょう:
=======
This sets `height` to `100` if it's not defined.

Let's compare it with `||`:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

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
Here, `height || 100` treats zero height as unset, same as `null`, `undefined` or any other falsy value. So the result is `100`.

The `height ?? 100` returns `100` only if `height` is exactly `null` or `undefined`. So the `alert` shows the height value `0` "as is".

Which behavior is better depends on a particular use case. When zero height is a valid value, then `??` is preferrable.

## Precedence

The precedence of the `??` operator is rather low: `5` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

So `??` is evaluated after most other operations, but before `=` and `?`.

If we need to choose a value with `??` in a complex expression, then consider adding parentheses:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js run
let height = null;
let width = null;

<<<<<<< HEAD
// 重要: 括弧を使用します
=======
// important: use parentheses
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
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
Otherwise, if we omit parentheses, `*` has the higher precedence than `??` and would run first.

That would work be the same as:

```js
// probably not correct
let area = height ?? (100 * width) ?? 50;
```

There's also a related language-level limitation.

**Due to safety reasons, it's forbidden to use `??` together with `&&` and `||` operators.**

The code below triggers a syntax error:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

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
The limitation is surely debatable, but it was added to the language specification with the purpose to avoid programming mistakes, as people start to switch to `??` from `||`.

Use explicit parentheses to work around it:

```js run
*!*
let x = (1 && 2) ?? 3; // Works
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
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

- The nullish coalescing operator `??` provides a short way to choose a "defined" value from the list.

    It's used to assign default values to variables:

    ```js
    // set height=100, if height is null or undefined
    height = height ?? 100;
    ```

- The operator `??` has a very low precedence, a bit higher than `?` and `=`.
- It's forbidden to use it with `||` or `&&` without explicit parentheses.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
