importance: 5

---

# 継承でのエラー

下のプロトタイプ継承でのエラーを見つけてください。

何が間違っていますか？どのような結果になるでしょうか？

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function() {
  alert(this.name + ' walks');
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = Animal.prototype;

Rabbit.prototype.walk = function() {
  alert(this.name + " bounces!");
};
```
