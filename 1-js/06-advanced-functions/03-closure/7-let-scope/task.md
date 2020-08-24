importance: 4

---

<<<<<<< HEAD
# 変数は参照できますか？

このコードの結果はどうなるでしょう？
=======
# Is variable visible?

What will be the result of this code?
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

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
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1
