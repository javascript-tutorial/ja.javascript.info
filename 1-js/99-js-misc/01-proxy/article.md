# Proxy と Reflect

`Proxy` オブジェクトは別のオブジェクトをラップし、プロパティやその他の読み取り/書き込みなどの操作をインターセプトします。必要に応じてそれらを独自に処理したり、オブジェクトが透過的にそれらを処理できるようにします。

Proxy は多くのライブラリや一部のブラウザフレームワークで使われています。このチャプターでは、多くの実践的なアプリケーションを紹介します。

構文:

```js
let proxy = new Proxy(target, handler)
```

- `target` -- ラップするオブジェクトです。関数を含め何でもOKです。
- `handler` -- プロキシ設定: 操作をインターセプトするメソッド "traps" をもつオブジェクトです。例: `get` トラップは `target` のプロパティの読み取り用、`set` トラップは、`target` へのプロパティ書き込み用、など。

`proxy` の操作では、`handler` に対応するトラップがある場合はそれが実行されます。それ以外の場合は、操作は `target` で実行されます。

最初の例として、トラップなしでプロキシを作ってみましょう。:

```js run
let target = {};
let proxy = new Proxy(target, {}); // 空のハンドラ

proxy.test = 5; // プロキシへの書き込み (1)
alert(target.test); // 5, プロパティが target で現れました!

alert(proxy.test); // 5, proxy からの読み取ることができます (2)

for(let key in proxy) alert(key); // test, イテレーションも機能します (3)
```

traps がないので、`proxy` 上のすべての操作は `target` に転送されます。

1. 書き込み操作 `proxy.test=` は `target` に値を設定します。
2. 読み込み操作 `proxy.test` は `target` からの値を返します。
3. `proxy` のイテレートは、`target` からの値を返します。

ご覧の通り、traps がない場合は `proxy` は `target` に対する透過的なラッパーです。

![](proxy.svg)  

`Proxy` は特別な "エキゾチックオブジェクト(exotic object)" です。`Proxy` は独自のプロパティは持っていません。空の `handler` の場合は、透過的に `target` へ操作を転送します。

さらに機能を有効にするために、traps を追加しましょう。

これによって、何がインターセプトできるでしょう？

オブジェクトに対するほとんどの操作に対しては、JavaScript の仕様で いわゆる "内部メソッド" と呼ばれるものがあり、仕様ではそれらがどのように動作するかを最も低レベルで説明しています。例えば、 `[[Get]]` は、プロパティを読み取るための内部メソッドで、`[[Set]]` はプロパティを書き込むための内部メソッド、などです。これらのメソッドは仕様でのみ使用されており、名前を使ってそれらを直接使用することはできません。

プロキシのトラップはこれらのメソッドの呼び出しをインターセプトします。これらのメソッドは[Proxy specification](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots) 及び以下の表にリストされています。

内部メソッドと trap(操作をインターセプトするために `new Proxy` の `handler` パラメータに追加するメソッド名)の対応表です。

| 内部メソッド | ハンドラメソッド | いつ発生するか |
|-----------------|----------------|-------------|
| `[[Get]]` | `get` | プロパティ読み取り時 |
| `[[Set]]` | `set` | プロパティ書き込み時 |
| `[[HasProperty]]` | `has` | `in` 演算子 |
| `[[Delete]]` | `deleteProperty` | `delete` 演算子 |
| `[[Call]]` | `apply` | 関数呼び出し |
| `[[Construct]]` | `construct` | `new` 演算子 |
| `[[GetPrototypeOf]]` | `getPrototypeOf` | [Object.getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) |
| `[[SetPrototypeOf]]` | `setPrototypeOf` | [Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) |
| `[[IsExtensible]]` | `isExtensible` | [Object.isExtensible](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) |
| `[[PreventExtensions]]` | `preventExtensions` | [Object.preventExtensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) |
| `[[DefineOwnProperty]]` | `defineProperty` | [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) |
| `[[GetOwnProperty]]` | `getOwnPropertyDescriptor` | [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor), `for..in`, `Object.keys/values/entries` |
| `[[OwnPropertyKeys]]` | `ownKeys` | [Object.getOwnPropertyNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames), [Object.getOwnPropertySymbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols), `for..in`, `Object/keys/values/entries` |

