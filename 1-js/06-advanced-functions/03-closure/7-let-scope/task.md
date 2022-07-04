importance: 4

---

<<<<<<< HEAD
# 変数は参照できますか？

このコードの結果はどうなるでしょう？
=======
# Is variable visible?

What will be the result of this code?
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

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
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f
