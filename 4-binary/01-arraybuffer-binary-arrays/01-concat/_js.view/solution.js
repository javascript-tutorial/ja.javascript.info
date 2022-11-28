function concat(arrays) {
  // sum of individual array lengths
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

<<<<<<< HEAD
  if (!arrays.length) return null;

  let result = new Uint8Array(totalLength);
=======
  let result = new Uint8Array(totalLength);
  
  if (!arrays.length) return result;
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

  // for each array - copy it over result
  // next array is copied right after the previous one
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
