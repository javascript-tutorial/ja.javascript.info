# 忍者コード

<<<<<<< HEAD
=======

```quote author="Confucius (Analects)"
Learning without thought is labor lost; thought without learning is perilous.
```

Programmer ninjas of the past used these tricks to sharpen the mind of code maintainers.

Code review gurus look for them in test tasks.

Novice developers sometimes use them even better than programmer ninjas.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```quote author="孔子"
子曰く、学びて思わざれば則ち罔し（くらし）、思いて学ばざれば則ち殆し（あやうし）。
```

過去のプログラマー忍者は、コード管理者泣かせのトリックを使いました。

コードレビューの達人は、テストタスクでそれらを探します。

新米の開発者は、プログラマー忍者よりもそれらをうまく使うことがあります。

<<<<<<< HEAD
これらを注意深く読んで、あなたが誰であるかを知ってください -- 忍者、初心者、またはコードレビュアーでしょうか？


```warn header="諷刺"
多くの人が忍者の道を辿ろうとしますが、成功することはほとんどありません。
```

=======

```warn header="Irony detected"
Many try to follow ninja paths. Few succeed.
```


## Brevity is the soul of wit
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 簡潔が肝心(Brevity is the soul of wit)

できるだけコードを短くしましょう。あなたがどれだけ賢いかを示しましょう。

そのためには、すぐには捉えにくい言語機能も使いましょう。

例えば、この3項演算子 `'?'` を見てください:

```js
// よく知られている javascript ライブラリから持ってきました
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

<<<<<<< HEAD
すごいですよね？もしあなたがこのように書いたら、この行を見て `i` の値が何かを理解しようとする開発者は、愉快な時間を過ごすことになります。そして、あなたのところに来て、答えを求めるでしょう。

より短いことが常により良いと教えましょう。彼を忍者の道に導きましょう。
=======
Cool, right? If you write like that, a developer who comes across this line and tries to understand what is the value of `i` is going to have a merry time. Then come to you, seeking for an answer.

Tell them that shorter is always better. Initiate them into the paths of ninja.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 一文字の変数

```quote author="老子道徳経"
道は隠れたもので、名も無い。それ唯、道は善くゆとりを与え、且つ、成すものだ。

