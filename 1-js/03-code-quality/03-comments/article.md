# コメント

 <info:structure> の章で見たように、コメントは `//` で始まる1行、もしくは `/* ... */` 形式の複数行とすることができます。

通常は、どのように、そしてなぜコードが動作するのかを説明するためにコメントを使用します。

<<<<<<< HEAD
一見、コメント付けというのはやるべきことが明白なようですが、プログラミング初心者は間違ったコメントの使い方をすることがあるようです。
=======
At first sight, commenting might be obvious, but novices in programming often use them wrongly.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 悪いコメント 

初心者は "コード内で起こっていること" を説明するのにコメントを使う傾向があります。このように:

```js
// このコードはこのようなこと (...) をして、次に (...)
// ...and who knows what else...
very;
complex;
code;
```

<<<<<<< HEAD
しかし良いコードでは、このような "説明的な" コメントは最小限にすべきです。真面目にそれらがなくても理解しやすいコードにするべきです。
=======
But in good code, the amount of such "explanatory" comments should be minimal. Seriously, the code should be easy to understand without them.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

それに関して素晴らしいルールがあります。"もしもコードがコメントを必要とするほど不明瞭な場合、書き直すべきかもしれません"。

### レシピ: 機能を括り出す

このように、コードの一部を関数に置き換えることは有益な場合があります:

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // i が素数であるかをチェックする
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

これは関数 `isPrime` として括られた、よりよりパターンです。:


```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

今や、私たちは簡単にコードを理解することができます。関数自身がコメントになります。このようなコードは *自己記述的* と呼ばれます。

### レシピ: 関数を作成する

また、もしこのような長い "コードの塊" がある場合:

```js
// here we add whiskey
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// here we add juice
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

次のように関数にリファクタリングするのがより良い方法かもしれません:

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

改めて言いますが、関数自身が何が行われているのかを伝えているので、コメントすることは何もありません。また分割するとコードの構造はより良くなります。各関数がすること、何を引数として取り、何を返すのかは明白です。

<<<<<<< HEAD
現実では、完全に "説明的な" コメントを避けることはできません。複雑なアルゴリズムがあり、その最適化のための賢明な "微調整" がコードの中で行われることがあります。しかし、一般的にはコードをシンプルで自己記述的に保つよう努めるべきです。
=======
In reality, we can't totally avoid "explanatory" comments. There are complex algorithms. And there are smart "tweaks" for purposes of optimization. But generally we should try to keep the code simple and self-descriptive.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 良いコメント 

これまでの通り、説明的なコメントは通常良くありません。ではどんなコメントが良いのでしょう？

