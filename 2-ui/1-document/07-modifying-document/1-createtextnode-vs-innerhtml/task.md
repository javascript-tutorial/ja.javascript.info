importance: 5

---

# createTextNode vs innerHTML vs textContent

空のDOM要素 `elem` と文字列 `text` があります。

<<<<<<< HEAD
これら3つのどのコマンドが正確に同じことをするでしょうか？
=======
Which of these 3 commands will do exactly the same?
>>>>>>> f6ae0b5a5f3e48074312ca3e47c17c92a5a52328

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
