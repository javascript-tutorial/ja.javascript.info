# 完全なタグを見つける

タグ `<style...>` を見つける正規表現を書いてください。それは完全なタグにマッチする必要があります: 属性を持たない `<style>`, またはいくつかの属性をもつ `<style type="..." id="...">`。

...しかし正規表現は `<styler>` にマッチしてはいけません!

例:

```js
let reg = /your regexp/g;

alert( '<style> <styler> <style test="...">'.match(reg) ); // <style>, <style test="...">
```