```warn header="Invariants"
JavaScript にはいくつかの不変条件(内部メソッドと traps によって満たされるべき条件)があります。

そのほとんどは戻り値に関してです:
- `[[Set]]` は値が正常に書き込まれた場合には `true` を、そうでなければ `false` を返す必要があります。
- `[[Delete]]` は値が正常に削除された場合には `true` を、そうでなければ `false` を返す必要があります。
- ...などです。以下の例で詳しく見ていきます。

他にも以下のようないくつかの不変条件があります:
- proxy オブジェクトに適用される `[[GetPrototypeOf]]` は proxy オブジェクトのターゲットオブジェクトに適用される `[[GetPrototypeOf]]` と同じ値を返さなければなりません。つまり、proxy のプロトタイプを参照すると、常にターゲットオブジェクトのプロトタイプが返却される必要があります。

traps はこれらの操作をインターセプトできますが、これらのルールには従う必要があります。

不変条件は、言語機能の正しさと一貫した動作を保証するものです。完全な不変条件のリストは [仕様]
(https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots)にありますが、変なことをしない限りは違反することはないでしょう。
```

実際の例でそれがどのように動作するのかを見てみましょう。

## "get" トラップでのデフォルト値

最も一般的なトラップ(traps)はプロパティの読み書きです。

読み取りをインターセプトするには、`handler` に `get(target, property, receiver)` が必要です。

これはプロパティが読み取られたとき、以下の引数で実行されます。:

- `target`: `new Proxy` の最初の引数として渡されるターゲットオブジェクトです。
- `property` -- プロパティ名,
- `receiver` --ターゲットプロパティが getter の場合、`receiver` はその呼び出しの中で `this` として使われるオブジェクトです。通常、これは `proxy` オブジェクト自身(あるいは、proxy から継承している場合は、継承したオブジェクト)です。現時点ではこの引数は不要です。詳細については後ほど説明します。

オブジェクトのデフォルト値を実装するのに `get` を使ってみましょう。

存在しない値の場合 `0` を返す数値配列を作ります。

通常、存在しない値を取得しようとすると `undefined` になりますが、ここでは通常の配列に対して、プロパティが存在しない場合に `0` を返すプロキシでラップします。:

```js run
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // デフォルト値
    }
  }
});

*!*
alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (このような項目はなし)
*/!*
```

ご覧の通り、`get` トラップを使用するのは非常に簡単です。

`Proxy` を利用すると、任意の "デフォルト値" 用のロジックを組むことができます。

想像してください、フレーズと一緒に翻訳を持つ辞書があるとします:

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

alert( dictionary['Hello'] ); // Hola
alert( dictionary['Welcome'] ); // undefined
```

現在、フレーズがない場合、`dictionary` の読み取りは `undefined` を返します。しかし、実際には `undefined` よりも未翻訳のままのフレーズを残すほうがよいです。なので、このような場合に `undefined` ではなく、未翻訳のフレーズを返すようにしましょう。

そのためには、`directory` を読み取り操作をインターセプトするプロキシでラップします。:

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary = new Proxy(dictionary, {
*!*
  get(target, phrase) { // 辞書(dictionary)からのプロパティ読み取りをインターセプト
*/!*
    if (phrase in target) { // 辞書の中にある場合
      return target[phrase]; // 翻訳を返します
    } else {
      // そうでなければフレーズをそのまま返します
      return phrase;
    }
  }
});

// 辞書で任意のフレーズを検索します
// 辞書にない場合は翻訳されません
alert( dictionary['Hello'] ); // Hola
*!*
alert( dictionary['Welcome to Proxy']); // Welcome to Proxy
*/!*
```

````smart
プロキシがどのように変数を上書きするかに注意してください。:

```js
dictionary = new Proxy(dictionary, ...);
```

プロキシはどこでもターゲットオブジェクトを完全に置き換える必要があります。プロキシされた後はターゲットオブジェクトを参照しないでください。参照すると、簡単に台無しになります。
````

## "set" トラップでのバリデーション

数値専用の配列がほしいとしましょう。別の型の値が追加された場合、エラーにする必要があります。

`set` トラップはプロパティが書き込まれたときに発生します。

`set(target, property, value, receiver)`:

