
# Polyfills

JavaScript言語は着実に進化しています。言語への新たな提案は定期的にだされ、それらは分析され、価値があると考えられたら <https://tc39.github.io/ecma262/> の一覧に追加され、[仕様](http://www.ecma-international.org/publications/standards/Ecma-262.htm) に進みます。

JavaScriptエンジンのチームは何を最初に実装するかについて独自の考えを持っています。彼らはドラフト段階の提案を実装する一方で、既に仕様となったものの実装を「面白くない、もしくはやるのが難しい」という理由で延期するかもしれません。

従って、あるエンジンに標準仕様の一部のみしか実装されていないという状況は非常に一般的なことです。

言語機能の現在のサポート状況を見るには <https://kangax.github.io/compat-table/es6/> が良いページです(それは大きく、まだ勉強すべき多くのことがあります)。

## Babel

我々が言語の最新の機能を使うとき、いくつかのエンジンはこのようなコードをサポートしていないかもしれません。先ほど言ったように、どこでもすべての機能が実装されている訳ではありません。

ここで、Babelが役に立ちます。

[Babel](https://babeljs.io) は [トランスパイラ](https://en.wikipedia.org/wiki/Source-to-source_compiler)です。
最新のJavaScriptコードを以前の標準仕様に書き直します。

実際には、Babelには２つのパートがあります:

<<<<<<< HEAD
1. １つ目はトランスパイラのプログラムで、コードを書き直します。開発者は自身のPC上でそれを実行します。するとコードが古い標準仕様のものに書き直されます。そして、コードはWebサイトにデリバリされます。[webpack](http://webpack.github.io/) や [brunch](http://brunch.io/) のような現代のプロジェクトのビルドシステムは、すべてのコード変更時に自動でトランスパイラを実行する手段を提供しています。そのため、私たち側で時間を取ることはありません。
=======
1. First, the transpiler program, which rewrites the code. The developer runs it on their own computer. It rewrites the code into the older standard. And then the code is delivered to the website for users. Modern project build systems like [webpack](http://webpack.github.io/) provide means to run transpiler automatically on every code change, so that very easy to integrate into development process.
>>>>>>> 71ff8f81b05e2438a3c56507888e06c528a71182

2. ２つ目は polyfillです。

<<<<<<< HEAD
    トランスパイラはコードを書き直すので、構文機能はカバーされます。しかし、新しい関数のためには、それを実装する特別なスクリプトを書く必要があります。JavaScriptは非常に動的な言語であり、スクリプトは新しい機能を追加するだけでなく、組み込みの機能を変更することもできます。こうして、現代の標準に従って動作するようにすることができます。

    ギャップを "埋めて"、欠けている実装を加えるスクリプトとして、"polyfill" という用語があります。

    興味深い２つの polyfill は:
    - [babel polyfill](https://babeljs.io/docs/usage/polyfill/) 多くをサポートしますが、大きいです.
    - [polyfill.io](http://polyfill.io) 必要な機能に応じて、オンデマンドで polyfill を読み込み/構築することができます。

従って、私たちはトランスパイラをセットアップし、古いエンジンが最新の機能をサポートするように polyfill を追加する必要があります。

もし、私たちが最新のエンジンを対象とし、どこでもサポートされているもの以外の機能を使わないのであれば、Babelを使う必要はありません。
=======
    New language features may include new built-in functions and syntax constructs.
    The transpiler rewrites the code, transforming syntax constructs into older ones. But as for new built-in functions, we need to implement them. JavaScript is a highly dynamic language, scripts may add/modify any functions, so that they behave according to the modern standard.

    A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

    Two interesting polyfills are:
    - [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
    - [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.

So, if we're going to use modern language features, a transpiler and a polyfill are necessary.
>>>>>>> 71ff8f81b05e2438a3c56507888e06c528a71182

## チュートリアルの例 


````online
ほとんどの例は次のように実行可能です:

```js run
alert('Press the "Play" button in the upper-right corner to run');
```

最新のJSを使った例は、あなたのブラウザがそれをサポートしている場合にだけ動作します。
````

```offline
<<<<<<< HEAD
オフライン版で呼んでいるのであれば、例は実行できませんが、通常動作します :)
```

[Chrome Canary](https://www.google.com/chrome/browser/canary.html) はすべての例に対して上手く動きます。他の最新のブラウザもほとんど大丈夫です。

本番では、Babelを使ってコードを最近のブラウザに適した形に変換できるので、このような制限はありません。コードはどこでも動くでしょう。
=======
As you're reading the offline version, in PDF examples are not runnable. In EPUB some of them can run.
```

Google Chrome is usually the most up-to-date with language features, good to run bleeding-edge demos without any transpilers, but other modern browsers also work fine.
>>>>>>> 71ff8f81b05e2438a3c56507888e06c528a71182
