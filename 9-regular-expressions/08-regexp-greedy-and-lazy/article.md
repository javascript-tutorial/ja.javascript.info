# 貪欲と怠惰な量指定子

量指定子は一見すると非常に簡単ですが、実際には扱いにくいです。

`pattern:/\d+/` よりも複雑なものを探す場合、検索がどのように上手く動作しているのかを理解する必要があります。

<<<<<<< HEAD:5-regular-expressions/08-regexp-greedy-and-lazy/article.md
[cut]

例として、次のタスクをやってみましょう。
=======
Let's take the following task as an example.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/08-regexp-greedy-and-lazy/article.md

テキストがあり、すべての引用符 `"..."` をギルメットマーク `«...»` に置き換える必要があります。それらは多くの国でタイポグラフィとして好まれています。

<<<<<<< HEAD:5-regular-expressions/08-regexp-greedy-and-lazy/article.md
例えば: `"Hello, world"` は `«Hello, world»` になります。

国によっては、`„Witam, świat!”` (ポーランド語)や `「你好，世界」` (中国語) の引用符を好みます。異なるロケールでは、異なる置換を選ぶ可能性がありますが、すべて同じように動作するので、まずは `«...»` で始めましょう。

置換するためには、まずすべての引用符で囲まれた部分文字列を見つける必要があります。

正規表現はこのようになります: `pattern:/".+"/g`。つまり: 引用符に続いて1つ以上の文字が続き、その後に別の引用符が続きます。

...しかし、それを適用しようとすると、たとえ次のような単純なケースであっても...
=======
For instance: `"Hello, world"` should become `«Hello, world»`. Some countries prefer other quotes, like `„Witam, świat!”` (Polish) or `「你好，世界」` (Chinese), but for our task let's choose `«...»`.

The first thing to do is to locate quoted strings, and then we can replace them.

A regular expression like `pattern:/".+"/g` (a quote, then something, then the other quote) may seem like a good fit, but it isn't!

Let's try it:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/08-regexp-greedy-and-lazy/article.md

```js run
let reg = /".+"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(reg) ); // "witch" and her "broom"
```

...意図通りに動作していないことが分かります!

`match:"witch"` と `match:"broom"`, 2つのマッチを見つける代わりに、`match:"witch" and her "broom"` 1つを見つけます。

それは、"貪欲は諸悪の根源" と表現することができます。

## 貪欲(欲張り/最大量)検索

マッチを見つけるために、正規表現エンジンは次のアルゴリズムを使います:

- 文字列内のすべての位置で
    -  その位置でパターンをマッチさせます
    - マッチしない場合は次の位置に移動します。

これらの一般的な言葉では正規表現が失敗する理由が明白でないため、パターン 
`pattern:".+"` に対して検索がどのように機能するかを詳しく見ていきましょう。

1. 最初のパターン文字は引用符 `pattern:"` です。

    正規表現エンジンは、ソース文字列 `subject:a "witch" and her "broom" is one` のゼロ位置でそのパターンを見つけようとしますが、そこは `subject:a` なので、すぐには一致しません。

    次に進みます: ソース文字列の次の位置に移動し、そこで最初のパターン文字を見つけようとします。そして3番目の位置で引用符を見つけます。:

    ![](witch_greedy1.png)

2. 引用符が検出され、次にエンジンはパターン残り部分のマッチを見つけようとします。ソース文字列の残りの部分が `pattern:.+"` に従っているかを確かめます。

    我々のケースでは、次のパターン文字は `pattern:.` (ドット)です。それは "改行以外の任意の文字" を意味するので、次の文字 `match:'w'` にフィットします:

    ![](witch_greedy2.png)

3. 次に、量指定子 `pattern:.+` なのでドットを繰り返します。正規表現エンジンは可能な限り文字を1つずつ取り込み、マッチを作成します。

    ...いつ不可能になるでしょう？すべての文字はドットにマッチするので、文字列の最後に到達したときにだけ停止します。:

    ![](witch_greedy3.png)

