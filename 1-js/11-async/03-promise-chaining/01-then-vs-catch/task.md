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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js
promise.then(f1, f2);
```
<<<<<<< HEAD

Versus;
```js
promise.then(f1).catch(f2);
```
=======
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
