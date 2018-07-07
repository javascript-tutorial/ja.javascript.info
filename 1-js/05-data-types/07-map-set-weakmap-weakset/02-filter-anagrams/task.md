importance: 4

---

# アナグラムをフィルタする

[アナグラム](https://en.wikipedia.org/wiki/Anagram) は同じ文字を同じ数だけ持っていますが、異なる順序である単語です。

例えば:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

アナグラムで整理された配列を返す関数 `aclean(arr)` を書いてください。

例:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
```

すべてのアナグラム・グループから、どれかは問いませんが1つの単語だけ残してください。
