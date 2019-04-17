importance: 4

---

# CallBack でイメージを読み込む

<<<<<<< HEAD:2-ui/3-event-details/11-onload-onerror/1-load-img-callback/task.md
通常、イメージはそれらが作られたときにロードされます。そのため、`<img>` をページに追加するとき、ユーザにはすぐにはその写真は見えません。まず、ブラウザがそれをロードする必要があります。
=======
Normally, images are loaded when they are created. So when we add `<img>` to the page, the user does not see the picture immediately. The browser needs to load it first.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/03-onload-onerror/1-load-img-callback/task.md

すぐにイメージを見るために、次のようにして "事前に" それを作成することができます:

```js
let img = document.createElement('img');
img.src = 'my.jpg';
```

ブラウザはイメージの読み込みを開始し、キャッシュにそれを覚えます。その後、ドキュメントに同じにイメージが現れるとき(どのような方法でも)、すぐに表示されます。

**配列 `sources` からすべてのイメージをロード、準備ができたら `callback` を実行する関数 `preloadImages(sources, callback)` を作成します**

例えば、イメージがロードされた後に `alert` が表示されます。:

```js
function loaded() {
  alert("Images loaded")
}

preloadImages(["1.jpg", "2.jpg", "3.jpg"], loaded);
```

エラーが発生した場合でも、関数はイメージが "読み込まれた" と想定します。

つまり、`callback` はすべてのイメージがロードされたかエラーになったかの場合に実行されます。

関数は便利です。例えば、多くのスクロール可能な画像があるギャラリーを表示し、すべての画像がロードされていることを確認したい場合などに使えます。

ソースドキュメントには、テストイメージへのリンクやそれらがロードされたかどうかを確認するコードがあります。それは `300` を出力するはずです。
