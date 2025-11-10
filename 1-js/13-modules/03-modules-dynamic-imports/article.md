<<<<<<< HEAD
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
=======
# Dynamic imports

Export and import statements that we covered in previous chapters are called "static". The syntax is very simple and strict.

First, we can't dynamically generate any parameters of `import`.

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

That's because `import`/`export` aim to provide a backbone for the code structure. That's a good thing, as code structure can be analyzed, modules can be gathered and bundled into one file by special tools, unused exports can be removed ("tree-shaken"). That's possible only because the structure of imports/exports is simple and fixed.

But how can we import a module dynamically, on-demand?

## The import() expression

The `import(module)` expression loads the module and returns a promise that resolves into a module object that contains all its exports. It can be called from any place in the code.

We can use it dynamically in any place of the code, for instance:

```js
let modulePath = prompt("Which module to load?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
```

Or, we could use `let module = await import(modulePath)` if inside an async function.

For instance, if we have the following module `say.js`:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
```

<<<<<<< HEAD
...動的インポートは次のようにできます:
=======
...Then dynamic import can be like this:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

<<<<<<< HEAD
また、`say.js` が default export を持っている場合は次のようになります:
=======
Or, if `say.js` has the default export:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
```

<<<<<<< HEAD
...そこへアクセスするには、モジュールオブジェクトの `default` プロパティを使用します。:
=======
...Then, in order to access it, we can use `default` property of the module object:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
let obj = await import('./say.js');
let say = obj.default;
<<<<<<< HEAD
// あるいは、1行で: let {default: say} = await import('./say.js');
=======
// or, in one line: let {default: say} = await import('./say.js');
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

say();
```

<<<<<<< HEAD
ここに完全な例があります:
=======
Here's the full example:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

[codetabs src="say" current="index.html"]

```smart
<<<<<<< HEAD
ダイナミックインポートは通常のスクリプトで動作するので、`script type="module"` は必要ありません。
```

```smart
`import()` は一見すると関数呼び出しに見えますが、たまたま括弧を使用している特別な構文です（`super()` と同様です）。

したがって、変数に `import` をコピーしたり、`call/apply` を使用することはできません。関数ではないからです。
=======
Dynamic imports work in regular scripts, they don't require `script type="module"`.
```

```smart
Although `import()` looks like a function call, it's a special syntax that just happens to use parentheses (similar to `super()`).

So we can't copy `import` to a variable or use `call/apply` with it. It's not a function.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```
