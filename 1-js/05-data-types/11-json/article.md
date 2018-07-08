# JSON メソッド, toJSON

私たちは複雑なオブジェクトを持っており、それをネットワーク越しに送ったり、単にロギングのためにログ出力するために、文字列に変換したいとしましょう。

当然、このような文字列にはすべての重要なプロパティを含んでいる必要があります。

我々はこのように変換処理を実装することができます:

```js run
let user = {
  name: "John",
  age: 30,

*!*
  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
*/!*
};

alert(user); // {name: "John", age: 30}
```

...しかし開発工程において、新しいプロパティが追加され、古いプロパティがリネームされたり削除されます。このような `toString` を毎回更新するのは苦痛です。その中のプロパティをループすることはできますが、オブジェクトが複雑でプロパティにネストされたオブジェクトがある場合はどうなりますか？ 変換も実装する必要があります。 また、ネットワーク経由でオブジェクトを送信する場合は、オブジェクトを受信側で「読み取る」コードを提供する必要があります。

幸運にも、このすべてを処理するコードを書く必要はありません。このタスクは既に解決されています。

[cut]

## JSON.stringify

[JSON](http://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) は値とオブジェクトを表現する一般的な形式です。[RFC 4627](http://tools.ietf.org/html/rfc4627) で標準として記述されています。当初はJavaScriptのために作られたものでしたが、多くの他の言語は同様にこれを処理するライブラリを持っています。従って、クライアントが JavaScript を使い、サーバが Ruby/PHP/Java/その他 で書かれている場合に、データ交換としてJSONを使うのは簡単です。

JavaScriptはメソッドを提供しています:

- `JSON.stringify` : オブジェクトをJSONに変換します。
- `JSON.parse` : JSONをオブジェクトに変換します。

例えば、ここで student を `JSON.stringify` します:
```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null
};

*!*
let json = JSON.stringify(student);
*/!*

alert(typeof json); // we've got a string!

alert(json);
*!*
/* JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "wife": null
}
*/
*/!*
```

メソッド `JSON.stringify(student)` はオブジェクトを受け、それを文字列に変換します。

結果の `json` 文字列は *JSONエンコードされた*, *シリアライズされた*, *stringified*, *marshalled* オブジェクトと呼ばれます。
これでネットワーク経由で送信するか、シンプルなデータストアに格納する準備ができました。

JSONエンコードされたオブジェクトは、オブジェクトリテラルといくつか重要な違いがあることに注意してください:

- 文字列にはダブルクォートを使います。JSONではシングルクォートやバッククォートはありません。従って　`'John'` は `"John"` になります。
- オブジェクトのプロパティ名もまたダブルクォートで、それは必須です。従って `age:30` は `"age":30` になります。

`JSON.stringify` はプリミティブへも同様に適用できます。

ネイティブにサポートされるJSONタイプは次のとおりです。:

- オブジェクト(Object) `{ ... }`
- 配列(Array) `[ ... ]`
- プリミティブ(Primitives):
    - 文字列(strings),
    - 数値(numbers),
    - 真偽値(boolean values) `true/false`,
    - `null`.

例:

```js run
// a number in JSON is just a number
alert( JSON.stringify(1) ) // 1

// a string in JSON is still a string, but double-quoted
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```

JSONはデータのみのクロスランゲージ仕様なので、JavaScript固有のオブジェクトプロパティの一部は `JSON.stringify` によってスキップされます。

つまり:

- 関数プロパティ(メソッド)
- シンボルプロパティ
- `undefined` を格納しているプロパティ

```js run
let user = {
  sayHi() { // ignored
    alert("Hello");
  },
  [Symbol("id")]: 123, // ignored
  something: undefined // ignored
};

alert( JSON.stringify(user) ); // {} (empty object)
```

通常、それは問題ありません。もしそうしたくない場合、私たちはそのプロセスをカスタマイズすることができます(方法は後ほど)。

このメソッドの素晴らしい点は、入れ子のオブジェクトもサポートされており自動的に変換されることです。

例:

```js run
let meetup = {
  title: "Conference",
*!*
  room: {
    number: 123,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* The whole structure is stringified:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

重要な制限: 循環参照があってはいけません。

例:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup references room
room.occupiedBy = meetup; // room references meetup

*!*
JSON.stringify(meetup); // Error: Converting circular structure to JSON
*/!*
```

ここでは、循環参照(`room.occupiedBy` が `meetup` を参照し、`meetup.place` が `room` を参照している)のため変換が失敗します。:

![](json-meetup.png)


## 除外(Excluding)と変形(transforming): replacer

`JSON.stringify` の完全な構文は次の通りです:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: エンコードする値です。

replacer
: エンコードするプロパティの配列、またはマッピング関数 `function(key, value)` です。

space
: フォーマットで使うスペースの数です。

ほとんどのケースで `JSON.stringify` は最初の引数だけで使用されます。しかし、循環参照をフィルタリングするような置換処理を微調整する必要がある場合は、`JSON.stringify` の第2引数を使用できます。

もしも第2引数にプロパティの配列を渡した場合、それらのプロパティだけがエンコードされます。

例:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conference","participants":[{},{}]}
```

ここでは、私たちはあまりにも厳しいかもしれません。プロパティリストは、オブジェクト構造全体に適用されます。 したがって、`name` はリストにないので、participants は空です。

循環参照を引き起こす `room.occupiedBy` を除いた各プロパティを含めましょう:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

これで、 `occupiedBy` を除くすべてがシリアライズされました。しかし、プロパティのリストがとても長いです。

幸いなことに、配列の代わりに `replacer` 関数を使うことができます。

関数はすべての `(key,value)` ペアで呼ばれ、"置換された" 値を返す必要があります。そしてそれはオリジナルのものの代わりに使われます。

私たちのケースでは、`occupiedBy` 以外のすべてが "そのままの" `value` を返せばOKです。`occupiedBy` を無視するため、下のコードでは `undefied` を返しています:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup が room を参照する
};

room.occupiedBy = meetup; // room が meetup を参照する

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`); // replacer が取得しているものを見るために
  return (key == 'occupiedBy') ? undefined : value;
}));

