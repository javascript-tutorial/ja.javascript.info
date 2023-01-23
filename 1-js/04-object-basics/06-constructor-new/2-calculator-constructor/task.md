importance: 5

---

# 新しい計算機を作る

3つのメソッドをもつオブジェクトを作るコンストラクタ関数 `Calculator` を作りなさい:

<<<<<<< HEAD
- `read()` は`prompt` を使って2つの値を訪ね、オブジェクトプロパティの中でそれを覚えます。
- `sum()` はそれらのプロパティの合計を返します。
- `mul()` はそれらのプロパティの掛け算結果を返します。
=======
- `read()` prompts for two values and saves them as object properties with names `a` and `b` respectively.
- `sum()` returns the sum of these properties.
- `mul()` returns the multiplication product of these properties.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