- `target`: `new Proxy` の最初の引数として渡されるターゲットオブジェクトです。
- `property`: プロパティ名
- `value`: プロパティ値,
- `receiver`: `get` と同様で、setter プロパティに関係します。

`set` トラップは設定が成功すると `true` を、それ以外の場合は `false` (`TypeError` が発生)を返す必要があります。

新しい値を検証するのに使って見ましょう:

```js run
let numbers = [];

numbers = new Proxy(numbers, { // (*)
*!*
  set(target, prop, val) { // プロパティの書き込みをインターセプト
*/!*
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // 追加成功
numbers.push(2); // 追加成功
alert("Length is: " + numbers.length); // 2

*!*
numbers.push("test"); // TypeError (プロキシの 'set' が false を返却)
*/!*

alert("This line is never reached (error in the line above)");
```

注目してください: 配列の組み込みの機能は依然として動作します! 値は `push` により追加されました。`length` プロパティは値が追加されたときにオートインクリメントされます。プロキシは何も破壊していません。

我々はチェック処理を追加するのに `push` や `unshift` のような、値を追加する配列メソッドを上書きする必要はありません。なぜなら、それらは内部的には `[[Set]]` 操作を使用しており、プロキシによりインターセプトされるからです。

したがって、コードはクリーンであり簡潔です。

```warn header="`true` を返すのを忘れないでください"
上記のように、維持すべき条件があります。

`set` の場合、書き込みの成功に対しては `true` を返さなければなりません。

それを忘れたり false を返すと、操作は `TypeError` をトリガーします。
```

## "ownKeys" と "getOwnPropertyDescriptor" によるイテレーション

`Object.keys`, `for..in` ループ及びオブジェクトプロパティをイテレートする他のほとんどのメソッドは `[[OwnPropertyKeys]]` 内部メソッド(`ownKeys` トラップによりインターセプトされる)を使用してプロパティのリストを取得しています。

このようなメソッドの詳細は異なります:
- `Object.getOwnPropertyNames(obj)` は "非" シンボルキーを返します。
- `Object.getOwnPropertySymbols(obj)` はシンボルキーを返します。
- `Object.keys/values()` は `enumerable` フラグ(プロパティフラグについては、チャプター <info:property-descriptors> に説明があります)を持つ非シンボルのキー/バリュー値を返します。
- `for..in` は `enumerable` フラグを持つ非シンボルキーとプロトタイプキーをループします。

...しかし、これらはすべてその内部メソッドで得られたリストから始まります。

以下の例では、`ownKeys` トラップを使用して `user` に対する `for..in` ループを行い、また `Object.keys` や `Object.values` を行っています。これらはアンダースコア `_` で始まるプロパティをスキップします。:

```js run
let user = {
  name: "John",
  age: 30,
  _password: "***"
};

user = new Proxy(user, {
*!*
  ownKeys(target) {
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "ownKeys" は _password を除外します
for(let key in user) alert(key); // name, then: age

// これらのメソッドへも同じ影響があります:
alert( Object.keys(user) ); // name,age
alert( Object.values(user) ); // John,30
```

これまでのところ、期待通り動作しています。

ですが、もしオブジェクトに存在しないキーを返した場合、`Object.keys` はそれをリストしません:

```js run
let user = { };

user = new Proxy(user, {
*!*
  ownKeys(target) {
*/!*
    return ['a', 'b', 'c'];
  }
});

alert( Object.keys(user) ); // <empty>
```

なぜでしょう？理由は簡単です。: `Object.keys` は `enumerable` フラグを持つプロパティだけを返すからです。それを確かめるため、すべてのメソッドに対し内部メソッド `[[GetOwnProperty]]` を呼び出し,
[ディスクリプタ](info:property-descriptors) を取得します。すると、ここではプロパティがないので、そのディスクリプタは空であり、`enumerable` フラグがありません。そのため、スキップされます。

`Object.keys` がプロパティを返すには、`enumerable` 付きでオブジェクトに存在するか、`[[GetOwnProperty]]`(トラップは `getOwnPropertyDescriptor`)の呼び出しをインターセプトし、`enumerable: true` を持つディスクリプタを返します。

これはそのコードです:

