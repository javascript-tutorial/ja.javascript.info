
あなたは次のような事に気づけます:

```js no-beautify
function pow(x,n)  // <- 引数の間にスペースがない
{  // <- 別の行に波括弧がある
  let result=1;   // <- = の両側にスペースがない
  for(let i=0;i<n;i++) {result*=x;}   // <- スペースがない
  // { ... } のコンテンツは新しい行に書くべきです
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- 技術的には可能ですが,
// 2行にしたほうがよいです。またスペースもありません。 ; もないです。
if (n<0)  // <- (n < 0) の中にスペースがありません。また、その上に余分な行があるべきです。
{   // <- 波括弧が別の行に分かれています
  // 下は -- 1行が長いです。2行に分けたほうがよいです
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- "} else {" のように1行で書いたほうがいいです。
{
  alert(pow(x,n))  // spaces と ; がありません。
}
```

直したバリアントです:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
} else {
  alert( pow(x, n) );
}
```