```

<<<<<<< HEAD
より速くコード化するためのもう1つの方法は、あらゆる場所で、`a`, `b` や `c` のように1文字の変数名を使うことです。

森の中の忍者のように、短い変数はコードの中で消えます。エディタの "検索" を使って見つけることはできません。たとえできたとしても、`a` や `b` が意味することを "解読" することはできないでしょう。
=======
Another way to code shorter is to use single-letter variable names everywhere. Like `a`, `b` or `c`.

A short variable disappears in the code like a real ninja in the forest. No one will be able to find it using "search" of the editor. And even if someone does, they won't be able to "decipher" what the name `a` or `b` means.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

...しかし、例外があります。本物の忍者は決して `"for"` ループのカウンタに `i` を使いません。色々な所で使いますが、ここでは使いません。見回すと、より多くのエキゾチックな文字があります。例えば `x` または `y` です。

<<<<<<< HEAD
ループ本体が 1-2 ページ(できればより長くする)の場合は、ループカウンタとしてのエキゾチックな変数は特に効果があります。そのループを深く見ている人は、変数名 `x` がループカウンタであることはすぐには分からないでしょう。
=======
An exotic variable as a loop counter is especially cool if the loop body takes 1-2 pages (make it longer if you can). Then if someone looks deep inside the loop, they won't be able to quickly figure out that the variable named `x` is the loop counter.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 略語を使用する

チームのルールで、1文字や曖昧な名前の使用を禁止している場合、それらを短縮して略語を作ってください。

このように:

- `list` -> `lst`.
- `userAgent` -> `ua`.
- `browser` -> `brsr`.
- ...etc

本当に感が鋭い人だけがこのような名前を理解することができます。すべてを短くするようにしてください。あなたのコードを支持できるのは、有能な人だけです。

## 高く舞い上がる、抽象的になる

```quote author="老子道徳経"
大方は隅（ぐう）無し。<br>
大器は晩成（ばんせい）す。<br>
大音聲希（まれ）なり。<br>
大象（たいしょう）は形無し。
```

名前を選ぶときは、最も抽象的な言葉を使ってください。`obj`, `data`, `value`, `item`, `elem` など。

- **変数の理想の名前は `data`** どこでもこれを使いましょう。確かに、すべての変数は *データ* を保持していますよね。

    ...しかし、もし `data` が既に使われていたらどうしましょう？ その時は `value` を試みてみましょう、それもまた普遍的です。結局、変数は最終的に *値* を得るので。

- **変数をその型で命名する: `str`, `num`...**

<<<<<<< HEAD
    試してみましょう。若い忍者は不思議に思うかもしれません -- このような名前は本当に忍者のためになるのでしょうか？はい、その通りです。

    確かに、変数名は中身に何があるかを意味しています: 文字列、数値またはそれ以外の何か。しかし外部からこのコードを理解しようとするとき、実際にはまったく情報がないことに驚くでしょう。

    値の型はデバッグで簡単にわかります。しかし変数が意味するものが何か？どの文字列/数値が格納されるのか？
    
    相当の熟慮なしでそれを理解する方法はありません。
=======
    Give them a try. A young initiate may wonder -- are such names really useful for a ninja? Indeed, they are!

    Sure, the variable name still means something. It says what's inside the variable: a string, a number or something else. But when an outsider tries to understand the code, they'll be surprised to see that there's actually no information at all! And will ultimately fail to alter your well-thought code.

    The value type is easy to find out by debugging. But what's the meaning of the variable? Which string/number does it store?

    There's just no way to figure out without a good meditation!
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- **...しかし、これ以上このような名前がなかったら？** 単に数値を付け足します: `data1, item2, elem5`...

## 注意力テスト

<<<<<<< HEAD
本当に気が利くプログラマだけがあなたのコードを理解できます。しかし、どうやってそれをチェックしましょう？
=======
Only a truly attentive programmer should be able to understand your code. But how to check that?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

**1つの方法は -- 似た変数名を使うことです。`date` や `data` のように**

できるだけそれらをミックスしてください。

このようなコードを素早く読むことは不可能です。また、タイポがある場合...うーん...私たちは長い時間行き詰まります。


## スマートな同義語

<<<<<<< HEAD
```quote author="孔子"
最も難しいことは暗い部屋で黒猫を見つけることです。そこに猫がいない場合は特にそうです。
=======
```quote author="Laozi (Tao Te Ching)"
The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

*同じ* ものに対して *類似の* 名前を使うことは人生をより面白くし、あなたの創造性を外部に示します。

例えば、関数のプレフィックスを考えてください。もし関数が画面上にメッセージ表示する場合、 -- `displayMessage` のように `display…` から始めます。そして、次に別の関数でユーザ名のような、何かを画面に表示するとき、`showName` など `show…` から始めます。

実際には何もありませんが、このような関数の間で微妙な違いをほのめかしましょう。

チームの仲間の忍者と契約を結びましょう: もしジョンが "表示をする" 関数を `display...` で始めたら、ピーターは `render...` を使い、アンは -- `paint...` を。どのくらい面白くて多様なコードになったかに注目してください。

...そして今やハットトリックです!

重要な違いを持つ2つの関数では -- 同じプレフィックスを使いましょう!

例えば、関数 `printPage(page)` はプリンタを使うでしょう。そして関数 `printText(text)` は画面上にテキストを表示します。使い慣れていない読み手に類似の名前がつけられた関数 `printMessage` について考えさせましょう: "この関数はどこにメッセージを出すの？プリンタ？それとも画面上？" 本当に輝かせるためには `printMessage(message)` は新しいウィンドウに表示するべきです!

## 名前の再利用

```quote author="老子道徳経"
始めて制して名有り。<br>
名も亦既に有るも、<br>
それ亦止まることを知らんとす。<br>
止まることを知るは、殆（あやう）からざる所以なり。
```

本当に必要なときにだけ、新しい変数を追加してください。

代わりに、既存の名前を再利用してください。新しい値をそこに書き込みます。

関数では、パラメータとして渡された変数だけを使用しようとしてください。

<<<<<<< HEAD
そうすれば、変数 *now* に入っているものを正確に特定するのは本当に難しくなります。また、それがどこから来るのかも。直感の弱い人は１行ずつコードを解析し、すべてのコードのブランチの変更を追跡する必要があります。
=======
That would make it really hard to identify what's exactly in the variable *now*. And also where it comes from. The purpose is to develop the intuition and memory of a person reading the code. A person with weak intuition would have to analyze the code line-by-line and track the changes through every code branch.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

**そのアプローチの高度のパターンは、値をループや関数の途中で、こっそり (!) 似たものに置き換えることです。**

例えば:

```js
function ninjaFunction(elem) {
  // elem を処理するコードが 20 行ほど

  elem = clone(elem);

  // さらに 20 行, いつの間にか elem のクローンを処理しています!
}
```

<<<<<<< HEAD
関数の後半で、`elem` を使いたい仲間のプログラマは驚くでしょう... デバッグのときにだけ。コードを調べた後、自分が clone に対して処理をしていることに気づくでしょう。

経験豊富な忍者に対しても、殺人的に効果的です。

## 楽しみのためのアンダースコア 
=======
A fellow programmer who wants to work with `elem` in the second half of the function will be surprised... Only during the debugging, after examining the code they will find out that they're working with a clone!

Seen in code regularly. Deadly effective even against an experienced ninja.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

変数名の前にアンダースコア `_` と `__` を置きましょう、`_name` もしくは `__value` のように。もしあなただけがその意味を知っているなら素晴らしいです。もしくは、特に意味はなく単に楽しむために追加するのもよいです。異なる場所で異なる意味をもたせるのも良いです。

あなたは、一発の弾丸で2匹のうさぎを殺します。1つ目は、コードがより長くなり可読性を下げます。2つ目は、仲間の開発者はアンダースコアの意味を知ろうとするために長い時間を費やすかもしれません。

賢い忍者はコードの１ヶ所にアンダースコアを置き、別の場所では避けます。これにより、さらにコードが壊れやすくなり、将来エラーが起きる可能性が高まります。

## あなたの愛を示す

みんなにあなたの存在がどれだけ壮大かを見せてください! `superElement`, `megaFrame` や `niceItem` のような名前はきっと読者を啓発します。

確かに、変数名には `super..`, `mega..`, `nice..` などが書かれています。が、その一方で -- それらはその詳細を何も示しません。読者はその隠された意味を探すために時間を割くかもしれません。

<<<<<<< HEAD
=======
Indeed, from one hand, something is written: `super..`, `mega..`, `nice..` But from the other hand -- that brings no details. A reader may decide to look for a hidden meaning and meditate for an hour or two of their paid working time.

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 外部の変数と重ね合わせる

```quote author="関尹子"
明るい処に身を置く者は、暗闇の中に一つの物を見ることもできないが。<br>
暗闇に身を置く者は、明るい所の細々とした事を区別することができる。
```

<<<<<<< HEAD
関数の内側と外側で同じ変数名を使ってください。簡単で努力は不要です。
=======
Use same names for variables inside and outside a function. As simple. No efforts to invent new names.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let *!*user*/!* = authenticateUser();

function render() {
  let *!*user*/!* = anotherValue();
  ...
  ...many lines...
  ...
  ... // <-- プログラマは user を使って処理をしたい...
  ...
}
```

