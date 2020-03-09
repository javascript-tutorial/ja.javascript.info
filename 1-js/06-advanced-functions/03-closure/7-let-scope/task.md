importance: 4

---

<<<<<<< HEAD
# 変数は参照できますか？

このコードの結果はどうなるでしょう？
=======
# Is variable visible?

What will be the result of this code?
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

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
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
