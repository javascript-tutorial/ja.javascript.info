# フォームプロパティとメソッド

フォームや `<input>` のようなコントロール要素は多くの特別なプロパティやイベントを持っています。

<<<<<<< HEAD
それらを知っていると、フォームを使った作業がはるかに便利になります。

[cut]
=======
Working with forms will be much more convenient when we learn them.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## ナビゲーション: フォームと要素 

ドキュメントフォームは特別な集合 `document.forms` のメンバです。

<<<<<<< HEAD
それは *名付けされた* 集合で、名前と数字の両方を使ってフォームを取得することができます。

```js no-beautify
document.forms.my - name="my" のフォーム
document.forms[0] - ドキュメント中の最初のフォーム
=======
That's a so-called *"named collection"*: it's both named and ordered. We can use both the name or the number in the document to get the form.

```js no-beautify
document.forms.my; // the form with name="my"
document.forms[0]; // the first form in the document
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

フォームをもつと、名前付けされた集合 `forms.elements` で、任意の要素が利用可能です。

例:

```html run height=40
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<script>
  // フォーム取得
  let form = document.forms.my; // <form name="my"> element

  // 要素取得
  let elem = form.elements.one; // <input name="one"> element

  alert(elem.value); // 1
</script>
```

<<<<<<< HEAD
同じ名前で複数の要素がある可能性があり、それはラジオボタンの場合がよくあります。

この場合、`form.elements[name]` は集合です、例えば:
=======
There may be multiple elements with the same name. This is typical with radio buttons and checkboxes.

In that case, `form.elements[name]` is a *collection*. For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run height=40
<form>
  <input type="radio" *!*name="age"*/!* value="10">
  <input type="radio" *!*name="age"*/!* value="20">
</form>

<script>
let form = document.forms[0];

let ageElems = form.elements.age;

<<<<<<< HEAD
alert(ageElems[0].value); // 10, 1つ目の input の値
</script>
```

これらのナビゲーションプロパティはタグ構造には依存しません。すべての要素はフォーム中での深さに関係なく `form.elements` で利用可能です。


````smart header="\"サブフォーム\"としてのフィールドセット"
フォームは１つ以上の `<fieldset>` 要素をその中にもっている場合があります。それらも `elements` プロパティでサポートされています。
=======
*!*
alert(ageElems[0]); // [object HTMLInputElement]
*/!*
</script>
```

These navigation properties do not depend on the tag structure. All control elements, no matter how deep they are in the form, are available in `form.elements`.


````smart header="Fieldsets as \"subforms\""
A form may have one or many `<fieldset>` elements inside it. They also have `elements` property that lists form controls inside them.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:

```html run height=80
<body>
  <form id="form">
    <fieldset name="userFields">
      <legend>info</legend>
      <input name="login" type="text">
    </fieldset>
  </form>

  <script>
    alert(form.elements.login); // <input name="login">

*!*
    let fieldset = form.elements.userFields;
    alert(fieldset); // HTMLFieldSetElement

<<<<<<< HEAD
    // フォームとフィールドセット両方から input を取得することができます
=======
    // we can get the input by name both from the form and from the fieldset
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    alert(fieldset.elements.login == form.elements.login); // true
*/!*
  </script>
</body>
```
````

````warn header="より短い記法: `form.name`"
より短い記法があります: `form[index/name]` で要素にアクセスすることができます。

<<<<<<< HEAD
`form.elements.login` の代わりに、`form.login` と書けます。
=======
In other words, instead of `form.elements.login` we can write `form.login`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

これも動作しますが、小さな問題があります: もし要素にアクセスし、その後でその `name` を変えた場合、依然として古い名前で利用可能です(新しい名前と同様に)。

例で簡単に見れます:

