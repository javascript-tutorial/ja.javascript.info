
あなたは次のような事に気づけます:

```js no-beautify
<<<<<<< HEAD
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
=======
function pow(x,n)  // <- no space between arguments
{  // <- figure bracket on a separate line
  let result=1;   // <- no spaces before or after =
  for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
  // the contents of { ... } should be on a new line
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- figure bracket on a separate line
  // below - long lines can be split into multiple lines for improved readability
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- "} else {" のように1行で書いたほうがいいです。
{
<<<<<<< HEAD
  alert(pow(x,n))  // spaces と ; がありません。
=======
  alert(pow(x,n))  // no spaces and missing ;
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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

if (n <= 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
} else {
  alert( pow(x, n) );
}
```
