
説明します。

1. これは通常のオブジェクトメソッド呼び出しです。

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/solution.md
2. 同じです。ここでは括弧は操作の順番を変更しません。ドットが最初です。
=======
2. The same, parentheses do not change the order of operations here, the dot is first anyway.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/99-js-misc/04-reference-type/3-why-this/solution.md

3. ここにより複雑な呼び出し `(expression).method()` があります。この呼出しはまるで2行に分割されたかのようにして動作します。:

    ```js no-beautify
    f = obj.go; // 式を計算します。
    f();        // 持っているものを実行します
    ```

    ここで、`f()` は `this` なしの関数として実行されます。

4. `(3)` と似たようなもので、ドット `.` の左側に式を持っています。

`(3)` と `(4)` の振る舞いを説明するために、プロパティ・アクセサ（ドットまたは角括弧）が参照型の値を返すことを思い出す必要があります。

メソッド呼び出し（代入 `=`や `||`のような）以外の操作は、 `this` に設定できる情報を持たない通常の値にします。
