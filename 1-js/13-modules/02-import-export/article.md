
# エクスポートとインポート

エクスポート(export)とインポート(import)ディレクティブは非常に用途が広いです。

前のチャプターでは、シンプルな使用例を見ました。ここではより多くの例を見ていきましょう。

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
クラスや関数の前の `export` はそれを [関数式](info:function-expressions-arrows) にはしないことに注意してください。エクスポートされていますが、依然として関数宣言です。

ほとんどの JavaScript のスタイルガイドは文のあとにセミコロンを推奨しますが、関数とクラス宣言の後は推奨しません。

そういうわけで、`export class` と `export function` の末尾にはセミコロンがありません。

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} *!* // 末尾に ; はありません */!*
```

````

## 宣言とは別に export する

また、別に `export` を置くこともできます。

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

通常は、次のようにインポートするものの一覧を `import {...}` に置きます。:

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

しかし、リストが長い場合、`import * as <obj>` を使用してオブジェクトとしてすべてをインポートすることができます。例:

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

一見すると、"import everything" は非常にクールに思えます。が、そもそも、なぜインポートが必要なものを明示的にリストすると必要があるのでしょう？

それにはいくつかの理由があります。

1. 現代のビルドツール ([webpack](http://webpack.github.io) など) はモジュールをまとめ、読み込みを高速化するために最適化を行ったり、未使用なものを削除します。

    我々のプロジェクトに多くの機能を持つサードパーティのライブラリ `lib.js` を追加したとしましょう。:
    ```js
    // 📁 lib.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

    いま、我々のプロジェクトで実際に必要なのはそのうちの1つだけです。
    ```js
    // 📁 main.js
    import {sayHi} from './lib.js';
    ```
    ...その後、最適化処理は自動的にそれを検知し、バンドルされているコードから他の機能を完全に除去します。したがって、ビルドは小さくなります。それは "tree-shaking" と呼ばれています。

2. 何をインポートするかを明示的にリストすることは、より短い名前を与えます: `lib.sayHi()` の代わりに `sayHi()`
3. 明示的なインポートはコード構造の見通しをよりよくします。: 何がどこで使われているか。それはコードをサポートし、リファクタリングをより簡単にします。

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

say.hi('John'); // Hello, John!
say.bye('John'); // Bye, John!
```

## export default

これまでのところ、複数のものをインポート/エクスポートする方法を見てきました(必要に応じて "as" で別名で扱います)。

実際には、モジュールは次のいずれかを含んでいます:
- ライブラリ、`lib.js` のような多く関数の集まり
- あるいは、`class User` のようなエンティティが `user.js` に記述されている場合。モジュール全体はこのクラスのみを持ちます。

ほとんどの場合、2番めのアプローチが好まれます。

当然のことながら、モジュールシステムでは、すべてが独自のモジュールになるため、多くのファイルが必要となります。が、それはまったく問題ではありません。実際には、ファイルが良く名前付けされ、フォルダに構造化されていれば、コードのナビゲーションはとても簡単になります。

合わせて、モジュールは、特別な `export default` 構文を提供し、"モジュール毎に1つのもの" のように見栄えを良くします。

これは以下の `export` と `import` 文を必要とします。:

1. モジュールの "メインのエクスポート" の前に `export default` を置きます。
2. 括弧なしで `import` を呼び出します。

例えば、`user.js` は `class User` をエクスポートします:

```js
// 📁 user.js
export *!*default*/!* class User { // "default" を追加するだけ
  constructor(name) {
    this.name = name;
  }
}
```

...そして `main.js` はそれをインポートします:

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

もちろん、1つのファイルには、1つしか "default" エクスポートはありません。

1つのモジュールの中で、デフォルトと名前付きエクスポート両方をもたせることもできますが、実際には、通常は混在させません。モジュールは名前付きエクスポート、あるいはデフォルトいずれかを持ちます。

**もう1点注意すべきことは、名前付きエクスポートは名前を持たなければならない(当然ですが)のに対し、`export default` は匿名の場合があります。**

例えば、これらはすべて有効なデフォルトエクスポートです:

```js
export default class { // クラス名なし
  constructor() { ... }
}

