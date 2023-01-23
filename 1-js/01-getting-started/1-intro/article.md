# JavaScript 入門

<<<<<<< HEAD
JavaScript について、何が特別なのか、それを使ってできることや他のどの技術と上手くやるのか見てみましょう。
=======
Let's see what's so special about JavaScript, what we can achieve with it, and what other technologies play well with it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## JavaScript とは？

<<<<<<< HEAD
*JavaScript* は当初 *"Webページを活かすため"* に作られました。

この言語のプログラムは *スクリプト* と呼ばれます。それらはHTMLの中に書かれ、ページが読み込まれると自動的に実行されます。

スクリプトはプレーンテキストとして提供され、実行されます。 特別な準備や、実行するためのコンパイルは必要ありません。

この点において、JavaScript は [Java](http://en.wikipedia.org/wiki/Java) とは大きく異なります。

```smart header="なぜ <u>Java</u>Script と言うのでしょう?"

JavaScript が作られたとき, 当初は別の名前を持っていました: "LiveScript"。しかし当時 Java 言語が非常に人気であったため、Java の "弟" として新しい言語を位置づけるのが良いと判断されました。
しかし、それ以降の進化により、JavaScriptは完全に独立した言語になり、[ECMAScript](http://en.wikipedia.org/wiki/ECMAScript)と呼ばれる独自の仕様を持ちました。現在 Java とは全く関係ありません。
```

現在、JavaScript はブラウザだけでなく、サーバ上でも実行することができます。実際には [JavaScript エンジン](https://en.wikipedia.org/wiki/JavaScript_engine) と呼ばれるプログラムが存在するデバイスであれば実行することができます。

ブラウザにはエンジンが組み込まれており、"JavaScript 仮想マシン" と呼ばれる場合があります。

異なるエンジンは異なる "コードネーム" を持っています。例えば:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- Chrome と Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- Firefox.
- ...IEはバージョンによって "Trident" や "Chakra", Microsoft Edge 用の "ChakraCore", Safari 用の "Nitro" や "SquirrelFish" 等のように他のコードネームもあります。

これらの用語は、インターネット上の開発者の記事で使用されているため、覚えておくと良いでしょう。 たとえば、"ある機能 X がV8でサポートされている" と言った場合、おそらくChromeとOperaで動作します。

```smart header="エンジンはどのように動く?"
=======
*JavaScript* was initially created to "make web pages alive".

The programs in this language are called *scripts*. They can be written right in a web page's HTML and run automatically as the page loads.

Scripts are provided and executed as plain text. They don't need special preparation or compilation to run.

In this aspect, JavaScript is very different from another language called [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="Why is it called <u>Java</u>Script?"
When JavaScript was created, it initially had another name: "LiveScript". But Java was very popular at that time, so it was decided that positioning a new language as a "younger brother" of Java would help.

But as it evolved, JavaScript became a fully independent language with its own specification called [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), and now it has no relation to Java at all.
```

Today, JavaScript can execute not only in the browser, but also on the server, or actually on any device that has a special program called [the JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine).

The browser has an embedded engine sometimes called a "JavaScript virtual machine".

Different engines have different "codenames". For example:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- in Chrome, Opera and Edge.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- in Firefox.
- ...There are other codenames like "Chakra" for IE, "JavaScriptCore", "Nitro" and "SquirrelFish" for Safari, etc.

The terms above are good to remember because they are used in developer articles on the internet. We'll use them too. For instance, if "a feature X is supported by V8", then it probably works in Chrome, Opera and Edge.

```smart header="How do engines work?"
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

エンジンは複雑ですが、基本は単純です。

<<<<<<< HEAD
1. エンジン (ブラウザの場合は組み込まれています) はスクリプトを読み("パース")ます。
2. その後、スクリプトを機械語に変換("コンパイル")します。
3. 機械語が実行されます。非常に早く動作します。

エンジンは処理の各ステップで最適化を行います。実行時にコンパイルされたスクリプトも見ており、そこを流れるデータを分析し、それ基づいて機械語を最適化します。 最終的に、スクリプトはとても速く実行されます。
=======
1. The engine (embedded if it's a browser) reads ("parses") the script.
2. Then it converts ("compiles") the script to machine code.
3. And then the machine code runs, pretty fast.

The engine applies optimizations at each step of the process. It even watches the compiled script as it runs, analyzes the data that flows through it, and further optimizes the machine code based on that knowledge.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## ブラウザ内のJavaScriptができることは？

<<<<<<< HEAD
モダンなJavaScriptは "安全な" プログラミング言語です。それは、メモリやCPUのような低レベルのアクセスは提供しません。なぜなら、当初はそれらを必要としないブラウザ用に作成されたものだからです。

JavaScript の機能は、実行される環境に大きく依存します。 例えば、[Node.js](https://wikipedia.org/wiki/Node.js) では、JavaScriptが任意のファイルを読み書きしたりできる機能をサポートしています。

ブラウザ内のJavaScriptは、Webページの操作、ユーザやWebサーバとのやり取りに関する様々なことを実行できます。
=======
Modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or the CPU, because it was initially created for browsers which do not require it.

JavaScript's capabilities greatly depend on the environment it's running in. For instance, [Node.js](https://wikipedia.org/wiki/Node.js) supports functions that allow JavaScript to read/write arbitrary files, perform network requests, etc.

In-browser JavaScript can do everything related to webpage manipulation, interaction with the user, and the webserver.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

たとえば、ブラウザ内のJavaScriptは次のようなことが可能です:

- 新たなHTMLをページに追加したり、既存のコンテンツの変更やスタイルの変更をする。
- ユーザーの操作(マウスのクリック、ポインタの動き、キーの押下など)に反応する。
- リモートサーバへネットワーク越しのリクエストを送り、ファイルのダウンロードやアップロードをする( [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) や [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) と呼ばれる技術)。
- クッキーの取得と設定、訪問者への質問やメッセージを表示する。
- クライアント側でデータを記憶する("ローカルストレージ")。


<<<<<<< HEAD
## ブラウザ内のJavaScriptで出来ないことは？ 

ブラウザでは、JavaScriptの機能はユーザの安全のために制限されています。
その目的は、悪意のあるWebページがプライベートな情報へアクセスしたり、ユーザデータへ危害を加えることを防ぐことです。

制限の例として、次のようなものがあります:
=======
JavaScript's abilities in the browser are limited to protect the user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.

Examples of such restrictions include:

- JavaScript on a webpage may not read/write arbitrary files on the hard disk, copy them or execute programs. It has no direct access to OS functions.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- Webページ上のJavaScriptは、ハードディスク上の任意のファイルの読み書きや、それらのコピー、プログラムの実行をすることができません。OSのシステム機能に直接アクセスすることはできません。

<<<<<<< HEAD
    現代のブラウザは、ファイルを扱うことはできますがアクセスは制限されており、ブラウザウィンドウへのファイルの "ドロップ" や、`<input>` タグを経由したファイル選択と言ったユーザの特定の操作のみを提供しています。

    カメラ/マイクやその他デバイスとやり取りする方法はありますが、ユーザの明示的な許可が求められます。したがって、JavaScriptが有効なページがWebカメラを密かに有効にしたり、それを利用して利用者の周囲を観察したり、[NSA](https://en.wikipedia.org/wiki/National_Security_Agency) に情報を送信すると言ったことはできません。
- 異なるタブやウィンドウは一般的にお互いについて知りません。時々、例えばあるウィンドウがJavaScriptを利用して別のウィンドウを開くケースはあります。しかし、この場合においても、あるページからのJavaScriptは、別のサイト（異なるドメイン、プロトコル、ポート）からのものである場合は、アクセスすることはできません。

    これは "Same Origin Policy" と呼ばれています。回避するためには、 *両方のページ* にデータ交換を行うための特別なJavaScriptコードを含める必要があります。

    この制限もユーザの安全のためです。ユーザが開いた `http://anysite.com` というサイトのページは、URL `http://gmail.com` の別のブラウザのタブにアクセスし、そこから情報を盗むことはできません。
- JavaScriptはネットワークを介して、現在のページがきたサーバと簡単にやり取りすることができます。しかし、他のサイト/ドメインからデータを受信することは制限されています。可能ですが、リモート側からの明示的な同意(HTTPヘッダで表現)が必要になります。繰り返しますが、これらは安全上の制限です。

![](limitations.svg)
=======
    There are ways to interact with the camera/microphone and other devices, but they require a user's explicit permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other page if they come from different sites (from a different domain, protocol or port).

    This is called the "Same Origin Policy". To work around that, *both pages* must agree for data exchange and must contain special JavaScript code that handles it. We'll cover that in the tutorial.

    This limitation is, again, for the user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com`, for example, and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's a safety limitation.

![](limitations.svg)

Such limitations do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow plugins/extensions which may ask for extended permissions.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

JavaScriptがブラウザ外で使われる場合はこのような制限は存在しません。たとえば、サーバ上です。また、現代のブラウザは、より拡張されたアクセス権限を必要とするプラグイン/拡張機能を利用することもできます。

## なにがJavaScriptを特別なものにしている？ 

JavaScriptには少なくとも *3つ* の素晴らしいことがあります:

```compare
<<<<<<< HEAD
+ HTML/CSSとの完全な統合
+ シンプルなことはシンプルに
+ すべてのメジャーブラウザでサポートされており、デフォルトで有効
=======
+ Full integration with HTML/CSS.
+ Simple things are done simply.
+ Supported by all major browsers and enabled by default.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
JavaScript is the only browser technology that combines these three things.

<<<<<<< HEAD
JavaScriptは、これら3つのことを組み合わせた唯一のブラウザテクノロジーです。

それがJavaScriptをユニークなものにしています。だからこそ、ブラウザインターフェイスを作成するための最も普及しているツールとなっています。

とは言え、JavaScript を利用してサーバやモバイルアプリケーションなどを作成することもできます。
=======
That's what makes JavaScript unique. That's why it's the most widespread tool for creating browser interfaces.

That said, JavaScript can be used to create servers, mobile applications, etc.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## JavaScriptを "覆う" 言語 

JavaScriptの構文は、すべての人のニーズにマッチしている訳ではありません。人によって求める機能は異なります。

プロジェクトや要件はそれぞれ異なるため、それは自然なことです。

<<<<<<< HEAD
そのため、最近では新しい言語が数多く登場しています。これらはブラウザで実行する前にJavaScriptに *トランスパイル* (変換)されます。

最新のツールは非常に高速にトランスパイルでき、透過的です。開発者が別の言語でコードを作成し、それを自動変換することができます。
=======
So, recently a plethora of new languages appeared, which are *transpiled* (converted) to JavaScript before they run in the browser.

Modern tools make the transpilation very fast and transparent, actually allowing developers to code in another language and auto-converting it "under the hood".
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

これは、そのような言語の例です:

<<<<<<< HEAD
- [CoffeeScript](http://coffeescript.org/) はJavaScriptの "シンタックスシュガー"です。より短い構文を導入し、より簡潔でクリアなコードを書くことができます。たいてい、Ruby 開発者は好きです。
- [TypeScript](http://www.typescriptlang.org/) は "厳密なデータ型指定" の追加に焦点をあてています。それは複雑なシステムの開発とサポートを簡素化するためです。これは Microsoftにより開発されています。
- [Flow](http://flow.org/) もデータ型定義を追加しますが、その方法は異なります。Facebook により開発されました。
- [Dart](https://www.dartlang.org/) はブラウザ以外の環境（モバイルアプリのような）で動作する独自のエンジンを持ったスタンドアローンな言語ですが、JavaScript へトランスパイルすることもできます。Googleによって開発されました。
- [Brython](https://brython.info/) は JavaScript への Python トランスパイラで、JavaScript を使用することなく、純粋な Python でアプリケーションを作成することができます。

他にもあります。もちろん、上記のような言語を利用する予定だとしても、実際に行われていることを本当に理解するためにJavaScriptは知っておくのがよいです。
=======
- [CoffeeScript](https://coffeescript.org/) is "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](https://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](https://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.
- [Brython](https://brython.info/) is a Python transpiler to JavaScript that enables the writing of applications in pure Python without JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) is a modern, concise and safe programming language that can target the browser or Node.

There are more. Of course, even if we use one of these transpiled languages, we should also know JavaScript to really understand what we're doing.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## サマリ 

<<<<<<< HEAD
- JavaScriptは当初ブラウザ用の言語として作られました。しかし今はその他の多くの環境で利用されています。
- 現時点では、JavaScriptはHTML/CSSと完全に統合し、最も広く採用されたブラウザ言語として、独立した地位にいます。
- JavaScriptに "トランスパイル" し、特定の機能を提供する多くの言語があります。 JavaScriptをマスターした後、少なくとも簡単にでも目を通しておくことをお勧めします。
=======
- JavaScript was initially created as a browser-only language, but it is now used in many other environments as well.
- Today, JavaScript has a unique position as the most widely-adopted browser language, fully integrated with HTML/CSS.
- There are many languages that get "transpiled" to JavaScript and provide certain features. It is recommended to take a look at them, at least briefly, after mastering JavaScript.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
