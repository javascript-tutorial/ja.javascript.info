呼び出し `speedy.eat("apple")` の中で何が起きているか注意深く見ていきましょう。

1. メソッド `speedy.eat` はプロトタイプ(`=hamster`) で見つかり、`this=speedy` (ドットの前のオブジェクト)で実行されます。

2. 次に、`this.stomach.push()` は `stomach` プロパティを見つけ、`push` する必要があります。それは `this` (`=speedy`) の中で `stomach` を探しますが、見つかりません。

3. 次に、プロトタイプチェーンに従って、`hamster` の中で `stomach` を見つけます。

4. そして、`push` を呼び出し、*プロトタイプの stomach* の中に食べ物を追加します。

従って、すべてのハムスターは1つの胃(stomach)を共有しています! 

毎回、`stomach` はプロトタイプから取られ、`stomach.push` は "その場" で変更します。

シンプルな代入 `this.stomach=` の場合には、このようなことは起こらないことに注意してください。:


```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // this.stomach.push の代わりに this.stomach に代入する
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Speedy は食べ物を見つけました
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy の胃は空っぽです
alert( lazy.stomach ); // <nothing>
```

今、すべてうまく行きました。なぜなら `this.stomach=` は `stomach` を参照しないからです。値は直接 `this` オブジェクトに書き込まれます。

また、各ハムスターが自身の胃をもつことで問題を避けることができます:

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// Speedy one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy one's stomach is empty
alert( lazy.stomach ); // <nothing>
```

一般的な解決策として、上の `stomach` のような、特定のオブジェクトの状態を説明するすべてのプロパティは通常そのオブジェクトの中に書かれます。それはこのような問題を防ぎます。
