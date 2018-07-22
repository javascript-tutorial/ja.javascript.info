エラーとなる行はここです:

```js
Rabbit.prototype = Animal.prototype;
```

ここで、`Rabbit.prototype` と `Animal.prototype` は同じオブジェクトになります。なので、両方のクラスのメソッドがそのオブジェクトに混在します。

結果として、`Rabbit.prototyp.walk` は `Animal.prototype.walk` を上書きするので、すべての animals は跳ね始めます(bounce)。:

```js run
function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function() {
  alert(this.name + ' walks');
};

function Rabbit(name) {
  this.name = name;
}

*!*
Rabbit.prototype = Animal.prototype;
*/!*

Rabbit.prototype.walk = function() {
  alert(this.name + " bounces!");
};

*!*
let animal = new Animal("pig");
animal.walk(); // pig bounces!
*/!*
```

正しいバリアントは次の通りです:

```js
Rabbit.prototype.__proto__ = Animal.prototype;
// もしくはこのような形です:
Rabbit.prototype = Object.create(Animal.prototype);
```

これによりプロトタイプは分離され、それぞれ対応するクラスのメソッドを格納します。が、`Rabbit.prototype` は `Animal.prototype` を継承します。
