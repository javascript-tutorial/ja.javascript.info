importance: 5

---

# このテストは何が問題でしょう？

下の `pow` のテストは何が問題でしょう？

```js
it("Raises x to the power n", function() {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});
```

P.S. 構文上、テストは正しいものであり、合格となります。
