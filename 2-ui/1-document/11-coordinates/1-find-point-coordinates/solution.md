# 外部の角

<<<<<<< HEAD
外部の角は基本的に [elem.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect) から取得したものです。
=======
Outer corners are basically what we get from [elem.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

左上の角 `answer1` と、右下の角 `answer2` の座標は:

```js
let coords = elem.getBoundingClientRect();

let answer1 = [coords.left, coords.top];
let answer2 = [coords.right, coords.bottom];
```

# 左上の内部の角

それはボーダーの幅が外部の角とは異なります。その距離を取得する信頼できる方法は `clientLeft/clientTop` です。:

```js
let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];
```

# 右下の内部の角

我々のケースでは、外部の座標からボーダーのサイズを減算する必要があります。

CSS の方法を使用することができます:

```js
let answer4 = [
  coords.right - parseInt(getComputedStyle(field).borderRightWidth),
  coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth)
];
```

代わりの方法は `clientWidth/clientHeight` を左上の角の座標に足す方法です。おそらくこれはより良い方法でしょう。:

```js
let answer4 = [
  coords.left + elem.clientLeft + elem.clientWidth,
  coords.top + elem.clientTop + elem.clientHeight
];
```
