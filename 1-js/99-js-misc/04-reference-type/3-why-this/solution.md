
<<<<<<< HEAD
説明します。

1. これは通常のオブジェクトメソッド呼び出しです。

2. 同じです。ここでは括弧は操作の順番を変更しません。ドットが最初です。

3. ここにより複雑な呼び出し `(expression).method()` があります。この呼出しはまるで2行に分割されたかのようにして動作します。:

    ```js no-beautify
    f = obj.go; // 式を計算します。
    f();        // 持っているものを実行します
    ```

    ここで、`f()` は `this` なしの関数として実行されます。

4. `(3)` と似たようなもので、ドット `.` の左側に式を持っています。

`(3)` と `(4)` の振る舞いを説明するために、プロパティ・アクセサ（ドットまたは角括弧）が参照型の値を返すことを思い出す必要があります。

メソッド呼び出し（代入 `=`や `||`のような）以外の操作は、 `this` に設定できる情報を持たない通常の値にします。
=======
Here's the explanations.

1. That's a regular object method call.

2. The same, parentheses do not change the order of operations here, the dot is first anyway.

3. Here we have a more complex call `(expression)()`. The call works as if it were split into two lines:

    ```js no-beautify
    f = obj.go; // calculate the expression
    f();        // call what we have
    ```

    Here `f()` is executed as a function, without `this`.

4. The similar thing as `(3)`, to the left of the parentheses `()` we have an expression.

To explain the behavior of `(3)` and `(4)` we need to recall that property accessors (dot or square brackets) return a value of the Reference Type.  

Any operation on it except a method call (like assignment `=` or `||`) turns it into an ordinary value, which does not carry the information allowing to set `this`.

>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
