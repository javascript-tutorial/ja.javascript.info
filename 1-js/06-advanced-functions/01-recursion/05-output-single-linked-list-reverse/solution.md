# 再帰を利用した方法

ここでは、再帰ロジックは少しトリッキーです。

最初に残りのリストを出力し、*その後* 現在の内容を出力する必要があります:

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

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# ループを使う

<<<<<<< HEAD
ループのバリアントもまた直接出力よりも少し複雑です。
=======
The loop variant is also a little bit more complicated than the direct output.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

我々の `list` で最後の値を取得する方法はありません。また、 "戻る" こともできません。

<<<<<<< HEAD
従って、できることは直接の並びでアイテムを調べて、それらを配列に覚えます。そして逆順で覚えていることを出力していきます。:
=======
So what we can do is to first go through the items in the direct order and remember them in an array, and then output what we remembered in the reverse order:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

再帰的な解法は、実際には全くに同じであることに留意してください。: リストに沿って、(実行コンテキストスタック内の)ネストされた呼び出しのチェーン内の項目を覚え、それらを出力します。
