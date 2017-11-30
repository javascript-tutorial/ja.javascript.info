# モダンなモード, "use strict"

長い間、JavaScriptは互換性の問題なしに進化していました。新らしい機能が言語に追加されましたが、古い機能は変更されませんでした。

それは既存のコードが決して壊れないというメリットがありました。しかし、欠点は、JavaScript作成者による間違いや不十分な決定は、永遠にこの言語から抜け出せなくなったことです。

ECMAScript 5(ES5) が登場したときは2009年でした。新しい機能が言語に追加され、既存の機能のいくつかが修正されました。古いコードが動作するのを保つために、ほとんどの修正はデフォルトではOFFです。特別なディレクティブ `"use strict"` を明示的に有効にする必要があります。

[cut]

## "use strict"

そのディレクティブは文字列のように見えます: `"use strict"` もしくは `'use strict'`. スクリプトの戦闘に位置する場合、すべてのスクリプトは "最新の" 方法で動作します。

たとえば

```js
"use strict";

// this code works the modern way
...
```

私たちは 関数(コマンドをグループ化する方法) をすぐに学ぶでしょうか。

先読みの備考として、`"use strict"` は全体のスクリプトの代わりに関数(ほとんどの種類の関数) の最初に置くことができます。
そのとき、その関数内でのみStrictモードが有効になります。しかし通常一美度はそれをスクリプト全体に対して使います。


````warn header="Ensure that \"use strict\" is at the top"
`"use strict"` がスクリプトの先頭香確認してください、そうでなければ strict mode は有効でないかもしれません。

これは strict mode ではありません:

```js no-strict
alert("some code");
// "use strict" below is ignored, must be on the top

"use strict";

// strict mode is not activated
```

コメントは `"use strict"` の上に現れることがあります。
````

```warn header="There's no way to cancel `use strict`"
`"no use strict"` または同系の古い振る舞いを返すようなディレクティブはありません。

一度 strict mode に入ったら、返ってきません。
```

## いつも "use strict"

`"use strict"` と "default" モードの違いはまだカバーされています。

次のチャプターでは、私たちが言語の機能を学ぶときに、strict mode の違いについて書き留めます。幸運にも、それは多くはありません。そしてそれらは実際に私達の人生をより良くします。

現段階では、一般的にそれについて知るだけで十分です:

1. `"use strict"` ディレクティブは "最新" モードにエンジンを切り替え、いくつかの built-in の機能の振る舞いを変更します。私たちは勉強しながらその詳細を見ていきましょう。
2. strict mode は先頭の `"use strict"` で有効になります。また、自動的に strict mode を有効にする "classes" や "modules" のようないくつかの機能もあります。
3. strict mode はすべてのモダンブラウザによってサポートされています。
4. `"use strict"` で始まるスクリプトはいつでも推奨されます。このチュートリアルのすべての例は、そうでないと明示されていない限り(ほとんどないですが)それを想定しています。
