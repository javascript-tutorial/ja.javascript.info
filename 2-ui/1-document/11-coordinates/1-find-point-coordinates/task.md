importance: 5

---

# フィールドのウィンドウ座標を見つける

下の iframe では、緑の "フィールド" を持つドキュメントがあります。

矢印でポイントされた角のウィンドウ座標を見つけるために、JavaScript を使用してください。

便宜のために、ドキュメント上に実装している小さな機能があります。任意の場所をクリックすると、そこの座標を表示します。

[iframe border=1 height=360 src="source" link edit]

あなたのコードは次のウィンドウ座標を取得するために DOM を使う必要があります:

<<<<<<< HEAD
1. 左上の外部の角(それはシンプルです)
2. 右下の外部の角(これもシンプルです)
3. 左上の内部の角(少し難しいです)
4. 右下の内部の角(いくつか方法があり、１つを選んでください)
=======
1. Upper-left, outer corner (that's simple).
2. Bottom-right, outer corner (simple too).
3. Upper-left, inner corner (a bit harder).
4. Bottom-right, inner corner (there are several ways, choose one).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

あなたが計算する座標は、マウスクリックで返却されるものと同じであるべきです。

P.S. コードは要素が別のサイズやボーダーの場合でも動作する必要があります。任意の固定値で束縛しないでください。
