私たちは文字列としてテーブルを作成します: `"<table>...</table>"` 、そしてそれを `innerHTML` に代入します。

アルゴリズムは次の通りです:

<<<<<<< HEAD
1. `<th>` と曜日名でテーブルヘッダを作成します。
2. 日付オブジェクト `d = new Date(year, month-1)` を生成します。これは `month` の最初の日です(JavaScriptでの月は `1` からではなく `0` から開始することを考慮してください)。
3. 月の最初の日 `d.getDay()` までの最初の数個のセルは空であるかもしれません。 それらを `<td></td>` で埋めましょう。
4. `d` で日を増やしましょう: `d.setDate(d.getDate()+1)` 。もし `d.getMonth()` がまだ次の月ではない場合、カレンダーに新しいセル `<td>` を追加します。もしそれが日曜であれば、改行 <code>"&lt;/tr&gt;&lt;tr&gt;"</code> を追加します。
5. もし月は終わりだが、行はまだ埋まっていない場合は、空の `<td>` を追加し、四角形を作ります。
=======
1. Create the table header with `<th>` and weekday names.
2. Create the date object `d = new Date(year, month-1)`. That's the first day of `month` (taking into account that months in JavaScript start from `0`, not `1`).
3. First few cells till the first day of the month `d.getDay()` may be empty. Let's fill them in with `<td></td>`.
4. Increase the day in `d`: `d.setDate(d.getDate()+1)`. If `d.getMonth()` is not yet the next month, then add the new cell `<td>` to the calendar. If that's a Sunday, then add a newline <code>"&lt;/tr&gt;&lt;tr&gt;"</code>.
5. If the month has finished, but the table row is not yet full, add empty `<td>` into it, to make it square.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