```html run height=40
<form id="form">
  <input name="login">
</form>

<script>
  alert(form.elements.login == form.login); // true, 同じ <input>

  form.login.name = "username"; // input の名前を変更

  // form.elements は name を更新:
  alert(form.elements.login); // undefined
  alert(form.elements.username); // input

*!*
<<<<<<< HEAD
  // 直アクセスは両方の名前が使用可能
=======
  // form allows both names: the new one and the old one
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  alert(form.username == form.login); // true
*/!*
</script>
```

<<<<<<< HEAD
これは通常は問題ではありません。なぜならフォーム要素の名前を変えることは殆どないからです。
=======
That's usually not a problem, however, because we rarely change names of form elements.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

````

## 後方参照: element.form 

<<<<<<< HEAD
任意の要素に対して、フォームは `element.form` として利用可能です。そのため、フォームはすべての要素を参照し、要素はフォームを参照します。
=======
For any element, the form is available as `element.form`. So a form references all elements, and elements reference the form.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

これはその図です:

![](form-navigation.svg)

例:

```html run height=40
<form id="form">
  <input type="text" name="login">
</form>

<script>
*!*
  // form -> element
  let login = form.login;

  // element -> form
  alert(login.form); // HTMLFormElement
*/!*
</script>
```

## フォーム要素 

<<<<<<< HEAD
それぞれの機能に注意を払いながら、フォームコントロールについて話しましょう。
=======
Let's talk about form controls.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

### input と textarea

<<<<<<< HEAD
通常、チェックボックスに対しては `input.value` または `input.checked` で値にアクセスできます。
=======
We can access their value as `input.value` (string) or `input.checked` (boolean) for checkboxes and radio buttons.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

このように:

```js
input.value = "New value";
textarea.value = "New text";

input.checked = true; // チェックボックスやラジオボタンの場合
```

<<<<<<< HEAD
```warn header="`textarea.innerHTML` ではなく `textarea.value` を使います"
決して `textarea.innerHTML` は使わないよう注意してください。それは現在の値ではなく、ページの初期時点の HTML のみを保持しています。
=======
```warn header="Use `textarea.value`, not `textarea.innerHTML`"
Please note that even though `<textarea>...</textarea>` holds its value as nested HTML, we should never use `textarea.innerHTML` to access it.

It stores only the HTML that was initially on the page, not the current value.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

### select と option

`<select>` 要素は3つの重要なプロパティを持っています:

<<<<<<< HEAD
1. `select.options` -- `<option>` 要素の集合です,
2. `select.value` -- 選ばれた選択肢の値です,
3. `select.selectedIndex` -- 選ばれた選択肢の番号です.

従って、 `<select>` の値を設定するのに 3つの方法があります。:

1. 必要な `<option>` を見つけて、`option.selected` を `true` に設定する.
2. `select.value` に値を設定する。
3. `select.selectedIndex` に option の番号を設定する。

最初の方法が最も明白ですが、`(2)` と `(3)` は通常はより便利です。

例:
=======
1. `select.options` -- the collection of `<option>` subelements,
2. `select.value` -- the *value* of the currently selected `<option>`,
3. `select.selectedIndex` -- the *number* of the currently selected `<option>`.

They provide three different ways of setting a value for a `<select>`:

1. Find the corresponding `<option>` element (e.g. among `select.options`) and set its `option.selected` to `true`.
2. If we know a new value: set `select.value` to the new value.
3. If we know the new option number: set `select.selectedIndex` to that number.

Here is an example of all three methods:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run
<select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>

<script>
<<<<<<< HEAD
  // この３行はすべて同じことをしています
  select.options[2].selected = true;
=======
  // all three lines do the same thing
  select.options[2].selected = true; 
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  select.selectedIndex = 2;
  select.value = 'banana';
  // please note: options start from zero, so index 2 means the 3rd option.
</script>
```

<<<<<<< HEAD
他のコントロールとは違い、`<select multiple>` は複数の選択を許可します。この場合、すべての選択された値を取得するには、`select.options` を参照する必要があります。

次のようになります:
=======
Unlike most other controls, `<select>` allows to select multiple options at once if it has `multiple` attribute. This attribute is rarely used, though.

For multiple selected values, use the first way of setting values: add/remove the `selected` property from `<option>` subelements.

Here's an example of how to get selected values from a multi-select:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // get all selected values from multi-select
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock  
</script>
```

