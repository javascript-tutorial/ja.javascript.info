シンプルな解法は次のようになります:

```js run
*!*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
*/!*

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);
```

それはいくらか動作します。なぜなら `Math.random() - 0.5` は正または負のランダム値なので、ソート関数はランダムに要素を並び替えます。

しかし、ソート関数はこのように使われることを意図していないので、すべての順列が同じ確率を持つわけではありません。

例えば、下のコードを考えてみてください。`shuffle` を 1000000回実行し、可能性のあるすべての順序の出現数をカウントします。:

```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// 可能性のあるすべての順列の出現数
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// 結果を表示します
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

<<<<<<< HEAD
結果例は次の通りです(V8, 2017/7):
=======
An example result (depends on JS engine):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

明らかにバイアスがあることが分かります: `123` と `213` は他のものよりはるかに多く出現しています。

このコードの結果は JavaScriptエンジンによって異なる可能性がありますが、このアプローチが信頼できないことが分かります。

なぜ上手く動作しないのでしょうか？一般に、`sort` は "ブラックボックス" です: 配列と比較関数をそこに投げ、配列がソートされることを期待します。しかし、比較の完全なランダム性によりブラックボックスが狂ってしまい、どの程度狂ってしまうかはエンジンによって異なる具体的な実装に依存します。

このタスクをするための他の良い方法があります。例えば、[Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) と呼ばれる素晴らしいアルゴリズムがあります。この考えは、逆順に配列を見ていき、各要素をその前のランダムな要素と入れ替えます。

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
<<<<<<< HEAD
    let j = Math.floor(Math.random() * (i + 1)); // 0 から i のランダムなインデックス
    [array[i], array[j]] = [array[j], array[i]]; // 要素を入れ替えます
=======
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
}
```

同じ方法でテストしてみましょう。:

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// counts of appearances for all possible permutations
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// show counts of all possible permutations
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

出力例です:

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```

良い感じに見えます: すべての順列は同じ確率で表示されています。

また、Fisher-Yates アルゴリズムはパフォーマンスの面で遥かに優れており、"ソート" のオーバヘッドがありません。
