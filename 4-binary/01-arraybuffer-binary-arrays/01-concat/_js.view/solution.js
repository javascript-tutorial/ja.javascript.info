function concat(arrays) {
  // sum of individual array lengths
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

<<<<<<< HEAD
  if (!arrays.length) return null;

  let result = new Uint8Array(totalLength);
=======
  let result = new Uint8Array(totalLength);
  
  if (!arrays.length) return result;
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

  // for each array - copy it over result
  // next array is copied right after the previous one
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
