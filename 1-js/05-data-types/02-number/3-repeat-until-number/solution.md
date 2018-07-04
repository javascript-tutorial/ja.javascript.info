
```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Enter a number please?", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;

  return +num;
}

alert(`Read: ${readNumber()}`);
```

`null`/空行を処理する必要がある分、この解答はすこし入り組んでいます。

実際には、入力が「通常の数字」になるまで入力を受け入れます。`null` (キャンセル)と空行、両方とも数値形式では `0` なので、その条件にフィットしています。

停止した後、`null` と空行特別に扱う必要がります(`null` を返す)、なぜならそれらの数値への変換は `0` になるためです。
