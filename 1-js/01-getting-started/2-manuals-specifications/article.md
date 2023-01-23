
<<<<<<< HEAD
# マニュアルと仕様

この本は *チュートリアル* であり、あなたが徐々に言語を学ぶのを助けることを目的としています。そのため、基本が理解できたら別の情報源が必要になってきます。

## 仕様

[The ECMA-262 仕様](https://www.ecma-international.org/publications/standards/Ecma-262.htm) は、JavaScript に関して最も綿密で、詳細かつ形式化された情報を含んでいます。これが言語を定義しています。

しかし、形式張っているので最初は理解するのが難しいです。なので、言語の詳細について最も信頼できる情報源が必要であればここが正解ですが、日々使用するものではありません。

新しい仕様のバージョンは毎年リリースされます。これらのリリース間での、最新の仕様ドラフトは <https://tc39.es/ecma262/> にあります。

"ほぼ標準" (いわゆる "ステージ 3") を含む、新しい最先端の機能については、<https://github.com/tc39/proposals> の提案を参照してください。

また、ブラウザを対象に開発しているのであれば、チュートリアルの [パート 2](info:browser-environment) で説明している、他の仕様もあります。

## マニュアル

- **MDN (Mozilla) JavaScript リファレンス** は、例やその他の情報を含むマニュアルです。ここは、個々の言語関数やメソッドなどに関する情報の詳細を知るのにとても役立ちます。

    <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference> にあります。日本語版は <https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference> です。

    ですが、インターネット検索を使う方がベストなことが多いです。`parseInt` 関数を検索する場合、<https://google.com/search?q=MDN+parseInt> のように、クエリーを "MDN [用語]" とするだけです。

- **MSDN** – JavaScript (しばしば JScript と呼ばれます)を含む、多くの情報をもつ Microsoft のマニュアルです。Internet Explorer 固有のものが必要であれば、ここがベターです: <http://msdn.microsoft.com/>(日本語版: <https://msdn.microsoft.com/ja-jp/>)

    また、 "RegExp MSDN" または "RegExp MSDN jscript" といったフレーズでインターネット検索することもできます。

## 機能のサポート状況

JavaScript は開発中の言語であり、定期的に新機能が追加されます。

ブラウザベースや他のエンジン間でのサポート状況は以下で見ることができます:

- <http://caniuse.com> - 機能ごとのサポート状況が表で確認できます。例えば、モダンな暗号化機能をサポートしているエンジンを確認するには、<http://caniuse.com/#feat=cryptography> を参照してください。
- <https://kangax.github.io/compat-table> - 言語の機能と、それらをサポートする/しないエンジンの表です。

これらのリソースは、言語の詳細やサポートなどに関する貴重な情報が含まれているため、実際の開発に役立ちます。

特定の機能に関する詳細な情報が必要な場合は、それら（またはこのページ）を覚えておいてください。
=======
# Manuals and specifications

This book is a *tutorial*. It aims to help you gradually learn the language. But once you're familiar with the basics, you'll need other resources.

## Specification

[The ECMA-262 specification](https://www.ecma-international.org/publications/standards/Ecma-262.htm) contains the most in-depth, detailed and formalized information about JavaScript. It defines the language.

But being that formalized, it's difficult to understand at first. So if you need the most trustworthy source of information about the language details, the specification is the right place. But it's not for everyday use.

A new specification version is released every year. Between these releases, the latest specification draft is at <https://tc39.es/ecma262/>.

To read about new bleeding-edge features, including those that are "almost standard" (so-called "stage 3"), see proposals at <https://github.com/tc39/proposals>.

Also, if you're developing for the browser, then there are other specifications covered in the [second part](info:browser-environment) of the tutorial.

## Manuals

- **MDN (Mozilla) JavaScript Reference** is the main manual with examples and other information. It's great to get in-depth information about individual language functions, methods etc.

    You can find it at <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>.

Although, it's often best to use an internet search instead. Just use "MDN [term]" in the query, e.g. <https://google.com/search?q=MDN+parseInt> to search for the `parseInt` function.

## Compatibility tables

JavaScript is a developing language, new features get added regularly.

To see their support among browser-based and other engines, see:

- <https://caniuse.com> - per-feature tables of support, e.g. to see which engines support modern cryptography functions: <https://caniuse.com/#feat=cryptography>.
- <https://kangax.github.io/compat-table> - a table with language features and engines that support those or don't support.

All these resources are useful in real-life development, as they contain valuable information about language details, their support, etc.

Please remember them (or this page) for the cases when you need in-depth information about a particular feature.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
