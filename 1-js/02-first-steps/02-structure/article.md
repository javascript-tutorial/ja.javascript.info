# コード構造

<<<<<<< HEAD
最初に学ぶことは、コードの基本的な構成要素です。

## 文(命令文) 
=======
The first thing we'll study is the building blocks of code.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

文は、構文構造でアクションを実行するコマンドです。

私たちはすでに `alert('Hello, world!')` という文を見ており、これは "Hello, world!" というメッセージを表示します。

<<<<<<< HEAD
コードには必要なだけ文を含めることができ、文はセミコロンで区切ることができます。

たとえば、これは "Hello World" のメッセージを2つのアラートに分けます:
=======
We've already seen a statement, `alert('Hello, world!')`, which shows the message "Hello, world!".

We can have as many statements in our code as we want. Statements can be separated with a semicolon.

For example, here we split "Hello World" into two alerts:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run no-beautify
alert('Hello'); alert('World');
```

<<<<<<< HEAD
通常、それぞれの文は別の行に書かれます。これによりコードの可読性が向上します。
=======
Usually, statements are written on separate lines to make the code more readable:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run no-beautify
alert('Hello');
alert('World');
```

## セミコロン 

改行があるほとんどの場合、セミコロンは省略することが可能です。

これも動作します:

```js run no-beautify
alert('Hello')
alert('World')
```

<<<<<<< HEAD
ここで JavaScript は、改行を "暗黙" のセミコロンと解釈します。
これは[自動セミコロン挿入](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)と呼ばれます。

**ほとんどのケースで改行はセミコロンを意味します。しかし "ほとんどのケース" は "常に" ではありません!**