```js run
let user = { };

user = new Proxy(user, {
  ownKeys(target) { // プロパティのリストを取得するために一度だけ呼ばれます
    return ['a', 'b', 'c'];
  },

  getOwnPropertyDescriptor(target, prop) { // プロパティ毎に呼ばれます
    return {
      enumerable: true,
      configurable: true
      /* ...other flags, probable "value:..."" */
    };
  }

});

alert( Object.keys(user) ); // a, b, c
```

改めて留意してください: `[[GetOwnProperty]]` をインターセプトする必要があるのは、プロパティがオブジェクトにない場合のみです。

## "deleteProperty" 及び他のトラップで保護されたプロパティ

アンダースコア `_` で始まるプロパティやメソッドは内部的なものであるということは、広く知られた慣習です。それらはオブジェクトの外からアクセスされるべきではありません。

ですが、技術的には可能です:

```js run
let user = {
  name: "John",
  _password: "secret"
};

alert(user._password); // secret
```

プロキシを使用して、`_` で始まるプロパティへのアクセスを防ぎましょう。

次のトラップが必要です:
- `get`: そのようなプロパティの読み込み時にエラーをスロー,
- `set`: 書き込み時にエラーをスロー,
- `deleteProperty`: 削除時にエラーをスロー,
- `ownKeys`: `for..in` や `Object.keys` のようなメソッドから `_` で始まるプロパティを除外

これがそのコードです:

```js run
let user = {
  name: "John",
  _password: "***"
};

user = new Proxy(user, {
*!*
  get(target, prop) {
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    }
    let value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value; // (*)
  },
*!*
  set(target, prop, val) { // プロパティの書き込みをインターセプト
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
      return true;
    }
  },
*!*
  deleteProperty(target, prop) { // プロパティの削除をインターセプト
*/!*  
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },
*!*
  ownKeys(target) { // プロパティのリストをインターセプト
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "get" は _password の読み込みを許可しません
try {
  alert(user._password); // Error: Access denied
} catch(e) { alert(e.message); }

// "set" は _password の書き込みを許可しません
try {
  user._password = "test"; // Error: Access denied
} catch(e) { alert(e.message); }

// "deleteProperty" は _password の削除を許可しません
try {
  delete user._password; // Error: Access denied
} catch(e) { alert(e.message); }

// "ownKeys" は _password を除外します
for(let key in user) alert(key); // name
```

`(*)` 行の `get` トラップの重要な点に注意してください:

```js
get(target, prop) {
  // ...
  let value = target[prop];
*!*
  return (typeof value === 'function') ? value.bind(target) : value; // (*)
*/!*
}
```

なぜ関数の場合に `value.bind(target)` を呼び出す必要があるのでしょうか？

理由は `user.checkPassword()` のようなオブジェクトメソッドは `_password` へアクセスできる必要があるからです。:

```js
user = {
  // ...
  checkPassword(value) {
    // オブジェクトメソッドは _password へアクセスできなければいけません
    return value === this._password;
  }
}
```

`user.checkPassword()` の呼び出しはプロキシされた `user` を `this` (ドットの前のオブジェクトが `this` になります)として取得するため、`this._password` へのアクセスを試みると `get` トラップが機能(これはあらゆるプロパティ読み取りでトリガーされます)し、エラーをスローします。

そのため、`(*)` の通りオブジェクトメソッドのコンテキストを元のオブジェクトである `target` でバインドします。以降、その呼び出しでは `this` としてトラップのない `target` を使用します。

この解決策はたいてい動作しますが、メソッドがプロキシされていないオブジェクトを別の場所に渡す可能性があるため理想的ではありません。これは混乱のもとになります: どこにオリジナルのオブジェクトがあり、どれがプロキシされたものなのか。

さらに、オブジェクトが何度もプロキシされる可能性もあります(複数のプロキシがそれぞれ異なる "微調整" をオブジェクトにする場合があります)。また、メソッドにラップされていないオブジェクトを渡した場合、予期しない結果になる可能性もあります。

したがって、このようなプロキシは使用しないことを推奨します。

```smart header="クラスの private プロパティ"
モダンな JavaScript エンジンはクラスの private プロパティをネイティブにサポートします(`#` から始まります)。これについてはチャプター <info:private-protected-properties-methods> で記載しています。プロキシは必要ありません。

