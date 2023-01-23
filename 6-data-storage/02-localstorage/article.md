# LocalStorage, sessionStorage

<<<<<<< HEAD
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
=======
Web storage objects `localStorage` and `sessionStorage` allow to save key/value pairs in the browser.

What's interesting about them is that the data survives a page refresh (for `sessionStorage`) and even a full browser restart (for `localStorage`). We'll see that very soon.

We already have cookies. Why additional objects?

- Unlike cookies, web storage objects are not sent to server with each request. Because of that, we can store much more. Most modern browsers allow at least 5 megabytes of data (or more) and have settings to configure that.
- Also unlike cookies, the server can't manipulate storage objects via HTTP headers. Everything's done in JavaScript.
- The storage is bound to the origin (domain/protocol/port triplet). That is, different protocols or subdomains infer different storage objects, they can't access data from each other.

Both storage objects provide the same methods and properties:

- `setItem(key, value)` -- store key/value pair.
- `getItem(key)` -- get the value by key.
- `removeItem(key)` -- remove the key with its value.
- `clear()` -- delete everything.
- `key(index)` -- get the key on a given position.
- `length` -- the number of stored items.

As you can see, it's like a `Map` collection (`setItem/getItem/removeItem`), but also allows access by index with `key(index)`.

Let's see how it works.

## localStorage demo

The main features of `localStorage` are:

- Shared between all tabs and windows from the same origin.
- The data does not expire. It remains after the browser restart and even OS reboot.

For instance, if you run this code...
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
localStorage.setItem('test', 1);
```

<<<<<<< HEAD
...その後、ブラウザを閉じて/開く、あるいは別ウィンドウで同じページを開いた後、次のようにしてその値を取得することができます:
=======
...And close/open the browser or just open the same page in a different window, then you can get it like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( localStorage.getItem('test') ); // 1
```

<<<<<<< HEAD
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
=======
We only have to be on the same origin (domain/port/protocol), the url path can be different.

The `localStorage` is shared between all windows with the same origin, so if we set the data in one window, the change becomes visible in another one.

## Object-like access

We can also use a plain object way of getting/setting keys, like this:

```js run
// set key
localStorage.test = 2;

// get key
alert( localStorage.test ); // 2

// remove key
delete localStorage.test;
```

That's allowed for historical reasons, and mostly works, but generally not recommended, because:

1. If the key is user-generated, it can be anything, like `length` or `toString`, or another built-in method of `localStorage`. In that case `getItem/setItem` work fine, while object-like access fails:

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    ```js run
    let key = 'length';
    localStorage[key] = 5; // Error, can't assign length
    ```

<<<<<<< HEAD
2. `storage` イベントがあり、これはデータが変更されたときにトリガーされます。このイベントはオブジェクトライクなアクセスの場合には発生しません。これについては、チャプターの後半で見ていきます。

## キーをループする

メソッドは get/set/remove の機能を提供します。しかし、すべてのキーを取得する方法はどうやるのでしょう？

残念ながら、ストレージオブジェクトは反復可能ではありません。

1つの方法は "配列ライク" なイテレーションを使うことです。:
=======
2. There's a `storage` event, it triggers when we modify the data. That event does not happen for object-like access. We'll see that later in this chapter.

## Looping over keys

As we've seen, the methods provide "get/set/remove by key" functionality. But how to get all saved values or keys?

Unfortunately, storage objects are not iterable.

One way is to loop over them as over an array:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

<<<<<<< HEAD
もう1つは、オブジェクト固有の `for key in localStorage` ループを使用する方法です。

これはキーを繰り返し処理しますが、必要のない組み込みフィールドもいくつか出力します。:
=======
Another way is to use `for key in localStorage` loop, just as we do with regular objects.

It iterates over keys, but also outputs few built-in fields that we don't need:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
// bad try
for(let key in localStorage) {
<<<<<<< HEAD
  alert(key); // getItem, setItem や他の組み込みのものを表示します
}
```

...なので、`hasOwnProperty` チェックでプロトタイプからのフィールドをフィルタする必要があります:
=======
  alert(key); // shows getItem, setItem and other built-in stuff
}
```

...So we need either to filter fields from the prototype with `hasOwnProperty` check:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
<<<<<<< HEAD
    continue; // "setItem", "getItem" etc のキーをスキップ
=======
    continue; // skip keys like "setItem", "getItem" etc
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

<<<<<<< HEAD
...あるいは、`Object.keys` で "自身の" キーを取得し、必要に応じてそれらをループします:
=======
...Or just get the "own" keys with `Object.keys` and then loop over them if needed:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let keys = Object.keys(localStorage);
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

<<<<<<< HEAD
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
=======
The latter works, because `Object.keys` only returns the keys that belong to the object, ignoring the prototype.

## Strings only

Please note that both key and value must be strings.

If they were any other type, like a number, or an object, they would get converted to a string automatically:

```js run
localStorage.user = {name: "John"};
alert(localStorage.user); // [object Object]
```

We can use `JSON` to store objects though:

