
# Dynamic imports(ダイナミックインポート)

前のチャプターで説明したエクスポートとインポート文は "static(静的)" と呼ばれます。

それらは確かに静的であり、構文は非常に厳密です。

静的な場合、まず `import` の任意のパラメータを動的に生成することはできません。

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

これは、インポート/エクスポートはコード構造のバックボーンを提供することを目的としているためです。コード構造は分析することができ、モジュールを集め一緒にまとめることができ、未使用のエクスポートを除去する(tree-shaken)ことができるので、これは素晴らしいことです。これはすべてが固定されているがゆえに可能なことです。

しかし、どのようにしてモジュールを動的にオンデマンドでインポートするのでしょう？

## import() 関数

`import(module)` 関数はどこからでも呼び出すことができます。これはモジュールオブジェクトになる promise を返します。

使用パターンは次のようになります:

```js run
let modulePath = prompt("Module path?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, no such module?>)
```

あるいは、async function 内であれば `let module = await import(modulePath)` とすることができます。

このようになります:

[codetabs src="say" current="index.html"]

したがって、ダイナミックインポートは非常に簡単に使用できます。

また、ダイナミックインポートは通常のスクリプトで動作するので、`script type="module"` は必要ありません。
