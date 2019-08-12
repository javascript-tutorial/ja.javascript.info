
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
7 / 0 = Infinity
" -9  " + 5 = " -9  5" // (3)
" -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
```

<<<<<<< HEAD
1. 文字列 `"" + 1` の加算は `1` を文字列に変換します: `"" + 1 = "1"`, そして `"1" + 0` でも同じルールが適用されます。
2. 減算 `"-"` は(ほとんどの算術演算子のように)数値のみで動作し、空文字列 `""` を `0` に変換します。
3. `null` は数値変換後は `0` になります。
4. `undefined` は数値変換後は `NaN` になります。
=======
1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. The addition with a string appends the number `5` to the string.
4. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
5. `null` becomes `0` after the numeric conversion.
6. `undefined` becomes `NaN` after the numeric conversion.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