ただし、このようなプロパティにも問題はあります。特にこれらは継承されません。
```

## "has" トラップを使用した "範囲内"

他の例を見てみましょう。

範囲を持つオブジェクトがあります:

```js
let range = {
  start: 1,
  end: 10
};
```

`in` 演算子を使って、 数値が `range` の範囲内にあるかを確認します。

`has` トラップは `in` 呼び出しをインターセプトします。

`has(target, property)`

- `target` -- `new Proxy` への最初の引数として渡されるターゲットオブジェクト
- `property` -- プロパティ名

デモです:

```js run
let range = {
  start: 1,
  end: 10
};

range = new Proxy(range, {
*!*
  has(target, prop) {
*/!*
    return prop >= target.start && prop <= target.end
  }
});

*!*
alert(5 in range); // true
alert(50 in range); // false
*/!*
```

良い糖衣構文ですね。それに実装もとても簡単です。

## Wrapping functions: "apply"

関数の周りに対しても同様に proxy をラップすることができます。

`apply(target, thisArg, args)` トラップはプロキシを関数として呼び出すよう処理をします:

- `target` はターゲットオブジェクトです(JavaScript では関数はオブジェクトです),
- `thisArg` は `this` の値です
- `args` は引数のリストです

例えば、チャプター <info:call-apply-decorators> で行った `delay(f, ms)` デコレータを思い出してください。

そのチャプターでは、proxy を使わずに実現しました。`delay(f, ms)` の呼び出しは、`ms` ミリ秒後に `f` の呼び出しを行う関数を返しました。

これは以前の関数ベースの実装です:

```js run
function delay(f, ms) {
  // タイムアウト後に f への呼び出しを渡すラッパー関数を返します
  return function() { // (*)
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// このラップをすると、sahHi 呼び出しは 3秒間遅延します
sayHi = delay(sayHi, 3000);

sayHi("John"); // Hello, John! (3秒後)
```

すでにご覧になったように、これはほぼほぼ機能します。ラッパー関数 `(*)` はタイムアウト後に呼び出しを実行します。

しかし、ラッパー関数はプロパティの読み書き操作などは転送しません。ラップした後、`name` や `length` などの元の関数のプロパティへのアクセスは失われます。:

```js run
function delay(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

*!*
alert(sayHi.length); // 1 (function.length は宣言された関数の引数の数を返します)
*/!*

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 0 (ラッパー後は引数は 0 です)
*/!*
```

`Proxy` はすべてをターゲットオブジェクトに転送するので、はるかに強力です。

関数ラッピングの代わりに `Proxy` を使って見ましょう:

```js run
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 1 (*) プロキシは length 操作をターゲットに転送します
*/!*

sayHi("John"); // Hello, John! (3秒後)
```

結果は同じですが、呼び出しだけでなく、プロキシ上のすべての操作は元の関数に転送されます。そのため、行 `(*)` で `sayHi.length` はラッピング後も正しい値を返します。

これで "よりリッチな" ラッパーを手に入れました。

他にもトラップはあります: 完全なリストはこのチャプターの最初にのせています。それらの使用パターンは上記と同じです。

## Reflect

`Reflect` は `Proxy` の作成を簡単にする組み込みのオブジェクトです。

以前説明したとおり、`[[Get]]`, `[[Set]]` やその他の内部メソッドは仕様上のものであり、直接呼び出すことはできません。

`Reflect` オブジェクトはそれをいくらか可能にします。それのもつメソッドは内部メソッドの最小限のラッパーです。

ここでは、操作と、それと同じことをする `Reflect` 呼び出しの例を示します:

| 操作 |  `Reflect` 呼び出し | 内部メソッド |
|-----------------|----------------|-------------|
| `obj[prop]` | `Reflect.get(obj, prop)` | `[[Get]]` |
| `obj[prop] = value` | `Reflect.set(obj, prop, value)` | `[[Set]]` |
| `delete obj[prop]` | `Reflect.deleteProperty(obj, prop)` | `[[HasProperty]]` |
| `new F(value)` | `Reflect.construct(F, value)` | `[[Construct]]` |
| ... | ... | ... |

例:

```js run
let user = {};

Reflect.set(user, 'name', 'John');

alert(user.name); // John
```

特に、`Reflect` では演算子 (`new`, `delete`...) を関数(`Reflect.construct`, `Reflect.deleteProperty`, ...)として呼び出すことができます。これは興味深い機能ですが、ここでは別に重要な部分があります。

**`Proxy` でトラップ可能なすべての内部メソッドに対し、`Reflect` には `Proxy` トラップと同じ名前、引数を持つ対応するメソッドがあります。**

したがって、`Reflect` を使って操作を元のオブジェクトに転送することができます。

この例では、`get` と `set` の両方のトラップが、読み書き操作をオブジェクトへ透過的(存在しないかのように)に転送し、メッセージを表示します。:

```js run
let user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
*!*
    return Reflect.get(target, prop, receiver); // (1)
*/!*
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
*!*
    return Reflect.set(target, prop, val, receiver); // (2)
*/!*
  }
});

