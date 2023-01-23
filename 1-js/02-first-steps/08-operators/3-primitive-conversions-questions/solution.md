
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
<<<<<<< HEAD
7 / 0 = Infinity
" -9  " + 5 = " -9  5" // (3)
" -9  " - 5 = -14 // (4)
=======
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

<<<<<<< HEAD
1. 文字列の追加 `"" + 1` では `1` を文字列に変換します: `"" + 1 = "1"`, そして `"1" + 0` には同じルールが適用されます。
2. 減算 `-` (ほとんどの算術演算子と同様)は数値でのみ動作し、空の文字列 `""` を `0` に変換します
3. 文字列の追加は、数値 `5` を文字列に追加します。
4. 減算は常に数値に変換します。そのため、`"  -9  "` は数値 `-9` になります(前後のスペースは無視されます)。
5. `null` は数値変換後は `0` になります。
6. `undefined` は数値変換後は `NaN` になります。
7. 文字列の先頭/末尾のスペースは、文字列が数値に変換される際に削除されます。ここでは文字列全体が `\t` や `\n`、"通常" のスペース文字から構成されています。したがって、空文字列のときと同様、`0` になります。
=======
1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. The addition with a string appends the number `5` to the string.
4. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
5. `null` becomes `0` after the numeric conversion.
6. `undefined` becomes `NaN` after the numeric conversion.
7. Space characters are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
