# JSON メソッド, toJSON

複雑なオブジェクトを持っており、それをネットワーク経由で送ったり、単にログ出力するために文字列に変換したいとします。

もちろん、変換された文字列にはすべての重要なプロパティを含んでいる必要があります。

私たちは、次のように変換処理を実装することができます:

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

...しかし、開発の過程では、新しいプロパティが追加されたり、古いプロパティがリネーム/削除されます。このような状況で `toString` を毎回更新するのは面倒です。オブジェクト中のプロパティをループすることはできますが、オブジェクトが複雑で、プロパティにネストされたオブジェクトがある場合はどうなるでしょうか？ それらの変換処理も実装する必要があります。 また、ネットワーク経由でオブジェクトを送信する場合には、受信側でそれらを「読み取る」ためのコードも提供する必要があります。

幸いにも、これらの処理を行うためにコードを書く必要はありません。この課題は既に解決されています。

## JSON.stringify

[JSON](http://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) は値とオブジェクトを表現する一般的な形式です。[RFC 4627](http://tools.ietf.org/html/rfc4627) で標準として記述されています。当初はJavaScriptのために作られたものでしたが、多くの他の言語も同様に JSON を処理するライブラリを持っています。従って、クライアントが JavaScript を使い、サーバが Ruby/PHP/Java/その他 で書かれている場合に、データ交換としてJSONを使うのは簡単です。

JavaScriptは次のメソッドを提供しています:

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

alert(typeof json); // string です!

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

メソッド `JSON.stringify(student)` はオブジェクトを受け取り、それを文字列に変換します。

<<<<<<< HEAD
結果の `json` 文字列は *JSONエンコードされた*, *シリアライズされた(serialized)*, *文字列化された(stringified)* または *整列化された(marshalled)* オブジェクトと呼ばれます。
これでネットワーク経由で送信したり、シンプルなデータストアに格納する準備ができました。
=======
The resulting `json` string is called a *JSON-encoded* or *serialized* or *stringified* or *marshalled* object. We are ready to send it over the wire or put into a plain data store.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

JSONエンコードされたオブジェクトは、オブジェクトリテラルと比べ、何点か重要な違いがあることに注意してください:

<<<<<<< HEAD
- 文字列にはダブルクォートを使います。JSONにはシングルクォートやバッククォートはありません。従って `'John'` は `"John"` になります。
- オブジェクトのプロパティ名もまたダブルクォートであり、必須です。従って `age:30` は `"age":30` になります。
=======
Please note that a JSON-encoded object has several important differences from the object literal:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

`JSON.stringify` はプリミティブに対しても同様に適用できます。

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
// JSON 内の数値はまさに数値です
alert( JSON.stringify(1) ) // 1

// JSON 内の文字列は文字列のままですが、ダブルクォートです
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```

JSONはデータのみのマルチ言語仕様なので、JavaScript固有のオブジェクトプロパティの一部は `JSON.stringify` ではスキップされます。

つまり、次のようなプロパティは無視されます:

- 関数プロパティ(メソッド)
- シンボルプロパティ
- `undefined` を格納しているプロパティ

```js run
let user = {
  sayHi() { // 無視される
    alert("Hello");
  },
  [Symbol("id")]: 123, // 無視される
  something: undefined // 無視される
};

alert( JSON.stringify(user) ); // {} (空オブジェクト)
```

通常これは問題ありませんが、もしそうしたくない場合、その処理をカスタマイズすることができます(方法は後ほど説明します)。

このメソッドの素晴らしい点は、入れ子のオブジェクトもサポートされており自動的に変換されることです。

例:

```js run
let meetup = {
  title: "Conference",
*!*
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* 構造全体が文字列化されました:
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

meetup.place = room;       // meetup は room を参照
room.occupiedBy = meetup; // room は meetup を参照

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

<<<<<<< HEAD
ほとんどのケースで `JSON.stringify` は最初の引数だけで使用されます。しかし、循環参照をフィルタリングするような置換処理を微調整する必要がある場合は、`JSON.stringify` の第2引数を使用できます。
=======
Most of the time, `JSON.stringify` is used with the first argument only. But if we need to fine-tune the replacement process, like to filter out circular references, we can use the second argument of `JSON.stringify`.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

もしも第2引数にプロパティの配列を渡した場合、それらのプロパティだけがエンコードされます。

例:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup は room を参照
};

room.occupiedBy = meetup; // room は meetup を参照

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conference","participants":[{},{}]}
```

これでは厳しすぎるかもしれません。プロパティリストは、オブジェクト構造全体に適用されるため、`name` はリストに無く、`participants` は空になります。

循環参照を引き起こす `room.occupiedBy` を除いた各プロパティを含めましょう:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup は room を参照
};

room.occupiedBy = meetup; // room は meetup を参照

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

これで、`occupiedBy` を除くすべてがシリアライズされました。しかし、プロパティのリストは非常に長いです。

幸いなことに、そのような場合は配列の代わりに `replacer` 関数を使うことができます。

<<<<<<< HEAD
関数はすべての `(key,value)` ペアで呼ばれ、"置換された" 値を返す必要があります。そしてそれはオリジナルのものの代わりに使われます。
=======
The function will be called for every `(key, value)` pair and should return the "replaced" value, which will be used instead of the original one.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

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

<<<<<<< HEAD
最初の呼び出しだけ特別です。これは特別な "ラッパーオブジェクト" (`{"": meetup}`) を使って作られます。 言い換えると、最初の `(key,value)` ペアは空のキーを持ち、値はターゲットのオブジェクト全体です。そういう訳で、上の例の最初の行は `":[object Object]"` となっています。
=======
The first call is special. It is made using a special "wrapper object": `{"": meetup}`. In other words, the first `(key, value)` pair has an empty key, and the value is the target object as a whole. That's why the first line is `":[object Object]"` in the example above.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

このアイデアは、できるだけ多くの力を `replace` を提供することです。必要に応じてオブジェクト全体を分析したり、置換/スキップすることができます。


## 書式設定: spacer 

`JSON.stringify(value, replacer, spaces)` の第3引数は、整形されたフォーマットで使うスペースの数です。

以前は、すべての文字列化(stringified)されたオブジェクトはインデントや余分なスペースを持っていませんでした。それはネットワーク経由でオブジェクトを送りたいときには正しいです。`spaces` 引数は見やすい出力をしたいときに使われます。

この例では、`spaces = 2` はJavaScriptがネストされたオブジェクトを複数行で表示するように指示し、オブジェクトの内側は2つスペースでインデントします:

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
/* 2つのスペースインデント:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* JSON.stringify(user, null, 4) の場合、結果はよりインデントされたものです:
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

## カスタムの "toJSON" 

<<<<<<< HEAD
文字列変換用の `toString` のように、オブジェクトはJSONへの変換用メソッド `toJSON` を提供しています。`JSON.stringify` は利用可能であればそれを自動で呼び出します。
=======
Like `toString` for string conversion, an object may provide method `toJSON` for to-JSON conversion. `JSON.stringify` automatically calls it if available.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

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

ここで、`date` `(1)` が文字列になっているのが分かります。これは、すべての date にこのような種類の文字列を返す組み込みの `toJSON` メソッドがあるからです。

<<<<<<< HEAD
さて、オブジェクト `room` にカスタムの `toJSON` を足してみましょう:
=======
Now let's add a custom `toJSON` for our object `room` `(2)`:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

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

JSON文字列をデコードするには、[JSON.parse](mdn:js/JSON/parse) と言うメソッドが必要です。

構文:
```js
let value = JSON.parse(str[, reviver]);
```

str
: パースする JSON文字列です。

reviver
<<<<<<< HEAD
: 各 `(key,value)` ペアで呼ばれ、値を変形することができるオプションの関数(function(key,value))です。
=======
: Optional function(key,value) that will be called for each `(key, value)` pair and can transform the value.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

例:

```js run
// 文字列化された配列
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

JSONは必要に応じて複雑になることがあります。オブジェクトと配列には他のオブジェクトや配列を含むことができます。しかし、それらは形式に従う必要があります。

ここに手書きのJSONでの典型的な間違いを示します(デバッグ目的で書かなければならないことがあります)。:

```js
let json = `{
  *!*name*/!*: "John",                     // 誤り: クォートなしのプロパティ名
  "surname": *!*'Smith'*/!*,               // 誤り: 値がシングルクォート (ダブルクォート必須)
  *!*'isAdmin'*/!*: false                  // 誤り: キーがシングルクォート (ダブルクォート必須)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // 誤り: "new" は許可されていません, 裸の値のみです。
  "friends": [0,1,2,3]              // ここはOKです
}`;
```

加えて、JSONはコメントをサポートしていません。JSONへコメントを追加すると無効になります。

[JSON5](http://json5.org/) と呼ばれる別のフォーマットもあり、それは引用符のないキーや、コメントなどが許可されています。しかし、これはスタンドアローンのライブラリで、言語仕様ではありません。

正規のJSONは、その開発者が怠惰なのではなく、簡単で信頼性があり、かつ非常に高速なパースアルゴリズムの実装を可能にするために厳格です。

## リバイバー(reviver)を利用する

私たちはサーバから JSONエンコードされた `meetup` オブジェクトを取得したとイメージしてください。

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

alert( meetup.date.getDate() ); // 動作します!
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
alert( schedule.meetups[1].date.getDate() ); // これも動作します!
*/!*
```


## サマリ 

<<<<<<< HEAD
- JSON はほとんどのプログラミング言語に対して、自身の独立した標準とライブラリを持つデータ形式です。
- JSON はプレーンなオブジェクト、配列、文字列、数値、真偽値、`null` をサポートします。
- JavaScript は JSON にシリアライズするためのメソッド [JSON.stringify](mdn:js/JSON/stringify) と、 JSONから読み込みをする [JSON.parse](mdn:js/JSON/parse) を提供します。
- 両メソッドとも、スマートな読み書きのための変換関数をサポートしています。
- もしもオブジェクトが `toJSON` を持っていたら、`JSON.stringify` がそれを呼び出します。
=======
## Summary

- JSON is a data format that has its own independent standard and libraries for most programming languages.
- JSON supports plain objects, arrays, strings, numbers, booleans, and `null`.
- JavaScript provides methods [JSON.stringify](mdn:js/JSON/stringify) to serialize into JSON and [JSON.parse](mdn:js/JSON/parse) to read from JSON.
- Both methods support transformer functions for smart reading/writing.
- If an object has `toJSON`, then it is called by `JSON.stringify`.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
