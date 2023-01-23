このテストは、テストを書く時に開発者が出会うテンプレートの1つです。

ここで実際に持っているテストは 3つですが、3つのアサートを持つ1つの関数として並べられています。

この方法で書くほうが簡単な場合もありますが、エラーが起きた時、何が間違っていたのかが明らかではありません。

<<<<<<< HEAD
もし複雑な実行フローの中でエラーが起きた場合、その時のデータを把握する必要があります。実際に *テストをデバッグ* しなければならなくなります。
=======
If an error happens in the middle of a complex execution flow, then we'll have to figure out the data at that point. We'll actually have to *debug the test*.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

テストを、入出力が明白に書かれた複数の `it` ブロックに崩す方がはるかに良いです。

このように:
```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

単一の `it` を `describe` と `it` ブロックのグループに置き換えました。 今何かが失敗した場合、データが何であるかが明確に分かります。

また、`it` の代わりに `it.only` を書くことで、単一のテストに分離し、スタンドアローンモードで実行することができます。


```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // Mocha will run only this block
  it.only("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
