# FormData

このチャプターは HTML フォームの送信について説明します: ファイル有無や追加のフィールドなど。[FormData](https://xhr.spec.whatwg.org/#interface-formdata) オブジェクトはそれらの場合に役立ちます。

コンストラクタは次の通りです:
```js
let formData = new FormData([form]);
```

HTML `form` 要素が提供されている場合、自動的にそのフィールドを捉えます。ご想像のとおり、 `FormData` はフォームデータを保存したり送信したりするためのオブジェクトです。

`FormData` に関して特別なことは、`fetch` のようなネットワークメソッドが、本体(ボディ)として `FormData` オブジェクトを受け入れることができるという点です。エンコードされ、`Content-Type: form/multipart` で送信されます。なので、サーバ側から見ると、通常のフォーム送信のように見えます。

## シンプルなフォームの送信

最初に、シンプルなフォームを送信してみましょう。

ご覧の通り、ほぼ1行でです。

```html run
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
</form>

<script>
(async () => {
  let response = await fetch('/article/fetch-basics/post/user', {
    method: 'POST',
*!*
    body: new FormData(formElem)
*/!*
  });

  let result = await response.json();

  alert(result.message);
})();
</script>
```

ここでは、サーバーはフォームを使用したPOST要求を受け入れ、 "User saved" と返信します。

## FormData メソッド

次のメソッドを使って `FormData` のフィールドを変更することができます:

- `formData.append(name, value)` - 指定された `name` と `value` のフォームフィールドを追加します。
- `formData.append(name, blob, fileName)` - `<input type="file">` のようにフィールドを追加します。3つ目の引数 `fileName` はファイル名を設定します(フィールド名ではありません)。ファイルシステムでのファイル名です。
- `formData.delete(name)` - 指定された `name` のフィールドを削除します。
- `formData.get(name)` - 指定された `name` のフィールド値を取得します。
- `formData.has(name)` - 指定された `name` のフィールドが存在する場合には `true` を、そうでなければ `false` を返します。

フォームは、技術的には同じ `name` をもつ複数のフィールドを持つことが可能なので、複数の `append` 呼び出しをすると、その分同じ名前のフィールドが追加されます。

`append` と同じ構文の `set` メソッドもあります。違いは `.set` は指定された `name` のフィールドをすべて削除し、その後新しいフィールドを追加します。なので、`set` をした場合、`name` のフィールドが1つであることを確認してみてください。:

- `formData.set(name, value)`,
- `formData.set(name, blob, fileName)`.

また、`for..of` ループを使用して、formData フィールドを反復することもできます:

```js run
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// key/value ペアをリストします
for(let [name, value] of formData) {
  alert(`${name} = ${value}`); // key1=value1, then key2=value2
}
```

## ファイルを含むフォームを送信する

フォームは常に `Content-Type: form/multipart` として送信され、このエンコーディングはファイルを送信することが可能です。そのため、通常のフォーム送信と同様に、 `<input type="file">` フィールドも送信できます。

これは、そのようなフォームの例です:

```html run autorun
<form id="formElem">
  <input type="text" name="firstName" value="John">
  Picture: <input type="file" name="picture" accept="image/*">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

## Blob データを含むフォームを送信する

チャプター <info:fetch> で見てきたように、動的に生成された `Blob` を送信します(e.g 画像)。`fetch` パラメータの `body` に直接指定することができます。

しかし、実際には画像を個別に送信するのではなく、フォームの一部として、"name" や他のメタデータのような追加のフィールドと一緒に送信するのが便利なことが多いです。

また、通常サーバは生のバリナリデータよりもマルチパートエンコード形式を受け入れるのに適しています。

この例は、`FormData` を使って他のフィールドと一緒に `<canvas>` からの画像を送信します。:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

*!*
      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.png");
*/!*    

      let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

画像 `Blob` がどのように追加されているかに注目してください:

```js
formData.append("image", imageBlob, "image.png");
```

これは、フォームに `<input type="file" name="image">` があり、訪問者がファイルシステムから `image.png` (3番目の引数) という名前のファイルを送信したのと同じです。

## サマリ

[FormData](https://xhr.spec.whatwg.org/#interface-formdata) オブジェクトは HTML フォームをキャプチャして(捉えて)、それらを `fetch` や他のネットワークリクエストを使用して送信するために使われます。

HTML フォームから `new FormData(form)` 作成する、あるいは空のオブジェクト作成してから次のメソッドでフィールドを追加することができます。:

- `formData.append(name, value)`
- `formData.append(name, blob, fileName)`
- `formData.set(name, value)`
- `formData.set(name, blob, fileName)`

2つの特徴があります:
1. `set` メソッドは同じ名前のフィールドを削除します。`append` は削除しません。
2. ファイルを送信するには、3つの引数の構文が必要になります。最後の引数はファイル名であり、`<input type="file">` の場合、通常はユーザのファイルシステムからとられます。

他のメソッドは次のとおりです:

- `formData.delete(name)`
- `formData.get(name)`
- `formData.has(name)`

以上です!
