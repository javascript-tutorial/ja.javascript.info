importance: 5

---

<<<<<<< HEAD
# 拡張可能な計算機を作る

"拡張可能な" 計算機オブジェクトを作るコンストラクタ関数 `Calculator` を作りなさい。

タスクは2つのパートから構成されます。

1. 最初に フォーマット "数値 演算子 数値" (スペース区切り) で、`"1 + 2"` のような文字列を取り、結果を返すメソッド `calculate(str)` メソッドを実装します。それはプラス `+` と マイナス `-` を理解できるようにしてください。

    使い方の例:
=======
# Create an extendable calculator

Create a constructor function `Calculator` that creates "extendable" calculator objects.

The task consists of two parts.

1. First, implement the method `calculate(str)` that takes a string like `"1 + 2"` in the format "NUMBER operator NUMBER" (space-delimited) and returns the result. Should understand plus `+` and minus `-`.

    Usage example:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

    ```js
    let calc = new Calculator;

    alert( calc.calculate("3 + 7") ); // 10
    ```
<<<<<<< HEAD
2. 次に、計算機に新しい操作を教えるメソッド `addOperator(name, func)` を追加します。操作 `name` と、それを実装する2つの引数を持つ関数 `func(a,b)` を取ります。

    例えば、乗算 `*`, 除算 `/` やべき乗 `**`:
=======
2. Then add the method `addMethod(name, func)` that teaches the calculator a new operation. It takes the operator `name` and the two-argument function `func(a,b)` that implements it.

    For instance, let's add the multiplication `*`, division `/` and power `**`:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

    ```js
    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8
    ```

<<<<<<< HEAD
- このタスクではかっこや複雑な表現は不要です。
- 数字と演算子は、正確に1つのスペースで区切られます。
- 追加したい場合にエラー処理があるかもしれません。
=======
- No parentheses or complex expressions in this task.
- The numbers and the operator are delimited with exactly one space.
- There may be error handling if you'd like to add it.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
