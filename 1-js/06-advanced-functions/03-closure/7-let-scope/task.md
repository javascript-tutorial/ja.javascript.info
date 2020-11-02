importance: 4

---

<<<<<<< HEAD
# 変数は参照できますか？

このコードの結果はどうなるでしょう？
=======
# Is variable visible?

What will be the result of this code?
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

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
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
