解決策:

```html run
<select id="genres">
  <option value="rock">Rock</option>
  <option value="blues" selected>Blues</option>
</select>

<script>
  // 1)
  let selectedOption = genres.options[genres.selectedIndex];
  alert( selectedOption.value );

  // 2)
<<<<<<< HEAD
  let newOption = new Option("classic", "Classic");
=======
  let newOption = new Option("Classic", "classic");
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80
  genres.append(newOption);

  // 3)
  newOption.selected = true;
</script>
```
