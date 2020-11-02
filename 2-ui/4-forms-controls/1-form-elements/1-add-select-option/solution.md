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
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
  genres.append(newOption);

  // 3)
  newOption.selected = true;
</script>
```
