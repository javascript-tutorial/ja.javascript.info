<<<<<<< HEAD
# フォームの送信: submit のイベントとメソッド
=======
# Forms: event and method submit
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

`submit` イベントはフォームが送信されたときにトリガされます。通常、フォームをサーバーに送信する前に検証したり、送信を中止したり、JavaScriptで処理したりするために使用されます。

メソッド `form.submit()` で JavaScript からのフォーム送信を開始することができます。独自のフォームを動的に作成してサーバーに送信するために使用できます。

それらの詳細を見てみましょう。

<<<<<<< HEAD
[cut]

## イベント: submit
=======
## Event: submit
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

フォームを送信する方法として、主に2つあります。:

1. 1つ目 -- `<input type="submit">` または `<input type="image">` をクリックします。
2. 2つ目 -- input フィールドで `key:Enter` を押します。

両方のアクションは、フォーム上で `submit` イベントにつながります。ハンドラはデータのチェックができ、もしエラーがあればそれらを表示し `event.preventDefault()` を呼び出すと、フォームはサーバには送られません。

以下のフォームで:
1. テキストフィールドで `key:Enter` を押します。
2. `<input type="submit">`

両方のアクションは `alert` を表示し、`return false` としているためフォームはどこにも送られません。:

```html autorun height=60 no-beautify
<form onsubmit="alert('submit!');return false">
  First: Enter in the input field <input type="text" value="text"><br>
  Second: Click "submit": <input type="submit" value="Submit">
</form>
```

````smart header="`submit` と `click` の関係"
input フィールド上で `key:Enter` を使ってフォームが送信されるとき、`<input type="submit">` で `click` イベントがトリガされます。

まったくクリックしていないにもかかわらず起きるので、面白いです。

デモです:
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="Focus here and press enter">
 <input type="submit" value="Submit" *!*onclick="alert('click')"*/!*>
</form>
```

````

## メソッド: submit

`form.submit()` を呼びだすことで、手動でサーバにフォームを送信することができます。

その後、`submit` イベントは生成されません。プログラマが `form.submit()` を呼び出す場合、スクリプトはすでにすべての関連する処理は行われたものとみなされます。

手動でフォームを作成して送信するために使われることがあります。このようになります:

```js run
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// submit するためにフォームはドキュメント内になければなりません
document.body.append(form);

form.submit();
```
