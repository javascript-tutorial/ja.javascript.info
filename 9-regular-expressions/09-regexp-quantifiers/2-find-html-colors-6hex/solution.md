<<<<<<< HEAD
`#`、それに続く6つの16進数文字を探す必要があります。

16進数文字は `pattern:[0-9a-fA-F]` で表現できます。もしくは `i` フラグを使うと、`pattern:[0-9a-f]` とすることができます。

次に、量指定子 `pattern:{6}` を使い6文字を探すことができます。

結果、正規表現はこのようになります: `pattern:/#[a-f0-9]{6}/gi`.

```js run
let reg = /#[a-f0-9]{6}/gi;

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2"

alert( str.match(reg) );  // #121212,#AA00ef
```

この問題は、より長い一連の色を見つけることです:

```js run
alert( "#12345678".match( /#[a-f0-9]{6}/gi ) ) // #12345678
```

修正するには、末尾に `pattern:\b` を追加します:
=======
We need to look for `#` followed by 6 hexadecimal characters.

A hexadecimal character can be described as `pattern:[0-9a-fA-F]`. Or if we use the `pattern:i` flag, then just  `pattern:[0-9a-f]`.

Then we can look for 6 of them using the quantifier `pattern:{6}`.

As a result, we have the regexp: `pattern:/#[a-f0-9]{6}/gi`.

```js run
let regexp = /#[a-f0-9]{6}/gi;

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2"

alert( str.match(regexp) );  // #121212,#AA00ef
```

The problem is that it finds the color in longer sequences:

```js run
alert( "#12345678".match( /#[a-f0-9]{6}/gi ) ) // #123456
```

To fix that, we can add `pattern:\b` to the end:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
// color
alert( "#123456".match( /#[a-f0-9]{6}\b/gi ) ); // #123456

// not a color
alert( "#12345678".match( /#[a-f0-9]{6}\b/gi ) ); // null
```
