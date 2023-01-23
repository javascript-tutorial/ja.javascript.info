<<<<<<< HEAD
# 引用符で囲まれた文字列を見つける

ダブルクォート `subject:"..."` 内の文字列を見つける正規表現を作成してください。

重要なことは、文字列は JavaScript の文字列がするのと同じ方法でエスケープをサポートする必要があるということです。例えば、引用符は `subject:\"` として挿入でき、改行は `subject:\n` 、スラッシュ自身は `subject:\\` です。
=======
# Find quoted strings

Create a regexp to find strings in double quotes `subject:"..."`.

The strings should support escaping, the same way as JavaScript strings do. For instance, quotes can be inserted as `subject:\"` a newline as `subject:\n`, and the backslash itself as `subject:\\`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let str = "Just like \"here\".";
```

<<<<<<< HEAD
エスケープされた引用符 `subject:\"` は文字列を終了しないことが重要です。

そのため、途中でエスケープされた引用符は無視して、ある引用符から他の引用符に目を向ける必要があります。

これがこのタスクの肝心な部分です。そうでなければ答えは明らかです。

マッチさせる文字列の例です:
```js
.. *!*"test me"*/!* ..  
.. *!*"Say \"Hello\"!"*/!* ... (内側にエスケープされた引用符がある)
.. *!*"\\"*/!* ..  (内側にダブルスラッシュがある)
.. *!*"\\ \""*/!* ..  (内側にダブルスラッシュとエスケープされた引用符がある)
```

JavaScript では、次のように、そのまま文字列として渡すにはスラッシュを2重にする必要があります:
=======
Please note, in particular, that an escaped quote `subject:\"` does not end a string.

So we should search from one quote to the other ignoring escaped quotes on the way.

That's the essential part of the task, otherwise it would be trivial.

Examples of strings to match:
```js
.. *!*"test me"*/!* ..  
.. *!*"Say \"Hello\"!"*/!* ... (escaped quotes inside)
.. *!*"\\"*/!* ..  (double backslash inside)
.. *!*"\\ \""*/!* ..  (double backslash and an escaped quote inside)
```

In JavaScript we need to double the backslashes to pass them right into the string, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

<<<<<<< HEAD
// メモリ内部の文字列
=======
// the in-memory string
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
alert(str); //  .. "test me" .. "Say \"Hello\"!" .. "\\ \"" ..
```
