# Hello, world!

<<<<<<< HEAD
このチュートリアルは、プラットフォームに依存しないJavaScriptのコアについてです。もっと先に、Node.jsや他のプラットフォームについて学びます。

しかし、私たちは今スクリプトを動かすための動作環境が必要です。ちょうどこのチュートリアルはオンラインなので、ブラウザが良い選択肢です。もしも別の環境( Node.js など)に集中する予定がある場合に時間を費やさないように、ここでは、ブラウザ固有のコマンド(`alert`のような)が最小限になるようにします。チュートリアルの[次のパート](/ui) では、ブラウザの JavaScript に焦点を当てます。

では最初に、どうやってWebページにScriptを付け加えるか見てみましょう。サーバサイドでは、Node.jsの場合 `"node my.js"` のようにコマンドと一緒に実行するだけです。


## "script" タグ 

JavaScriptプログラムは、`<script>` タグを使用してHTML文書の任意の部分に挿入できます。

例:
=======
This part of the tutorial is about core JavaScript, the language itself.

But we need a working environment to run our scripts and, since this book is online, the browser is a good choice. We'll keep the amount of browser-specific commands (like `alert`) to a minimum so that you don't spend time on them if you plan to concentrate on another environment (like Node.js). We'll focus on JavaScript in the browser in the [next part](/ui) of the tutorial.

So first, let's see how we attach a script to a webpage. For server-side environments (like Node.js), you can execute the script with a command like `"node my.js"`.


## The "script" tag

JavaScript programs can be inserted almost anywhere into an HTML document using the `<script>` tag.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Before the script...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...After the script.</p>

</body>

</html>
```

```online
<<<<<<< HEAD
右上の "Play" ボタンをクリックすることでサンプルを実行することができます。
```

`<script>` タグはブラウザがこのタグを見つけたときに自動的に実行される JavaScript コードを含んでいます。


## 最新のマークアップ 

`<script>` タグには最近ではほとんど利用しない属性がいくつかあり、古いコードの中で見つけることができます:

 `type` 属性: <code>&lt;script <u>type</u>=...&gt;</code>
 : 古い標準であるHTML4はこのタイプを持つことを必須としました。通常は `type="text/javascript"`でした。今は必須ではありません。また、現在の標準ではこの属性の意味が完全に変わっています。現在は JavaScript モジュールとして使用することができます。ただ、これは高度なトピックであり、これに関してはチュートリアルの別の部分で説明します。
 
 `language` 属性: <code>&lt;script <u>language</u>=...&gt;</code>
  : この属性はスクリプトの言語の表示を意味するためのものでした。JavaScript がデフォルトの言語であるため、この属性に意味はなく、これを使う必要はありません。

スクリプトの前後のコメント
: 本当に昔の書籍やガイドでは、このような`<script>`の中にコメントがある場合があります:
=======
You can run the example by clicking the "Play" button in the right-top corner of the box above.
```

The `<script>` tag contains JavaScript code which is automatically executed when the browser processes the tag.


## Modern markup

The `<script>` tag has a few attributes that are rarely used nowadays but can still be found in old code:

The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>
: The old HTML standard, HTML4, required a script to have a `type`. Usually it was `type="text/javascript"`. It's not required anymore. Also, the modern HTML standard totally changed the meaning of this attribute. Now, it can be used for JavaScript modules. But that's an advanced topic, we'll talk about modules in another part of the tutorial.

The `language` attribute: <code>&lt;script <u>language</u>=...&gt;</code>
: This attribute was meant to show the language of the script. This attribute no longer makes sense because JavaScript is the default language. There is no need to use it.

Comments before and after scripts.
: In really ancient books and guides, you may find comments inside `<script>` tags, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

<<<<<<< HEAD
    それらのコメントは`<script>`タグを知らなかった古いブラウザでコードを隠すためのものです。しかし、過去15年以上で生まれた全てのブラウザはこのような問題は持っていません。このようなコメントはサインとして使えるので、私たちはここで言及します。もしもどこかでこれを見たら -- そのコードは恐らく本当に古いか、調べる価値がないでしょう。
