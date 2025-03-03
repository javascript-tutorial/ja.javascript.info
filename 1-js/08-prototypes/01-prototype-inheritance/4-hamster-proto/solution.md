<<<<<<< HEAD
呼び出し `speedy.eat("apple")` の中で何が起きているか注意深く見ていきましょう。

1. メソッド `speedy.eat` はプロトタイプ(`=hamster`) で見つかり、`this=speedy` (ドットの前のオブジェクト)で実行されます。

2. 次に、`this.stomach.push()` は `stomach` プロパティを見つけ、`push` する必要があります。それは `this` (`=speedy`) の中で `stomach` を探しますが、見つかりません。

3. 次に、プロトタイプチェーンに従って、`hamster` の中で `stomach` を見つけます。

4. そして、`push` を呼び出し、*プロトタイプの stomach* の中に食べ物を追加します。

従って、すべてのハムスターは1つの胃(stomach)を共有しています! 

毎回、`stomach` はプロトタイプから取られ、`stomach.push` は "その場" で変更します。

シンプルな代入 `this.stomach=` の場合には、このようなことは起こらないことに注意してください。:

=======
Let's look carefully at what's going on in the call `speedy.eat("apple")`.

1. The method `speedy.eat` is found in the prototype (`=hamster`), then executed with `this=speedy` (the object before the dot).

2. Then `this.stomach.push()` needs to find `stomach` property and call `push` on it. It looks for `stomach` in `this` (`=speedy`), but nothing found.

3. Then it follows the prototype chain and finds `stomach` in `hamster`.

4. Then it calls `push` on it, adding the food into *the stomach of the prototype*.

So all hamsters share a single stomach!

Both for `lazy.stomach.push(...)` and `speedy.stomach.push()`, the property `stomach` is found in the prototype (as it's not in the object itself), then the new data is pushed into it.

Please note that such thing doesn't happen in case of a simple assignment `this.stomach=`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
<<<<<<< HEAD
    // this.stomach.push の代わりに this.stomach に代入する
=======
    // assign to this.stomach instead of this.stomach.push
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
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

<<<<<<< HEAD
// Speedy は食べ物を見つけました
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy の胃は空っぽです
alert( lazy.stomach ); // <nothing>
```

今、すべてうまく行きました。なぜなら `this.stomach=` は `stomach` を参照しないからです。値は直接 `this` オブジェクトに書き込まれます。

また、各ハムスターが自身の胃をもつことで問題を避けることができます:
=======
// Speedy one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy one's stomach is empty
alert( lazy.stomach ); // <nothing>
```

Now all works fine, because `this.stomach=` does not perform a lookup of `stomach`. The value is written directly into `this` object.

Also we can totally avoid the problem by making sure that each hamster has their own stomach:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

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

<<<<<<< HEAD
一般的な解決策として、上の `stomach` のような、特定のオブジェクトの状態を説明するすべてのプロパティは通常そのオブジェクトの中に書かれます。それはこのような問題を防ぎます。
=======
As a common solution, all properties that describe the state of a particular object, like `stomach` above, should be written into that object. That prevents such problems.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
