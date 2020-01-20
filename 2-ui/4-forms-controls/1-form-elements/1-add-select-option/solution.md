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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
  genres.append(newOption);

  // 3)
  newOption.selected = true;
</script>
```
