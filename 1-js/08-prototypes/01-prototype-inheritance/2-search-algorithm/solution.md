
<<<<<<< HEAD
1. `__proto__` を追加してみましょう:
=======
1. Let's add `__proto__`:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

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

<<<<<<< HEAD
2. 現代のエンジンにおいて、パフォーマンス面ではオブジェクトもしくはそのプロトタイプからプロパティを取得するかどうかの違いはありません。プロパティが見つかった場所を覚えており、次の要求で再利用します。

    例えば、`pockets.glasses` では、`glasses` (`head` の中)がどこにあるのかを覚えていて、次回そこをすぐに探します。また、何か変更があった場合に内部キャッシュを更新するには十分賢いので、最適化は安全です。
=======
2. In modern engines, performance-wise, there's no difference whether we take a property from an object or its prototype. They remember where the property was found and reuse it in the next request.

    For instance, for `pockets.glasses` they remember where they found `glasses` (in `head`), and next time will search right there. They are also smart enough to update internal caches if something changes, so that optimization is safe.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
