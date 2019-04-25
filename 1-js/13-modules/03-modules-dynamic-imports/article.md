
<<<<<<< HEAD
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
=======
# Dynamic imports

Export and import statements that we covered in previous chaters are called "static".

That's because they are indeed static. The syntax is very strict.

First, we can't dynamicaly generate any parameters of `import`.

The module path must be a primitive string, can't be a function call. This won't work:

```js
import ... from *!*getModuleName()*/!*; // Error, only from "string" is allowed
```

Second, we can't import conditionally or at run-time:

```js
if(...) {
  import ...; // Error, not allowed!
}

{
  import ...; // Error, we can't put import in any block
}
```

That's because, import/export aim to provide a backbone for the code structure. That's a good thing, as code structure can be analyzed, modules can be gathered and bundled together, unused exports can be removed (tree-shaken). That's possible only because everything is fixed.

But how do we import a module dynamically, on-demand?

## The import() function

The `import(module)` function can be called from anywhere. It returns a promise that resolves into a module object.

The usage pattern looks like this:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let modulePath = prompt("Module path?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, no such module?>)
```

<<<<<<< HEAD
あるいは、async function 内であれば `let module = await import(modulePath)` とすることができます。

このようになります:

[codetabs src="say" current="index.html"]

したがって、ダイナミックインポートは非常に簡単に使用できます。

また、ダイナミックインポートは通常のスクリプトで動作するので、`script type="module"` は必要ありません。
=======
Or, we could use `let module = await import(modulePath)` if inside an async function.

Like this:

[codetabs src="say" current="index.html"]

So, dynamic imports are very simple to use.

Also, dynamic imports work in regular scripts, they don't require `script type="module"`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