4. いま、エンジンは `pattern:.+` の繰り返しを終了し、次のパターン文字を見つけようとします。それは引用符 `pattern:"` です。しかし、ここで問題あります: 文字列は終了したのでこれ以上文字はありません!

    正規表現エンジンはあまりに多くの `pattern:.+` が引っかかったと理解し、*来た道を戻り* 始めます。

    つまり、量指定子のマッチを1文字減らします。:

    ![](witch_greedy4.png)

    今、`pattern:.+` は末尾の1文字前で終わり、残りのパターンをその位置からマッチさせようとします。

    もしそこに引用符があれば終了しますが、最後の文字は `subject:'e'` なので一致しません。

5. ...なので、エンジンは `pattern:.+` の繰り返し回数をもう1文字減らします:

    ![](witch_greedy5.png)

    引用符 `pattern:'"'` は `subject:'n'` に一致しません。

6. エンジンは戻り続けます: エンジンは残りのパターン(今回のケースでは `pattern:'"'`)にマッチするまで `pattern:'.'` の繰り返し回数を減らします。:

    ![](witch_greedy6.png)

7. マッチが完了しました。

8. したがって、最初のマッチは `match:"witch" and her "broom"` です。さらなる検索は最初のマッチが終わったところから始まりますが、残りの文字列  `subject:is one` にはこれ以上引用はないため、それ以上の結果はありません。

これは恐らく我々が期待したものではありませんが、このように動作します。

**貪欲(Greedy)モード(デフォルト)では、量指定子は可能な限り繰り返されます。**

正規表現エンジンは `pattern:.+` でできるだけ多くの文字を取得しようとし、その後1つずつ縮めていきます。

私たちのタスクでは、別のものが欲しいです。そのためのものとして、怠惰な/控えめな量指定子モードがあります。

## 怠惰(最短)モード

量指定子の怠惰モードは貪欲モードとは逆です。それは "最小限の回数だけ繰り返す" を意味します。

これを有効にするには量指定子の後に疑問符 `pattern:'?'` を置き、`pattern:'?'` に対して `pattern:*?` や `pattern:+?` または `pattern:??`になるようにします。

よりはっきりさせる為に: 通常、疑問符マーク `pattern:?` はそれ自身が量指定子(0か1)ですが、*別の量指定子(または自身も)* の後に追加された場合、別の意味を持ちます -- マッチングのモードを貪欲から怠惰に切り替えます。

正規表現 `pattern:/".+?"/g` は期待通りに動作します: これは `match:"witch"` と `match:"broom"` を見つけます。:

```js run
let reg = /".+?"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(reg) ); // witch, broom
```

変更をよりはっきり理解するために、検索をステップ毎にトレースしてみましょう。

1. 最初のステップは同じです: 3番目の位置でパターンの開始 `pattern:'"'` を見つけます。:

    ![](witch_greedy1.png)

2. 次のステップも似ています: エンジンはドット `pattern:'.'` に対するマッチを見つけます:

    ![](witch_greedy2.png)

3. ここから検索は異なります。`pattern:+?` は怠惰モードなので、エンジンはもう一度マッチさせようとはせず、パターンの残り部分 `pattern:'"'` とマッチさせようとします:

    ![](witch_lazy3.png)

    もしそこに引用符があれば、検索は終わっていましたが、`'i'` なのでマッチしません。
4. 次に、正規表現エンジンはドットの繰り返し回数を増やし、もう一度試みます。:

    ![](witch_lazy4.png)

    再び失敗です。その後、繰り返し回数は何度も増えていきます...
5. ...パターンの残り部分への一致が見つかるまで繰り返されます:

    ![](witch_lazy5.png)

6. 次の検索は現在のマッチの終わりから始まり、もう1つ結果が得られます:

    ![](witch_lazy6.png)

この例では、`pattern:+?` に対して怠惰モードがどのように動作するかを見てきました。量指定子 `pattern:+?` と `pattern:??` は同様の方法で動作します -- 残りのパターンが指定された位置で一致しない場合のみ、正規表現エンジンは繰り返し回数を増やします。

**怠惰は `?` をつけた量指定子に対してのみ有効です。**

他の量指定子は依然として貪欲です。

