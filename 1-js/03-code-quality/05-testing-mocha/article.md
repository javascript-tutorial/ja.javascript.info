<<<<<<< HEAD
# mocha による自動テスト

多くのタスクがある場合、自動テストが使用され、実際のプロジェクトでも広く利用されています。

## なぜテストが必要なのでしょうか？ 

関数を書くとき、どのパラメータがどのような結果をもたらすかといった、関数がすべきことをイメージできます。

開発中、私たちは関数を実行し、その結果を期待される値と比較することで関数のチェックが行えます。例えば、コンソール上でそれを行うことができます。
=======
# Automated testing with Mocha

Automated testing will be used in further tasks, and it's also widely used in real projects.

## Why do we need tests?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

もし何かが間違っていたら -- コードを直し、再度実行し結果を確認 -- を期待通り動くまで繰り返します。

しかしそのような手動の "再実行" は十分ではありません。

**手動による再実行でコードをテストする場合、何かを簡単に見逃してしまうことがあります。**

例えば、関数 `f` を作っています。ある程度コードを書き、テストします: `f(1)` は動きますが、`f(2)` は動きません。コードを直すと `f(2)` が動くようになります。が、これで完璧でしょうか？ `f(1)` の再テストを忘れており、このケースがエラーになるかもしれません。

これは非常に典型的なパターンです。何かを開発するとき、私たちは多くのユースケースの可能性を心に留めています。しかし、何かの変更のたびに、すべてのユースケースのチェックを手動で行うことをプログラマに期待するのは困難です。このため、あるものを修正して別のものを壊すことが容易に起こり得るのです。

**自動テストとは、コードとは別にテストを記述することを意味します。これにより、関数はさまざまな方法で実行され、期待される結果との比較が行われます。**

## ビヘイビア駆動開発(BDD) 

