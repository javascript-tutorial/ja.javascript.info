# LocalStorage, sessionStorage

Webストレージオブジェクト `localStorage` と `sessionStorage` では、キーバリューのペアをブラウザに保持することができます。

それらの興味深い点は、そのデータはページをリフレッシュしたり(`sessionStorage` の場合)、完全にブラウザを再起動しても(`localStorage`)生きていることです。後ほどすぐに見ていきます。

私たちは、すでに Cookie を持っています。なぜ追加のオブジェクトが必要なのでしょう？

- Cookie とは違い、Web ストレージオブジェクトはリクエスト毎にサーバへは送信されません。そのため、より多くのものを格納することができます。ほとんどのブラウザは少なくとも2MB以上のデータを許容し、その設定を行う方法を持っています。
- サーバは HTTP ヘッダ経由でストレージオブジェクトを操作することはできません。JavaScript 内ですべて行われます。
- ストレージはそのオリジン (domain/protocol/portのセット)でバインドされます。つまり、異なるプロトコルやサブドメインは異なるストレージオブジェクトになり、お互いのデータにアクセスすることはできません。

どちらのストレージオブジェクトも同じメソッドとプロパティを提供しています:

- `setItem(key, value)` -- key/value ペアを格納する.
- `getItem(key)` -- key を元に value を取得する
- `removeItem(key)` -- 指定された key (valueも) を削除する
- `clear()` -- すべてを削除する
- `key(index)` -- 指定位置の key を取得する
- `length` -- 格納されたアイテムの長さ

どのように機能するのか見てみましょう。

## localStorage のデモ

`localStorage` の主な特徴は:

- 同じオリジンからのすべてのタブとウィンドウ間で共有されます。
- データは期限切れになりません。ブラウザの再起動やOSの再起動後も残っています。

例えば、このコードを実行した場合...

```js run
localStorage.setItem('test', 1);
```

...その後、ブラウザを閉じて/開く、あるいは別ウィンドウで同じページを開いた後、次のようにしてその値を取得することができます:

```js run
alert( localStorage.getItem('test') ); // 1
```

同じドメイン/ポート/プロトコル上にいるだけでよく、URLパスは異なっていてもかまいません。

`localStorage` は共有されているので、一方のウィンドウでデータを設定すると、もう一方のウィンドウでその変更を確認できます。

## オブジェクトライクなアクセス

平易なオブジェクトを使ってキーの取得/設定をすることもできます。次のようになります:

```js run
// キーをセット
localStorage.test = 2;

// キーを取得
alert( localStorage.test ); // 2

// キーの削除
delete localStorage.test;
```

これらは歴史的な理由から許可されており、ほぼほぼ動作しますが、一般的には2つの理由から推奨されていません:

1. キーがユーザが生成したものである場合、`length` や `toString`、あるいは `localStorage` の別の組み込みメソッドのように、なんにでもなる可能性があります。この場合、`getItem/setItem` は問題なく動作しますが、オブジェクトライクなアクセスは失敗します:
    ```js run
    let key = 'length';
    localStorage[key] = 5; // Error, can't assign length
    ```

2. `storage` イベントがあり、これはデータが変更されたときにトリガーされます。このイベントはオブジェクトライクなアクセスの場合には発生しません。これについては、チャプターの後半で見ていきます。

## キーをループする

メソッドは get/set/remove の機能を提供します。しかし、すべてのキーを取得する方法はどうやるのでしょう？

残念ながら、ストレージオブジェクトは反復可能ではありません。

1つの方法は "配列ライク" なイテレーションを使うことです。:

```js run
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

もう1つは、オブジェクト固有の `for key in localStorage` ループを使用する方法です。

これはキーを繰り返し処理しますが、必要のない組み込みフィールドもいくつか出力します。:

```js run
// bad try
for(let key in localStorage) {
  alert(key); // getItem, setItem や他の組み込みのものを表示します
}
```

...なので、`hasOwnProperty` チェックでプロトタイプからのフィールドをフィルタする必要があります:

```js run
for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue; // "setItem", "getItem" etc のキーをスキップ
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

...あるいは、`Object.keys` で "自身の" キーを取得し、必要に応じてそれらをループします:

```js run
let keys = Object.keys(localStorage);
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

`Object.keys`はプロトタイプを無視してオブジェクトに属するキーのみを返すので、後者はうまくいきます。

## 文字列のみ

キーと値は両方とも文字列でなければならないことに注意してください。

数値やオブジェクトのような別の型の場合は、自動的に文字列に変換されます。

```js run
sessionStorage.user = {name: "John"};
alert(sessionStorage.user); // [object Object]
```

オブジェクトを格納するには、`JSON` が使えます。:

```js run
sessionStorage.user = JSON.stringify({name: "John"});

