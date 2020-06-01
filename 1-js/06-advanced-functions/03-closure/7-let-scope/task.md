importance: 4

---

<<<<<<< HEAD
# 変数は参照できますか？

このコードの結果はどうなるでしょう？
=======
# Is variable visible?

What will be the result of this code?
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js
let x = 1;

function func() {
  console.log(x); // ?

  let x = 2;
}

func();
```

<<<<<<< HEAD
P.S. このタスクには落とし穴があります。
=======
P.S. There's a pitfall in this task. The solution is not obvious.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
