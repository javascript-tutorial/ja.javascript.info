
1. `__proto__` を追加してみましょう:

    ```js run
    let head = {
      glasses: 1
    };

    let table = {
      pen: 3,
      __proto__: head
    };

    let bed = {
      sheet: 1,
      pillow: 2,
      __proto__: table
    };

    let pockets = {
      money: 2000,
      __proto__: bed
    };

    alert( pockets.pen ); // 3
    alert( bed.glasses ); // 1
    alert( table.money ); // undefined
    ```

2. 現代のエンジンにおいて、パフォーマンス面ではオブジェクトもしくはそのプロトタイプからプロパティを取得するかどうかの違いはありません。プロパティが見つかった場所を覚えており、次の要求で再利用します。

    例えば、`pockets.glasses` では、`glasses` (`head` の中)がどこにあるのかを覚えていて、次回そこをすぐに探します。また、何か変更があった場合に内部キャッシュを更新するには十分賢いので、最適化は安全です。
