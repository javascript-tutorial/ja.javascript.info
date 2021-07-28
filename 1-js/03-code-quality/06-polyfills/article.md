
<<<<<<< HEAD
# Polyfill（ポリフィル）とトランパイラ
=======
# Polyfills and transpilers
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

JavaScript言語は着実に進化しています。言語への新たな提案は定期的にだされ、それらは分析され、価値があると考えられたら <https://tc39.github.io/ecma262/> の一覧に追加され、[仕様](http://www.ecma-international.org/publications/standards/Ecma-262.htm) に進みます。

JavaScriptエンジンのチームは何を最初に実装するかについて独自の考えを持っています。彼らはドラフト段階の提案を実装する一方で、既に仕様となったものの実装を「面白くない、もしくはやるのが難しい」という理由で延期するかもしれません。

従って、あるエンジンに標準仕様の一部のみしか実装されていないという状況は非常に一般的なことです。

言語機能の現在のサポート状況を見るには <https://kangax.github.io/compat-table/es6/> が良いページです(それは大きく、まだ勉強すべき多くのことがあります)。

<<<<<<< HEAD
プログラマーとして、より最新の機能(より便利なもの)を利用したいでしょう。

一方、最新の機能をまだ理解できない古いエンジンで最新のコードを動作させるにはどうすればよいでしょうか？

そのための２つのツールがあります。:

1. トランパイラ
2. Polyfill（ポリフィル）

このチャプターでの目的は、それらがどのように機能するか、そして Web 開発におけるそれらの位置づけの要点を理解することです。

## トランパイラ

[transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler)は、最新コードを解析("読み込みし、理解する")し、それを古い構文構造を使用して書き直すことのできる特別なソフトウェアです。結果はおなじになるようにします。

E.g. 2020年以前の JavaScript には "Null合体演算子" `??` がありませんでした。そのため、訪問者が古いブラウザを利用している場合、`height = height ?? 100` のようなコードを理解できない可能性があります。

トランパイラはコードを分析し、`height ?? 100` を `(height !== undefined && height !== null) ? height : 100` に書き直します。

```js
// トランパイラ実行前
height = height ?? 100;

// トランパイラ実行後
height = (height !== undefined && height !== null) ? height : 100;
```

今、書き直されたコードは古い JavaScript エンジンに適しています。

通常、開発者は自身のコンピュータ上でトランパイラを実行し、トランパイルしたコードをサーバにデプロイします。

名前について言えば、[Babel](https://babeljs.io) は世の中で最も著名なトランスパイラーの1つです。

[webpack](http://webpack.github.io/) のような最新のプロジェクトビルドシステムは、コード変更毎に自動的にトランパイラを実行する手段を提供しているので、開発プロセスと非常に簡単に統合することができます。

## Polyfills

新しい言語の機能には、構文構造や演算子だけでなく組み込みの関数も含んでいる可能性があります。

例えば、`Math.trunc(n)` は数値の小数部分を "切り取る" 関数で、例えば `Math.trunc(1.23) = 1` となります。

(非常に古い) JavaScript エンジンでは、`Math.trunc` は存在しないためこのようなコードは失敗します。

構文変更ではなく、新しい関数について話しているので、ここではトランスパイルは必要ありません。単に不足している関数を定義する必要があります。

新しい機能を更新/追加するスクリプトは "polyfill" と呼ばれます。ギャップを "埋め"、不足している実装を追加します。

この具体的なケースの場合、`Math.tranc` の polyfill はそれを実装したスクリプトです。このようになります:

```js
if (!Math.trunc) { //関数がない場合
  // 実装する
  Math.trunc = function(number) {
    // Math.ceil と Math.floor は古い JavaScript エンジンにも存在します
    // これらはチュートリアルで後ほど説明します
=======
As programmers, we'd like to use most recent features. The more good stuff - the better!

On the other hand, how to make our modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that translates source code to another source code. It can parse ("read and understand") modern code and rewrite it using older syntax constructs, so that it'll also work in outdated engines.

E.g. JavaScript before year 2020 didn't have the "nullish coalescing operator" `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

```js
// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23)` returns `1`.

In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.

As we're talking about new functions, not syntax changes, there's no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

```js
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

<<<<<<< HEAD
JavaScript は非常に動的な言語であり、スクリプトは組み込み関数を含めて、任意の関数を追加／変更できます。

2つの興味深いライブラリがあります:
- 多くをサポートする [core js](https://github.com/zloirock/core-js)は、必要な機能のみを含める事ができます。
- 機能やブラウザに応じた Polyfill を含むスクリプトを提供する [polyfill.io](http://polyfill.io) サービスです。


## サマリ

このチャプターでは、たとえ、JavaScript エンジンがまだ十分にサポートしていないとしても、最新／"最先端" の言語機能を学習することを動機づけたいです。

ただトランスパイラ（最新の構文や演算子を使用する場合）と polyfill（不足している関数を追加するため）を使用することを忘れないでください。そして、これらはコードが機能することを保証します。

例えば、今後 JavaScript に慣れたら、[babel-loader](https://github.com/babel/babel-loader) プラグインを持つ [webpack](http://webpack.github.io/) をベースにしたコードビルドシステムをセットアップできます。

複数の機能に関する現在のサポート状況を見るための便利なサイトです:
- <https://kangax.github.io/compat-table/es6/> - 純粋な JavaScript.
- <https://caniuse.com/> - ブラウザに関連する関数.

P.S. Google Chrome は通常、最も最新の言語機能を持っているので、もしチュートリアルのデモが失敗した場合には、Chrome で試してみてください。ただし、ほとんどのチュートリアルのデモ最新のブラウザで動作します。
=======
JavaScript is a highly dynamic language, scripts may add/modify any functions, even including built-in ones. 

Two interesting libraries of polyfills are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.


## Summary

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" language features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). And they'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](http://webpack.github.io/) with [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://kangax.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

