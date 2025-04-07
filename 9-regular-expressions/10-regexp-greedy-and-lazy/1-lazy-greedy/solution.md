
<<<<<<< HEAD
結果は: `match:123 4` です。

まず、怠惰 `pattern:\d+?` はできるだけ小さい桁を取ろうとしますが、スペースまで到達する必要があるので、 `match:123` となります。

次に、2つ目の `\d+?` は1桁だけを取ります。なぜならそれで十分だからです。
=======
The result is: `match:123 4`.

First the lazy `pattern:\d+?` tries to take as little digits as it can, but it has to reach the space, so it takes  `match:123`.

Then the second `\d+?` takes only one digit, because that's enough.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