// sometime later
let user = JSON.parse( sessionStorage.user );
alert( user.name ); // John
```

また、例えばデバッグ目的で、ストレージオブジェクト全体を文字列化することも可能です。:

```js run
// オブジェクトを見やすくするために JSON.stringify にフォーマットオプションを追加
alert( JSON.stringify(localStorage, null, 2) );
```


## sessionStorage

`sessionStorage` オブジェクトは、 `localStorage` よりも使われることがずっと少ないです。

プロパティとメソッドは同じですが、より多くの制限があります:

- `sessionStorage` は現在のブラウザタブ内でのみ存在します。
  - 同じページを持つ別タブは、異なるストレージを持ちます。
  - しかし、タブ内の iframe 間では共有されます(それらが同じオリジンから来ている想定）。
- データはページ更新後も有効ですが、タブを閉じたり開いたりした場合は無効になります。

実際にそれを見てみましょう。

このコードを実行してください...

```js run
sessionStorage.setItem('test', 1);
```

...次に、ページを更新してください。いまはまだデータを取得することができます。:

```js run
alert( sessionStorage.getItem('test') ); // リフレッシュ後: 1
```

...しかし、別のタブで同じページを開き、そこでもう一度試すと、上のコードは `null`、"見つからなかった" を返します。

それはまさに `sessionStorage` がオリジンだけでなく、ブラウザのタブにも結び付けられているからです。そのため、`sessionStorage` は控えめに使用されています。

## ストレージイベント

データが、`localStorage` あるいは `sessionStorage` で更新されると、次のプロパティを持つ、[storage](https://www.w3.org/TR/webstorage/#the-storage-event) イベントがトリガーされます。:

- `key` – 変更されたキー(`.clear()` が呼ばれた場合は null)
- `oldValue` – 古い値(キーが新しく追加された場合は、null)
- `newValue` – 新しい値(キーが削除された場合は null)
- `url` – 更新が行われた document の URL 
- `storageArea` – 更新が行われた場所の `localStorage` あるいは `sessionStorage` オブジェクト

重要なことは、それが起きた `window` を除く、ストーレジがアクセス可能なすべての `window` オブジェクト上でイベントがトリガーされるということです。

詳しく説明しましょう。

想像してみてください、それぞれに同じサイトを持つ2つのウィンドウがあるとします。`localStorage` はそれらの間で共有されます。

```online
以下のコードをテストするには、このページを2つのブラウザウィンドウで開いてください。
```

両方のウィンドウが `window.onstorage` をリッスンしている場合、各ウィンドウは他のウィンドウで行われた更新に反応します。

```js run
// 他の document から同じストーレジに対して行われた更新をトリガーする
window.onstorage = event => {
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());
```

イベントには次のものが含まれていることにも留意してください。: `event.url`、これはデータが更新された document の URLです。

また、`event.storageArea` はストーレジオブジェクトを含みます。イベントは `sessionStorage` と `localStorage` 両方で同じなので、`storageArea` は変更されたオブジェクトを参照します。変更に "応答" するために、その中に何かを戻すことができます。

**これは、同じオリジンからの異なるウィンドウがメッセージを交換することを可能にします。**

モダンブラウザは [Broadcast channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) もサポートしています。これは同一オリジン内のウィンドウ間のコミュニケーションのための特別なAPIです。これはより多くのことが考慮されていますが、あまりサポートされていません。`localStorage` に基づいて、そのAPIをどこでも利用できるようにするライブラリ(polyfill)があります。

## サマリ

Web ストレージオブジェクト `localStorage` と `sessionStorage` はブラウザ内にキー/バリューを格納することができます。
- `key` と `value` は両方文字列でなければなりません。
- ブラウザによりますが、制限は 2MB+ です。
- 有効期限はありません。
- データはオリジン(domain/port/protocol)にバインドされています。

| `localStorage` | `sessionStorage` |
|----------------|------------------|
| 同一オリジンのすべてのタブとウィンドウ間で共有 | ブラウザタブ内で見えます。同一オリジンからの iframe も含みます |
| ブラウザの再起動でも残ります | タブを閉じると消えます |

API:

- `setItem(key, value)` -- key/value ペアを格納します
- `getItem(key)` -- key で値を取得します
- `removeItem(key)` -- 値と一緒にキーを削除します
- `clear()` -- すべてを削除します
- `key(index)` -- 指定位置の key を取得します
- `length` -- 格納されたアイテムの数
- すべてのキーを取得するには `Object.keys` を使います
- オブジェクトプロパティとしてキーを使うことが可能ですが、この場合、`storage` イベントはトリガーされません。

ストレージイベント:

- `setItem`, `removeItem`, `clear` の呼び出しでトリガーします。
- 操作や document の `url`、ストレージオブジェクトに関するすべてのデータを含みます。
- ストレージにアクセスできるすべての `window` オブジェクト(それを生成したものを除く)でトリガーします(`sessionStorage` の場合はタブ内、`localStorage` の場合は全体）。
