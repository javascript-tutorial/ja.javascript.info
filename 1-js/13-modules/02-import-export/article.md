<<<<<<< HEAD
# エクスポートとインポート

エクスポート(export)とインポート(import)ディレクティブにはいくつかの構文パターンがあります。

前章ではシンプルな使用例を見ました。ここではより多くの例を見ていきましょう。

## 宣言の前の export

変数、関数、クラスのいずれかであれば、その前に `export` を置くことで、エクスポート対象として任意の宣言にラベル付けすることができます。

例えば、ここではすべてのエクスポートは有効です:

```js
// 配列のエクスポート
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 定数のエクスポート
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// クラスのエクスポート
=======
# Export and Import

Export and import directives have several syntax variants.

In the previous article we saw a simple use, now let's explore more examples.

## Export before declarations

We can label any declaration as exported by placing `export` before it, be it a variable, function or a class.

For instance, here all exports are valid:

```js
// export an array
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export a constant
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
>>>>>>> 20208769e528337949e946f526534d61d38bac47
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

<<<<<<< HEAD
````smart header="export class/function の後にセミコロンはありません"
クラスや関数の前の `export` はそれを [関数式](info:function-expressions) にはしないことに注意してください。エクスポートされていますが、依然として関数宣言です。

ほとんどの JavaScript のスタイルガイドは、関数とクラス宣言の後のセミコロンは推奨しません。

そういうわけで、`export class` と `export function` の末尾にはセミコロンがありません。
=======
````smart header="No semicolons after export class/function"
Please note that `export` before a class or a function does not make it a [function expression](info:function-expressions). It's still a function declaration, albeit exported.

Most JavaScript style guides don't recommend semicolons after function and class declarations.

That's why there's no need for a semicolon at the end of `export class` and `export function`:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
<<<<<<< HEAD
} *!* // 末尾に ; はありません */!*
=======
} *!* // no ; at the end */!*
>>>>>>> 20208769e528337949e946f526534d61d38bac47
```

````

<<<<<<< HEAD
## 宣言とは別に export する

別に `export` を記述することもできます。

ここでは、最初に宣言をし、その後エクスポートしています:
=======
## Export apart from declarations

Also, we can put `export` separately.

Here we first declare, and then export:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

*!*
<<<<<<< HEAD
export {sayHi, sayBye}; // エクスポートされた変数のリスト
*/!*
```

...あるいは、技術的には関数の上に `export` を置くこともできます。

## import *

