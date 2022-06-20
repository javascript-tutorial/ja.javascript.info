importance: 5

---

# createTextNode vs innerHTML vs textContent

空のDOM要素 `elem` と文字列 `text` があります。

<<<<<<< HEAD
これら3つのどのコマンドが正確に同じことをするでしょうか？
=======
Which of these 3 commands will do exactly the same?
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
