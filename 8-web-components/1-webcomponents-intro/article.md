<<<<<<< HEAD
# 導入(From the orbital height)

このセクションでは、"web コンポーネント" に関する一連の最新の標準について説明します。

現時点では、これらの標準は開発中です。一部の機能は十分にサポートされており、最新の HTML/DOM の標準に統合されている一方、まだドラフト段階にあるものもあります。どのブラウザでも例を試すことはできますが、Google Chrome がおそらく最も最新です。Google のメンバが関連する仕様の多くを支持しているからだと思います。

## 共通点は...

コンポーネントのアイデア自体は新しいものではありません。これは多くのフレームワークなどで使われています。

実装の詳細に移る前に、この素晴らしい人類の成果を見てください:

![](satellite.jpg)

これは国際宇宙ステーション(ISS)です。

そして、これは内部がどのように作られているかです（おおよそ）

![](satellite-expanded.jpg)

国際宇宙ステーション:
- 多数のコンポーネントから構成されています
- 各コンポーネントは、今度は自身が内部に多くの小さな細部を持っています。
- コンポーネントは非常に複雑で、ほとんどの webサイトよりもはるかに複雑です。
- コンポーネントは、さまざまな言語を話す異なる国のチームによって国際的に開発されています。

...そして、これは飛び、人類は宇宙で生きることができます!

どのようにして、これほど複雑なデバイスは作られるのでしょうか？

我々の開発に同レベルの信頼性と拡張性を実現する、あるいは少なくともそれに近づくためには、どの原則を取り入れることができますか？

## コンポーネントアーキテクチャ

複雑なソフトウェアを開発するための広く知られている規則は、複雑なソフトウェアを作らない、です。

何かが複雑になった場合、それをより単純な複数のパーツに分割し、最も明白な方法でそれらをつなぎます。

**良いアーキテクトは、複雑なものを単純にできる人です。**

ユーザーインターフェースは視覚的なコンポーネントに分割することができます。それぞれがページ上に自身の場所を持ち、あるモデルによってきちんと説明されるタスクを "実行" でき、他のものとは別ものです。

例で Twitter などの webサイトを見てみましょう。

自然にコンポーネントに分割されます。

![](web-components-twitter.svg)

1. トップナビゲーション
2. ユーザ情報
3. おすすめユーザ
4. 投稿フォーム.
5. (6, 7も) -- メッセージ.

コンポーネントはサブコンポーネントを持つことがあります。e.g. メッセージは上位の "メッセージ一覧" コンポーネントの一部かもしれません。クリック可能なユーザ画像自体がコンポーネントになったりすることもあります。

何がコンポーネントかはどのようにして決めますか？それは直感や経験、一般常識からきます。通常それは、それが何をするのか、またページとどのように相互作用するのかという観点から説明できる視覚的なエンティティです。上の例では、ページには区切りがあり、それぞれが自身の役割を果たしています。そのため、これらのコンポーネントを作るのは理にかなっています。

コンポーネントは次のものを持っています。:
- 独自の JavaScript クラス
- DOM 構造: これはそのクラスによってのみ管理され、外部のコードはそこにアクセスしません("カプセル化"の原則)。
- CSS スタイル: コンポーネントに適用されます。
- API: 他のコンポーネントとやり取りするためのイベントやクラスメソッドなどです。

繰り返しますが、"コンポーネント" というもの自体は特別なものではありません。

それらを構築するための多くのフレームワークと開発方法論があり、それぞれ独自のオプション機能を持っています。通常は、"コンポーネント"(CSS スコープと DOM のカプセル化) を提供するのに、特別なCSSクラスと規約が使用されます。

"Web コンポーネント" はそのためのブラウザ組み込みの機能です。なので、もうそれらを自分たちでエミュレートする必要はありません。

- [Custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements) -- カスタムのHTML要素を定義します。
- [Shadow DOM](https://dom.spec.whatwg.org/#shadow-trees) -- 他からは隠された、コンポーネント用の内部DOMを作成します。
- [CSS Scoping](https://drafts.csswg.org/css-scoping/) -- コンポーネントの Shadow DOM 内にのみ適用されるスタイルを宣言します。
- [Event retargeting](https://dom.spec.whatwg.org/#retarget) やその他のいくつかの機能は、カスタムコンポーネントを開発により適したものにするためのものです。

次のチャプターでは、"Custom Elements" -- Web コンポーネントの基本的かつよくサポートされている機能の詳細を見ていきます。
=======
# From the orbital height

This section describes a set of modern standards for "web components".

As of now, these standards are under development. Some features are well-supported and integrated into the modern HTML/DOM standard, while others are yet in draft stage. You can try examples in any browser, Google Chrome is probably the most up to date with these features. Guess, that's because Google fellows are behind many of the related specifications.

## What's common between...

The whole component idea is nothing new. It's used in many frameworks and elsewhere.

Before we move to implementation details, take a look at this great achievement of humanity:

![](satellite.jpg)

That's the International Space Station (ISS).

And this is how it's made inside (approximately):

![](satellite-expanded.jpg)

The International Space Station:
- Consists of many components.
- Each component, in its turn, has many smaller details inside.
- The components are very complex, much more complicated than most websites.
- Components are developed internationally, by teams from different countries, speaking different languages.

...And this thing flies, keeps humans alive in space!

How are such complex devices created?

Which principles could we borrow to make our development same-level reliable and scalable? Or, at least, close to it?

## Component architecture

The well known rule for developing complex software is: don't make complex software.

If something becomes complex -- split it into simpler parts and connect in the most obvious way.

**A good architect is the one who can make the complex simple.**

We can split user interface into visual components: each of them has own place on the page, can "do" a well-described task, and is separate from the others.

Let's take a look at a website, for example Twitter.

It naturally splits into components:

![](web-components-twitter.svg)

1. Top navigation.
2. User info.
3. Follow suggestions.
4. Submit form.
5. (and also 6, 7) -- messages.

Components may have subcomponents, e.g. messages may be parts of a higher-level "message list" component. A clickable user picture itself may be a component, and so on.

How do we decide, what is a component? That comes from intuition, experience and common sense. Usually it's a separate visual entity that we can describe in terms of what it does and how it interacts with the page. In the case above, the page has blocks, each of them plays its own role, it's logical to make these components.

A component has:
- Its own JavaScript class.
- DOM structure, managed solely by its class, outside code doesn't access it ("encapsulation" principle).
- CSS styles, applied to the component.
- API: events, class methods etc, to interact with other components.

Once again, the whole "component" thing is nothing special.

There exist many frameworks and development methodologies to build them, each with its own bells and whistles. Usually, special CSS classes and conventions are used to provide "component feel" -- CSS scoping and DOM encapsulation.

"Web components" provide built-in browser capabilities for that, so we don't have to emulate them any more.

- [Custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements) -- to define custom HTML elements.
- [Shadow DOM](https://dom.spec.whatwg.org/#shadow-trees) -- to create an internal DOM for the component, hidden from the others.
- [CSS Scoping](https://drafts.csswg.org/css-scoping/) -- to declare styles that only apply inside the Shadow DOM of the component.
- [Event retargeting](https://dom.spec.whatwg.org/#retarget) and other minor stuff to make custom components better fit the development.

In the next chapter we'll go into details of "Custom Elements" -- the fundamental and well-supported feature of web components, good on its own.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
