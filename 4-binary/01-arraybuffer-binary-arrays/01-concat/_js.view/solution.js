function concat(arrays) {
  // sum of individual array lengths
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

<<<<<<< HEAD
  if (!arrays.length) return null;

  let result = new Uint8Array(totalLength);
=======
  let result = new Uint8Array(totalLength);
  
  if (!arrays.length) return result;
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

  // for each array - copy it over result
  // next array is copied right after the previous one
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
