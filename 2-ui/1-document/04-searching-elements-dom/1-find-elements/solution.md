多くの方法があります。

これはそのいくつかです。:

```js
// 1. id="age-table" を持つテーブル
let table = document.getElementById('age-table')

// 2. テーブル内のすべての label 要素
table.getElementsByTagName('label')
// or
document.querySelectorAll('#age-table label')

<<<<<<< HEAD
// 3. そのテーブル内の最初の td (“Age” という言葉を持つ).
=======
// 3. The first td in that table (with the word "Age")
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
table.rows[0].cells[0]
// or
table.getElementsByTagName('td')[0]
// or
table.querySelector('td')

<<<<<<< HEAD
// 4. 名前が search の form.
// name="search" を持つ要素が1つと想定しています
=======
// 4. The form with the name "search"
// assuming there's only one element with name="search" in the document
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let form = document.getElementsByName('search')[0]
// or, form をつけ具体的に
document.querySelector('form[name="search"]')

<<<<<<< HEAD
// 5. フォーム内の最初の input
form.getElementsByTagName('input')
// or
form.querySelector('input')

// 6. フォーム内の最後の input
// それ用の直接のクエリはありません
let inputs = form.querySelectorAll('input') // 全検索
inputs[inputs.length-1] // 最後を取る
=======
// 5. The first input in that form.
form.getElementsByTagName('input')[0]
// or
form.querySelector('input')

// 6. The last input in that form
let inputs = form.querySelectorAll('input') // find all inputs
inputs[inputs.length-1] // take the last one
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
