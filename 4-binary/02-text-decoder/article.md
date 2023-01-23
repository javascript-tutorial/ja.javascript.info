<<<<<<< HEAD
# TextDecoder と TextEncoder

もしバイナリデータが実際には文字列だったらどうしますか？例えばテキストデータを持つファイルを受け取りました。

組み込みの [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) オブジェクトを使うと、指定されたバッファとエンコーディングから、値を実際の JavaScript 文字列として読むことができます。

最初に TextDecoder を作成する必要があります:
=======
# TextDecoder and TextEncoder

What if the binary data is actually a string? For instance, we received a file with textual data.

The built-in [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) object allows one to read the value into an actual JavaScript string, given the buffer and the encoding.

We first need to create it:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
let decoder = new TextDecoder([label], [options]);
```

<<<<<<< HEAD
- **`label`** -- エンコーディング、デフォルトでは `utf-8` ですが、`big5`, `windows-1251` やその他多くをサポートしています。
- **`options`** -- オプションのオブジェクト:
  - **`fatal`** -- boolean, `true` の場合、無効(デコード不可能)な文字の場合は例外をスローし、そうでなければ（デフォルト）、それらを `\uFFFD` に置き換えます。
  - **`ignoreBOM`** -- boolean, `true` の場合、BOM (オプションのバイトオーダーマーク)を無視します。めったに使われません。

...そしてデコードします:
=======
- **`label`** -- the encoding, `utf-8` by default, but `big5`, `windows-1251` and many other are also supported.
- **`options`** -- optional object:
  - **`fatal`** -- boolean, if `true` then throw an exception for invalid (non-decodable) characters, otherwise (default) replace them with character `\uFFFD`.
  - **`ignoreBOM`** -- boolean, if `true` then ignore BOM (an optional byte-order Unicode mark), rarely needed.

...And then decode:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let str = decoder.decode([input], [options]);
```

<<<<<<< HEAD
- **`input`** -- デコード対象の `BufferSource` です
- **`options`** -- オプションのオブジェクト:
  - **`stream`** -- `decoder` が入ってくるデータのチャンクに対し繰り返し呼び出されるとき、ストリームをデコードする場合は `true` です。この場合、マルチバイト文字がチャンク間で分割される可能性があります。このオプションは "未完了" の文字を記憶して、次のチャンクが来た時にそれらをデコードするように `TextDecoder` に伝えます。

例:
=======
- **`input`** -- `BufferSource` to decode.
- **`options`** -- optional object:
  - **`stream`** -- true for decoding streams, when `decoder` is called repeatedly with incoming chunks of data. In that case a multi-byte character may occasionally split between chunks. This options tells `TextDecoder` to memorize "unfinished" characters and decode them when the next chunk comes.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

alert( new TextDecoder().decode(uint8Array) ); // Hello
```


```js run
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
```

<<<<<<< HEAD
サブアレイ(subarray)ビューを作成することで、バッファの一部をデコードすることもできます:
=======
We can decode a part of the buffer by creating a subarray view for it:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff


```js run
let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

<<<<<<< HEAD
// 文字列が中央にあります
// コピーせずに、新しいビューを作成します
=======
// the string is in the middle
// create a new view over it, without copying anything
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hello
```

## TextEncoder

<<<<<<< HEAD
[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) は逆のこと -- 文字列をバイトにします。

構文は次の通りです:

```js run
let encoder = new TextEncoder();
```

サポートしているエンコーディングは "utf-8" だけです。

2つのメソッドがあります:
- **`encode(str)`** -- 文字列から `Uint8Array` を返します。
- **`encodeInto(str, destination)`** -- `str` を `destination` にエンコードします。`destination` は `Uint8Array` でなければなりません。
=======
[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) does the reverse thing -- converts a string into bytes.

The syntax is:

```js
let encoder = new TextEncoder();
```

The only encoding it supports is "utf-8".

It has two methods:
- **`encode(str)`** -- returns `Uint8Array` from a string.
- **`encodeInto(str, destination)`** -- encodes `str` into `destination` that must be `Uint8Array`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```
