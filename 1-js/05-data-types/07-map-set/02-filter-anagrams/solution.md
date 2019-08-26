すべてのアナグラムを見つけるために、すべての単語を文字に分割してソートしましょう。文字でソートしたとき、すべてのアナグラムは同じです。

例:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

文字でソートされたバリアントをマップキーとして使用して、各キーごとに1つの値しか格納しません。:

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // 単語を文字で分割し、ソートして結合し直します
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

文字ソートは行 `(*)` での呼び出しチェーンで行われています。

便利のために、複数行に分割しましょう:

```js
let sorted = arr[i] // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

2つの異なる単語 `'PAN'` と `'nap'` は同じ文字デソートされた形式 `'anp'` になります。

次の行は単語をマップにセットしています。:

```js
map.set(sorted, word);
```

同じ文字でソートされた単語がもう一度あった場合には、マップ内の同じキーで前の値を上書きします。なので、私たちはいつも文字形式毎に最大1つの単語を持ちます。

最後に、`Array.from(map.values())` でマップの値の反復をし(結果の中でキーは必要ありません)、それらの配列を返却します。

ここでは、`Map` の代わりに通常のオブジェクトを使うこともできます。なぜならキーが文字列だからです。

その場合の解答は次のようになります:

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
