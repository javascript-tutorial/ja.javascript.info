importance: 5

---

# 新しい計算機を作る

3つのメソッドをもつオブジェクトを作るコンストラクタ関数 `Calculator` を作りなさい:

- `read()` は`prompt` を使って2つの値を訪ね、オブジェクトプロパティの中でそれを覚えます。
- `sum()` はそれらのプロパティの合計を返します。
- `mul()` はそれらのプロパティの掛け算結果を返します。

例:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
