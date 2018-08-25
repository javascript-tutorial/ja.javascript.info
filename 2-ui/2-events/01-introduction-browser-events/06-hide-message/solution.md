
ボタンを追加するには、`position:absolute` (と `position:relative` のペインを作る) または `float:right` のいずれかを使用できます。`float:right` はボタンがテキストと重ならないと言う利点はありますが、`position:absolute` はより自由度があります。なので、選択はあなた次第です。

次に、各ペインに対して、コードは次のようになります:
```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```

そして、`<button>` は `pane.firstChild` になるので、このようにしてハンドラを追加できます:

```js
pane.firstChild.onclick = () => pane.remove();
```
