# ループベースの解法

ループベースの解法のバリアントです:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```

リストを歩くために一時的な変数 `tmp` を使用していることに留意してください。技術的には、代わりに関数パラメータ `list` を使うことができます。:

```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

<<<<<<< HEAD
...しかし、それは賢くありません。将来、リストに何かをするよう、関数を拡張する必要があるかもしれません。もし `list` を変えると、このような能力を失います。
=======
...But that would be unwise. In the future we may need to extend a function, do something else with the list. If we change `list`, then we lose such ability.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

良い変数名について言うと、`list` はここではリスト自身です。その最初の要素です。そして、それはそのままでいるべきです。それは明らかで信頼できるものです。

一方、`tmp` の役割は `for` ループでの `i` のように、排他的なリストのトラバーサルです。

# 再帰的な解法

`printList(list)` の再帰的なバリアントはシンプルなロジックに従います: リストを出力するために、現在の要素 `list` を出力し、`list.next` に対して同じことをします。:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {

  alert(list.value); // 現在のアイテムを出力

  if (list.next) {
    printList(list.next); // 残ったリストに対して同じことをする
  }

}

printList(list);
```

さて、何がベターでしょう？

技術的には、ループはより効率的です。これらの2つのバリアントは同じことをしますが、ループは入れ子の関数呼び出しのためのリソースを消費しません。

別の観点では、再帰のバリアントはより短く、理解しやすい場合があります。
