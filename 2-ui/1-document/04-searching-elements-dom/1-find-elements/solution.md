多くの方法があります。

これはそのいくつかです。:

```js
// 1. id="age-table" を持つテーブル
let table = document.getElementById('age-table')

// 2. テーブル内のすべての label 要素
table.getElementsByTagName('label')
// or
document.querySelectorAll('#age-table label')

// 3. そのテーブル内の最初の td (“Age” という言葉を持つ).
table.rows[0].cells[0]
// or
table.getElementsByTagName('td')[0]
// or
table.querySelector('td')

// 4. 名前が search の form.
// name="search" を持つ要素が1つと想定しています
let form = document.getElementsByName('search')[0]
// or, form をつけ具体的に
document.querySelector('form[name="search"]')

<<<<<<< HEAD
// 5. フォーム内の最初の input
form.getElementsByTagName('input')
=======
// 5. The first input in that form.
form.getElementsByTagName('input')[0]
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
// or
form.querySelector('input')

// 6. フォーム内の最後の input
// それ用の直接のクエリはありません
let inputs = form.querySelectorAll('input') // 全検索
inputs[inputs.length-1] // 最後を取る
```