<<<<<<< HEAD
`<select>` 要素の完全な仕様は <https://html.spec.whatwg.org/multipage/forms.html#the-select-element> にあります。

### new Option

[option 要素](https://html.spec.whatwg.org/multipage/forms.html#the-option-element)には、`<option>` 要素を作成するための簡単でナイスな構文があります。:
=======
The full specification of the `<select>` element is available in the specification <https://html.spec.whatwg.org/multipage/forms.html#the-select-element>.

### new Option

In the [specification](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) there's a nice short syntax to create an `<option>` element:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
option = new Option(text, value, defaultSelected, selected);
```

<<<<<<< HEAD
パラメータ:

- `text` -- option 内のテキスト,
- `value` -- option の値,
- `defaultSelected` -- `true` の場合、`selected` 属性が作られます,
- `selected` -- `true` の場合、 option が選択されます.

例:
=======
This syntax is optional. We can use `document.createElement('option')` and set attributes manually. Still, it may be shorter, so here are the parameters:

- `text` -- the text inside the option,
- `value` -- the option value,
- `defaultSelected` -- if `true`, then `selected` HTML-attribute is created,
- `selected` -- if `true`, then the option is selected.

The difference between `defaultSelected` and `selected` is that `defaultSelected` sets the HTML-attribute (that we can get using `option.getAttribute('selected')`, while `selected` sets whether the option is selected or not.

In practice, one should usually set _both_ values to `true` or `false`. (Or, simply omit them; both default to `false`.)

For instance, here's a new "unselected" option:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let option = new Option("Text", "value");
// creates <option value="value">Text</option>
```

<<<<<<< HEAD
選択された同じ要素です:
=======
The same option, but selected:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let option = new Option("Text", "value", true, true);
```

<<<<<<< HEAD
```smart header="`<option>` の追加のプロパティ"
Option 要素は追加のプロパティを持っています:

`selected`
: 選択されているか.

`index`
: その `<select>` の中で何番目の option であるか

`text`
: option のテキストコンテンツ
```
=======
Option elements have properties:

`option.selected`
: Is the option selected.

`option.index`
: The number of the option among the others in its `<select>`.

`option.text`
: Text content of the option (seen by the visitor).

## References

- Specification: <https://html.spec.whatwg.org/multipage/forms.html>.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## サマリ 

フォームのナビゲーション:

`document.forms`
: フォームは `document.forms[name/index]` で利用可能です。

`form.elements`  
: フォーム要素は `form.elements[name/index]` または単に `form[name/index]` で利用可能です。`elements` プロパティは `<fieldset>` に対しても機能します。

`element.form`
: 要素は `form` プロパティでフォームを参照します。

<<<<<<< HEAD
値は `input.value`, `textarea.value`, `select.value` など、もしくはチェックボックスやラジオボタンに対しては `input.checked` として利用可能です。

`<select>` の場合、インデックス `select.selectedIndex` や、選択肢の集合 `select.options` を通じて値を取得することもできます。これや他の要素の完全な仕様は <https://html.spec.whatwg.org/multipage/forms.html> にあります。

これらはフォームを使って作業を始めるための基本です。 次のチャプターでは、どの要素でも発生する可能性のある `focus` イベントと `blur` イベントについて説明しますが、ほとんどはフォームで処理されます。
=======
Value is available as `input.value`, `textarea.value`, `select.value`, etc. (For checkboxes and radio buttons, use `input.checked` to determine whether a value is selected.)

For `<select>`, one can also get the value by the index `select.selectedIndex` or through the options collection `select.options`.

These are the basics to start working with forms. We'll meet many examples further in the tutorial.

In the next chapter we'll cover `focus` and `blur` events that may occur on any element, but are mostly handled on forms.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
