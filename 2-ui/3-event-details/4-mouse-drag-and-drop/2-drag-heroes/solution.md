<<<<<<< HEAD

要素をドラッグするために、 `position:fixed` を使います。これにより座標が管理しやすくなります。最後には、それを `position:absolute` に戻す必要があります。
=======
To drag the element we can use `position:fixed`, it makes coordinates easier to manage. At the end we should switch it back to `position:absolute` to lay the element into the document.

When coordinates are at window top/bottom, we use `window.scrollTo` to scroll it.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

その後、座標がウィンドウの上下端にある場合、`window.scrollTo` を使ってスクロールします。

より詳細は、コードにあるコメントを見てください。
