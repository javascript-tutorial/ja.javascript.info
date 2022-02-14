importance: 5

---

# createTextNode vs innerHTML vs textContent

空のDOM要素 `elem` と文字列 `text` があります。

<<<<<<< HEAD
これら3つのどのコマンドが正確に同じことをするでしょうか？
=======
Which of these 3 commands will do exactly the same?
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