let name = user.name; // "GET name" を表示
user.name = "Pete"; // "SET name=Pete" を表示
```

Here:

- `Reflect.get` はオブジェクトプロパティを読み取ります。
- `Reflect.set` はオブジェクトプロパティの書き込みを行い、成功すれば `true` を返します。それ以外の場合は `false` を返します。

つまり、すべては単純です: トラップが呼び出しをオブジェクトに転送したい場合、同じ引数で `Reflect.<method>` を呼べばよいです。

ほとんどの場合で、`Reflect` を使うことなく同じことができます。例えば、プロパティの読み取り `Reflect.get(target, prop, receiver)` は `target[prop]` に置き換えることができます。ですが、重要な意味合いがあります。

### ゲッター(getter)のプロキシ

なぜ `Reflect.get` が優れている理由を示すデモを見てみましょう。合わせて、なぜ `get/set` が４番目の引数 `receiver` を持っているのか(これは以前は使用していませんでした)も見ていきましょう。

`_name` プロパティをもつ `user` オブジェクトがあり、そのゲッターをします:

これはそのプロキシです:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

*!*
let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop];
  }
});
*/!*

alert(userProxy.name); // Guest
```

ここでは、`get` トラップは明白です。元のプロパティを返し、他には何もしていません。今回の例ではこれで十分です。

今のところすべて問題ありません。では例をもう少し複雑にしてみましょう。

`user` から別のオブジェクト `admin` を継承すると、正しくない振る舞いが起きます:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});

*!*
let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

// 期待値: Admin
alert(admin.name); // 出力: Guest (?!?)
*/!*
```

`admin.name` の読み取りは `"Guest"` ではなく `"Admin"` を返すべきです!

何が起きたのでしょうか？継承になにか問題があったのでしょうか？

ですが、プロキシを削除するとすべて期待通りに動作します。

問題は行 `(*)` のプロキシの中にあります。

1. `admin.name` を読み取るとき、`admin` オブジェクトにはそのようなプロパティはないため、検索はそのプロトタイプに進みます。
2. プロトタイプは `userProxy` です。
3. プロキシから `name` プロパティを読み取ると、`get` トラップが発生し、行 `(*)` で `target[prop]` により元のオブジェクトから返却されます。

    `prop` がゲッターである場合、`target[prop]` の呼び出しはコンテキスト `this=target` でコードが実行されます。そのため、結果は元のオブジェクト `target`, つまり `user` からの `this._name` になります。

これを修正するには、`get` トラップの3番目の引数である `receiver` が必要です。これによりゲッターに正しい `this` を渡すことができます。今回のケースだと、`admin` です。

どうやってゲッターへコンテキストを渡すのでしょう？通常の関数では `call/apply` を使いますが、これはゲッターなので "呼び出される" のではなく、単なるアクセスです。

`Reflect.get` はそれをすることができます。これを使うことですべてが上手く動きます。

修正されたバリアントです:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
*!*
    return Reflect.get(target, prop, receiver); // (*)
*/!*
  }
});


let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

*!*
alert(admin.name); // Admin
*/!*
```

上のコードでは、正しい `this` (つまり `admin`) への参照を維持する `receiver` は、行 `(*)` で `Reflect.get` を使用したゲッターに渡されます。

トラップをさらに短く書くこともできます:

```js
get(target, prop, receiver) {
  return Reflect.get(*!*...arguments*/!*);
}
```

`Reflect` 呼び出しはトラップとまったく同じ名前が付けられており、同じ引数を受け付けます。特別にそのように設計されました。

したがって、`return Reflect...` は安全かつ考えるまでもない分かりやすい手段で操作を転送することができます。

