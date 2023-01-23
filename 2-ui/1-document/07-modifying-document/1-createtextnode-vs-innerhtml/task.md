importance: 5

---

# createTextNode vs innerHTML vs textContent

空のDOM要素 `elem` と文字列 `text` があります。

<<<<<<< HEAD
これら3つのどのコマンドが正確に同じことをするでしょうか？
=======
Which of these 3 commands will do exactly the same?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