export default function(user) { // 関数名なし
  alert(`Hello, ${user}!`);
}

// 変数の作成なしで単一値のエクスポート
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

これは問題ありません。なぜなら `export default` はファイル毎に1つのみだけだからです。そのため、`import` は何をインポートすべきか常に知っています。
一方、名前付きエクスポートの名前を省略するとエラーになります。:

```js
export class { // Error! (非デフォルトエクスポートは名前が必要です)
  constructor() {}
}
```     

### "default" エイリアス

"default" という単語は、デフォルトエクスポートのための "エイリアス" の1つです。

例えば、すでに関数が宣言されている場合、それを `export default` する方法は次の通りです:

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

export {sayHi as default}; // 関数の前に "export default" を追加する場合と同じです
```

あるいは、モジュール `user.js` が1つのメインの "デフォルト" のものと、いくつかの名前付きのものをエクスポートする場合(めったにありませんが起こりえます)、次のようになります:

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

名前付きと一緒にデフォルトエクスポートをインポートする方法です:

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

あるいは、オブジェクトとして `*` をインポートする場合、`default` プロパティはまさにデフォルトエクスポートです:

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default;
new User('John');
```


### デフォルトエクスポートを使うべきですか？

デフォルトエクスポートを使用する際は注意が必要です。なぜなら、それらはメンテナンスがいくらか異なるためです。

名前付きエクスポートは明示的です。それらは正確にインポートするものを命名するので、そこから情報を得ることができます。これは良いことです。

また、名前付きエクスポートは、インポートするのに正確に正しい名前を使うことを強制します。

```js
import {User} from './user.js';
```

デフォルトエクスポートの場合、独自の名前を作成する必要があります。:

```js
import MyUser from './user.js'; // なにかをインポートします
```

したがって、チームメンバは同じものに異なる名前を使用することができてしまうため、そこには誤用される余地があります。

通常、それを避け、コードの一貫性を保つため、インポートされた変数はファイル名に対応するべきであるという規則があります。例えば:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

別の解決策は、どこでも名前付きエクスポートを使用することです。たとえ単一のものだけがエクスポートされるとしても、`default` なしで名前付きでエクスポートします。

これは、再エクスポート(後述)を少しだけ簡単にもします。

## 再エクスポート

"再エクスポート" 構文 `export ... from ...` を使うと、インポートをした直後にそれらを(場合により別の名前で)エクスポートすることができます。

```js
export {sayHi} from './say.js';
export {default as User} from './user.js';
```

要点は何で、なぜこれが必要なのでしょう？実用的なユースケースを見てみましょう。

"パッケージ" を書いていると想像してください。: 多くのモジュールを持ち、主に内部で必要とされ、いくつかの機能を外部にエクスポートされたフォルダ(NPMのようなツールはパッケージの公開と配布を可能にしますが、ここではそれは関係ありません。)

ディレクトリ構造は次のようになります:
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

単一のエントリポイントである "メインファイル" の `auth/index.js` を通してパッケージの機能を公開したいです。次にように:

```js
import {login, logout} from 'auth/index.js'
```

この考えは、部外者(我々のパッケージを使う開発者)は、その内部構造に干渉する必要はないということです。彼らは我々のパッケージフォルダの中のファイルを検索するべきではありません。我々は `auth/index.js` に必要なものだけをエクスポートし、残りの部分は詮索好きな目から隠れたままにします。

いま、実際にエクスポートされた機能はパッケージ内に散らかっているので、それらを集めて `auth/index.js` で "再エクスポート" します。:

```js
// 📁 auth/index.js
import {login, logout} from './helpers.js';
export {login, logout};

import User from './user.js';
export {User};

import Githib from './providers/github.js';
export {Github};
...
```

"再エクスポート" はそれの短縮記法です:

```js
// 📁 auth/index.js
export {login, logout} from './helpers.js';
// あるいは、すべてのヘルパーを再エクスポートするには、次のようにします:
// export * from './helpers.js';

export {default as User} from './user.js';

export {default as Githib} from './providers/github.js';
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
