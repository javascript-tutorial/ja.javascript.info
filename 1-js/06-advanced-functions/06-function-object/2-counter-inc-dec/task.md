importance: 5

---

# カウンタの設定と減少

`makeCounter` のコードを、カウンタを減らしたり、数値を設定できるように修正してください:

<<<<<<< HEAD
- `counter()` は次の数値を返します (前の通り)
- `counter.set(value)` は `count` に `value` をセットします
- `counter.decrease()` は `count` を 1 減少させます
=======
- `counter()` should return the next number (as before).
- `counter.set(value)` should set the counter to `value`.
- `counter.decrease()` should decrease the counter by 1.
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d

完全な使用例はサンドボックスのコードを見てください。

P.S. 現在のカウントを維持するために、クロージャまたは関数プロパティを使うことができます。もしくは両方のバリアントを書いてください。
