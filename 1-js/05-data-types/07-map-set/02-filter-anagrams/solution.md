<<<<<<< HEAD
すべてのアナグラムを見つけるために、すべての単語を文字に分割してソートしましょう。文字でソートしたとき、すべてのアナグラムは同じです。

例:
=======
To find all anagrams, let's split every word to letters and sort them. When letter-sorted, all anagrams are same.

For instance:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

<<<<<<< HEAD
文字でソートされたバリアントをマップキーとして使用して、各キーごとに1つの値しか格納しません。:
=======
We'll use the letter-sorted variants as map keys to store only one value per each key:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
<<<<<<< HEAD
    // 単語を文字で分割し、ソートして結合し直します
=======
    // split the word by letters, sort them and join back
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
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

<<<<<<< HEAD
文字ソートは行 `(*)` での呼び出しチェーンで行われています。

便利のために、複数行に分割しましょう:

```js
let sorted = arr[i] // PAN
=======
Letter-sorting is done by the chain of calls in the line `(*)`.

For convenience let's split it into multiple lines:

```js
let sorted = word // PAN
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

<<<<<<< HEAD
2つの異なる単語 `'PAN'` と `'nap'` は同じ文字デソートされた形式 `'anp'` になります。

次の行は単語をマップにセットしています。:
=======
Two different words `'PAN'` and `'nap'` receive the same letter-sorted form `'anp'`.

The next line put the word into the map:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
map.set(sorted, word);
```

<<<<<<< HEAD
同じ文字でソートされた単語がもう一度あった場合には、マップ内の同じキーで前の値を上書きします。なので、私たちはいつも文字形式毎に最大1つの単語を持ちます。

最後に、`Array.from(map.values())` でマップの値の反復をし(結果の中でキーは必要ありません)、それらの配列を返却します。

ここでは、`Map` の代わりに通常のオブジェクトを使うこともできます。なぜならキーが文字列だからです。

その場合の解答は次のようになります:

```js run
=======
If we ever meet a word the same letter-sorted form again, then it would overwrite the previous value with the same key in the map. So we'll always have at maximum one word per letter-form.

At the end `Array.from(map.values())` takes an iterable over map values (we don't need keys in the result) and returns an array of them.

Here we could also use a plain object instead of the `Map`, because keys are strings.

That's how the solution can look:

```js run demo
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

<<<<<<< HEAD
  return Array.from(Object.values(obj));
=======
  return Object.values(obj);
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
