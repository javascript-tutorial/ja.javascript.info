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
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f
  genres.append(newOption);

  // 3)
  newOption.selected = true;
</script>
```