通常は、次のようにインポートするものの一覧を波括弧 `import {...}` に置きます。:
=======
export {sayHi, sayBye}; // a list of exported variables
*/!*
```

...Or, technically we could put `export` above functions as well.

## Import *

Usually, we put a list of what to import in curly braces `import {...}`, like this:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

<<<<<<< HEAD
しかし、import の数が多い場合、`import * as <obj>` を使用してオブジェクトとしてすべてをインポートすることができます。例:
=======
But if there's a lot to import, we can import everything as an object using `import * as <obj>`, for instance:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

<<<<<<< HEAD
一見すると、記述量も少なく、非常にクールに思えます。そもそも、なぜインポートが必要なものを明示的にリストする必要があるのでしょう？

それにはいくつかの理由があります。

1. 何をインポートするかを明示的にリストすることで、より短い名前にできます: `say.sayHi()` の代わりに `sayHi()`。
2. 明示的なインポートの一覧はコード構造の見通しをよりよくします。: 何がどこで使われているか。それはコードをサポートし、リファクタリングをより簡単にします。

```smart header="インポートし過ぎることを気にしないでください"
現代のビルドツール ([webpack](http://webpack.github.io) など) はモジュールをまとめ、読み込みを高速化するために最適化を行ったり、未使用なものを削除します。

例えば、巨大なコードライブラリから `import * as library` を行い、いくつかのメソッドのみを使用する場合、未使用のものは最適化されたバンドルには [含まれません](https://github.com/webpack/webpack/tree/main/examples/harmony-unused#examplejs)。
```

## import "as"

異なる名前でインポートするために `as` を使うこともできます。

例えば、簡潔にするために `sayHi` をローカル変数 `hi` にインポートしましょう。`sayBye` も同様です。:
=======
At first sight, "import everything" seems such a cool thing, short to write, why should we ever explicitly list what we need to import?

Well, there are few reasons.

1. Explicitly listing what to import gives shorter names: `sayHi()` instead of `say.sayHi()`.
2. Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.

```smart header="Don't be afraid to import too much"
Modern build tools, such as [webpack](https://webpack.js.org/) and others, bundle modules together and optimize them to speedup loading. They also remove unused imports.

For instance, if you `import * as library` from a huge code library, and then use only few methods, then unused ones [will not be included](https://github.com/webpack/webpack/tree/main/examples/harmony-unused#examplejs) into the optimized bundle.
```

## Import "as"

We can also use `as` to import under different names.

For instance, let's import `sayHi` into the local variable `hi` for brevity, and import `sayBye` as `bye`:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## Export "as"

<<<<<<< HEAD
同様の構文は `export` にも存在します。

関数を `hi` と `bye` としてエクスポートしましょう。:
=======
The similar syntax exists for `export`.

Let's export functions as `hi` and `bye`:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

<<<<<<< HEAD
今、`hi` と `bye` は外部にとって公式な名前になります。:
=======
Now `hi` and `bye` are official names for outsiders, to be used in imports:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Hello, John!
say.*!*bye*/!*('John'); // Bye, John!
```

<<<<<<< HEAD
## export default

実際には、主に 2 種類のモジュールがあります。

1. 上記の `say.js` のようなライブラリ、関数のパックを含むモジュール
2. 単一のエンティティを宣言するモジュール。例: モジュール `user.js` は `class User` のみをエクスポートします。

ほとんどの場合、すべての "もの" が自身のモジュールに存在するように、2 番目のアプローチが好まれます。

当然のことながら、モジュールシステムでは、すべてが独自のモジュールになるため、多くのファイルが必要となります。が、それはまったく問題ではありません。実際には、ファイルが良く名前付けされ、フォルダに構造化されていれば、コードのナビゲーションはとても簡単になります。

モジュールは、特別な `export default` ("デフォルトエクスポート") 構文を提供し、"モジュール毎に 1 つのもの" のように見栄えを良くします。

エクスポートするエンティティの前に `export default` を置きます:

```js
// 📁 user.js
export *!*default*/!* class User { // "default" を追加するだけ
=======
## Export default

In practice, there are mainly two kinds of modules.

1. Modules that contain a library, pack of functions, like `say.js` above.
2. Modules that declare a single entity, e.g. a module `user.js` exports only `class User`.

Mostly, the second approach is preferred, so that every "thing" resides in its own module.

Naturally, that requires a lot of files, as everything wants its own module, but that's not a problem at all. Actually, code navigation becomes easier if files are well-named and structured into folders.

Modules provide a special `export default` ("the default export") syntax to make the "one thing per module" way look better.

Put `export default` before the entity to export:

```js
// 📁 user.js
export *!*default*/!* class User { // just add "default"
>>>>>>> 20208769e528337949e946f526534d61d38bac47
  constructor(name) {
    this.name = name;
  }
}
```

<<<<<<< HEAD
ファイルごとに 1 つだけ `export default` が存在する場合があります。

...そして波括弧なしでそれをインポートします:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // {User} ではなく User
=======
There may be only one `export default` per file.

...And then import it without curly braces:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // not {User}, just User
>>>>>>> 20208769e528337949e946f526534d61d38bac47

new User('John');
```

<<<<<<< HEAD
波括弧なしのインポートは見栄えがよくなります。モジュールを使い始めるときによくある間違いは、波括弧を忘れてしまうことです。なので、覚えておいてください。`import` は名前付けインポートの場合には波括弧が必要であり、デフォルトインポートの場合には不要です。

| 名前付きエクスポート | デフォルトエクスポート |
=======
Imports without curly braces look nicer. A common mistake when starting to use modules is to forget curly braces at all. So, remember, `import` needs curly braces for named exports and doesn't need them for the default one.

| Named export | Default export |
>>>>>>> 20208769e528337949e946f526534d61d38bac47
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

<<<<<<< HEAD
技術的には、1 つのモジュールの中で、デフォルトと名前付きエクスポート両方をもたせることもできますが、実際には、通常は混在させません。モジュールは名前付きエクスポート、あるいはデフォルトいずれかを持ちます。

ファイルごとに最大で 1 つのデフォルトエクスポートがあり、エクスポートされたエンティティには名前がない場合があります。

例えば、これらはすべて有効なデフォルトエクスポートです:

```js
export default class { // クラス名なし
=======
Technically, we may have both default and named exports in a single module, but in practice people usually don't mix them. A module has either named exports or the default one.

As there may be at most one default export per file, the exported entity may have no name.

For instance, these are all perfectly valid default exports:

```js
export default class { // no class name
>>>>>>> 20208769e528337949e946f526534d61d38bac47
  constructor() { ... }
}
```

```js
<<<<<<< HEAD
export default function (user) { // 関数名なし
=======
export default function(user) { // no function name
>>>>>>> 20208769e528337949e946f526534d61d38bac47
  alert(`Hello, ${user}!`);
}
```

```js
<<<<<<< HEAD
// 変数の作成なしで単一値のエクスポート
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

これは問題ありません。なぜなら `export default` はファイル毎に1つのみだけだからです。そのため、`import` は何をインポートすべきか常に知っています。

`default` がない場合はエラーになります。:

```js
export class { // Error! (非デフォルトエクスポートは名前が必要です)
=======
// export a single value, without making a variable
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

Not giving a name is fine, because there is only one `export default` per file, so `import` without curly braces knows what to import.

Without `default`, such an export would give an error:

```js
export class { // Error! (non-default export needs a name)
>>>>>>> 20208769e528337949e946f526534d61d38bac47
  constructor() {}
}
```

<<<<<<< HEAD
### "default" 名

状況によっては、"default" というキーワードはデフォルトエクスポートを参照するために使用されます。

例えば、ある関数をその定義とは別にエクスポートする場合です:
=======
### The "default" name

In some situations the `default` keyword is used to reference the default export.

For example, to export a function separately from its definition:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

<<<<<<< HEAD
// 関数の前に "export default" を追加する場合と同じです
export { sayHi as default };
```

あるいは、モジュール `user.js` が 1 つのメインの "デフォルト" のものと、いくつかの名前付きのものをエクスポートする場合(めったにありませんが起こりえます)、次のようになります:
=======
// same as if we added "export default" before the function
export {sayHi as default};
```

Or, another situation, let's say a module `user.js` exports one main "default" thing, and a few named ones (rarely the case, but it happens):
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

<<<<<<< HEAD
これは名前付きと一緒にデフォルトエクスポートをインポートする方法です:
=======
Here's how to import the default export along with a named one:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

<<<<<<< HEAD
そして、オブジェクトとして `*` ですべてをインポートする場合、`default` プロパティはまさにデフォルトエクスポートです:
=======
And, finally, if importing everything `*` as an object, then the `default` property is exactly the default export:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
// 📁 main.js
import * as user from './user.js';

<<<<<<< HEAD
let User = user.default;
new User('John');
```

### デフォルトエクスポートを使うべきですか？

名前付きエクスポートは明示的です。それらは正確にインポートするものを命名するので、そこから情報を得ることができます。これは良いことです。

また、名前付きエクスポートは、インポートするのに正確に正しい名前を使うことを強制します。

```js
import {User} from './user.js';
// import {MyUser} は動作しません。名前は {User} でなければなりません。
```

...一方、デフォルトエクスポートの場合、インポート時に常に独自の名前を作成する必要があります。:

```js
import User from './user.js'; // 動作します
import MyUser from './user.js'; // 動作します
// なにでもインポートでき、それは動作します
```

そのため、チームメンバは同じものに異なる名前を使用することができてしまうため、そこには誤用される余地があります。

通常、それを避け、コードの一貫性を保つため、インポートされた変数はファイル名に対応するべきであるという規則があります。例えば:
=======
let User = user.default; // the default export
new User('John');
```

### A word against default exports

Named exports are explicit. They exactly name what they import, so we have that information from them; that's a good thing.

Named exports force us to use exactly the right name to import:

```js
import {User} from './user.js';
// import {MyUser} won't work, the name must be {User}
```

...While for a default export, we always choose the name when importing:

```js
import User from './user.js'; // works
import MyUser from './user.js'; // works too
// could be import Anything... and it'll still work
```

So team members may use different names to import the same thing, and that's not good.

Usually, to avoid that and keep the code consistent, there's a rule that imported variables should correspond to file names, e.g:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

<<<<<<< HEAD
それでも、チームによってはこれをデフォルトエクスポートの重大な欠点だと考えるかもしれません。この場合は常に名前付きエクスポートを使用することが好ましいです。たとえ単一のものだけがエクスポートされるとしても、`default` なしで名前付きでエクスポートします。

これは、再エクスポート(後述)を少しだけ簡単にもします。

## 再エクスポート

"再エクスポート" 構文 `export ... from ...` を使うと、インポートをした直後にそれらを(場合により別の名前で)エクスポートすることができます。:

```js
export {sayHi} from './say.js'; // sayHi を再エクスポート

export {default as User} from './user.js'; // default を再エクスポート
```

なぜこれが必要なのでしょう？実用的なユースケースを見てみましょう。

"パッケージ" を書いていると想像してください。: 多くのモジュールを含むフォルダで、一部の機能が外部にエクスポートされています（NPM のようなツールはこのようなパッケージの公開と配布を可能にしますが、それらを使用する必要はありません）。また、多くのモジュールは他のパッケージのモジュールで内部的に使用するための単なる "ヘルパー" です。

ファイル構造は次のようになります:
```
auth/
  index.js
  user.js
  helpers.js
  tests/
    login.js
  providers/
    github.js
    facebook.js
    ...
```

単一のエントリポイント経由でパッケージの機能を公開したいです。

つまり、我々のパッケージを利用したい人は "メインファイル" `auth/index.js` からのみインポートします。

次のようになります:
=======
Still, some teams consider it a serious drawback of default exports. So they prefer to always use named exports. Even if only a single thing is exported, it's still exported under a name, without `default`.

That also makes re-export (see below) a little bit easier.

## Re-export

"Re-export" syntax `export ... from ...` allows to import things and immediately export them (possibly under another name), like this:

```js
export {sayHi} from './say.js'; // re-export sayHi

export {default as User} from './user.js'; // re-export default
```

Why would that be needed? Let's see a practical use case.

Imagine, we're writing a "package": a folder with a lot of modules, with some of the functionality exported outside (tools like NPM allow us to publish and distribute such packages, but we don't have to use them), and many modules are just "helpers", for internal use in other package modules.

The file structure could be like this:
```
auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

We'd like to expose the package functionality via a single entry point.

In other words, a person who would like to use our package, should import only from the "main file" `auth/index.js`.

Like this:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
import {login, logout} from 'auth/index.js'
```

<<<<<<< HEAD
"メインファイル" `auth/index.js` はパッケージで提供したいすべての機能をエクスポートします。

この考えは、部外者(我々のパッケージを使う開発者)は、その内部構造に干渉する必要はないということです。彼らは我々のパッケージフォルダの中のファイルを検索するべきではありません。我々は `auth/index.js` に必要なものだけをエクスポートし、残りの部分は詮索好きな目から隠れたままにします。

いま、実際にエクスポートされた機能はパッケージ内に散らかっているので、それらを集めて `auth/index.js` で "再エクスポート" します。:
=======
The "main file", `auth/index.js` exports all the functionality that we'd like to provide in our package.

The idea is that outsiders, other programmers who use our package, should not meddle with its internal structure, search for files inside our package folder. We export only what's necessary in `auth/index.js` and keep the rest hidden from prying eyes.

As the actual exported functionality is scattered among the package, we can import it into `auth/index.js` and export from it:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
// 📁 auth/index.js

<<<<<<< HEAD
// login/logout をインポートし、すぐにエクスポートします
import {login, logout} from './helpers.js';
export {login, logout};

// User として default をインポートし、エクスポートします
=======
// import login/logout and immediately export them
import {login, logout} from './helpers.js';
export {login, logout};

// import default as User and export it
>>>>>>> 20208769e528337949e946f526534d61d38bac47
import User from './user.js';
export {User};
...
```

<<<<<<< HEAD
これで、我々のパッケージの利用者は `import {login} from "auth/index.js"` ができます。

構文 `export ... from ...` はこのようなインポート - エクスポートの短縮記法です:

```js
// 📁 auth/index.js
// login/logout の再エクスポート
export {login, logout} from './helpers.js';

// User で default エクスポートを再エクスポート
=======
Now users of our package can `import {login} from "auth/index.js"`.

The syntax `export ... from ...` is just a shorter notation for such import-export:

```js
// 📁 auth/index.js
// re-export login/logout
export {login, logout} from './helpers.js';

// re-export the default export as User
>>>>>>> 20208769e528337949e946f526534d61d38bac47
export {default as User} from './user.js';
...
```

<<<<<<< HEAD
````warn header="デフォルトの再エクスポートは用心が必要です"
注意: `export User from './user.js'` は動作しません。実際には構文エラーです。デフォルトエクスポートを再エクスポートするには、明示的に `{default as ...}` と言及しなければなりません。上の例のように。

また、もう1つ奇妙なことがあります。: `export * from './user.js'` は名前付けエクスポートのみを再エクスポートし、デフォルトは含まれていません。改めて言いますが、明示的に言及する必要があります。

例えば、すべてを再エクスポートするには、2つの文が必要になります。:

```js
export * from './module.js'; // to re-export named exports
export {default} from './module.js'; // to re-export default
```

デフォルトは再エクスポートするときのみ明示的な言及が必要です。: `import * as obj` は動作します。これは `obj.default` としてデフォルトエクスポートをインポートします。なので、インポートとエクスポートの間には少し非対称性があります。
````

## サマリ

`export` には以下の種類があります:

- 宣言の前:
  - `export [default] class/function/variable ...`
- スタンドアロン:
  - `export {x [as y], ...}`.
- 再エクスポート:
  - `export {x [as y], ...} from "mod"`
  - `export * from "mod"` (デフォルトは再エクスポートしない).
  - `export {default [as y]} from "mod"` (デフォルトの再エクスポート).

Import:

- モジュールから名前付きエクスポート:
  - `import {x [as y], ...} from "mod"`
- デフォルトエクスポート:
  - `import x from "mod"`
  - `import {default as x} from "mod"`
- すべて:
  - `import * as obj from "mod"`
- モジュールの取得/評価のみでインポートはしない:
  - `import "mod"`

import/export 文を他のコードの前後に置くことができ、どちらでも同じ結果になります。

なので、これも技術的には問題ありません:

```js
sayHi();

import {sayHi} from './say.js'; // ファイルの末尾で import
```

実際には、インポートは通常ファイルの先頭にありますが、それは利便性のためだけです。

**import/export 文は `{...}` の中では動作しないことに注意してください**

このような条件付きのインポートは動作しません:

=======
The notable difference of `export ... from` compared to `import/export` is that re-exported modules aren't available in the current file. So inside the above example of `auth/index.js` we can't use re-exported `login/logout` functions.

### Re-exporting the default export

The default export needs separate handling when re-exporting.

Let's say we have `user.js` with the `export default class User` and would like to re-export it:

```js
// 📁 user.js
export default class User {
  // ...
}
```

We can come across two problems with it:

1. `export User from './user.js'` won't work. That would lead to a syntax error.

    To re-export the default export, we have to write `export {default as User}`, as in the example above.

2. `export * from './user.js'` re-exports only named exports, but ignores the default one.

    If we'd like to re-export both named and default exports, then two statements are needed:
    ```js
    export * from './user.js'; // to re-export named exports
    export {default} from './user.js'; // to re-export the default export
    ```

Such oddities of re-exporting a default export are one of the reasons why some developers don't like default exports and prefer named ones.

## Summary

Here are all types of `export` that we covered in this and previous articles.

You can check yourself by reading them and recalling what they mean:

- Before declaration of a class/function/..:
  - `export [default] class/function/variable ...`
- Standalone export:
  - `export {x [as y], ...}`.
- Re-export:
  - `export {x [as y], ...} from "module"`
  - `export * from "module"` (doesn't re-export default).
  - `export {default [as y]} from "module"` (re-export default).

Import:

- Importing named exports:
  - `import {x [as y], ...} from "module"`
- Importing the default export:
  - `import x from "module"`
  - `import {default as x} from "module"`
- Import all:
  - `import * as obj from "module"`
- Import the module (its code runs), but do not assign any of its exports to variables:
  - `import "module"`

We can put `import/export` statements at the top or at the bottom of a script, that doesn't matter.

So, technically this code is fine:
```js
sayHi();

// ...

import {sayHi} from './say.js'; // import at the end of the file
```

In practice imports are usually at the start of the file, but that's only for more convenience.

**Please note that import/export statements don't work if inside `{...}`.**

A conditional import, like this, won't work:
>>>>>>> 20208769e528337949e946f526534d61d38bac47
```js
if (something) {
  import {sayHi} from "./say.js"; // Error: import must be at top level
}
```

<<<<<<< HEAD
...しかし仮に本当に条件に応じてなにかをインポートする必要がある場合はどうなるでしょう？あるいは、本当に必要なときに要求に応じてモジュールをロードするような場合です。

次のチャプターではダイナミックインポートを見ていきます。
=======
...But what if we really need to import something conditionally? Or at the right time? Like, load a module upon request, when it's really needed?

We'll see dynamic imports in the next article.
>>>>>>> 20208769e528337949e946f526534d61d38bac47
