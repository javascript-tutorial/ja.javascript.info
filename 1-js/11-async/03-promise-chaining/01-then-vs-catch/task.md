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
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
promise.then(f1, f2);
```
<<<<<<< HEAD

Versus;
```js
promise.then(f1).catch(f2);
```
=======
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
