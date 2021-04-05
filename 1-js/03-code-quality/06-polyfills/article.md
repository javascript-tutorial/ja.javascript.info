
# Polyfills and transpilers

JavaScript言語は着実に進化しています。言語への新たな提案は定期的にだされ、それらは分析され、価値があると考えられたら <https://tc39.github.io/ecma262/> の一覧に追加され、[仕様](http://www.ecma-international.org/publications/standards/Ecma-262.htm) に進みます。

JavaScriptエンジンのチームは何を最初に実装するかについて独自の考えを持っています。彼らはドラフト段階の提案を実装する一方で、既に仕様となったものの実装を「面白くない、もしくはやるのが難しい」という理由で延期するかもしれません。

従って、あるエンジンに標準仕様の一部のみしか実装されていないという状況は非常に一般的なことです。

言語機能の現在のサポート状況を見るには <https://kangax.github.io/compat-table/es6/> が良いページです(それは大きく、まだ勉強すべき多くのことがあります)。

As programmers, we'd like to use most recent features. The more good stuff - the better!

<<<<<<< HEAD
我々が言語の最新の機能を使うとき、いくつかのエンジンはこのようなコードをサポートしていないかもしれません。先ほど言ったように、どこでもすべての機能が実装されている訳ではありません。

ここで、Babelが役に立ちます。

[Babel](https://babeljs.io) は [トランスパイラ](https://en.wikipedia.org/wiki/Source-to-source_compiler)です。
最新のJavaScriptコードを以前の標準仕様に書き直します。

実際には、Babelには２つのパートがあります:

1. １つ目はトランスパイラのプログラムで、コードを書き直します。開発者は自身のPC上でそれを実行します。するとコードが古い標準仕様のものに書き直されます。そして、コードはWebサイトにデリバリされます。[webpack](http://webpack.github.io/) や [brunch](http://brunch.io/) のような現代のプロジェクトのビルドシステムは、すべてのコード変更時に自動でトランスパイラを実行する手段を提供しています。そのため、私たち側で時間を取ることはありません。

2. ２つ目は polyfillです。

    トランスパイラはコードを書き直すので、構文機能はカバーされます。しかし、新しい関数のためには、それを実装する特別なスクリプトを書く必要があります。JavaScriptは非常に動的な言語であり、スクリプトは新しい機能を追加するだけでなく、組み込みの機能を変更することもできます。こうして、現代の標準に従って動作するようにすることができます。

    ギャップを "埋めて"、欠けている実装を加えるスクリプトとして、"polyfill" という用語があります。

    興味深い２つの polyfill は:
    - [babel polyfill](https://babeljs.io/docs/usage/polyfill/) 多くをサポートしますが、大きいです.
    - [polyfill.io](http://polyfill.io) 必要な機能に応じて、オンデマンドで polyfill を読み込み/構築することができます。

従って、私たちはトランスパイラをセットアップし、古いエンジンが最新の機能をサポートするように polyfill を追加する必要があります。

もし、私たちが最新のエンジンを対象とし、どこでもサポートされているもの以外の機能を使わないのであれば、Babelを使う必要はありません。

## チュートリアルの例 
=======
On the other hand, how to make our modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that can parse ("read and understand") modern code, and rewrite it using older syntax constructs, so that the result would be the same.

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
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 

<<<<<<< HEAD
````online
ほとんどの例は次のように実行可能です:
=======
Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23) = 1`.

<<<<<<< HEAD
最新のJSを使った例は、あなたのブラウザがそれをサポートしている場合にだけ動作します。
````

```offline
オフライン版で呼んでいるのであれば、例は実行できませんが、通常動作します :)
```

[Chrome Canary](https://www.google.com/chrome/browser/canary.html) はすべての例に対して上手く動きます。他の最新のブラウザもほとんど大丈夫です。

本番では、Babelを使ってコードを最近のブラウザに適した形に変換できるので、このような制限はありません。コードはどこでも動くでしょう。
=======
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
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

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

>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
