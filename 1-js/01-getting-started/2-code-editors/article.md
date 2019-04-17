# コードエディタ

<<<<<<< HEAD
コードエディタはプログラマが最も時間を費やす場所です。

大きく2つのタイプがあります: IDE(統合開発環境)と軽量なエディタです。多くの人々はそれぞれのタイプのツールを1つ選んで使うことが多いです。

[cut]

## IDE

[IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) (統合開発環境)は通常 "プロジェクト全体" での操作をする多くの機能を持ったパワフルなエディタを意味します。つまり、ただのエディタではなく、本格的な "開発環境" です。

IDEはプロジェクト(多くのファイル)をロードし、ファイル間のナビゲーションを可能とし、プロジェクト全体に基づいた自動補完を提供、バージョン管理システム([git](https://git-scm.com/) のような)、テスト環境や他の "プロジェクトレベル" のものと統合します。

もしもまだIDEの選択を検討していないなら、次のようなIDEを見てみてください。

- IntelliJ editors: フロントエンド開発者のための [WebStorm](http://www.jetbrains.com/webstorm/) と他の言語が必要であれば [PHPStorm (PHP)](http://www.jetbrains.com/phpstorm/), [IDEA (Java)](http://www.jetbrains.com/idea/), [RubyMine (Ruby)](http://www.jetbrains.com/ruby/) など。
- .NET 開発者の場合、Visual Studio は良いです。またフリー版も利用可能です ([Visual Studio Community](https://www.visualstudio.com/vs/community/))
- [Aptana](http://www.aptana.com/) や Zend Studio のような Eclipse ベースのプロダクト。
- [Komodo IDE](http://www.activestate.com/komodo-ide) やその軽量のフリー版 [Komodo Edit](http://www.activestate.com/komodo-edit).
- [Netbeans](http://netbeans.org/).

上に挙げたすべてのIDEはWindowとMacの環境で利用でき、Visual Studio以外のIDEはLinuxでも利用できます。

ほとんどのIDEは有償ですが、トライアル期間を持っています。それらのコストはたいてい資格をもつ開発者の給料と比べわずかなので、あなたにとってベストなものを選んでください。
=======
A code editor is the place where programmers spend most of their time.

There are two main types of code editors: IDEs and lightweight editors. Many people use one tool of each type.

## IDE

The term [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) (Integrated Development Environment) refers to a powerful editor with many features that usually operates on a "whole project." As the name suggests, it's not just an editor, but a full-scale "development environment."

An IDE loads the project (which can be many files), allows navigation between files, provides autocompletion based on the whole project (not just the open file), and integrates with a version management system (like [git](https://git-scm.com/)), a testing environment, and other "project-level" stuff.

If you haven't selected an IDE yet, consider the following options:

- [WebStorm](http://www.jetbrains.com/webstorm/) for frontend development. The same company offers other editors for other languages (paid).
- [Netbeans](http://netbeans.org/) (free).

All of these IDEs are cross-platform.

For Windows, there's also "Visual Studio", not to be confused with "Visual Studio Code." "Visual Studio" is a paid and mighty Windows-only editor, well-suited for the .NET platform. A free version of it is called [Visual Studio Community](https://www.visualstudio.com/vs/community/).

Many IDEs are paid but have a trial period. Their cost is usually negligible compared to a qualified developer's salary, so just choose the best one for you.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

## 軽量なエディタ 

"軽量なエディタ" はIDEほど強力ではありませんが、速くエレガントでシンプルです。

<<<<<<< HEAD
主にファイルをすぐに開いて編集するのに使われます。
=======
They are mainly used to open and edit a file instantly.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

"軽量なエディタ"と"IDE"の主な違いは、IDEはプロジェクトレベルで動作するので、開始時により多くのデータをロードし、必要に応じてプロジェクト構造の分析等をします。軽量なエディタは、単一ファイルだけが必要な場合にははるかに速いでしょう。

なお、実際には軽量なエディタもディレクトリレベルの構文解析や自動補完を含む多くのプラグインを持っている場合があります。そのため、軽量なエディタとIDEの間に厳密な境界はありません。

注目に値するものとしては次のような選択肢があります:

<<<<<<< HEAD
- [Visual Studio Code](https://code.visualstudio.com/) (クロスプラットフォーム、フリー).
- [Atom](https://atom.io/) (クロスプラットフォーム、フリー).
- [Sublime Text](http://www.sublimetext.com) (クロスプラットフォーム、シェアウェア).
- [Notepad++](https://notepad-plus-plus.org/) (Windows, フリー).
- 使い方を知っている場合は、Vim や Emacs もまたクールです。
=======
- [Visual Studio Code](https://code.visualstudio.com/) (cross-platform, free) also has many IDE-like features.
- [Atom](https://atom.io/) (cross-platform, free).
- [Sublime Text](http://www.sublimetext.com) (cross-platform, shareware).
- [Notepad++](https://notepad-plus-plus.org/) (Windows, free).
- [Vim](http://www.vim.org/) and [Emacs](https://www.gnu.org/software/emacs/) are also cool if you know how to use them.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

## 私のお気に入り 

著者の個人的な好みはプロジェクトのためのIDEと、素早く簡単にファイル編集するための軽量エディタ、両方を持つことです。

私が使っているのはこれらです:

<<<<<<< HEAD
- JS には [WebStorm](http://www.jetbrains.com/webstorm/), また、プロジェクトでもう1つ言語があるなら[PHPStorm](http://www.jetbrains.com/phpstorm/) (PHP), [IDEA](http://www.jetbrains.com/idea/) (Java), [RubyMine](http://www.jetbrains.com/ruby/) (Ruby)のような Jetbrains の別のエディタを使っています。使ったことはありませんが、他の言語用のものもあります。
- 軽量なエディタとしては -- [Sublime Text](http://www.sublimetext.com) もしくは [Atom](https://atom.io/) です.

もしも何を選べばよいか分からない場合、これらを検討してみてください。

## 議論はしません 

上記のリストのエディタは、私または私がよい開発者だと思っている友人が喜んで長い間利用しているものです。
=======
- As an IDE for JS -- [WebStorm](http://www.jetbrains.com/webstorm/) (I switch to one of the other JetBrains offerings when using other languages)
- As a lightweight editor -- [Sublime Text](http://www.sublimetext.com) or [Atom](https://atom.io/).

## Let's not argue

The editors in the lists above are those that either I or my friends whom I consider good developers have been using for a long time and are happy with.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

この広い世界には他にも素晴らしいエディタがあります。ぜひあなたが最も好きなものを選んでください。

<<<<<<< HEAD
エディタの選択は、他のツールのようにプロジェクト、習慣や個人の趣向によります。
=======
The choice of an editor, like any other tool, is individual and depends on your projects, habits, and personal preferences.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