/* replacer に来た key:value ペア:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
*/
```

`replacer` 関数はネストされたオブジェクトや配列のアイテムを含むすべての key/value ペアを取得することに留意してください。再帰的に適用されます。`replacer` の内側での `this` の値は現在のプロパティを含むオブジェクトです。

最初の呼び出しだけ特別です。これは特別な "ラッパーオブジェクト" (`{"": meetup}`) を使って作られます。 言い換えると、最初の `(key,value)` ペアは空のキーを持ち、値はターゲットのオブジェクト全体です。そういう訳で、上の例の最初の行は `":[object Object]"` となっています。

このアイデアは、できるだけ多くの力を `replace` を提供することです。必要に応じてオブジェクト全体を分析したり、置換/スキップすることができます。


## 書式設定: spacer

`JSON.stringify(value, replacer, spaces)` の第3引数は、行儀の良いフォーマットのために使うスペースの数です。

以前は、すべての stringified されたオブジェクトはインデントや余分なスペースは持っていませんでした。それはネットワーク経由にオブジェクトを送りたいときには正しいです。`spaces` 引数はもっぱら良い出力のために使われます。

ここで、`spaces = 2` はJavaScriptが複数行でネストされたオブジェクトを表示するように指示し、オブジェクトの内側は2つスペースでインデントします:

```js run
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* two-space indents:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* for JSON.stringify(user, null, 4) the result would be more indented:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

`spaces` パラメータは単にロギングや見やすい出力のためだけに使われます。

## "toJSON" のカスタム