例:

```js run
alert( "123 456".match(/\d+ \d+?/g) ); // 123 4
```

1. パターン `pattern:\d+` はできるだけ多くマッチさせようとし(貪欲モード)、`match:123` を見つけ停止します。なぜなら次の文字は空白 `pattern:' '` だからです。
2. 次にパターンに空白があるので、それがマッチします。
3. 続いて `pattern:\d+?` です。量指定子は怠惰モードなので、1桁の `match:4` を見つけ、残りのパターンがそこからマッチするかをチェックします。

    ...しかしパターンは `pattern:\d+?` で終わりです。

    怠惰モードは必要がないので何も繰り返しません。パターンは終了したので、やることは終わりました。マッチしたのは `match:123 4` です。
4. 次の検索は文字 `5` から開始します。

```smart header="最適化"
現代の正規表現エンジンはより高速に動作するために内部のアルゴリズムを最適化します。なので、実際には説明したアルゴリズムとは少し異なる動作をする場合があります。

しかし、正規表現がどのように動作するかを理解したり、正規表現を構築するのにそれらを知る必要はありません。それらは物事を最適化するために内部でのみ使用されます。

複雑な正規表現は最適化が難しいので、検索は説明した通りに正確に動作します。
```

## 代替のアプローチ

<<<<<<< HEAD:5-regular-expressions/08-regexp-greedy-and-lazy/article.md
正規表現では、同じことをする方法が複数あることがよくあります。
=======
With regexps, there's often more than one way to do the same thing.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/08-regexp-greedy-and-lazy/article.md

我々のケースでは、`pattern:"[^"]+"` を使うことで、怠惰モードなしで引用符で囲まれた文字列を見つけることができます。:

```js run
let reg = /"[^"]+"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(reg) ); // witch, broom
```

正規表現 `pattern:"[^"]+"` は正しい結果を返します。なぜなら、引用符 `pattern:'"'` に続けて1つ以上の非引用符 `pattern:[^"]` 、その後引用符を閉じるというパターンを探すからです。

正規表現エンジンが `pattern:[^"]+` を探す際、引用符閉じに出会うと繰り返しをやめ、検索が終わります。

このロジックは怠惰量指定子を置き換えるものではないことに注意してください!

私たちはいずれかが必要なときがあります。

<<<<<<< HEAD:5-regular-expressions/08-regexp-greedy-and-lazy/article.md
怠惰量指定子が失敗しこのバリアントが正しく動作するもう１つの例を見てみましょう。
=======
**Let's see an example where lazy quantifiers fail and this variant works right.**
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/08-regexp-greedy-and-lazy/article.md

例えば、任意の `href` をもつ形式 `<a href="..." class="doc">` のリンクを取得したいとします。

どちらの正規表現を使うべきでしょう？

最初のアイデアは: `pattern:/<a href=".*" class="doc">/g` です。

確認してみましょう:
```js run
let str = '...<a href="link" class="doc">...';
let reg = /<a href=".*" class="doc">/g;

// 動作します!
alert( str.match(reg) ); // <a href="link" class="doc">
```

<<<<<<< HEAD:5-regular-expressions/08-regexp-greedy-and-lazy/article.md
...しかし、仮にテキスト中にもっとリンクがあるとどうなるでしょう？
=======
It worked. But let's see what happens if there are many links in the text?
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/08-regexp-greedy-and-lazy/article.md

```js run
let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let reg = /<a href=".*" class="doc">/g;

// Whoops! 1つのマッチに2つのリンクがあります!
alert( str.match(reg) ); // <a href="link1" class="doc">... <a href="link2" class="doc">
```

今の結果は、私たちの "魔女" の例と同じ理由で間違っています。量指定子 `pattern:.*` は文字を多く取り過ぎました。

一致はこのように見えます:

```html
<a href="....................................." class="doc">
<a href="link1" class="doc">... <a href="link2" class="doc">
```

量指定子 `pattern:.*?` を怠惰にすることでパターンを修正しましょう:

```js run
let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let reg = /<a href=".*?" class="doc">/g;

// 動作します!
alert( str.match(reg) ); // <a href="link1" class="doc">, <a href="link2" class="doc">
```

