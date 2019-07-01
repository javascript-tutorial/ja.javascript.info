
# マニュアルと仕様

この本は *チュートリアル* であり、あなたが徐々に言語を学ぶのを助けることを目的としています。そのため、基本が理解できたら別の情報源が必要になってきます。


## 仕様

**ECMA-262 仕様** は、JavaScript に関して最も綿密で、詳細かつ形式化された情報を含んでいます。これが言語を定義しています。

しかし、形式化されているので最初は理解するのが難しいです。なので、言語の詳細について最も信頼できる情報源が必要であればここが正解ですが、日々使用するものではありません。

最新のドラフトは <https://tc39.es/ecma262/> にあります。

まだ広くサポートされていない、最先端/試作段階の機能に関しては <https://github.com/tc39/proposals> の提案を参照してください。

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
