importance: 4

---

<<<<<<< HEAD
# アナグラムをフィルタする

[アナグラム](https://en.wikipedia.org/wiki/Anagram) は同じ文字を同じ数だけ持っていますが、異なる順序である単語です。

例えば:
=======
# Filter anagrams

[Anagrams](https://en.wikipedia.org/wiki/Anagram) are words that have the same number of same letters, but in different order.

For instance:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

<<<<<<< HEAD
アナグラムで整理された配列を返す関数 `aclean(arr)` を書いてください。

例:
=======
Write a function `aclean(arr)` that returns an array cleaned from anagrams.

For instance:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
```

<<<<<<< HEAD
すべてのアナグラム・グループから、どれかは問いませんが1つの単語だけ残してください。
=======
From every anagram group should remain only one word, no matter which one.

>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