<<<<<<< HEAD:5-regular-expressions/08-regexp-greedy-and-lazy/article.md
これで機能し、2つのマッチが見つかります:
=======
Now it seems to work, there are two matches:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/08-regexp-greedy-and-lazy/article.md

```html
<a href="....." class="doc">    <a href="....." class="doc">
<a href="link1" class="doc">... <a href="link2" class="doc">
```

<<<<<<< HEAD:5-regular-expressions/08-regexp-greedy-and-lazy/article.md
それがなぜ機能するか -- は上のすべての説明の後に明らかにした方がよいです。従って、詳細へは入らず、もう１つのテキストを試してみましょう:
=======
...But let's test it on one more text input:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/08-regexp-greedy-and-lazy/article.md

```js run
let str = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
let reg = /<a href=".*?" class="doc">/g;

// 間違った一致です!
alert( str.match(reg) ); // <a href="link1" class="wrong">... <p style="" class="doc">
```

<<<<<<< HEAD:5-regular-expressions/08-regexp-greedy-and-lazy/article.md
正規表現がリンクだけでなく、`<p...>` を含むその後に続くテキストもマッチしていることがわかります。

なぜこのようなことが起こるのでしょうか?

1. まず、正規表現はリンクの開始 `match:<a href="` を見つけます

2. 次に `pattern:.*?` を探し、1文字を取ります。その後、パターンの残り部分にマッチするものがあるかをチェックし、もう1文字取ります...

    量指定子 `pattern:.*?` は `match:class="doc">` に到達するまで文字を取ります。

    ...それはどこで見つかるでしょう？テキストを見ると、`match:class="doc">` はリンクを越えた、タグ `<p>` の中にだけあることが分かります。

3. したがって、一致は次のようになります:
=======
Now it fails. The match includes not just a link, but also a lot of text after it, including `<p...>`.

Why?

That's what's going on:

1. First the regexp finds a link start `match:<a href="`.
2. Then it looks for `pattern:.*?`: takes one character (lazily!), check if there's a match for `pattern:" class="doc">` (none).
3. Then takes another character into `pattern:.*?`, and so on... until it finally reaches `match:" class="doc">`.

But the problem is: that's already beyound the link, in another tag `<p>`. Not what we want.

Here's the picture of the match aligned with the text:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/08-regexp-greedy-and-lazy/article.md

```html
<a href="..................................." class="doc">
<a href="link1" class="wrong">... <p style="" class="doc">
```

そのため、怠惰はここでは動作しませんでした。

私たちは `<a href="...something..." class="doc">` を探すパターンが必要ですが、貪欲と怠惰、両方のバリアントに問題がありません。

正しいバリアントは次のようになります: `pattern:href="[^"]*"`。これは `href` 属性の中のすべての文字を取ります。それは最も近い引用符までであり、まさに私たちが必要なものです。

動作例:

```js run
let str1 = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
let str2 = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let reg = /<a href="[^"]*" class="doc">/g;

// 動作します!
alert( str1.match(reg) ); // null, マッチしません。これは正しいです。
alert( str2.match(reg) ); // <a href="link1" class="doc">, <a href="link2" class="doc">
```

## サマリ

量指定子には2つの動作モードがあります:

貪欲(Greedy)
: デフォルトでは、正規表現エンジンは可能な限り多く量指定子を繰り返そうとします。例えば、`pattern:\d+` は可能なすべての数字になります。(これ以上数字がない,または文字の終わり)でこれ以上繰り返せなくなると、パターンの残り部分のマッチを続けます。もし一致がない場合、繰り返しの数を減らし(バックトレース)、再度マッチを試みます。

怠惰(Lazy)
: 量指定子の後の疑問符記号 `pattern:?` で有効になります。正規表現エンジンは、量指定子の各繰り返しの前に残りのパターンのマッチを試みます。

見てきたように、怠惰モードは貪欲検索の "万能薬" ではありません。代替は除外をもつ "微調整された" 貪欲検索です。すぐにそれについてもっと例を見てみましょう。
