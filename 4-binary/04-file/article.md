# File と FileReader

[File](https://www.w3.org/TR/FileAPI/#dfn-file) オブジェクトは `Blob` を継承しており、ファイルシステムに関連した機能が拡張されています。

`File` の入手方法は2つあります。

1つ目は、`Blob` に似たコンストラクタを用いる方法です:

```js
new File(fileParts, fileName, [options])
```

- **`fileParts`** -- `Blob` 同様、Blob/BufferSource/文字列値 の配列です
- **`fileName`** -- ファイル名(文字列)です
- **`options`** -- オプションのオブジェクトです:
    - **`lastModified`** -- 最後に変更された日付のタイムスタンプです(整数値)。

2つ目は、`<input type="file">` やドラッグドロップ、あるいは他のブラウザインタフェースを使用して、ファイルを取得する方法です(こちらの方が多いです)。

例:

```html run
<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];

  alert(`File name: ${file.name}`); // e.g my.png
  alert(`Last modified: ${file.lastModified}`); // e.g 1552830408824
}
</script>
```

```smart
入力は複数のファイルを選択する可能性があるので、`input.files` は配列ライクなオブジェクトになります。ここは1つのファイルしかないので、単に `input.files[0]` としています。
```

## FileReader

[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) は `Blob` (なので `File` も)オブジェクトからデータを読み込むことのみを目的としたオブジェクトです。

ディスクからの読み込みは時間がかかる場合があるので、イベントを使用してデータを渡します。

コンストラクタです:

```js
let reader = new FileReader(); // 引数はありません
```

主なメソッド:

- **`readAsArrayBuffer(blob)`** -- `ArrayBuffer` としてデータを読み込みます
- **`readAsText(blob, [encoding])`** -- 文字列(デフォルトではエンコーディングは `utf-8` です)としてデータを読み込みます
- **`readAsDataURL(blob)`** -- データを base64 データurl にエンコードします
- **`abort()`** -- 操作をキャンセルします

読み込み処理には、次のイベントがあります:
- `loadstart` -- ロード開始
- `progress` -- 読み取り中
- `load` -- エラーなく読み取り完了
- `abort` -- `abort()` キャンセルされた
- `error` -- エラーが発生した
- `loadend` -- 読み込みが成功または失敗で終了

読み込みが終了すると、結果にアクセスできます:
- `reader.result` は結果です(成功している場合)
- `reader.error` はエラーです(失敗した場合)

広く使われているイベントは `load` と `error` です。

これはファイル読み込みの例です:

```html run
<input type="file" onchange="readFile(this)">

<script>
function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}
</script>
```

```smart header="`FileReader` for blobs"
チャプター <info:blob> で述べたように、`FileReader` はファイルだけでなく、あらゆる blob に対しても動作します。

そのため、blob を別の形式に変換するのに使うこともできます:
- `readAsArrayBuffer(blob)` -- `ArrayBuffer` へ,
- `readAsText(blob, [encoding])` -- 文字列へ(`TextDecoder` の代替),
- `readAsDataURL(blob)` -- base64 url へ
```


```smart header="`FileReaderSync` は worker でのみ利用可能です"
Web worker(Webワーカー)の場合、[FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync) と呼ばれる、`FileReader` の同期版も存在します。

その読み込みメソッド `read*` はイベントを生成しませんが、通常の関数と同じように結果を返します。

これは Web worker 内でのみ可能です。なぜなら、Web worker では、ファイルの読み取り中に発生する可能性がある、同期呼び出しの遅延はたいして重要ではないからです。これらはページに影響を与えません。
```

## サマリ

`File` オブジェクトは `Blob` を継承しています。

`Blob` のメソッドとプロパティに加え、`File` オブジェクトは `fileName` と `lastModified` プロパティも持っており、さらにファイルシステムから読み込むための内部的な機能もあります。通常 `File` オブジェクトは `<input>` やドラッグドロップのようなユーザ操作から取得します。

`FileReader` オブジェクトは次の3つのフォーマットで、ファイルや blob を読み込むことができます。:
- 文字列 (`readAsText`).
- `ArrayBuffer` (`readAsArrayBuffer`).
- データ url, base-64 エンコード (`readAsDataURL`).

しかし、多くのケースではファイルの内容を読み込む必要はありません。blob でやったのと同じように、`URL.createObjectURL(file)` で短い url を作成し、それを `<a>` や `<img>` に割り当てることができます。これにより、ファイルをダウンロードしたり、画像や、canvas などの一部として表示させることができます。

また、ネットワーク越しに `File` を送るつもりだとしても、`XMLHttpRequest` や `fetch` のようなネットワークAPIはネイティブに `File` オブジェクトを受け入れるので簡単に行うことができます。
