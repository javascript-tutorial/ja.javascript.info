# モダンなモード, "use strict"

<<<<<<< HEAD
長い間、JavaScriptは互換性の問題なしに進化していました。新しい機能は言語に追加されましたが、古い機能は変更されませんでした。

それは既存のコードが決して壊れないというメリットがありました。しかし、欠点はJavaScript作成者による間違いや不十分な決定がこの言語から抜け出せなくなったことです。

ECMAScript 5(ES5) が登場したときは2009年でした。新しい機能が言語に追加され、既存の機能のいくつかが修正されました。古いコードが動作するのを保つために、ほとんどの修正はデフォルトではOFFです。特別なディレクティブ `"use strict"` を明示的に有効にする必要があります。

[cut]
=======
For a long time, JavaScript evolved without compatibility issues. New features were added to the language while old functionality didn't change.

That had the benefit of never breaking existing code. But the downside was that any mistake or an imperfect decision made by JavaScript's creators got stuck in the language forever.

This was the case until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most modifications are off by default. You need to explicitly enable them with a special directive: `"use strict"`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

## "use strict" 

<<<<<<< HEAD
そのディレクティブは文字列のように見えます: `"use strict"` もしくは `'use strict'`。 これがスクリプトの先頭に位置する場合、すべてのスクリプトは "最新の" 方法で動作します。

例えば
=======
The directive looks like a string: `"use strict"` or `'use strict'`. When it is located at the top of a script, the whole script works the "modern" way.

For example:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js
"use strict";

// このコードはモダンな方法で動作します。
...
```

私たちはこの後 関数(コマンドをグループ化する方法) をすぐに学ぶでしょう。

<<<<<<< HEAD
先読みの備考として、`"use strict"` はスクリプト全体の代わりに関数(ほとんどの種類の関数) の頭に置くことができます。
その場合はその関数内でのみStrictモードが有効になります。しかし通常はスクリプト全体に対して使います。


````warn header="\"use strict\" が先頭にあることを保証してください"
`"use strict"` がスクリプトの先頭かを確認してください、そうでない場合 strict mode は有効でないかもしれません。

これは strict mode ではありません:

```js no-strict
alert("some code");
// 下の "use strict" は無視されます, 先頭にある必要があります
=======
Looking ahead, let's just note that `"use strict"` can be put at the start of most kinds of functions instead of the whole script. Doing that enables strict mode in that function only. But usually, people use it for the whole script.


````warn header="Ensure that \"use strict\" is at the top"
Please make sure that `"use strict"` is at the top of your scripts, otherwise strict mode may not be enabled.

Strict mode isn't enabled here:

```js no-strict
alert("some code");
// "use strict" below is ignored--it must be at the top
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

"use strict";

// strict mode はアクティブになりません
```

コメントだけは `"use strict"` の上に置けます。
````

<<<<<<< HEAD
```warn header="`use strict` をキャンセルする方法はありません"
`"no use strict"` または同系の古い振る舞いを返すようなディレクティブはありません。

一度 strict mode に入ったら戻ることはありません。
=======
```warn header="There's no way to cancel `use strict`"
There is no directive like `"no use strict"` that reverts the engine to old behavior.

Once we enter strict mode, there's no return.
```

## Browser console

For the future, when you use a browser console to test features, please note that it doesn't `use strict` by default.

Sometimes, when `use strict` makes a difference, you'll get incorrect results.

Even if we press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, it doesn't work. That's because of how the console executes the code internally.

The reliable way to ensure `use strict` would be to input the code into console like this:

```js
(function() {
  'use strict';

  // ...your code...
})()
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
```

## 常に "use strict" 

<<<<<<< HEAD
`"use strict"` と "default" モードの違いはこの後にも説明があります。

次のチャプターでは、言語の機能を学びながら strict mode と default mode の違いについて説明します。幸い、それほど多くありません。そしてそれらは実際に我々の開発をより良くします。

現段階では、それについて一般的なことを知っていれば十分です:

1. `"use strict"` ディレクティブは "最新" モードにエンジンを切り替え、いくつかの組み込みの機能の振る舞いを変更します。勉強しながらその詳細を見ていきましょう。
2. strict mode は先頭の `"use strict"` で有効になります。また、自動的に strict mode を有効にする "classes" や "modules" のようないくつかの機能もあります。
3. strict mode はすべてのモダンブラウザによってサポートされています。
4. 常に `"use strict"` で始まるスクリプトは推奨されます。このチュートリアルのすべての例は、そうでないと明示されていない限り(ほとんどないですが)それを想定しています。
=======
We have yet to cover the differences between strict mode and the "default" mode.

In the next chapters, as we learn language features, we'll note the differences between the strict and default modes. Luckily, there aren't many and they actually make our lives better.

For now, it's enough to know about it in general:

1. The `"use strict"` directive switches the engine to the "modern" mode, changing the behavior of some built-in features. We'll see the details later in the tutorial.
2. Strict mode is enabled by placing `"use strict"` at the top of a script or function. Several language features, like "classes" and "modules", enable strict mode automatically.
3. Strict mode is supported by all modern browsers.
4. We recommended always starting scripts with `"use strict"`. All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
