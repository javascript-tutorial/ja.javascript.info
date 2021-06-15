importance: 5

---

# createTextNode vs innerHTML vs textContent

空のDOM要素 `elem` と文字列 `text` があります。

<<<<<<< HEAD
これら3つのどのコマンドが正確に同じことをするでしょうか？
=======
Which of these 3 commands will do exactly the same?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
