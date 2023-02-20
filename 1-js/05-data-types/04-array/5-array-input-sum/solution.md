些細ですが重要な解法の詳細に注意してください。私たちは、`prompt` のあと、すぐに `value` を数値に変換しません。なぜなら、`value = +value` の後に、ゼロ（有効数字）と空の文字列（停止のサイン）を区別することができないからです。私たちは後ほど代わりにそれを行います。


```js run demo
function sumInput() {

  let numbers = [];

  while (true) {

    let value = prompt("A number please?", 0);

    // should we cancel?
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() );
```
