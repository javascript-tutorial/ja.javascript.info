importance: 4

---

<<<<<<< HEAD
# CallBack でイメージを読み込む

通常、イメージはそれらが作られたときにロードされます。そのため、`<img>` をページに追加するとき、ユーザにはすぐにはその写真は見えません。まず、ブラウザがそれをロードする必要があります。

すぐにイメージを見るために、次のようにして "事前に" それを作成することができます:
=======
# Load images with a callback

Normally, images are loaded when they are created. So when we add `<img>` to the page, the user does not see the picture immediately. The browser needs to load it first.

To show an image immediately, we can create it "in advance", like this:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
let img = document.createElement('img');
img.src = 'my.jpg';
```

<<<<<<< HEAD
ブラウザはイメージの読み込みを開始し、キャッシュにそれを覚えます。その後、ドキュメントに同じにイメージが現れるとき(どのような方法でも)、すぐに表示されます。

**配列 `sources` からすべてのイメージをロード、準備ができたら `callback` を実行する関数 `preloadImages(sources, callback)` を作成します**

例えば、イメージがロードされた後に `alert` が表示されます。:
=======
The browser starts loading the image and remembers it in the cache. Later, when the same image appears in the document (no matter how), it shows up immediately.

**Create a function `preloadImages(sources, callback)` that loads all images from the array `sources` and, when ready, runs `callback`.**

For instance, this will show an `alert` after the images are loaded:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
function loaded() {
  alert("Images loaded")
}

preloadImages(["1.jpg", "2.jpg", "3.jpg"], loaded);
```

<<<<<<< HEAD
エラーが発生した場合でも、関数はイメージが "読み込まれた" と想定します。

つまり、`callback` はすべてのイメージがロードされたかエラーになったかの場合に実行されます。

関数は便利です。例えば、多くのスクロール可能な画像があるギャラリーを表示し、すべての画像がロードされていることを確認したい場合などに使えます。

ソースドキュメントには、テストイメージへのリンクやそれらがロードされたかどうかを確認するコードがあります。それは `300` を出力するはずです。
=======
In case of an error, the function should still assume the picture "loaded".

In other words, the `callback` is executed when all images are either loaded or errored out.

The function is useful, for instance, when we plan to show a gallery with many scrollable images, and want to be sure that all images are loaded.

In the source document you can find links to test images, and also the code to check whether they are loaded or not. It should output `300`.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
