答え: `1` と `2`.

最初のハンドラは実行されます、 `removeEventListener` で削除されていないからです。 ハンドラを削除するには、割り当てたものと全く同じ関数を渡す必要があります。また、コード内に新しい関数が渡されます。これは同じように見えますが、別の関数です。

関数オブジェクトを削除するためには、このように参照を保持しなければなりません。:

```js
function handler() {
  alert(1);
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

<<<<<<< HEAD
ハンドラ `button.onclick` は `addEventListener` に加えて、独立して動作します。
=======
The handler `button.onclick` works independently and in addition to `addEventListener`.
>>>>>>> 8558fa8f5cfb16ef62aa537d323e34d9bef6b4de