## プロキシの制限

プロキシは既存のオブジェクトの動作を最も低いレベルで変更したり微調整する独自の方法を提供します。それでも完璧ではありません。いくつか制限があります。

### 組み込みオブジェクト: 内部スロット(Internal slots)

`Map`, `Set`, `Date`, `Promise` などの多くの組み込みオブジェクトは、いわゆる "内部スロット" を使用します。

それらはプロパティに似ていますが、内部で仕様専用の目的で予約されています。例えば、`Map` は内部スロット `[[MapData]]` にアイテムを保存します。組み込みのメソッドは、`[[Get]]/[[Set]]` 内部メソッド経由ではなく、直接アクセスします。そのため、`Proxy` はインターセプトすることができません。

内部の話なのに気にする必要はあるのでしょうか？

ここに問題があります。このような組み込みのオブジェクトがプロキシされると、プロキシはこれらの内部スロットを持たないため、組み込みのメソッドは失敗します。

例:

```js run
let map = new Map();

let proxy = new Proxy(map, {});

*!*
proxy.set('test', 1); // Error
*/!*
```

内部的に、`Map` はすべてのデータを `[[MapData]]` 内部スロットに保存します。プロキシはそのようなスロットはありません。[組み込みのメソッド `Map.prototype.set`](https://tc39.es/ecma262/#sec-map.prototype.set) メソッドは内部プロパティ `this.[[MapData]]` にアクセスしようとしますが、`this=proxy` なので `proxy` 内には見つけることができず失敗します。

幸いなことに、修正する方法があります:

```js run
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
*!*
    return typeof value == 'function' ? value.bind(target) : value;
*/!*
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (works!)
```

上の例では、`get` トラップは `map.set` などの関数プロパティをターゲットオブジェクト(`map`)自身にバインドするので、問題なく動作します。

これまでの例とは違い、`proxy.set(...)` 内での `this` の値は `proxy` ではなく元の  `map` になります。そのため、`set` の内部実装が `this.[[MapData]]` 内部スロットにアクセスするのは成功します。

```smart header="`Array` には内部スロットがありません"
注目すべき例外です: 組み込みの `Array` は内部スロットを使用していません。`Array` はずっと以前から存在していたこともあり、歴史的な理由によるものです。

したがって配列をプロキシする際にはこのような問題は起こりません。
```

### プライベートフィールド

似たようなことがプライベートクラスフィールドでも起こります。

例えば、`getName()` メソッドはプロキシ後にプライベート `#name` プロパティへアクセスすると壊れます。:

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {});

*!*
alert(user.getName()); // Error
*/!*
```

これは、プライベートフィールドが内部スロットを使用して実装されているからです。JavaScript はそれらにアクセスする際、`[[Get]]/[[Set]]` は使用しません。

`getName()` の呼び出しでは、`this` の値はプロキシされた `user` であり、プライベートフィールドのスロットを持っていません。

この場合も、メソッドをバインドする方法で機能させることができます:

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

alert(user.getName()); // Guest
```

ただし、この解決策にも欠点があります。以前説明したとおり、この方法は元のオブジェクトをメソッドに公開するので、メソッドの処理によってはさらにオブジェクトが渡される可能性があり、他のプロキシされた機能を破壊する可能性があります。

### Proxy != target

Proxy と元のオブジェクトは異なるオブジェクトです。これは当然ですね。

なので、元のオブジェクトをキーとして使用し、その後プロキシすると、プロキシは見つかりません。:

```js run
let allUsers = new Set();

class User {
  constructor(name) {
    this.name = name;
    allUsers.add(this);
  }
}

let user = new User("John");

alert(allUsers.has(user)); // true

user = new Proxy(user, {});

*!*
alert(allUsers.has(user)); // false
*/!*
```

ご覧の通り、プロキシ後はセット `allUsers` で `user` を見つけることができません。プロキシは異なるオブジェクトだからです。

```warn header="プロキシは厳密等価 `===` をインターセプトすることはできません"
プロキシは `new`(`construct`), `in`(`has`), `delete`(`deleteProperty`)などの多くの演算子をインターセプトすることができます。

しかし、オブジェクトへの厳密等価テストをインターセプトする方法はありません。オブジェクトは自身にのみ厳密に等しく、他の値とは等しくありません。

したがって、オブジェクトの等価を比較するすべての演算子と組み込みのクラスはオブジェクトとプロキシを区別します。ここには透過的な替わりはありません。
```

