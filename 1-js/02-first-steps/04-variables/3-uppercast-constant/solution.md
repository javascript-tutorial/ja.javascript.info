私たちは一般に、"ハードコード "された定数には大文字を使用します。 つまり、実行前に値がわかっていて、コードに直接書き込まれている場合です。

このコードでは、`birthday` はまさにそうです。なので、大文字を使います。

<<<<<<< HEAD
対照的に、`age` は実行時に評価されます。 今日はある年齢で、1年後に別の年齢になります。コード実行によって変化しないという意味で一定ですがそれは `birthday` より "定数ではありません"。それは計算されるので、小文字を維持する必要があります。
=======
In contrast, `age` is evaluated in run-time. Today we have one age, a year after we'll have another one. It is constant in a sense that it does not change through the code execution. But it is a bit "less of a constant" than `birthday`: it is calculated, so we should keep the lower case for it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