これは改行はセミコロンを意味しないケースです、例えば:
=======
Here, JavaScript interprets the line break as an "implicit" semicolon. This is called an [automatic semicolon insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**In most cases, a newline implies a semicolon. But "in most cases" does not mean "always"!**

There are cases when a newline does not mean a semicolon. For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run no-beautify
alert(3 +
1
+ 2);
```

<<<<<<< HEAD
このコードは `6` を出力します、なぜなら JavaScript はセミコロンを挿入しないからです。もし行の終わりがプラス `"+"` で終わっている場合、直感的には "不完全な表現" であり、セミコロンが必要ないのは明らかです。このケースでは、それは意図した通りに動作します。
=======
The code outputs `6` because JavaScript does not insert semicolons here. It is intuitively obvious that if the line ends with a plus `"+"`, then it is an "incomplete expression", so a semicolon there would be incorrect. And in this case, that works as intended.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

**しかし本当に必要なときに JavaScriptがセミコロンを想定 "し損なう" ケースがあります。**

このようなケースで発生するエラーは検出と修正が非常に困難です。

````smart header="エラーの例"
このようなエラーの具体例に興味があるなら、このコードを確認してみてください:

```js run
alert("Hello");

[1, 2].forEach(alert);
```

<<<<<<< HEAD
角括弧 `[]` や `forEach` の意味についてはまだ考える必要はありません。それらについては後ほど勉強するので今のところ問題ではありません。ただ結果を覚えておきましょう: "1", そして "2" が表示されます。

今、コードの前に `alert` を追加し、セミコロンで終わら "ない" ようにしましょう:
=======
No need to think about the meaning of the brackets `[]` and `forEach` yet. We'll study them later. For now, just remember the result of running the code: it shows `Hello`, then `1`, then `2`.

Now let's remove the semicolon after the `alert`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run no-beautify
alert("Hello")

<<<<<<< HEAD
実行すると、最初の `alert` だけが表示され、エラーが発生するでしょう!

しかし、`alert` の後にセミコロンをつけた場合はすべてうまく行きます:
```js run
alert("All fine now");

[1, 2].forEach(alert)  
```

これで "All fine now" メッセージ、そして `1`, `2` が表示されます。

JavaScriptでは角括弧 `[...]` の前にはセミコロンを想定しません。
そのため、セミコロンは自動挿入されないので最初の例のコードは1つの文として扱われます。
エンジンは次のように解釈しています:
=======
[1, 2].forEach(alert);
```

The difference compared to the code above is only one character: the semicolon at the end of the first line is gone.

If we run this code, only the first `Hello` shows (and there's an error, you may need to open the console to see it). There are no numbers any more.

That's because JavaScript does not assume a semicolon before square brackets `[...]`. So, the code in the last example is treated as a single statement.

Here's how the engine sees it:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run no-beautify
alert("Hello")[1, 2].forEach(alert);
```

<<<<<<< HEAD
しかし、本来は1つではなく2つの文であるべきです。今回のケースのようなマージは間違っているのでエラーです。このようなことが起こる状況は他にもあります。
````

改行によって文が分割されるとしてもセミコロンを置くことを推奨します。このルールはコミュニティで広く採用されています。改めて留意しましょう -- ほとんどの場合、セミコロンは除くことが *可能* です。しかし、特に初心者はセミコロンを使う方が安全です。

## コメント 

時が経つにつれて、プログラムはどんどん複雑になります。起こることと、なぜを説明するために *コメント* を追加し始める必要があります。

コメントはスクリプトのどの場所にも書くことができます。エンジンはそれらを無視するので、実行には影響しません。

**1行のコメントは、2つのスラッシュ文字 `//` から始まります。**
=======
Looks weird, right? Such merging in this case is just wrong. We need to put a semicolon after `alert` for the code to work correctly.

This can happen in other situations also.
````

We recommend putting semicolons between statements even if they are separated by newlines. This rule is widely adopted by the community. Let's note once again -- *it is possible* to leave out semicolons most of the time. But it's safer -- especially for a beginner -- to use them.

## Comments [#code-comments]

As time goes on, programs become more and more complex. It becomes necessary to add *comments* which describe what the code does and why.

Comments can be put into any place of a script. They don't affect its execution because the engine simply ignores them.

**One-line comments start with two forward slash characters `//`.**
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

残りの行はコメントです。それは行全体または文に従います。

このようになります:
```js run
// この行全体がコメントになります。
alert('Hello');

alert('World'); // このコメントは文の後に続いています。
```

**複数行のコメントはスラッシュとアスタリスク <code>/&#42;</code> で始まり、アスタリスクとスラッシュ <code>&#42;/</code> で終わります。**

このようになります:

```js run
/* 2つのメッセージを含む例。
これは複数行のコメントです。
*/
alert('Hello');
alert('World');
```

<<<<<<< HEAD
コメントの内容は無視されます、そのため、<code>/&#42; ... &#42;/</code> の中にコードをおいても実行されません。


これはコードの一部を一時的に無効にしたいときに便利です:
=======
The content of comments is ignored, so if we put code inside <code>/&#42; ... &#42;/</code>, it won't execute.

Sometimes it can be handy to temporarily disable a part of code:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
/* コードのコメントアウト
alert('Hello');
*/
alert('World');
```

<<<<<<< HEAD
```smart header="ホットキーを使いましょう!"
ほとんどのエディタでは、コードの行は1行コメントとして `key:Ctrl+/` ホットキーによりコメントアウトすることができます。そして `key:Ctrl+Shift+/` で複数行コメントです(コードの一部を選択し、ホットキーを押します)。
Macでは、 `key:Ctrl` の代わりに `key:Cmd` を試してください。
=======
```smart header="Use hotkeys!"
In most editors, a line of code can be commented out by pressing the `key:Ctrl+/` hotkey for a single-line comment and something like `key:Ctrl+Shift+/` -- for multiline comments (select a piece of code and press the hotkey). For Mac, try `key:Cmd` instead of `key:Ctrl` and `key:Option` instead of `key:Shift`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

````warn header="入れ子のコメントはサポートされていません!"
別の `/*...*/` の中に `/*...*/` はありません。。

このようなコードはエラーになります。

```js run no-beautify
/*
  /* nested comment ?!? */
*/
alert( 'World' );
```
````

コードにコメントするのを躊躇わないでください。

<<<<<<< HEAD
コメントはコード規模を増加させますが、それは全く問題ではありません。プロダクションサーバへリリースする前にコードを minify する多くのツールがあります。それらはコメントを除去するので、実行されるスクリプトには現れません。そのため、コメント書くことによるネガティブな影響は全くありません。

さらにこのチュートリアルでは、より良いコメントの書き方を説明するチャプター <info:coding-style> もあります。
=======
Comments increase the overall code footprint, but that's not a problem at all. There are many tools which minify code before publishing to a production server. They remove comments, so they don't appear in the working scripts. Therefore, comments do not have negative effects on production at all.

Later in the tutorial there will be a chapter <info:code-quality> that also explains how to write better comments.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