文字列変換のための `toString` のように、オブジェクトはJSONへの変換のためのメソッド `toJSON` を提供しています。`JSON.stringify` は利用可能であればそれを自動で呼び出します。

例:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

ここで、`date` `(1)` が文字列になっているのが見えます。これは、すべての date にこのような文字列の種類を返す組み込みの `toJSON` メソッドがあるためです。

さて、オブジェクト `room` にカスタムの `toJSON` を足してみましょう:

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let meetup = {
  title: "Conference",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "room": 23
*/!*
  }
*/
```

上の通り、`toJSON` は `JSON.stringify(room)` の直接呼び出しとネストされたオブジェクト両方で使われます。

## JSON.parse

JSON文字列をデコードするためには、[JSON.parse](mdn:js/JSON/parse) と言う別のメソッドが必要です。

構文:
```js
let value = JSON.parse(str[, reviver]);
```

str
: パースする JSON文字列です。

reviver
: 各 `(key,value)` ペアで呼ばれ、値を変形することができるオプションの関数(function(key,value))です。

例:

```js run
// stringified array
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

次はネストされたオブジェクトの場合です:

```js run
let user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

user = JSON.parse(user);

alert( user.friends[1] ); // 1
```

JSONは必要に応じて複雑になる可能性があり、オブジェクトと配列は他のオブジェクトや配列を含むことができます。しかし、それらは形式に従う必要があります。

ここに手書きのJSONでの典型的な間違いを示します(デバッグ目的で書く必要があるときがあります)。:

```js
let json = `{
  *!*name*/!*: "John",                     // mistake: クォートなしのプロパティ名
  "surname": *!*'Smith'*/!*,               // mistake: 値がシングルクォート (ダブルクォート必須)
  *!*'isAdmin'*/!*: false                  // mistake: キーがシングルクォート (ダブルクォート必須)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // mistake: "new" は許可されていません, 裸の値のみです。
  "friends": [0,1,2,3]              // ここはすべてOKです
}`;
```

加えて、JSONはコメントをサポートしていません。JSONへコメントを追加すると無効になります。

[JSON5](http://json5.org/) と呼ばれる別の形式もあり、それは引用符のないキーや、コメントなどが許可されています。しかし、これはスタンドアローンのライブラリで、言語仕様ではありません。

正規のJSONは、その開発者が怠惰ではなく、簡単で信頼性があり、非常に高速なパースアルゴリズムの実装を可能にするため厳格なものです。

## Using reviver

想像してください -- 私たちはサーバから JSONエンコードされた `meetup` オブジェクトを取得しました。

それはこのように見えます:

```js
// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...そして今、JavaScriptオブジェクトに戻すため、それを *デシリアライズ* する必要があります。

`JSON.parse` を呼び出してそれをしましょう:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Error!
*/!*
```

おっと!エラーです!

`meetup.date` の値は文字列であり、`Date` オブジェクトではありません。どうやれば `JSON.parse` はその文字列を `Date` に変換すべきだと知ることができるでしょうか？

すべての値を "そのまま" で返しますが、`date` は `Date` になるような復帰関数を `JSON.parse` に渡しましょう。:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // now works!
```

ところで、これはネストされたオブジェクトでも同様に動作します:

```js run
let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.meetups[1].date.getDate() ); // works!
*/!*
```



## サマリ

- JSON はほとんどのプログラミング言語に、独自の標準とライブラリを持つデータ形式です。
- JSON はプレーンなオブジェクト、配列、文字列、数値、真偽値、`null` をサポートします。
- JavaScript は JSON にシリアライズするためのメソッド [JSON.stringify](mdn:js/JSON/stringify) と、 JSONから読み込みをする [JSON.parse](mdn:js/JSON/parse) を提供します。
- 両メソッドとも、スマートな読み書きのための変換関数をサポートしています。
- もしもオブジェクトが `toJSON` を持っていたら、`JSON.stringify` がそれを呼び出します。
