<<<<<<< HEAD
# mocha による自動テスト

多くのタスクがある場合、自動テストが使用されます。

それは実際には開発者の "最低限の教育" の一部です。

[cut]
=======
# Automated testing with Mocha

Automated testing will be used in further tasks, and it's also widely used in real projects.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

## なぜテストが必要なのでしょうか？ 

関数を書くとき、通常それが何をすべきかをイメージできます: どのパラメータがどのような結果を与えるか。

開発中、私たちは関数を実行し、その結果と期待値を比較することで確認を行うことができます。例えば、コンソール上でそれを行うことができます。

もし何かが間違っていたら -- コードを直し、再度実行し結果を確認 -- を期待通り動くまで行います。

しかしそのような手動の "再実行" は十分ではありません。

**手動による再実行でのテストは、色々なことを見逃しやすいです。**

例えば、関数 `f` を作っています。ある程度コードを書き、テストします: `f(1)` は動きますが、`f(2)` は動きません。コードを直すと `f(2)` が動くようになります。が、これで完璧でしょうか？ `f(1)` の再テストを忘れており、このケースがエラーになるかもしれません。

これは非常に典型的なパターンです。何かを開発するとき、多くのユースケースの可能性を心に留めます。しかし、全ての変更のたびに手動ですべてをチェックするのをプログラマに期待するのは難しいです。なので、何か1つを直すと別の何かを壊してしまうことは容易に起こります。

<<<<<<< HEAD
**自動テストは、実際のコードに加えてテストが別々に書かれていることを意味します。これにより、それらのテストは簡単に実行でき、すべての主要なユースケースをチェックすることができます。**
=======
**Automated testing means that tests are written separately, in addition to the code. They run our functions in various ways and compare results with the expected.**
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

## ビヘイビア駆動開発(BDD) 

