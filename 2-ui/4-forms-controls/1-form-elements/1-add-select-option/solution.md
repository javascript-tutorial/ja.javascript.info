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
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834
  genres.append(newOption);

  // 3)
  newOption.selected = true;
</script>
```