`render` の内側へジャンプしてきたプログラマは、恐らくローカルの `user` が外の `user` を隠していることに気づかないでしょう。

<<<<<<< HEAD
そして、外部変数、`authenticateUser()` の結果であるという想定で `user` を使って処理しようと試みるでしょう... トラップが飛び出しました! デバッガーの出番です...
=======
Then they'll try to work with `user` assuming that it's the external variable, the result of `authenticateUser()`... The trap is sprung! Hello, debugger...
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff


## 至るところで副作用!

何も変えないように見える関数があります。 `isReady()`, `checkPermission()`, `findTags()`... これらの関数は、外側のものを何も変えることなく、データを計算したり、見つけて返したりすると想定されています。つまり、"副作用" なしです。

**本当に美しいトリックは、メインの処理に加えて "役立つ" アクションを追加することです。**

<<<<<<< HEAD
`is..`, `check`, または `find..` と名づけられた関数が何かを変更すると、同僚の驚きの表情は、きっとあなたの理性のたがを広げるでしょう。
=======
An expression of dazed surprise on the face of your colleague when they see a function named `is..`, `check..` or `find...` changing something -- will definitely broaden your boundaries of reason.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

**驚かせるためのもう1つの方法は、標準ではない結果を返すことです。**

あなたのオリジナルの考えを見せましょう! `checkPermission` の呼び出しで、 `true/false` ではなく、結果の確認が複雑なオブジェクトを返すようにしましょう。

`if (checkPermission(..))` を書こうとした開発者はなぜ動かないのか不思議に思うでしょう。彼らに教えましょう: "ドキュメントを読みなさい!" そしてこの記事を見せてください。


## 強力な関数!

```quote author="老子道徳経"
大道は汎として、<br>
それ左右すべし。
```

その名前に書かれていることで関数を制限しないでください。広くあれ。

例えば、関数 `validateEmail(email)` は(emailの正しさのチェックに加えて)エラーメッセージを表示し、emailを再度入力することを要求します。

追加のアクションは関数名から明白であってはなりません。本当の忍者のコーダは、同様にコードからもそれを明らかにしません。

**複数のアクションを1つに結合すると、あなたのコードを再利用から守ります。**

<<<<<<< HEAD
想像してみてください。emailのチェックだけ行い、メッセージを出力したくない開発者を。両方を行うあなたの関数 `validateEmail(email)` は彼にはマッチしません。そのため、彼はそれについて何かを尋ねるようなことはしないので、あなたの作業が中断させられることはありません。
=======
Imagine, another developer wants only to check the email, and not output any message. Your function  `validateEmail(email)` that does both will not suit them. So they won't break your meditation by asking anything about it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## サマリ 

これまでの "アドバイス" はすべての実際のコードからです... 経験豊富な開発者により書かれていることもあります。たぶんあなたよりも経験豊かな ;)

- それらのいくつかに従うと、あなたのコードは驚きに満ちるでしょう。
- それらの多くに従うと、あなたのコードはあなただけのものになり、誰もそれを変更したくないでしょう。
- すべてを守れば、あなたのコードは啓発を求める若い開発者にとって貴重な教訓になるでしょう。
