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
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

````smart header="export class/function の後にセミコロンはありません"
クラスや関数の前の `export` はそれを [関数式](info:function-expressions) にはしないことに注意してください。エクスポートされていますが、依然として関数宣言です。

ほとんどの JavaScript のスタイルガイドは、関数とクラス宣言の後のセミコロンは推奨しません。

そういうわけで、`export class` と `export function` の末尾にはセミコロンがありません。

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} *!* // 末尾に ; はありません */!*
```

````

## 宣言とは別に export する

別に `export` を記述することもできます。

ここでは、最初に宣言をし、その後エクスポートしています:

```js
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

*!*
export {sayHi, sayBye}; // エクスポートされた変数のリスト
*/!*
```

...あるいは、技術的には関数の上に `export` を置くこともできます。

## import *

通常は、次のようにインポートするものの一覧を波括弧 `import {...}` に置きます。:

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

しかし、import の数が多い場合、`import * as <obj>` を使用してオブジェクトとしてすべてをインポートすることができます。例:

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

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

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## Export "as"

同様の構文は `export` にも存在します。

関数を `hi` と `bye` としてエクスポートしましょう。:

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

今、`hi` と `bye` は外部にとって公式な名前になります。:

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Hello, John!
say.*!*bye*/!*('John'); // Bye, John!
```

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
  constructor(name) {
    this.name = name;
  }
}
```

ファイルごとに 1 つだけ `export default` が存在する場合があります。

...そして波括弧なしでそれをインポートします:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // {User} ではなく User

new User('John');
```

波括弧なしのインポートは見栄えがよくなります。モジュールを使い始めるときによくある間違いは、波括弧を忘れてしまうことです。なので、覚えておいてください。`import` は名前付けインポートの場合には波括弧が必要であり、デフォルトインポートの場合には不要です。

| 名前付きエクスポート | デフォルトエクスポート |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

技術的には、1 つのモジュールの中で、デフォルトと名前付きエクスポート両方をもたせることもできますが、実際には、通常は混在させません。モジュールは名前付きエクスポート、あるいはデフォルトいずれかを持ちます。

ファイルごとに最大で 1 つのデフォルトエクスポートがあり、エクスポートされたエンティティには名前がない場合があります。

例えば、これらはすべて有効なデフォルトエクスポートです:

```js
export default class { // クラス名なし
  constructor() { ... }
}
```

```js
export default function (user) { // 関数名なし
  alert(`Hello, ${user}!`);
}
```

```js
// 変数の作成なしで単一値のエクスポート
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

これは問題ありません。なぜなら `export default` はファイル毎に1つのみだけだからです。そのため、`import` は何をインポートすべきか常に知っています。

`default` がない場合はエラーになります。:

```js
export class { // Error! (非デフォルトエクスポートは名前が必要です)
  constructor() {}
}
```

### "default" 名

状況によっては、"default" というキーワードはデフォルトエクスポートを参照するために使用されます。

例えば、ある関数をその定義とは別にエクスポートする場合です:

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// 関数の前に "export default" を追加する場合と同じです
export { sayHi as default };
```

あるいは、モジュール `user.js` が 1 つのメインの "デフォルト" のものと、いくつかの名前付きのものをエクスポートする場合(めったにありませんが起こりえます)、次のようになります:

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

これは名前付きと一緒にデフォルトエクスポートをインポートする方法です:

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

そして、オブジェクトとして `*` ですべてをインポートする場合、`default` プロパティはまさにデフォルトエクスポートです:

```js
// 📁 main.js
import * as user from './user.js';

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

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

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

```js
import {login, logout} from 'auth/index.js'
```

"メインファイル" `auth/index.js` はパッケージで提供したいすべての機能をエクスポートします。

この考えは、部外者(我々のパッケージを使う開発者)は、その内部構造に干渉する必要はないということです。彼らは我々のパッケージフォルダの中のファイルを検索するべきではありません。我々は `auth/index.js` に必要なものだけをエクスポートし、残りの部分は詮索好きな目から隠れたままにします。

いま、実際にエクスポートされた機能はパッケージ内に散らかっているので、それらを集めて `auth/index.js` で "再エクスポート" します。:

```js
// 📁 auth/index.js

// login/logout をインポートし、すぐにエクスポートします
import {login, logout} from './helpers.js';
export {login, logout};

// User として default をインポートし、エクスポートします
import User from './user.js';
export {User};
...
```

これで、我々のパッケージの利用者は `import {login} from "auth/index.js"` ができます。

構文 `export ... from ...` はこのようなインポート - エクスポートの短縮記法です:

```js
// 📁 auth/index.js
// login/logout の再エクスポート
export {login, logout} from './helpers.js';

// User で default エクスポートを再エクスポート
export {default as User} from './user.js';
...
```

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

```js
if (something) {
  import {sayHi} from "./say.js"; // Error: import must be at top level
}
```

...しかし仮に本当に条件に応じてなにかをインポートする必要がある場合はどうなるでしょう？あるいは、本当に必要なときに要求に応じてモジュールをロードするような場合です。

次のチャプターではダイナミックインポートを見ていきます。
