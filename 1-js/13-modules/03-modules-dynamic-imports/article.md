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

```js
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
```

...Then dynamic import can be like this:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

Or, if `say.js` has the default export:

```js
// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
```

...Then, in order to access it, we can use `default` property of the module object:

```js
let obj = await import('./say.js');
let say = obj.default;
// or, in one line: let {default: say} = await import('./say.js');

say();
```

Here's the full example:

[codetabs src="say" current="index.html"]

```smart
Dynamic imports work in regular scripts, they don't require `script type="module"`.
```

```smart
Although `import()` looks like a function call, it's a special syntax that just happens to use parentheses (similar to `super()`).

So we can't copy `import` to a variable or use `call/apply` with it. It's not a function.
```
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8
