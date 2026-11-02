<<<<<<< HEAD
# Promise: then vs catch

これらのコードは等しいでしょうか？言い換えると、それらはどんな状況でも任意のハンドラ関数に対して、同じように振る舞いますか？
=======
# Promise: then versus catch

Are these code fragments equal? In other words, do they behave the same way in any circumstances, for any handler functions?

```js
promise.then(f1).catch(f2);
```

Versus:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
promise.then(f1, f2);
```
<<<<<<< HEAD

Versus;
```js
promise.then(f1).catch(f2);
```
=======
>>>>>>> 20208769e528337949e946f526534d61d38bac47
