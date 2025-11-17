importance: 5

---

<<<<<<< HEAD
# 同じコンストラクタでオブジェクトを作成する

想像してください、コンストラクタ関数によって作成された任意のオブジェクト `obj` があります -- 今、それを使って新しいオブジェクトを作りたいです。

私たちは、このようにすることができるでしょうか？
=======
# Create an object with the same constructor

Imagine, we have an arbitrary object `obj`, created by a constructor function -- we don't know which one, but we'd like to create a new object using it.

Can we do it like that?
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js
let obj2 = new obj.constructor();
```

<<<<<<< HEAD
このコードを正しく動作させる `obj` のコンストラクタ関数の例を提示してください。そして、間違って動作する例も提示してください。
=======
Give an example of a constructor function for `obj` which lets such code work right. And an example that makes it work wrong.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
