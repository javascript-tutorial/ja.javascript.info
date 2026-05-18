<<<<<<< HEAD
# 完全なタグを見つける

タグ `<style...>` を見つける正規表現を書いてください。それは完全なタグにマッチする必要があります: 属性を持たない `<style>`, またはいくつかの属性をもつ `<style type="..." id="...">`。

...しかし正規表現は `<styler>` にマッチしてはいけません!

例:

```js
let reg = /your regexp/g;

alert( '<style> <styler> <style test="...">'.match(reg) ); // <style>, <style test="...">
=======
# Find the full tag

Write a regexp to find the tag `<style...>`. It should match the full tag: it may have no attributes  `<style>` or have several of them `<style type="..." id="...">`.

...But the regexp should not match `<styler>`!

For instance:

```js
let regexp = /your regexp/g;

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
```