=======
    This trick isn't used in modern JavaScript. These comments hide JavaScript code from old browsers that didn't know how to process the `<script>` tag. Since browsers released in the last 15 years don't have this issue, this kind of comment can help you identify really old code.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff


## 外部スクリプト 

多くのJavaScriptコードを持っている場合、別々のファイルに置くことができます。

<<<<<<< HEAD
スクリプトファイルは、`src` 属性でHTMLに記述します。
=======
Script files are attached to HTML with the `src` attribute:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
<script src="/path/to/script.js"></script>
```

<<<<<<< HEAD
ここで `/path/to/script.js` はスクリプトファイルの絶対パスです(サイトルートからの)。また、現在のページからの相対パスで指定することもできます。例えば、`src="script.js"` は現在のフォルダにある `"script.js"` を意味するでしょう。

完全なURLも同様に可能です。たとえば:
=======
Here, `/path/to/script.js` is an absolute path to the script from the site root. One can also provide a relative path from the current page. For instance, `src="script.js"`, just like `src="./script.js"`, would mean a file `"script.js"` in the current folder.

We can give a full URL as well. For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```

複数のスクリプトを使う場合は、複数のタグを使います:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
原則として、最もシンプルなスクリプトだけをHTML内に置きます。より複雑なものは別のファイルに置きます。

<<<<<<< HEAD
ファイル分割のメリットは、ブラウザがダウンロードしてそれをブラウザの[キャッシュ](https://en.wikipedia.org/wiki/Web_cache)に保存するためです。

以降、同じスクリプトが必要な他のページは、ダウンロードする代わりにキャッシュから取得します。そのため、ファイルは実際には一度だけダウンロードされます。

これはネットワーク通信量を節約しページをより速くします。
```

````warn header="もし `src` が設定された場合, スクリプトの中身は無視されます。"
1つの `<script>` タグは `src` 属性と中身のコード両方を持つことはできません。
=======
The benefit of a separate file is that the browser will download it and store it in its [cache](https://en.wikipedia.org/wiki/Web_cache).

Other pages that reference the same script will take it from the cache instead of downloading it, so the file is actually downloaded only once.

That reduces traffic and makes pages faster.
```

````warn header="If `src` is set, the script content is ignored."
A single `<script>` tag can't have both the `src` attribute and code inside.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

これは動作しません:

```html
<script *!*src*/!*="file.js">
  alert(1); // src が設定されているので、このコンテンツは無視されます。
</script>
```

<<<<<<< HEAD
外部の `<script src="…">` もしくは、通常のコードをもつ `<script>` のどちらか一方にしなければなりません。
=======
We must choose either an external `<script src="…">` or a regular `<script>` with code.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

上の例は、2つのスクリプトに分けることで動作させることができます。:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## サマリ 

<<<<<<< HEAD
- ページにJavaScriptコードを追加するには、`<script>` を利用します。
- `type` と `language` 属性は必要ありません。
- 外部ファイルのスクリプトは、`<script src="path/to/script.js"></script>` で挿入できます。


ブラウザスクリプトやそれらとWebページとのやり取りについては、学ぶことがまだまだあります。しかし、このチュートリアルのこのパートは JavaScript 言語に専念していることに留意してください。JavaScriptを実行するための方法としてここではブラウザを使っており、オンラインでの読み込みではとても便利ですが、数ある実行方法の1つでしかありません。
=======
- We can use a `<script>` tag to add JavaScript code to a page.
- The `type` and `language` attributes are not required.
- A script in an external file can be inserted with `<script src="path/to/script.js"></script>`.


There is much more to learn about browser scripts and their interaction with the webpage. But let's keep in mind that this part of the tutorial is devoted to the JavaScript language, so we shouldn't distract ourselves with browser-specific implementations of it. We'll be using the browser as a way to run JavaScript, which is very convenient for online reading, but only one of many.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
