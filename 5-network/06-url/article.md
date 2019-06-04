
<<<<<<< HEAD
# URL オブジェクト

組み込みの [URL](https://url.spec.whatwg.org/#api) クラスは URL の作成や解析に関する便利なインタフェースを提供します。

なお、必ずしもこれを使う必要はありません。厳密に `URL` オブジェクトを必要とするネットワークメソッドはなく、文字列でも十分です。しかし非常に役立つときもあります。

## URL を作成する

新しい URL オブジェクトを作成する構文です:
=======
# URL objects

The built-in [URL](https://url.spec.whatwg.org/#api) class provides a convenient interface for creating and parsing URLs.

We don't have to use it at all. There are no networking methods that require exactly an `URL` object, strings are good enough. But sometimes it can be really helpful.

## Creating an URL

The syntax to create a new URL object:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js
new URL(url, [base])
```

<<<<<<< HEAD
- **`url`** -- テキスト url です
- **`base`** -- `url` のオプションのベースです

`URL` オブジェクトを使うと、すぐにその構成要素にアクセスできます。そのため、これは url を解析する良い方法です。e.g:
=======
- **`url`** -- the text url
- **`base`** -- an optional base for the `url`

The `URL` object immediately allows us to access its components, so it's a nice way to parse the url, e.g.:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

<<<<<<< HEAD
チートシートです:

![](url-object.png)

- `href` は完全な url, `url.toString()` と同じです。
- `protocol` はコロン `:` で終わります。
- `search` ははてな `?` から始まります。
- `hash` はハッシュ `#` から始まります。
- HTTP 認証がある場合、`user` と `password` プロパティもあります。

また、相対 url を作成するときにも利用できます。この場合は2つ目の引数を使います:
=======
Here's the cheatsheet:

![](url-object.png)

- `href` is the full url, same as `url.toString()`
- `protocol` ends with the colon character `:`
- `search` starts with the question mark `?`
- `hash` starts with the hash character `#`
- there are also `user` and `password` properties if HTTP authentication is present.

We can also use `URL` to create relative urls, using the second argument:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js run
let url = new URL('profile/admin', 'https://javascript.info');

alert(url); // https://javascript.info/profile/admin

<<<<<<< HEAD
url = new URL('tester', url); // 現在の url パスに基準にして `tester` に移動します 
=======
url = new URL('tester', url); // go to 'tester' relative to current url path
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

alert(url); // https://javascript.info/profile/tester
```

<<<<<<< HEAD
```smart header="文字列の代わりにどこでも `URL` を使うことができます"
`URL` オブジェクト は `fetch` や `XMLHttpRequest`, 文字列の url が期待されているところならどこでも使うことができます。

ほぼ大多数のメソッドは、自動的に文字列に変換します。
=======
```smart header="We can use `URL` everywhere instead of a string"
We can use an `URL` object in `fetch` or `XMLHttpRequest`, almost everywhere where a string url is expected.

In the vast majority of methods it's automatically converted to a string.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
```

## SearchParams

<<<<<<< HEAD
与えられた検索パラメータで url を作成したいとしましょう、例えば `https://google.com/search?query=value` です。

これらは正しくエンコードされている必要があります。

非常に古いブラウザでは、`URL` が登場する以前、組み込み関数 `encodeURIComponent/decodeURIComponent` を使っていました。

いま、それらは必要ありません: `url.searchParams` は[URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams)型のオブジェクトです。

これは検索パラメータに対して便利なメソッドを提供しています。:

- **`append(name, value)`** -- パラメータを追加します,
- **`delete(name)`** -- パラメータを削除します,
- **`get(name)`** -- パラメータを取得します,
- **`getAll(name)`** -- 指定した name のすべてのパラメータを取得します(e.g. `?user=John&user=Pete` など複数ある場合),
- **`has(name)`** -- パラメータが存在するかをチェックします,
- **`set(name, value)`** -- パラメータを設定/置き換えます,
- **`sort()`** -- name でパラメータをソートします。めったに必要とされません,
- ...また、`Map` のように反復可能です.

そのため、`URL` オブジェクトは url パラメータを操作するための簡単な方法も提供します。

例:
=======
Let's say we want to create an url with given search params, for instance, `https://google.com/search?query=value`.

They must be correctly encoded.

In very old browsers, before `URL` appeared, we'd use built-in functions `encodeURIComponent/decodeURIComponent`.

Now, there's no need: `url.searchParams` is an object of type [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams).

It provides convenient methods for search parameters:

- **`append(name, value)`** -- add the parameter,
- **`delete(name)`** -- remove the parameter,
- **`get(name)`** -- get the parameter,
- **`getAll(name)`** -- get all parameters with that name (if many, e.g. `?user=John&user=Pete`),
- **`has(name)`** -- check for the existance of the parameter,
- **`set(name, value)`** -- set/replace the parameter,
- **`sort()`** -- sort parameters by name, rarely needed,
- ...and also iterable, similar to `Map`.

So, `URL` object also provides an easy way to operate on url parameters.

For example:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js run
let url = new URL('https://google.com/search');
url.searchParams.set('query', 'test me!');

alert(url); // https://google.com/search?query=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // add param for date range: past year

alert(url); // https://google.com/search?query=test+me%21&tbs=qdr%3Ay

// iterate over search parameters (decoded)
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // query=test me!, then tbs=qdr:y
}
```
