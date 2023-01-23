

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

<<<<<<< HEAD
理由:

1. 明らかに true ですね。
2. 辞書の比較になるので、false です。
3. 再び辞書の比較です。`"2"` の最初の文字は `12` の最初の文字 `"1"` よりも大きいです。
4. 値 `null` と `undefined` は唯一お互いに等しいです。
5. 厳密等価は厳密です。両側が異なる型だと false になります。
6. (4) をみてください。
7. 異なる型の厳密等価です。
=======
Some of the reasons:

1. Obviously, true.
2. Dictionary comparison, hence false. `"a"` is smaller than `"p"`.
3. Again, dictionary comparison, first char `"2"` is greater than the first char `"1"`.
4. Values `null` and `undefined` equal each other only.
5. Strict equality is strict. Different types from both sides lead to false.
6. Similar to `(4)`, `null` only equals `undefined`.
7. Strict equality of different types.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
