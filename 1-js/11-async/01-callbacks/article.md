

# 前置き: コールバック

```warn header="ここの例ではブラウザメソッドを使用します"
コールバック、promise や他の抽象的な概念の使用法を示すために、いくつかのブラウザメソッドを使用します。具体的には、スクリプトの読み込みと単純なドキュメント操作の実行です。

これらのメソッドに馴染みがなく、例での使用法がわかりにくい場合、チュートリアルの [次のパート](/document) のいくつかの章を読むことをおすすめします。


```

多くの関数は *非同期* アクションがスケジュールできる JavaScript ホスト環境によって提供されます。つまり、今開始したアクションですが、後で終了します。

例えば、そのような関数の1つとして `setTimeout` 関数があります。

非同期アクションの実際の例は他にもあります。例えばスクリプトとモジュールの読み込みです（後述の章で説明します）。

指定された `src` でスクリプトをロードする関数 `loadScript(src)` を見てください。:

```js
function loadScript(src) {
  // <script> タグを作りページに追加します
  // 指定された src のスクリプトの読み込みを開始し、完了時に実行します
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

これは、指定された `src` をもつ、新たに動的に作成された `<script src="…">` をドキュメントに挿入します。ブラウザは自動的に読み込みを開始し、完了時に実行します。

使用例:

```js
// スクリプトを読み込み、実行する
loadScript('/my/script.js');
```

スクリプトは "非同期に" 実行され、すぐに読み込みを開始しますが、後で（関数がすでに終了した後）実行されます。

また、`loadScript` の下になんらかのコードがある場合、そのコードの実行は、スクリプトの読み込みの終了は待ちません。

```js
loadScript('/my/script.js');
// loadScript の下のコードは
// スクリプトの読み込みが終わるのを待ちません
// ...
```

今、新しいスクリプトを読み込んですぐに使いたいとします。新しい関数が宣言されており、それらを実行したいとします。

しかし、`loadScript(…)` 呼び出しの直後にそれをしても上手く動作しません:

```js
loadScript('/my/script.js'); // このスクリプトは "function newFunction() {…}" を持っています

*!*
newFunction(); // そのような関数はありません!
*/!*
```

当然、ブラウザにはスクリプトをロードする時間はありませんでした。今のところ、`loadScript` 関数は読み込みの完了を追跡する方法を提供していません。スクリプトは読み込まれ、最終的に実行されますが、そのスクリプトの新しい関数や変数を使用するために、それらがいつ起きるのかを知りたいです。

`loadScript` に2つ目の引数に、スクリプトが読み込まれたときに実行する `callback` 関数を追加しましょう:

```js
function loadScript(src, *!*callback*/!*) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(script);
*/!*

  document.head.append(script);
}
```

ロードしたスクリプトにある新しい関数を呼びたい場合は callback に書きます。:

```js
loadScript('/my/script.js', function() {
  // コールバックはスクリプトがロード後に実行されます
  newFunction(); // なので、これは動作します
  ...
});
```

第2引数は、アクションが完了したときに実行される関数（通常は無名）です。

ここで、実際のスクリプトを使った実行可能な例を示します:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

*!*
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // ロードされたスクリプトで宣言されている関数
});
*/!*
```

これは "コールバックベース" と呼ばれる非同期プログラミングのスタイルです。非同期の処理をする関数は、関数が完了した後に実行するための `callback` の引数を提供します。

ここでは `loadScript` でそれを行いましたが、もちろん一般的なアプローチです。

## Callback の中の callback

２つのスクリプトを順次読み込む方法: 最初の１つを読み込み、2つ目はその後に読み込む？

自然な解決策は、2つ目の `loadScript` 呼び出しを callback の中に置くことです。次のようになります:

```js
loadScript('/my/script.js', function(script) {

  alert(`Cool, the ${script.src} is loaded, let's load one more`);

