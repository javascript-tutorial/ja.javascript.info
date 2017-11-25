# Javascript 入門

JavaScript について、何が特別なのか、それを使って達成できること、他のどのテクノロジーがそれと上手くやるのか見てみましょう。

## JavaScript とは？

*JavaScript* は当初 *"Webページを活かすため"* に作られました。

この言語のプログラムは *スクリプト* と呼ばれます。それらはHTMLの中に書かれ、ページが読み込まれると自動的に実行されます。

スクリプトはプレーンテキストとして提供され、実行されます。 それらは特別な準備や、実行するためのコンパイルを必要としません。

この側面において、JavaScript は [Java](http://en.wikipedia.org/wiki/Java) とはとても異なります。

```
smart header="なぜ <u>Java</u>Script?"
JavaScript が作られたとき, 当初は別の名前を持っていました:"LiveScript"。しかし Java 言語はその時非常に人気がありました。そのため、Java の "弟" として新しい言語を位置づけることが助けになると判断されました。
しかし、その進化により、JavaScriptは完全に独立した言語になり、[ECMAScript](http://en.wikipedia.org/wiki/ECMAScript)と呼ばれる自身の仕様を持ちました。今は、 Java とは全く関係はありません。
```

現在、JavaScript はブラウザだけでなく、サーバ上でも実行することができます。また、実際には [JavaScript エンジン](https://en.wikipedia.org/wiki/JavaScript_engine) と呼ばれるプログラムが存在するデバイスであれば実行することができます。

ブラウザにはエンジンが組み込まれており、それは "JavaScript 仮想マシン" と呼ばれる場合があります。

異なるエンジンは異なる "コードネーム" を持っています。例えば:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- in Chrome and Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- in Firefox.
- ...IEの異なるバージョン用として "Trident" や "Chakra", Microsoft Edge 用の "ChakraCore", Safari 用の "Nitro" や "SquirrelFish" 等のように他のコードネームもあります。

上記の用語は、インターネット上の開発者の記事で使用されているため、覚えておくと良いです。 我々もそれらを使うでしょう。たとえば、 "ある機能XがV8でサポートされている" 場合、おそらくChromeとOperaで動作します。

```smart header="エンジンはどのように動く?"

エンジンは複雑です。 しかし、基本は簡単です。

1. エンジン (ブラウザの場合は組み込まれています) はスクリプトを読み("パース")ます。
2. そして、スクリプトをマシン語に変換("コンパイル")します。
3. そして、マシンコードは非常に早く動く

エンジンは、プロセスのすべてのステージで最適化を適用します。実行時にコンパイルされたスクリプトも見ており、その中を流れるデータを分析し、その知識に基づいてマシンコードに最適化を適用します。 最終的に、スクリプトはかなり高速です。
```

## ブラウザ内のJavaScriptは何をすることができますか？

モダンなJavaScriptは "安全な" プログラミング言語です。
それは、メモリやCPUのような低レベルのアクセスは提供しません。なぜなら、それは最初にそれを必要としないブラウザ用に作成されたからです。

この能力は、JavaScriptを実行する環境に大きく依存します。 例えば、[Node.JS]（https://wikipedia.org/wiki/Node.js）は、JavaScriptが任意のファイルを読み書きできるようにする関数をサポートしています。

ブラウザ内のJavaScriptは、Webページ操作、ユーザやWebサーバとのやり取り、に関するすべてのことができます。

たとえば、ブラウザ内のJavaScriptは以下のことが可能です:

- 新たなHTMLをページに追加したり、存在するコンテンツの変更やスタイルの変更をします
- ユーザーアクションに反応し、マウスのクリック、ポインタの動き、キーの押下の実行をします
- リモートサーバへネットワーク越しのリクエストを送り、ファイルのダウンロードやアップロードをします( [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) や [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) と呼ばれるテクノロジー)。
- クッキーを取得、設定し、訪問者に質問してメッセージを表示します。
- クライアント側のデータを覚えます("local storage")。


## ブラウザ内のJavaScriptで出来ないことは何ですか？

JavaScript's abilities in the browser are limited for the sake of the user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.

The examples of such restrictions are:

- JavaScript on a webpage may not read/write arbitrary files on the hard disk, copy them or execute programs. It has no direct access to OS system functions.

    Modern browsers allow it to work with files, but the access is limited and only provided if the user does certain actions, like "dropping" a file into a browser window or selecting it via an `<input>` tag.

    There are ways to interact with camera/microphone and other devices, but they require a user's explicit permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other if they come from different sites (from a different domain, protocol or port).

    This is called the "Same Origin Policy". To work around that, *both pages* must contain a special JavaScript code that handles data exchange.

    The limitation is again for user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com` and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's safety limitations.

![](limitations.png)

Such limits do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow installing plugin/extensions which may get extended permissions.

## What makes JavaScript unique?

There are at least *three* great things about JavaScript:

```compare
+ Full integration with HTML/CSS.
+ Simple things done simply.
+ Supported by all major browsers and enabled by default.
```

Combined, these three things exist only in JavaScript and no other browser technology.

That's what makes JavaScript unique. That's why it's the most widespread tool to create browser interfaces.

While planning to learn a new technology, it's beneficial to check its perspectives. So let's move on to the modern trends that include new languages and browser abilities.


## Languages "over" JavaScript

The syntax of JavaScript does not suit everyone's needs. Different people want different features.

That's to be expected, because projects and requirements are different for everyone.

So recently a plethora of new languages appeared, which are *transpiled* (converted) to JavaScript before they run in the browser.

Modern tools make the transpilation very fast and transparent, actually allowing developers to code in another language and autoconverting it "under the hood".

Examples of such languages:

- [CoffeeScript](http://coffeescript.org/) is a "syntactic sugar" for JavaScript, it introduces shorter syntax, allowing to write more precise and clear code. Usually Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing", to simplify development and support of complex systems. It is developed by Microsoft.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps). It was initially offered by Google as a replacement for JavaScript, but as of now, browsers require it to be transpiled to JavaScript just like the ones above.

There are more. Of course even if we use one of those languages, we should also know JavaScript, to really understand what we're doing.

## Summary

- JavaScript was initially created as a browser-only language, but now it is used in many other environments as well.
- At this moment, JavaScript has a unique position as the most widely-adopted browser language with full integration with HTML/CSS.
- There are many languages that get "transpiled" to JavaScript and provide certain features. It is recommended to take a look at them, at least briefly, after mastering JavaScript.
