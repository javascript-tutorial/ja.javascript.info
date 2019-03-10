# Promise: then vs catch

これらのコードは等しいでしょうか？言い換えると、それらはどんな状況でも任意のハンドラ関数に対して、同じように振る舞いますか？

```js
promise.then(f1, f2);
```

Versus;
```js
promise.then(f1).catch(f2);
```