*!*
  loadScript('/my/script2.js', function(script) {
    alert(`Cool, the second script is loaded`);
  });
*/!*

});
```

外側の `loadScript` の完了後、そのコールバックは内側の `loadScript` を開始します。

...仮にもっとスクリプトを読み込みたい場合はどうなりますか？

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...すべてのスクリプトが読み込まれるまで続きます
    });
*/!*

  })

});
```

したがって、すべての新しいアクションはコールバックの中です。アクションが多くない場合は問題ありませんが、多い場合には問題です。そのため、この後別の方法を見ていきます。

## エラーハンドリング

上の例ではエラーを考慮していませんでした。もしスクリプト読み込みが失敗した場合どうしますか？コールバックはそれに対応する必要があります。

これは、読み込みエラーを追跡する `loadScript` の改良版です:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
*/!*

  document.head.append(script);
}
```

これは成功時に `callback(null, script)` を呼び、それ以外の場合には `callback(error)` を呼びます。 

使用方法:
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // エラー処理
  } else {
    // スクリプトの読み込みが成功
  }
});
```

もう一度言いますが、`loadScript` で使った方法は、実際に非常に一般的なものです。これは "エラーファーストなコールバック" スタイルと呼ばれます。

慣例は次の通りです:
1. `callback` の最初の引数は、エラーが発生した場合のために予約されています。そして `callback(err)` が呼ばれます。
2. 2つ目の引数(と必要に応じて以降の引数)は正常な結果を得るためのもので、`callback(null, result1, result2…)` が呼ばれます。

なので、単一の `callback` 関数は、エラー報告と結果渡し両方のために使われます。

## 破滅のピラミッド 

一見すると、これは非同期コーディングの実行可能な方法です。確かにその通りです。1つまたは2つ程度のネストされた呼び出しの場合には問題なく見えます。

しかし、次々に続く複数の非同期アクションの場合、次のようなコードを持つことになります:

```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
  *!*
            // ...すべてのスクリプトが読み込まれるまで続く (*)
  */!*
          }
        });

      }
    })
  }
});
```

上記のコードでは:
1. `1.js` をロードし、エラーがなければ
2. `2.js` をロードします。エラーがなければ
3. `3.js` をロードします。エラーがなければ -- 他の何か `(*)` を行います。

呼び出しがよりネストされるにつれて、特に `...` ではなく、実際により多くのループや条件式などを含むコードがある場合、コードはより深くなり、益々管理が難しくなります。

これは "コールバック地獄" や "破滅のピラミッド" と呼ばれます。

<!--
loadScript('1.js', function(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...
          }
        });
      }
    });
  }
});
-->

![](callback-hell.svg)

ネストされた呼び出しの "ピラミッド" はすべての非同期アクションで右に伸びていきます。すぐに、それは制御不能になります。

したがって、このコーディング方法はあまり良くありません。

私たちは、次のようにすべてのアクションをスタンドアロンの関数にすることで、この問題を軽減することができます。:

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...すべてのスクリプトが読み込まれた後に続く (*)
  }
};
```

どうでしょう？ 同じことをしますが、今や深いネストはありません。なぜならすべてのアクションをトップレベルの関数に分離したからです。

これは機能しますが、コードはばらばらになったスプレッドシートのように見えます。これは読みにくく、そしておそらく気づいたでしょう。1つは、読むには関数間で視点のジャンプが必要です。これは不便で、読者がコードに精通しておらず、どこに視点を移動させたらよいか分からない場合は特に困ります。

また、`step*` という名前の関数はすべて1度きりの使用であり、"破滅のピラミッド" を避けるためだけに作られています。アクションチェーンチェーンの外でこれらを再利用するつもりはありません。そのため、名前空間が少し乱雑です。

より良いものが必要です。

幸いにも、このようなピラミッドを回避する他の方法があります。ベストな方法の1つは次の章で説明する "promise" を使うことです。
