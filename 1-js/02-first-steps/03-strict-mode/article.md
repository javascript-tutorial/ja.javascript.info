# モダンなモード, "use strict"

<<<<<<< HEAD
長い間、JavaScriptは互換性の問題なしに進化していました。新しい機能は言語に追加されましたが、古い機能は変更されませんでした。

それは既存のコードが決して壊れないというメリットがありました。しかし、欠点はJavaScript作成者による間違いや不十分な決定がこの言語から抜け出せなくなったことです。

ECMAScript 5(ES5) が登場したときは2009年でした。新しい機能が言語に追加され、既存の機能のいくつかが修正されました。古いコードが動作するのを保つために、ほとんどの修正はデフォルトではOFFです。特別なディレクティブ `"use strict"` を明示的に有効にする必要があります。

[cut]
=======
For a long time, JavaScript evolved without compatibility issues. New features were added to the language while old functionality didn't change.

That had the benefit of never breaking existing code. But the downside was that any mistake or an imperfect decision made by JavaScript's creators got stuck in the language forever.

This was the case until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most such modifications are off by default. You need to explicitly enable them with a special directive: `"use strict"`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## "use strict" 

<<<<<<< HEAD
そのディレクティブは文字列のように見えます: `"use strict"` もしくは `'use strict'`。 これがスクリプトの先頭に位置する場合、すべてのスクリプトは "最新の" 方法で動作します。

例えば
=======
The directive looks like a string: `"use strict"` or `'use strict'`. When it is located at the top of a script, the whole script works the "modern" way.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
"use strict";

// このコードはモダンな方法で動作します。
...
```

<<<<<<< HEAD
私たちはこの後まもなく関数(コマンドをグループ化する方法)を学ぶのでここで言及しますが、`"use strict"` は関数の頭に置くことができることに留意してください。
この場合はその関数内でのみStrictモードが有効になります。しかし通常はスクリプト全体に対して使います。

````warn header="\"use strict\" が先頭にあることを保証してください"
`"use strict"` がスクリプトの先頭にあるようにしてください。そうでない場合 strict mode が有効でないかもしれません。

これは strict mode ではありません:

```js no-strict
alert("some code");
// 下の "use strict" は無視されます, 先頭にある必要があります
=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.

````warn header="Ensure that \"use strict\" is at the top"
Please make sure that `"use strict"` is at the top of your scripts, otherwise strict mode may not be enabled.

Strict mode isn't enabled here:

```js no-strict
alert("some code");
// "use strict" below is ignored--it must be at the top
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

"use strict";

// strict mode はアクティブになりません
```

コメントだけは `"use strict"` の上に置けます。
````

<<<<<<< HEAD
```warn header="`use strict` をキャンセルする方法はありません"
`"no use strict"` または同系の古い振る舞いを返すようなディレクティブはありません。

一度 strict mode に入ったら戻ることはありません。
```

## ブラウザコンソール

実行コードに対して[開発者コンソール](info:devtools)を使用する場合、デフォルトでは `use strict` ではないことに留意してください。

`use strict` が差異を生むと、正しくない結果が得られる可能性があります。

ではどうやってコンソールで `use strict` を使うのでしょうか。

最初に、複数行入力するために `key:Shift+Enter` を押して、次のように `use strict` を置きます。

```js
'use strict'; <Shift+Enter で改行>
//  ...コードを書く
<Enter で実行>
```

多くのブラウザ、すなわち Firefox や Chrome では動作します。


もし古いブラウザなどでそれができない場合、いまいちではありますが `use strict` を確実にするための信頼できる方法があります。ラッパーの中に置きます:

```js
=======
```warn header="There's no way to cancel `use strict`"
There is no directive like `"no use strict"` that reverts the engine to old behavior.

Once we enter strict mode, there's no going back.
```

## Browser console

When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.

Sometimes, when `use strict` makes a difference, you'll get incorrect results.

So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:

```js
'use strict'; <Shift+Enter for a newline>
//  ...your code
<Enter to run>
```

It works in most browsers, namely Firefox and Chrome.

If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:

```js
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
(function() {
  'use strict';

  // ...your code here...
})()
```

<<<<<<< HEAD
## "use strict" は必要？

この質問は明白かもしれませんが、そうではありません。

`"use strict"` でスクリプトを開始することをオススメします...が何がよいか知っているでしょうか?

モダンな JavaScript は "クラス" や "モジュール" --- 高度な言語構造をサポートしており、これらは `use strict` は自動的に有効にします。したがって、それらを利用する場合、`"use strict"` を追加する必要はありません。

**なので、今のところ `"use strict";` はスクリプトの先頭に書くことを推奨します。後でコードがすべてクラスとモジュールに含まれている場合は省略できます。**

現段階では、`use strict` について一般的なことを知っていれば十分です

次のチャプターでは、言語の機能を学びながら strict モードと 古いモードの違いについて説明します。幸い、それほど多くありません。そしてそれらは実際に我々の開発をより良くします。

常に `"use strict"` で始まるスクリプトは推奨されます。このチュートリアルのすべての例は、そうでないと明示されていない限り(ほとんどないですが)それを想定しています。
=======
## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
