# TextDecoder と TextEncoder

もしバイナリデータが実際には文字列だったらどうしますか？例えばテキストデータを持つファイルを受け取りました。

組み込みの [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) オブジェクトを使うと、指定されたバッファとエンコーディングから、値を実際の JavaScript 文字列として読むことができます。

最初に TextDecoder を作成する必要があります:
```js
let decoder = new TextDecoder([label], [options]);
```

- **`label`** -- tエンコーディング、デフォルトでは `utf-8` ですが、`big5`, `windows-1251` やその他多くをサポートしています。
- **`options`** -- オプションのオブジェクト:
  - **`fatal`** -- boolean, `true` の場合、無効(デコード不可能)な文字の場合は例外をスローし、そうでなければ（デフォルト）、それらを `\uFFFD` に置き換えます。
  - **`ignoreBOM`** -- boolean, `true` の場合、BOM (オプションのバイトオーダーマーク)を無視します。めったに使われません。

...そしてデコードします:

```js
let str = decoder.decode([input], [options]);
```

- **`input`** -- デコード対象の `BufferSource` です
- **`options`** -- オプションのオブジェクト:
  - **`stream`** -- `decoder` が入ってくるデータのチャンクに対し繰り返し呼び出されるとき、ストリームをデコードする場合は `true` です。この場合、マルチバイト文字がチャンク間で分割される可能性があります。このオプションは "未完了" の文字を記憶して、次のチャンクが来た時にそれらをデコードするように `TextDecoder` に伝えます。

例:

```js run
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

alert( new TextDecoder().decode(uint8Array) ); // Hello
```


```js run
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
```

サブアレイ(subarray)ビューを作成することで、バッファの一部をデコードすることもできます:


```js run
let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

// 文字列が中央にあります
// コピーせずに、新しいビューを作成します
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hello
```

## TextEncoder

[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) は逆のこと -- 文字列をバイトにします。

構文は次の通りです:

```js run
let encoder = new TextEncoder();
```

サポートしているエンコーディングは "utf-8" だけです。

2つのメソッドがあります:
- **`encode(str)`** -- 文字列から `Uint8Array` を返します。
- **`encodeInto(str, destination)`** -- `str` を `destination` にエンコードします。`destination` は `Uint8Array` でなければなりません。

```js run
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```
