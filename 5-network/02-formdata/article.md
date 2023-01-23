<<<<<<< HEAD
# FormData

このチャプターは HTML フォームの送信について説明します: ファイル有無や追加のフィールドなど。[FormData](https://xhr.spec.whatwg.org/#interface-formdata) オブジェクトはそれらの場合に役立ちます。

コンストラクタは次の通りです:
=======

# FormData

This chapter is about sending HTML forms: with or without files, with additional fields and so on.

[FormData](https://xhr.spec.whatwg.org/#interface-formdata) objects can help with that. As you might have guessed, it's the object to represent HTML form data.

The constructor is:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
let formData = new FormData([form]);
```

<<<<<<< HEAD
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
=======
If HTML `form` element is provided, it automatically captures its fields.

The special thing about `FormData` is that network methods, such as `fetch`, can accept a `FormData` object as a body. It's encoded and sent out with `Content-Type: multipart/form-data`.

From the server point of view, that looks like a usual form submission.

## Sending a simple form

Let's send a simple form first.

As you can see, that's almost one-liner:

```html run autorun
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
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

In this example, the server code is not presented, as it's beyond our scope. The server accepts the POST request and replies "User saved".

## FormData Methods

We can modify fields in `FormData` with methods:

- `formData.append(name, value)` - add a form field with the given `name` and `value`,
- `formData.append(name, blob, fileName)` - add a field as if it were `<input type="file">`, the third argument `fileName` sets file name (not form field name), as it were a name of the file in user's filesystem,
- `formData.delete(name)` - remove the field with the given `name`,
- `formData.get(name)` - get the value of the field with the given `name`,
- `formData.has(name)` - if there exists a field with the given `name`, returns `true`, otherwise `false`

A form is technically allowed to have many fields with the same `name`, so multiple calls to `append` add more same-named fields.

There's also method `set`, with the same syntax as `append`. The difference is that `.set` removes all fields with the given `name`, and then appends a new field. So it makes sure there's only one field with such `name`, the rest is just like `append`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- `formData.set(name, value)`,
- `formData.set(name, blob, fileName)`.

<<<<<<< HEAD
また、`for..of` ループを使用して、formData フィールドを反復することもできます:
=======
Also we can iterate over formData fields using `for..of` loop:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

<<<<<<< HEAD
// key/value ペアをリストします
for(let [name, value] of formData) {
  alert(`${name} = ${value}`); // key1=value1, then key2=value2
}
```

## ファイルを含むフォームを送信する

フォームは常に `Content-Type: form/multipart` として送信され、このエンコーディングはファイルを送信することが可能です。そのため、通常のフォーム送信と同様に、 `<input type="file">` フィールドも送信できます。

これは、そのようなフォームの例です:
=======
// List key/value pairs
for(let [name, value] of formData) {
  alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
}
```

## Sending a form with a file

The form is always sent as `Content-Type: multipart/form-data`, this encoding allows to send files. So, `<input type="file">` fields are sent also, similar to a usual form submission.

Here's an example with such form:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
## Blob データを含むフォームを送信する

チャプター <info:fetch> で見てきたように、動的に生成された `Blob` を送信します(e.g 画像)。`fetch` パラメータの `body` に直接指定することができます。

しかし、実際には画像を個別に送信するのではなく、フォームの一部として、"name" や他のメタデータのような追加のフィールドと一緒に送信するのが便利なことが多いです。

また、通常サーバは生のバリナリデータよりもマルチパートエンコード形式を受け入れるのに適しています。

この例は、`FormData` を使って他のフィールドと一緒に `<canvas>` からの画像を送信します。:
=======
## Sending a form with Blob data

As we've seen in the chapter <info:fetch>, it's easy to send dynamically generated binary data e.g. an image, as `Blob`. We can supply it directly as `fetch` parameter `body`.

In practice though, it's often convenient to send an image not separately, but as a part of the form, with additional fields, such as "name" and other metadata.

Also, servers are usually more suited to accept multipart-encoded forms, rather than raw binary data.

This example submits an image from `<canvas>`, along with some other fields, as a form, using `FormData`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
画像 `Blob` がどのように追加されているかに注目してください:
=======
Please note how the image `Blob` is added:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
formData.append("image", imageBlob, "image.png");
```

<<<<<<< HEAD
これは、フォームに `<input type="file" name="image">` があり、訪問者がファイルシステムから `image.png` (3番目の引数) という名前のファイルを送信したのと同じです。

## サマリ

[FormData](https://xhr.spec.whatwg.org/#interface-formdata) オブジェクトは HTML フォームをキャプチャして(捉えて)、それらを `fetch` や他のネットワークリクエストを使用して送信するために使われます。

HTML フォームから `new FormData(form)` 作成する、あるいは空のオブジェクト作成してから次のメソッドでフィールドを追加することができます。:
=======
That's same as if there were `<input type="file" name="image">` in the form, and the visitor submitted a file named `"image.png"` (3rd argument) with the data `imageBlob` (2nd argument) from their filesystem.

The server reads form data and the file, as if it were a regular form submission.

## Summary

[FormData](https://xhr.spec.whatwg.org/#interface-formdata) objects are used to capture HTML form and submit it using `fetch` or another network method.

We can either create `new FormData(form)` from an HTML form, or create an object without a form at all, and then append fields with methods:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- `formData.append(name, value)`
- `formData.append(name, blob, fileName)`
- `formData.set(name, value)`
- `formData.set(name, blob, fileName)`

<<<<<<< HEAD
2つの特徴があります:
1. `set` メソッドは同じ名前のフィールドを削除します。`append` は削除しません。
2. ファイルを送信するには、3つの引数の構文が必要になります。最後の引数はファイル名であり、`<input type="file">` の場合、通常はユーザのファイルシステムからとられます。

他のメソッドは次のとおりです:
=======
Let's note two peculiarities here:

1. The `set` method removes fields with the same name, `append` doesn't. That's the only difference between them.
2. To send a file, 3-argument syntax is needed, the last argument is a file name, that normally is taken from user filesystem for `<input type="file">`.

Other methods are:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- `formData.delete(name)`
- `formData.get(name)`
- `formData.has(name)`

<<<<<<< HEAD
以上です!
=======
That's it!
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
