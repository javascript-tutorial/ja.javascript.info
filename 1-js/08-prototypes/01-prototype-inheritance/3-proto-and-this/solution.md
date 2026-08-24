<<<<<<< HEAD
**解答: `rabbit`.**

`this` はドットの前のオブジェクトなので、 `rabbit.eat()` は `rabbit` を変更します。

プロパティの参照と実行は2つの異なるものです。
メソッド `rabbit.eat` は最初にプロトタイプで見つけられ、`this=rabbit` で実行されます。
=======
**The answer: `rabbit`.**

That's because `this` is an object before the dot, so `rabbit.eat()` modifies `rabbit`.

Property lookup and execution are two different things.

The method `rabbit.eat` is first found in the prototype, then executed with `this=rabbit`.
>>>>>>> 20208769e528337949e946f526534d61d38bac47
