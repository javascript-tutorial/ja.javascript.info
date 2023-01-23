
動かしてみましょう:

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test);
```

<<<<<<< HEAD
結果は2種類あります::
1. `undefined`
2. エラー
=======
Depending on whether you have `use strict` or not, the result may be:
1. `undefined` (no strict mode)
2. An error (strict mode).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

なぜでしょう？ `(*)` で何が起きているのかもう一度見てみましょう:

<<<<<<< HEAD
1. `str` のプロパティにアクセスされたとき、"ラッパーオブジェクト" が作られます。
2. プロパティの操作はそこで行われます。なので、オブエジェクトは `test`  プロパティを取得します。
3. 操作が終了し、"ラッパーオブジェクト" は消えます。

なので、最後の行では `str` はそのプロパティへのトレースを持っていません。

しかし、ブラウザによっては、プログラマをさらに制限し、プロパティをプリミティブに割り当てることを禁止することもあります。そのため実際には `(*)` でエラーになることがあります。しかし、それは仕様からは少し離れています。
=======
1. When a property of `str` is accessed, a "wrapper object" is created.
2. In strict mode, writing into it is an error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears, so in the last line `str` has no trace of the property.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

**この例は、プリミティブがオブジェクトではないことを明確に示しています。**

<<<<<<< HEAD
それらは単にデータを格納することができません。

すべてのプロパティ/メソッド操作は一時オブジェクトのヘルプによって実行されています。
=======
They can't store additional data.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