## 取り消し可能(revocable)なプロキシ

*取り消し可能(revocable)* なプロキシは、無効にすることのできるプロキシです。

リソースに対して、いつでもアクセスを閉じられるようにしたいとしましょう。

その方法としては、リソースをトラップをしない取り消し可能なプロキシでラップすることです。このようなプロキシはオブジェクトへ操作を転送しつつ、いつでもそれを無効にすることができます。

構文は次の通りです:

```js
let {proxy, revoke} = Proxy.revocable(target, handler)
```

この呼び出しは `proxy` と無効にするために `revoke` 関数を持つオブジェクトを返します。

例:

```js run
let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

// オブジェクトの代わりにプロキシをどこかに渡します
alert(proxy.data); // Valuable data

// 後で次のようにします
revoke();

// すると、プロキシは機能しなくなります(無効化されました)
alert(proxy.data); // Error
```

`revoke()` 呼び出しは、プロキシからターゲットオブジェクトへのすべての内部参照を削除します。これにより繋がりがなくなります。ターゲットオブジェクトはその後ガベージコレクトできます。

また、プロキシオブジェクトを簡単に見つけられるよう、`WeakMap` に `revoke` を保持することもできます。:

```js run
*!*
let revokes = new WeakMap();
*/!*

let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

revokes.set(proxy, revoke);

// ..later in our code..
revoke = revokes.get(proxy);
revoke();

alert(proxy.data); // Error (revoked)
```

このようなアプローチの利点は `revoke` を持って回る必要がないことです。必要なときに `proxy` を使って map から取得できます。

ここで `Map` の代わりに `WeakMap` を使用しているのは、ガベージコレクションをブロックしないようにするためです。proxy オブジェクトが "到達不可能" になった(e.g それを参照する変数がなくなった)場合、`WeakMap` を利用すると、不要になった `revoke` を一緒にメモリ上から削除することができます。

## リファレンス

- 仕様: [Proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots).
- MDN: [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

## サマリ

`Proxy` はオブジェクトのラッパーであり、操作をオブジェクトへ転送し、必要に応じてその一部をトラップします。

クラスや関数を含め、あらゆる種類のオブジェクトをラップすることができます。

構文:

```js
let proxy = new Proxy(target, {
  /* traps */
});
```

...それ以降はどこでも `target` の代わりに `proxy` を使う必要があります。プロキシは独自のプロパティやメソッドは持っていません。トラップが指定されていれば操作をトラップし、そうでなければ `target` オブジェクトに転送します。

以下をトラップすることができます:
- プロパティ(存在しないものも含む)の読み取り(`get`)、書き込み(`set`)、削除(`deleteProperty`)
- 関数呼び出し(`apply` トラップ)
- `new` 演算子(`construct` トラップ)
- その他多くのトラップ(完全なリストはこの記事の冒頭と [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)にあります。)

これにより、"仮想の" プロパティやメソッドを作成したり、デフォルト値、オブザーバブルオブジェクト、関数デコレータなど様々なものを実装することができます。

また、異なるプロキシで複数回オブジェクトをラップし、機能の様々な側面でオブジェクトデコレートすることも可能です。

[Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect) API は [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) を補完するためのものとして設計されています。すべての `Proxy` トラップに対して、同じ引数を持つ `Reflect` 呼び出しがあります。これらを使用してターゲットオブジェクトに転送する必要があります。

プロキシにはいくつか制限があります:

- 組み込みのオブジェクトには "内部スロット" があり、それらへのアクセスはプロキシすることはできません。上記の回避策を参照してください。
- プライベートクラスフィールドにも同じことが当てはまります。それらは内部的にはスロットを使用して実装されているため、プロキシされたメソッド呼び出しは、それらにアクセスするために `this` としてターゲットオブジェクトをもつ必要があります。
- オブジェクトの等価評価 `===` はインターセプトできません。
- パフォーマンス: ベンチマークはエンジンによりますが、通常、最も単純なプロキシを使用したプロパティへのアクセスするにも数倍時間がかかります。しかし実際にそれが問題になるのは一部の "ボトルネック" オブジェクトのみです。
