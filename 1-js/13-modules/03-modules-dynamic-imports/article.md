# Dynamic imports(ダイナミックインポート)

前の章で説明したエクスポートとインポート文は "static(静的)" と呼ばれます。この構文は非常にシンプルかつ厳密です。

まず `import` の任意のパラメータを動的に生成することはできません。

モジュールパスはプリミティブな文字列でなければならず、関数呼び出しもできません。これは動作しません。:

```js
import ... from *!*getModuleName()*/!*; // Error, string だけが許可されています
```

次に、条件に応じたインポートや、実行時にインポートすることはできません。:

```js
if(...) {
  import ...; // Error, 許可されていません!
}

{
  import ...; // Error, 任意のブロックに import を置くことはできません
}
```

これは、`import/export` はコード構造のバックボーンを提供することを目的としているためです。コード構造は分析することができ、特別なツールを利用してモジュールを集め一つまとめることができ、未使用のエクスポートは除去されます(tree-shaken)。これはインポート/エクスポートがすべてが固定されているがゆえに可能なことです。

では、どのようにしてモジュールを動的に、オンデマンドでインポートするのでしょう？

## import() 式

`import(module)` 式は、モジュールを読み込み、モジュールがもつすべてのエクスポートを含むモジュールオブジェクトになる promise を返します。

コードの任意の場所で動的に利用できます。以下は例です:

```js run
let modulePath = prompt("Module path?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, no such module?>)
```

あるいは、async function 内であれば `let module = await import(modulePath)` とすることができます。

例えば、次のようなモジュール `say.js` があるとします:

```js
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
```

...動的インポートは次のようにできます:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

また、`say.js` が default export を持っている場合は次のようになります:

```js
// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
```

...そこへアクセスするには、モジュールオブジェクトの `default` プロパティを使用します。:

```js
let obj = await import('./say.js');
let say = obj.default;
// あるいは、1行で: let {default: say} = await import('./say.js');

say();
```

ここに完全な例があります:

[codetabs src="say" current="index.html"]

```smart
ダイナミックインポートは通常のスクリプトで動作するので、`script type="module"` は必要ありません。
```

```smart
`import()` は一見すると関数呼び出しに見えますが、たまたま括弧を使用している特別な構文です（`super()` と同様です）。

したがって、変数に `import` をコピーしたり、`call/apply` を使用することはできません。関数ではないからです。
```