<<<<<<< HEAD
アーキテクチャの説明をする
: 高水準のコンポーネントの概要、相互作用の方法、様々な状況での制御フローを説明します... つまり -- コードの俯瞰図です。それは高水準のアーキテクチャ図のための特別な言語[UML](https://ja.wikipedia.org/wiki/%E7%B5%B1%E4%B8%80%E3%83%A2%E3%83%87%E3%83%AA%E3%83%B3%E3%82%B0%E8%A8%80%E8%AA%9E)があります。これは間違いなく学ぶ価値があります。

関数の使用方法を文書化する
: 関数の文書化のための特別な構文 [JSDoc](https://ja.wikipedia.org/wiki/JSDoc) があります。: 使用方法、パラメータ、返却値

例:
```js
/**
  * Returns x raised to the n-th power.
  *
  * @param {number} x The number to raise.
  * @param {number} n The power, must be a natural number.
  * @return {number} x raised to the n-th power.
  */
=======
Describe the architecture
: Provide a high-level overview of components, how they interact, what's the control flow in various situations... In short -- the bird's eye view of the code. There's a special language [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) to build high-level architecture diagrams explaining the code. Definitely worth studying.

Document function parameters and usage
: There's a special syntax [JSDoc](http://en.wikipedia.org/wiki/JSDoc) to document a function: usage, parameters, returned value.

For instance:
```js
/**
 * Returns x raised to the n-th power.
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
function pow(x, n) {
  ...
}
```

<<<<<<< HEAD
このようなコメントにより、関数の目的を理解し、コードの中を見ることなく正しい方法で利用することができます。

ちなみに、[WebStorm](https://www.jetbrains.com/ja-jp/webstorm/) のような多くのエディタも同様にそれらを解釈することができ、それらを使ってオートコンプリートや自動コードチェックを提供します。

また、コメントからHTMLドキュメントを生成することができる [JSDoc 3](https://github.com/jsdoc3/jsdoc) のようなツールもあります。JSDocに関するより多くの情報は <http://usejsdoc.org/> で読むことができます。

タスクがこのように解決されるのはなぜか？
: 書かれていることは重要です。が、何が起こっていることを理解するためには、*書かれていないこと* がより重要かもしれません。なぜそのタスクがこの方法で正しく解決されるのか？コードは回答しません。
=======
Such comments allow us to understand the purpose of the function and use it the right way without looking in its code.

By the way, many editors like [WebStorm](https://www.jetbrains.com/webstorm/) can understand them as well and use them to provide autocomplete and some automatic code-checking.

Also, there are tools like [JSDoc 3](https://github.com/jsdoc/jsdoc) that can generate HTML-documentation from the comments. You can read more information about JSDoc at <https://jsdoc.app>.

Why is the task solved this way?
: What's written is important. But what's *not* written may be even more important to understand what's going on. Why is the task solved exactly this way? The code gives no answer.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    もしそのタスクを解決する方法が多数ある場合、なぜこれを選んだのでしょう？特に、それが最も明白なものではないとき。

    このようなコメントがなければ、次のような状況が起こりえます:
    1. あなた(もしくは同僚) はいくらか前に書かれたコードを開き、それが "準最適" であることを確認します。
    2. あなたは考えます: "私はなんて愚かだったのか、そして今はどれだけ賢くなったのか"、そして "より明白で正しい" 方法を使って書き直します。
    3. ... 書き直したいという思いは良かったです。しかし、そのプロセスの中であなたは "より明白な" 解決策は実際には不十分であることに気付きます。実は既に以前試みたことであり、なぜダメだったのかぼんやり覚えています。最終的に元の正しい方法に戻します。が、その分時間が無駄になりました。

    解決策を説明するコメントはとても重要です。それらは正しい方向で開発を続けるのに役立ちます。

<<<<<<< HEAD
コードの捉えにくい特徴はある？それらはどこで使われる？
: もしもコードが捉えにくく、紛らわしいものがある場合にはきっとコメントする価値があります。
=======
Any subtle features of the code? Where they are used?
: If the code has anything subtle and counter-intuitive, it's definitely worth commenting.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## サマリ 

<<<<<<< HEAD
よい開発者であることを示す重要な指標は、コメントです: 何を書くか、また、何を書かないかさえ、指標となります。
=======
An important sign of a good developer is comments: their presence and even their absence.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

よいコメントはコードを上手く維持し、時間が経った後でそこに戻ったときにも効果的に使えるようにします。

**コメントすること:**

- 全体的なアーキテクチャ、高水準の概説
- 関数の使用方法
- 重要な解決策、特にそれが一目瞭然でないとき

<<<<<<< HEAD
**コメントを避ける:**

- コメントは、 "どのようにコードが動くか" そして "それが何をするか" を伝えるものです。
- コメントを必要としないほどシンプルで自明なコードにすることが不可能な場合にのみ、コメントを入れます。
=======
**Avoid comments:**

- That tell "how code works" and "what it does".
- Put them in only if it's impossible to make the code so simple and self-descriptive that it doesn't require them.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

コメントはJSDoc3のような自動文書化ツールにも使われます: それらはコメントを解釈し、HTML-docs（または別の形式の文書）を生成します。