<<<<<<< HEAD
[ビヘイビア駆動開発](http://en.wikipedia.org/wiki/Behavior-driven_development),もしくは BDD と呼ばれるテクニックを使ってみましょう。そのアプローチは多くのプロジェクトで使われています。なお、BDDは単なるテストについてのものではありません。それ以上です。
=======
Let's start with a technique named [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) or, in short, BDD.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

**BDD には3つのことがあります。テスト、ドキュメント、そして例です。**

<<<<<<< HEAD
=======
To understand BDD, we'll examine a practical case of development.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

言葉は十分です。例を見てみましょう。

## "pow" の開発: 仕様 

`x` の `n` 乗をする関数 `pow(x, n)` を作りたいとしましょう。`n≥0` と仮定します。

このタスクは例です: JavaScriptでは既にそれをするための `**` 演算子があります。が、ここではより複雑なタスクに対しても同様に適応が可能な *開発フロー* に集中します。

<<<<<<< HEAD
私たちは、`pow` のコードを作成する前に、関数が何をすべきかを考えます。

このようなことに関する記述は *仕様*、もしくはスペックと呼ばれ、次のようになります:
=======
Such description is called a *specification* or, in short, a spec, and contains descriptions of use cases together with tests for them, like this:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

```js
describe("pow", function() {

  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

上記の通り、仕様は三つの主要な構成要素を持っています:

`describe("title", function() { ... })`
<<<<<<< HEAD
: 何の機能を記述しているか。"ワーカー" -- `it` のブロックのことです、をグループ化するために使います。このケースでは、関数 `pow` について記述しています。

`it("title", function() { ... })`
: `it` のタイトルでは、特定のユースケースを人間が読めるように記述し、２つ目の引数は、それをテストするための関数です。
=======
: What functionality we're describing. In our case we're describing the function `pow`. Used to group "workers" -- the `it` blocks.

`it("use case description", function() { ... })`
: In the title of `it` we *in a human-readable way* describe the particular use case, and the second argument is a function that tests it.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

`assert.equal(value1, value2)`
: `it` ブロックの中のコードです。もし実装が正しければエラーなく実行されます。

<<<<<<< HEAD
    関数 `assert.*` は`pow`が期待通り動作するかをチェックするために使われます。ここでは、その1つを使っています -- `assert.equal`。それは引数を比較し、等しくない場合にエラーを返します。ここでは `pow(2, 3)` の結果が `8` と等しいかをチェックします。

    他のタイプの比較やチェックもたくさんあります。
=======
    Functions `assert.*` are used to check whether `pow` works as expected. Right here we're using one of them -- `assert.equal`, it compares arguments and yields an error if they are not equal. Here it checks that the result of `pow(2, 3)` equals `8`. There are other types of comparisons and checks, that we'll add later.

The specification can be executed, and it will run the test specified in `it` block. We'll see that later.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

## 開発フロー 

開発フローは通常このようになります:

<<<<<<< HEAD
1. 最も基本的な機能のテストと一緒に、初期仕様が書かれます。
2. 初期の実装がされます。
3. それが動くかを確認するため、テストフレームワークである [Mocha](http://mochajs.org/) (より詳細はこの後) を実行します。エラーが表示されます。すべてが動作するまで修正を行います。
4. テストと一緒に、動作する初期の実装ができあがります。
5. まだ実装でサポートされていない可能性のある、より多くのユースケースを仕様(テスト)に追加します。テストは失敗し始めます。
6. 3に戻り、テストのエラーが無くなるまで実装を更新します。
7. 機能が完成するまで3-6のステップを繰り返します。
=======
1. An initial spec is written, with tests for the most basic functionality.
2. An initial implementation is created.
3. To check whether it works, we run the testing framework [Mocha](http://mochajs.org/) (more details soon) that runs the spec. While the functionality is not complete, errors are displayed. We make corrections until everything works.
4. Now we have a working initial implementation with tests.
5. We add more use cases to the spec, probably not yet supported by the implementations. Tests start to fail.
6. Go to 3, update the implementation till tests give no errors.
7. Repeat steps 3-6 till the functionality is ready.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

上で分かる通り、開発は *反復* です。仕様を書き、それを実装し、テストが通ることを確認し、さらにテストを書いて、それらが動作することを確認します。最終的に、動作する実装とテストができ上がります。

<<<<<<< HEAD
私たちのケースでは、最初のステップは完了です: `pow` の初期仕様を持っています。なので実装していきましょう。が、その前にテストが動作すること(テスト自体は失敗しますが)を試してみましょう。
=======
Let's see this development flow in our practical case.

The first step is already complete: we have an initial spec for `pow`. Now, before making the implementation, let's use few JavaScript libraries to run the tests, just to see that they are working (they will all fail).
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

## アクションの仕様 

このチュートリアルでは、テストのために次のJavaScriptライブラリを使います:

- [Mocha](http://mochajs.org/) -- コアフレームワーク: `describe`　や `it` を含む共通のテスト関数と、テストを実行するメインの機能を提供します。
- [Chai](http://chaijs.com) -- 多くのアサーションを持つライブラリ。様々なアサーションを使う事ができます。今は `assert.equal` だけ必要です。
- [Sinon](http://sinonjs.org/) -- 関数をスパイするためのライブラリで、組み込み関数とそれ以上のものをエミュレートします。私たちは、後でこれらを必要とします。

これらのライブラリはブラウザとサーバサイド両方のテストで利用することができます。ここでは、ブラウザの場合について進めます。

それらのフレームワークと `pow` の仕様の完全なHTMLページです:

```html src="index.html"
```

<<<<<<< HEAD
ページは４つのパートに分かれています:
=======
The page can be divided into five parts:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

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
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

## 初期の実装 

テストを通すため、`pow` を実装しましょう:

```js
function pow(x, n) {
  return 8; // :) we cheat!
}
```

おぉ、これでも動作します!

[iframe height=250 src="pow-min" border=1 edit]

## 仕様を改善する 

私たちがしたことは完全にずるです。関数は動作しません: `pow(3, 4)` は正しくない結果を返します。がテストは通ります。

...テストは通るが、関数は誤った動作するという状況は非常に典型的で、実践で起こります。私たちの仕様は不完全であり、ユースケースの追加が必要です。

<<<<<<< HEAD
`pow(3, 4) = 81` を確認するテストを追加しましょう。
=======
Let's add one more test to check that `pow(3, 4) = 81`.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

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

      it("3 raised to power 3 is 27", function() {
        assert.equal(pow(3, 3), 27);
      });

    });
    ```

主な違いは、`assert` がエラーをトリガするとき、 `it` ブロックは直ちに終了することです。そのため、最初の方法では、最初の `assert` が失敗すると2つ目の `assert` の結果は見られません。

テストを分けて作ると、起こっていることに関してより多くの情報を得ることができるので、2つ目の方法のほうが良いでしょう。

それに加えて、従うべきもう一つのルールがあります。

**1つのテストは1つのことを確認します**

もしテストを見て、２つの独立したチェックがその中にある場合、分割して2つのシンプルなテストにするほうが良いです。

なので、2つ目の方法で進めていきましょう。

結果:

[iframe height=250 src="pow-2" edit border="1"]

予想通り、2つ目のテストは失敗しました。もちろん、`assert` が `27` を期待する一方、関数は常に `8` を返します。

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
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b
````

## 仕様を拡張する 

`pow` の基本的な機能は完成です。開発の最初のイテレーションをしました。我々の仕事を祝った後は、 -- それを続けて改善しましょう。

前述の通り、関数 `pow(x, n)` は正の整数値 `n`を扱うことを意図しています。

数学的なエラーを示す方法として、JavaScript関数は通常 `NaN` を返します。`n` の不正値を同じようにしましょう。

仕様(!)へ、その振る舞いを追加しましょう。:

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

現時点の実装はそれらをサポートしていないので、新たに追加されたテストは失敗します。それが BDD の仕組みです: 最初に失敗するテストを書き、次にそれらのための実装を作ります。

<<<<<<< HEAD
```smart header="他のアサーション"

`assert.isNaN` のアサーションに注目してください: `NaN` のチェックです。

Chaiには他にもアサーションがあります、例えば:
=======
```smart header="Other assertions"
Please note the assertion `assert.isNaN`: it checks for `NaN`.

There are other assertions in [Chai](http://chaijs.com) as well, for instance:
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

- `assert.equal(value1, value2)` -- 等しいかどうかをチェックします  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- 厳密な等価チェックをします `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- 上と逆のチェックをします。
- `assert.isTrue(value)` -- `value === true` をチェックします。
- `assert.isFalse(value)` -- `value === false` をチェックします。
- ...[docs](http://chaijs.com/api/assert/)に完全なリストがあります。

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

これで動作し、全てのテストが通ります:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Open the full final example in the sandbox."]

<<<<<<< HEAD
## サマリ 
=======
## Summary

In BDD, the spec goes first, followed by implementation. At the end we have both the spec and the code.

The spec can be used in three ways:

1. As **Tests** - they guarantee that the code works correctly.
2. As **Docs** -- the titles of `describe` and `it` tell what the function does.
3. As **Examples** -- the tests are actually working examples showing how a function can be used.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

BDDでは、仕様が最初で実装はそれに従います。最終的に仕様とコードを持つ事になります。

仕様は３つの方法で使うことが出来ます:

1. **テスト** コードが正しく動作するこをと保証します。
2. **ドキュメント** -- `describe` と `it` のタイトルはその関数がすることを示します。
3. **例** -- テストは実際には関数がどのように使われるのかを見せる、動作するサンプルです。

<<<<<<< HEAD
仕様があると、安全に改善、変更、スクラッチで関数の書き直しですらもでき、それがまだ正しく動くことを確認することができます。

関数が多くの場所で使われる場合、大規模なプロジェクトではそれが特に重要になります。このような関数を変更するとき、それを使う全ての箇所で正しく動作するかを手動で確認する方法はありません。

テストがない場合、2つの道があります:
=======
1. To perform the change, no matter what. And then our users meet bugs, as we probably fail to check something manually.
2. Or, if the punishment for errors is harsh, as there are no tests, people become afraid to modify such functions, and then the code becomes outdated, no one wants to get into it. Not good for development.

**Automatic testing helps to avoid these problems!**

If the project is covered with tests, there's just no such problem. After any changes, we can run tests and see a lot of checks made in a matter of seconds.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

1. たとえ何が起ころうと関係なく、変更(修正)を行います。そして、我々のユーザはバグを見つけ、それを報告します。これが許されるのであれば。
2. もしくは、エラーへの罰が厳しい場合、人々はこのような関数を変更することを恐れるようになります。そして関数は古くなり、クモの巣が生い茂り誰もその中に入りたくなくなります。それは良いことではありません。

<<<<<<< HEAD
**自動テストコードはその反対です!**
=======
Naturally, that's because auto-tested code is easier to modify and improve. But there's also another reason.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

もしプロジェクトがテストでカバーされていれば、このような問題はありません。私たちはテストを走らせ、あっという間に多くの確認結果を知ることができます。

**さらに、よくテストされたコードは、より良いアーキテクチャを持っています。**

<<<<<<< HEAD
無論、変更や改善が容易だからですが、それだけではありません。

テストを書くためには、すべての関数が明確に記述されたタスク、よく定義された入力と出力を持つようにコードを編成する必要があります。それは最初からよいアーキテクチャであることを意味します。
=======
Later in the tutorial you will meet many tasks with tests baked-in. So you'll see more practical examples.
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b

実際にはそう簡単なことではありません。どのような挙動をするべきかまだ明確でない場合、実際のコードの前に仕様を書くのが難しいときもあります。しかし、一般的には、テストを書くことは開発を速く、より安定させます。