```js run
localStorage.user = JSON.stringify({name: "John"});

// sometime later
let user = JSON.parse( localStorage.user );
alert( user.name ); // John
```

Also it is possible to stringify the whole storage object, e.g. for debugging purposes:

```js run
// added formatting options to JSON.stringify to make the object look nicer
alert( JSON.stringify(localStorage, null, 2) );
```

## sessionStorage

The `sessionStorage` object is used much less often than `localStorage`.

Properties and methods are the same, but it's much more limited:

- The `sessionStorage` exists only within the current browser tab.
  - Another tab with the same page will have a different storage.
  - But it is shared between iframes in the same tab (assuming they come from the same origin).
- The data survives page refresh, but not closing/opening the tab.

Let's see that in action.

Run this code...
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
sessionStorage.setItem('test', 1);
```

<<<<<<< HEAD
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

重要なことは、それが起きた `window` を除く、ストレージがアクセス可能なすべての `window` オブジェクト上でイベントがトリガーされるということです。

詳しく説明しましょう。

想像してみてください、それぞれに同じサイトを持つ2つのウィンドウがあるとします。`localStorage` はそれらの間で共有されます。

```online
以下のコードをテストするには、このページを2つのブラウザウィンドウで開いてください。
```

両方のウィンドウが `window.onstorage` をリッスンしている場合、各ウィンドウは他のウィンドウで行われた更新に反応します。

```js run
// 他の document から同じストレージに対して行われた更新をトリガーする
window.onstorage = event => {
=======
...Then refresh the page. Now you can still get the data:

```js run
alert( sessionStorage.getItem('test') ); // after refresh: 1
```

...But if you open the same page in another tab, and try again there, the code above returns `null`, meaning "nothing found".

That's exactly because `sessionStorage` is bound not only to the origin, but also to the browser tab. For that reason, `sessionStorage` is used sparingly.

## Storage event

When the data gets updated in `localStorage` or `sessionStorage`, [storage](https://html.spec.whatwg.org/multipage/webstorage.html#the-storageevent-interface) event triggers, with properties:

- `key` – the key that was changed (`null` if `.clear()` is called).
- `oldValue` – the old value (`null` if the key is newly added).
- `newValue` – the new value (`null` if the key is removed).
- `url` – the url of the document where the update happened.
- `storageArea` – either `localStorage` or `sessionStorage` object where the update happened.

The important thing is: the event triggers on all `window` objects where the storage is accessible, except the one that caused it.

Let's elaborate.

Imagine, you have two windows with the same site in each. So `localStorage` is shared between them.

```online
You might want to open this page in two browser windows to test the code below.
```

If both windows are listening for `window.onstorage`, then each one will react on updates that happened in the other one.

```js run
// triggers on updates made to the same storage from other documents
window.onstorage = event => { // can also use window.addEventListener('storage', event => {
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());
```

<<<<<<< HEAD
イベントには次のものが含まれていることにも留意してください。: `event.url`、これはデータが更新された document の URLです。

また、`event.storageArea` はストレージオブジェクトを含みます。イベントは `sessionStorage` と `localStorage` 両方で同じなので、`storageArea` は変更されたオブジェクトを参照します。変更に "応答" するために、その中に何かを戻すことができます。

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
=======
Please note that the event also contains: `event.url` -- the url of the document where the data was updated.

Also, `event.storageArea` contains the storage object -- the event is the same for both `sessionStorage` and `localStorage`, so `event.storageArea` references the one that was modified. We may even want to set something back in it, to "respond" to a change.

**That allows different windows from the same origin to exchange messages.**

Modern browsers also support [Broadcast channel API](mdn:/api/Broadcast_Channel_API), the special API for same-origin inter-window communication, it's more full featured, but less supported. There are libraries that polyfill that API, based on `localStorage`, that make it available everywhere.

## Summary

Web storage objects `localStorage` and `sessionStorage` allow to store key/value pairs in the browser.

- Both `key` and `value` must be strings.
- The limit is 5mb+, depends on the browser.
- They do not expire.
- The data is bound to the origin (domain/port/protocol).

| `localStorage` | `sessionStorage` |
|----------------|------------------|
| Shared between all tabs and windows with the same origin | Visible within a browser tab, including iframes from the same origin |
| Survives browser restart | Survives page refresh (but not tab close) |

API:

- `setItem(key, value)` -- store key/value pair.
- `getItem(key)` -- get the value by key.
- `removeItem(key)` -- remove the key with its value.
- `clear()` -- delete everything.
- `key(index)` -- get the key number `index`.
- `length` -- the number of stored items.
- Use `Object.keys` to get all keys.
- We access keys as object properties, in that case `storage` event isn't triggered.

Storage event:

- Triggers on `setItem`, `removeItem`, `clear` calls.
- Contains all the data about the operation (`key/oldValue/newValue`), the document `url` and the storage object `storageArea`.
- Triggers on all `window` objects that have access to the storage except the one that generated it (within a tab for `sessionStorage`, globally for `localStorage`).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
