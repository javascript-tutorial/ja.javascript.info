function concat(arrays) {
  // sum of individual array lengths
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

<<<<<<< HEAD
  if (!arrays.length) return null;

  let result = new Uint8Array(totalLength);
=======
  let result = new Uint8Array(totalLength);
  
  if (!arrays.length) return result;
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

  // for each array - copy it over result
  // next array is copied right after the previous one
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