<<<<<<< HEAD
[ビヘイビア駆動開発](http://en.wikipedia.org/wiki/Behavior-driven_development),もしくは BDD と呼ばれるテクニックを使ってみましょう。そのアプローチは多くのプロジェクトで使われています。なお、BDDは単なるテストについてのものではありません。それ以上です。
=======
**Automated testing means that tests are written separately, in addition to the code. They run our functions in various ways and compare results with the expected.**
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

**BDD には3つのことがあります。テスト、ドキュメント、そして例です。**

<<<<<<< HEAD
BDD を理解するために、実際の開発ケースを検討していきましょう。
=======
Let's start with a technique named [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) or, in short, BDD.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## "pow" の開発: spec 

<<<<<<< HEAD
`x` の `n` 乗をする関数 `pow(x, n)` を作りたいとしましょう。`n≥0` と仮定します。
=======
To understand BDD, we'll examine a practical case of development.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

このタスクは例です: JavaScriptには同様のことを行う `**` 演算子がありますが、ここではより複雑なタスクに対しても同様に適用が可能な *開発フロー* に集中します。

`pow` のコードを作成する前に、関数が何をすべきかを考え、それを記述します。

<<<<<<< HEAD
このようなことに関する記述は *specification（仕様）*、もしくは spec と呼ばれ、次のようになります:
=======
That task is just an example: there's the `**` operator in JavaScript that can do that, but here we concentrate on the development flow that can be applied to more complex tasks as well.

Before creating the code of `pow`, we can imagine what the function should do and describe it.

Such description is called a *specification* or, in short, a spec, and contains descriptions of use cases together with tests for them, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
describe("pow", function() {

  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

上記の通り、spec は三つの主要な構成要素を持っています:

`describe("title", function() { ... })`
<<<<<<< HEAD
: どのような機能について記述しているか。"ワーカー" -- `it` のブロック -- をグループ化するために使用します。このケースでは、関数 `pow` について記述しています。

`it("title", function() { ... })`
: `it` の `title` では、特定のユースケースを人間が読めるように記述し、2番目の引数は、それをテストするための関数です。
=======
: What functionality we're describing? In our case we're describing the function `pow`. Used to group "workers" -- the `it` blocks.

`it("use case description", function() { ... })`
: In the title of `it` we *in a human-readable way* describe the particular use case, and the second argument is a function that tests it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

`assert.equal(value1, value2)`
: もし実装が正しければ、`it` ブロック内のコードはエラーなく実行されるはずです。

    関数 `assert.*` は`pow`が期待通り動作するかをチェックするために使われます。ここではそのうちの1つ、`assert.equal` を使用しています。これは引数を比較し、等しくない場合にエラーを返します。ここでは `pow(2, 3)` の結果が `8` と等しいかをチェックします。他のタイプの比較やチェックもありますので、後ほど紹介します。

<<<<<<< HEAD
この仕様は実行可能であり、実行されると `it` ブロック内で指定されたテストが実施されます。これについては後ほど見ていきます。

## 開発フロー 
=======
    Functions `assert.*` are used to check whether `pow` works as expected. Right here we're using one of them -- `assert.equal`, it compares arguments and yields an error if they are not equal. Here it checks that the result of `pow(2, 3)` equals `8`. There are other types of comparisons and checks, that we'll add later.

The specification can be executed, and it will run the test specified in `it` block. We'll see that later.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

開発フローは通常このようになります:

1. 最も基本的な機能のテストとともに、初期の spec が書かれます。
2. 最初の実装が作成されます。
3. 動作するかどうかを確認するため、テストフレームワークである [Mocha](http://mochajs.org/) (詳細は後述) を使用して spec を実行します。機能が完全ではない場合、エラーが表示されます。すべてが動作するまで修正を行います。
4. これで、テスト付きの動作可能な初期の実装ができあがります。
5. まだ実装ではサポートされていないであろうユースケースを、さらに spec に追加していきます。これによりテストは失敗し始めます。
6. 3に戻り、テストのエラーが無くなるまで実装を更新します。
7. 機能が完成するまで3〜6のステップを繰り返します。

<<<<<<< HEAD
上で分かる通り、開発は *反復* です。spec を書き、それを実装し、テストが通ることを確認し、さらにテストを書いて、それらが動作することを確認します。最終的に、動作する実装とテストができ上がります。
=======
1. An initial spec is written, with tests for the most basic functionality.
2. An initial implementation is created.
3. To check whether it works, we run the testing framework [Mocha](https://mochajs.org/) (more details soon) that runs the spec. While the functionality is not complete, errors are displayed. We make corrections until everything works.
4. Now we have a working initial implementation with tests.
5. We add more use cases to the spec, probably not yet supported by the implementations. Tests start to fail.
6. Go to 3, update the implementation till tests give no errors.
7. Repeat steps 3-6 till the functionality is ready.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

実践的なケースでこの開発フローをみていきましょう。

<<<<<<< HEAD
最初のステップはすでに完了です: `pow` の初期 spec を持っています。では、実装を行う前に、テストを実行するためのいくつかの JavaScript ライブラリを利用してそれらが動作することを見ててみましょう(テスト自体は失敗します)。
=======
Let's see this development flow in our practical case.

The first step is already complete: we have an initial spec for `pow`. Now, before making the implementation, let's use a few JavaScript libraries to run the tests, just to see that they are working (they will all fail).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## アクションの spec

このチュートリアルでは、テストのために次のJavaScriptライブラリを使います:

<<<<<<< HEAD
- [Mocha](http://mochajs.org/) -- コアフレームワーク: `describe`　や `it` を含む共通のテスト関数と、テストを実行するメイン機能を提供します。
- [Chai](http://chaijs.com) -- 多くのアサーションを持つライブラリ。様々なアサーションを使う事ができますが、今は `assert.equal` だけが必要です。
- [Sinon](http://sinonjs.org/) -- 関数をスパイしたり、組み込み関数をエミュレートしたりするライブラリで、後々必要となります。
=======
- [Mocha](https://mochajs.org/) -- the core framework: it provides common testing functions including `describe` and `it` and the main function that runs tests.
- [Chai](https://www.chaijs.com/) -- the library with many assertions. It allows to use a lot of different assertions, for now we need only `assert.equal`.
- [Sinon](https://sinonjs.org/) -- a library to spy over functions, emulate built-in functions and more, we'll need it much later.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

これらのライブラリはブラウザとサーバサイド両方のテストで利用することができます。ここでは、ブラウザの場合について進めます。

それらのフレームワークと `pow` の spec の完全なHTMLページです:

```html src="index.html"
```

<<<<<<< HEAD
ページは４つのパートに分かれています:
=======
The page can be divided into five parts:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

1. `<head>` -- テストのためのサードパーティーのライブラリやスタイルの追加
2. テストするための関数の `<script>`、このケースでは -- `pow` のコードです。
3. テスト -- 我々のケースでは、上にあった `describe("pow", ...)` を持つ外部スクリプト `test.js`。
4. Mocha が結果を出力するために、HTML要素 `<div id="mocha">` が使われます。
5. テストはコマンド `mocha.run()` で開始されます。

結果:

[iframe height=250 src="pow-1" border=1 edit]

現時点ではテストは失敗しエラーが起きます。それは当然です: `pow` のコードは空なので、`pow(2, 3)` は `8` ではなく `undefined` を返します。

<<<<<<< HEAD
なお、将来的には、[karma](https://karma-runner.github.io/) のような高度なテストランナーがあることを心に留めておきましょう。一般的には、それらを利用することで多数の異なるテストのセットアップは問題にはなりません。
=======
For the future, let's note that there are more high-level test-runners, like [karma](https://karma-runner.github.io/) and others, that make it easy to autorun many different tests.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 初期の実装 

テストを通すため、`pow` を実装しましょう:

```js
function pow(x, n) {
  return 8; // :) we cheat!
}
```

おぉ、これでも動作します!

[iframe height=250 src="pow-min" border=1 edit]

## spec を改善する 

私たちがしたことは完全にずるです。関数は動作しません: `pow(3, 4)` は正しくない結果を返します。がテストは通ります。

...テストは通るが、関数は誤った動作するという状況は非常に典型的で、実践で起こり得ます。私たちの仕様は不完全であり、ユースケースの追加が必要です。

<<<<<<< HEAD
`pow(3, 4) = 81` を確認するテストを追加しましょう。
=======
Let's add one more test to check that `pow(3, 4) = 81`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

ここで、テストを整理するために、次のいずれかの方法を選ぶことができます:

1. 最初の方法は -- 同じ `it` に `assert` を追加します:

    ```js
    describe("pow", function() {

      it("raises to n-th power", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```
2. ２つ目は -- ２つのテストを作ります:

    ```js
    describe("pow", function() {

      it("2 raised to power 3 is 8", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 raised to power 4 is 81", function() {
        assert.equal(pow(3, 4), 81);
      });

    });
    ```

主な違いは、`assert` がエラーをトリガするとき、 `it` ブロックは直ちに終了することです。そのため、最初の方法では、最初の `assert` が失敗すると2つ目の `assert` の結果は見られません。

テストを分けて作ると、起こっていることに関してより多くの情報を得ることができるので、2つ目の方法のほうが良いでしょう。

それに加えて、従うべきもう一つのルールがあります。

**1つのテストは1つのことを確認します**

もしテストを見て、２つの独立したチェックがその中にある場合、分割して2つのシンプルなテストにするほうが良いでしょう。

なので、2つ目の方法で進めていきましょう。

結果:

[iframe height=250 src="pow-2" edit border="1"]

<<<<<<< HEAD
予想通り、2つ目のテストは失敗しました。もちろん、`assert` が `27` を期待しているにもかかわらず、関数が常に `8` を返すためです。
=======
As we could expect, the second test failed. Sure, our function always returns `8`, while the `assert` expects `81`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 実装を改善する 

テストを通すため、より実際のコードを書きましょう:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

関数が上手く動作することを確認するために、より多くの値をテストしてみましょう。`it` ブロックを手動で書く代わりに、`for` で生成することもできます:

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} in the power 3 is ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

結果:

[iframe height=250 src="pow-3" edit border="1"]

## ネストされた記述 

私たちはさらに多くのテストを追加します。しかしその前にヘルパー関数 `makeTest` と `for` が一緒にグループ化されるべきことに注意しましょう。他のテストでは `makeTest` は不要であり、`for` の中でのみ必要です: それらの共通のタスクは、与えられた累乗で `pow` がどのようになるかを確認することです。

グループ化は、 `describe` をネストすることでできます:

```js
describe("pow", function() {

*!*
  describe("raises x to power 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... より多くのテストが続きます。 descript と it 両方が追加されます
});
```

ネストされた `describe` はテストの新しい "サブグループ" を定義します。出力では、タイトル付けされたインデントとして見ることが出来ます:

[iframe height=250 src="pow-4" edit border="1"]

今後も自身のヘルパー関数と一緒に、トップ階層により多くの `it` や `describe` を追加することができます。また、それらに `makeTest` は見えません。

````smart header="`before/after` と `beforeEach/afterEach`"
テストを実行する前後に実行する `before/after` 関数を設定することができます。また *すべての* `it` の前後で実行する `beforeEach/afterEach` もあります。

例:

```js no-beautify
describe("test", function() {

  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));

  beforeEach(() => alert("Before a test – enter a test"));
  afterEach(() => alert("After a test – exit a test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

実行順序はこうなります:

```
Testing started – before all tests (before)
Before a test – enter a test (beforeEach)
1
After a test – exit a test   (afterEach)
Before a test – enter a test (beforeEach)
2
After a test – exit a test   (afterEach)
Testing finished – after all tests (after)
```

[edit src="beforeafter" title="Open the example in the sandbox."]

<<<<<<< HEAD
通常、`beforeEach/afterEach` (`before/each`) は初期化の実行のために使われ、カウンタをゼロにしたり、テストの間で何かをするときに使われます。
=======
Usually, `beforeEach/afterEach` and `before/after` are used to perform initialization, zero out counters or do something else between the tests (or test groups).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
````

## spec を拡張する 

`pow` の基本的な機能は完成です。開発の最初のイテレーションが完了しました。祝杯を挙げた後は、さらに改良を重ねていきましょう。

前述の通り、関数 `pow(x, n)` は正の整数値 `n`を扱うことを意図しています。

数学的なエラーを示す方法として、JavaScript関数は通常 `NaN` を返します。`n` の不正値を同じようにしましょう。

spec へ、その振る舞いを追加しましょう。:

```js
describe("pow", function() {

  // ...

  it("for negative n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("for non-integer n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));    
*/!*
  });

});
```

新しいテストの結果:

[iframe height=530 src="pow-nan" edit border="1"]

現時点の実装ではサポートされていないので、新たに追加されたテストは失敗します。それが BDD の仕組みです: 最初に失敗するテストを書き、次にそれらのための実装を作ります。

<<<<<<< HEAD
```smart header="他のアサーション"

`assert.isNaN` のアサーションに注目してください: `NaN` のチェックです。

[Chai](http://chaijs.com) には他にもアサーションがあります、例えば:

- `assert.equal(value1, value2)` -- 等しいかどうかをチェックします  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- 厳密な等価チェックをします `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- 上と逆のチェックをします。
- `assert.isTrue(value)` -- `value === true` をチェックします。
- `assert.isFalse(value)` -- `value === false` をチェックします。
- ...[docs](http://chaijs.com/api/assert/)に完全なリストがあります。
=======
```smart header="Other assertions"
Please note the assertion `assert.isNaN`: it checks for `NaN`.

There are other assertions in [Chai](https://www.chaijs.com/) as well, for instance:

- `assert.equal(value1, value2)` -- checks the equality  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- checks the strict equality `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- inverse checks to the ones above.
- `assert.isTrue(value)` -- checks that `value === true`
- `assert.isFalse(value)` -- checks that `value === false`
- ...the full list is in the [docs](https://www.chaijs.com/api/assert/)
```
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

従って、`pow` にいくつかの行を追加します:

```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

これで動作し、すべてのテストが通ります:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Open the full final example in the sandbox."]

## サマリ 

BDDでは、spec が最初で実装はそれに従います。最終的に spec とコードを持つ事になります。

<<<<<<< HEAD
spec は３つの方法で使うことが出来ます:
=======
1. As **Tests** - they guarantee that the code works correctly.
2. As **Docs** -- the titles of `describe` and `it` tell what the function does.
3. As **Examples** -- the tests are actually working examples showing how a function can be used.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

1. **テスト** コードが正しく動作するこをと保証します。
2. **ドキュメント** -- `describe` と `it` のタイトルはその関数がすることを示します。
3. **例** -- テストは実際には関数がどのように使われるのかを見せる、動作するサンプルです。

spec があると、安全に改善、変更、スクラッチで関数の書き直しですらもでき、それがまだ正しく動くことを確認することができます。

関数が多くの場所で使われる場合、大規模なプロジェクトではそれが特に重要になります。このような関数を変更するとき、それを使うすべての箇所で正しく動作するかを手動で確認する方法はありません。

<<<<<<< HEAD
テストがない場合、2つの道があります:

1. たとえ何が起ころうと関係なく、変更(修正)を行います。そして、恐らく手動では何かをチェックしそこない、ユーザがバグに遭遇します。
2. もしくは、エラーへの罰が厳しい場合、人々はこのような関数を変更することを恐れるようになります。そして関数は古くなり、クモの巣が生い茂り誰もその中に入りたくなくなります。それは良いことではありません。

**自動テストコードはその反対です!**
=======
1. To perform the change, no matter what. And then our users meet bugs, as we probably fail to check something manually.
2. Or, if the punishment for errors is harsh, as there are no tests, people become afraid to modify such functions, and then the code becomes outdated, no one wants to get into it. Not good for development.

**Automatic testing helps to avoid these problems!**

If the project is covered with tests, there's just no such problem. After any changes, we can run tests and see a lot of checks made in a matter of seconds.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

もしプロジェクトがテストでカバーされていれば、このような問題はありません。私たちはテストを走らせ、あっという間に多くの確認結果を知ることができます。

<<<<<<< HEAD
**さらに、よくテストされたコードは、より良いアーキテクチャを持っています。**
=======
Naturally, that's because auto-tested code is easier to modify and improve. But there's also another reason.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

もちろん、自動テストされたコードは修正や改善が容易だからです。が、他の理由もあります。

テストを書くためには、すべての関数が明確に記述されたタスク、よく定義された入力と出力を持つようにコードを編成する必要があります。それは最初からよいアーキテクチャであることを意味します。

<<<<<<< HEAD
実際にはそう簡単なことではありません。どのような挙動をするべきかまだ明確でない場合、実際のコードの前に spec を書くのが難しいときもあります。しかし、一般的には、テストを書くことは開発を速く、より安定させます。

チュートリアルの後半では、テストが組み込まれた多くのタスクに出会います。なのでより実用的な例が見られるでしょう。
=======
Later in the tutorial you will meet many tasks with tests baked-in. So you'll see more practical examples.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

テストを書くには、JavaScript に関する十分な知識が必要です。しかし、まだそれらを学び始めたばかりなので、いま時点ではテストを書くのは必須ではありませんが、このチャプターよりも少し複雑な例であってもすでテストを読むことができるはずです。
