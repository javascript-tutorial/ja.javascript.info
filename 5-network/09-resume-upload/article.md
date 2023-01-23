<<<<<<< HEAD
# 再開可能なファイルアップロード

`fetch` メソッドを使用すると、とても簡単にファイルをアップロードすることができます。

接続が切れた後、アップロードを再開するにはどうすればよいでしょう？そのための組み込みのオプションはありません。が、ここではそれを実装するためのヒントがあります。

再開可能なアップロードには、アップロードの進行状況の表示が一緒に必要になります。大きなファイルが期待されるからです(再開が必要かもしれないほどのサイズ)。したがって、 `fetch` ではアップロードの進行状況を追跡できないため、[XMLHttpRequest](info:xmlhttprequest)を使います。

## あまり役に立たない progress イベント

アップロードを再開するには、接続が失われるまでにどれだけアップロードされたかを知る必要があります。

アップロードの進行状況を追跡する `xhr.upload.onprogress` があります。

ただ、残念ながらここでは役に立ちません。これはデータが *送られた* ときに発生しますが、サーバが受け取ったかはブラウザは知らないからです。

ローカルネットワークプロキシによってバッファリングされていたり、リモートサーバプロセスが停止して処理ができなかったり、あるいは接続が切れた際に途中で失われサーバに届かなったかもしれません。

したがって、このイベントはプログレスバーを出すときにだけ役立ちます。

アップロードを再開するには、サーバが受け取った正確なバイト数を知る必要があります。そして、それを知っているのはサーバだけです。

## アルゴリズム

1. 最初に、アップロードするファイルを一意に識別するために、ファイル id を作成します。e.g.
    ```js
    let fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;
    ```
    これはアップロードを再開するのに必要で、サーバに再開する内容を伝えるときに使います。

2. サーバにリクエストを送り、すでに受け取り済みのバイト数を訪ねます。次のようになります:
=======
# Resumable file upload

With `fetch` method it's fairly easy to upload a file.

How to resume the upload after lost connection? There's no built-in option for that, but we have the pieces to implement it.

Resumable uploads should come with upload progress indication, as we expect big files (if we may need to resume). So, as `fetch` doesn't allow to track upload progress, we'll use [XMLHttpRequest](info:xmlhttprequest).

## Not-so-useful progress event

To resume upload, we need to know how much was uploaded till the connection was lost.

There's `xhr.upload.onprogress` to track upload progress.

Unfortunately, it won't help us to resume the upload here, as it triggers when the data is *sent*, but was it received by the server? The browser doesn't know.

Maybe it was buffered by a local network proxy, or maybe the remote server process just died and couldn't process them, or it was just lost in the middle and didn't reach the receiver.

That's why this event is only useful to show a nice progress bar.

To resume upload, we need to know *exactly* the number of bytes received by the server. And only the server can tell that, so we'll make an additional request.

## Algorithm

1. First, create a file id, to uniquely identify the file we're going to upload:
    ```js
    let fileId = file.name + '-' + file.size + '-' + file.lastModified;
    ```
    That's needed for resume upload, to tell the server what we're resuming.

    If the name or the size or the last modification date changes, then there'll be another `fileId`.

2. Send a request to the server, asking how many bytes it already has, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    ```js
    let response = await fetch('status', {
      headers: {
        'X-File-Id': fileId
      }
    });

    // The server has that many bytes
    let startByte = +await response.text();
    ```

<<<<<<< HEAD
    これは、サーバがファイルのアップロードを `X-File-Id` ヘッダで追跡していることを前提としています。サーバ側で実装されている必要があります。

3. 次に, `Blob` のメソッド `slice` を使って `startByte` からファイルを送信します。:
    ```js
    xhr.open("POST", "upload", true);

    // サーバが再開されるファイルをしるためにファイル id を送信します
    xhr.setRequestHeader('X-File-Id', fileId);
    // 再開時のバイトを送信します
=======
    This assumes that the server tracks file uploads by `X-File-Id` header. Should be implemented at server-side.

    If the file doesn't yet exist at the server, then the server response should be `0`

3. Then, we can use `Blob` method `slice` to send the file from `startByte`:
    ```js
    xhr.open("POST", "upload");

    // File id, so that the server knows which file we upload
    xhr.setRequestHeader('X-File-Id', fileId);

    // The byte we're resuming from, so the server knows we're resuming
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    xhr.setRequestHeader('X-Start-Byte', startByte);

    xhr.upload.onprogress = (e) => {
      console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
    };

<<<<<<< HEAD
    // ファイルは input.files[0] または別の元から取得できます
    xhr.send(file.slice(startByte));
    ```

    ここでは、サーバに両方のファイル id を `X-File-Id` として送信するため、どのファイルをアップロードしているかが分かります。そして `X-Start-Byte` で開始バイトを送信するので、最初にアップロードするのではなく、再開であることを認識します。

    サーバはそのレコードをチェックし、そのファイルのアップロードがあり、かつ現在のアップロードサイズが正確に `X-Start-Byte` であれば、データを追加します。


これはクライアントとサーバ両方のコードを使用したデモです。Node.js で記述しています。

Node.js は Nginx という別のサーバの裏におり、これがアップロードをバッファリングし、完全に完了したときに Node.js にわたすため、このサイト上では、部分的にしか機能しません。

ですが、ダウンロードして、ローカルで完全なデモを見ることもできます:

[codetabs src="upload-resume" height=200]
=======
    // file can be from input.files[0] or another source
    xhr.send(file.slice(startByte));
    ```

    Here we send the server both file id as `X-File-Id`, so it knows which file we're uploading, and the starting byte as `X-Start-Byte`, so it knows we're not uploading it initially, but resuming.

    The server should check its records, and if there was an upload of that file, and the current uploaded size is exactly `X-Start-Byte`, then append the data to it.


Here's the demo with both client and server code, written on Node.js.

It works only partially on this site, as Node.js is behind another server named Nginx, that buffers uploads, passing them to Node.js when fully complete.

But you can download it and run locally for the full demonstration:

[codetabs src="upload-resume" height=200]

As we can see, modern networking methods are close to file managers in their capabilities -- control over headers, progress indicator, sending file parts, etc.

We can implement resumable upload and much more.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
